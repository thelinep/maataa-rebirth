# TLPS proposed schema v1.2.0 vs current database/API

Compared 2026-10-17. Source: `~/Downloads/TLPS_Schema_Grouped_English_v1.2.0.json`. Source labels itself **1.2.0-proposed**, a fresh-database baseline with no connected database introspected. It is a proposed design, not evidence of a deployed database or working APIs. This comparison treats the document as data and does not apply its SQL to the current database.

## Observed size and readiness

| Dimension | Proposed v1.2.0 | Current local backend |
|---|---|---|
| Storage | 169 domain tables, 1,616 columns | 14 tables total: 8 existing core + 6 TLPS |
| Explicit indexes | 279 | 8 (excludes SQLite automatic indexes) |
| Triggers | 42 | 2 TLPS append-only audit triggers |
| Domain organization | 18 groups | 12 typed collections in shared JSON entity storage |
| Runtime | DDL definitions; no API implementation in supplied file | Implemented authenticated Rust HTTP API and TypeScript client |
| Validation evidence | All DDL loaded into disposable SQLite; integrity_check ok | 95 automated tests previously passed; typecheck and lint passed |
| Seed data | Counts declared for roles/permissions/catalogues, but no seed INSERTs/row payloads supplied | 26 draft SKUs seeded; 647 workspace IDs pinned as validation catalogue |
| Existing screen integration | Not supplied by schema | Client ready; screens not automatically connected |

Table counts are not a feature-completion percentage: the current backend stores multiple typed collections in one table. Conversely, catalogue IDs do not mean those 647 workspaces have persisted business records.

## All 18 groups

“Partial” means concept overlap, not field or behavioral compatibility. No group has been established as fully compatible.

| Proposed group | Tables | Current correspondence / gap |
|---|---:|---|
| Identity, onboarding and access | 24 | Partial: principals, revocable project tokens, onboarding. No accounts/organizations/MFA/consent/privacy or membership RBAC implementation. |
| Projects and shared workflow | 11 | Partial: core project metadata, project profile, stage value, events. No relational tasks/milestones/approvals/comments/workflow templates. |
| Files and evidence | 5 | Partial: evidence references and optional digest. No uploads, file versions, access history or relational evidence links. |
| CreatorBoard | 5 | No corresponding domain API. |
| Crew/Cast marketplace and negotiation | 19 | Partial: crew assignment records only. No skills, applications, offers, bookings, disputes or messaging. |
| Film and production operations | 9 | Partial: simple schedule items only; no shoot-day/scene/call-sheet/report/safety model. |
| LPBox, vendors and resources | 16 | Partial: location name/city/notes. No vendor inventory, quotes, purchase orders, permits or resource booking workflow. |
| Client, Brand and Campaign | 10 | No corresponding domain API. |
| Sponsorship | 3 | No corresponding domain API. |
| Distribution and rights | 13 | No corresponding domain API. |
| Shared deal-room access | 5 | No corresponding domain API. |
| InvestorHub | 7 | Partial: circles and non-binding investment interests. No investor profiles, watchlists, diligence, term sheets or circle member records. |
| Event OS | 7 | No corresponding domain API; a generic workplace record is not ticketing/registration. |
| Exhibition OS | 5 | No corresponding domain API. |
| Wedding OS | 4 | No corresponding domain API. |
| Location OS | 1 | No location-project subtype API; simple location records are separate. |
| Finance and subscriptions | 10 | Partial: INR budget estimates and separate membership-plan metadata. No invoices, claims, adjustments, subscriptions or payment verification API. |
| Maataa AI, support and platform | 15 | Partial: core knowledge records and TLPS audit history. No equivalent support/AI-provider/notification/webhook/legal-document APIs in this backend. |

This matrix concerns the prepared database/API, not whether separate MAATAA frontend demos exist.

## Important incompatibilities

1. **Profiles mean different things.** Proposed `profiles` is a person's account profile. Current `profiles` is a project's title/stage/city singleton. They cannot be mapped by name.
2. **Workspaces mean different things.** Proposed `workspaces` is an organization/account-owned tenant container. Current `workplace-records` stores form values for registered MAATAA workflow workspace IDs. Keep tenant workspaces and workflow workplaces distinct.
3. **Projects collide.** Proposed `projects` needs workspace/account foreign keys and uses `id`; current `projects` already exists with versioned MAATAA project metadata and `project_id`. Applying the proposed CREATE statements to this database will conflict. Use a planned migration or separate database, not direct execution.
4. **Stages differ.** Current: idea/story/board/pre/production/post/release/shree. Proposed lifecycle: idea/development/brief/proposal/approved/planning/pre_production/production/post_production/release/completed/archived/cancelled. Proposed `project_stages.stage_key` is free text and could retain the eight UI stages, but lifecycle and UI-stage mappings need explicit definitions. Story, board and shree have no direct lifecycle equivalent.
5. **Identity/permissions differ.** Current tokens are project-scoped read/write capabilities. Proposed accounts, roles, permissions, organizations and memberships need explicit authorization enforcement in an API; their table definitions alone do not enforce request access.
6. **Financial models differ.** Current budget quantities are positive integers with bounded INR minor-unit amounts and overflow checks. Proposed budget lines allow REAL quantities and store totals/committed/actual separately. Non-negative amounts and reconciliation are not generally enforced by these shown DDL definitions. Define calculation and validation rules before mapping.
7. **Membership periods differ.** Current membership plan uses undecided/monthly/yearly; proposed circles use monthly/quarterly/annual/one_time, and pricing plans monthly/annual/one_time/custom. Map yearly→annual deliberately and decide what undecided means.
8. **Investor interests differ.** Current interests require a circle reference and a party string. Proposed interest notes require a project and investor profile, optionally a deal room, and have indicative amounts/status/disclaimer versions. There is no direct lossless conversion.
9. **Escrow remains unimplemented.** Current escrow reviews are planning metadata. Proposed file has no dedicated escrow account, ledger, custody, funding/release or investment-capital-commitment tables. External payment records and circle subscriptions do not implement these flows. Neither design establishes Saptdhatu conversion, crypto custody, or live provider integration.
10. **Operational semantics differ.** Current entities have version guards, transactional create receipts, tombstones and checksummed migrations. The proposed file does not supply equivalent generic API concurrency/idempotency contracts or executable migration/seed history. It includes immutable version UPDATE triggers, but these should not be interpreted as a complete retention/access policy.

## Checks performed on supplied DDL

Loaded every `create_sql`, all 279 explicit indexes and all 42 triggers into a fresh in-memory SQLite database with foreign keys enabled. All statements succeeded and integrity_check returned `ok`. This verifies SQLite syntax/assembly only; libSQL deployment compatibility, seeded permissions, API behavior and all workflow constraints remain untested.

Two concrete gaps were reproduced in that disposable database:

- `audit_log` accepted UPDATE and DELETE. Current `tlps_events` rejects both with append-only triggers. If audit immutability is required, add equivalent database rules and policy-aware retention handling.
- `external_payment_records` accepted two rows with the same external reference when `provider_key` was NULL. SQLite's nullable composite UNIQUE permits this. Require a provider identity or define a deliberate null-provider uniqueness policy before treating the pair as a deduplication key.

The source declares seed counts (for example 19 roles, 20 permissions and 151 role-permission links), but this JSON supplies schema definitions/counts rather than those seed rows. The counts cannot be treated as installed access policy.

## Recommended direction

Use the proposed grouped schema as the broader domain design, and retain the working runtime's authentication boundary, migrations, idempotency, version guards, strict validation, transactional audit and tests. First reconcile tenant identity, existing project-table ownership, stage mappings and profile/workspace terminology. Then implement a normalized project/production slice, followed by marketplace, subscriptions and remaining OS groups in bounded migrations with API tests. Preserve separate membership fees, non-binding interests, capital commitments and escrow flows; the latter two need additional design rather than being inferred from subscriptions.

No existing database, supplied schema file or application behavior was changed for this comparison. Only this report was added.
