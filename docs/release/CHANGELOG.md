## Unreleased — taxonomy changes before Beta

- Every page and workspace record now has an `archetype` field naming the component that renders it; new exports `PAGE_ARCHETYPES`, `WORKSPACE_ARCHETYPES` and types `PageArchetype`, `WorkspaceArchetype`.
- 12 duplicate workspace concepts now carry `aliasOf`; both IDs stay valid.
- 14 page and workspace records have clearer display names; IDs are unchanged.
- **Breaking:** the TLPS Production, Casting and Crew workspace groups (31 IDs) and the `@maataa/ui/workspace-groups/tlps_production`, `casting` and `crew` modules moved to `apps/tlps`. The package has 616 workspace types in 55 groups.
- The package build deletes `dist/` before compiling, so removed modules no longer ship from an earlier build.
- **Breaking:** the 7 TLPS AI spaces (`AI_SPACE.TLPS_*`) and their `@maataa/ui/ai-spaces/TLPS*AI` components moved to `apps/tlps`. The package has 105 AI spaces and 1,570 components.
- Generator group `G16_PRODUCTION_TLPS` is now labelled "Production" (ID unchanged).
- `storybook-static/` is no longer tracked in git; the Storybook bundle budget now reads `.certification/storybook/assets`.

## 1.0.0-alpha.8.4 — Beta-prep

- Preserves certified Alpha 8 functionality and catalog counts.
- Adds manual Vite/Storybook chunk grouping and enforceable bundle budgets.
- Adds `pnpm package:consumer` clean packed-tarball Vite consumer certification.
- Adds Playwright desktop/mobile smoke coverage for all 8 public routes.
- Adds axe serious/critical accessibility gates for all public routes.
- Adds `pnpm certify:beta:no-browser` and full `pnpm certify:beta` release gates.
- Adds deterministic Beta-prep manifest and certification evidence.

# Alpha 8 — Actual runtime previews

- Replaces the generic Button/Input/Tabs component specimen with runtime resolution of the selected public export.
- Full Surface now loads the source module matching each `@maataa/ui/...` import path and renders the actual selected component when it is a runtime React export.
- Preview states are explicit: ACTUAL EXPORT, NON-RUNTIME EXPORT, UNAVAILABLE, or actual export requiring context/props.
- Adds tailored specimens for foundation, typography, actions, forms, tabs, cards, feedback and common primitives; unknown renderable exports are attempted through a guarded actual-export fallback.
- No preview may silently display a different component under the selected component name.

## 1.0.0-alpha.8

- Added 15 symbolic demo identities: Brahmini, Shiv, Parvati, seven Saptarishis and five Panchtatva identities.
- Added `IdentityAvatar`, `IdentityAvatarGroup`, and `IdentityBadge`.
- Added 42 provider-free MAATAA inline SVG icons through `MaataaIcon`.
- Added actor and icon registries plus identity/icon manifests.
- Replaced anonymous placeholder users/initials in the local demo with symbolic avatars.
- Wired identities into Redux demo users, project ownership, tasks, activity and AI agents.
- Added Full Surface `Identities` and `Icons` catalogs with live previews and copy examples.
- Added semantic contrast correction for Sandbox cards/input/table content.

# Changelog

## 1.0.0-alpha.6

- Added 187 canonical device types across 41 groups.
- Added atomic device frame/region components and direct device import paths.
- Activated concrete Device, Viewport, Input Modality, Orientation, Device Capability, Safe Area and Responsive Transformation registries.
- Added 46 viewport classes, 18 input modalities, 46 device capabilities, 11 safe-area profiles and 25 responsive transformations.
- Preserved all Alpha 5 pages, workspaces, layouts, generators, tools, AI spaces and registry identities.

# 1.0.0-alpha.5

- Added complete generator catalog and atomic generator surfaces.
- Added complete tool catalog including AI, prompt, agent, model, RAG, context, evaluation, safety, observability, dataset, multimodal and computer-use tool families.
- Added AI space catalog for coding, creative, business, MAATAA, specialized product, research/intelligence and command-center spaces.
- Extended Registry Registry with Generator, Tool, AI Space and 32 AI registry definitions.
- Added AI capability manifest and deterministic hashes.

# Changelog

## 1.0.0-alpha.4

- Added Page Registry with 500 page types grouped into 41 page families.
- Added Workspace Registry with 647 workspace types grouped into 58 workspace families.
- Added Registry Registry with 176 governed registry definitions plus the meta registry.
- Added 27 independent page atoms and 24 independent workspace atoms.
- Added 12 independent registry presentation atoms and a generic RegistryBrowser.
- Added 22 reusable page templates and 39 reusable workspace templates.
- Added grouped layout/page/workspace import surfaces while preserving atomic direct imports.
- Added generated Component, Atomic Component, Region, Export, Theme, Token and Template registries.
- Added deterministic [`REGISTRY_MANIFEST.json`](../../manifests/REGISTRY_MANIFEST.json) with SHA-256 evidence.

## 1.0.0-alpha.1 — standalone package artifact

- Consolidated generic MAATAA visual primitives into one standalone React/TypeScript package.
- Added foundation, typography, actions, forms, navigation, surfaces, feedback, data, visualization, maps, mobile and themes entry points.
- Added scoped semantic CSS tokens with light/dark/system support, RTL-friendly logical properties and reduced-motion handling.
- Added Storybook/Vitest scaffolding, consumer example, deterministic public API manifest generation and package docs.
- No backend, database, authentication, authorization, deployment or domain-specific runtime is included.

## 1.0.0-alpha.3

- Added 34 atomic layout-region components.
- Added 100 independently importable layout archetypes, including Holy Grail, Dashboard, Workbench, IDE, Studio, Spatial/CAD, Builder, Command Center, Kiosk, Control Room and HUD.
- Added direct `./layout-atoms/*` and `./layouts/*` package exports.
- Added responsive layout template CSS and the [layout catalog](../product/LAYOUTS.md).

## 1.0.0-alpha.7
- Added optional Redux Toolkit demo store with 16 slices, typed hooks, selectors, listener middleware and audit middleware.
- Added full shared TypeScript contracts and deterministic static demo datasets.
- Added seven registry-backed demo scenarios and demo manifest.

## 1.0.0-alpha.7.3
- Replaced the text-only Full Surface list with a three-pane live visual explorer.
- Added dedicated MAATAA Playground and Sandbox routes.
- Added interactive previews for components, layouts, pages, workspaces, devices, generators, tools, AI spaces, registries and state/data catalogs.
- Added copy-to-clipboard controls for canonical IDs, import paths, JSX, JSON, docs examples, Redux compositions and local support tickets.
- Added a safe sandbox composition model that never evaluates arbitrary code.
- Public/demo route count increased from 6 to 8.


## 1.0.0-alpha.8
- Added real VisualComposer with drag/reorder, selection, inspector, validation and codegen.
- Added builder Redux history/undo/redo and optional local persistence.
- Added CompositionRuntime and ResponsiveDeviceRuntime.
- Added component prop inspector schemas and semantic high-contrast/OLED theme modes.
- Added generated Storybook workflow for all direct imports and `pnpm certify`.
