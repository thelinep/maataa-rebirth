# MAATAA Support Center

Standalone Help, Guides, FAQs, Workspace Directory, and Support Handoff application.

## Run locally

From the repository root:

```sh
pnpm support-center
```

Open `http://127.0.0.1:4178`. The app reads canonical workspace names and IDs from `src/registries/workspaceRegistry.ts` and otherwise runs without a backend.

## Desktop app

With the repository's Electron packaging tools installed, run `pnpm maataa:desktop:dev` to open MAATAA Desktop, or `pnpm maataa:desktop:pack` to create an unpacked macOS app and ZIP in `maataa-desktop-dist/`. The desktop opens to a centered app-icon grid. MAATAA UI, TLP Film, TLPS, the NEVO demo, and Support Center each open in a draggable, resizable app window with Mac-style close, minimize, maximize, and full-screen controls. The MAATAA Browser icon launches a separate Rust/Tauri process using the macOS system WKWebView; its controller and development panel show top-level navigation events. Window dragging stays inside the desktop workspace so title bars remain reachable. While apps are open, click a dock icon to launch or switch apps; right-click an icon for compact, comfortable, large, centered, half-screen, full-screen, minimize, and close options. The browser executable is included in the Apple Silicon package; the package remains a local, unsigned build, not a public installer. TLP Film and TLPS keep their own product workflows while sharing the desktop launcher and shell.

## Verify, refresh screenshots, and package

```sh
pnpm support-center:screenshots
pnpm support-center:check
pnpm maataa:desktop:pack
```

The screenshot command uses Playwright against the local MAATAA demo and Support Center, then writes optimized WebP captures to `public/screenshots/`. It covers 15 MAATAA routes, all 17 Full Surface catalogue tabs, seven independent demos, 18 Support Center screens, 33 responsive views, and 18 interaction states (108 captures total). Workspace slice captures include the full searchable directory, TLPS and NEVO detail views, and the guide. Re-run the command after changing those screens to refresh the gallery. The generated package index is based on the current `package.json` exports and source tree. `support-center:check` runs the Support Center flows; `maataa:desktop:check` builds all bundled products and verifies launcher, app-window, and TLPS-to-film handoff behavior. The desktop packaging command refreshes the unified app and ZIP with the latest gallery assets.

## Arcade Quest artwork frames

Open `/#/artwork` from Game UI Help to search and filter the complete artwork collection by MAATAA, TLPS, Support Center or illustration world. The source registry currently covers 616 MAATAA workspace entries, all 31 TLPS product workspace entries and twelve Support Center visual states: 659 named frames total. Each detail view includes a downloadable 1200×720 WebP frame. The complete frame pack and manifest are downloadable from the gallery.

Eight original illustrations were generated with built-in ImageGen and saved as optimized WebP assets under `public/artwork/`. Their exact prompts and source paths are recorded in `provenance.json` and per-image sidecars. Named frames combine those shared scenes with registry-derived titles and synthetic sample content; they are not 659 individually generated illustrations or evidence that new live workflows are connected. Existing support forms and workplace demos keep their original behavior.

`scripts/export-arcade-artwork.mjs` regenerates the named frames, checks each rendered frame for clipping, and builds the manifest and ZIP using a running local Support Center preview (default port 4180). Rebuild the Support Center afterwards to copy refreshed exports into its served output. Re-run the exporter whenever the registries, artwork or frame layout changes. The manifest records counts, individual filenames, failures and overflow findings.

## Game resources and payments

Game UI Help links to `/#/gaming/handbook`, `/#/gaming/playbook`, `/#/gaming/guides` and `/#/gaming/payments`. The first three are working reference pages. Payments is a blocked setup page awaiting a merchant provider, account, currency and product scope; no real or mock checkout is connected. User intent is real payment integration. Do not treat this page or its artwork as payment-provider implementation or payment evidence. Credentials must remain server-side.

## Game UI Help

Open `/#/gaming` for the Arcade Quest styled support hub, reachable from Help home and the searchable Arcade Quest guide. It includes six searchable guides, topic filters, accessibility guidance, FAQs and entry to the existing local handoff flow. Theme and workplace links target the MAATAA local preview on port 4177. The hub uses the shared `ARCADE_GAME_THEME` preset without changing the active theme of other pages. The same preset is available in Theme Studio for explicit preview and application across MAATAA and TLPS.

This is a video game inspired interface, not a playable game, game engine, live chat or ticket queue. Requests continue to follow the local support handoff boundary below.

## Support handoff boundary

Drafts, feedback, and handoff packets use the app's local storage. The app has no connected support queue or ticket service. The final review step explains that nothing is sent; saved packets can be copied or downloaded as JSON for transfer through an approved support channel. Avoid including secrets, personal information, or confidential production records.

## Coverage

The home page provides three guided starting points, current product screenshots, searchable help, direct workspace-family filters, and an explicit local-handoff explanation. The Product Map counts package registries and includes a generated, searchable detail page for every public package area, including import paths and source-module paths. The screenshot gallery includes 108 generated captures across the MAATAA app, all 17 explorer catalogues, seven independent demos, the Support Center, mobile-sized responsive views, and selected interaction states. It supports category filters, search, and a keyboard-closeable full-size viewer. The app also includes searchable guides and FAQs, contextual article feedback, a searchable directory of every current workspace registry entry, canonical record details, searchable synthetic data slices for all 647 workspaces, TLPS and NEVO detail views, a downloadable complete JSON fixture, device-local request drafts, validation, review, local save, clipboard copy, JSON export, saved handoff listing/removal, mobile navigation, and not-found recovery. Registry entries document declared vocabulary and do not alone imply a complete product feature.
