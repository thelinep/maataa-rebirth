# MAATAA Desktop · Tauri WebKit trial

A macOS-native desktop launcher that opens MAATAA UI, TLPS, TLP Film, Help & Docs, and Browser in independent native windows. The home screen is the desktop; product windows retain their own public/access/workspace flows, and Browser windows each have a separate navigation toolbar and child WebKit view. TLPS and TLP Film publish only a project name, type, and example/draft label to a shared local project list, which can reopen the owning workspace. Pilot status is shown beside projects. The index is stored under Tauri's app-data directory on this Mac. On macOS, Tauri's Wry backend uses WKWebView and does not bundle Chromium.

This project is a feasibility trial separate from the current Electron desktop. The child-WebView `add_child` API requires Tauri's unstable feature and is not a release guarantee. Sites keep their normal authentication, CSP, same-origin and other browser security boundaries. The external page receives no MAATAA IPC commands. Product planning stays in each app; the index is local metadata, not account sync or a shared service. No real account provider or production backend is connected.

The home screen also includes a **Spacecraft Nav** simulator. It propagates a user-editable heliocentric Cartesian state with fixed-step RK4 under a Sun-only Newtonian gravity model, and displays the simulated UTC, state vector, range, speed, radial velocity, and provisional Hemant elapsed units. Its sample is synthetic; it has no sensor, ephemeris, communications, or actuator connection. It is not flight software and must not be used to navigate or control a spacecraft.

## Run and test

From the repository root, build the bundled applications and macOS app:

    pnpm maataa:tauri:build

Then open `src-tauri/target/release/bundle/macos/MAATAA Desktop · Tauri Trial.app`. To run checks without building the app bundle:

    pnpm maataa:tauri:check

Choose any app icon to open a separate native window. Choose Browser repeatedly to open independent browser windows. In TLPS, complete the local planning workflow and use its handoff action to open TLP Film; the film app asks for local preview access and confirmation before importing the plan. Named TLPS and TLP Film projects appear under Projects on the desktop home and reopen in their owning app. Pilot cards report the current local status; they do not start or authorize a real pilot. No external service or production operation is performed. Enter example.com in any Browser window to attach its own WebKit view; resize the window, then close and reopen the page. The plain HTML preview cannot create native windows, child views, or read the on-device project list.

## Current verification

Rust unit tests cover public-address validation, independent child labels, supported product entry points, project metadata validation, and local-index persistence. Playwright checks cover product launch routing, shared project rendering, safe text handling, pilot status, and narrow layouts. Verify product switching and the TLPS handoff in the native app because the plain browser preview cannot create Tauri windows or read local app data. The app bundle is unsigned and intended for local trial use.
