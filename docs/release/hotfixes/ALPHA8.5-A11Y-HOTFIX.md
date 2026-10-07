# MAATAA UI alpha8.5 — Accessibility Gate Hotfix

## Scope

This is a **demo/browser accessibility overlay** for `maataa-ui-full-alpha7` after the alpha8.4 browser-bootstrap hotfix. It intentionally does **not** modify browser bootstrap, Redux, registries, public component APIs, or production package exports.

It targets the five remaining Axe failures observed in the narrow accessibility run:

- desktop `/surface`
- desktop `/playground`
- mobile `/surface`
- mobile `/playground`
- mobile `/demos`

## Fixes

1. Converts `.catalog-tabs[role="tablist"] > button` to valid `role="tab"` semantics and maintains `aria-selected` / roving tabindex.
2. Raises `/surface` muted text contrast above the WCAG 2 AA threshold.
3. Fixes the `/playground` light/dark token collision for the exact failing specimens (badges, cards, ghost button, input, tab-panel copy).
4. Gives the playground input an accessible name when the rendered specimen lacks one.
5. Makes `.table-scroll` and genuinely scrollable `<pre>` regions keyboard focusable, named regions with a visible focus ring.

## Install

From `~/Downloads/maataa-ui-full-alpha7`:

```bash
unzip -o ../maataa-ui-alpha8.5-a11y-gate-hotfix-flat.zip
node scripts/hotfixes/alpha8.5/apply-alpha8.5-a11y-hotfix.mjs

rm -rf demo-dist playwright-report test-results
pnpm demo:build
pnpm exec playwright test tests/e2e/accessibility.spec.ts \
  --project=chromium-desktop \
  --project=chromium-mobile
```

Expected narrow-gate target:

```text
16 passed
0 failed
```

Then run the full gates:

```bash
pnpm browser:test
pnpm test
pnpm typecheck
pnpm build
```

## Rollback

The installer creates `examples/redux-demo/main.tsx.alpha8.4-backup` once.

```bash
node scripts/hotfixes/alpha8.5/rollback-alpha8.5-a11y-hotfix.mjs
```

## Follow-up

This overlay is deliberately reversible. After the gate is green, the semantics and color-token corrections should be moved into their owning components/theme definitions, and this demo-only module can be removed.
