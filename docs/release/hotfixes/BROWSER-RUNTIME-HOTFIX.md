# Alpha 8.4 Browser Runtime Hotfix

Purpose: repair the production-preview browser gate after all route-content smoke tests timed out while axe alone appeared green.

Changes:
- removes demo barrel imports that pulled `createDemoStore` back into the Redux chunk;
- replaces static-data barrel imports with leaf imports;
- splits large canonical registry files before the generic registry manual-chunk rule;
- keeps Redux, demo metadata, static demo records, and registries in one-directional chunks;
- adds `data-maataa-demo-ready="true"` to the mounted application shell;
- requires the ready marker in both surface smoke and axe tests;
- fails browser tests on uncaught page runtime errors, so a blank page cannot be reported as accessible.

This hotfix does not relax bundle or accessibility budgets.
