# MAATAA UI alpha8.5.2 — A11y Retention Hotfix

## Why alpha8.5.1 stopped

The alpha8.5.1 source import was present and Vite transformed 2123 modules, but the production bundle did not contain its runtime marker. That means the side-effect-only import was removed during tree-shaking before Playwright ran.

## Change in alpha8.5.2

`main.tsx` now imports a named function and calls it explicitly:

```ts
import { installA11yHotfix } from "./a11y-hotfix";
// ...normal demo bootstrap...
installA11yHotfix();
```

This creates a live reference to the module so Rollup/Vite cannot discard it as an unused side-effect import.

The runtime patch remains demo-scoped and covers:

- `/surface`: invalid `tablist` claim, muted count contrast, inspector label contrast.
- `/playground`: dark/light color collision and missing accessible name for demo input.
- `/surface`, `/playground`, `/demos`: keyboard access for scrollable `pre` / `.table-scroll` regions.

## Apply

```bash
cd ~/Downloads/maataa-ui-full-alpha7
unzip -o ../maataa-ui-alpha8.5.2-a11y-retention-hotfix-flat.zip
node scripts/hotfixes/alpha8.5/apply-alpha8.5.2-a11y-hotfix.mjs
bash scripts/hotfixes/alpha8.5/VERIFY-ALPHA8.5.2.sh
```

Do not run the full suite until `[3/5]` prints that the marker was found and the 16-test Axe gate is green.

## Target

```text
PASS: alpha8.5.2 marker found in demo bundle.
16 passed
0 failed
```

Then run:

```bash
pnpm browser:test
pnpm test
pnpm typecheck
pnpm build
```
