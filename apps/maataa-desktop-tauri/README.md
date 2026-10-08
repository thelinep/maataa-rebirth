# MAATAA Desktop · Tauri WebKit trial

A macOS-native desktop launcher that opens MAATAA UI, TLPS, TLP Film, Help & Docs, and Browser in independent native windows. The home screen is the desktop; product windows retain their own public/access/workspace flows, and Browser windows each have a separate navigation toolbar and child WebKit view. On macOS, Tauri's Wry backend uses WKWebView and does not bundle Chromium.

This project is a feasibility trial separate from the current Electron desktop. The child-WebView `add_child` API requires Tauri's unstable feature and is not a release guarantee. Sites keep their normal authentication, CSP, same-origin and other browser security boundaries. The external page receives no MAATAA IPC commands. TLP and TLPS application state is local demo state; no real account provider, shared service, or production backend is connected.

## Run and test

From the repository root, build the bundled applications and macOS app:

    pnpm maataa:tauri:build

Then open `src-tauri/target/release/bundle/macos/MAATAA Desktop · Tauri Trial.app`. To run checks without building the app bundle:

    pnpm maataa:tauri:check

Choose any app icon to open a separate native window. Choose Browser repeatedly to open independent browser windows. In TLPS, complete the local planning workflow and use its handoff action to open TLP Film; the film app asks for local preview access and confirmation before importing the plan. No external service or production operation is performed. Enter example.com in any Browser window to attach its own WebKit view; resize the window, then close and reopen the page. The plain HTML preview cannot create native windows or child views.

## Current verification

Rust unit tests cover public-address validation, independent child labels, supported product entry points, and the native title-bar plus toolbar offset. Playwright checks cover product launch routing, truthful preview behavior, and a narrow layout. Verify product switching and the TLPS handoff in the native app because the plain browser preview cannot create Tauri windows. The app bundle is unsigned and intended for local trial use.
