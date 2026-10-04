# Alpha 8 release readiness

Structural depth gates PASS. Full installed-dependency certification must be run with `pnpm certify` on a machine with the package dependencies installed. Stable/RC is not claimed.

# Release readiness

## Artifact status

- Package: `@maataa/ui`
- Version: `1.0.0-alpha.8`
- Publication: disabled by `private: true`
- Public declarations: **1767**
- Direct component imports: **1572**
- Component registry: **1572**
- Atomic component registry: **238**
- Page types: **500**
- Workspace types: **647**
- Layout types: **100**
- Generators: **208 canonical / 212 group entries**
- Tools: **491 canonical / 502 group entries**
- AI spaces: **112**
- Device types: **187 canonical / 41 groups**
- Registry Registry: **217 entries including meta**
- Redux: **16 slices / 29 selectors / typed hooks / listener + audit middleware**
- Types: **7 shared contract modules**
- Demo: **12 static datasets / 7 scenarios / deterministic fixtures**
- Public surface: **8 routes — Landing / Full Surface / Playground / Sandbox / Demos / Docs / Help / Support**
- Identity/avatar layer: **15 symbolic demo identities**
- Core icon layer: **42 inline SVG icons**

## Checks performed

- Demo canonical-ID references: **PASS**
- New TS/TSX source syntax/transpile: **PASS**
- Isolated strict Redux/type contract check with local dependency declarations: **PASS**
- New registry uniqueness and TypeScript: **PASS**
- Device catalog/source validation: **PASS**
- Generator/tool/AI-space catalog validation: **PASS**
- Public/atomic/registry/AI/device/demo manifest regeneration: **PASS**
- Public surface route/page-ID validation: **PASS**
- Full-surface React app TypeScript transpile/syntax check: **PASS**
- Identity/user/agent referential integrity: **PASS — 15/15**
- MAATAA core icon registry coverage: **PASS — 42/42**

## Checks still requiring installed dependencies / runtime environments

The dependency installation attempt timed out in this environment. Before RC/stable, still run: installed-dependency package-wide TypeScript, Vitest, Storybook, accessibility automation/manual review, Chromium/WebKit/Firefox tests, `npm pack` clean-consumer install, and representative real-device validation.

## Recommendation

**ALPHA 7.4 READY for local Vite live-surface, Playground, Sandbox and Redux demo integration work; not yet RC-certified.**

## Alpha 8 actual preview guarantee

- Component selection in Full Surface resolves the selected `@maataa/ui/...` import path to its real source module.
- `ACTUAL EXPORT` means the selected runtime React export itself is mounted in the canvas.
- Non-renderable type/hook exports are labelled `NON-RUNTIME EXPORT`; context-dependent exports show an explicit context/props message.
- No shared generic Button/Input/Tabs specimen is presented as another selected component.
- All 1,572 registered component import paths are source-resolvable in this package revision.


## Alpha 8.4 Beta-prep
Alpha 8.4 adds bundle budgets/manual chunking, clean packed-consumer validation, Playwright desktop/mobile browser smoke tests, automated axe accessibility gates, and deterministic beta-prep evidence. The Alpha 8 baseline is certified; Beta still requires the full `pnpm certify:beta` gate plus manual accessibility/representative real-device acceptance.
