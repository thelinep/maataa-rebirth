# Alpha 8.4 Bundle Hotfix

The Beta-prep bundle gate exposed a Storybook-only regression caused by manually collapsing all `@storybook/*` framework modules into a single `vendor-storybook` chunk (~2.44 MB).

This hotfix removes that forced Storybook vendor aggregation and lets Vite/Rollup split the Storybook framework naturally. The MAATAA-specific manual chunks remain in place (`maataa-registries`, `maataa-demo-data`, React, and axe where applicable).

No MAATAA component/runtime/public API behavior changes.

Validation target:

```bash
pnpm storybook:build
pnpm bundle:check
pnpm beta:validate
```

Then rerun:

```bash
pnpm certify:beta:no-browser
```
