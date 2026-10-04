# MAATAA UI Alpha 8 — Depth Build

Alpha 8 deliberately stops expanding taxonomy and implements the highest-value missing runtime depth.

## Implemented

- `VisualComposer`: real package-owned block rendering, palette add/drop, canvas selection, drag/reorder, duplicate, hide/show, delete, property editing, workspace/page/layout/device/state selectors, validation, and generated valid package JSX.
- `builder` Redux slice: scene history, undo/redo, selected block, deterministic block IDs and optional persistence.
- `createPersistenceMiddleware` / `loadPersistedMaataaState`: local demo persistence for UI/workspace/page/layout/device/composer state.
- `CompositionRuntime`: canonical Workspace → Page → Layout runtime shell driven by a `ComposerScene`.
- `ResponsiveDeviceRuntime`: mobile/tablet/desktop/foldable/TV/free preview presets with runtime breakpoints.
- `ComponentPropInspector`: curated control schemas for foundational high-use components; fallback is explicit rather than fabricated.
- Semantic token layer with dark/light plus high-contrast and OLED modes.
- Generated Storybook workflow for every direct atomic import in `PUBLIC_API.atomic.json`.
- Depth validation and Vitest contracts.
- `pnpm certify` gate combining typecheck, tests, generated stories, Storybook build, demo build and depth validation.

## Still host-owned / intentionally out of scope

Actual backend APIs, identity enforcement, live AI/model execution, databases, WebGL/CAD engines, map providers and collaboration servers remain host responsibilities.
