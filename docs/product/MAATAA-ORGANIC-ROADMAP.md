# MAATAA organic integration roadmap

**Purpose:** connect the existing MAATAA components in the order their contracts depend on one another, while preserving each component’s authority and avoiding a big-bang rewrite.

**Target user path:**

`Hemant Samwat → MAATAA OS → MAATAA Desktop → MAATAA UI → Brahmini → TLPS`

**Supporting service plane:**

`MAATAA Auth → MAATAA DB Studio → DBB / HKDB → MAATAA API Studio`

## Service-plane implementation update

The current alpha7 working tree extends `apps/maataa-auth-api` with SQLite schema versions 1–2 and an HKDB-shaped metadata API: project-scoped knowledge objects, relations and assertions with source/method provenance. Local Rust unit coverage includes additive migration against a legacy table, migration fingerprint tamper rejection, scope denial, same-project reference integrity, and refusing `verified` assertion status. This advances the prototype but does not complete the canonical service plane: `maataa-auth`, DB Studio and API Studio have no separate canonical repositories in the reviewed scope; the local process is still a combined Auth/API/SQLite prototype rather than separately deployed Auth, API Runtime and DBB services; clients are not integrated; and production identity, operational security and backup/recovery remain gates.

**Implementation recommendation:** build DBB/HKDB in Rust as a separate service/runtime boundary, not inside the MAATA OS kernel. Keep its storage engine and migrations behind a versioned interface; MAATA OS should consume a small client/protocol adapter when it can provide a real IPC/transport boundary. A reusable no-std contract/types crate may be shared only if needed, while filesystem/database drivers, indexing and query execution stay outside the kernel. This lets Desktop, MAATA UI, Brahmini and TLPS use one authority, and avoids coupling OS boot or safety-critical paths to database availability. This is the recommended design, not yet an implemented or owner-approved deployment decision.

The service plane gives the product path identity, durable project records, and versioned interfaces. It supports the target path; it does not replace or become the OS. **Owner decision (2026-10-09): DBB is to serve as HKDB, the Holistic Knowledge Database.** DB Studio remains the schema, knowledge-model and migration authoring workbench; DBB/HKDB is the governed persistence, lineage and query runtime. This establishes intended responsibility, not proof that a DBB repository or service exists. The user named `maataa-auth` twice; this roadmap includes it once.

## Architecture principles

1. **Separate authorities.** Hemant defines time representations and conversions; a clock source supplies measurements. MAATAA OS owns its embedded runtime. ALLB owns its separately accepted software-runtime scope. Desktop owns entry/window/workspace orchestration. MAATAA UI owns product composition. Auth owns identity/session/policy. DB Studio authors approved schemas and migrations; DBB/HKDB owns governed knowledge persistence, provenance/lineage and retrieval. API Studio owns versioned service contracts and adapters. Brahmini proposes governed work. TLPS owns film/content domain records.
2. **One project identity across the route.** A project ID and version should survive every real boundary. Store large artifacts once and reference their version/digest from event history. Do not create competing local registries that only look shared.
3. **Progressive authority.** Start local-first with explicit unverified states. Add durable service-backed identity and data only when the canonical service is identified and its boundary is testable. A demo or localStorage record is useful prototype evidence, not production authorization or shared persistence.
4. **Every transition is observable.** Requests, events and results identify the actor, source, version, clock basis, method, status and failure reason within privacy limits. Never capture private content by default.
5. **Fail closed on writes.** Preview, digest, expected version and human approval precede TLPS mutation. Stale, duplicate, unauthorized or malformed requests do not write.
6. **Evidence controls claims.** “Implemented,” “locally tested,” “runtime verified,” “externally validated,” “hardware verified,” and “production ready” are separate labels.

## Roadmap in dependency order

| Phase | Work | Exit evidence |
|---|---|---|
| 0. Authority and workspace baseline | Identify canonical checkouts and responsibility boundaries for Hemant, MAATA OS, ALLB, Desktop (Electron/Tauri), MAATA UI, Auth, DB Studio, DBB, API Studio, Brahmini and TLPS. Record current commit/dirty state and applicable tests. Do not merge similarly named repositories. | Source/authority map tied to current tree; exact gaps and safe write scope. |
| 1. Hemant time contract | Keep epoch/calendar convention separate from clock source. Define UTC/Unix input semantics, monotonic interval semantics, precision, uncertainty, provenance and versioned output. Keep host-clock readings unverified unless an independent sync/validation contract proves otherwise. | Deterministic Rust core/CLI/API tests and sample output with honest clock status; no fabricated Panchanga or astronomical values. |
| 2. MAATA OS runtime seam | Inspect QEMU boot, timer, devices, kernel and K7 evidence. Specify a narrow capability/time service only where actual OS code can provide it. Connect a real OS-originated reading or mark the bridge blocked; do not feed host time into a simulated tick and call it sync. | QEMU-originated service response with provenance and failure tests, or a precise blocked gate that downstream apps expose. |
| 3. Identity and policy foundation — MAATA Auth | Locate the canonical `maataa-auth` source. Distinguish authentication (who), authorization (what), local profile/demo state, and real server enforcement. Define principal/session/project-scope contracts; no UI guard alone counts as authorization. Keep local-only mode explicit if no service is connected. | Contract and negative tests for missing/expired/wrong-scope sessions; identity is not inferred from project ownership or device path. |
| 4. Data foundation — MAATA DB Studio and DBB/HKDB | Locate `maataa-db-studio` and any DBB service separately. DB Studio authors/reviews the versioned knowledge schema and migration plan; DBB/HKDB persists and serves governed records. Model knowledge as typed objects and relationships plus claims/observations, source/evidence references, provenance/lineage, method and time basis, verification state, and version history. Minimize private content and apply explicit retention/access policy. Preserve TLPS as owner of film-content records: HKDB may store approved metadata/evidence and stable references, but must not silently absorb or duplicate full domain payloads. Prefer additive migrations, idempotence, conflict detection, backup and recovery. If no canonical DBB exists, define/test the interface with synthetic fixtures without presenting an adapter as production storage. | Versioned schema and migration plan; synthetic read/write, provenance/lineage query, replay, stale-write, access-denial, corruption and recovery tests against the selected local service or a clearly labeled adapter. No live service claim until DBB/HKDB exists and is exercised. |
| 5. Service interface — MAATA API Studio | Locate `maataa-api-studio`; connect versioned API definitions to actual Auth and DBB contracts. Declare capabilities, errors, idempotency, request correlation, schema versions and clock provenance. Keep secrets out of source and logs. | Contract conformance tests against the real local service; unauthenticated, incompatible-version, timeout and unavailable paths fail visibly. |
| 6. Desktop as the operating entry point | Connect the selected Desktop shell(s) to OS status and service capabilities. Preserve Electron and Tauri while both are supported. Show active identity mode, runtime reachability, clock trust, current project ID/version and clear degraded states. Desktop should route, not become another source of truth. | Native/local smoke plus tests; same project ID/version reaches the launched MAATA UI; no file preview mistaken for native service integration. |
| 7. MAATA UI as project-aware product layer | Launch UI with the selected project context, authorized capability set and data/API adapters. Ensure UI composition does not bypass server-side Auth or persist a parallel canonical project. Preserve provenance and handle stale versions. | UI reads the same record; denied/unavailable states are tested; round trip preserves version or reports conflict. |
| 8. Brahmini governed intelligence | Ground planning in approved project sources; label facts, assumptions and unknowns. Model use is role-specific and digest-pinned when qualified. Return proposal → preview → digest-bound approval; allow only existing, narrowly typed actions. No generic shell/browser/file execution. | Synthetic and local tests cover refusal, tamper, stale approval, unqualified model, missing sources and successful approved proposal. Quality claims require a separate evaluator, not format validity. |
| 9. TLPS first complete domain workflow | Complete Idea → Script → review → approved save → version/history inside the one shared project record. Keep budgeting, bookings, payments, providers, accounts or sync unclaimed unless integrated. Never overwrite existing drafts. | End-to-end local run with a fresh synthetic project ID, human approval and verified version transition; conflict/reject/recovery leave prior content unchanged. |
| 10. Cross-layer acceptance and operations | Exercise Hemant → OS → Desktop → UI → Brahmini → TLPS and return to Desktop. Include service plane calls, identity scope, persisted record, event ordering, clock basis, errors and recovery. Build current source, package only if safe, collect exact commit/tree evidence. | One real trace proves each claimed boundary. If OS cannot supply a live service, report the last proven hop and keep full-chain status blocked. No mocks count as runtime proof. |
| 11. Scientific expansion | In parallel only after methods/data rights and owner decisions are clear: Panchanga ruleset and location policy; ephemeris source, licence/hash, time scale/frame, independent references/tolerances; then bounded astronomy outputs. Keep traditional time-unit representations distinct from astronomical measurements and test any claimed relation. | Reproducible reference comparisons with method/version, source, units, uncertainty and tolerance. Until then, outputs remain pending/illustrative. |
| 12. Later product tracks | After TLPS’s shared flow is accepted, extend the same contracts to NEVO and other studios. Treat model training, Siddham hardware/NPU, spacecraft navigation and cloud production as separately scoped qualification programs. | Separate acceptance plans and evidence; these tracks do not retroactively certify the core path. |

## Confirmed status update — 2026-10-09

The owner confirmed that standalone canonical repositories for `maataa-auth`, `maataa-db-studio`, and `maataa-api-studio` do not exist yet. The duplicate mention of Auth refers to one component. This is a decision about current repository availability, not proof that similarly named folders contain no prototype code.

- The SQLite auth store under the MAATAA OS Electron app is a local demo with seed credentials in source. It is not a secure identity service and must not be reused. A separate Rust Auth/API local prototype now lives in `apps/maataa-auth-api`; it uses project-scoped opaque bearer tokens and a SQLite project-record store, but it is not a production identity service.
- `src/workspaces/APIStudioWorkspace.tsx` in alpha7 is a UI workspace, not the API service or canonical API Studio repository. The new `apps/maataa-auth-api` binary is a local API runtime prototype, not API Studio.
- No DBB service/repository was found in the reviewed path. Owner decision now sets DBB’s intended role as HKDB; this does not change implementation status. Keep DB Studio (schema/model and migration authoring) distinct from DBB/HKDB (governed knowledge storage/query runtime).
- Keep the Rust Auth/API service loopback-only and development-only until identity authority, TLS/hosting, secret management, rate limits, backup/recovery and operational policy are selected and tested. It is not yet integrated with Desktop, MAATA UI, Brahmini or TLPS; do not claim production Auth, public hosting, or HKDB persistence.

## Latest implementation and check evidence

The 2026-10-09 handoff reports these changes and check runs; the named logs are stronger evidence than the earlier “not run yet” note in the same handoff. Treat them as historical local evidence and re-run against the current tree before release claims:

- Tauri Desktop gained a v3 registry link for a TLPS record ID and version. It stores metadata only, accepts forward-only version changes, treats replay of the current version as idempotent, rejects older versions, and reads prior v1/v2 indexes. Rust formatting and 14/14 Rust tests passed in `runtime-evidence-20261009T052806Z.log` ([source repository only](../REPO-ONLY.md)).
- TLPS Idea → Script registers its `prj:` ID/version with Tauri after approval. The latest mocked and local Ollama browser runs passed; the local `qwen2.5-coder:7b` draft passed only a deterministic structure check and was approved in the isolated test flow as v2. This is not a script-quality evaluation or model qualification. See `tlps-idea-to-script-20261009T052822Z.log` ([source repository only](../REPO-ONLY.md)).
- Observatory’s Rust, shell/contract, TypeScript, Next build and desktop/mobile browser checks passed in `apps/hemant-observatory/evidence/check-20261009T052907Z.log`. Clock source remains unverified; Panchanga and astronomical calculations remain pending.
- Tauri record linking is still Tauri-only. Electron’s one-entry-per-app list cannot safely represent a TLPS record link yet. MAATAA UI is not in the active path, and no native Tauri↔TLPS round-trip has been observed. Those remain explicit acceptance gates.
- A saved run log recorded alpha7, ALLB and MAATA OS as unchanged during that run. The current checkout has since changed: the alpha7 tree is dirty, ALLB has local changes, and a fresh read-only status check found maataa-os clean. Re-capture exact commit and dirty paths before the next implementation or qualification run.

## Current evidence baseline to re-check

Saved project reports dated 2026-10-09 describe:

- Hemant Observatory local Rust, TypeScript, Next and desktop/mobile browser checks as passing in a reported macOS run. Time remains host-clock-unverified; this does not show QEMU time sync.
- Panchanga computation blocked on tradition/source edition, location policy, ayanamsha and sunrise rule. Astronomy has a DE440 design but no licensed, pinned dataset or validated positions.
- MAATA OS has QEMU alpha evidence; K7 is unverified. ALLB has a separate local software runtime and local Desktop handshake evidence; neither is the MAATA OS bridge.
- Desktop, MAATA UI, Brahmini and TLPS have useful local slices, but the project/event record is not yet proven end-to-end across the whole route.
- Reports say no connected DBB service or MAATA Auth/API Studio bridge was found in the reviewed path. This is **not proof those repositories do not exist**. Phase 0 must locate and inspect each named project before calling it absent or selecting an implementation.

The current repository may have moved on. Re-run relevant gates and bind every status to the exact current checkout, commit and dirty state.

## First vertical slice

The smallest useful product outcome is one local, synthetic TLPS project whose stable ID is approved and stored by TLPS, then appears in Tauri Desktop with the same ID/version and history; the handoff reports this link implemented but its native round-trip still needs a manual smoke test. Next add MAATAA UI/Brahmini to that same record. Until the missing Auth/DBB/API services exist, explicitly label the flow local-only and unauthenticated; do not imply shared production storage. Hemant metadata stays host-clock-unverified, and no astronomy values or user data are needed for this slice.

## Global completion rule

The roadmap is not complete because every app builds or every UI page exists. The core path is complete only when the same project identity/version traverses every boundary claimed in the architecture, writes are authorized and non-destructive, failure cases are tested, and evidence matches the current source tree. Any missing OS, Auth, DBB or API service is a named blocker—not a fake green state.

## Status note — 2026-10-09 (bound to alpha7 HEAD `9c8d8433` plus uncommitted edits)

- **Phase 6 (Desktop):** Tauri registry v3 links record ID and version, locally tested (macOS cargo test). Desktop now opens MAATAA UI or TLPS on one record and refuses stale or unknown versions. A native observation is still pending (`scripts/run-tauri-native-smoke.sh`). Electron is not covered.
- **Phase 7 (MAATAA UI):** Brahmini Workbench reads the record context by ID and version, flags stale and mismatch states, and hands off to TLPS. Browser-tested only.
- **Phase 9 (TLPS):** Idea → Script writes are context-checked and guarded against base versions made stale by another window. A live local-model draft was approved as v2 once (the model is unqualified).
- **Phases 3 and 5 (Auth/API):** alpha7 now contains a locally tested Rust Auth/API prototype; it is not connected to product clients and lacks production identity/deployment controls. **Phase 4 (DB Studio/DBB/HKDB):** still not implemented. Existing TLPS flow remains local-only until integration is completed.
- **Phases 2 and 11:** unchanged. OS time is blocked; Panchanga and ephemeris await owner decisions and data.
