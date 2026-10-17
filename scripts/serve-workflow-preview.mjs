import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

// Rebuilt story indexes must never be mixed with cached preview HTML/modules.
const root = fileURLToPath(new URL('../.certification/storybook/', import.meta.url));
const storyId = 'workflows-step-bars--project-stages';
const index = JSON.parse(await readFile(resolve(root, 'index.json'), 'utf8'));
if (!index.entries?.[storyId]) throw new Error('Project Stages is absent. Run pnpm storybook:build first.');
const port = Number(process.env.WORKFLOW_PREVIEW_PORT || 6007);
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.woff2': 'font/woff2', '.woff': 'font/woff', '.ico': 'image/x-icon' };
const server = http.createServer(async (req, res) => {
  res.setHeader('cache-control', 'no-store, no-cache, must-revalidate');
  res.setHeader('pragma', 'no-cache');
  res.setHeader('expires', '0');
  res.setHeader('x-content-type-options', 'nosniff');
  if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405); res.end(); return; }
  try {
    const url = new URL(req.url, `http://127.0.0.1:${port}`);
    const path = resolve(root, `.${decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname)}`);
    if (!path.startsWith(`${resolve(root)}${sep}`)) { res.writeHead(403); res.end(); return; }
    const data = await readFile(path);
    res.writeHead(200, { 'content-type': types[extname(path)] || 'application/octet-stream', 'content-length': data.length });
    res.end(req.method === 'HEAD' ? undefined : data);
  } catch { res.writeHead(404); res.end('Preview asset not found. Rebuild the preview if its source changed.'); }
});
server.listen(port, '127.0.0.1', () => console.log(`Workflow preview: http://127.0.0.1:${port}/iframe.html?id=${storyId}&viewMode=story`));
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => server.close(() => process.exit(0)));
