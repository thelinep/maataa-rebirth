# MAATAA Desktop Tauri trial — delivery sequence

**Purpose:** bring the MAATAA UI, TLPS, TLP Film, and WebKit Browser into one desktop-style native shell, then establish which pieces are ready to replace or complement the Electron desktop. This is a local prototype plan, not a release claim.

## Shipped in this local slice

1. **Desktop home and independent windows — implemented.** The home is an app launcher with a dock. Each app opens in its own native window; Browser can open multiple independent windows.
2. **Bundle the product surfaces — implemented in source.** The Tauri build script builds MAATAA UI, TLPS, TLP Film, and Help & Docs, then copies their production assets into the app bundle. TLPS and TLP Film keep their own public and local-preview flows.
3. **TLPS to TLP Film handoff — implemented in source.** TLPS saves its local plan, opens a separate TLP Film window, and TLP Film requests local preview access before showing the import confirmation.
4. **Central project and pilot home — implemented in source.** The desktop reads a small project index from Tauri app data; TLPS and TLP Film publish their current project name, type, and draft/example label. The home shows TLPS and NEVO pilot status and reopens a project in its owning workspace. Full planning details remain in each product.
5. **Basic native and responsive checks — passing.** Rust tests, launcher Playwright checks, and product TypeScript checks cover entry routing, layout, project metadata, and local handoff contracts. The current unsigned integrated app bundle builds successfully; packaged native smoke remains separate.

## Remaining sequence

| Order | Work | Exit evidence | Boundary |
| --- | --- | --- | --- |
| 1 | Build all four bundled web apps and the Tauri macOS bundle | Clean product builds; archive integrity; launch from the generated app | Unsigned local artifact only |
| 2 | Exercise every icon, app window, Browser multi-window, close/reopen, and resize | Native macOS smoke record with screenshots | WebKit remains the macOS engine; browser security stays intact |
| 3 | Complete TLPS role → work area → project → plan → TLP Film access → confirm handoff | Native end-to-end run with imported title/type and no unrelated sample overwrite | Browser-local demo data only |
| 4 | Review public/access/onboarding states and return paths for each product | Route matrix and native checks at desktop and narrow sizes | The current access screen is a local preview gate, not authentication |
| 5 | Add support/help entry points and a user-facing desktop guide | Bundled help routes and screenshots from the packaged app | Documentation does not imply service availability |
| 6 | Measure accessibility, keyboard operation, startup, bundle size, and resource use | Reported target device/OS, methods, outcomes, and known exclusions | No thresholds inferred after testing |
| 7 | Decide Electron/Tauri direction with exact feature and security comparison | Recorded product-owner decision and migration/recovery plan | Preserve Electron until acceptance is explicit |
| 8 | Expand the local single-workspace index into a multi-project model; establish real identity, remote sync, provider/backend adapters, signing, notarization, installer/update, and release ownership | Owner-approved architecture and exact-candidate release evidence | The current index stores project labels on this Mac; real accounts and remote sync are not connected |

## Current status

Steps 1 and 3 are implemented in source; the current integrated build produced an unsigned macOS app bundle, and Help & Docs is bundled. The shared project index has app-data persistence, bounded metadata validation, and owning-app launch routes. This centralization increment passed seven Rust tests, four desktop launcher browser tests, both product typechecks, app JavaScript/build-script syntax checks, and the integrated bundle build. Native smoke against this exact bundle remains open; TLPS-to-TLP Film should be exercised in those packaged windows. Steps 2 and 5–8 remain open. Local behavior does not establish a signed, distributable, authenticated, or production-ready desktop product. The existing Electron app remains the supported desktop until the owners accept a migration.
