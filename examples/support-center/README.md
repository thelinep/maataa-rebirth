# MAATAA Support Center

Standalone Help, Guides, FAQs, Workspace Directory, and Support Handoff application.

## Run locally

From the repository root:

```sh
pnpm support-center
```

Open `http://127.0.0.1:4178`. The app reads canonical workspace names and IDs from `src/registries/workspaceRegistry.ts` and otherwise runs without a backend.

## Desktop app

With the repository's Electron packaging tools installed, run `pnpm maataa:desktop:dev` to open MAATAA Desktop, or `pnpm maataa:desktop:pack` to create an unpacked macOS app and ZIP in `maataa-desktop-dist/`. One desktop shell switches between the MAATAA UI product workspace and the Support Center; `⌘1` and `⌘2` switch surfaces from the keyboard. Both apps are bundled for Apple Silicon; the package remains a local, unsigned build, not a public installer.

## Verify, refresh screenshots, and package

```sh
pnpm support-center:screenshots
pnpm support-center:check
pnpm maataa:desktop:pack
```

The screenshot command uses Playwright against the local MAATAA demo and Support Center, then writes optimized WebP captures to `public/screenshots/`. It covers 15 MAATAA routes, all 17 Full Surface catalogue tabs, seven independent demos, 18 Support Center screens, 33 responsive views, and 18 interaction states (108 captures total). Workspace slice captures include the full searchable directory, TLPS and NEVO detail views, and the guide. Re-run the command after changing those screens to refresh the gallery. The generated package index is based on the current `package.json` exports and source tree. `support-center:check` runs the Support Center flows; `maataa:desktop:check` builds both apps and verifies switching between them in the desktop shell. The desktop packaging command refreshes the unified app and ZIP with the latest gallery assets.

## Support handoff boundary

Drafts, feedback, and handoff packets use the app's local storage. The app has no connected support queue or ticket service. The final review step explains that nothing is sent; saved packets can be copied or downloaded as JSON for transfer through an approved support channel. Avoid including secrets, personal information, or confidential production records.

## Coverage

The home page provides three guided starting points, current product screenshots, searchable help, direct workspace-family filters, and an explicit local-handoff explanation. The Product Map counts package registries and includes a generated, searchable detail page for every public package area, including import paths and source-module paths. The screenshot gallery includes 108 generated captures across the MAATAA app, all 17 explorer catalogues, seven independent demos, the Support Center, mobile-sized responsive views, and selected interaction states. It supports category filters, search, and a keyboard-closeable full-size viewer. The app also includes searchable guides and FAQs, contextual article feedback, a searchable directory of every current workspace registry entry, canonical record details, searchable synthetic data slices for all 647 workspaces, TLPS and NEVO detail views, a downloadable complete JSON fixture, device-local request drafts, validation, review, local save, clipboard copy, JSON export, saved handoff listing/removal, mobile navigation, and not-found recovery. Registry entries document declared vocabulary and do not alone imply a complete product feature.
