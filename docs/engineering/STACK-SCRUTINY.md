# Stack scrutiny: OS → Time → UI → DB → API → App (+ Desktop)

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
| **Desktop** (hosts every app) | Two shells with two project registries. Desktop and API version the same project independently. Bundled products are stale. | **D-1, D-2** |

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

## Desktop

Desktop is the host every App runs in, so it sits across the chain rather than at one point. Today it is a launcher plus a project registry. It does not host the OS, a time source, the runtime or the API.

There are two shells:

- **Electron shell:** started by `pnpm maataa:desktop:dev`. Source is `examples/support-center/electron`.
- **Tauri trial:** `in.maataa.desktop.tauri-trial` 0.1.0, started by `pnpm maataa:desktop:tauri:dev`. Source is `apps/maataa-desktop-tauri`.

A separate Tauri app, **MAATAA Browser** (`apps/maataa-browser`), is launched by the Electron shell.

**D-1 (High): two desktop shells, two project registries.**

- The Electron shell keeps its workspace list in `localStorage`, with one slot per product (`desktop-shell.mjs:353,405`).
- The Tauri trial keeps registry v3 as a JSON file with record links, written atomically (`main.rs:122,324`).
- They are the same concept stored in different shapes in different places. A project registered in one is invisible to the other.
- The default dev command is the Electron one, so the proven hop (Tauri registry v3 ⇄ TLPS record) is not the path a developer gets by default.
- Fix: choose one shell as the authority. Tauri is the closer fit: it has record links, an on-disk store and `project_link.rs` checks. Retire or freeze the other, and update the `maataa:desktop:dev` script to match.

**D-2 (High): Desktop and the API version the same project independently.**

- The Tauri registry stores `recordId` + `recordVersion` and rechecks it before opening a product window (`main.rs:88,372-390`).
- auth-api stores `projectId` (`prj:…`) + `current_version` with `If-Match` (`lib.rs:544-586`).
- Nothing links the two IDs or reconciles the versions. TLPS can save v3 to the API while the Desktop registry still opens the record at v1. Both checks pass, each against its own store.
- Fix: the registry entry carries the API `projectId`. When the API is reachable, its version is the authority and Desktop only caches it. This lands with H-2 (route API calls through Tauri commands).

**D-3 (Medium): product windows get every Desktop command.**

- The capability grants `core:default` to `product-*`, and there is no app manifest. So a TLPS or TLP Film window can call all 12 commands.
- That includes `browser_control`, `open_embedded_page` and `remove_workspace_project`. Products need only `upsert_workspace_project`, `remove_workspace_project`, `open_product_window` and `focus_desktop_window` (`apps/shared/maataa-workspace.ts:56-107`).
- MAATAA Browser already does this correctly: its capability is `windows: ["main"]`, and external pages get no commands.
- Fix: apply the same least-privilege rule in the Tauri trial. This is the concrete form of M-5.

**D-4 (Medium): bundled products are stale, and the tests don't notice.**

- `apps/maataa-desktop-tauri/web/products/*` (git-ignored) was built 2026-10-09 12:37. None of the nine commits since are in it: work areas, services, flow designers, compounds and the storage refactor.
- `maataa:tauri:build` and `maataa:tauri:dev` rebuild it.
- `playwright.desktop-tauri-trial.config.ts:11` serves `web/` as it is, and `maataa:tauri:check` does not rebuild first, so the desktop e2e tests can pass on an old bundle.
- The copy step also carries `.DS_Store` into `products/support-center/`.
- Fix:
  1. Run `scripts/build-tauri-desktop-products.mjs` inside `maataa:tauri:check`.
  2. Write the source commit into `web/products/BUILD.json` and fail the tests on a mismatch.
  3. Skip dotfiles when copying.

**D-5 (Medium): Desktop hosts none of the lower layers.**

- No boot report is shown (M-1).
- No ALLB handshake runs from Desktop: `runtime-handshake.ts` and the integration gate are used only by tests.
- No auth-api sidecar exists (no `externalBin`), so the API must be started by hand.
- The only time Desktop has is the unverified host-clock snapshot, which it correctly withholds as Hemant time.
- Fix: decide whether Desktop is the OS/runtime host or only a launcher. If it is the host, add the API as a sidecar and show the boot report and handshake as evidence panels.

**D-6 (Low): three browsers.**

- MAATAA Browser, a separate Tauri app.
- The embedded browser inside the Tauri trial (`browser-*` windows with `external-page-browser-N` child webviews).
- The Electron shell's launch of MAATAA Browser.

Fix: keep one. MAATAA Browser has the tighter capability.

**Fine as is.** The Electron shell is hardened:

- `contextIsolation`, `sandbox` and no `nodeIntegration`.
- `window.open` is denied.
- Navigation is guarded (`main.mjs:73-86`).
- IPC checks the sending window (`trustedWindow`).

## Fix status (2026-10-12)

The release owner chose the Tauri app as the desktop and asked for items 1–3 of the recommended order (chat statement, not a signed record).

| Finding | Status | What changed |
| --- | --- | --- |
| **D-1** | Fixed | `pnpm maataa:desktop:dev` starts the Tauri Desktop. The Electron shell is frozen legacy (`maataa:desktop:electron:dev`); its browser-local list is not migrated. |
| **H-1** | Fixed | One unit: `host-unix-clock-unverified` means Unix milliseconds everywhere. auth-api schema v3 converts stored second columns, token `expires_at` is ms, and the server stamps each new version's `recordedAt` (client value ignored; accepted versions must not change). `approveVersion` refuses a clock that returns seconds. `hostUnixMs()` reads legacy values (below 1e11 = seconds). The TLPS adapter and mock now use ms. |
| **H-2** | Fixed in Desktop | TLPS in a Desktop window calls `api_connect` / `api_request` / `api_disconnect`. Desktop keeps the token in Rust and forwards only the project routes to 127.0.0.1. The CSP is unchanged. A static web build still has no route, by design. |
| **D-2** | Fixed for the API project | Desktop records `apiLink` (API project ID + current version) on the `tlps:workspace` entry from every successful project response it forwards. The API is the authority; products cannot set the link. Local Idea → Script records remain registry-versioned and are not in the API. |
| **D-3 / M-5** | Fixed | `build.rs` declares all 15 commands. Three capabilities, by webview label: home, browser, product. The external page matches none. Unknown permissions fail the Tauri build; `tests/desktop-capabilities.test.ts` keeps build.rs, the handler, the grants and each page's calls in agreement. |
| **D-4** | Fixed | `maataa:tauri:check` rebuilds the products before Playwright. `web/products/BUILD.json` stamps a content fingerprint of the sources; the desktop Playwright suite refuses a stale bundle. Dotfiles are no longer copied. |
| **L-4** | Fixed | Authority map updated. |

Verification of this change:

- auth-api: 16 unit + 3 binary + HTTP flow tests, fmt and Clippy, in the cloud workspace.
- Desktop bridge against the real auth-api: connect, refused admin route, create, save, stale save refused, server-stamped ms time, link at v1.
- Tauri crate: `cargo check`, Clippy and 27/27 tests on Linux, with only the macOS `compile_error!` guard removed in a scratch copy.
- Repository: vitest 52 files, 642/642. Contract specs 65 pass, 2 skipped. `tsc` for the root, TLPS and TLP Film.
- Desktop Playwright: 9/9 after two follow-up fixes found by the macOS run.
  - The clock test expected a Hemant reading, but the page deliberately withholds Hemant time until the host clock has a trusted reference. The test now checks the withheld label.
  - The launcher grid (7 apps, 3 rows) was taller than its fixed 408 px row and overflowed up under the title bar (2.5 px gap on macOS). The row now sizes to the launcher.
- `src-tauri/permissions/autogenerated/` is written by the Tauri build and is now ignored, so builds leave the tree clean for certification.

Still needs a native macOS run: a product window calling `api_*` through IPC, and the external page being refused.

## Recommended order

1. **D-1:** choose one desktop shell. Then **H-1:** the time unit split.
2. **H-2 and D-2:** route API calls through Tauri commands, and link the registry entry to the API project ID.
3. **D-3 / M-5:** explicit command manifest and per-window grants. **D-4:** rebuild the bundles inside the check.
4. **M-3 and M-4:** register-snapshot artifact and the shared store envelope.
5. **D-5, M-1 and M-2:** decide the Desktop host role, wire the boot report as evidence, and write the ordering rule.
6. The **L** items.

## Checks this review did not run

- `cargo test` for the auth-api and Tauri crates.
- The Playwright e2e suite.
- Anything against the external OS and ALLB repositories.

## Scrutiny, 18 Oct 2026

Reviewed at `e26f8b45` on `codex/tlps-in-brand`, with a clean tree. Since the first review, the stack has gained a hosted path:

```
tlps.in → Cloudflare Tunnel → pilot origin (127.0.0.1:4184) → auth-api TCP :4381 → SQLite
```

It has also gained the TLPS data and pilot API, and database-enforced row-level security.

### Settled since the last review

- **Uncommitted work (S-8):** the pilot work is committed and pushed.
- **Project boundary:** the database now enforces it, with pilot roles, as a second layer behind the code (`docs/security/row-level-security.md`). Every route is covered by a cross-project HTTP test.
- **Desktop bundles:** they now carry a content fingerprint, and `pnpm maataa:tauri:products:stamp` refreshes it.

### Open, most severe first

| ID | Severity | Finding | Fix |
| --- | --- | --- | --- |
| A-1 | High | Hosted traffic reaches the API over TCP :4381 (`scripts/tlps/pilot-origin.mjs:8`). `docs/security/local-auth-api-ipc.md` says that listener is development-only and must not carry production credentials, and the auth-api README says there is no cross-device deployment. The code and three documents disagree. | Proxy the origin over the private Unix socket and keep TCP for Vite only. Otherwise, rewrite the decision with the hosted path in scope. |
| A-2 | High | auth-api stores full TLPS planning content (`tlps_entities.data_json`), including investment interests and escrow reviews. The authority map still calls the store metadata-only, with TLPS authoritative. `deploy/tlps/README.md` says retention, backup frequency and incident ownership are unset, and that sensitive data must not be admitted until they are. | Record the owner decision, update the authority map, and set retention and backup policy before cutover. |
| A-3 | Medium | A public hostname sits on one SQLite connection behind a `std::sync::Mutex`. Store calls run synchronously on async worker threads (no `spawn_blocking`). Neither the origin nor the API rate-limits. There is no alerting or second machine. One slow request stalls every other one. | Run store calls in `spawn_blocking`. Rate-limit per IP at the origin and in Cloudflare. Accept single-machine availability in writing for the pilot. |
| A-4 | Medium | There are three client paths with three token models. The Desktop bridge holds the token in Rust and forwards only `/v1/projects`. The services panel uses the dev proxy. Connected Projects calls `fetch` with the token in page memory, so it works on tlps.in but not inside Desktop. | Give `tlpsDataApi` the shared transport. Extend the Desktop allow-list to `/v1/tlps/*`, which RLS now protects. |
| A-5 | Medium | `/readyz` and backup verification check only the core schema v3 ledger. The `tlps_schema_migrations` and `tlps_pilot_migrations` ledgers are not checked, so a restore drill can pass with a broken TLPS schema. | Make one readiness check cover all three ledgers, and use it in `backup_to`. |
| A-6 | Medium | Weight. Desktop ships the Support Center product at 170 MB: `frame-pack.zip` (81 MB) plus 1,320 frame files. The git pack is 1.37 GiB. | Exclude the zip from the Desktop bundle. Move artwork to Git LFS or a download. |
| A-7 | Medium | One-hour tokens, audit times and idempotency all run on the unverified host clock, now behind a public hostname. | Add a clock check to the origin start-up steps and record drift in release evidence. |
| A-8 | Low | Idea → Script model drafting needs `/api/brahmini`, which only the Vite proxy serves. Desktop and tlps.in return 404. | Label it development-only in those hosts. |
| A-9 | Low | One bootstrap secret holds all admin power: principals, tokens and memberships. There is no rotation procedure. | Document rotation. Consider a separate membership-admin token. |
| A-10 | Low | Docs drift. The authority map (metadata-only, schema v1/v2, no deployment), the auth-api README (no cross-device deployment) and this file's first-pass statuses lag the code. | Update them in the same change as A-1 and A-2. |
| A-11 | Low | The tlps.in mobile routes lazy-load catalogue chunks of 1.8 MB (languages), 1.7 MB (planets) and 1.35 MB (systems). | Search on the server, or split by first letter. |

### Unchanged

- The OS has no clock, and nothing reads its boot report.
- Desktop does not run the ALLB check-in.
- DBB/HKDB, DB Studio and API Studio do not exist.
- Local Idea → Script records stay versioned in the Desktop registry only.

### Order

1. **Before the tlps.in cutover:** A-1 and A-2.
2. **Then:** A-5, A-4 and A-3.
3. **Then:** A-6 and A-7.
4. **Last:** the low-severity items.

### Fix status, 18 Oct 2026 (pilot-ready pass)

Owner decisions, recorded from chat statements (not signed records):

- **Data authority (A-2):** the Auth/API store holds the full TLPS project data.
- **Retention (A-2):** data is kept until the project owner deletes the project. Deletion locks the project at once and purges every row 30 days later. Backups follow the same 30-day window.

| ID | Status | What changed |
| --- | --- | --- |
| A-1 | Fixed | `pilot-origin.mjs` forwards to the private Unix socket and refuses a shared socket directory. TCP needs `TLPS_ALLOW_TCP_API=1`, development only. The API takes `MAATAA_AUTH_API_PORT=off` and then opens no TCP listener. `provision-pilot.py` uses the socket too. |
| A-2 | Fixed | Core schema v4 adds `project_deletions`. `DELETE /v1/projects/{id}` (owner only) answers 202 with `purgeAfter`, and every later request for that project answers 410. `POST /v1/admin/projects/{id}/restore` undoes it inside the window. An hourly purge, plus `maataa-auth-api purge`, removes every row in a fixed table order. A test fails if a table with `project_id` is missing from that order. Append-only guards allow deletes only during that purge (`rls_purging`). `prune-backups` removes named backups older than 30 days. The authority map now records the decision. |
| A-3 | Partly fixed | The API rate-limits per principal (burst 120, 20/s), admin calls and failed authentications, and answers 429 with `Retry-After`. The origin limits each client address (`CF-Connecting-IP`; burst 60, 5/s). Waiting for the database is now marked blocking, so other connections move to other workers. **Still open:** one SQLite connection and no high availability. |
| A-4 | Fixed | One transport (`MaataaApiTransport`) for the project store, the TLPS data client and Connected Projects. In Desktop the token stays in Rust. In a browser it stays in the transport closure. The Desktop allow-list now covers TLPS data, the pilot and owner deletion, with required `If-Match` / `Idempotency-Key` and plain listing queries. It refuses a path for a project other than the window's own. |
| A-5 | Fixed | `/readyz` and backup verification check all three ledgers (core v4, TLPS v1, pilot v1) against this build's checksums. `/readyz` reports `ledgers`. |
| A-10 | Fixed for these items | Authority map, auth-api README, IPC note, RLS note, deploy README and Desktop README updated. |

Checks for this pass: auth-api 91 lib + 3 main + 2 http_flow + 20 tlps_http tests, and `clippy -D warnings`. Desktop Rust 31 tests (Linux, macOS guard removed). Vitest 689. `tsc` for TLPS and the demo. These ran in the cloud and on the Linux VM. The native macOS run is still to do.

Still open: A-3 (single connection), A-6, A-7, A-8, A-9 and A-11.
