# Claude execution prompt: Hemant Samwat → MAATAA OS → Desktop → MAATAA UI → TLPS, with Auth/DB/API studios

Copy the prompt below into Claude Code/Cowork after opening the canonical MAATAA workspace. It asks Claude to inspect first, then execute the safe, evidence-backed integration work in dependency order. It does not authorize destructive cleanup, publishing, or unsupported scientific claims.

---

## Prompt

You are continuing engineering work on the MAATAA ecosystem on this Mac. Your mission is to scrutinize, implement, and verify the complete end-to-end path:

**Hemant Samwat time/provenance → MAATAA OS runtime boundary → MAATAA Desktop → MAATAA UI → TLPS project workflow.**

The supporting service path must also be investigated and integrated in dependency order: **MAATAA Auth → MAATAA DB Studio → DBB/HKDB → MAATAA API Studio**. The user named `maataa-auth` twice; include it once. These are first-class roadmap components, not optional footnotes. Auth owns identity/session/policy; DB Studio authors and reviews versioned schemas, knowledge models and migrations; by owner decision, DBB is intended to be HKDB (Holistic Knowledge Database), the governed persistence/provenance/lineage/query runtime; API Studio owns versioned API definitions/adapters. This is an architecture decision, not evidence of an existing HKDB implementation. Verify canonical repositories and actual behavior from source instead of assuming names describe shipped capabilities.

The goal is one traceable project and one honest event history flowing through those layers, with explicit scientific and runtime evidence. Follow `docs/product/MAATAA-ORGANIC-ROADMAP.md` as the dependency-order source for this task; reconcile it with current code rather than treating its status snapshot as fresh proof. Do not return a design-only answer, a mock-only integration, or a “complete” label based on compiling individual pieces. Work through the phases below, finish every independent safe task, and leave a precise, evidence-backed blocker for any step that truly requires a product-owner decision, unavailable authority, or external source.

### Required operating rules

1. **Inspect before editing.** Start by finding applicable `AGENTS.md` instructions, recording each candidate repository’s absolute path, Git root, branch/commit, remote/upstream, and dirty/untracked paths. Read the current roadmap/status documents and the actual source. Reconcile discrepancies between saved reports and current code. A report or pasted handoff is a lead, not proof of current state.
2. **Preserve all existing work.** Never run `git reset`, `git clean`, destructive migrations, broad formatters, mass moves, or deletion. Never overwrite an existing TLPS project/draft. Do not stage, commit, push, publish, deploy, upload data, or modify Google Drive. Preserve unrelated dirty and untracked changes. Do not change frozen tags or unrelated products.
3. **Use canonical sources only after proving identity.** Several MAATAA, OS, runtime, Desktop, and UI checkouts exist. Do not silently pick or merge copies. Identify the authoritative source for each responsibility from repository evidence and report competing copies. Work only in the verified canonical checkout(s), preserving their dirty state. If a necessary write is outside the opened MAATAA workspace or would affect a non-canonical checkout, first show the exact target paths and intended diff, and obtain owner approval before making that external write. Continue safe work that does not depend on it.
4. **Do not conflate runtime authorities.** MAATAA OS/QEMU, the ALLB software runtime/contracts, and Hemant Samwat are separate components until a real interface proves otherwise. Do not rename one as another or treat a health endpoint, simulated QEMU tick, local test, or browser mock as proof of OS integration.
5. **Scientific integrity is mandatory.** Do not invent Panchanga rules, astronomical values, ephemeris results, clock accuracy, K7 implementation, hardware readiness, or “Vedic” equivalence. Every computed result must expose method/version, source or dataset/hash, reference frame and time scale where applicable, units, precision/uncertainty, and validation evidence. Mark unavailable or unverified outputs as such. A match between clocks is not independent validation.
6. **Approval and security boundaries remain real.** TLPS writes require a human-approved, digest-bound preview. No generic agent execution, shell/file/browser automation, auto-clicking, or external-app control. Do not transmit project content to external services or models without explicit authorization. Use synthetic fixtures for tests. Redact secrets, credentials, query strings, and private content from logs.
7. **Do not weaken checks to get green.** Inspect package scripts and existing test guidance first. Add meaningful boundary/regression tests. Run existing relevant gates at each phase and the final full suite that the current machine can support. State clearly which checks ran, which were skipped, and why.
8. **Keep changes reviewable.** Make small, dependency-ordered edits. Before finishing, inspect `git diff`, `git diff --check`, and changed-file lists in each touched repo. Do not claim a phase complete without its acceptance evidence below.

### Starting evidence to verify afresh

The following is a handoff from prior work; verify it against the current checkout and logs before relying on it:

- `apps/hemant-observatory/` contains a std-only Rust time core/CLI and a Next.js dashboard. A reported macOS run used Rust 1.91 and passed 28 Rust tests, clippy with warnings denied, debug/release builds, fixtures, 8 contract/shell tests, TypeScript, Next build, and 46 Playwright desktop/mobile tests (`evidence/check-20261009T044407Z.log`). Re-run or inspect the exact evidence against the current tree. Its clock reading is explicitly **unverified**; it does not establish a live MAATA OS/QEMU clock.
- Astronomy has a design record for JPL DE440, TDB, ICRF, geometric positions, but no downloaded/hashed ephemeris or computed positions. Dataset licence, provenance and independent reference/tolerance validation remain open.
- Panchanga values are not computed. `PANCHANGA-DECISION.md` records choices still needed: tradition/source edition, location policy, ayanamsha, sunrise rule. Do not select these on the owner’s behalf or fabricate values. Continue unrelated phases while surfacing these choices concretely.
- `docs/product/PHASES-1-5-INTEGRATION-STATUS.md` reports a local ALLB handshake/contracts, shared project-event contract, TLPS intake proposal and a narrow Brahmini action allowlist. Verify whether those are still present and current. It expressly did not prove MAATAA OS-to-Desktop runtime, K7, Hemant clock integration, or a single record shared by Desktop/Brahmini/TLPS.
- `docs/product/MAATAA-ROADMAP.md` and `docs/product/TAURI-DESKTOP-ROADMAP.md` are status sources to reconcile with implementation. Electron and Tauri shells both exist; do not remove either or declare a replacement without evidence and owner decision.
- A Drive review in the handoff found a partial older Hemant repo upload with empty source/dataset directories and placeholder evidence. Treat it only as an untrusted archival copy until independently verified; do not download, sync, or import it without explicit approval.
- The owner has now confirmed that separate canonical repositories for `maataa-auth`, `maataa-db-studio`, and `maataa-api-studio` do not exist yet; Auth was named twice but is one component. A bounded inventory found a SQLite auth demo with seed credentials under the OS Electron app and an API Studio UI workspace inside alpha7. Neither is a secure Auth service nor an API runtime. No canonical Auth, DB Studio, DBB/HKDB or API Studio repositories were found. Current alpha7 now contains `apps/maataa-auth-api`, a local Rust Auth/API prototype; inspect and extend it rather than creating duplicate services. It is loopback-only, lacks interactive OIDC/passkey/MFA and production controls, and its SQLite project store is not HKDB. The owner has selected DBB’s intended role as HKDB; keep DB Studio distinct as schema/model/migration workbench and report HKDB implementation as absent until verified. Do not keep searching indefinitely or treat these prototypes as deployed services. Do not reuse, print, or copy the demo seed credentials; do not modify maataa-os files that are outside this workspace without explicit approval.
- The latest handoff reports a real-QEMU-boot-report parser whose result explicitly says OS time unavailable, and a Tauri registry v3 link for TLPS `prj:` ID/version. Reported checks: Tauri formatting and 14/14 Rust tests; TLPS typecheck/build plus mocked and local-Ollama Playwright; Observatory `scripts/check.sh` all passed. The native Tauri↔TLPS UI round-trip has not been observed. The run’s initial note that some tests had not run is superseded by the later pasted logs showing those commands did run and pass. Re-check current-tree status before qualification; the current alpha7/ALLB checkouts are dirty and the latest read-only maataa-os status was clean.
- The active alpha7 worktree has unrelated dirty and untracked changes. Record a baseline and preserve every pre-existing path. Never describe existing changes as yours.

### Execution phases and acceptance gates

#### Phase 0 — Baseline, authority map, and safe plan

- Inventory the current workspace and relevant MAATAA OS, ALLB runtime, Desktop (Electron and Tauri), MAATAA UI, `maataa-auth`, `maataa-db-studio`, DBB, `maataa-api-studio`, Brahmini, TLPS, and Observatory sources. Use existing local documentation and checkout metadata; do not perform a broad disk scan.
- For each component record canonical path, repo/remote/branch/commit, dirty state, responsibility, executable entry point, tests/build command, and evidence freshness.
- Produce a compact dependency/authority map. Explicitly distinguish: time/calendar library, OS kernel/runtime, ALLB software contracts/service, Auth, DB Studio, DBB runtime, API Studio, Desktop shell, UI/product-generation surface, Brahmini, and TLPS domain workflow.
- Update a status doc only if it can be updated without clobbering existing edits; label every claim `implemented`, `locally tested`, `runtime verified`, `externally validated`, `blocked`, or `planned` with evidence.
- **Pass:** exact current baseline and safe work plan exist; no existing changes were lost or reclassified as new.

#### Phase 1 — Hemant time contract and source semantics

- Inspect the current epoch, unit convention, clock traits/adapters, CLI/API response, fixtures and tests. Verify that the selected 1979 Kashi Makar Sankranti epoch is represented as the chosen published minute-resolution instant (14 Jan 1979 13:29 IST = 07:59 UTC) and that its precision is not overstated. Verify the implementation rather than trusting this sentence.
- Keep wall-clock instant and monotonic elapsed-time/order separate. Preserve explicit source, time scale/time zone, precision, uncertainty, sync age/status and method/version fields. A software conversion from Unix time to Hemant units does not make the source clock verified.
- Preserve fail-closed validation, leap-second statement, supported date range, overflow behavior, and exact integer/JSON precision. Do not add a “verified” state without a real, independently checked source and defined acceptance/error bounds.
- Add or fix only tests justified by a real defect. Do not expand the calendar model by guessing.
- **Pass:** CLI/API output is deterministic and explicit about unverified host time; conversion and monotonic behavior are separately tested; source and output schema are documented.

#### Phase 2 — Real MAATA OS/QEMU boundary assessment and smallest truthful bridge

- Inspect the authoritative OS source, boot path, timer implementation, QEMU machine/device configuration and current K7 evidence. Establish exactly what runs in QEMU and whether it can expose a time/service interface to a host process. Do not infer hardware RTC/NTP from a scheduler tick.
- If a real, safe and supported host bridge exists, implement the smallest versioned request/response contract with capability discovery, time-source metadata, bounded inputs, explicit unavailable/error states, and tests on both sides. Include timeout, malformed/stale response, backward monotonic clock, restart and version-mismatch cases.
- If no such bridge exists, finish all independent work and mark this gate **blocked** with the exact missing OS capability and smallest required implementation. Do not create a fake QEMU “clock sync” by sending host timestamps into a demo tick and labeling it OS time.
- K7 must be classified as source found/tested, simulation, design-only, or not found with exact evidence. Never claim production kernel status without boot/runtime and target evidence.
- **Pass:** a real QEMU-originated value traverses a tested bridge with provenance, or the limitation is explicitly blocked and no downstream UI implies it works.

#### Phase 3 — Service plane and shared project/event contract

First verify and harden the existing `apps/maataa-auth-api` service, then connect it to the shared project record. The separate canonical service repositories still do not exist; keep implementation inside this alpha7 workspace unless a new repository is separately authorized. The local prototype is not a production-service acceptance.

**3A — MAATAA Auth**

- Inspect `apps/maataa-auth-api` as the current local Auth implementation; separately record that no canonical `maataa-auth` repo exists. Verify principal, token, project-scope and revocation behavior, then document the future identity-provider/interactive-login decision and threat model.
- The only reported existing code is a local SQLite demo in `maataa-os/apps/electron/auth-store.cjs`, with plaintext seeded passwords in source. Treat it as unsafe demo data; do not expose it, reuse its credentials or modify the external OS checkout. No UI guard or local persona counts as authorization.
- Keep product-client writes local-only until Desktop/UI/TLPS integrate this service. The current service uses loopback-only opaque bearer tokens issued through a bootstrap credential; do not represent that as user login, OIDC, MFA or production identity. Do not reuse the OS SQLite demo credentials.
- **Pass for this increment:** existing unit and HTTP tests pass; scopes, expiry, revocation, version conflicts and denial paths fail closed; no fake user-login status is shown. Production Auth remains **blocked** pending selected identity authority, interactive login/MFA strategy, TLS, secret lifecycle, rate limiting, client integration and independent security review.

**3B — MAATA DB Studio and DBB/HKDB**

- Record the confirmed absence of a separate canonical `maataa-db-studio` repo and the absence of a DBB service in the reviewed scope. Apply the owner’s architecture decision: DB Studio authors/reviews schemas, knowledge models and migration plans; DBB/HKDB is the intended governed knowledge persistence, provenance/lineage and retrieval runtime.
- Recommended deployment boundary: implement DBB/HKDB in Rust as a separate service/runtime, not inside the MAATA OS kernel. Keep storage drivers, migrations, indexing and query execution out of the kernel; expose a versioned protocol and later connect MAATA OS with a narrow client/IPC adapter when a real transport exists. A shared no-std types/contract crate is optional; do not imply the current QEMU alpha can host durable DB services. Treat this as a recommendation to validate, not an existing implementation or settled owner decision.
- Define a versioned typed record contract for knowledge objects and relations, claims/observations, source/evidence references, method and time basis, verification state, validity/recorded time, actor, lineage and content digest. Add access scope, retention, backup/recovery, additive migration and optimistic-concurrency requirements. Keep TLPS authoritative for full film/content records; HKDB may persist approved metadata/evidence and stable references, and must not duplicate full payloads by default. Never migrate user data or select production storage without verified authority and an approved plan.
- **Pass for this roadmap increment:** versioned contract, data-flow/privacy boundary and non-destructive migration plan are reviewed/tested with synthetic fixtures, including provenance queries and denied access; UI-only or in-memory/localStorage adapters are clearly demo-only. Real HKDB acceptance remains **blocked/planned** until a canonical implementation exists and its persistence, authorization, recovery and query behavior are exercised.

**3C — MAATA API Studio**

- Record that `src/workspaces/APIStudioWorkspace.tsx` is a UI workspace, not a service, and the owner confirms no separate `maataa-api-studio` repo yet. Define the product boundary (author, validate and publish versioned API contracts) and identify dependencies on Auth and DBB without claiming those services are present.
- Define identity propagation, capability discovery, idempotency, correlation IDs, clock provenance, bounded payloads and typed errors as contracts/fixtures. Do not publish or expose endpoints.
- Do not store secrets in source or logs. Do not deploy, publish, expose a public endpoint, or send real project content externally.
- **Pass for this increment:** the local API routes and contracts cover unauthorized, unavailable, malformed, duplicate and stale-version cases; API Studio UI labels non-backed operations. The local runtime exists but is not connected to product clients; production API acceptance remains blocked until Auth, DBB/HKDB, TLS/hosting and operational boundaries are verified.

**3D — Shared project/event contract across services, OS boundary and Desktop**

- Reconcile `apps/shared/contracts/project-record.ts`, `project-events.ts`, workspace registry code, Tauri Rust writer/schema versions, and Electron storage/routing. Prefer the existing stable `prj:<uuid>` identity and versioned event envelope if sound; migrate additively and preserve existing records.
- Choose one authoritative writer based on existing architecture evidence. Use the selected Auth/DBB/API service contracts where real and verified; do not silently substitute browser localStorage or a second local registry for them. Do not create parallel registries or copy full idea/script contents into event metadata. Events should carry only approved, minimal metadata and a time envelope that can truthfully say `host-unix-clock-unverified` when applicable.
- Ensure idempotent migration, stable IDs, deterministic event ordering, bounded retention, stale-version conflict detection, corrupt-record recovery, and no lost/overwritten data. Add tests for existing data, replay, duplicate delivery, concurrent/stale updates and clear/delete semantics.
- **Pass:** Electron and Tauri (if both remain supported) read/write the same documented record semantics through the selected service boundary, or an explicit compatibility boundary is documented. Auth, API and DBB claims each have their own runtime evidence. A mocked registry alone does not pass.

#### Phase 4 — Desktop to MAATA UI handoff

- Trace a user opening MAATA UI from Desktop. Verify the route, project ID, version, permissions, and provenance actually cross the boundary. Reuse the existing Desktop launcher/workspace registry rather than inventing another project identity.
- Ensure returning from MAATA UI refreshes the same project record without silently overwriting newer versions. Make unsupported/no-runtime cases visible, with actionable status.
- Test Electron and Tauri separately wherever their behavior differs. Do not remove either shell. Do not label a browser tab or file preview as native OS integration.
- **Pass:** one same ID/version is visible before launch, in the UI context, and after return; stale update is rejected visibly; tests cover both shells that the roadmap claims to support.

#### Phase 5 — MAATA UI/Brahmini governed planning to TLPS

- Inspect the current TLPS Idea-to-Script flow, Brahmini proposal/action boundary, model adapters, local storage, project registry and the allowlisted `tlps.intake.create-record` action. Preserve the allowlist; no generic execution path.
- Connect the existing intake to the shared project record. User must see a preview with target project ID/version, proposed fields, source/model identity and digest; approval binds to that exact preview. Re-check the digest and expected version at write time. Reject stale approval or existing-content conflict; never overwrite silently.
- A local model smoke test proves only output shape, not intelligence or quality. Do not promote it to qualified status without immutable model digest, role-specific evaluation, three reproducible trials or the current project’s stricter gate, and an explicit qualification report.
- Use synthetic fixtures for automated tests. For any live local-model smoke, first verify it cannot mutate user projects without the human approval path; record model digest/config and redact content. Do not send prompts/data to a cloud provider.
- **Pass:** a user-approved TLPS intake creates/updates exactly one shared record/version; rejected, stale, duplicate and malformed proposals make no content changes and leave auditable safe metadata.

#### Phase 6 — TLPS Idea → Script → versioned project completion

- Trace one complete local flow from Desktop entry through MAATA UI/Brahmini proposal into TLPS and back to Desktop. Persist the resulting artifact reference/version on the shared project record; do not duplicate large content in the event stream. Preserve current local TLPS drafts.
- Add recovery/resume behavior, empty/error/loading states, user-visible provenance, conflict handling and export/backup only if already supported. Do not imply authenticated account, cloud sync, booking, budget, payment or supplier connections unless actually integrated and tested.
- **Pass:** an end-to-end test and a human-observable local smoke use a fresh synthetic project ID and prove same ID, expected version increments, approval gate, history, and non-destructive conflict behavior.

#### Phase 7 — Scientific Panchanga and astronomy gates (decision/data limited)

- Keep the existing `PANChANGA-DECISION.md` (actual filename may differ) as a decision request. Present the owner with a short, concrete choice list: tradition/source edition, location policy, ayanamsha, sunrise convention/time zone, and any epoch interpretation. Do not silently choose. Continue work outside this dependency.
- For astronomy, verify the DE440 data licence and required file/version/hash from authoritative sources before use. Do not download large data or install dependencies without authorization. Define time scale, frame, origin, geometric/apparent state, units, tolerances, reference epoch and independent reference vectors before computing. No ephemeris input means `pending`, not a generated estimate presented as science.
- Implement only a bounded first slice whose inputs, algorithm and reference fixtures are explicit. Compare against authoritative reference outputs and tolerance bounds; include source URL/document/version, dataset checksum, algorithm version, uncertainty and reproducible test command. Keep observatory visualizations labeled simulated/illustrative when fed synthetic data.
- Vedantic/Vedic temporal units and observational astronomy may coexist as separately sourced representations. Do not assert equivalence between a textual tradition and physical measurement unless a testable definition supports it.
- **Pass:** no scientific field is called verified/certified without reproducible reference validation. If owner input or data rights block computation, present the precise decision/blocker and retain honest pending states.

#### Phase 8 — Integration, regression, and evidence bundle

- Re-run the Observatory script `apps/hemant-observatory/scripts/check.sh` if still applicable; inspect its output and compare its outside-status snapshot so unrelated changes remain intact.
- Run the affected Rust, contract, TypeScript, browser, Electron/Tauri and TLPS checks discovered in Phase 0. Run packaged/native manual checks only if the exact local app can safely be launched; distinguish automated from manual and preview from native runtime.
- Test failure paths: OS unavailable, stale/unverified clock, schema mismatch, missing runtime, stale project version, duplicate events, rejected approval, existing draft conflict, TLPS failure and recovery.
- Save concise evidence under the owning app’s existing evidence convention (or a clearly named report) without committing logs, secrets, user content or giant generated artifacts. Capture exact tree/commit and command for each result.
- **Pass:** all required current checks pass or each non-pass is specifically explained and blocks only the claim it invalidates. No test is deleted/weakened to obtain a pass.

#### Phase 9 — Final path audit and owner handoff

- Walk the full route with one fresh synthetic project: Hemant timestamp metadata → MAATA OS/QEMU interface (if actually available) → Desktop → MAATA UI/Brahmini → TLPS → Desktop history, with Auth scope → DB Studio/DBB persistence → API Studio contract on the shared-record path. At every hop record same project ID, version, event IDs, actor/authorization result, time source status and artifact reference. If an OS or service link is blocked, show the last proven hop and exact missing bridge; do not call the full chain end-to-end complete.
- Provide a table per layer—Hemant, MAATA OS, ALLB (separately), Auth, DB Studio, DBB, API Studio, Electron Desktop, Tauri Desktop, MAATA UI, Brahmini and TLPS—with canonical path, current commit/dirty state, behavior, evidence, test results, and status (`implemented`, `locally tested`, `runtime verified`, `externally validated`, `blocked`, `planned`). Separately list scientific claims that remain unverified and decisions needed from the owner.
- Include changed-file list, exact commands and pass/fail/skip totals, evidence paths, residual risks, and a plain-language summary. State explicitly whether a real cross-layer E2E test passed. Do not commit or push unless the owner separately asks.
- **Definition of complete:** only claim the requested chain complete if the same project identity and version have traversed every claimed runtime boundary in a real end-to-end run, TLPS mutation was digest-approved, and the evidence is tied to the current tree. “All unit tests pass” or “all pages exist” is insufficient.

### Work style

Do not stop after writing a plan. Execute all safe implementation and verification work that the available authority and current permissions support. Do not ask for confirmation at every phase. When a true owner decision or out-of-scope write is required, finish independent work first, then ask one concise, concrete question with the options and consequences. Keep progress updates short and evidence-based.

At the end, report what actually changed and what actually ran. If full end-to-end completion is blocked, identify the exact blocker and the first next action needed; do not disguise a partial result as completion.

---

## End of prompt
