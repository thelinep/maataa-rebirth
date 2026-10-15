# Shree Payment Services and Chitragupta eWallet

Version 0.1.0 · local test implementation · merchant country Bhaarat.

## What works

Shree creates Razorpay test Orders through the real provider REST API, opens hosted Standard Checkout, checks its HMAC, fetches the payment to verify order/amount/currency/capture, receives signed raw-body webhooks and reconciles refund status. A signed browser session owns each local order. Request IDs prevent repeated order creation; unknown provider outcomes are held for reconciliation instead of automatically retried. No product access, recurring subscription, shipment or asset is granted.

This source has fixture-backed automated tests. Merchant credentials and a successful external Razorpay sandbox transaction have not been supplied or verified.

## Configure locally

1. Build the Support Center with `pnpm support-center:build`.
2. Copy `examples/support-center/payments/.env.example` to `.env` in that same directory. The filled file is ignored by Git.
3. Set `RAZORPAY_KEY_ID` (must start with `rzp_test_`), `RAZORPAY_KEY_SECRET`, and a separate `RAZORPAY_WEBHOOK_SECRET` using your merchant test Dashboard. Never put secret credentials in browser variables, public files, screenshots or chat.
4. Explicitly set `SHREE_SETTLEMENT_CURRENCY=INR` only after confirming INR test settlement. Saptdhatu is the requested internal unit, with no supplied denomination, exchange rate or backing. It is never sent to Razorpay as a currency and no 1:1 mapping is assumed.
5. Set approved integer INR paise prices for `SHREE_GAME_ACCESS_PAISE`, `SHREE_DIGITAL_ITEM_PAISE` and/or `SHREE_ARTICLE_PAISE`. There are no default prices. Set a stable random `SHREE_SESSION_SECRET` if preferred; otherwise the server creates and persists one in its private local ledger.
6. Start `pnpm shree:payments`. Open `http://127.0.0.1:4181/#/gaming/payments`. The UI and API must share this origin. An ordinary static preview shows the interface but cannot create payments.
7. Configure automatic capture in the Razorpay test Dashboard. Subscribe to `payment.captured`, `payment.failed`, `refund.created`, `refund.processed`, and `refund.failed`. Forward the unmodified event to `/api/shree/webhooks/razorpay` with its signature header. Razorpay cannot call localhost directly; a separately configured secure development forwarder is needed for external webhook testing. None is deployed here.
8. Use provider test instruments only. Check success, failure, dismissal, duplicate notifications, pending authorization and refunds. Run `pnpm shree:payments:test` for fixture and local HTTP tests.

## Checkout contract

Read `/api/shree/config` first. Only the public key ID appears in an order response; secret keys never do. Send `{ "productId": "game-access", "requestId": "<stable UUID>" }` to `POST /api/shree/orders` as same-origin JSON. Amount and currency supplied by a browser are ignored. Pass the returned provider order ID into Razorpay hosted Checkout. Forward its payment ID and signature with the original order ID to `POST /api/shree/verify`.

Only `status: paid` means a captured matching TEST payment. `pending` is not payment success. `fulfillment: not_granted` remains explicit. A browser checkout response alone never grants access. `GET /api/shree/orders/{orderId}` reconciles a known payment ID; captured webhooks can recover a missing browser callback. Without either, the order remains created until merchant reconciliation.

Keep the same request ID after a timeout. A creating intent without an order ID requires merchant reconciliation by the stored receipt; do not delete it and blindly retry. The UI remembers request IDs per product for the browser tab. Clearing site data or starting another tab can create a distinct test purchase; this is not a customer-level purchase deduplication system.

The test ledger is `.local/shree-payments/ledger.json` by default, with owner-only file mode. Use exactly one process per ledger. The Node server serializes operations and writes by atomic rename. It is a bounded local test store, not a production database or multi-instance service. Back up and protect it; never publish it. Anonymous signed cookies are local order ownership, not authenticated customer accounts. No live keys are accepted. There is no production deployment, entitlement service, tax engine, shipping engine, fraud/rate-limit service or refund initiation UI. Subscription plans and lifecycle billing remain unavailable.

## Provider options

Razorpay is the only implemented payment adapter. Google Pay and Paytm may be available as methods inside eligible Razorpay hosted Checkout; this does not establish separate provider integrations. Apple Pay is listed but not configured. Direct UPI requires a merchant VPA plus reliable reconciliation; no UPI intent is fabricated. Stripe, Cashfree and other providers require their own merchant configuration and adapters. Each stays explicitly not connected.

## Chitragupta eWallet

`GET /api/chitragupta/capabilities` returns `status: not_configured`, empty supported networks/assets, a null balance, and false connect/sign/transfer/mint capabilities. Cryptocurrency, Bitcoin and NFT entries describe requested scope only. `POST /connections`, `GET /assets`, `GET /nfts`, and `POST /transfers` under `/api/chitragupta` return HTTP 501 `WALLET_NOT_CONFIGURED` without querying or moving assets. These are documented gates, not completed wallet operations.

To implement a wallet adapter, specify chain IDs and RPC/indexer providers, asset IDs and decimal precision, a custody model (prefer external signing), a wallet ownership challenge format with nonce/domain/expiry/replay protection, confirmation/reorg policy, and transaction limits. NFT chain/contract/token IDs must be distinguished from fungible balances. Saptdhatu needs its own explicit denomination and conversion contract; do not infer a token standard or backing. Never send a seed phrase or private key to this API. Any future operations require authentication, ownership verification, versioned schemas, simulation, explicit transaction approval and network receipt verification before an available capability is announced.

## API contracts and sources

- `shree.openapi.json`: implemented payment API and redacted configuration.
- `chitragupta.openapi.json`: current capability API and unavailable operation gates.
- Razorpay integration: https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/integration-steps/
- Razorpay webhook validation: https://razorpay.com/docs/webhooks/validate-test/
- Razorpay SDK verification reference: https://github.com/razorpay/razorpay-node/blob/master/documents/paymentVerfication.md

## Requested pricing tiers

The user supplied `$ .9, 9, 99, 499, 4999, 49999, 499999, 4999999 -> INR`. The display assumes USD pending confirmation and shows all eight viewing equivalents using USD/INR 95.0317 dated 2026-10-14, from https://www.msei.in/markets/currency/historical-data/rbireferenceratearchives (checked 2026-10-15). MSE labels its reference rates for viewing only. This is a frozen indicative comparison, not a payment quote, provider FX rate or automatic conversion. Fees and taxes are excluded. No tier has been assigned to a product or copied into checkout configuration; higher-value tiers have no established provider acceptance. The relationship between Saptdhatu and USD/INR remains undefined.
