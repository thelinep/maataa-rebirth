# TLPS mobile UI scrutiny

17 October 2026. Read-only audit of current mobile shell and adjacent flows. Sources: TlpsMobile.tsx, tlps-mobile.css, TlpsMyWork.tsx, TlpsSurfaces.tsx, App.tsx and ConnectedProjects.tsx. Chromium checks used a 390px viewport and synthetic mocked API responses; no real project records, credentials or DNS were changed.

## Verdict

**Good responsive shell; incomplete connected mobile product. Do not mark the full mobile application release-ready.** The earlier visual review's ship verdict concerned the responsive adaptation, not end-to-end product acceptance. This audit found 3 P1 and 3 P2 issues; no P0 identified in this bounded pass.

## Findings

### P1 — Tab navigation destroys the connected session and draft state

Location: `apps/tlps/src/project/ConnectedProjects.tsx:97–107`; TLPS route dispatch in TlpsSurfaces.tsx.

Reproduced: connect with synthetic mocked project access → Inbox → wait for My work → Projects. The access-token prompt returns. Cleanup clears the component-owned token; leaving the component also discards unsaved form state. In-memory-only credentials are appropriate, but their lifetime should span the authenticated app session, not one page.

Recommendation: app-scoped session provider, explicit disconnect/expiry/revocation handling, scoped data clearing and dirty-draft navigation protection. Do not solve by persisting bearer tokens in localStorage. Add a tab-roundtrip test and an unsaved-draft warning test. Suggested work: harden.

### P1 — “Start a project” does not create a connected project

Location: TlpsMobile.tsx:9; TlpsSurfaces.tsx onboarding save around line 684.

The primary CTA opens existing local idea/setup intake. That flow saves browser preferences, while connected projects require administrator provisioning. Users cannot complete the apparent create-project promise from this CTA.

Recommendation: label the current action “Plan an idea” or implement authenticated project creation with proper ownership. Show how to obtain pilot access before inviting a server create action. Suggested work: clarify/onboard.

### P1 — Inbox is a destination index, not an operational inbox

Location: TlpsMyWork.tsx; TlpsMobile.tsx:6,9.

All eight destinations show “not connected yet.” Their filters change headings, not records. The Home phrase “Pick up your work” and bottom label Inbox can imply live pending work although no personal queue is loaded. Detail screens disclose this, but only after navigation.

Recommendation: show availability before selection, distinguish future destinations from usable project review/support flows, then connect account-scoped listing/detail/action APIs. Never replace missing integration with a false zero-results state. Suggested work: clarify/harden.

### P2 — Several mobile sections have no active bottom tab

Location: TlpsMobile.tsx:7.

Browser verified Home selected at /tlps and More at /tlps/more, but no active tab on onboarding, catalogue or Investor Hub. Navigation uses only tab-path prefixes, although these destinations live under More.

Recommendation: centralized section/route registry so every supported route maps to its owning tab; unknown routes remain not-found. Preserve Inbox/Operate/Projects selection for nested routes. Suggested work: adapt.

### P2 — Hash navigation lacks a consistent scroll/focus policy

Location: App.tsx useHashRoute around lines 166–178; native hash links in TlpsMobile.tsx.

New shell links directly change the hash, while the explicit navigate callback separately calls scrollTo. The hashchange handler updates state without moving focus to the new screen heading. A common shell does not itself announce route changes to keyboard/screen-reader users, and scroll behavior depends on the entry path. This is source-observed; a full assistive-technology evaluation was not performed.

Recommendation: route-level heading focus, deliberate scroll restoration and dirty-form protection in one router boundary. Respect reduced motion. Test back/forward and keyboard traversal. Suggested work: harden/adapt.

### P2 — Eight-stage block dominates the small-screen first task

Location: TlpsMobile.tsx:9; inherited two-column ProjectStageIconBar layout.

Existing captures show eight large stage controls consuming much of the first screen before return-to-work links. Stage selection only changes an explanation; it is not saved project progress. For a returning-user desk, that prioritizes exploratory content above actionable work.

Recommendation: distinguish “Explore stages” from actual project progress and provide a compact stage strip or expandable guide. Keep full labels accessible; avoid implying completion. Suggested work: distill/adapt.

## Technical audit score

Provisional engineering scores, not WCAG certification or measured performance qualification:

| Dimension | Score /4 | Evidence and limits |
|---|---:|---|
| Accessibility | 2 | Labeled SVG controls and semantic nav; no route focus/announcement policy; screen reader, text zoom and full contrast matrix not tested |
| Performance | 2 | Existing lazy product boundaries; build warns about large chunks; no fresh Core Web Vitals or network/download measurement |
| Responsive design | 3 | Prior 320/390/430px route checks passed; safe-area padding and touch minimums; real device/keyboard/landscape acceptance outstanding |
| Theming | 3 | Semantic tokens reused and primary CTA contrast token corrected; only current dark appearance visually reviewed, full theme matrix outstanding |
| Implementation integrity | 2 | Coherent product-specific shell, but session lifecycle, creation promise and personal inbox integration gaps |
| Total | **12/20** | Acceptable as a prototype shell; significant work before connected-product release |

Implementation integrity verdict: **fail for full mobile product readiness**, pass for a bounded navigation prototype. Mechanical detector returned no findings; it does not detect these product/state lifecycle issues.

## Verified strengths

- Five persistent bottom destinations and eight personal-work links exist.
- Existing URLs and nested Projects/Operate/Inbox return paths are preserved.
- Scope copy distinguishes connected project storage from local demos.
- No fake account records/counts or financial activation were introduced.
- Previous typecheck/build and saved mobile regression passed. These remain narrower than release acceptance.
- Fresh audit browser checks confirmed the missing active tabs and session loss with properly awaited route transitions. An initial rapid-navigation probe was discarded because it could skip actual component unmount.

## Additional release checks still needed

Real iOS/Android viewport and software keyboard, portrait/landscape, 200% text scaling, all themes/contrast, focus visibility beneath the fixed bar, offline/reconnection, token expiry/revocation during mutation, multi-user authorization, loading/empty/error/conflict/forbidden states, assistive technology, crash/reload recovery and performance budgets. Theme Studio and standalone workflow links leave the TLPS shell; a consistent return path should be qualified across those product boundaries.

## Fix order

1. Session ownership and unsaved-draft protection.
2. Align primary creation action with its actual capability.
3. Truthful inbox availability and connect the first useful assigned-work flow.
4. Central route/tab/focus/scroll policy.
5. Compact exploratory stages and run expanded device/state acceptance.

This audit adds documentation only. It does not automatically fix or redesign the interface.
