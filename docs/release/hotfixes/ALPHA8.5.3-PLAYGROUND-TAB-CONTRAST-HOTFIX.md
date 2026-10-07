# MAATAA UI alpha8.5.3 — Playground Tab Contrast Hotfix

## Scope
This patch is intentionally narrow. Alpha8.5.2 retained successfully in the production bundle and reduced the accessibility gate from 5 failing route/project combinations to 2. The only remaining blockers are the three tabs on `/playground` in dark mode, duplicated across desktop and mobile.

Axe reported:
- selected `Overview`: `#221d16` on `#151519` = 1.08:1
- inactive `Evidence`: `#6f675d` on `#151519` = 3.27:1
- inactive `States`: `#6f675d` on `#151519` = 3.27:1
- required: 4.5:1

alpha8.5.3 changes only the dark playground tab foreground colors:
- selected: `#f2eee8` (large safety margin)
- inactive: `#a9a29a` (large safety margin)

All alpha8.5.2 fixes are retained: `/surface` semantics/contrast, playground input labeling, dark preview coherence, and keyboard-focusable scroll regions.

## Apply
```bash
cd ~/Downloads/maataa-ui-full-alpha7
unzip -o ../maataa-ui-alpha8.5.3-playground-tab-contrast-hotfix-flat.zip
node scripts/hotfixes/alpha8.5/apply-alpha8.5.3-a11y-hotfix.mjs
bash scripts/hotfixes/alpha8.5/VERIFY-ALPHA8.5.3.sh
```

## Expected narrow-gate result
```text
16 passed
0 failed
```

Do not change or suppress `tests/e2e/accessibility.spec.ts`. The hotfix is expected to satisfy the existing Axe gate unchanged.

## Rollback
```bash
node scripts/hotfixes/alpha8.5/rollback-alpha8.5.3-a11y-hotfix.mjs
```
