# TLPS release roadmap

Planning baseline: 17 October 2026. This roadmap is a proposed delivery sequence, not a release approval or a promise that the entire 169-table/228-route blueprint ships in the first release. No calendar deadline or team capacity has been agreed.

Current execution evidence: [R0–R3 status](R0-R3-STATUS.md). Connected pilot is locally implemented/tested; Cloudflare apex cutover requires explicit approval because the current record serves a NEVO tunnel.

## Release strategy

Ship a connected production-planning pilot first. Expand into team operations, marketplaces and commercial services after the underlying identity, authorization and data lifecycle are proven. Keep membership fees, investment interests, binding capital commitments and escrow as separate capabilities with separate release gates.

Current baseline: committed local UI/workflows/themes/support/artwork; a current uncommitted SQLite/API foundation with 95 recorded passing tests; existing screens still largely browser-local; proposed normalized schema and mobile route contract awaiting reconciliation. Current alpha package version is a MAATAA repository version, not an approved independent TLPS release identifier.

## Milestones

| Phase | Release outcome | Main deliverables | Exit gate |
|---|---|---|---|
| R0 — Contract and source baseline | One reviewable TLPS scope | Reconcile schema/routes; define project, person profile and tenant/workflow workspace vocabulary; choose /tlps and /m routing strategy; map eight UI stages to lifecycle; identify release owner and scoped source changes | Written scope/acceptance checklist; reviewed schema/route mappings; isolated changes with unrelated work preserved |
| R1 — Connected internal alpha | Real saved project-planning flow | Bootstrap/admin provisioning, project list/detail, onboarding, budget/crew/location/schedule/evidence metadata, audit/export; connect typed client to screens; explicit not-found and version-conflict UI | End-to-end create→reload→edit→conflict→export works through authenticated API; no silent fallback to local-only persistence; authorization and restore tests pass |
| R2 — Team production pilot | Controlled multi-user project operations | Account/session/organization model appropriate to deployment, memberships and finer permissions, owner/reviewer rules, tasks/milestones, controlled stage transitions and review decisions, file storage/versioning if included | Cross-project/role denial tests, concurrent editing, review traceability, file/access tests where applicable, accessible mobile pilot acceptance |
| R3 — Hosted pilot release | Operable supported service | Hosting choice, private secrets, TLS/domain configuration, migrations and verified restore, monitoring/request IDs, retention/deletion policy, support ticket backend and incident/runbook ownership | Staging acceptance on exact candidate; clean-install/upgrade/restore checks; agreed security/device/accessibility acceptance; signed pilot go/no-go |
| R4 — Paid access and memberships | Approved purchases and recurring entitlements | Approved SKUs/prices and INR settlement policy; Razorpay test then live configuration; webhook/reconciliation/refund handling; subscription plan/mandate lifecycle; entitlements and support/reconciliation tools | Provider sandbox acceptance then live activation approval; duplicate/replayed/failed/late payment tests; access granted only from trusted verified state; no client-controlled paid status |
| R5 — Specialized OS and mobile expansion | Deeper domain workflows | Prioritize Film first, then selected Event/Campaign/Exhibition/Wedding/Location slices; canonical mobile routes and shell; specialized frames replacing generic cards | Each slice has real model/API/UI/permissions and required-state tests; no route-count-only completion claim |
| R6 — Investor and marketplace expansion | Governed diligence and deal workflows | Investor profiles/circles/diligence/deal rooms; non-binding interest lifecycle; applications/offers/bookings/distribution/rights selected by demand | Scope-specific permissions, version/evidence traceability, user acceptance; memberships remain separate from investment commitments |
| R7 — Capital, escrow and wallet services | Separately approved financial capabilities | Explicit commitment/ledger/custody/provider model, funding/release/refund/dispute authority; Chitragupta network/wallet/signing design; additional payment adapters only when selected | Dedicated domain/security/provider review and acceptance; reconciliation and recovery evidence; no implicit activation through earlier membership releases |

## Dependencies and parallel work

R0 → R1 → R2 → R3 is the recommended pilot path. Hosting research and operational planning can run during R1/R2, but hosted release still needs the R3 gate. Visual polish, documentation and support content can progress alongside integration. R4 can follow a qualified hosted foundation; basic memberships do not require capital custody. R5 and R6 should be prioritized by pilot feedback rather than all being prerequisites to first release. R7 is an independent later scope and must not block a clearly bounded planning-only pilot.

Existing themes, artwork and generic workplace directories are reusable assets. Avoid rebuilding them unless acceptance testing identifies a concrete issue. Fix the Storybook project-stage rendering report through a fresh browser check before including that preview as release evidence.

## R1: first implementation batch

1. Review and validate the current TLPS migration/API/client changes separately from unrelated Auth/IPC/Tauri work. Preserve pinned migration history and prepare a bounded commit/review.
2. Define the minimum project/session provisioning contract. Current bootstrap-issued project tokens are an internal setup mechanism, not public self-service signup. Bootstrap credentials must remain server-side.
3. Decide persistence policy: authenticated API is authoritative for connected records; browser-only demos remain explicitly labeled; storage failures must never silently claim a server save. Add deliberate import/export for existing local records rather than auto-uploading them.
4. Add an explicit route registry for project list/detail and existing TLPS routes. Unknown paths must render not-found rather than public home. Decide mobile aliases without breaking existing links.
5. Wire onboarding and production records to the typed client. Resolve personal profile versus project-profile naming. Scope all navigation, queries and exports to the active project.
6. Add loading, empty, error, forbidden, not-found, conflict and saved states. Define offline behavior explicitly; do not claim queued writes without implementing reconciliation. Confirm destructive actions and consequences.
7. Exercise complete flows with separate users/projects, revoked tokens, replayed creates, concurrent updates, restart persistence, export and backup restore. Retest desktop transport only if that delivery channel is included.
8. Publish an internal-alpha acceptance record tied to the exact reviewed revision and configuration. Document incomplete fields/features rather than filling them with misleading demo success.

## Pilot scope proposal

Include: branded TLPS entry, guided setup, project list/detail, the eight-stage navigation model, bounded production-planning records, authenticated project access, review/audit behavior, export, basic support and responsive layout.

Exclude from pilot activation unless independently completed: real bookings/hiring, verified rights/clearances, automatic film generation, recurring billing, investment capital collection, custody/escrow release, cryptocurrency/NFT operations, and full parity with all 228 mobile routes. Existing demos can remain accessible with their current scope labels.

Evidence references are metadata in the current backend. If the pilot needs actual uploaded documents, file storage/versioning/access becomes required scope rather than an assumed capability.

## Release gates

| Gate | Required evidence |
|---|---|
| Scope | Named owner, audience, supported workflows, exclusions and approved change boundary |
| Data | Migration checksum/history, invariants, authorized import policy, verified backup/restore and upgrade failure behavior |
| Access | Server-side authorization for every read/write/export; cross-project/role denial; token/session revocation |
| Product | Full core workflow using real persistence, meaningful errors, concurrency resolution and explicit offline behavior |
| Quality | Relevant unit/integration/browser tests; responsive/keyboard/accessibility review; no unexplained critical defects |
| Operations | Deployment configuration, secrets handling, monitoring, retention/deletion, support/incident ownership and rollback/runbook |
| Commerce, when enabled | Provider acceptance, approved prices/currency, verified payment state, reconciliation/refunds/subscription lifecycle and entitlements |
| Release record | Exact revision/configuration, test evidence, open limitations and explicit go/no-go by designated approvers |

A previously passing backend suite or historical MAATAA certification is not a substitute for these gates on the integrated release candidate.

## Delivery tracking

Use the milestones as release gates, not automatic semantic version numbers. Assign a TLPS version only after packaging/deployment ownership is decided. Track each feature across specification, source, tests, integration, pilot acceptance and release rather than one ambiguous “done” flag. Set dates after agreeing pilot scope, available team capacity and external provider dependencies.

Immediate priority: **R0 decisions and R1 connected project flow**. The biggest release gap is integration and operational acceptance, not additional themes or more generic route cards.

## Supporting documents

- FULL-EVOLUTION-REPORT-2026-10-17.md — observed history and current maturity.
- DATABASE-API.md and VERIFICATION.md — prepared local backend contract and recorded tests.
- SCHEMA-COMPARISON-v1.2.0.md — proposed relational design gaps and migration conflicts.
- ROUTES-FRAMES-COMPARISON-v1.2.0.md — mobile route/frame gaps and vocabulary differences.

This roadmap adds planning documentation only; it does not approve deployment, payments or schema migration and does not start implementing every later phase.
