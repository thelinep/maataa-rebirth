# Stack scrutiny: OS → Time → UI → DB → API → App

Reviewed 2026-10-12 on `feat/alpha8.7-composition-kernel` at `0d5d2f2c`. This review read the code in this checkout only.

**Not verified here:** the external `maataa-os` repository (Cortex-M QEMU alpha, commit 50fce492) and the ALLB.xyz Worker repository. Neither is reachable from this checkout. Statements about them come from `apps/shared/contracts/*` and `docs/product/PHASE-ZERO-AUTHORITY-BASELINE.md`.

Severity scale:

- **High:** wrong data or a security boundary at risk.
- **Medium:** a hop is broken, or a claim is unproven.
- **Low:** drift or hygiene.

## Summary

| Hop | State | Worst finding |
| --- | --- | --- |
| OS | Contract only. No app consumes the OS boot report. | M-1 |
| OS → Time | Broken by design. The kernel has no clock; Hemant time is computed only in the observatory. | M-2 |
| Time | One basis label is used for two units (ms and s). Area records add a third, untagged form. | **H-1** |
| UI | Host-agnostic and clean. It imports nothing from `apps/`. Storage is local only. | L-1 |
| UI → DB | Work-area registers never leave `localStorage`. | M-3 |
| DB | SQLite prototype in auth-api, plus a Tauri JSON registry and `localStorage`. These are three stores with no shared contract. | M-4 |
| DB → API | Sound. Optimistic concurrency, migrations with checksums, hashed tokens, a body cap. | — |
| API → App | Works only through the Vite dev/preview proxy. A static build and the Tauri app cannot reach it. | **H-2** |
| App | The Tauri command allow-list is implicit, so external-page webviews are covered by default rules only. | M-5 |

The last proven hop is unchanged: Tauri registry v3 ⇄ TLPS record, browser-tested. Since this branch there is one more proven hop: TLPS → auth-api through the dev proxy, run end to end against the real Rust service.

## OS

**M-1: the OS boot report is not consumed.**

- What it does: `apps/shared/contracts/os-boot-report.ts` parses QEMU stdout into `maataa.os-boot-report/1`.
- The gap: only `tests/contracts/os-boot-report.contract-spec.ts` uses it. No app, desktop shell or gate reads it, so the OS has no path into the stack.
- Fix: have the desktop runtime panel read a boot report file produced by the OS runner. Show it as evidence, not as a live connection.

**Fine as is.** The time field is hard-coded to `{status:"unavailable"}`, with the reason "no SysTick/RTC driver; hemant-core not linked" (line 72). Scheduler ticks are labelled as a simulation counter, not time. This is the correct, truthful state.

**Open.** K7 is listed as unverifiable by `runtime-integration-gate.ts` and appears nowhere else.

## Time

**H-1: `host-unix-clock-unverified` labels two different units.**

- TS contracts use **milliseconds**:
  - `project-events.ts:186` (`now = Date.now`)
  - `project-record.ts:237` (`approveVersion(..., now = Date.now)`)
  - `runtime-handshake.ts:77` (`checkedAtHostUnixMs`)
  - Tauri `recorded_at_unix_ms` and `updated_at` (`main.rs:237`, `main.rs:288`)
- auth-api uses **seconds**: `now_unix()` → `as_secs()` (`apps/maataa-auth-api/src/lib.rs:1343`). The same seconds go into `recorded_at`, token expiry and events, all tagged with the same basis string.
- TLPS mixes the two:
  - `apps/tlps/src/services/maataaAuthApi.ts:127` passes seconds into `approveVersion`, which matches the server.
  - The desktop path passes milliseconds under the same label.
  - The server stores the client's `recordedAt` as given (`lib.rs:1151`), so a project record moving between desktop and API can mix units inside one version list.
- Fix:
  1. Split the basis into explicit unit-bearing labels, for example `host-unix-ms-unverified` and `host-unix-s-unverified`. Alternatively, pick milliseconds everywhere and migrate auth-api.
  2. Make `validateProjectRecord` reject a mixed-unit version list.
  3. Have the server set `recordedAt` itself rather than trust the client.

**M-2: Hemant time has no trusted source on any product path.**

- Desktop `app.js` shows "Hemant · withheld · source unverified". That is correct behaviour.
- The epoch is computed only in `apps/hemant-observatory` (`hemant-core`, `clock.tsx`).
- `read_host_clock_snapshot` reports `trust:"unverified"` and `drift_millis: None`.
- No monotonic clock exists, and no event-ordering clock exists. Event order relies on the sequence/version number, which is the right call, but it is not stated as a rule.
- Fix: document "order by sequence, display by time" in the contracts. Add a monotonic counter to the clock-source schema before any OS clock lands.

**L-2: area and compound records add a third, untagged time form.**

- Where: `RecordRegister.updatedAt` is an ISO string with no basis (`src/compounds/RecordRegister.tsx:46`).
- Fine while it stays in `localStorage`.
- Fix: before records sync (see M-3), add `timeBasis` or convert to the contract form.

## UI

- The package is host-agnostic. `src/` imports nothing from `apps/`, makes no `fetch` calls, and its storage goes through `src/compounds/storage.ts`, `src/hooks` and `src/redux/persistence.ts`.
- New experimental subpaths: `./flow` (optional peer `@xyflow/react`) and `./compounds`.

**L-1: direct `localStorage` use remains outside the helpers.** Remaining uses are `apps/shared/maataa-workspace.ts` and three observatory files. Fix: move them onto `@maataa/ui/compounds` storage helpers when those files are next touched.

## DB

**M-3: the work-area registers are browser-only.**

- The 15 local registers (`tlps.areas.v1`) and the flows (`tlps.flows.v1`) never reach SQLite or the API. The only data that crosses is the plan, saved as a project-record artifact ref.
- The UI states this, but there is no export and no sync contract.
- Fix: define a register-snapshot artifact (digest plus bytes, like the plan) so a save can carry the registers. Keep full payloads in TLPS, as `CLAUDE-HEMANT-TO-TLPS-EXECUTION-PROMPT.md` asks.

**M-4: three stores, no shared persistence contract.** The stores are:

1. auth-api SQLite, with versioned migrations, checksums and verified backups.
2. The Tauri registry JSON, written atomically with temp + rename (`main.rs:324`).
3. `localStorage`, with keys versioned by suffix but inconsistently named, e.g. `tlps.areas.v1` vs `maataa.tlps-film.active-handoff.v1`.

DBB/HKDB and DB Studio do not exist (authority map, rows 24–25).

Fix: one key-naming rule and one record envelope (schema id, version, time basis, digest) shared across the three stores.

## API

**Sound:**

- Loopback bind (`main.rs:31`).
- Bootstrap token compared in constant time (`lib.rs:627`).
- Hashed opaque tokens with a TTL range.
- 1 MiB body cap.
- `If-Match` concurrency.
- Request IDs and `nosniff`.

**H-2: no client can reach the API outside the dev server.**

- The server has no CORS, and it should not get a permissive one.
- TLPS reaches it only through the Vite proxy (`apps/tlps/vite.config.mjs:29-30`, dev and preview).
- A static production build of TLPS has no `/api/maataa` route.
- Tauri's CSP is `connect-src ipc: http://ipc.localhost`, so TLPS inside the desktop app cannot call it.
- The Services panel then shows a connection error. That is truthful, but the hop does not exist in any shipped form.
- Fix: choose one route.
  - (a) The desktop app proxies API calls through Tauri commands. The token stays in Rust, and CSP is unchanged.
  - (b) A same-origin reverse proxy in front of both.
  
  Option (a) fits the current boundary.

**L-3: token expiry runs on the unverified host clock.** A skewed clock lengthens or shortens a session. This is acceptable for loopback, but it is not acceptable before any network exposure.

**L-4: authority map drift.** `MAATAA-AUTHORITY-MAP.md:12,27,44` still says the API is "not wired into … TLPS". It is now wired in development through the proxy (commit `9a913a1f`). Update the map to "TLPS dev-proxy only".

## App

**M-5: implicit command exposure in Tauri.**

- How it is set up today:
  - `build.rs` calls plain `tauri_build::build()`, so there is no app manifest restricting the 12 custom commands.
  - The capability grants `core:default` to `main`, `browser-*` and `product-*`.
  - `withGlobalTauri: true` is set.
  - External pages load in child webviews labelled `external-page-browser-N` (`main.rs:186`) inside `browser-*` windows.
- Why it is probably safe: Tauri 2 denies IPC to remote origins unless a capability lists `remote.urls`.
- What is unproven: there is no test that an external page cannot `invoke('upsert_workspace_project')`.
- Fix:
  1. Declare the commands in an `AppManifest`.
  2. Grant per window: registry commands to `main` only; browser commands to `browser-*`.
  3. Add a negative e2e test from an external page.

**L-5: inline scripts are allowed.** The CSP allows `script-src 'unsafe-inline'`. Fix: move the inline handlers in `web/index.html` to `app.js` and drop `'unsafe-inline'` for scripts.

**Known, unchanged.** The Electron shell keeps one slot per product and cannot hold record links.

## Recommended order

1. **H-1:** time unit split. This is small and contract-level, and it stops bad data now.
2. **H-2:** route API calls through Tauri commands.
3. **M-5:** explicit command manifest and per-window grants.
4. **M-3 and M-4:** register-snapshot artifact and the shared store envelope.
5. **M-1 and M-2:** wire the boot report as evidence, and write the ordering rule.
6. The **L** items.

## Checks this review did not run

- `cargo test` for the auth-api and Tauri crates.
- The Playwright e2e suite.
- Anything against the external OS and ALLB repositories.
