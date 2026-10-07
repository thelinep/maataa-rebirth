# @maataa/ui in NEVO

This package is the extracted Maataa UI foundation: accessible presentation
primitives, theme metadata, navigation and status contracts.

It is intentionally **not** an authority layer. In NEVO:

- authentication, tenant access, roles and permissions remain in NEVO server
  routes and request-scoped Prisma access;
- workflow, booking, payment, evidence and audit mutations remain NEVO domain
  operations;
- `ready`, `partial` and `blocked` UI states must be derived from verified NEVO
  runtime/evidence state and must never certify an external provider by copy.

## Verification

```bash
pnpm --filter @maataa/ui typecheck
pnpm --filter @maataa/ui test
```

## Marketing-site primitives

`src/marketing.tsx` (opt-in via `src/marketing.css`) adds the primitives
the public site needs and `src/components.tsx` didn't cover: `MarketingNav`,
`Hero`, `Disclosure`, `ImageCard` and `Footer` -- all stateless, so
importing them doesn't force a Server Component into a client boundary.
The two stateful pieces, `ThemeToggle` (controlled -- the host persists
the mode) and `Carousel` (autoplay, respects `prefers-reduced-motion`),
live behind their own `"use client"` boundary in `src/marketing-client.tsx`
for that reason, and both are re-exported from the same `@maataa/ui`
barrel. Brand-neutral, same as `components.tsx`; a NEVO-branded wrapper
layer belongs in `nevo.tsx`, not here.

`MarketingNav`/`Footer` render their own `<a>` by default; pass a host
router's link (e.g. Next.js's `<Link>`) via the `linkComponent` prop for
client-side navigation. `navClassName`/`linksClassName` let a consumer key
its own existing CSS off the `<nav>` wrapping `links`, alongside (or
instead of) the primitives' own class -- see `apps/web/components/public-shell.tsx`
for a consumer that does both to reuse NEVO's pre-existing public-site CSS
unchanged.

## Advanced components

`src/table.tsx`, `toast.tsx`, `tooltip.tsx`, `tabs.tsx`, `modal.tsx`,
`combobox.tsx`, `date-picker.tsx` and `map.tsx` -- each its own file, each
owning its own `"use client"` boundary (except `table.tsx`, which is
stateless/server-safe like `components.tsx`), styled by the shared
`src/advanced.css` (new package export `"./advanced.css"`). Nothing here
was speculative: `Table` exists because no table/grid UI existed anywhere
in `apps/web` and the events list needed one; the rest were built on
explicit request after an earlier evidence-scoped pass had deliberately
*not* built them (nothing in the app used a toast/tooltip/tabs/modal/
combobox/date-picker/map yet) -- see this package's own git history and
`claude/nevo-ui-supply-audit.md` in the project for that reasoning.

Toast, Tooltip, Tabs, Modal and Combobox are thin, styled wrappers over
`@base-ui/react` (`^1.8.0` -- note this is `@base-ui/react`, not the older,
deprecated `@base-ui-components/react`), which supplies the accessible
behavior (focus trap, positioning, roving tabindex, typeahead) that's easy
to get subtly wrong by hand; each exposes a small prop surface rather than
Base UI's own compound parts (e.g. `Tooltip` takes `content`/`children`/
`side`, not `Root`/`Trigger`/`Popup`), and `Combobox`'s prop shape
(`options`/`value`/`onChange`/`label`/`placeholder`) deliberately mirrors
`Select`'s exactly, so migrating a `Select` to a searchable `Combobox` is a
drop-in swap. Base UI ships no Calendar/DatePicker part as of `1.8.0`, so
`DatePicker` is `Popover` (for positioning/focus-trap) plus a hand-rolled
month grid, controlled via ISO `"YYYY-MM-DD"` strings like every other
string-based `@maataa/ui` primitive. `Map` wraps `maplibre-gl` (`^5`)
imperatively via a `useRef`/`useEffect` pair, tiled by OpenFreeMap's
`liberty` style (free, keyless, and -- unlike MapLibre's own demo style --
explicitly documented as production-safe).

Every component follows this package's existing controlled-only
philosophy: no internal state for anything the caller has reason to see
(`Table`'s sort, `Modal`'s open state, `DatePicker`/`Combobox`/`Select`'s
value) is owned inside the component. `Table.tsx` demonstrates the
full pattern (columns/rows in, `sortColumn`/`sortDirection`/`onSortChange`
reflected back as `aria-sort` -- `Table` never sorts `rows` itself).

### Testing (two layers, each covering what the other structurally can't)

`packages/maataa-ui/tests/*.test.mjs` now runs against a real DOM via
`jsdom` + `@testing-library/react` + `@testing-library/user-event`
(`tests/dom-setup.mjs`, loaded with `node --test --import`), on top of the
existing export-shape tests -- state, ARIA attributes and keyboard/focus
behavior are covered here for every new component. jsdom has no real
layout engine and no WebGL, so it cannot verify floating-popup positioning
(Tooltip/Combobox/DatePicker) or `Map`'s actual tile/WebGL rendering --
`Map`'s own test substitutes a lightweight fake `maplibre-gl.Map`/`Marker`
pair (documented in `tests/map.test.mjs`'s header) to exercise this
package's own wrapper logic without touching WebGL at all. That real,
end-to-end verification -- actual floating position, actual map tiles, a
real marker click -- belongs to the second layer: Storybook stories with
`play` functions (`apps/web/stories/<component>/`), which this repo's
Storybook config already runs in a real Playwright Chromium browser, not
a simulated DOM (same pattern this session's `Select`/`Wizard` stories
already used).

```bash
pnpm --filter @maataa/ui test          # build + full jsdom/RTL suite
pnpm --filter @maataa/ui typecheck
```

As with the rest of this package's Storybook coverage, `storybook build`/
`next dev` could not be run live in the sandbox these components were
built in (a pre-existing, unrelated environment limitation -- see
`claude/nevo-ui-supply-audit.md`); the 8 new story files are verified via
`tsc --noEmit` against the whole `apps/web` project instead, which is
clean, but their actual rendered/interactive behavior in Storybook is not
yet visually confirmed and should be spot-checked once that environment
issue is resolved.

### A note on installing new dependencies into this package

`@base-ui/react` and `maplibre-gl` were added to `dependencies` and
`jsdom`/`@testing-library/*` to `devDependencies` by hand-editing
`package.json`, not via `pnpm add`, because this workspace's
`node_modules/.modules.yaml` records pnpm's store path using the host
machine's own filesystem path -- if you're working through a bridged/
mounted view of this repo (a different absolute path to the same files),
`pnpm add`/`pnpm install` in this package will fail with
`ERR_PNPM_UNEXPECTED_STORE` regardless of `--store-dir`, and pnpm's own
fix (a full reinstall) requires deleting existing `node_modules` entries,
which such a bridge may not permit. The dependencies were installed with a
plain `npm install` into a scratch directory outside the repo, then copied
(never deleted/moved) into this package's `node_modules/`; `npx tsc` /
`node --test` (bypassing `corepack pnpm`) were used for build/typecheck/
test to sidestep the store-path mismatch entirely. A future `pnpm install`
run from the real host machine (a normal, non-bridged checkout) should
resolve this on its own and re-sync the lockfile/store correctly; this
note exists so a future bridged session doesn't waste time rediscovering
the same dead end before landing on the same workaround.
