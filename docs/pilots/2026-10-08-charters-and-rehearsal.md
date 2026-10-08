# TLPS and NEVO pilot charters and rehearsal record

**Prepared:** 2026-10-08
**Status:** TLPS synthetic pilot plan approved in chat; local rehearsal passed; controlled real-user pilot is **AUTHORIZED BUT NOT_STARTED**. NEVO remains **PROPOSED**.
**Evidence class:** working-tree browser-test evidence only. This is not production, customer, security, or acceptance evidence.

This document turns the proposed pilot structures into bounded charters and records the local rehearsal run. Each application owner must ratify scope, participants, data handling, measures, and environment before a controlled user pilot starts. Do not use real personal, production, booking, payment, contract, or guest data in the local rehearsals.

## Shared pilot rules

- MAATAA supplies presentation components and composition. The host application remains authoritative for identity, tenant boundaries, permissions, validation, records, decisions, audit history, integrations, and exports.
- The pilot begins in an isolated non-production tenant with synthetic or specifically approved minimum data. No real payment, booking, invitation, provider dispatch, contract signature, production approval, or external communication is part of this charter by default.
- Record the exact host commit, MAATAA package/version, environment, browser/device, participant role, task outcome, timing, failures, and evidence location. Redact payloads and personal identifiers.
- TLPS role cohort, synthetic-only data plan, and numeric thresholds below were approved by the user in this thread on 2026-10-08. This is chat authorization, not a signed application-system approval. Named participant roster and host tenant provisioning are still required before participant sessions. NEVO measures remain `PENDING_OWNER`.
- Stop immediately for cross-tenant access, an unauthorized state transition, sensitive data in client logs or shared artifacts, an unintended external side effect, or a severity-1 workflow failure. Preserve redacted evidence and route security reports through the approved private channel.

## TLPS production-planning pilot

| Charter field | Approved value / current state |
| --- | --- |
| Product | TLPS production planning and evidence handover |
| Operating / pilot authority | Hemant Kumar Dixit — user-designated and confirmed for this pilot by the user's instruction in this thread |
| MAATAA release/security owner | Hemant Kumar Dixit, as recorded in the release roadmap; private reporting channel and response commitments still need configuration |
| Application integration lead / pilot operator / privacy reviewer | `TBD — names and contact details required before participant sessions` |
| Test tenant | `TLPS-PILOT-SANDBOX-01` is approved as the isolated non-production tenant designation. It is **not yet provisioned or verified** in the TLPS host. The local MAATAA browser context is only a synthetic rehearsal space. |
| Participants | Approved role cohort: 2 producers, 1 independent owner/reviewer, and 2 assigned crew/evidence reviewers (5 participants total). Actual people must be named and scheduled by TLPS before the controlled pilot. |
| Scope | Create a production plan; add budget lines, crew/location notes and timed call-sheet entries; submit a local review; return/revise; exercise rehearsal checklist; inspect evidence metadata and export a proposed handover |
| Out of scope | Real approval, production authorization, confirmed location/clearance, actual shoot completion, real evidence-file storage, payment, bookings, provider or crew notifications |
| Data plan | Approved synthetic-only data; no personal, production-confidential, financial, contract, or real evidence-file content. Test records are isolated, redacted from telemetry/screenshots, and deleted after the test window. Any need for real data requires a new privacy approval. |
| Success measures | Approved thresholds below. Host authorization, audit, and export-fidelity measures cannot pass until host integration exists. |
| Pilot acceptance | Not delegated by this charter; owner must disposition the exact integrated commit and evidence pack after the participant run. |

### TLPS participant task script

1. Producer creates a new draft and enters only owner-approved fields.
2. Producer adds one budget line, one crew assignment, one location note, and at least two timed call-sheet entries.
3. Producer attempts an incomplete submission; it must be blocked with actionable validation.
4. Producer submits a complete version to the host-owned review service. The local rehearsal may only show a clearly simulated state.
5. Reviewer returns the version with a note; producer revises and resubmits. Verify the prior version remains inspectable.
6. Assigned reviewer checks rehearsal/evidence metadata, then downloads and compares the proposed handover to the reviewed version.
7. Repeat at an agreed phone viewport and desktop viewport; record keyboard-only task completion and manual assistive-technology review separately.

### TLPS approved success measures and remaining evidence

| Measure | Proposed collection | Status |
| --- | --- | --- |
| Workflow completion | At least 10 scripted task attempts across the 5 approved participants; at least 90% completed without facilitator intervention, and at least 4 of 5 complete the end-to-end producer/reviewer/handover path | `NOT_RUN — named participants and host tenant required` |
| Critical safety and security | Zero cross-tenant disclosure, unauthorized state transition, sensitive-data spill, or unintended external side effect; any occurrence stops the pilot | `NOT_RUN — host authorization tests required` |
| Review separation | 100% of review decisions made by a distinct reviewer identity; every decision attributable to actor, time, and version | `NOT_RUN — host identity/audit required` |
| Handover fidelity | 100% of exported plan fields match the exact reviewed version; stale/tampered snapshot is rejected | `NOT_RUN — authoritative host export required` |
| Responsive/accessibility | All critical tasks usable at agreed desktop and phone viewports; no critical keyboard/focus blocker. Record manual screen-reader review separately; no conformance claim from automation alone. | `NOT_RUN — participant and manual review required` |
| Task time and recovery | Record per-task time, retries, and facilitator interventions for all attempts; compare with pre-pilot current-process baseline. No improvement claim without a baseline. | `NOT_RUN — baseline and participants required` |
| Integration and upgrade | Clean install and upgrade from the owner-selected baseline, exact MAATAA version, adapter/fork count | `NOT_RUN — integrated host commit required` |

## NEVO Events pilot

| Charter field | Proposed value / current state |
| --- | --- |
| Product | NEVO Events bounded event brief-to-operations workflow |
| Pilot owner | `TBD — NEVO product/application owner must be named` |
| Integration lead / pilot operator / privacy reviewer | `TBD — owner to name` |
| Environment and tenant | `TBD — isolated non-production tenant required`; no live NEVO tenant was exercised by this run |
| Participants | `TBD — organizer/operator and customer reviewer; add finance or operations roles only if owner approves that scope` |
| Scope | Public event brief; authenticated host handoff; tenant event plan; draft commercial offer; customer decision; operational/run-of-show view. Keep request, acceptance, hold, and confirmed booking as distinct states. |
| Out of scope | Live inventory claims, actual booking/hold, contract signature, payment/refund, invitation or provider dispatch, guest check-in, production execution |
| Data | Synthetic records for rehearsal. Real data requires an approved tenant, privacy/data classification, retention and access plan |
| Pilot acceptance | `PENDING_OWNER`; NEVO owner signs the exact integrated commit and evidence pack |

### NEVO participant task script

1. Requester creates and edits a public event brief. Confirm the browser-local draft is disclosed and no tenant mutation occurs before authenticated handoff.
2. Organizer signs in to the approved test tenant and hands the brief to the host. Retry once and verify no duplicate event is created.
3. Organizer builds an event plan and a draft commercial offer. Verify currency, line items, totals, expiry, and version behavior against owner-approved rules.
4. Customer reviews the offer and accepts or declines. Verify the result records actor, time, and exact offer version, without implying a booking or inventory hold.
5. If a hold request is included, exercise it as a separate host-authorized state. Do not contact a venue/vendor or create a real hold.
6. Operator opens the run-of-show and closeout view. Verify role-scoped visibility and record differences between requested, sent, delivered, and completed states.
7. Repeat the agreed critical tasks at desktop and phone sizes; conduct keyboard and manual assistive-technology review separately.

### NEVO proposed measures — all pending owner ratification

| Measure | Proposed collection | Status |
| --- | --- | --- |
| Workflow completion and task time | Completed / attempted tasks; per-task duration and recovery errors | `NOT_RUN — participant pilot` |
| Tenant isolation and authorization | Cross-tenant reads/writes, unauthorized transitions, and retry/idempotency cases | `NOT_RUN — host environment and role matrix required` |
| Offer and decision correctness | Currency/line math, frozen version, expiry, actor/time, and non-booking semantics | `NOT_RUN — owner-approved contract required` |
| Operational handoff | Requested/sent/delivered/completed states and audit trail | `NOT_RUN — host integration required` |
| Responsive/accessibility | Agreed devices; keyboard, zoom, screen reader, focus, overflow and blocked-control results | `NOT_RUN — manual review required` |
| Integration and upgrade | Clean install, pinned MAATAA version, update from agreed prior version, adapter/fork count | `NOT_RUN — integrated host commit required` |

## Local rehearsal run — 2026-10-08

These runs exercise application code with synthetic/local fixtures. They establish that the tested UI journeys work in this checkout; they do not satisfy either real-user pilot charter.

| Rehearsal | Command | Result | Boundary |
| --- | --- | --- | --- |
| TLPS workflow and incomplete-submission gate | `pnpm exec playwright test tests/e2e/tlps-workflow.spec.ts tests/e2e/next-consumer.spec.ts` | **PASS — 18/18** across Chromium, Firefox and WebKit, desktop and mobile-sized projects. The TLPS full workflow, incomplete-plan gate, and packaged Next App Router NEVO planning slice passed. | TLPS state is local/demo state. The NEVO check is the packaged consumer planning slice, not the NEVO host application, tenant authorization, or production service. |
| TLPS workflow after charter authorization | `pnpm exec playwright test tests/e2e/tlps-workflow.spec.ts` | **PASS — 12/12** across Chromium, Firefox and WebKit, desktop and mobile-sized projects. Full local workflow and incomplete-submission gate passed. | Confirms the local synthetic rehearsal only. The test does not create/use `TLPS-PILOT-SANDBOX-01`, authenticate real roles, or execute a TLPS host API. |
| Source revision | `a62781afdf6acc71d6c0a088aebdd6a4d5d7cfd8` | The working tree contained uncommitted TypeScript fixes and charter updates during the run. | Not an exact clean-commit release or pilot result. |

The browser commands exited successfully. They did not recruit or observe a human participant and did not use live TLPS or NEVO accounts, tenants, APIs, databases, providers, or records. All user, integration, host-security, acceptance, and real-device measures remain `NOT_RUN`.

## Entry gate and next actions

1. TLPS owner (Hemant Kumar Dixit) has confirmed operating authority and approved the scope, synthetic-only data plan, role cohort, and measures above. Provision and verify `TLPS-PILOT-SANDBOX-01`; name/schedule the five participants and integration/operator/privacy contacts.
2. NEVO owner names an accountable product/application owner and the integration/operator/privacy roles; confirms a test tenant and exact allowed workflow transitions.
3. Each application owner signs its charter and data-handling plan before any participant uses real records.
4. Application teams integrate the shared `@maataa/ui` package into their canonical repositories, pin exact package and host commits, and pass clean-install/upgrade and host authorization checks.
5. Run the task scripts with approved participants. Capture redacted timings, outcomes, defects, browser/device evidence, and owner dispositions in an append-only run record.
6. Keep the pilot status `IN_PROGRESS` until the pre-agreed sample and measures are complete; then mark `ACCEPTED`, `REJECTED`, or `FOLLOW_UP` only with a named application owner's dated decision.

**Current disposition:** TLPS has user authorization for a controlled synthetic-data pilot, but human sessions are not started because the host test tenant is not provisioned and participant identities are not named. The local browser workflow rehearsal is complete. NEVO remains a proposed charter. No outbound invitations or external changes were made.
