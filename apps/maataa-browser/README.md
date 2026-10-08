# MAATAA Browser

MAATAA Browser is a Mac-first native browser shell prototype built in Rust with Tauri 2. On macOS the page window uses the system WKWebView (Apple WebKit), so this browser app does not bundle Chromium. The MAATAA Desktop launcher opens it as a separate native app window.

## Development

From the repository root:

```sh
cargo test --manifest-path apps/maataa-browser/src-tauri/Cargo.toml --offline
cargo build --manifest-path apps/maataa-browser/src-tauri/Cargo.toml --offline
pnpm maataa:desktop:dev
```

The browser window is created only after a user submits an HTTP or HTTPS URL. Search phrases use DuckDuckGo. Local-file, script, and credential-bearing URLs are rejected. The external page gets no MAATAA command permissions. MAATAA's own development panel shows this-session page history and page-level network metadata. It records fetch/XHR method, response status and duration, plus timing-only entries for other resources. Query strings, request and response headers, and bodies are not recorded. In debug builds, the inspector button opens the platform Web Inspector for deeper engine-provided inspection.

## Current development boundary

The history and telemetry list is held in memory for the current app session. Resource timing can be restricted by a website's cross-origin timing policy; this is not packet capture, a trusted security log, or a view of encrypted payloads. DOM and console inspection remains available through WebKit's native inspector in debug builds. The packaged Electron Desktop bundles the Tauri browser executable as a separate process. Windows Tauri builds use Edge WebView2 (Chromium), so this prototype's Chromium-free guarantee currently applies to macOS only. Do not describe it as a new browser engine: it is a MAATAA browser product shell using Apple's WebKit engine.
