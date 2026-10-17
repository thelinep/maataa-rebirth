# TLPS / MAATAA full status matrix

As checked on 2026-10-16 (Asia/Kolkata). Scope: the current checkout and the feature work in this conversation. This is not a certification of every repository app or an external production audit.

## Overall disposition

Local UI/demo/artwork delivery is available. Commerce, capital collection, subscriptions, escrow custody and crypto operations are not operational. No current production or exact-HEAD enterprise release qualification is established.

## Full feature matrix

| Area | Feature | Status | Verified scope | Remaining boundary / blocker |
| --- | --- | --- | --- | --- |
| TLPS | Brand page and brand-kit export | Working locally | Reference page and JSON kit | No live tlps.in deployment verified |
| TLPS | Guided onboarding | Working locally | Audience, idea, journey and automation preferences; browser save | No server account or project provisioning established |
| TLPS | Production planning workflow | Working local demo | Plan, review, rehearsal and handover | No real shoot, booking, hiring or operational approval |
| TLPS | Workplace directory | Working local demo | 222 unique workplaces across 20 areas; 327 area-specific demos | Registry coverage is not production feature completeness |
| TLPS | Action and step icon bars | Working local demo | Record/sample/review/export actions and review-step gates | Local review is not authenticated approval |
| TLPS | Work-area registers | Working locally | Browser-local records and synthetic examples | No shared backend data or live supplier inventory |
| Investor Hub | Circles | Working local register | Purpose, coordinator and membership-rule notes | No verified membership or pooled investment vehicle |
| Investor Hub | Membership subscriptions | Planning only | Separate benefits and proposed billing-period records | No recurring plan, mandate, fee collection or entitlement |
| Investor Hub | Investment interests | Planning only | Separate non-binding project/party/terms records | No binding commitment, allocation or capital collection |
| Investor Hub | Escrow reviews | Planning only | Milestones, conditions, evidence and reviewer notes | No custody provider/account, held balance or fund release |
| Investor Hub | Save and handover | Working locally | Four lists in one versioned record; 100 entries per list; JSON export | References are free text; export is not a provider instruction |
| Commerce | SKU catalogue | Draft | 26 unique proposed SKUs in Markdown/CSV/JSON | 0 checkout-enabled SKUs; no approved price or provider mapping |
| Commerce | Eight price tiers | Reference only | Eight supplied dollar tiers with dated indicative INR equivalents | USD assumed; no confirmed product, billing-unit or Saptdhatu mapping |
| Themes | Base appearance modes | Implemented | System, dark, light, high contrast and OLED black options | No renewed whole-app/device acceptance in this audit |
| Themes | Curated Theme Studio presets | Working locally | 9 presets including paper variants, ASCII Terminal and Arcade Quest | Preview/application is browser-local configuration |
| Support | Support Center | Working locally | Search, guides, FAQs, workspace directory and local handoff | No connected ticket queue, live agent or external sending |
| Support | Game UI Help and resources | Working locally | Gaming hub, handbook, playbook and guides | Game-styled interface; no playable game engine or multiplayer |
| Artwork | Original illustrations | Generated | 8 shared illustrated worlds; source prompts recorded | AI-created visual assets, not live operational evidence |
| Artwork | Named frame library | Generated | 659 named frames; manifest, per-frame downloads and ZIP | Shared scenes reused; not 659 separately generated illustrations |
| Artwork | Provenance and export coverage | Verified files | 667 WebP files with sidecars; manifest 659 complete, 0 failures/overflows | Manifest records last export, not a fresh render of all frames today |
| Shree | Razorpay adapter | Implemented; unconfigured | Test Orders, hosted Checkout, HMAC verification, payment fetch, raw signed webhooks and refund reconciliation | Live endpoint configured=false; no external sandbox payment verified |
| Shree | Merchant test credentials | Missing configuration | Current endpoint requests test credentials and webhook secret | Keys must be configured server-side; not read or exposed in audit |
| Shree | Currency and price configuration | Unconfigured | Settlement currency null; all 5 generic product choices unavailable | Explicit INR configuration and approved per-product prices needed |
| Shree | Recurring subscriptions | Not implemented | UI option and planning notes only | Provider plan and lifecycle/mandate/entitlement adapter missing |
| Shree | Direct UPI | Not connected | Option listed | Merchant VPA and reliable payment reconciliation missing |
| Shree | Google Pay and Paytm | Conditional options | May appear in eligible Razorpay hosted Checkout | No separate connected merchant adapters; no method tested |
| Shree | Apple Pay | Not configured | Option listed | Merchant enablement and supported checkout setup missing |
| Shree | Stripe | Not connected | Option listed | Separate merchant configuration and adapter missing |
| Shree | Cashfree | Not connected | Option listed | Separate merchant configuration and adapter missing |
| Shree | Other providers | Not connected | Extension option listed | Named provider, credentials and adapter required |
| Shree | Fulfillment and physical items | Not implemented | No grant of access, licence, shipment or paid membership | Entitlements, approved SKUs, stock/shipping/tax workflows missing |
| Chitragupta | Capability API | Working; unconfigured | HTTP200, status not_configured; balance null, no networks | Connection/sign/transfer/mint capabilities all false |
| Chitragupta | Wallet operations | Explicitly unavailable | Connection/assets/NFT/transfer routes return501 | Chain/RPC, wallet connection, ownership and custody design missing |
| Chitragupta | Crypto, Bitcoin and NFTs | Requested scope only | Named in contract and UI | No signing, balances, transfer, minting or ownership proof |
| Currency | Saptdhatu | Undefined contract | Requested internal currency name preserved | Denomination, exchange policy and provider settlement relationship undefined |
| Brahmini | Workbench UI and local documentation | UI available | Workbench route opens; help/forge/council/provider surfaces exist | UI availability does not establish model execution |
| Brahmini | Provider runtime and generation | Unavailable in live check | No successful response from127.0.0.1:4175 | Start/configure runtime and a provider; no model request sent |
| Brahmini | Generated product delivery | Draft capability only | Source describes reviewed product kits and drafts | No demonstrated autonomous execution, deployment or production qualification |
| Repository | Feature history | Committed locally | Branch codex/tlps-in-brand; HEAD 078045b1 | No current push or PR status verified |
| Repository | Working tree | Dirty outside feature scope | Unrelated auth/Tauri/release/story/observatory work preserved | Not a clean exact-candidate release tree |
| Release | Current package | Local alpha | package.json version 1.0.0-alpha.8.7 | No fresh full enterprise certification of current HEAD |
| Release | Release documentation | Drift observed | RELEASE-READINESS.md still describes alpha8.4 and an older commit | Historical qualification cannot certify current source |
| Release | Hosted production | Unverified | Local previews only verified by this audit | No DNS/TLS/hosting, public release or live merchant evidence checked |

## All 20 TLPS work areas

The existing area configuration distinguishes planning-workflow entry points from browser-local registers. These are local usability modes, not sellable plans or production readiness.

| Work area | Existing local mode |
| --- | --- |
| Production OS | Planning-workflow demo |
| Film OS | Browser-local register |
| Campaign OS | Browser-local register |
| ATL OS | Browser-local register |
| BTL OS | Browser-local register |
| OOH / DOOH OS | Browser-local register |
| Marketplace OS | Browser-local register |
| Evidence OS | Planning-workflow demo |
| Finance OS | Planning-workflow demo |
| Investor Hub OS | Browser-local register |
| Event OS | Browser-local register |
| Wedding OS | Browser-local register |
| Exhibition & Spatial OS | Browser-local register |
| MAATAA AI | Browser-local register |
| Analytics OS | Browser-local register |
| Core Platform OS | Browser-local register |
| Casting OS | Browser-local register |
| Crew OS | Planning-workflow demo |
| Location OS | Planning-workflow demo |
| Equipment & Logistics OS | Browser-local register |

## Current verification

- 39 scoped unit tests passed across 9 files: workplace demos/areas, theme model, TLPS planning/workflow, Brahmini input/config, artwork and Investor Hub.
- 7 Shree backend tests passed, including local HTTP ownership/origin checks. Total 46 scoped passing tests.
- 13 route smoke checks rendered an expected page heading. These prove route availability, not complete interaction behavior.
- Earlier implementation checks covered desktop/mobile/narrow browser flows and typecheck/builds; the full browser suite and full enterprise suite were not rerun for this status report.
- Local servers listening: 4177(MAATAA/TLPS), 4180(Support Center), 4181(Shree test hub).
- Live Shree configuration: configured=false, test mode, settlementCurrency=null, every generic product unavailable/no price.
- Live Chitragupta capabilities: HTTP200, not_configured, no enabled financial actions or reported balance.
- Brahmini local runtime: no successful status response on 4175. No external AI request attempted.
- Artwork files:659 frame WebPs plus 8 scene WebPs; 667 matching provenance sidecars. Last stored export manifest says659 complete and 0 failures/overflows. No new 659-frame export run today.

## Priority dependencies

1. Define sellable SKU deliverables, seats/project units, billing periods and approved prices. Confirm dollar denomination and Saptdhatu policy separately.
2. Configure Razorpay test credentials, webhook secret and explicit settlement currency; complete a real provider sandbox transaction and webhook acceptance.
3. Implement membership recurring billing and entitlement lifecycle separately from investment records.
4. Choose an appropriate escrow/custody provider and establish account/authority/transaction verification before any deposit or release capability.
5. Specify wallet custody, chains, RPC/indexers and ownership/signing flow before implementing Chitragupta transactions.
6. Start Brahmini runtime and verify a selected provider if AI generation is required.
7. Prepare a clean exact release candidate; reconcile stale readiness documents and obtain required external/manual acceptance.

## Evidence and previews

- [TLPS onboarding](http://127.0.0.1:4177/#/tlps/onboarding)
- [Workplaces](http://127.0.0.1:4177/#/tlps/workplaces)
- [Investor Hub](http://127.0.0.1:4177/#/tlps/investor-hub)
- [Theme Studio](http://127.0.0.1:4177/#/theme-studio)
- [Artwork library](http://127.0.0.1:4180/#/artwork)
- [Shree payment hub](http://127.0.0.1:4181/#/gaming/payments)
- Source: examples/support-center/README.md; payments/PRODUCT.md; apps/tlps/src/investor/PRODUCT.md; public/payments-api contracts/SKU catalogue; frame-manifest.json; docs/release/RELEASE-READINESS.md.

No credentials, user records, investments or payment transactions were changed by this audit.
