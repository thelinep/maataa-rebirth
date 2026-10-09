# MAATAA authority map and Hemant → TLPS path status

**Date:** 2026-10-09 · Follows `MAATAA-ORGANIC-ROADMAP.md` (dependency order) and `CLAUDE-HEMANT-TO-TLPS-EXECUTION-PROMPT.md`.
Labels: `implemented` · `locally tested` · `runtime verified` · `externally validated` · `blocked` · `planned`.

The owner-assigned domain boundary and DNS/TLS evidence status are tracked separately in [`MAATAA-DOMAIN-AUTHORITY-MAP.md`](MAATAA-DOMAIN-AUTHORITY-MAP.md): `allb.xyz` = MAATAA, `tlps.in` = TLPS, and `nevoevents.in` = NEVO (reported by the owner to use a separate Cloudflare account). These assignments do not establish registrar control or close Gate 3.2.

The ordered service-fabric backlog and notification delivery design are in [`MAATAA-SERVICE-FABRIC-EXECUTION-PLAN.md`](MAATAA-SERVICE-FABRIC-EXECUTION-PLAN.md) and [`MAATAA-NOTIFICATION-OUTBOX-DESIGN.md`](MAATAA-NOTIFICATION-OUTBOX-DESIGN.md). These are planning artifacts, not implementation evidence.

## Latest service-plane change (current working tree)

`apps/maataa-auth-api` now contains one local Rust process with versioned SQLite migrations (v1 baseline, v2 knowledge tables), project-scoped `knowledge:read` / `knowledge:write` scopes, and metadata-only endpoints for knowledge objects, relations and assertions. Provenance records carry source reference/type/digest and method/version; actor and host time basis are server-recorded. Assertions can be `unverified` or `provisional`; the API rejects `verified` because no evidence-evaluation authority exists. Project-scoped foreign keys prevent cross-project relations. Recent local checks passed: 16 unit tests, HTTP round-trip, format, Clippy and optimized release build. The server now supports restricted secret files and verified local SQLite snapshots, bounds connections, returns request IDs/readiness, and drains on shutdown. It remains a local prototype, **not** the canonical separate DBB/HKDB service, a full graph/query system, DB Studio, or production identity/API. It is still not wired into Desktop, MAATA UI, Brahmini or TLPS. Production decisions and gates are recorded in `AUTH-DB-API-PRODUCTION-GATES.md`.

## Phase 0 — canonical sources (current tree)

| Component | Canonical path | Commit / state | Responsibility | Status |
| --- | --- | --- | --- | --- |
| Hemant time (Observatory) | `alpha7/apps/hemant-observatory` | untracked in alpha7 `9c8d8433` | Time representation, Unix/UTC semantics, Hemant unit convention, method registry | locally tested (latest reported macOS run `check-20261009T052907Z`: Rust, contract/shell, tsc, Next build, 46 Playwright all pass); host clock remains unverified |
| Hemant time (OS crate) | `maataa-os/crates/hemant-core` | `50fce492`; latest read-only status check clean (earlier report listed two dirty files, so retain that historical distinction) | no_std epoch + Vedantic units for the OS | source exists but is not linked into the kernel |
| MAATAA OS | `/Users/vesahe/revenue/live/maataa-os` (origin `wortforfilms/os`) | `50fce492`, latest read-only status clean | Cortex-M QEMU alpha kernel | runtime verified in QEMU (latest reported evidence `20261009T052806Z`); **no time service** |
| K7 | — | not found in ALLB, maataa-os, Brahmini or alpha7 source | — | not found |
| ALLB runtime | `/Users/vesahe/Documents/Repos/allb.xyz` (origin `thelinep/allb`) | `de82c369`; dirty at latest read-only check (the `20261009T052806Z` evidence run captured a prior clean snapshot) | Combined MAATAA × Siddham software runtime / contracts (ADR 0001) | runtime verified locally in saved evidence (wrangler dev): handshake + integration gate pass; separate from MAATAA OS; re-run on current tree before relying on it |
| MAATAA Auth | `alpha7/apps/maataa-auth-api` (local implementation; no separate canonical repo) | new in current dirty alpha7 tree | principal registry, short-lived project-scoped bearer tokens, revocation and identity endpoint | **locally tested prototype** (16 unit tests + current HTTP flow); no interactive OIDC/passkey, MFA or production deployment. OS Electron SQLite demo remains unsafe and is not reused |
| MAATAA DB Studio | separate repository does not exist yet (owner-confirmed) | — | schema/data workbench | **planned** |
| DBB / HKDB | `alpha7/apps/maataa-auth-api` SQLite module (prototype only) | dirty alpha7 | owner-designated Holistic Knowledge Database: governed knowledge persistence, provenance/lineage and retrieval; distinct from DB Studio schema/migration workbench | **bounded local storage slice; canonical separate DBB/HKDB service absent** |
| MAATAA API Studio | separate repository does not exist yet; `alpha7/src/workspaces/APIStudioWorkspace.tsx` is a UI workspace | — | author/review versioned API definitions | **planned** |
| MAATAA API Runtime | `alpha7/apps/maataa-auth-api` (local implementation; no separate canonical repo) | new in current dirty alpha7 tree | loopback HTTP API, scoped project records/events and knowledge metadata | **locally tested prototype** (16 unit + HTTP flow, Clippy, release build); not yet connected to Desktop/UI/TLPS or canonical DBB |
| Desktop · Tauri | `alpha7/apps/maataa-desktop-tauri` | alpha7 dirty | Entry shell, windows, shared project list | registry v3 link for TLPS record ID/version; locally tested on macOS (cargo fmt + 14/14 tests, `runtime-evidence-20261009T052806Z.log`); native UI round-trip still pending |
| Desktop · Electron | `alpha7/examples/support-center/electron/desktop-shell.mjs`; separate OS cockpit shell `maataa-os/apps/electron` | — | Browser-local single-slot project list | implemented; **cannot hold record links** (see compatibility boundary) |
| MAATAA UI | `alpha7` (`@maataa/ui`) | alpha7 dirty | Product composition layer | locally tested earlier (repo tests) |
| Brahmini | Workbench + runtime in `alpha7/examples/redux-demo`; Workstation in `/Users/vesahe/Documents/Repos/brahmini` (`a875589f`, clean) | — | Planning/proposals; local Ollama via runtime | mocked and local-model browser flows reported passing; format pass only, model unqualified |
| TLPS | `alpha7/apps/tlps` | alpha7 dirty | Film-production domain; Idea → Script panel | local project record approved as v2 in isolated Ollama test; mocked/live Playwright, typecheck and build reported passing (`tlps-idea-to-script-20261009T052822Z.log`); no Auth/DBB/API integration |

## Phase 1 — Hemant time contract
Verified in source: epoch `285148740000000000` = 1979-01-14 07:59:00 UTC = 13:29 IST, minute precision, user-selected. Host reads remain `unverified`, uncertainty `unknown`. **Cross-implementation consistency (not validation):** the Observatory core and the uncommitted maataa-os `VedanticTimePosition` produce identical ahoratra/muhurta/kala/kastha/nimesha/residual for 1,000,008 elapsed values and use the same epoch (sandbox run, 2026-10-09).

## Phase 2 — MAATAA OS boundary · **blocked for time**, boot report implemented
- The kernel (`src/main.rs`, `src/kernel.rs`) prints a semihosting boot report and exits. It has no SysTick/RTC driver and does not link `hemant-core`; "tick N" lines are a scheduler simulation counter.
- Implemented: `apps/shared/contracts/os-boot-report.ts` (`maataa.os-boot-report/1`) parses the **real** QEMU stdout (fixture captured from run `20261009T010617Z`, `50fce492`, binary sha256 `947213ed…`) into a provenance-bearing record with `time: { status: "unavailable" }`. Tests reject non-OS text, truncated reports, non-contiguous ticks and bad provenance.
- Smallest missing OS capability for a real time bridge: a kernel timer driver (SysTick or RTC) feeding `hemant-core::MonotonicTick`, and a request/response channel to the host (e.g. a QEMU serial or semihosting protocol) with versioned messages. Until then no downstream UI may show OS time.

## Phase 3 — service plane · **planned (blocked)**, shared record contract implemented
- Owner confirmed that separate `maataa-auth`, `maataa-db-studio`, and `maataa-api-studio` repositories do not exist yet; Auth was mentioned twice and is one component. No DBB/HKDB service was found in the reviewed scope; the new local Auth/API service has only a bounded SQLite project-record store and is not HKDB. **New owner decision (2026-10-09): DBB is the intended HKDB (Holistic Knowledge Database); DB Studio remains the separate schema/model and migration workbench.** This is an architecture decision, not implementation evidence. The new service stays inside alpha7 and does not replace the absent canonical service repositories. The standalone prototype has bearer-token enforcement, but the TLPS product path remains **local-only and unconnected**; there are no protected product-client writes.
- A local Rust Auth/API prototype now exists at `apps/maataa-auth-api`; it is not a separate canonical repository and is not yet wired to product clients. It provides project-scoped opaque tokens and a bounded SQLite project-record API. It does not implement interactive identity or production deployment. No DBB/HKDB service exists; this prototype’s metadata store is not the holistic knowledge store. For HKDB, define typed knowledge objects/relations, claims and observations, evidence references, provenance/lineage, method/time basis, verification state, versioning, access and retention. TLPS remains authoritative for its domain content; HKDB should store approved knowledge/evidence records and references, not silently duplicate full scripts. Real service choices and server-side authorization remain open.
- Owner decision (2026-10-09): identity protocol and implementation are first-party MAATAA work, on owner-operated infrastructure, without managed identity SaaS or an external OIDC authority. A draft MIP v1 security boundary and build sequence is recorded in `MAATAA-IDENTITY-PROTOCOL-V1.md`; it is a design only, not working login. The proposed first authenticator is invite-only passkeys with standard, maintained verification libraries and cryptographic primitives—not handwritten cryptography. Independent security review is required before real accounts.
- Ordered service-build gates for Auth/MIP, API Runtime, DBB/HKDB, messaging, notifications, OS Desktop integration and production operations are recorded in `MAATAA-PRODUCTION-SERVICE-ROADMAP.md`; it is an execution plan, not deployment evidence.
- Shared record: `project-record.ts` (`prj:<uuid>`, versions, digest-bound approvals, stale-base rejection) is the contract. **Authoritative writer:** the TLPS Idea → Script store (browser-local) for content; the **Tauri registry v3** for the Desktop-visible ID + version (never content).

### Tauri registry v3 (this work)
- `src/project_link.rs`: record IDs must be `prj:` + lowercase UUID; TLPS only; schema pinned to `maataa.project-record/1.0.0`; version 1–200; versions move forward only, same version is an idempotent no-op, older version is rejected as stale.
- `main.rs`: entries may carry `record { recordId, recordVersion, schema }`; events carry `recordVersion`; index v1/v2 load unchanged and are written as v3. **Correction (baseline 2026-10-09 05:42Z):** an earlier version of this map said `open_product_window(openRecord: true)` opened the record page. The source never had that parameter; the Desktop button opened plain TLPS. This is replaced by the record-context handoff below.
- Tests added: link validation, v2→v3 round trip with legacy entry preserved, record entry page. **Locally tested (macOS):** `cargo fmt --check` and `cargo test` pass, 14/14 (`evidence/runtime-evidence-20261009T052806Z.log`). Not yet exercised by a native app run.

### Compatibility boundary (Electron)
The Electron desktop shell keeps one entry per product in `localStorage` and replaces it on update, so a record entry would overwrite the TLPS plan entry. `publishWorkspaceProject` therefore refuses record links outside Tauri and TLPS says "Saved in TLPS only". Electron support needs the shell's list keyed by ID — planned.

## Phases 4–6 — Desktop ↔ TLPS
- TLPS Idea → Script registers `prj:<uuid>` + version with Tauri Desktop after each approval; Desktop shows "Project record · vN", the record ID and versioned history, and opens the record page. Stale or replayed versions cannot move Desktop backwards. This code path and Rust tests are locally tested; **native UI round-trip remains unverified**.
- MAATAA UI hop: implemented and browser-tested, not natively observed. See "Same-record handoff" below. Brahmini drafting needs its local runtime and is unavailable inside the packaged Desktop (CSP `connect-src` allows only IPC).
- **Not yet proven:** a native run in which the same ID/version is seen in Desktop before launch, inside TLPS, and after return. Manual smoke steps are in the Phase 9 section below.

## Phase 7 — scientific gates · unchanged, owner decisions open
Panchanga (tradition, location, ayanamsha, sunrise, month system) and ephemeris (licence, file hash, reference vectors) remain blocked as recorded in `apps/hemant-observatory/PANCHANGA-DECISION.md` and `ASTRONOMY-DECISION-001.md`.

## Phase 9 — last proven hop
`Hemant (Observatory, unverified host time) → [OS time: blocked] → Tauri Desktop registry v3 ⇄ TLPS Idea → Script record`. The full chain is **not** end-to-end complete: no OS time bridge, no Auth/DB/API services, no MAATAA UI hop, and the native Desktop round trip has not been run.

### Manual native smoke (macOS)
Run `bash scripts/run-tauri-native-smoke.sh`. It runs the documented `pnpm maataa:tauri:products`, does an offline Cargo build outside the repo, launches the real app and records your y/n observations. Note: `pnpm maataa:desktop:build` is the **Electron** build and does not test Tauri. The older steps below are superseded by the script's checklist.
1. Desktop → TLPS → "Idea → Script": enter a synthetic idea, approve v1. Expect "MAATAA Desktop now lists prj:… at v1".
2. Desktop home: the project shows "Project record · v1" with the same `prj:` ID; activity shows "record v1".
3. "Open record in TLPS" opens the Idea → Script page with the same ID.
4. (Needs Brahmini runtime) approve a draft as v2; Desktop shows v2.

## Evidence update — 2026-10-09 (runs 20261009T052806Z, 20261009T052822Z, check-20261009T052907Z)
| Gate | Result | Label |
|---|---|---|
| Runtime evidence (alpha7 contracts, Tauri fmt + cargo test 14/14, ALLB, maataa-os host/build/size/QEMU) | all PASS; repos unchanged during that run | locally tested (macOS); evidence is tied to the captured run state, not current dirty trees |
| TLPS Idea → Script, mocked Brahmini (Playwright) | PASS | locally tested |
| TLPS Idea → Script LIVE: Brahmini runtime + local Ollama `qwen2.5-coder:7b` | draft passed the rule-based format check (scenes 4, cues 5); human approved it as v2; alpha7 tree unchanged | locally tested with a real local model — **model unqualified** |
| Hemant Observatory check | all PASS | locally tested (macOS); host time unverified |

Notes:
- The LIVE run shows that the format check and the approval and version path work against a real local model. A format pass is **not** a quality claim. `qwen2.5-coder:7b` is a coder model used in the chat role and has not been qualified for script writing.
- The native Tauri Desktop ↔ TLPS round trip (manual smoke above) is still the last unproven hop of this slice.

## Same-record handoff: Desktop → MAATAA UI → TLPS (slice of 2026-10-09)
Baseline: branch `feat/alpha8.7-composition-kernel`, HEAD `9c8d8433`. Nothing is committed. The pre-existing dirty files were preserved; edits to them are additive.

**What carries across:** only `project=prj:<uuid>&version=<n>`. No title, idea or script text goes into a URL, event or log.

| Hop | Mechanism | Status |
|---|---|---|
| Desktop → MAATAA UI | Record row: "Open in MAATAA UI · Brahmini" → `open_product_window {product:"maataa-ui", recordId, recordVersion}`. Rust re-reads the registry and refuses unknown or out-of-date versions (`project_link::check_registered_context`), then opens `products/maataa-ui/index.html#/brahmini?project=…&version=…`. | implemented; Rust logic unit-tested (container rustc); Desktop page browser-tested with a mocked bridge; **native not observed** |
| MAATAA UI (Brahmini Workbench) | `ProjectContextPanel` shows the ID, the TLPS record version (read from TLPS's local store by ID and version only) and the Desktop list version, and flags stale, ahead, different-record, unavailable or Desktop/TLPS mismatch. It never writes. | browser-tested (mocked Tauri); **native not observed** |
| MAATAA UI → TLPS | "Continue in TLPS" (enabled only when everything agrees) → `open_product_window {product:"tlps", …}` → `idea-to-script.html?project=…&version=…` | browser-tested (mocked bridge) |
| TLPS write | Context must be current. Immediately before saving, TLPS re-reads storage and `checkWriteBase` refuses if another window saved first, so approved content is never overwritten. After approval the context advances to v+1 and Desktop is updated via registry v3. | browser-tested, including two-window concurrency |
| Back to Desktop | "Return to MAATAA Desktop" (`focus_desktop_window`). Desktop reloads the registry on focus and on the `workspace-projects-updated` event. | browser-tested for the unavailable path; **native not observed** |

- Contract: `apps/shared/contracts/project-context.ts`, with tests in `tests/contracts/project-context.contract-spec.ts`.
- Browser tests: `tests/e2e/project-context.spec.ts` (`playwright.project-context.config.ts`) and one added test in `tests/desktop-tauri-trial.spec.ts`.
- Checks: `scripts/run-project-context-checks.sh` (automated) and `scripts/run-tauri-native-smoke.sh` (native, owner-observed).
- **Local prototype only.** There is no server-side Auth, DBB or API Studio. Same-origin local storage in the Tauri webviews is not a shared database, and nothing here is multi-user or cross-device.
- **Electron:** unchanged and **not covered**. `desktop-shell.mjs` `updateWorkspaceProject` filters to one entry per product before validating, so a record message would *remove* the TLPS plan entry; `publishWorkspaceProject` therefore never sends records to Electron. Acceptance gate for later: a list keyed by entry/record ID, migration of the v1 list, tests for duplicates, updates, removal and stale versions, and existing localStorage values preserved.
- The last proven hop is unchanged until the native smoke is run: the Tauri registry v3 logic plus the TLPS record, tested in a browser. The full Hemant → MAATAA OS → Desktop → UI → TLPS chain is **not complete**: OS time is blocked, Auth, DB Studio, DBB and API Studio do not exist, and the native round trip is not yet observed.
