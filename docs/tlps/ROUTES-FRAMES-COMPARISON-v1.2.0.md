# TLPS routes and frames comparison — 2026-10-17

Source: `~/Downloads/TLPS_All_Routes_and_Frames_English_v1.2.0.json`. Compared against the current checkout's `examples/redux-demo/App.tsx`, `TlpsSurfaces.tsx`, `TlpsWorkplaces.tsx`, `apps/tlps/src/main.tsx`, `operatingSystems.ts`, Investor Hub, and the new database/API contract. This is source inspection and document consistency checking, not a live browser test or a claim about the separate mobile prototype archive referenced by the document. That archive was not supplied for this comparison.

## Document checks

- Filename says v1.2.0; internal version says **1.0.0-proposed**. Resolve the version mismatch before using this as a release contract.
- 228 route records, 228 unique route IDs, 228 unique proposed paths; no duplicate paths found.
- Coverage labels: **53 prototype_page**, **130 prototype_generic**, **45 planned_required**. These are the supplied document's labels, not verified implementation status in this checkout.
- Six operating systems define 61 frame entries: Film 13, Event 11, Campaign 10, Exhibition 9, Wedding 9, Location 9. Frames reuse routes; 61 frames should not be added to the 228 route count as separate pages.
- Ten role workspaces; six shell frame specifications; six overlay/system specifications; nine required common states.
- All collected route references resolve to route records or overlay/system records in the document.
- The 169 table names in `schema_domain_groups` exactly match the previously supplied grouped schema. This is a cross-document consistency check, not proof that each screen has backend coverage.
- The count `prototype_page_title_routes: 36` is distinct from the 53 records labeled `prototype_page`; they should not be presented as the same measure.

## Current UI vs proposed contract

| Area | Supplied routes/frames | Current checkout | Assessment |
|---|---|---|---|
| Route addressing | Proposed `/m/...` paths; source explicitly says mobile prototype switches client-side keys rather than URL routes | Hash routes under `/tlps`, plus `/tlps-workflow`; current TLPS dispatch has no `/m` route family | Different routing contracts; no canonical-path compatibility established |
| Shell navigation | Home / Projects / Operate / Inbox / More, mobile sheets | TLPS navigation exposes How it works, tools catalogue, workplaces, Investor Hub, brand, selectors, onboarding | Mobile shell and sheets are not equivalent to current TLPS navigation |
| Public entry/onboarding | `/m/home`, `/m/onboarding`, `/m/welcome`, profile/account setup | `/tlps`, `/tlps/onboarding`, marketing and brand pages | Conceptual overlap; onboarding fields and account activation differ |
| Operating systems | Six OS hubs, 61 frames | Twenty product-area choices, backed by a mix of workflow demos and browser-local registers | Broader area catalogue does not establish 61 complete specialized mobile frames |
| Role workspaces | Ten distinct roles with role-focused frame menus | Eighteen role choices and role-to-area filtering | Navigation overlap; not equivalent role-specific screens or server permissions |
| Project workflow | Project lists/details, tasks, approvals, stage operations | Plan / review / rehearsal / handover; eight-stage project icon bar | Different levels of workflow; stage icon bars are not project-detail routes |
| Production operations | Scripts/scenes, shoot days, call sheets, safety, resources | Project planning, crew/location/budget/schedule records and generic workplace registers | Partial conceptual coverage; full operational models absent from prepared API |
| Investor Hub | Investor profiles, circles/membership, diligence and related detail routes | Separate local circles, memberships, interests and escrow review registers; partial backend collections | Planning overlap; member activation, diligence and billing not implemented by the new API |
| Files and approvals | Upload/version/review, immutable approval pins | Evidence references, review readiness and exports | Uploads/version storage/approval decision routes are not supplied by current API |
| Finance | Plans, subscription management, expense/budget details and reconciliation | Draft SKUs, estimates, membership-plan metadata; financial execution disabled | No end-to-end subscription or payment acceptance coverage |
| Messaging/support | Inbox, messages, support ticket detail, notifications | No corresponding TLPS domain APIs in the prepared backend | Separate MAATAA support/demo surfaces must not be counted as implemented TLPS ticket/message workflows |
| API persistence | Specification references 169-table domain design | Twelve typed collections, existing core project/auth APIs, audit, export | Not 228 route-specific backend implementations |
| Screen states | Loading, empty, error, offline, forbidden, not_found, conflict, success, destructive_confirmation | Some local empty/save/error/loading states; API exposes corresponding errors/version conflicts | Full nine-state coverage per route has not been verified; API error responses alone are not UI frames |

## Concrete route mappings

These are possible product mappings, not redirects that currently exist.

| Proposed route | Closest existing entry | Remaining difference |
|---|---|---|
| `/m/home` | `#/tlps` | Public overview rather than mobile production desk |
| `/m/onboarding` | `#/tlps/onboarding` | Guided planning rather than full account/profile/security setup |
| `/m/operate` | `#/tlps/workplaces` | Workplace directory rather than specified mobile Operate shell |
| `/m/investorhub` | `#/tlps/investor-hub` | Local planning registers; no membership activation or financial execution |
| `/m/projects/:projectId/os/film` | Film area through workplace directory | No equivalent project-scoped canonical URL in inspected TLPS dispatch |
| `/m/projects` | Existing local project/workflow surfaces | No canonical `/m/projects` list/detail route family established |
| `/m/support/tickets/:ticketId` | No equivalent TLPS API | Requires ticket persistence, access rules and detail UI |
| `/m/billing/subscription` | No equivalent TLPS subscription API | Requires provider lifecycle, entitlements and account/workspace billing integration |

Current dispatch also falls back to the TLPS public home for unrecognized `/tlps/...` paths. A rendered page at a guessed URL therefore does not prove the named feature is implemented. Add explicit not-found handling and a route registry before using page-load checks to measure coverage.

## Important gaps and decisions

1. Decide whether `/m` is a dedicated mobile application, a responsive alias, or the future canonical route system. Do not blindly rename `/tlps` routes without compatibility redirects and project/workspace scope definitions.
2. Separate route presence, frame rendering, working interaction, persistence, authorization and external-service readiness. A generic card, a registered workplace ID, or a valid database table is not evidence of the next layer.
3. Resolve role vocabulary: proposed Creator/Distributor are not exact current role choices, while current agency/executive-producer/line-producer/department-lead and other roles extend the proposed ten-role navigation. Role switching must not grant server authority.
4. Align project/account/workspace terminology with the grouped-schema comparison. Current project profile and workflow workplace records are not personal profiles or tenant workspaces.
5. Keep membership/platform fees separate from non-binding investment interests, capital commitments and escrow. The proposed route contract does not establish a complete custody/ledger/release system; current financial execution remains disabled.
6. Treat the 45 planned detail/action routes as explicit backlog, not completed screens. The additional 130 generic routes also need interaction and API qualification.
7. Implement required common states alongside each real data flow, especially forbidden/not-found/conflict/offline. Do not imply offline write queuing without a queue and reconciliation design.

## Recommended next slice

Adopt a single route registry with path, screen, scope, required permission, data service and coverage status. Map the current TLPS entry points into that registry without losing existing URLs. Then implement project list/detail and onboarding/profile terminology against the prepared API, add UI conflict/not-found/access states, and qualify one complete project/production flow before expanding the 45 planned routes. Produce per-route acceptance evidence rather than a completion percentage based on route or table counts.

The source documents and application behavior were not modified. Only this comparison report was added. The earlier backend test results remain separate evidence; this comparison did not rerun the full test suite or validate all mobile frames in a browser.
