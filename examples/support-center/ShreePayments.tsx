import * as React from 'react';
import './shree-payments.css';
import { PRICING_REFERENCE } from './pricingReference';

type Product = { id: string; name: string; kind: string; amount: number | null; currency: string; available: boolean; reason: string | null };
type Settings = { configured: boolean; blockers: string[]; settlementCurrency: string | null; products: Product[]; services: { id: string; name: string; status: string; detail: string }[] };
type Order = { id: string; amount: number; currency: string; status: string; paymentId: string | null; keyId?: string; mode: string; fulfillment: string };
type CheckoutResponse = { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string };
type Checkout = { open(): void; on(event: string, handler: () => void): void };
declare global { interface Window { Razorpay?: new (options: Record<string, unknown>) => Checkout } }
const fallbackServices = [
  ['razorpay', 'Razorpay', 'Test adapter · server unavailable', 'Open this page through the Shree payment server.'],
  ['upi', 'Direct UPI', 'Not connected', 'Merchant VPA and payment reconciliation required.'],
  ['gpay', 'Google Pay', 'Via eligible Razorpay checkout', 'Availability depends on enabled UPI methods and device.'],
  ['paytm', 'Paytm', 'Via eligible Razorpay checkout', 'Availability depends on enabled payment methods.'],
  ['apple', 'Apple Pay', 'Not configured', 'Merchant enablement and supported checkout required.'],
  ['stripe', 'Stripe', 'Not connected', 'Separate merchant account and adapter required.'],
  ['cashfree', 'Cashfree', 'Not connected', 'Separate merchant account and adapter required.'],
  ['chitragupta', 'Chitragupta eWallet', 'Not connected', 'Wallet API, custody model and supported chains required.'],
  ['other', 'Other services', 'Not connected', 'Connect a named provider with its merchant configuration.'],
].map(([id, name, status, detail]) => ({ id, name, status, detail }));
const fallbackProducts: Product[] = [['game-access', 'Game access'], ['subscription', 'Subscription'], ['digital-item', 'Digital item'], ['article', 'Article'], ['other-item', 'Other item']].map(([id, name]) => ({ id, name, kind: id, amount: null, currency: 'INR', available: false, reason: id === 'subscription' ? 'Recurring plan and billing lifecycle not configured.' : id === 'other-item' ? 'SKU, shipping and tax configuration required.' : 'Merchant price not configured.' }));
const money = (amount: number, currency: string) => new Intl.NumberFormat('en-IN', { style: 'currency', currency }).format(amount / 100);
async function request<T>(path: string, body?: unknown): Promise<T> {
  const response = await fetch(`/api/shree/${path}`, { credentials: 'same-origin', cache: 'no-store', ...(body ? { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) } : {}), signal: AbortSignal.timeout(25000) });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Payment service unavailable.');
  return data;
}
let checkoutScript: Promise<void> | null = null;
function loadCheckout() {
  if (window.Razorpay) return Promise.resolve();
  if (!checkoutScript) checkoutScript = new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'; script.async = true;
    script.onload = () => { if (window.Razorpay) resolve(); else { checkoutScript = null; script.remove(); reject(new Error('Razorpay checkout did not load.')); } };
    script.onerror = () => { checkoutScript = null; script.remove(); reject(new Error('Could not load Razorpay. Check your connection and retry.')); };
    document.head.append(script);
  });
  return checkoutScript;
}
export function ShreePayments() {
  const [settings, setSettings] = React.useState<Settings | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [message, setMessage] = React.useState('');
  const [error, setError] = React.useState('');
  const [productId, setProductId] = React.useState('game-access');
  const [busy, setBusy] = React.useState(false);
  const [order, setOrder] = React.useState<Order | null>(null);
  const requestIds = React.useRef<Record<string, string>>({});
  const running = React.useRef(false);
  const refresh = React.useCallback(async () => {
    setLoading(true); setError('');
    try { setSettings(await request<Settings>('config')); }
    catch { setSettings(null); setError('Payment server unavailable. Open the Shree payment server preview, then check the connection again.'); }
    finally { setLoading(false); }
  }, []);
  React.useEffect(() => { void refresh(); }, [refresh]);
  const products = settings?.products || fallbackProducts;
  const selected = products.find((p) => p.id === productId)!;
  async function checkStatus() {
    if (!order || running.current) return;
    running.current = true; setBusy(true); setError('');
    try { const result = await request<Order>(`orders/${order.id}`); setOrder(result); setMessage(result.status === 'paid' ? 'Test payment captured and verified. No real money was collected.' : `Test payment status: ${result.status}.`); }
    catch (cause) { setError(cause instanceof Error ? cause.message : 'Could not check payment.'); }
    finally { running.current = false; setBusy(false); }
  }
  async function checkout() {
    if (running.current || !selected.available) return;
    running.current = true; setBusy(true); setError(''); setMessage('Preparing secure test checkout…');
    try {
      await loadCheckout();
      const storageKey = `shree-test-request:${productId}`;
      let remembered: string | null = null;
      try { remembered = sessionStorage.getItem(storageKey); } catch { /* Browser storage can be unavailable. */ }
      const requestId = requestIds.current[productId] ||= remembered || crypto.randomUUID();
      try { sessionStorage.setItem(storageKey, requestId); } catch { /* In-memory request ID still prevents immediate duplicates. */ }
      const created = await request<Order>('orders', { productId, requestId });
      setOrder(created);
      if (created.status === 'paid' || created.status === 'refunded' || created.status === 'partially_refunded') { setMessage(`This test order is ${created.status}.`); running.current = false; setBusy(false); return; }
      const modal = new window.Razorpay!({
        key: created.keyId, order_id: created.id, amount: created.amount, currency: created.currency,
        name: 'Shree Payment Services', description: `${selected.name} · test payment`,
        modal: { ondismiss: () => { running.current = false; setBusy(false); setMessage('Checkout closed. Check payment status before trying again.'); } },
        handler: async (result: CheckoutResponse) => {
          try {
            setMessage('Verifying payment with the server…');
            const verified = await request<Order>('verify', { orderId: created.id, paymentId: result.razorpay_payment_id, signature: result.razorpay_signature });
            setOrder(verified); setMessage(verified.status === 'paid' ? 'Test payment captured and verified. No real money was collected.' : `Payment is ${verified.status}. Access has not been granted.`);
          } catch (cause) { setError(cause instanceof Error ? cause.message : 'Payment verification unavailable. Check status before retrying.'); }
          finally { running.current = false; setBusy(false); }
        },
      });
      modal.on('payment.failed', () => { setMessage('Payment attempt failed. You can retry within checkout or close it and check status.'); });
      modal.open(); setMessage('Razorpay test checkout is open.');
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Checkout unavailable.'); running.current = false; setBusy(false); }
  }
  return <>
    <header className="sc-game-heading"><div><h1>Shree Payment Services</h1><p>One payment hub for game access, subscriptions, digital items, articles and other purchases.</p><p><strong>Razorpay test mode</strong> · Merchant country: Bhaarat</p></div><img className="sc-game-key-art" src="./artwork/market.webp" width="768" height="512" alt="" /></header>
    <section className="sc-game-resource-chapter"><h2>Currency and settlement</h2><p>Requested currency: <strong>Saptdhatu</strong>. Its denomination and conversion have not been configured. No INR equivalence is assumed.</p><p>Razorpay test settlement: <strong>{settings?.settlementCurrency || 'Awaiting INR confirmation'}</strong>. Checkout always shows the exact provider currency and amount.</p></section>
    <section className="sc-game-resource-chapter"><h2>Requested price tiers</h2><p>{PRICING_REFERENCE.interpretation} Viewing rate: $1 ≈ ₹{PRICING_REFERENCE.rate} ({PRICING_REFERENCE.rateDate}, <a href={PRICING_REFERENCE.source} target="_blank" rel="noreferrer">MSE reference</a>).</p><p>{PRICING_REFERENCE.note} Product mapping and the relationship to Saptdhatu are still required.</p><table className="shree-prices"><caption>USD tiers with indicative INR equivalents</caption><thead><tr><th scope="col">USD</th><th scope="col">Approximate INR</th></tr></thead><tbody>{PRICING_REFERENCE.tiers.map((tier) => <tr key={tier.id}><td>{money(tier.usdCents, 'USD')}</td><td>{money(tier.inrPaise, 'INR')}</td></tr>)}</tbody></table></section>
    <section className="sc-game-resource-chapter" aria-labelledby="shree-checkout-title"><h2 id="shree-checkout-title">Test checkout</h2>
      <p>Credentials and approved product prices stay on the server. No card details, UPI PIN, wallet seed or private key are collected here.</p>
      {loading ? <p role="status">Checking payment configuration…</p> : <div className="shree-connection"><p role="status">{settings?.configured ? 'Razorpay test server configured.' : 'Checkout unavailable: merchant configuration required.'}</p>{settings?.blockers.length ? <ul>{settings.blockers.map((blocker) => <li key={blocker}>{blocker}</li>)}</ul> : null}<button type="button" onClick={() => void refresh()} disabled={busy}>Check connection</button></div>}
      <label className="shree-product">Purchase type<select value={productId} disabled={busy} onChange={(event) => { setProductId(event.target.value); setOrder(null); setMessage(''); setError(''); }}>{products.map((product) => <option key={product.id} value={product.id}>{product.name}</option>)}</select></label>
      <p>{selected.amount !== null ? `${money(selected.amount, selected.currency)} · provider test amount` : 'Price awaiting merchant configuration.'}</p>
      {selected.reason ? <p>{selected.reason}</p> : null}
      <div className="shree-actions"><button type="button" onClick={() => void checkout()} disabled={loading || busy || !selected.available}>{busy ? 'Payment in progress…' : selected.available ? 'Open Razorpay test checkout' : 'Checkout unavailable'}</button>{order ? <button type="button" onClick={() => void checkStatus()} disabled={busy}>Check payment status</button> : null}</div>
      {error ? <p role="alert">{error}</p> : null}{message ? <p role="status">{message}</p> : null}
      {order ? <dl className="shree-receipt"><dt>Test order</dt><dd>{order.id}</dd><dt>Amount</dt><dd>{money(order.amount, order.currency)}</dd><dt>Status</dt><dd>{order.status}</dd><dt>Fulfillment</dt><dd>No access, item, subscription or shipment granted by this test.</dd></dl> : null}
    </section>
    <section className="sc-game-resource-chapter"><h2>Payment options</h2><p>Options marked not connected cannot process payments. Google Pay and Paytm may appear inside eligible Razorpay checkout; they are not separate connected merchant accounts.</p><ul className="shree-services">{(settings?.services || fallbackServices).map((service) => <li key={service.id}><div><h3>{service.name}</h3><p>{service.detail}</p></div><strong>{service.status}</strong></li>)}</ul></section>
    <section className="sc-game-resource-chapter"><h2>Chitragupta eWallet</h2><p>Requested assets: cryptocurrencies, Bitcoin and NFTs. No wallet is connected, no balance is asserted, and no signing or custody service is active. Connect the wallet API and specify supported networks before enabling these options.</p><p><a href="./payments-api/chitragupta.openapi.json" download>Download Chitragupta API contract</a></p></section>
    <section className="sc-game-resource-chapter"><h2>Developer resources</h2><p><a href="./payments-api/shree.openapi.json" download>Download Shree payment API contract</a></p><p><a href="./payments-api/integration-guide.md" download>Download integration guide</a></p><p>Contracts document the current test adapter and unavailable wallet operations. They do not activate a merchant account or blockchain connection.</p></section>
  </>;
}
