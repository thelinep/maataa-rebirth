# TLPS local database and API

The MAATAA Auth/API runtime now persists TLPS production and Investor Hub planning records in SQLite. This is a local backend foundation; the existing browser-local TLPS screens do not automatically use it or migrate their stored data. Desktop IPC route allowlisting for these new endpoints is a separate integration step.

## Storage and ownership

`apps/maataa-auth-api/src/tlps.rs` extends the existing authenticated runtime. Core schema version remains 3; the independent, checksummed TLPS migration is version 1. `Store::open` applies both migrations atomically within their respective transactions. TLPS migration failure prevents startup. Migration checksum covers the SQL and pinned SKU/workspace snapshots. Never edit an applied version: introduce a new migration for future schema/catalog changes.

Tables: `tlps_entities` (versioned JSON records and tombstones), `tlps_links` (same-project typed references), `tlps_events` (append-only audit metadata), `tlps_idempotency` (principal/project/key receipts), `tlps_skus` (26 draft catalogue records), and `tlps_schema_migrations`. The workspace snapshot contains 647 accepted IDs. Profiles and onboarding each have one active record per project.

Existing core projects must have `ownerApp: "tlps"`. Tokens remain issued/revoked by the existing bootstrap administration endpoints; reads require `project:read`, mutations require `project:write`, and tokens must match the project. These are project-level permissions, not department/HOD-specific permissions. Never accept actor or approval claims from a record payload.

Writes use immediate SQLite transactions: entity, links, audit entry and create receipt commit together. Updates/deletes use optimistic version checks; concurrent writers cannot overwrite the same version. Deletion creates a tombstone and rejects deletion of a referenced target. Lists omit deleted entities; audit history remains. Host timestamps are explicitly unverified.

## Collections

| Collection | Required data | Optional data |
|---|---|---|
| profiles | title, stage | city |
| onboarding | audience, idea, journey, automation | — |
| workplace-records | areaId, workspaceId, values, status | — |
| budget-items | label, quantity, unitAmountMinor, currency | — |
| crew-assignments | name, role | department, notes |
| locations | name | city, notes |
| schedule-items | title, date, startMinute, endMinute | locationId |
| evidence | title, kind, sourceRef | sha256 |
| circles | name, purpose | coordinatorReference, rules |
| membership-plans | circleId, name, period, benefits | — |
| investment-interests | circleId, partyReference | terms |
| escrow-reviews | milestone, condition | evidenceReference, reviewerReference, disputeTerms |

Stages: idea → story → board → pre → production → post → release → shree. Stage values record navigation/progress; they do not grant approval or release authority. All data objects reject unknown fields. See `src/tlps.rs` validation for exact text limits and enums, and `apps/tlps/src/services/tlpsDataApi.ts` for payload types.

Schedule dates use real Gregorian YYYY-MM-DD dates (1900–2200); minutes are within one day and end must follow start. Budget amounts are integer INR paise estimates, with overflow checks. Workplace values are bounded plain strings; prototype keys are rejected. A registered workspace ID and area ID are validated independently, not as a department authorization mapping. Evidence references are stored text, never fetched by the server. Circle/location links require active records of the correct type in the same project.

## API contract

All endpoints below require `Authorization: Bearer <project token>`. POST/PUT require `Content-Type: application/json` and body `{"data": {...}}`. JSON entity data is limited to 8,192 serialized bytes, HTTP bodies to 1 MiB, and each project to 1,000 active entities across all collections.

| Method | Path | Result |
|---|---|---|
| GET | /v1/tlps/capabilities | Schema, limits, areas, stages, disabled financial capabilities |
| GET | /v1/tlps/skus | 26 draft SKU records; no checkout |
| GET / POST | /v1/tlps/projects/{projectId}/{collection} | List / create |
| GET / PUT / DELETE | /v1/tlps/projects/{projectId}/{collection}/{entityId} | Read / replace / tombstone |
| GET | /v1/tlps/projects/{projectId}/events | Audit metadata |
| GET | /v1/tlps/projects/{projectId}/export | Active-record planning export |

Create requires `Idempotency-Key` (1–128 ASCII letters, digits, underscore or hyphen). Retry with identical collection/data returns the original 201 receipt; a different payload with that principal/project/key returns 409. The original receipt can be older than the current record: GET to obtain current state. Receipts and tombstones have no automated retention/purge policy yet.

PUT/DELETE require `If-Match: 1` (or quoted integer), using the version last read. Success increments version. Missing preconditions return 428; stale versions, duplicate singleton records and referenced-target deletions return 409. Invalid input returns 400; invalid token 401; wrong project/scope 403; missing record 404; unsupported method 405; unsupported content type 415; oversized HTTP body 413. Errors use `{"error":{"code":"..."}}`; responses carry a request ID and no-store caching headers.

Lists use `?limit=50&cursor=tlps%3A<uuid>` (maximum 100). Continue using `nextCursor` until null. Audit uses `?limit=50&after=<sequence>`; `nextCursor` is the last sequence when another page exists. Pagination is ordered continuation, not a point-in-time snapshot during concurrent changes. Unknown/duplicate query fields are rejected. IDs use `prj:<uuid>` and `tlps:<uuid>`.

The browser client takes a `getToken` callback, stores no tokens, uses the existing same-origin `/api/maataa` proxy, times out after 15 seconds and does not automatically retry mutations. Caller supplies idempotency keys and versions. Do not expose the bootstrap token to a browser.

## Local operation and backup

A private initialized database and initial backup are prepared at `.local/tlps-api/tlps.sqlite3` and `.local/tlps-api/initial-backup.sqlite3`. They contain the schema and 26 draft SKUs, with no projects or imported browser data. See VERIFICATION.md for exact checks. No persistent server is started automatically.

Use the existing runtime setup in `apps/maataa-auth-api/README.md`. Set `MAATAA_AUTH_API_DB` to a SQLite path in a private directory (0700); use a private bootstrap token file (0600) through `MAATAA_BOOTSTRAP_TOKEN_FILE`. The server binds to 127.0.0.1 and its private Unix socket. Startup applies the TLPS schema and draft catalogue without creating real projects or merchant accounts. Existing bootstrap administration creates principals/project-scoped tokens; then create the existing core project record before writing TLPS data.

Run `cargo run --manifest-path apps/maataa-auth-api/Cargo.toml --offline -- backup <new-private-path>` with `MAATAA_AUTH_API_DB` set to the source database. Backup includes TLPS records, links, audit, receipts and catalog. Open the backup using the same pinned migrations to restore/verify it. Keep backups and tokens private. No production hosting, multi-node coordination or retention service is supplied by this local implementation.

## Financial boundary

Membership plans, non-binding investment interests and escrow reviews are separate collections. They cannot collect capital, charge subscriptions, hold balances, custody assets, refund or release funds. Draft SKUs have null prices and disabled checkout/fulfillment. Saptdhatu conversion and escrow balance are null. Razorpay/UPI/Stripe/wallet execution is not connected by this API. Unknown financial flags are rejected rather than promoted into authority.

## Verification

Run the backend suite with `cargo test --manifest-path apps/maataa-auth-api/Cargo.toml --offline`; HTTP tests need permission to bind localhost and use disposable private databases with synthetic credentials. Run lint with `cargo clippy --manifest-path apps/maataa-auth-api/Cargo.toml --offline --all-targets -- -D warnings`. Client checks: `pnpm tlps:typecheck` and `pnpm exec vitest run tests/tlps-data-api.test.ts` (or the equivalent installed package runner).

Coverage includes every collection's database and HTTP CRUD, wrong project/scope/revocation, reference isolation, singleton enforcement, pagination, malformed payloads, SQL metacharacters, body/field/record limits, calendar/amount validation, transactional rollback, audit immutability, request replay, concurrent connections, migration checksum/future-version rejection, reopen persistence and backup restoration. These automated checks establish local behavior, not production certification or live provider acceptance.
