# Shree Payment Services and Chitragupta eWallet

## Product scope

Shree is the payment hub inside the existing Support Center game resources at `/#/gaming/payments`. It presents game access, subscriptions, digital items, articles and other purchases, with merchant country displayed as Bhaarat. Its current executable scope is a local, test-only Razorpay adapter and a directory of provider readiness. It is not an activated merchant service or a production payment system.

The page serves visitors checking purchase options and developers reviewing the test integration. It must explain availability before inviting checkout, show actionable configuration or connection failures, and distinguish a verified captured test payment from a pending payment and from fulfillment.

## Current behavior and boundaries

- Razorpay is the only implemented adapter. The source supports server-created test orders, hosted Checkout, HMAC verification, provider payment reconciliation, signed webhooks and refund status. No external merchant sandbox transaction has been verified.
- Checkout requires server-only Razorpay test credentials, a separate webhook secret, explicit INR settlement confirmation and approved product prices. None has been supplied as completed merchant configuration. The example environment is a configuration template, not evidence of readiness.
- Game access, digital item and article prices have no defaults. Subscriptions have no recurring plan or lifecycle adapter. Other items have no approved SKU, shipping or tax configuration. No access, subscription, shipment or asset is granted, even after a captured test payment.
- Direct UPI, Apple Pay, Stripe, Cashfree and other services are listed without operational adapters. Google Pay and Paytm describe possible methods within an eligible Razorpay checkout, subject to merchant settings and device availability; they are not separate connected integrations.
- Chitragupta describes requested cryptocurrency, Bitcoin and NFT scope. Its capabilities endpoint reports no configured wallet, supported networks/assets or balance, and false connect/sign/transfer/mint capabilities. Connection, asset, NFT and transfer operation routes return HTTP 501. No chain query, signing, custody, minting or transfer service is active.
- Signed anonymous browser sessions own local orders. The private file ledger is for one local server process, not authenticated customer accounts or a multi-instance production database. Stable request IDs protect repeated local checkout requests; unknown creation outcomes require reconciliation.

## Currency and indicative pricing

Saptdhatu is the requested internal currency name. Its denomination, backing and conversion policy are undefined. No equivalence to INR or USD is established, and it is not sent to Razorpay as settlement currency.

The eight requested dollar tiers are `$0.90`, `$9`, `$99`, `$499`, `$4,999`, `$49,999`, `$499,999` and `$4,999,999`. The display assumes USD pending merchant confirmation. `../pricingReference.ts` freezes indicative INR viewing equivalents at USD/INR 95.0317 dated 2026-10-14, citing the MSE reference archive. Fees and taxes are excluded. These figures are viewing references only: no tier maps to a product, sets a checkout price, establishes provider acceptance, or defines Saptdhatu conversion. The order service does not import this display reference.

## Inherited visual authority

This is an extension of the existing arcade identity, not a new visual world. `../GameResources.tsx` owns the game-resource wrapper and navigation; `../game-support.css` owns the shared reading width, chapter rhythm, responsive artwork and focus treatment. `../../redux-demo/themeStudioPresets.ts` defines the existing `ARCADE_GAME_THEME` with dark violet surfaces, lavender primary, mint success/focus, cyan information links, monospace headings and restrained motion.

`../ShreePayments.tsx` reuses the shared heading, market artwork, chapters and navigation. `../shree-payments.css` adds only payment-specific selectors, action states, provider rows, receipt layout and the numeric price table, using inherited `--m-*` tokens. Preserve that hierarchy and readable status text. Keep visible keyboard focus, disabled checkout states and narrow-screen layouts. Payment availability must be conveyed in words, not color alone. Do not introduce a replacement palette, marketing identity or a separate full-system design artifact for this scoped page.

## Contracts and evidence

The public integration guide and Shree/Chitragupta OpenAPI files under `../public/payments-api/` describe the implemented test API and unavailable wallet gates. They do not activate credentials, merchant accounts or wallet networks. Keep their availability claims aligned with `core.mjs`, `server.mjs` and `chitragupta.mjs`.

Local fixture and browser checks demonstrate only the cases exercised by those checks. They do not prove provider sandbox acceptance, webhook delivery from Razorpay, production readiness, fulfillment or blockchain operations. Revalidate the current page after pricing or layout changes; earlier screenshots and passing results cannot certify later changes.
