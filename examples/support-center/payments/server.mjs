import http from 'node:http';
import { readFile, writeFile, rename, mkdir } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomBytes, createHmac, timingSafeEqual } from 'node:crypto';
import { createPaymentService, PaymentError } from './core.mjs';
import { CHITRAGUPTA_CAPABILITIES, CHITRAGUPTA_GATED_ROUTES } from './chitragupta.mjs';

export async function fileStore(directory) {
  await mkdir(directory, { recursive: true, mode: 0o700 });
  const path = resolve(directory, 'ledger.json');
  let data;
  try { data = JSON.parse(await readFile(path, 'utf8')); }
  catch (error) { if (error.code !== 'ENOENT') throw error; data = {}; }
  if (!data || typeof data !== 'object' || Array.isArray(data)) throw Error('Invalid payment ledger');
  return {
    async get(key) { return data[key]; },
    async put(key, value) {
      const next = { ...data, [key]: value };
      await writeFile(`${path}.tmp`, JSON.stringify(next), { mode: 0o600 });
      await rename(`${path}.tmp`, path);
      data = next;
    },
  };
}
export function createShreeServer({ service, origin, staticRoot, sessionSecret = randomBytes(32).toString('hex') }) {
  let queue = Promise.resolve();
  const serial = (fn) => { const next = queue.then(fn); queue = next.catch(() => {}); return next; };
  const sign = (value) => createHmac('sha256', sessionSecret).update(value).digest('hex');
  function session(req, res) {
    const cookie = /(?:^|;\s*)shree_session=([a-f0-9]{48})\.([a-f0-9]{64})(?:;|$)/.exec(req.headers.cookie || '');
    if (cookie && timingSafeEqual(Buffer.from(sign(cookie[1]), 'hex'), Buffer.from(cookie[2], 'hex'))) return cookie[1];
    const id = randomBytes(24).toString('hex');
    res.setHeader('set-cookie', `shree_session=${id}.${sign(id)}; HttpOnly; SameSite=Strict; Path=/; Max-Age=86400${origin.startsWith('https:') ? '; Secure' : ''}`);
    return id;
  }
  async function body(req) {
    const chunks = []; let size = 0;
    for await (const chunk of req) { size += chunk.length; if (size > 32768) throw new PaymentError(413, 'Request too large.'); chunks.push(chunk); }
    return Buffer.concat(chunks);
  }
  const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.webp': 'image/webp', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.zip': 'application/zip' };
  return http.createServer(async (req, res) => {
    const send = (code, value) => { res.writeHead(code, { 'content-type': 'application/json', 'cache-control': 'no-store', 'x-content-type-options': 'nosniff' }); res.end(JSON.stringify(value)); };
    try {
      if (req.headers.host !== new URL(origin).host) throw new PaymentError(403, 'Untrusted host.');
      const url = new URL(req.url, origin);
      if (!url.pathname.startsWith('/api/shree/') && !url.pathname.startsWith('/api/chitragupta/')) {
        if (!['GET', 'HEAD'].includes(req.method)) throw new PaymentError(405, 'Method not allowed.');
        const filename = resolve(staticRoot, `.${decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname)}`);
        if (!filename.startsWith(`${resolve(staticRoot)}${sep}`)) throw new PaymentError(403, 'Invalid path.');
        let contents; try { contents = await readFile(filename); } catch { throw new PaymentError(404, 'File not found.'); }
        res.writeHead(200, { 'content-type': mime[extname(filename)] || 'application/octet-stream', 'x-content-type-options': 'nosniff', 'referrer-policy': 'strict-origin-when-cross-origin' });
        res.end(req.method === 'HEAD' ? undefined : contents); return;
      }
      if (url.pathname === '/api/shree/webhooks/razorpay' && req.method === 'POST') {
        const raw = await body(req);
        return send(200, await serial(() => service.webhook(raw, req.headers['x-razorpay-signature'], req.headers['x-razorpay-event-id'])));
      }
      if (req.headers.origin && req.headers.origin !== origin) throw new PaymentError(403, 'Cross-origin payment request rejected.');
      if (req.headers['sec-fetch-site'] === 'cross-site') throw new PaymentError(403, 'Cross-site payment request rejected.');
      const owner = session(req, res);
      if (url.pathname === '/api/chitragupta/capabilities' && req.method === 'GET') return send(200, CHITRAGUPTA_CAPABILITIES);
      if (CHITRAGUPTA_GATED_ROUTES.has(`${req.method} ${url.pathname}`)) return send(501, { error: 'Chitragupta wallet adapter not configured. No assets were queried or moved.', code: 'WALLET_NOT_CONFIGURED' });
      if (url.pathname === '/api/shree/config' && req.method === 'GET') return send(200, service.config());
      if (req.method === 'POST' && req.headers.origin !== origin) throw new PaymentError(403, 'Payment request origin required.');
      if (req.method === 'POST') {
        if (!/^application\/json(?:;|$)/.test(req.headers['content-type'] || '')) throw new PaymentError(415, 'JSON required.');
        let data; try { data = JSON.parse((await body(req)).toString()); } catch (error) { if (error.status) throw error; throw new PaymentError(400, 'Invalid JSON.'); }
        if (!data || typeof data !== 'object' || Array.isArray(data)) throw new PaymentError(400, 'Invalid request.');
        if (url.pathname === '/api/shree/orders') return send(201, await serial(() => service.create({ productId: data.productId, requestId: data.requestId, owner })));
        if (url.pathname === '/api/shree/verify') return send(200, await serial(() => service.verify({ orderId: data.orderId, paymentId: data.paymentId, signature: data.signature, owner })));
      }
      const match = /^\/api\/shree\/orders\/(order_[a-zA-Z0-9]+)$/.exec(url.pathname);
      if (match && req.method === 'GET') return send(200, await serial(() => service.status(match[1], owner)));
      send(404, { error: 'Payment route not found.' });
    } catch (error) { send(error.status || 500, { error: error.status ? error.message : 'Payment service error. No payment confirmation was issued.' }); }
  });
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = fileURLToPath(new URL('../../../', import.meta.url));
  const port = Number(process.env.SHREE_PORT || 4181);
  const origin = `http://127.0.0.1:${port}`;
  const store = await fileStore(resolve(process.env.SHREE_DATA_DIR || `${root}/.local/shree-payments`));
  const service = createPaymentService({ env: process.env, store });
  let sessionSecret = process.env.SHREE_SESSION_SECRET || await store.get('_sessionSecret');
  if (!sessionSecret) { sessionSecret = randomBytes(32).toString('hex'); await store.put('_sessionSecret', sessionSecret); }
  const server = createShreeServer({ service, origin, staticRoot: resolve(root, 'support-center-dist'), sessionSecret });
  server.listen(port, '127.0.0.1', () => console.log(`Shree test payments: ${origin}/#/gaming/payments. ${service.config().configured ? 'Test configuration present.' : 'Merchant configuration required.'}`));
  for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => server.close(() => process.exit(0)));
}
