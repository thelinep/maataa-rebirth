import { createHmac, timingSafeEqual, randomUUID } from 'node:crypto';

export const PRODUCTS = [
  { id: 'game-access', name: 'Game access', kind: 'access', priceKey: 'SHREE_GAME_ACCESS_PAISE' },
  { id: 'subscription', name: 'Subscription', kind: 'subscription', priceKey: null },
  { id: 'digital-item', name: 'Digital item', kind: 'digital', priceKey: 'SHREE_DIGITAL_ITEM_PAISE' },
  { id: 'article', name: 'Article', kind: 'article', priceKey: 'SHREE_ARTICLE_PAISE' },
  { id: 'other-item', name: 'Other item', kind: 'physical', priceKey: null },
];
export const SERVICES = [
  ['razorpay', 'Razorpay', 'Test adapter', 'Server orders, signed verification and payment status.'],
  ['upi', 'Direct UPI', 'Not connected', 'Merchant VPA and reconciliation service required.'],
  ['gpay', 'Google Pay', 'Via eligible Razorpay checkout', 'UPI app availability depends on device and merchant settings.'],
  ['paytm', 'Paytm', 'Via eligible Razorpay checkout', 'Availability depends on enabled payment methods.'],
  ['apple', 'Apple Pay', 'Not configured', 'Requires merchant enablement and a supported checkout environment.'],
  ['stripe', 'Stripe', 'Not connected', 'Separate merchant account and adapter required.'],
  ['cashfree', 'Cashfree', 'Not connected', 'Separate merchant account and adapter required.'],
  ['chitragupta', 'Chitragupta eWallet', 'Not connected', 'Crypto, Bitcoin and NFT network, wallet API and custody model required.'],
  ['other', 'Other services', 'Not connected', 'Add a named provider with its API and merchant configuration.'],
].map(([id, name, status, detail]) => ({ id, name, status, detail }));

export class PaymentError extends Error { constructor(status, message) { super(message); this.status = status; } }
export function signatureValid(message, signature, secret) {
  if (!secret || typeof signature !== 'string' || !/^[a-f0-9]{64}$/i.test(signature)) return false;
  const expected = createHmac('sha256', secret).update(message).digest();
  return timingSafeEqual(expected, Buffer.from(signature, 'hex'));
}
export function configuration(env) {
  const credentials = /^rzp_test_[a-zA-Z0-9]+$/.test(env.RAZORPAY_KEY_ID || '') && !!env.RAZORPAY_KEY_SECRET;
  const settlement = env.SHREE_SETTLEMENT_CURRENCY === 'INR';
  return {
    brand: 'Shree Payment Services', country: 'Bhaarat', mode: 'test', internalCurrency: 'Saptdhatu',
    settlementCurrency: settlement ? 'INR' : null,
    currencyNote: 'Saptdhatu has no configured conversion. No equivalence with INR is assumed.',
    configured: credentials && settlement && !!env.RAZORPAY_WEBHOOK_SECRET,
    blockers: [!credentials && 'Configure Razorpay test credentials on the server.', !settlement && 'Confirm INR settlement separately from Saptdhatu.', !env.RAZORPAY_WEBHOOK_SECRET && 'Configure a separate webhook secret.'].filter(Boolean),
    services: SERVICES,
    products: PRODUCTS.map(({ priceKey, ...product }) => {
      const raw = priceKey && env[priceKey];
      const amount = raw && /^[1-9]\d*$/.test(raw) && Number.isSafeInteger(Number(raw)) ? Number(raw) : null;
      return { ...product, amount, currency: 'INR', available: credentials && settlement && !!env.RAZORPAY_WEBHOOK_SECRET && amount !== null,
        reason: product.kind === 'subscription' ? 'Recurring billing requires a configured provider plan and lifecycle adapter.' : product.kind === 'physical' ? 'Requires an approved SKU, price, shipping and tax configuration.' : amount === null ? 'Merchant price not configured.' : null };
    }),
  };
}
export function createPaymentService({ env, store, fetchImpl = fetch }) {
  const config = () => configuration(env);
  async function api(path, body) {
    let response;
    try {
      response = await fetchImpl(`https://api.razorpay.com/v1/${path}`, {
        method: body ? 'POST' : 'GET', headers: { authorization: `Basic ${Buffer.from(`${env.RAZORPAY_KEY_ID}:${env.RAZORPAY_KEY_SECRET}`).toString('base64')}`, 'content-type': 'application/json' },
        ...(body ? { body: JSON.stringify(body) } : {}), signal: AbortSignal.timeout(15000),
      });
    } catch { throw new PaymentError(502, 'Razorpay could not be reached. Check the order before starting another checkout.'); }
    if (!response.ok) throw new PaymentError(502, 'Razorpay rejected the request. Check merchant test settings.');
    return response.json();
  }
  const publicOrder = (record) => ({ id: record.id, productId: record.productId, amount: record.amount, currency: record.currency, status: record.status, paymentId: record.paymentId || null, mode: 'test', fulfillment: 'not_granted' });
  async function owned(id, owner) {
    const record = await store.get(id);
    if (!record || record.owner !== owner) throw new PaymentError(404, 'Order not found for this session.');
    return record;
  }
  async function reconcile(record, paymentId) {
    if (!/^pay_[a-zA-Z0-9]+$/.test(paymentId || '')) throw new PaymentError(400, 'Invalid payment identifier.');
    const payment = await api(`payments/${paymentId}`);
    if (payment.id !== paymentId || payment.order_id !== record.id || payment.amount !== record.amount || payment.currency !== record.currency) throw new PaymentError(409, 'Payment does not match this order.');
    const next = payment.amount_refunded > 0 ? (payment.amount_refunded >= payment.amount ? 'refunded' : 'partially_refunded') : payment.status === 'captured' && payment.captured === true ? 'paid' : payment.status === 'failed' ? 'failed' : 'pending';
    // A failed second attempt must never erase a captured payment for this order.
    if (['paid', 'refunded', 'partially_refunded'].includes(record.status) && record.paymentId !== paymentId) return record;
    const updated = { ...record, status: next, paymentId, updatedAt: Date.now() };
    await store.put(record.id, updated);
    return updated;
  }
  return {
    config,
    async create({ productId, requestId, owner }) {
      const settings = config();
      if (!settings.configured) throw new PaymentError(503, settings.blockers.join(' '));
      const product = settings.products.find((p) => p.id === productId);
      if (!product?.available) throw new PaymentError(409, product?.reason || 'Product unavailable.');
      if (!/^[a-f0-9-]{36}$/.test(requestId || '')) throw new PaymentError(400, 'A checkout request ID is required.');
      const key = `request:${owner}:${requestId}`;
      const prior = await store.get(key);
      if (prior) {
        if (prior.productId !== productId) throw new PaymentError(409, 'Request ID already belongs to another product.');
        if (!prior.orderId) throw new PaymentError(409, 'This checkout is awaiting reconciliation. Do not retry it as a new order.');
        return { ...publicOrder(await owned(prior.orderId, owner)), keyId: env.RAZORPAY_KEY_ID };
      }
      // Persist intent before the external call. Unknown outcomes are never automatically retried.
      const receipt = `shree_${randomUUID().replaceAll('-', '')}`;
      await store.put(key, { productId, receipt, state: 'creating', createdAt: Date.now() });
      const order = await api('orders', { amount: product.amount, currency: 'INR', receipt, partial_payment: false, notes: { product_id: product.id, service: 'shree', mode: 'test' } });
      if (!/^order_[a-zA-Z0-9]+$/.test(order.id || '') || order.amount !== product.amount || order.currency !== 'INR') throw new PaymentError(502, 'Razorpay returned an unexpected order.');
      const record = { id: order.id, productId, owner, amount: product.amount, currency: 'INR', status: 'created', createdAt: Date.now() };
      await store.put(record.id, record);
      await store.put(key, { productId, orderId: order.id });
      return { ...publicOrder(record), keyId: env.RAZORPAY_KEY_ID };
    },
    async verify({ orderId, paymentId, signature, owner }) {
      const record = await owned(orderId, owner);
      if (!signatureValid(`${record.id}|${paymentId}`, signature, env.RAZORPAY_KEY_SECRET)) throw new PaymentError(400, 'Payment signature verification failed.');
      return publicOrder(await reconcile(record, paymentId));
    },
    async status(id, owner) {
      let record = await owned(id, owner);
      if (record.paymentId) record = await reconcile(record, record.paymentId);
      return publicOrder(record);
    },
    async webhook(raw, signature, eventId) {
      if (!signatureValid(raw, signature, env.RAZORPAY_WEBHOOK_SECRET)) throw new PaymentError(400, 'Invalid webhook signature.');
      let event;
      try { event = JSON.parse(raw); } catch { throw new PaymentError(400, 'Invalid webhook JSON.'); }
      if (!['payment.captured', 'payment.failed', 'refund.created', 'refund.processed', 'refund.failed'].includes(event.event)) return { received: true, ignored: true };
      const eventKey = eventId && /^[\w-]{1,160}$/.test(eventId) ? `event:${eventId}` : null;
      if (eventKey && await store.get(eventKey)) return { received: true, duplicate: true };
      const entity = event.payload?.payment?.entity;
      const refund = event.payload?.refund?.entity;
      let paymentId = entity?.id || refund?.payment_id;
      if (!/^pay_[a-zA-Z0-9]+$/.test(paymentId || '')) throw new PaymentError(400, 'Webhook payment missing.');
      const payment = await api(`payments/${paymentId}`);
      const record = await store.get(payment.order_id);
      if (!record) return { received: true, ignored: true };
      await reconcile(record, paymentId);
      if (eventKey) await store.put(eventKey, { at: Date.now() });
      return { received: true };
    },
  };
}
