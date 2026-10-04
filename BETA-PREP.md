# MAATAA UI Alpha 8.4 — Beta-prep

Alpha 8.4 does not expand the catalog. It hardens the already-certified Alpha 8 package for a future Beta decision.

## Scope

1. **Bundle/code splitting** — manual Rollup chunks separate React, state, registries, demo data, Redux, composer/runtime, tools, generators, AI spaces, devices, layouts, pages and workspaces. Bundle budgets are machine-checked after production builds.
2. **Packed consumer certification** — `pnpm package:consumer` packs the package, installs the tarball into a clean Vite/React fixture, then typechecks and production-builds that consumer.
3. **Browser smoke testing** — Playwright covers all eight public routes on desktop Chromium and a mobile Chromium profile.
4. **Automated accessibility gate** — axe scans all eight routes and fails on serious or critical WCAG A/AA violations.
5. **Release evidence** — deterministic beta-prep manifest, bundle report and baseline certification evidence are included.

## Commands

```bash
pnpm install
pnpm browser:install          # one-time Chromium install
pnpm certify                  # already-passing Alpha 8 baseline
pnpm certify:beta:no-browser  # baseline + packed consumer + bundle budgets
pnpm certify:beta             # full Beta-prep gate including browser/a11y smoke tests
```

## Beta decision rule

A Beta label should not be applied until `pnpm certify:beta` passes on the target Mac/CI environment and the remaining manual accessibility and representative real-device review is accepted. `private: true` intentionally remains in `package.json`; Alpha 8.4 is not claiming publish readiness.
