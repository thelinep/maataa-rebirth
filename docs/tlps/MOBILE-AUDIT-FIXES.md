# Mobile scrutiny fixes

Scope: all six findings in MOBILE-SCRUTINY-2026-10-17.md.

1. Connected Projects now remains mounted while moving between TLPS routes; token and drafts remain memory-only. Tab navigation does not disconnect. Explicit disconnect, switching record families, opening another record, clearing the record form, leaving TLPS with dirty project fields and browser unload have discard protection. Reload still clears credentials intentionally; confirmation is controlled by the browser. No bearer token is persisted in browser storage.
2. Mobile Start/Create copy now says Plan an idea. It opens local onboarding and does not imply server project creation. Admin provisioning remains the actual pilot mechanism.
3. Bottom Inbox renamed My work; all eight personal destinations are marked Not connected yet before opening. Home and index explain current review/support lives inside connected projects. No fake queue/counts added.
4. Central mobileSection mapping assigns onboarding/catalogue/Investor Hub and other auxiliary routes to More, while preserving Projects/Operate/My work ownership.
5. Route changes focus the visible page heading and reset scroll consistently, including lazy-loaded pages through a scoped observer. Leaving TLPS with an unsaved connected-project draft requires confirmation. Native browser back/forward within TLPS retains the component session.
6. Idea-to-Release is a compact expandable guide, explicitly separated from saved project progress. Return-to-work links are higher on the mobile page.

Boundary: this fixes the audit's misleading state and navigation behavior; it does not implement the eight missing account-scoped backend services. Reload persistence for unsaved connected drafts is not provided; an unload warning protects deliberate exits. API failures/revocation remain enforced by the server. No financial services activated.

Verification: final 3 targeted browser tests plus 1 mobile-shell regression passed; 10 data-client tests passed; production build and demo typecheck passed. Browser checks cover tab session/draft retention, cancelled exit/disconnect, cancelled record switch, lazy route heading focus, active More mapping, availability labels and compact guide. Independent review's final disposition is ship for the scored fixes; it does not certify missing services or the whole release.
