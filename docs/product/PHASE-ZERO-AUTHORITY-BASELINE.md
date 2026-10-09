# MAATAA Phase Zero: Authority and Runtime Baseline

**Status:** Layered authority map complete; current-source integration acceptance remains unverified.
**Reviewed:** 2026-10-09

## Decision

Use a **layered authority map**, not one repository for every meaning of “runtime”:

- `/Users/vesahe/Documents/Repos/allb.xyz` is the accepted canonical repository for the combined MAATAA × Siddham software runtime, shared governed-operation contracts, Edge service, Siddham hardware RTL, SDKs, and Siddham Authority desktop. This is stated in its accepted ADR 0001.
- `/Users/vesahe/revenue/live/maataa-os` is the source for its distinct embedded Cortex-M/QEMU OS alpha and its `hemant-core` time primitives. Its own README labels it a prototype; its kernel README says the current kernel remains in the repository root.
- MAATAA Desktop is a host shell; MAATAA UI is the product/interface layer; Brahmini is the intelligence/planning layer; TLPS and NEVO are domain products; Lipi is language/script capability. They should consume versioned contracts through explicit bridges, not grow duplicate kernels or claim integration by naming.

So the prior conclusion that `maataa-os` alone is the authoritative MAATAA runtime was too broad. `allb.xyz` owns the combined MAATAA × Siddham runtime/contracts by an accepted local architecture decision; `maataa-os` owns a separate embedded OS prototype. Phase Zero must preserve this distinction until an explicit, reviewed superseding architecture decision reconciles them.

These are repository ownership decisions, not claims that either tree is production-ready or that the whole product chain is integrated. At review, the embedded OS checkout was clean at `50fce49`; ALLB.xyz was on `codex/phase1-reproducible`, locally 16 commits ahead of its tracked origin state, with seven changed paths (three tracked modifications/deletions and four untracked files). No fetch was performed, so remote sync and upstream acceptance are unverified. The active MAATAA UI checkout has unrelated local edits; this note does not stage or alter them.

## What source evidence establishes

| Area | Present evidence | Phase Zero finding |
| --- | --- | --- |
| Combined MAATAA × Siddham runtime authority | ALLB.xyz accepted ADR 0001; `src/`, `crates/siddham-contracts/`, `services/`, `sdk/`, `hardware/rtl/`, `apps/` | This is the canonical combined-repository decision. It contains an implemented local Rust runtime for Brahmi tokenization, bounded Sandhi evaluation and Sutra lookup, plus shared governed-operation contracts. Its Phase 0 validation is documented as a local engineering baseline, not production certification. |
| ALLB runtime/NPU boundary | `src/runtime_contract.rs`, `src/maataa_hal.rs`, `docs/BASELINE_VALIDATION.md`, `docs/PHASE2_SHARED_CONTRACTS.md`, `docs/ROADMAP_STATUS_MATRIX.md` | Runtime capability reporting marks the physical NPU unavailable and software execution as `SoftwareNative`. The Phase 0 report says `/dev/mem` was unavailable and the HAL used its explicit simulation path. RTL and simulation testbenches are present, but they do not prove physical silicon, deployment, or NPU execution. |
| ALLB local intelligence experiment | Untracked `src/bin/maataa_shell.rs` and the working-tree addition to `Cargo.toml` | A local devkit experiment calls the three real software-native language operations and can ask an Ollama model to sequence those same operations. Its own banner and source say it bypasses Authority, approvals, and the evidence ledger; it is untracked work in a dirty checkout, not the governed Brahmini agent path or canonical released capability. |
| ALLB Phase 0 | `docs/BASELINE_VALIDATION.md`, `docs/ROADMAP_STATUS_MATRIX.md`, `docs/adr/0001-allb-canonical-repository.md` | ALLB's own Phase 0 (canonical repository, source classification, reproducible baseline) is recorded complete locally as of 2026-08-29. That does not complete the broader MAATAA product Phase Zero or prove current dirty source matches that baseline. |
| MAATAA OS | Root README, Cargo workspace, `src/main.rs`, `src/kernel.rs`, architecture and build documents | A real Cortex-M `no_std` QEMU alpha prototype exists. It boots, initializes virtual subsystems, loads static capsule slots, runs six scheduler ticks, emits health/telemetry, and exits through semihosting. The documented release is `v0.1.0-alpha.1`. |
| Hemant Samwat | `crates/hemant-core/src/time/mod.rs` and unit tests | A reusable no-std time primitive exists: fixed epoch constant plus saturating monotonic elapsed-time and state-sequence counters. It does not yet provide a universal event/click clock, trusted wall clock, cross-process event bus, or persistence contract. |
| K7 | Search of both runtime repositories' source, kernel docs, contracts, and crate sources | No K7 implementation or K7-to-boot binding was found. “K7” appears in old UI inventory/feature copy, which is not implementation evidence. Treat K7 as an unverified name/claim until code, tests, and boot evidence identify it. |
| Observation and pointer context | Search of the MAATA OS runtime and current MAATA UI/Desktop source; current alpha7 Brahmini Workbench change | No OS-wide pointer observer or accessible-context service was found. A new opt-in observer is limited to the Brahmini Workbench: it reads the focused/pointed control's semantic role and accessible label, never coordinates or field values, and holds the context in memory only for the next request. It is not a desktop observer and does not control other apps. |
| Universal runtime package | `maataa-hybrid-runtime` and `maataa-os/packages/universal-runtime` | Typed data-frame/runtime-state packages exist, but the reviewed source did not show a live bridge to either runtime repository or a shared Desktop/Brahmini event stream. The hybrid runtime remains a separate scaffold, not the combined-runtime or embedded-OS authority. |
| Desktop and MAATAA UI | Active alpha7 shell and product docs; OS repo's Electron dashboard preview | Desktop shells and UI surfaces exist. The current MAATAA UI package is a UI/product layer; the OS repository separately documents a dashboard preview. Neither by itself proves a single OS-backed workstation or OS identity service. |
| Brahmini | Current product docs describe a local planning/provider runtime and reviewed drafts | Brahmini can provide bounded intelligence workflows, but no verified OS-kernel runtime connection was found in this Phase Zero review. Keep generation and execution separated by review/approval. |
| API and DBB/HKDB | ALLB.xyz contains a Worker API and a shared operation contract; no connected DBB service or bridge from alpha7/Desktop to that API was found | The API and typed contracts are real in ALLB's bounded scope. DBB/HKDB is the owner-selected target for holistic, provenance-aware knowledge storage, but its service and a MAATAA Desktop/Brahmini/TLPS connection are not established in this chain. Do not treat catalog entries or diagrams as live authority. |
| TLPS and TLP Film | Current alpha7 workflow and local handoff; Tauri Desktop shared project activity slice | Useful product/domain rehearsal exists, but it is not backed by the MAATA OS runtime. Tauri Desktop now records ordered local create/update/remove events for its shared project list, keeps up to 500, and shows recent activity. Registry v1 upgrades to v2. Timestamps explicitly say the Mac host clock is unverified. This is a local Tauri registry, not a cross-app event bus, Hemant Samwat clock, or OS-backed project contract. |
| NEVO | Separate project family, not an active OS integration in this checkout | Keep it as the next domain consumer after the first end-to-end contract works; no OS integration is claimed here. |
| Lipi | Language/script structures are represented in OS package types and the broader project family | Lipi belongs as a versioned language/script capability. This review did not find it booted in the kernel or connected end-to-end to Desktop, Brahmini, or TLPS. |
| Siddham hardware path | ALLB.xyz contains RTL and testbenches; its current runtime contract marks NPU unavailable. The embedded OS docs identify QEMU alpha and leave board bring-up open. | Hardware/chipset delivery is a separate later track. RTL/simulation exists, but no physical NPU execution or Siddham-to-embedded-kernel deployment is established by this evidence. |

## Explicit limits of the current OS prototype

The OS README calls this a QEMU alpha, not a hardware-ready release. The current boot path uses virtual UART/GPIO/SPI/I2C/power readiness, in-memory virtual storage, static capsule accounting, and a short scheduler simulation. The docs list real STM32 peripheral initialization, interrupt-driven drivers, LittleFS persistence, WASM capsule execution, capability enforcement/signing, production API/auth services, real local AI inference, and hardware root of trust as not yet included.

The saved evidence in the OS checkout is dated May 2026 and reports controlled/no-go status for production. A pre-existing release binary was present but dated May 2026, so it is not accepted as fresh evidence for the current source. This review did not rebuild or run tests in the external OS checkout; the writable workspace for this task is the alpha7 checkout and the disk has about 9.5 GB free. Therefore, source authority is identified, while current-commit boot/test acceptance is still open.

## Phase Zero exit criteria

Phase Zero is complete as an **inventory and architecture decision** when all of the following are explicit:

1. Each layer has a source authority: ALLB.xyz for the combined MAATAA × Siddham runtime/contracts/hardware/application; `revenue/live/maataa-os` for its embedded Cortex-M/QEMU alpha and Hemant primitives; MAATAA UI/Desktop/Brahmini/TLPS/Lipi retain their product-layer ownership.
2. MAATAA Desktop, MAATAA UI, Brahmini, API/DBB, TLPS, NEVO, and Lipi have clear responsibilities and are not described as already integrated when they are not.
3. Implemented runtime primitives are separated from UI copy, roadmap items, simulations, and old evidence.
4. The first integration flow is bounded: a user-approved idea becomes a versioned project record, Brahmini proposes a draft, TLPS stores the reviewed result, and the shared record preserves source, actor, time, and review outcome.
5. No global pointer observation, external-app control, model training, destructive cleanup, or production claim is enabled by this phase.

The repository-level authority and source-classification criteria are now met, including ALLB.xyz and the embedded OS prototype. A bounded local Tauri project-event slice and opt-in Brahmini app-local pointer context have since been implemented and tested in this alpha7 checkout. The first end-to-end idea-to-reviewed-TLPS flow and cross-repository integration acceptance remain open. Criteria four and five define the next phase's safety boundary; the end-to-end flow itself is not claimed complete.

## Phase One entry gates

Before integrating the first TLPS flow:

- Run ALLB's local governed-runtime checks and the embedded OS host tests/QEMU smoke test against exact selected commits, and save fresh output tied to each commit. The current ALLB and OS checkouts are different projects and must not be represented as one tested build.
- Publish a small versioned contract for monotonic event time, project identity, provenance, and observation scope; do not call the time primitive a universal clock until drift, reboot, and cross-process semantics are specified and tested.
- Decide how the embedded OS and ALLB combined runtime relate at the product boundary; then choose a host-side service/adapter contract for Desktop. Desktop must not silently substitute its own localStorage or mock service and call that OS integration.
- Add an explicit Desktop-to-runtime health/handshake and fail closed when unavailable.
- Use a synthetic TLPS project first. Require preview, user confirmation, bounded action, and an auditable result before any write is applied.
- Keep pointer context app-local and opt-in for the first slice. Do not capture other applications or synthesize clicks/typing.

## Implemented alpha7 safety slices (not OS integration)

- The Tauri Desktop project registry upgrades from v1 to v2 and appends ordered local create/update/remove activity records, capped at 500. The UI shows the most recent 40. The timestamp field is explicitly marked `host-unix-clock-unverified`; it is not Hemant Samwat time and has no cross-process ordering guarantee.
- Brahmini's assistant has a default-off “Use what I point to” toggle. While enabled, it observes only semantic controls inside its own Workbench and supplies the accessible role and label with the next question. It does not read form values, record pointer coordinates, persist observations, click, or type.
- This establishes two testable local seams for later integration, but does not connect to ALLB.xyz, `maataa-os`, the K7 kernel, a universal clock, or TLPS's project store. No K7 source or hardware binding was created because those require an authoritative kernel specification and boot evidence, not a new label in the UI repository.
- Validation in this alpha7 checkout: `pnpm exec tsc --noEmit`; `cargo fmt --check --manifest-path apps/maataa-desktop-tauri/src-tauri/Cargo.toml`; `cargo test --manifest-path apps/maataa-desktop-tauri/src-tauri/Cargo.toml --offline` (9 passed); focused Brahmini Workbench Playwright run in Chromium desktop (10 passed); `git diff --check`. This does not qualify an OS build or production integration.

## Sources reviewed

- `/Users/vesahe/revenue/live/maataa-os/README.md`
- `/Users/vesahe/revenue/live/maataa-os/doc/ARCHITECTURE.md`
- `/Users/vesahe/revenue/live/maataa-os/doc/SYSTEM_MANIFEST.md`
- `/Users/vesahe/revenue/live/maataa-os/doc/BUILD_GUIDE.md`
- `/Users/vesahe/revenue/live/maataa-os/doc/ROADMAP.md`
- `/Users/vesahe/revenue/live/maataa-os/src/main.rs`
- `/Users/vesahe/revenue/live/maataa-os/src/kernel.rs`
- `/Users/vesahe/revenue/live/maataa-os/crates/hemant-core/src/time/mod.rs`
- `/Users/vesahe/revenue/live/maataa-os/crates/hemant-core/src/lib.rs`
- `/Users/vesahe/revenue/live/maataa-os/packages/universal-runtime/src/`
- `/Users/vesahe/Documents/Repos/maataa-hybrid-runtime/`
- `/Users/vesahe/Documents/Repos/allb.xyz/docs/adr/0001-allb-canonical-repository.md`
- `/Users/vesahe/Documents/Repos/allb.xyz/docs/BASELINE_VALIDATION.md`
- `/Users/vesahe/Documents/Repos/allb.xyz/docs/PHASE2_SHARED_CONTRACTS.md`
- `/Users/vesahe/Documents/Repos/allb.xyz/docs/ROADMAP_STATUS_MATRIX.md`
- `/Users/vesahe/Documents/Repos/allb.xyz/src/runtime_contract.rs`
- `/Users/vesahe/Documents/Repos/allb.xyz/src/maataa_hal.rs`
- `/Users/vesahe/Documents/Repos/allb.xyz/src/bin/maataa_shell.rs` (untracked working-tree experiment)
- `/Users/vesahe/Documents/Repos/allb.xyz/docs/ECOSYSTEM.md`
- `/Users/vesahe/Documents/Repos/allb.xyz/crates/siddham-contracts/`
- Current alpha7 product docs and active Desktop/TLPS sources in this checkout.

## Update 2026-10-09: Phases 1–5 contract slices

Contract-level slices for the Phase One entry gates now exist and are tested in this checkout; status, blocked items and evidence are in `PHASES-1-5-INTEGRATION-STATUS.md` and `evidence/phase5-runtime-evidence-2026-10-09.md`. In short: a versioned Desktop→runtime handshake (default `unavailable`), a project-event envelope with per-scope ordering and unverified host time, a digest-bound TLPS intake flow that preserves existing projects, an allowlisted single-action executor, extracted and boundary-tested app-local pointer context, and a fail-closed integration gate (38 node tests: 37 pass, 1 live check not run). No live ALLB or maataa-os handshake was performed, the TLPS/Desktop UIs are not yet wired to these modules, and Rust/Playwright/QEMU checks were not run because the session's VM lacks those toolchains. The entry gates above therefore remain open at the integration level.

Fresh runtime evidence (macOS run `20261009T003534Z`, see `evidence/phase5-runtime-evidence-2026-10-09.md`): ALLB `de82c369` (dirty tree) runtime/contract/Authority tests pass in simulation mode; maataa-os `50fce492` (clean) host tests, release build and QEMU boot pass. This closes the "current-commit boot/test acceptance" gap for these two commits only. Desktop↔runtime integration remains unverified: no live handshake has run.

First live handshake (run `20261009T004442Z`): the Desktop runtime adapter connected to ALLB's edge worker built from `de82c369` (dirty tree) and served locally by `wrangler dev`; identity and contract version verified. The Desktop integration gate stays red until ALLB reports its capabilities over a host interface. Local only; not deployed, not the governed Authority path.
