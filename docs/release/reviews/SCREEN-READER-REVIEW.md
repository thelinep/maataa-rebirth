# Screen-reader review protocol (gate 3)

**Prepared:** 2026-10-12 · **Candidate:** `5bc8c7b8` · **Status:** NOT_RUN — needs a human reviewer, ideally one who uses a screen reader daily.

**Execution attempt, 2026-10-12:** No valid release-candidate review was performed. The checkout was at `ff908c17b5d5dba865cde17ea16af531f97b5120` with eight dirty paths, so it did not match the frozen candidate in the acceptance packet (`255854d577870fbc25b8c20ca2e515a9fa700566`). The local `node_modules/.bin` launchers for Vite, Playwright and Vitest were absent, so the demo preview and automated browser checks were not run. VoiceOver/Safari on macOS and iOS and NVDA on Windows were not available for this attempt. Reviewer record: **NOT RUN**; disposition: **NOT RUN**. This records the failed attempt to establish review conditions; it does not close Gate 3 or certify the current checkout.

Automated checks (axe, keyboard and focus contracts) already pass on the candidate. They do not show whether the package is understandable and operable with a screen reader; this review does.

## Setup

```bash
pnpm demo:build
node node_modules/vite/bin/vite.js preview --config examples/redux-demo/vite.config.mjs --host 0.0.0.0
```
Open `http://<mac-ip>:4173/#/<route>`. Stop the preview afterwards so port 4173 is free for certification.

| Pairing | Required |
| --- | --- |
| VoiceOver + Safari (macOS) | Yes |
| VoiceOver + Safari (iOS) | Yes |
| NVDA + Firefox or Chrome (Windows) | Yes |
| TalkBack + Chrome (Android) | Recommended |

## Routes

`#/`, `#/surface`, `#/playground`, `#/sandbox`, `#/demos`, `#/docs`, `#/help`, `#/support` — the eight public routes.

## Checks on every route

1. Page title and one `main` landmark are announced; landmarks list is sensible (no duplicate unnamed navigation or complementary regions).
2. Heading list gives a usable outline (no skipped levels that hide structure).
3. Tab and screen-reader browse order match the visual order.
4. Every control announces a name, role and state.
5. Status and validation messages are announced without moving focus.
6. Nothing is conveyed by colour alone.

## Stable components — specific tasks (`#/playground` unless noted)

| Component | Task | Expected |
| --- | --- | --- |
| `Button` | Activate a button; trigger a loading state | Name announced; while loading, "busy"/dimmed and the loading label is read |
| `Input` | Focus the input | Its label is read; invalid state announced when set |
| `Card` | Navigate into a card | Read as an article with its header text |
| `ThemeToggle` | Activate repeatedly | Name contains the visible text ("Toggle theme: dark") and updates each time |
| `UiProvider` `dir="rtl"` | Switch direction if exposed | Reading order follows RTL |
| `DataTable` | Navigate the table, sort a column, select a row | Table name read; column headers announced; sorted state ("ascending") announced on the sorted header; non-sortable headers are not buttons; checkbox names read |
| `Badge`, `Metric`, `Heading`, `Text`, `Divider` | Browse | Text read in order; divider announced as separator |
| `VisualComposer` (`#/sandbox`) | Add a block, select it, undo | Each action announced; status region reports composition status |
| `CompositionRuntime` | Browse a rendered composition | Status line read once; invalid scene shows an alert |
| Layouts | Open a layout with sidebar, details or rail regions | Landmarks named where labels are given; one `main`; reading order matches visual order |

## Pre-identified risk: reading order in layouts

A static comparison of each layout's CSS grid areas with the fixed DOM order of `LayoutPreset` finds **59 of the 84 grid-placed layouts** where at least one declared region appears in the DOM in a different order from its position in the grid (row-major). Typical patterns:

- `details` comes before `main` in the DOM but is placed after it (Fluid, Fixed, FullBleed, FixedAppShell, scrollable, adaptive, tabbed, dockable, mobile, drawer, sheet and sticky layouts, DataExplorer, TableWorkspace — 22 layouts);
- `rail` before `main` but placed after it (HolyGrail, Wizard, Approval, Review, product/booking/checkout/pricing, Presentation, DocumentEditor, Documentation and KnowledgeBase, StepperForm — 14);
- `filters` before `main` but placed after it (TwoColumn, SidebarShell, FacetedCommerce, SearchResults, StickySidebar, Settings, CollapsibleSidebar — 7);
- `list`/`details` before `main`/`inspector` in three-pane layouts (ThreeColumn, ResponsiveThreePane, DoubleSidebar, ListDetailInspector, Inbox, Chat, CRM — 7);
- `preview` before `main` (Split, ResizableSplit, Comparison, BeforeAfter, FormPreview — 5); `details` before `timeline` (Timeline, Gantt, Calendar, Scheduler — 4).

Grid-area order is a proxy for visual order, so the reviewer must confirm each case. If confirmed, the fix is to render slots in each layout's declared area order instead of one fixed order (WCAG 1.3.2 Meaningful Sequence, 2.4.3 Focus Order). This changes DOM order but not the frozen props; it is recommended before the review so the review checks the fixed behaviour.

## Record

```
Screen reader / browser / OS:        Reviewer:        Date:        Commit:
Routes reviewed:
Findings (severity: blocker / major / minor, route, element, what happened):
Disposition: PASS / PASS WITH ISSUES / FAIL
```
