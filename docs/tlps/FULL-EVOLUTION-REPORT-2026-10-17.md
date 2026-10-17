# TLPS / MAATAA full evolution report

As of 17 October 2026, Asia/Kolkata. Scope: the TLPS-related evolution visible in this conversation and this repository, including supporting MAATAA UI, theme, artwork, support, commerce and backend work. “Full” covers this observed scope; it is not an exhaustive history of every MAATAA repository or an external production audit.

## Current outcome

TLPS has evolved from a single browser-local production-planning demonstration into a branded MAATAA product surface with standalone workflows, a workplace directory, local operational registers, themes, artwork, support resources, financial-planning registers and a tested local database/API foundation. Two supplied documents now describe a substantially broader future platform: a 169-table domain schema and a 228-route mobile specification.

The layers are at different maturity levels. Local demonstrations and assets exist. The new backend persists a bounded subset. Existing screens are not automatically connected to that new backend. Proposed mobile routes and normalized schema have not been implemented wholesale. Real subscriptions, capital collection, custody, escrow release, crypto operations and hosted production readiness remain unestablished.

## Evidence and interpretation

- **Committed source:** dated Git history records a change. It does not by itself prove current runtime operation or deployment.
- **Current source/artifact:** inspected files exist in this working tree. They may be uncommitted and may require integration.
- **Tested local behavior:** the latest backend/client task recorded 95 passing tests, plus typecheck/lint. This does not qualify the whole UI, payment providers or a release.
- **Historical report:** the 16 October status matrix documents an earlier local audit. Its runtime observations are not fresh checks of today's services.
- **Proposed design:** the two supplied JSON documents define intended scope. Prototype/generic/planned labels are preserved, not promoted to implementation claims.

Repository snapshot: branch `codex/tlps-in-brand`, HEAD `078045b1e5ac9da1a2a850f95c388cba040deeed` (16 October), package `1.0.0-alpha.8.7`. The working tree is dirty and contains unrelated Auth/IPC/Tauri/release/selector work. No push, pull-request, DNS, TLS, hosted merchant or production deployment verification was performed for this report.

## Evolution timeline

| Date | Milestone | What changed | Evidence / limit |
|---|---|---|---|
| 5 Oct | Initial production workflow | Browser-local project intake, budget, crew/location planning, schedule, preview review, rehearsal, evidence metadata and handover | `7deeca6f`; local demonstration rather than authenticated operational approval |
| 5 Oct | TLPS pilot designation | TLPS recorded as a pilot with a designated release owner | `dee8b30d`; designation is not pilot acceptance |
| 6 Oct | Public entry and onboarding | Public TLPS surface and guided entry | `1b8443ef`; browser setup, not account provisioning |
| 9 Oct | Standalone products | TLPS and TLP Film workflows separated into runnable product surfaces | `bddfec53`; product separation, not separate production deployments |
| 10 Oct | Shared project handoff | Shared projects across MAATAA desktop and TLPS | `e5167f44`; existing shared metadata/handoff, not the later full TLPS body database |
| 12 Oct | Taxonomy ownership | TLPS-specific workspace families and AI spaces moved into the product's source boundary | `ca6e0e38`, `7733d057`; registry vocabulary is not complete functionality |
| 12 Oct | Twenty work areas | Local work areas for all 20 OS entries | `c613c523`; demonstrations/registers with varying specialization |
| 12 Oct | Service boundary | Mocks and MAATAA Auth/API client established a backend-facing seam | `9a913a1f`; an interface/mock is not a connected provider |
| 12 Oct | Flow and scene design | Node workflow/scene designers and Film OS scene board | `fd34454f`; authored planning UI, not automated film production |
| 12 Oct | MAATAA compounds | Work areas, services, flow studio, storage/search/setup fields reused MAATAA compound components | `fe8fdbe3`, `e8855cc0`, `0d5d2f2c`; reduced duplicate UI building blocks |
| 12 Oct | Desktop boundary | Tauri desktop/API routing and per-window/session behavior evolved | `6aa70563`, `ff908c17`; current additional IPC changes remain separate pending work |
| 14 Oct | tlps.in branding | Brand reference, voice guidance and theme-aware brand-kit export | `8d21c7b7`; no live domain deployment established |
| 14 Oct | Workplace directory | Searchable workplace directory and separately saved demo workflows | `eda16f07`; historical documented coverage: 222 unique mapped workplace IDs / 327 area-workplace pairs |
| 15 Oct | Action and step icon bars | New record, samples, review, step check, export and restart; Prepare/Review/Rehearse/Handover step gates | `da3d24f4`; local review is not server authorization |
| 15 Oct | Theme Studio library | Warm Paper, Cinema Gold, Slate Teal, Ink White, Graphite Paper, Blue Notebook and Kraft Sketch retained as presets | `74506f1a`; preview then explicit apply, browser-local preferences |
| 15 Oct | ASCII theme | ASCII Terminal preset with monospace typography and terminal palette | `1a50a353`; theme styling, not a terminal runtime |
| 15 Oct | Arcade and support | Arcade Quest theme, game UI resources and support hub | `654ef5e3`; game-styled interface, not a playable engine |
| 15 Oct | Artwork and guides | Frame library, illustrations, game handbook/playbook/guides | `435a8762`; reusable illustrated scenes, not unique illustration generation per frame |
| 15 Oct | Shree / Chitragupta | Razorpay test adapter and payment/wallet contracts | `1a669417`; merchant configuration and external sandbox acceptance not established |
| 16 Oct | Investor Hub | Separate circles, membership notes, non-binding investment interests and escrow-review registers | `078045b1`; no pooled funds, activated membership or custody |
| 16 Oct | Status matrix | Consolidated local feature/provider/release boundaries | `docs/status/TLPS-MAATAA-STATUS-2026-10-16.md`; historical snapshot |
| 17 Oct | Project stages | Idea → Story → Board → Pre → Production → Post → Release → Shree component and focused Storybook story | Current uncommitted source; navigation only. Source exports ProjectStages, but today's browser render was not rechecked |
| 17 Oct | Database/API foundation | SQLite migration, 12 typed collections, same-project references, transactional audit, idempotency, version guards, export and typed client | Current uncommitted implementation; 95 tests passed in preceding task |
| 17 Oct | Schema comparison | Supplied proposed 169-table grouped design assessed against the local backend | Comparison artifact; no proposed DDL applied to the actual database |
| 17 Oct | Route/frame comparison | Supplied 228-route mobile design assessed against current TLPS routes/screens/API | Comparison artifact; canonical mobile route family not implemented by this task |

Dates above follow commit dates where available, rather than inferring an exact creation date from the spoken conversation. Current local changes can extend beyond HEAD.

## How the product model expanded

### Production planning to product shell

The original runnable flow focused on one production plan. It constrained budget totals, collected crew/location and timed schedule information, demonstrated producer/owner review, separated planning and rehearsal evidence, and exported a handover. It used validated browser storage; retained evidence metadata/digests rather than uploaded files; and kept booking/payment/readiness claims false.

Standalone TLPS/TLP Film and desktop project handoff then separated product responsibilities while retaining MAATAA components. Guided onboarding added audience/role, content format, idea, journey (I2S/I2R/I2B), and automation preference. Deterministic path guidance and optional browser speech input did not establish AI script/film generation.

### Product catalogue to usable workplace demonstrations

Twenty areas broadened the scope: Production, Film, Campaign, ATL, BTL, OOH/DOOH, Marketplace, Evidence, Finance, Investor Hub, Event, Wedding, Exhibition/Spatial, MAATAA AI, Analytics, Core Platform, Casting, Crew, Location and Equipment/Logistics.

The documented workplace directory contains 222 distinct mapped IDs and 327 area/workplace demos. Those are historical source-coverage counts from the authored directory documentation, not a fresh count performed by this report. Each demo supports local records, samples, status changes and a four-step rehearsal. Action bars make these actions discoverable; step bars expose saved progress and lock future review steps. Generic reuse does not imply hundreds of specialized live services.

The later project-stage bar is a separate navigation model: Idea, Story, Board, Pre, Production, Post, Release, Shree. It neither replaces the four rehearsal gates nor establishes completion or finance authority.

### Brand and themes to visual system

The tlps.in brand reference evolved into a retained theme library. Nine curated presets are visible in source: Warm Paper, Cinema Gold, Slate Teal, Ink White, Graphite Paper, Blue Notebook, Kraft Sketch, ASCII Terminal and MAATAA Arcade Quest. Appearance modes (System, Dark, Light, High Contrast, OLED) are a different setting from these curated visual presets.

Paper themes added material styling; Blue Notebook added ruled paper. ASCII introduced monospace/terminal styling; Arcade introduced a game visual direction. Themes use the existing MAATAA token/component authority and require explicit application after preview.

### Game styling to support and artwork

The support/game resource work added handbook, playbook, guides and a searchable artwork gallery. The inspected manifest dated 15 October reports **8 source scenes, 659 named frames, 659 completed exports, no listed failures/overflows**. Its source breakdown is 616 MAATAA workspace entries + 31 TLPS product entries + 12 Support Center states. The frames reuse scenes with registry-derived titles and synthetic content. This report inspected the manifest, not a fresh render of every frame.

Support includes search, FAQs, workspace help and local handoff drafting/export. A local handoff is not an externally submitted ticket or a connected support queue. Arcade styling and resource pages are not proof of gameplay, multiplayer or a game engine.

### Commerce request to bounded payment adapter

Requested scope covered game access, subscriptions, digital items, articles and other goods; merchant country Bhaarat; direct UPI, Razorpay, Stripe, Apple Pay, Google Pay, Paytm, Cashfree and other options; and Chitragupta cryptocurrency/Bitcoin/NFT capability.

Implemented source provides a **test-only Razorpay adapter** with server-created orders, hosted Checkout, HMAC verification, payment reconciliation, signed webhooks and refund status handling. The supplied source documentation states that no external merchant sandbox transaction has been verified. Other providers are listed options rather than independent active adapters; Google Pay/Paytm availability through hosted checkout is conditional.

The 26 TLPS SKUs remain drafts with null prices and disabled checkout/fulfillment. `TLPS-HOD-ACCESS` is catalogue vocabulary, not a paid entitlement. The eight requested dollar values (0.9, 9, 99, 499, 4,999, 49,999, 499,999, 4,999,999) prompted indicative conversion material; they did not establish approved SKU prices, recurring billing units or a Saptdhatu exchange policy. No fresh exchange rate is calculated in this report.

Saptdhatu denomination/conversion remains undefined. Chitragupta exposes unavailable/unconfigured capabilities rather than chain balances, signing, custody, transfers or NFT minting. Keep the Shree single-process local payment ledger distinct from the new TLPS project database: they have not been unified by this task.

### Investor Hub to separate financial planning flows

The user's decision was to support both membership fees and investment-capital intent as separate flows. The local UI therefore separates circles, membership/subscription notes, non-binding interests and escrow review notes. Exports explicitly carry planning-only limitations.

The new API has circles, membership plans, investment interests and escrow reviews, but these are not a one-to-one automatic migration of every existing UI record. It does not activate members, charge recurring fees, collect investment capital, hold balances or release funds. Binding capital commitments and escrow ledger/custody/release require additional architecture.

### Local data to database/API foundation

The backend extends the existing MAATAA Auth/API runtime, preserving its core schema version 3 while adding independent TLPS migration version 1. It adds six tables: entities, same-project links, append-only events, idempotency receipts, draft SKUs and migration history. The resulting initialized database has 14 non-internal tables in total.

Twelve collections cover project profiles, onboarding, workplace records, budget items, crew assignments, locations, schedule items, evidence, circles, membership plans, investment interests and escrow reviews. Protections include project read/write scopes, strict field validation, immediate write transactions, version conflict rejection, create replay keys, linked-target deletion checks, bounded pagination and exports. These scopes are not full department/organization RBAC.

The private prepared database and backup both passed integrity_check and contain 26 draft SKUs and **zero projects**. The pinned catalogue validates 647 workspace IDs; it is broader than the 222 mapped workplace IDs documented for the TLPS directory. Those counts describe different inventories and must not be conflated.

Latest task verification: 63 library tests (47 TLPS + 16 existing), 3 runtime tests, 1 existing HTTP integration test, 18 new TLPS HTTP tests, and 10 client tests: **95 passed**. Typecheck and Clippy also passed. Tests cover CRUD, access isolation/revocation, concurrency, rollback, replay, migration tampering, validation, audit and backup. This report did not rerun those suites; it references the immediately preceding task evidence and verification record.

The typed client is prepared; existing UI persistence was not switched automatically. No persistent API server was started by database preparation. The new TLPS routes were not added to the desktop IPC allowlist in that task. Other pending IPC changes must be reviewed separately.

## Brahmini and delivery coordination

Brahmini appeared as the assistance/workbench layer around product creation, guidance and provider setup. The 16 October status report distinguished available UI/documentation from unavailable provider execution in that earlier live check. This report did not contact the provider runtime again. Therefore no current autonomous generation, model quality, deployment or production capability is inferred from the Brahmini screen or assistant/team labels. Authored source/assets and verified test outputs remain the evidence of delivered work.

## Issues encountered and what remains open

| Issue | Evolution / disposition |
|---|---|
| Blank workplace preview | Conversation recorded recovery after refresh; an earlier server-down explanation was corrected. No continuing root-cause claim is made here. |
| Missing Storybook project-stage story | User reported the missing story ID. Current source now exports ProjectStages under Workflows/Step Bars; a fresh live browser check remains outstanding in this report. |
| Theme options initially temporary previews | Retained in the central Theme Studio preset catalogue, then expanded with ASCII and Arcade. |
| Payment ambition exceeded connected capabilities | Provider readiness and disabled financial boundaries were made explicit; real merchant activation remains open. |
| Browser-local storage versus shared backend | New SQLite/API foundation addresses bounded persistence, but connecting existing screens remains open. |
| HTTP test startup/read failures | The preceding backend task corrected private temporary-directory permissions and complete-response reset handling; final suite passed. |
| Broader schema/route ambition versus existing implementation | Separate comparison reports now expose incompatibilities; no blind migration or route-completion claim was made. |
| Release evidence versus ongoing changes | Local history and tests are recorded; the dirty current tree has no fresh exact-candidate enterprise qualification. |

## The new design target

| Design input | What it contributes | What it does not prove |
|---|---|---|
| Grouped schema v1.2.0-proposed | 169 tables, 1,616 columns, 18 groups, 279 explicit indexes, 42 triggers | Installed database, seeded roles, authorization or working APIs |
| Routes/frames file | 228 unique proposed paths, six OS with 61 frame entries, ten role workspaces, nine required common states | Registered URL routing, fully interactive screens or persistent workflows |
| Route coverage labels | 53 prototype pages, 130 generic prototypes, 45 planned routes | 228 completed product features |
| Cross-document consistency | The routes file's 169 table names match the grouped schema | Screen-to-endpoint/schema implementation parity |

The schema DDL loaded successfully into disposable SQLite. Two gaps were reproduced there: audit_log accepts edits/deletes, and payment records permit repeated external references when provider identity is null. The supplied JSON contains seed counts, not the seed row payloads needed to install that access policy.

The routes filename says v1.2.0 while its internal version says 1.0.0-proposed. Its source note explicitly says the separate mobile prototype uses client-side screen keys and proposed canonical `/m` paths. Current TLPS instead uses hash routes under `/tlps`. Unknown current TLPS subpaths fall back to the public home, so an apparently loaded page is not route-coverage evidence.

Important semantic collisions need resolution: personal profiles versus project profiles; tenant workspaces versus workflow workplaces; existing and proposed projects tables; eight UI stages versus a broader lifecycle; role navigation versus server permissions; membership fees versus capital commitments and escrow. The proposed schema/route files are valuable future blueprints, not drop-in replacements.

## Current maturity matrix

| Layer | Current disposition | Next proof needed |
|---|---|---|
| Brand/themes | Committed local UI source | Fresh whole-app/device acceptance and any hosted release |
| Workflow/workplace demos | Committed local behavior; browser persistence | Connect real data services and qualify specialized operations |
| Project stage bar/Storybook | Current local source, uncommitted | Fresh story render and focused interaction checks |
| Artwork/support resources | Committed source/assets; manifest available | Refresh exports/screenshots when source changes; establish ticket backend if required |
| Shree test payments | Adapter source, unconfigured/unaccepted externally | Server credentials, approved prices, provider sandbox acceptance and fulfillment design |
| Chitragupta | Capability contract with operations unavailable | Chain/wallet model, provider connection, signing/custody decisions and tests |
| Investor Hub | Local planning registers + bounded backend models | Connect UI, implement membership and investment lifecycle without conflating flows |
| TLPS database/API | Locally tested, current uncommitted foundation | UI integration, finer authorization, operational hosting/backup/retention acceptance |
| Proposed normalized schema | SQLite syntax/assembly checked | Migration design, seed payloads, invariants and API implementation |
| Proposed mobile app | Consistent route/frame specification | Version fix, canonical routing, real screens, data integration and nine-state acceptance |
| Release | Alpha package in dirty working tree | Scoped review/commits and fresh exact-candidate qualification; no production readiness asserted |

## Recommended next evolution

1. Establish one product contract: route registry, terminology, project/workspace ownership, roles, lifecycle and UI-stage mappings. Keep existing URLs compatible.
2. Review the new backend as a bounded change, preserving unrelated work; decide whether normalized schema migration lives in the existing database or a separate service. Do not execute the proposed projects CREATE statement over the current table.
3. Connect one vertical slice: project list/detail → onboarding → production records → authenticated review/audit → export. Add loading, empty, error, offline, forbidden, not-found, conflict, success and destructive-confirmation behavior where applicable.
4. Implement the proposed domain groups incrementally. Prioritize identity/tenant access, shared project workflow, files/evidence and production operations before counting broad route coverage.
5. Keep commercial activation independent: approved SKU/price mapping, INR settlement decision, Razorpay sandbox acceptance, webhook reconciliation, recurring subscription lifecycle and entitlements. Capital commitments/escrow need separate explicit models and authority.
6. Qualify an exact release candidate only after integration: scoped tests, migrations/restore, browser and device checks, access controls, provider acceptance where relevant and a clean reviewable source boundary.

## Evidence map

- Git commits listed in the timeline; these record local source history.
- `docs/engineering/tlps-workflow.md`, `tlps-local-demo.md`, `tlps-public-surfaces.md` — workflow/public/directory behavior and boundaries.
- `examples/redux-demo/themeStudioPresets.ts` — current curated theme list.
- `examples/support-center/README.md`, `public/artwork/frame-manifest.json`, `payments/PRODUCT.md` — support/artwork/payment scope.
- `apps/tlps/src/investor/PRODUCT.md`, `project/PRODUCT.md` — investor and stage-bar scope.
- `docs/status/TLPS-MAATAA-STATUS-2026-10-16.md` — earlier status, not a fresh runtime audit.
- `docs/tlps/DATABASE-API.md`, `VERIFICATION.md`, `openapi.json` — new backend contract and immediately preceding test evidence.
- `docs/tlps/SCHEMA-COMPARISON-v1.2.0.md`, `ROUTES-FRAMES-COMPARISON-v1.2.0.md` — supplied document comparisons and observed incompatibilities.

This report adds documentation only. It does not change application behavior, apply the proposed schemas, configure payment credentials, update memories, or certify deployment.
