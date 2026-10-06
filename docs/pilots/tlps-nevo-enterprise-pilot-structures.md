# TLPS and NEVO enterprise pilot structures

**Status: proposed pilot design — not pilot execution or acceptance evidence.**

This document defines two complementary application pilots for evaluating MAATAA in real product contexts. TLPS is the user-selected enterprise pilot. NEVO Events is the structurally different event and commercial operations candidate requested for the multi-product milestone. The live surfaces at `tlps.in` and `nevoevents.in`, their production tenants, and any customer commitments were not verified while preparing this plan. Product owners must map these structures to the intended live applications before onboarding real users or data.

## Decision this pilot pair is designed to answer

Can application teams adopt MAATAA's published UI contracts in distinct, realistic workflows while keeping domain data, authorization, and decisions under each application's authority? The pair deliberately spans:

| Dimension | TLPS | NEVO Events |
| --- | --- | --- |
| Core job | Plan and review a production | Move an event from brief and commercial offer into operations and closeout |
| Primary workflow shape | One production plan with a review and evidence handover | Tenant-scoped events with customer, quote, booking, operational, guest, and financial records |
| Primary roles in the pilot | Producer; owner reviewer | Organizer/operator; customer; finance reviewer; optional venue/vendor and event-operations participants |
| MAATAA stress points | Long-form planning, budgets, timed schedules, review states, evidence metadata, export | Dense operational workspace, cross-role views, table/form composition, responsive event-day use, stable shared component contracts |
| Data and authority | Current demo is browser-local; production authority is an unresolved integration requirement | NEVO application server and tenant boundary own records and transitions; public planner is a local draft until authenticated handoff |

The pair must be accepted as two real application integrations, not as two demo routes. The current local TLPS preview and NEVO automated test fixtures are useful implementation references; neither alone proves an enterprise pilot.

## Shared operating model

### Participants and accountability

| Responsibility | Named or proposed owner | Required action/evidence |
| --- | --- | --- |
| MAATAA release approval and private security reporting | Hemant Kumar Dixit (user-designated) | Approve release evidence; confirm a private reporting channel and response commitments. Designation is not approval, and the channel is not yet recorded. |
| TLPS pilot product owner | To be named by TLPS | Confirm the production use case, real pilot tenant, participant list, data classification, and outcome thresholds. |
| NEVO pilot product owner | To be named by NEVO | Confirm the event lifecycle slice, tenant, permitted payment/provider mode, participants, and outcome thresholds. |
| Application integration lead | One per application, to be named | Pin MAATAA version, record integration commit, own app-specific adapters and regressions. |
| Pilot operator | One per application, to be named | Run representative tasks, report friction and operational failures, review exports/handoffs. |
| Security/privacy reviewer | To be named per application | Review data minimization, access, retention, incident route, and test-data handling before real personal or commercial data is used. |

### Pilot stages and gates

Run these stages separately for each application. Dates are intentionally not assigned until the application owners and environments are confirmed.

1. **Charter and baseline.** Name the actual application owner, tenant/environment, participants, workflow slice, data classes, target devices, supported browser versions, existing completion time/error rate, and measurable success thresholds. Record all unavailable integrations as out of scope. Gate: signed pilot charter and data-handling review.
2. **Integration spike.** Pin the exact MAATAA package version and application commit. Map the selected screens to MAATAA exports and canonical IDs. Keep application state, API calls, authorization, and workflow rules in the host application. Gate: reproducible clean install/build and a reviewed component-to-screen map.
3. **Sandbox workflow.** Execute synthetic records end to end at desktop and phone sizes. Test loading, empty, validation, permission-denied, server-error, and retry states. Exercise keyboard navigation and assistive-technology review. Gate: no unresolved critical workflow, accessibility, data-boundary, or stability defect.
4. **Controlled user pilot.** Only after owner approval, use a named, access-controlled tenant and minimum necessary real records. Collect task timings and failures without copying sensitive payloads into MAATAA logs or public demo assets. Gate: enough completed tasks to assess the pre-agreed thresholds; record sample size and exclusions.
5. **Evidence review.** Re-run install/upgrade and workflow checks on the final integrated commit. Application owners review outcomes; the MAATAA release owner records accept, reject, or follow-up with rationale. Gate: evidence pack tied to exact commits, version, environment, and test dates.

### Common MAATAA integration contract

- Use MAATAA for presentation primitives and composition: agreed controls, forms, cards, tables, badges, layout, device adaptation, and canonical component identifiers.
- Keep event/production models, validation rules, state transitions, network clients, identity, tenant checks, permissions, audit authority, financial calculations, evidence retention, and provider integrations in the host application.
- Bind controls to host-owned state through explicit adapters. A rendered `approved`, `paid`, `available`, or `complete` label must come from an authoritative host response; styling or a client-side toggle cannot assert it.
- Do not put personal, financial, contract, security-report, or production evidence payloads in MAATAA telemetry, screenshots, recordings, fixtures, or support bundles. Use synthetic or redacted examples unless the data owner approves otherwise.
- Record direct package imports and extension points. Any fork or copied component must be declared and counted; it cannot be described as extension without forks.
- Keep each pilot's test records and identities isolated. Never use a live payment, send a real invitation, create an actual booking, or contact a provider in a demonstration without explicit application-owner authorization and an approved provider setup.

### Measures and evidence template

Set numeric targets during chartering, before the integrated pilot begins. Do not retroactively choose thresholds to fit results.

| Measure | How to report it | Required evidence |
| --- | --- | --- |
| Install and upgrade | Clean-install success; upgrade success from the agreed previous version; time and manual interventions | Lockfile/package version, command output, environment, resulting app commit |
| Extension without forks | Count of host adapters/overrides and copied or forked MAATAA files | Import map, diff or dependency inspection, owner review |
| Workflow completion | Completed representative tasks / attempted tasks; median and range of task time; validation/recovery failures | Task script, anonymized event log, participant count and exclusions |
| Planner determinism (where used) | Same input and pinned environment produce the same plan or an explicitly bounded set of outcomes | Input fixture hash, planner/config version, repeated-run output hashes, stated non-determinism bounds |
| Responsive/device behavior | Critical tasks completed at agreed desktop and phone viewports/devices; overflow or blocked controls | Browser/device matrix, screenshots or traces with synthetic/redacted data |
| Accessibility | Automated findings plus keyboard, focus, zoom, and manual assistive-technology outcomes | Tool/version and scope, defect list, reviewer and disposition; automated scans alone are not conformance |
| Registry/API stability | Resolved component IDs and package exports before/after upgrade; breaking-change observations | Versioned manifest/API diff and compatibility result |
| Runtime performance | Measured navigation-to-interaction and agreed rendering/input metrics on named equipment/network | Raw run artifacts, trial count, device/browser, thresholds set in advance |
| Developer experience | Integration hours, workaround count, time to first workflow, and structured developer feedback | Named role (or anonymized role), method, raw count, issue links |
| Security and data boundaries | Tenant/role negative tests, sensitive-data paths reviewed, incident/reporting route exercised with a non-sensitive test | App security evidence, reviewer, exact commit, approved test procedure; no real vulnerability report content in the pilot report |

Every measure starts as **NOT_RUN**. Record **PASS**, **FAIL**, or **NOT_RUN** with a direct evidence path and owner. Do not treat code inventory, existing unit tests, generated screenshots, or this plan as pilot outcomes.

## Pilot A — TLPS production planning and evidence handover

### Purpose and hypothesis

Validate that MAATAA can support a real production team's planning/review interface without owning production authority. The current evidence-backed baseline is the local MAATAA flow: intake, budget lines, crew and location notes, timed call sheet, owner-preview review, rehearsal checklist, evidence metadata, audit display, and JSON handover. The pilot should test whether that composition is useful to an actual TLPS team and what application-owned services are required beyond the local demo.

**Hypothesis to test:** an authorized producer can prepare and revise a bounded production plan, a distinct owner can review it, and the team can hand over a traceable plan/evidence index with fewer coordination failures than its agreed baseline. No result is assumed.

### Participants and permissions to design

| Role | Pilot access | Responsibilities and limits |
| --- | --- | --- |
| Producer / line producer | Create and edit the assigned production while in draft/revision | Owns project details, proposed budget, crew/location notes, schedule and rehearsal tasks. Cannot self-approve if separation of duties is required. |
| Owner reviewer / executive producer | Read submitted version; approve or return with a note in the host system | Approval is an authoritative host-side decision only after authenticated identity and server authorization are integrated. The current preview role switch is not sufficient. |
| Crew or department representative | Read only the approved, relevant schedule/tasks; optionally report a rehearsal status if in pilot scope | Access should be limited to assigned production and minimum necessary fields. Do not expose other crew or finance information by default. |
| Evidence reviewer | Inspect permitted evidence metadata and provenance | The pilot must decide whether reviewers can access files. Current demo retains metadata/digests only, not uploaded file bytes. |
| Tenant/application administrator | Invite/deactivate pilot users and configure access | Must be a real application-admin role with auditable server-side actions; not a client-side demo selector. |

The real pilot owner and participant identities are TBD. Hemant Kumar Dixit is the MAATAA release owner, not presumed to be the TLPS production approver.

### Golden workflow and stage gates

| Stage | User task | Gate and expected host-owned record |
| --- | --- | --- |
| 1. Intake | Create a named production with city, type, date, working title and budget ceiling | Required fields and valid date/currency; host generates stable production ID and records creator/tenant |
| 2. Budget | Add categorized estimates and revise amounts | Totals computed by host rules; submission blocked over ceiling or on invalid entries; every change attributable |
| 3. Crew and locations | Assign roles/responsibilities; add location planning notes and constraints | Assignment and notes are access-controlled; venue permission, availability, or clearance is never inferred |
| 4. Schedule | Order timed scenes/call-sheet entries and review conflicts | Validate ordering, missing duration, and overlaps according to owner-approved rule set; export is tied to a specific version |
| 5. Review | Producer submits a version; owner reviews, approves with note, or returns it | Immutable submitted snapshot/version; approval/return actor, time and note recorded server-side; returned plan reopens as a new revision |
| 6. Rehearsal | Assigned users work through setup/rehearsal/wrap checklist | Task completion shows who/when/source; checklist status does not mean the shoot occurred or is safe/legally cleared |
| 7. Evidence index | Attach or reference the agreed planning and rehearsal evidence | Establish allowed file storage, access, retention, size/type restrictions and audit behavior before real files. If only metadata/hash is used, say so clearly |
| 8. Handover and closeout | Export the approved plan, checklist state, evidence index and audit summary | Versioned export matches the reviewed revision, is reproducible, and includes explicit unresolved items; local JSON alone is not a durable authoritative archive |

### TLPS data and integration map

**Host-owned entities:** tenant/production; budget item; crew assignment; location note; schedule item; review/version; rehearsal task; evidence reference; audit event; handover export. Use stable host IDs and explicit relationships. Decide whether each record is immutable, versioned, or editable before building the adapter.

**MAATAA surfaces to evaluate:** accessible inputs/selects, cards, badges, structured tables, form validation presentation, responsive shell/composition, canonical IDs, and device previews. Component selection should follow the host's approved design mapping; this plan does not freeze an API contract.

**Required host services before a real operational pilot:** authenticated identity; server-enforced tenant and role checks; durable versioned persistence; conflict-safe edits; approval transition service; authoritative audit events; approved evidence file or reference service; export generation; retention/deletion behavior; backup/restore plan. The present browser-local TLPS workflow does not provide these controls.

**Out of scope unless separately authorized:** bookings, payment collection, legal/permit clearance, venue availability, confirmed shoot completion, production readiness claims, investor/marketplace modules, or unverified AI recommendations.

### TLPS acceptance evidence

- A real TLPS owner signs the charter and identifies the production and participants.
- A producer completes a representative plan and an independent reviewer performs approve and return cases.
- Server-side authorization tests show that an unauthorized user cannot read or mutate another tenant's production or perform a forbidden transition.
- Export/version and audit comparisons show that the handover reflects the exact reviewed plan; tampered or stale approval attempts fail closed.
- Agreed mobile and desktop tasks complete without critical layout, keyboard, or focus failures; manual review remains recorded separately from automated scans.
- Upgrade, extension, registry, performance, developer-experience, and deterministic-planning measures are captured using the common template.
- Data owner reviews storage, evidence retention, deletion, backup, and incident/reporting route.
- All criteria are marked with direct evidence and explicit owner disposition. Approval is not presumed from a successful demo.

## Pilot B — NEVO Events event lifecycle and operations

### Purpose and hypothesis

Validate MAATAA integration in a multi-tenant event application that crosses public intake, authenticated operations, commercial review, and event delivery. Local NEVO source describes a public browser-local event brief handed off to an authenticated tenant-scoped event workspace, followed by quote/booking, guarded contract/payment paths, production, guests, and operational closeout. The public planner itself is not tenant-authoritative; no UI state proves availability, provider delivery, payment, signature, or fulfillment.

**Hypothesis to test:** an operator can move one controlled event through a clearly bounded brief-to-operations workflow while the customer sees only the intended offer/acceptance surface and tenant boundaries remain intact. The pilot must choose whether to stop at a test booking handoff or include a sandbox payment path. No live charge is part of the default plan.

### Participants and access model to verify

| Role | Pilot access | Responsibilities and limits |
| --- | --- | --- |
| Event organizer / producer | Manage an event within their tenant | Owns event brief, operational plan, assigned tasks, and approved communications. Must not see another tenant's events. |
| Customer / event requester | Anonymous local brief before sign-in; then only a specific, intended offer or event view | Public brief remains device-local until explicit authenticated handoff. Secure offer link is scoped, expiring/revocable, and exposes only approved fields. |
| Finance reviewer | Review commercial snapshot, invoice/receipt state, refunds or settlement evidence if in scope | Can read/perform finance actions only through host-side permission checks. Tax/legal facts must be verified; do not fabricate registrations or compliant-document claims. |
| Venue/vendor participant | Only the assigned listing, quote, booking, availability request, or operational details needed for their work | Participation and data sharing are opt-in and bounded; no marketplace listing implies availability or a confirmed booking. |
| Crew / event operations | Assigned run-of-show, tasks, and necessary guest/venue instructions | Least privilege; no access to billing/customer legal data unless specifically required. |
| Guest / gate operator | Guest's permitted invitation/ticket view, or check-in action for assigned event | Verify invitation delivery vs request state; check-in and offline reconciliation require separate accepted evidence. |
| Tenant administrator | Manage users, roles and tenant setup | Role changes, invitations, and deactivation must be server-authoritative and auditable. |

Confirm exact NEVO role names, authorization scopes, and participant identities against the selected tenant before the pilot; these role labels describe the design and are not a claim of current production entitlement configuration.

### Golden workflow and stage gates

| Stage | User task | Gate and expected host-owned record |
| --- | --- | --- |
| 1. Public brief | Requester fills the event planner and saves a device-local draft | No tenant event mutation before authenticated handoff; explain local draft, clear/remove behavior, and privacy to user |
| 2. Authenticated handoff | Operator signs in and creates the event in the intended tenant | Server creates one tenant-scoped Event; retries do not duplicate; actor and tenant are recorded |
| 3. Event plan | Organizer adds the agreed schedule, budget, documents and operational tasks | Validate required fields and permissions; display loading, empty, conflict and failure states |
| 4. Commercial offer | Operator builds quote lines and a frozen commercial snapshot, then issues a scoped customer offer | Totals are server-calculated; supplier/customer legal facts are verified; offer can be revoked/expired; issued state freezes agreed fields |
| 5. Customer decision | Customer reviews the offer and accepts or declines | Acceptance creates a booking/hold only according to the implemented rule; clearly distinguish hold/request from confirmed inventory or provider availability |
| 6. Contract/payment (optional sub-pilot) | Record document version and acceptance evidence; use deterministic sandbox payment/webhook only if owners approve | Label acceptance evidence accurately; sandbox settlement is not live provider proof. Verify idempotency, amount/currency, refund path and non-GST/GST claims against current verified legal setup |
| 7. Production handoff | Freeze the agreed commercial state and pass scope to operations | Snapshot binds to exact quote/booking version; operations receives only needed items; changes after freeze require controlled revision |
| 8. Event operations | Organizer/crew uses schedule, task list, guests/invitations/tickets/check-in as selected in the charter | Each path is separately opted into. Invitation SENT is not inbox receipt; ticket issuance is not gate acceptance; check-in authority is authenticated |
| 9. Closeout | Review event outcomes, settlements, changes and evidence | Separate actual completion from planned/recorded completion; append audit evidence and export a scoped closeout |

For a bounded first pilot, select one event and two lanes: **brief → tenant event → operator plan**, plus **draft quote → customer offer → acceptance/booking hold → production handoff**. Add payment, contract acceptance, guest ticketing, live vendor coordination, and offline gate operations only as separately approved sub-pilots; each carries its own environment and evidence gates.

### NEVO data and integration map

**Host-owned records:** organization/tenant; user and role; event; public brief draft; event schedule/task; listing or supplier reference; quote and line items; commercial snapshot; customer offer token/access; booking/hold; contract/document version and acceptance evidence; payment intent/webhook/invoice where enabled; production handoff; guest/invitation/ticket/check-in; audit event; closeout evidence. Keep IDs, tenant relationship, lifecycle state, and authority in NEVO services.

**MAATAA surfaces to evaluate:** responsive application shell and navigation; forms and field errors; tables for event/quote/guest queues; status badges and alerts; review/confirmation dialogs; accessible menus; layout composition at desktop and phone widths; published export/canonical component IDs. Keep the public planner's anonymous state and authenticated workspace visually distinct.

**Required host-side controls:** verified session and tenant context on every mutation; server-side role/permission checks; tenant-scoped queries; idempotent creation/transitions/webhooks; quote and commercial snapshot freezing; offer-token expiry/revocation and rate controls; least-privilege guest/finance access; audit history; data retention/deletion; verified provider adapters and webhook signatures for any live payment; reconciliation and recovery procedure. Existing test fixtures and local stub settlement are not evidence of a live payment provider.

**Out of scope by default:** live payment collection/refund, tax-compliance claims, legal e-signature claims, confirmed third-party inventory, actual vendor outreach, real guest invitations, live ticket sales, offline gate reconciliation, or claims that an event has been delivered. The charter can add one of these only with named operational/legal/security owners and separate acceptance evidence.

### NEVO acceptance evidence

- The NEVO owner names the pilot tenant, event, permitted scope, participant roles, and data retention rules.
- The public brief creates no tenant mutation until the authenticated handoff; authenticated creation is tenant-scoped and retry-safe.
- A complete quote/offer/acceptance path is tested with synthetic or approved data; frozen values and stale-write rejection are verified.
- Negative authorization tests cover cross-tenant reads/writes and customer-token scope; results identify exact commit and disposable test database/environment.
- Production handoff matches the accepted quote/booking snapshot. If payments are excluded, mark payment measures NOT_RUN. If included, run only against an explicitly approved sandbox unless live settlement is separately authorized.
- Guest/operations paths are either explicitly tested or explicitly out of scope. Delivery, check-in, or settlement claims are limited to the evidence actually produced.
- Responsive, accessibility, package upgrade, extension, component registry, performance, and developer-experience results are recorded per the shared measures.
- Finance/legal/security owners review applicable commercial documents, data exposure, event closeout, and incident route.

## Joint evidence pack and decision record

Create one folder per pilot run, with no raw personal, payment, secret, or vulnerability-report data in the shared MAATAA evidence area. Include:

1. Approved charter, application owner, tenant/environment identifier (non-secret), user-role matrix, data classes, scope and predeclared thresholds.
2. MAATAA package version and lockfile hash; application Git commit; configuration/version references; browser/device matrix; run timestamps.
3. Integration map, extension/fork inventory, install and upgrade output, and canonical registry/API compatibility diff.
4. Task scripts, anonymized task outcomes, sample counts, timings, defects, and all excluded observations with reasons.
5. Accessibility, responsive, security-boundary, performance, planner determinism, and developer-experience artifacts, each with coverage limitations.
6. Risk register with severity, owner, due condition and pilot disposition; no issue is hidden by aggregate pass rate.
7. App owner acceptance or rejection and Hemant Kumar Dixit's release evidence disposition, with date and rationale. The owner must separately establish the private security channel and response commitments.

### Joint decision rules

- A pilot is **accepted** only when its named application owner approves the agreed outcomes and evidence is tied to the exact integrated commit and environment.
- A blocked measure stays **NOT_RUN**; a failed criterion stays **FAIL** until fixed and rerun. A waiver names the risk owner, scope, expiry/review point, and release-owner disposition.
- Both applications must demonstrate real integration and measured upgrade/integration outcomes before they count toward the structurally different pilot milestone. A local preview, automated fixture, product snapshot, or generated video does not count by itself.
- Beta 2 readiness still requires the release roadmap's broader accepted pilot results, deterministic bounded planning, developer-experience and performance evidence. This document supplies a design, not that evidence.

## Source basis and limits

The TLPS workflow stages and persistence limits are based on [the TLPS workflow](../engineering/tlps-workflow.md), [the product record](../../examples/redux-demo/PRODUCT.md), and [the public surfaces](../engineering/tlps-public-surfaces.md). NEVO's stage boundaries are based on [its core event lifecycle](/Users/vesahe/Documents/Repos/nevo-event-os-3/docs/flows/core-event-lifecycle.md), [guest and ticket lifecycle](/Users/vesahe/Documents/Repos/nevo-event-os-3/docs/flows/guest-ticketing.md), and local Playwright specs [public planner](/Users/vesahe/Documents/Repos/nevo-event-os-3/apps/web/e2e/public-event-wizard.spec.ts) and [paid pilot](/Users/vesahe/Documents/Repos/nevo-event-os-3/apps/web/e2e/paid-pilot.spec.ts) in the separate NEVO workspace. Those specs describe local automated paths and explicitly bound what they prove. They do not establish that `tlps.in` or `nevoevents.in` currently exposes these workflows, that either domain is production-ready, or that users have accepted a pilot.
