# TLPS public, marketing and onboarding surfaces

The MAATAA Redux demo exposes these routes:

- `/#/tlps` — public start screen that immediately asks for the user's role and content format, then carries those choices into the guided idea intake.
- `/#/tlps/marketing` — explains the intended planning-to-handover model and labels product areas as a pilot preview or documented scope.
- `/#/tlps/brand` — tlps.in identity reference with theme-aware colour roles, plain-language voice guidance, and a downloadable JSON brand kit. The export resolves the active MAATAA theme values in the current browser and labels itself a local preview. The domain is a brand reference; this feature does not establish deployment or domain ownership. Links open the existing onboarding and Branding Studio.
- `/#/tlps/workplaces` — searchable directory generated from all 20 TLPS work areas and their canonical workplace mappings. Each area/workplace pair opens a separate demo at `/#/tlps/workplaces/<encoded-key>`. The same demo is available beneath a selected workspace in the standalone TLPS work-area screen.
- `/#/tlps/onboarding` — role-and-idea-first intake. The user chooses a role, a content format, I2S / I2R / I2B (or a suggested path), an automation preference, and describes the idea by typing or optional browser speech input. “Show my path” displays the six film stages; I2R also crosswalks each stage to declared product OS, registry workspace families, topic checklists and stage boundaries. Pre-production surfaces Casting, Crew, Location, Equipment & Logistics, Finance and the cast/crew/department role contracts. Saving stores only this browser's setup; no account or contact details are collected or sent.

The existing `/#/tlps-workflow` remains the runnable browser-local pilot and is linked from the suggested path. The overview leads with this browser-local production planning preview and its next steps. The catalogue separates the audited product vocabulary from demonstrated behavior. Its counts refer to the local enterprise snapshot: 16 declared products, 70 use cases and 160 flows. They do not indicate that those capabilities are live.

The stage and OS crosswalk draws from the six authored lifecycle stages, TLPS product IDs, role contracts and workspace registry. A listed OS or workspace remains a catalogue declaration unless its stage explicitly links to a tested local preview. The path planner is deterministic UI guidance, not model inference: it does not generate scripts, books, films, budgets or production materials. AI-assisted drafting, maximum automation, AI film generation, finance discovery, hiring, online booking and release services are visible as selected intentions but remain unavailable until their providers and review gates are connected. Optional speech input uses the browser's speech recognition when supported; typed input is always available.

Bookings, venue permission, legal clearance, real payments, authenticated access, durable server storage, and production completion are not established by these surfaces. Onboarding's “Save setup locally” button persists only the chosen setup in localStorage.

## Workplace demo workflows

Every mapped workplace has a local record form, synthetic sample records, record-status controls and a four-step rehearsal tailored to its area. Register areas reuse their existing fields and samples. Production, Finance, Evidence, Crew and Location use a planning-item form for these separate workplace rehearsals; the original full film-planning demo is still available.

The current source mappings generate 222 distinct workplace IDs and 327 area/workplace demo pairs across 20 areas. All 31 product-specific TLPS Production, Casting and Crew workplace IDs are included. Shared MAATAA workplaces are included where the TLPS area definitions map them; unrelated MAATAA workspace families are outside this directory. Counts reflect local source coverage, not live services or independently specialised implementations for every workplace.

Each step requires at least one valid record, a plan owner and a review note. Changing records or the owner restarts review. Runs persist separately by area and workspace in `tlps.workplace-demos.v1`; invalid stored values are rejected or dropped and unsupported completion is reset. Storage failure is shown with a reminder to export. No data is sent to a server by these demos.

Every workplace includes an action icon bar (New record, Load samples, Review plan, Check current step, Export handover, Restart steps) and a steps icon bar (Prepare, Review, Rehearse, Handover). Actions operate on that workplace's current records and review. Sample loading is disabled for non-empty registers. The steps bar shows the real saved review state, scrolls/focuses current or checked steps, and locks future steps; it never advances review by navigation alone. Both bars wrap for narrow screens and retain visible text labels and accessible names.

“Export demo handover” includes records, sample markers, owner, step notes and local completion. It always marks production readiness, confirmed bookings, real payments and authenticated approval false. Export is available for incomplete plans too, with `demoComplete: false`. The area-specific steps are rehearsal checklists, not verified external approvals or complete implementations of specialised production services.

## Routes and local preview

Use `TLPS` in the MAATAA demo navigation or visit `/#/tlps`. The overview links to `/#/tlps/marketing` and `/#/tlps/onboarding`; onboarding links to the existing workflow at `/#/tlps-workflow`.
