# MAATAA UI source absorption — 2026-10-07

## Result

Historical MAATAA UI package sources are now present in this repository under
[`packages/absorbed-maataa-sources/`](../../packages/absorbed-maataa-sources/).
The top-level `src/` remains the canonical shared React package at
`@maataa/ui` 1.0.0-alpha.8.4. Each older implementation has its own named
folder and provenance record; no source tree was overlaid by matching file
name, and no original checkout was changed or removed.

The archive contains **1,766 files across 14 source roots**. It excludes
installed dependencies, build output, and caches. The M2 closeout fused
`@maataa/ui` alpha.0 package is a verified byte-for-byte duplicate of the
fused-organism package, so it is represented as a provenance alias instead of
a second payload. The M4 downloads copy is likewise recorded as an exact
duplicate. The MOM investor-demo package is kept separately because its
shared-path contents differ from the live MOM package.

See the [absorption manifest](../../packages/absorbed-maataa-sources/manifest.json)
for original paths, Git revisions and dirty-state observations, per-file SHA-256
hashes, and the alias checks. The repeatable copier is
[`scripts/absorb-maataa-ui-copies.py`](../../scripts/absorb-maataa-ui-copies.py).

## Canonical ownership after absorption

| Area | Canonical location | Absorbed material | Next convergence action |
| --- | --- | --- | --- |
| Shared React primitives, layouts, themes, hooks, registries and data | `src/` | Alpha.0 standalone/fused libraries and early reference generations | Keep `@maataa/ui` as the sole shared UI import; port only capabilities missing from its public API. |
| Renderer, contracts, recipes, governance, registry and test-package experiments | `packages/absorbed-maataa-sources/{v3-foundation,m2-browser-cert,m2-closeout,m4-hardening,independent-product-scaffold}-*/` | Versioned workspace-package snapshots | Map any still-used package API to `src/` or a deliberate internal package before changing consumers. |
| NEVO-specific branded components and event widgets | `packages/absorbed-maataa-sources/nevo-ui-0.1/` | NEVO-vendored package | Keep behind an explicit NEVO adapter boundary; verify the consumer and optional UI dependencies before migration. |
| MOM shell, runtime theme and operator surfaces | `packages/absorbed-maataa-sources/mom-ui-stage1/` | MOM stage.1 plus the distinct investor-demo snapshot | Compare semantics against the canonical Theme Studio/runtime before porting; avoid importing MOM service packages into the shared UI package. |
| Hybrid runtime hooks | `packages/absorbed-maataa-sources/hybrid-runtime-ui-1.0/` | Keyboard shortcut, portal and theme-toggle package copy | Reconcile with current `src/hooks/` and publish only missing, tested hooks. |
| MAATAA OS early surface | `packages/absorbed-maataa-sources/maataa-os-ui-alpha1/` | Alpha.1 package copy | Treat as historical input; do not promote until an active consumer is identified. |

## Boundaries

This absorption puts the source generations in one repository; it does not
declare every historical API production-ready or migrate NEVO/MOM/TLPS runtime
imports. The archived sources are not included in the published npm file list
and are not compiled by the canonical package. The original repos remain
untouched as recovery points. The canonical package still has its pre-existing
working-tree changes, so this operation is not a clean release or certification
claim.

## Follow-on order

1. Generate an export/API comparison against the archive manifest and identify
   capabilities still used by an active consumer.
2. Port neutral, dependency-light gaps into `src/` with focused tests.
3. Keep NEVO/MOM branded behavior in explicit adapter subpaths or consumer
   packages, with their dependencies and styles declared.
4. Switch each consumer to the canonical package in its own repository and run
   its package-import, theme, route, and interaction checks.
5. Retire an external duplicate only after its consumer has moved and the
   original snapshot has a verified recovery copy.
