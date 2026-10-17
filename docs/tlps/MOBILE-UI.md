# TLPS mobile web UI

Responsive mobile shell over the current TLPS implementation, not implementation of all 228 proposed mobile routes.

## Navigation

- Home: production desk, Start/Open project actions, eight-stage Idea-to-Release navigation, personal-work destinations and workplace shortcuts.
- Projects: authenticated, administrator-provisioned project list/detail and production records.
- Operate: searchable work areas and focused workplace demos with action/step icon bars.
- Inbox: eight persistent My work destinations. Personal account-scoped services remain explicitly unconnected.
- More: grouped project/work/explore/theme/brand/selector destinations and access guidance.

Below 768px, the dedicated TLPS header replaces the duplicate MAATAA/TLPS desktop headers. A safe-area-aware fixed bottom bar remains available on TLPS routes. Nested screens have a back-to-section link. Desktop surfaces remain available above the breakpoint. Forms use 16px text and minimum 44px button targets. Bottom padding protects page actions from the bottom bar.

Existing hash URLs are preserved; no /m URL migration or speculative screen-key routing is introduced. Public signup, personal inbox data, identity verification, file uploads, external support delivery, financial execution and full proposed domain parity remain unavailable. Local demos and connected project storage are labeled separately.

Visual authority: incumbent TLPS/MAATAA tokens, shared SVG icons, existing stage bar and production components. No new visual identity. The mobile extension adapts navigation and information hierarchy to touch use; it does not change authorization or record semantics.

## Acceptance evidence

TypeScript demo typecheck and production build passed. Chromium verified five bottom tabs, seven core routes and no horizontal overflow at 320/390/430px; saved regression test passed. Nested project Back link was verified to return to Projects. Desktop and mobile captures were reviewed independently: final disposition ship for the responsive adaptation; no material fixes remained in that review. Personal inbox/service availability remains pending, as shown in the screens.

## Implemented visual system

This is an ordinary responsive extension of the existing TLPS world. The source of visual truth remains `examples/redux-demo/tlps-surfaces.css` and the active MAATAA theme. This record documents the mobile surface only; it does not establish new global tokens or replace a `DESIGN.md` or design sidecar.

| Layer | Source-backed behavior |
| --- | --- |
| Palette | Mobile controls consume the existing `--ts-ink`, `--ts-muted`, `--ts-line`, `--ts-panel`, `--ts-canvas` and `--ts-soft` aliases. Those resolve to MAATAA theme values; the soft surface mixes primary with surface at 11%. The primary project action uses `--m-primary` and its contrast token. |
| Type | Body and heading families inherit the existing MAATAA stacks. Mobile home uses a 2rem title with 1.15 line height, 1.3rem section headings, and .75rem bottom-tab labels. Body descriptions use 1.65 line height and a 65ch maximum. These are local CSS values, not additions to a global type scale. |
| Shape and depth | Borders and tonal fills distinguish controls and navigation. Mobile controls reuse `--m-radius-sm` with an 8px fallback. The shell adds no shadow vocabulary. |
| Spacing | The mobile home and More page use 16px side gutters and 20px top padding. Primary actions use a two-column layout with a 12px gap; home sections have 32px separation. These observed values remain surface-specific. |
| Shared components | `MaataaIcon` supplies SVG icons; `ProjectStageIconBar` and `TLPS_PROJECT_STAGES` supply the existing production-stage interaction. `MY_WORK_DESTINATIONS` supplies the same personal-work destinations as My work. The extension does not duplicate their data models. |

## Responsive and interaction contract

The mobile breakpoint is a maximum viewport width of 767px. The five tabs are Home, Projects, Operate, Inbox and More. Tabs keep visible text labels and mark matching routes with `aria-current="page"`; nested routes under their tab path retain the section selection. More is a destination list rather than a new service. Existing routes outside those tab prefixes do not automatically select More.

The header contains the TLPS home link, a section return link on non-tab routes, and Start. It remains in normal document flow. The bottom navigation is fixed, with a top border and a themed panel background. Its bottom padding uses the device safe-area inset; the page reserves `84px + env(safe-area-inset-bottom)` below content. Header top padding also accounts for its safe-area inset. These are responsive browser features, not evidence of a native application or installed offline experience.

Mobile navigation and primary actions have 56px minimum heights; header links, inline section actions and buttons have 44px minimum targets. Form text is 16px. Focus-visible uses the theme focus token, falling back to the TLPS primary alias, with a 2px outline and 3px offset. Existing project, onboarding, workplace and catalog components remain responsible for their own route content and behavior; the shell does not substitute separate mobile data models.

## Evidence and source limits

Reviewed source: `TlpsMobile.tsx`, `tlps-mobile.css`, `tlps-surfaces.css`, `TlpsSurfaces.tsx`, `App.tsx`, and the product records in `examples/redux-demo/PRODUCT.md` and `apps/tlps/PRODUCT.md`. This document describes source behavior; it does not independently certify rendered layout, contrast across every theme, screen-reader behavior, deployment, or all proposed mobile routes.

The product records describe an earlier local planning baseline. Current mobile copy additionally distinguishes connected project database storage from browser-local workplace demos. That difference is recorded here as source evolution; no global product or design record was changed by this documentation pass. A connected code path is not evidence of a reachable service or accepted production deployment.

Pending services remain explicit: public signup, personal inbox delivery, personal account data, identity verification, file uploads, external support delivery and financial execution. The Inbox tab opens the existing My work surface; its name does not imply message delivery. Project access remains administrator-provisioned. Planning-stage selection is local UI state, and workplace rehearsal does not confirm booking, payment, legal approval or execution readiness.

Not canonized or repaired: source-specific typography and spacing literals were not promoted to global tokens; earlier local-only product descriptions were not silently rewritten; existing overline styling elsewhere in the desktop stylesheet was not adopted as a mobile design rule. No global design files were edited.
