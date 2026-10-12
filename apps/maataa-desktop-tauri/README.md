# MAATAA Desktop · Tauri WebKit trial

A macOS-native desktop launcher that opens MAATAA UI, TLPS, TLP Film, Help & Docs, and Browser in independent native windows. The home screen is the desktop; product windows retain their own public/access/workspace flows, and Browser windows each have a separate navigation toolbar and child WebKit view. TLPS and TLP Film publish only a project name, type, and example/draft label to a shared local project list, which can reopen the owning workspace. Pilot status is shown beside projects. The index is stored under Tauri's app-data directory on this Mac. On macOS, Tauri's Wry backend uses WKWebView and does not bundle Chromium.

**This is the MAATAA Desktop.** The release owner chose the Tauri app as the one desktop authority on 2026-10-12 (chat statement, not a signed record). `pnpm maataa:desktop:dev` now starts it. The Electron shell (`examples/support-center/electron`, `pnpm maataa:desktop:electron:dev`) is frozen as legacy: no new features, and its browser-local project list is not migrated. The child-WebView `add_child` API requires Tauri's unstable feature and is not a release guarantee. Sites keep their normal authentication, CSP, same-origin and other browser security boundaries. The external page receives no MAATAA IPC commands. Product planning stays in each app; the index is local metadata, not account sync or a shared service. No real account provider or production backend is connected.

The home screen also includes a **Spacecraft Nav** simulator. It propagates a user-editable heliocentric Cartesian state with fixed-step RK4 under a Sun-only Newtonian gravity model, and displays the simulated UTC, state vector, range, speed, radial velocity, and provisional Hemant elapsed units. Its sample is synthetic; it has no sensor, ephemeris, communications, or actuator connection. It is not flight software and must not be used to navigate or control a spacecraft.

## Window permissions

Every app command is declared in `src-tauri/build.rs` and granted per window kind, by webview label, in `src-tauri/capabilities/`:

| Capability | Webviews | Commands |
| --- | --- | --- |
| `desktop-home` | `main` | open browser/product windows, list projects and activity, focus home, read the unverified host clock |
| `desktop-browser` | `browser-*` | the same launch/focus/clock commands, plus open/close the embedded page, back/forward/reload, validate an address |
| `desktop-product` | `product-*` | publish or remove its own project entry, open another app, focus home, and the three `api_*` commands |

The external page in a browser window is the child webview `external-page-browser-N`; no capability matches it, and no capability lists remote URLs, so it gets no IPC. The Tauri build fails on an unknown permission, and `tests/desktop-capabilities.test.ts` checks that build.rs, the invoke handler, the capabilities and the commands each page calls agree.

## MAATAA Auth API through Desktop

Product windows reach the local MAATAA Auth API (`apps/maataa-auth-api`) only through Desktop (`src-tauri/src/api_bridge.rs`); the CSP still allows IPC only. `api_connect` checks a project token with `/v1/auth/whoami` and keeps it in the Desktop process: the page never holds it. `api_request` forwards only `POST /v1/projects`, `GET`/`PUT /v1/projects/{id}` (PUT needs If-Match) and `GET /v1/projects/{id}/events` to `127.0.0.1` on `MAATAA_AUTH_API_PORT` (default 4381); admin and knowledge routes are refused before any network call. From each successful project response Desktop records the API project ID and current version on the TLPS plan entry (`tlps:workspace`, field `apiLink`). The API is the version authority; `apiLink` is Desktop's cache of it, and products cannot set it. Local Idea → Script records (`prj:` entries with a `record` link) are still versioned by this registry only; they are not stored in the API.

## Run and test

From the repository root, build the bundled applications and macOS app:

    pnpm maataa:tauri:build

Then open `src-tauri/target/release/bundle/macos/MAATAA Desktop · Tauri Trial.app`. To run checks without building the app bundle:

    pnpm maataa:tauri:check

The check rebuilds the bundled products first. `web/products/BUILD.json` records the sources they were built from, and the desktop Playwright suite refuses to run when it no longer matches (`pnpm maataa:tauri:products:check` reports the same).

Choose any app icon to open a separate native window. Choose Browser repeatedly to open independent browser windows. In TLPS, complete the local planning workflow and use its handoff action to open TLP Film; the film app asks for local preview access and confirmation before importing the plan. Named TLPS and TLP Film projects appear under Projects on the desktop home and reopen in their owning app. Pilot cards report the current local status; they do not start or authorize a real pilot. No external service or production operation is performed. Enter example.com in any Browser window to attach its own WebKit view; resize the window, then close and reopen the page. The plain HTML preview cannot create native windows, child views, or read the on-device project list.

## Current verification

Rust unit tests cover public-address validation, independent child labels, supported product entry points, project metadata validation, and local-index persistence. Playwright checks cover product launch routing, shared project rendering, safe text handling, pilot status, and narrow layouts. Verify product switching and the TLPS handoff in the native app because the plain browser preview cannot create Tauri windows or read local app data. The app bundle is unsigned and intended for local trial use.
