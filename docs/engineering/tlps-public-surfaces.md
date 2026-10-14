# TLPS public, marketing and onboarding surfaces

The MAATAA Redux demo exposes these routes:

- `/#/tlps` — public start screen that immediately asks for the user's role and content format, then carries those choices into the guided idea intake.
- `/#/tlps/marketing` — explains the intended planning-to-handover model and labels product areas as a pilot preview or documented scope.
- `/#/tlps/brand` — tlps.in identity reference with theme-aware colour roles, plain-language voice guidance, and a downloadable JSON brand kit. The export resolves the active MAATAA theme values in the current browser and labels itself a local preview. The domain is a brand reference; this feature does not establish deployment or domain ownership. Links open the existing onboarding and Branding Studio.
- `/#/tlps/onboarding` — role-and-idea-first intake. The user chooses a role, a content format, I2S / I2R / I2B (or a suggested path), an automation preference, and describes the idea by typing or optional browser speech input. “Show my path” displays the six film stages; I2R also crosswalks each stage to declared product OS, registry workspace families, topic checklists and stage boundaries. Pre-production surfaces Casting, Crew, Location, Equipment & Logistics, Finance and the cast/crew/department role contracts. Saving stores only this browser's setup; no account or contact details are collected or sent.

The existing `/#/tlps-workflow` remains the runnable browser-local pilot and is linked from the suggested path. The overview leads with this browser-local production planning preview and its next steps. The catalogue separates the audited product vocabulary from demonstrated behavior. Its counts refer to the local enterprise snapshot: 16 declared products, 70 use cases and 160 flows. They do not indicate that those capabilities are live.

The stage and OS crosswalk draws from the six authored lifecycle stages, TLPS product IDs, role contracts and workspace registry. A listed OS or workspace remains a catalogue declaration unless its stage explicitly links to a tested local preview. The path planner is deterministic UI guidance, not model inference: it does not generate scripts, books, films, budgets or production materials. AI-assisted drafting, maximum automation, AI film generation, finance discovery, hiring, online booking and release services are visible as selected intentions but remain unavailable until their providers and review gates are connected. Optional speech input uses the browser's speech recognition when supported; typed input is always available.

Bookings, venue permission, legal clearance, real payments, authenticated access, durable server storage, and production completion are not established by these surfaces. Onboarding's “Save setup locally” button persists only the chosen setup in localStorage.

## Routes and local preview

Use `TLPS` in the MAATAA demo navigation or visit `/#/tlps`. The overview links to `/#/tlps/marketing` and `/#/tlps/onboarding`; onboarding links to the existing workflow at `/#/tlps-workflow`.
