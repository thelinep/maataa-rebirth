# TLPS public, marketing and onboarding surfaces

The MAATAA Redux demo exposes three routes:

- `/#/tlps` — public overview for production and event planners, venue and location researchers, and enterprise operations teams. The primary action is guided onboarding.
- `/#/tlps/marketing` — explains the intended planning-to-handover model and labels product areas as a pilot preview or documented scope.
- `/#/tlps/onboarding` — three-step setup for role, product area, goal and next action. It stores the completed setup in this browser only; no account or contact details are collected or sent.

The existing `/#/tlps-workflow` remains the runnable browser-local pilot and is linked from the TLPS pages. The public and marketing copy separates the audited product vocabulary from demonstrated behavior. Counts shown on the overview refer to the local enterprise snapshot: 16 declared products, 70 use cases and 160 flows. They do not indicate that those capabilities are live.

Bookings, venue permission, legal clearance, real payments, authenticated access, durable server storage, and production completion are not established by these surfaces. Onboarding's “Save setup locally” button persists only the chosen setup in localStorage.

## Routes and local preview

Use `TLPS` in the MAATAA demo navigation or visit `/#/tlps`. The overview links to `/#/tlps/marketing` and `/#/tlps/onboarding`; onboarding links to the existing workflow at `/#/tlps-workflow`.
