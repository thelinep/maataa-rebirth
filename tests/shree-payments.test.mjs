import test from 'node:test';
import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { configuration, createPaymentService, signatureValid } from '../examples/support-center/payments/core.mjs';
import { createShreeServer, fileStore } from '../examples/support-center/payments/server.mjs';
const env = { RAZORPAY_KEY_ID: 'rzp_test_fixture', RAZORPAY_KEY_SECRET: 'test-only-fixture', RAZORPAY_WEBHOOK_SECRET: 'webhook-fixture', SHREE_SETTLEMENT_CURRENCY: 'INR', SHREE_GAME_ACCESS_PAISE: '9900' };
const hmac = (value, secret = env.RAZORPAY_KEY_SECRET) => createHmac('sha256', secret).update(value).digest('hex');
const requestId = '12345678-1234-1234-1234-123456789012';
function fixture(overrides = {}) {
  const records = new Map(); const calls = [];
  let payment = { id: 'pay_one', order_id: 'order_one', amount: 9900, currency: 'INR', status: 'captured', captured: true, amount_refunded: 0 };
  const store = { get: async (key) => records.get(key), put: async (key, value) => records.set(key, value) };
  const fetchImpl = async (url, options) => {
    calls.push({ url, options });
    return { ok: true, json: async () => url.endsWith('/orders') ? { id: 'order_one', amount: 9900, currency: 'INR' } : payment };
  };
  return { records, calls, store, setPayment: (value) => { payment = { ...payment, ...value }; }, service: createPaymentService({ env: { ...env, ...overrides }, store, fetchImpl }) };
}
test('unconfigured prices, custom currency, live keys and recurring/physical items fail closed', async () => {
  const empty = configuration({}); assert.equal(empty.configured, false); assert.equal(empty.products.some((p) => p.available), false);
  assert.equal(configuration({ ...env, RAZORPAY_KEY_ID: 'rzp_live_fixture' }).configured, false);
  assert.equal(configuration({ ...env, SHREE_SETTLEMENT_CURRENCY: 'Saptdhatu' }).configured, false);
  const config = configuration(env);
  assert.equal(config.products.find((p) => p.id === 'game-access').available, true);
  assert.equal(config.products.find((p) => p.id === 'subscription').available, false);
  assert.equal(config.products.find((p) => p.id === 'other-item').available, false);
  assert.equal(JSON.stringify(config).includes(env.RAZORPAY_KEY_SECRET), false);
  for (const amount of ['1.5', '-1', '0', '9007199254740992', '1e6']) assert.equal(configuration({ ...env, SHREE_GAME_ACCESS_PAISE: amount }).products[0].available, false);
  await assert.rejects(fixture({ SHREE_SETTLEMENT_CURRENCY: '' }).service.create({ productId: 'game-access', requestId, owner: 'alice' }), { status: 503 });
});
test('server-owned price, idempotency and owner-bound verification', async () => {
  const f = fixture();
  const created = await f.service.create({ productId: 'game-access', requestId, owner: 'alice', amount: 1 });
  assert.equal(created.amount, 9900); assert.equal(JSON.parse(f.calls[0].options.body).amount, 9900);
  assert.equal(JSON.parse(f.calls[0].options.body).partial_payment, false);
  assert.equal((await f.service.create({ productId: 'game-access', requestId, owner: 'alice' })).id, created.id);
  assert.equal(f.calls.length, 1);
  await assert.rejects(f.service.verify({ orderId: created.id, paymentId: 'pay_one', signature: hmac('order_one|pay_one'), owner: 'bob' }), { status: 404 });
  await assert.rejects(f.service.verify({ orderId: created.id, paymentId: 'pay_one', signature: '0'.repeat(64), owner: 'alice' }), { status: 400 });
  const verified = await f.service.verify({ orderId: created.id, paymentId: 'pay_one', signature: hmac('order_one|pay_one'), owner: 'alice' });
  assert.equal(verified.status, 'paid'); assert.equal(verified.fulfillment, 'not_granted');
});
test('valid signature alone cannot bypass amount, currency or order verification; authorization is not capture', async () => {
  for (const mismatch of [{ amount: 1 }, { currency: 'USD' }, { order_id: 'order_other' }]) {
    const f = fixture(); await f.service.create({ productId: 'game-access', requestId, owner: 'alice' }); f.setPayment(mismatch);
    await assert.rejects(f.service.verify({ orderId: 'order_one', paymentId: 'pay_one', signature: hmac('order_one|pay_one'), owner: 'alice' }), { status: 409 });
  }
  const f = fixture(); await f.service.create({ productId: 'game-access', requestId, owner: 'alice' });
  f.setPayment({ status: 'authorized', captured: false });
  assert.equal((await f.service.verify({ orderId: 'order_one', paymentId: 'pay_one', signature: hmac('order_one|pay_one'), owner: 'alice' })).status, 'pending');
});
test('raw signed webhooks deduplicate, reconcile refund state, and ignore stale failed attempts', async () => {
  const f = fixture(); await f.service.create({ productId: 'game-access', requestId, owner: 'alice' });
  const raw = Buffer.from(JSON.stringify({ event: 'payment.captured', payload: { payment: { entity: { id: 'pay_one' } } } }));
  await assert.rejects(f.service.webhook(raw, '0'.repeat(64), 'event1'), { status: 400 });
  await f.service.webhook(raw, hmac(raw, env.RAZORPAY_WEBHOOK_SECRET), 'event1');
  assert.equal((await f.service.webhook(raw, hmac(raw, env.RAZORPAY_WEBHOOK_SECRET), 'event1')).duplicate, true);
  f.setPayment({ amount_refunded: 4900 });
  assert.equal((await f.service.status('order_one', 'alice')).status, 'partially_refunded');
  f.setPayment({ amount_refunded: 9900 });
  assert.equal((await f.service.status('order_one', 'alice')).status, 'refunded');
  f.setPayment({ id: 'pay_two', status: 'failed', captured: false, amount_refunded: 0 });
  const failed = Buffer.from(JSON.stringify({ event: 'payment.failed', payload: { payment: { entity: { id: 'pay_two' } } } }));
  await f.service.webhook(failed, hmac(failed, env.RAZORPAY_WEBHOOK_SECRET), 'event2');
  assert.equal(f.records.get('order_one').status, 'refunded');
});
test('provider timeout persists intent and never blindly retries external order creation', async () => {
  const f = fixture(); let calls = 0;
  const service = createPaymentService({ env, store: f.store, fetchImpl: async () => { calls++; throw Error('timeout'); } });
  await assert.rejects(service.create({ productId: 'game-access', requestId, owner: 'alice' }), { status: 502 });
  await assert.rejects(service.create({ productId: 'game-access', requestId, owner: 'alice' }), { status: 409 });
  assert.equal(calls, 1);
  assert.match((await f.store.get(`request:alice:${requestId}`)).receipt, /^shree_[a-f0-9]{32}$/);
  assert.equal(signatureValid('x', 'not-hex', 'secret'), false);
});
test('durable store survives reopening', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'shree-store-'));
  try { const store = await fileStore(dir); await store.put('test', { status: 'paid' }); assert.deepEqual(await (await fileStore(dir)).get('test'), { status: 'paid' }); }
  finally { await rm(dir, { recursive: true }); }
});
test('HTTP enforces origin, host, session ownership, JSON size and serial duplicate checkout', async () => {
  const f = fixture();
  // Reserve a local port, then construct the exact origin expected by the server.
  const net = await import('node:net'); const reservation = net.createServer();
  await new Promise((resolve) => reservation.listen(0, '127.0.0.1', resolve)); const port = reservation.address().port;
  await new Promise((resolve) => reservation.close(resolve)); const origin = `http://127.0.0.1:${port}`;
  const server = createShreeServer({ service: f.service, origin, staticRoot: '/tmp', sessionSecret: 'session-fixture' });
  await new Promise((resolve) => server.listen(port, '127.0.0.1', resolve));
  try {
    const config = await fetch(`${origin}/api/shree/config`); const cookie = config.headers.get('set-cookie').split(';')[0];
    assert.match(config.headers.get('set-cookie'), /HttpOnly; SameSite=Strict/);
    const options = { method: 'POST', headers: { origin, cookie, 'content-type': 'application/json' }, body: JSON.stringify({ productId: 'game-access', requestId, amount: 1 }) };
    assert.equal((await fetch(`${origin}/api/shree/orders`, { ...options, headers: { ...options.headers, origin: 'https://evil.test' } })).status, 403);
    const results = await Promise.all([fetch(`${origin}/api/shree/orders`, options), fetch(`${origin}/api/shree/orders`, options)]);
    assert.deepEqual(results.map((r) => r.status), [201, 201]); assert.equal(f.calls.length, 1);
    assert.equal((await fetch(`${origin}/api/shree/orders/order_one`)).status, 404);
    assert.equal((await fetch(`${origin}/api/shree/orders/order_one`, { headers: { cookie } })).status, 200);
    const wallet = await (await fetch(`${origin}/api/chitragupta/capabilities`)).json();
    assert.equal(wallet.balance, null); assert.equal(wallet.canSign, false);
    assert.equal((await fetch(`${origin}/api/chitragupta/transfers`, { ...options, body: '{}' })).status, 501);
    assert.equal((await fetch(`${origin}/api/shree/orders`, { ...options, body: 'null' })).status, 400);
    assert.equal((await fetch(`${origin}/api/shree/orders`, { ...options, body: 'a'.repeat(33000) })).status, 413);
    const badHostStatus = await new Promise((resolve, reject) => {
      import('node:http').then(({ request }) => { const req = request(`${origin}/api/shree/config`, { headers: { host: 'evil.test' } }, (res) => { res.resume(); resolve(res.statusCode); }); req.on('error', reject); req.end(); });
    });
    assert.equal(badHostStatus, 403);
  } finally { await new Promise((resolve) => server.close(resolve)); }
});
