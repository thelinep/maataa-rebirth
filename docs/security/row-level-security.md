# Row-level security in the Auth/API store

Decision recorded 2026-10-17 from the release owner's chat statement (not a signed record): enforce row access in the database, project boundary plus pilot roles.

## Why

Before this change every query filtered by project in Rust. Nothing in the database stopped a query that forgot its `WHERE project_id = ?`, wrote another project's ID, or recorded a different actor. SQLite has no row-level security, so the store builds it. The application checks stay in place; the database is now a second, independent boundary.

## How it works

Code: `apps/maataa-auth-api/src/rls.rs`.

1. **Sessions.** Every database use opens a session.
   - `Store::system()` is for migrations, administration (principals, tokens, pilot membership), authentication and backups. It is unrestricted.
   - `Store::scoped(identity)` is for one authenticated request. It reads the pilot membership, then fixes the project, principal and capabilities for the rest of the session.
   - When a session ends the connection returns to **Locked**, where protected and system tables cannot be read or written at all.
2. **Context functions.** SQL sees the session through `rls_project()`, `rls_principal()` and `rls_can(capability)`. Outside a request they return `NULL` / false, so every policy fails closed.
3. **Policy views and triggers.** Each project-scoped table `T` has a per-connection `TEMP VIEW rls_T`. It returns only rows of the session's project that the session may see. `INSTEAD OF` triggers on the view check the write policy, then write the base row. A table without an update or delete trigger refuses those statements. The objects are TEMP: they are rebuilt from the binary on every open and never enter migration checksums or backups.
4. **Authorizer.** During a request, a statement may not read or write a protected base table, read a system table (`principals`, `access_tokens`, migration ledgers, `sqlite_master`), change the schema, run a pragma or attach a database. Only the `rls_` views, and the triggers behind them, reach base tables. Such a statement fails to prepare.

Refusals surface as `StoreError::Denied` (HTTP 403).

## Capabilities

Derived per request from the token's scopes and, for managed pilot projects, the principal's active role.

| Capability | Granted when |
| --- | --- |
| `read` | `project:read`, and active membership if the project is a managed pilot |
| `write` | `project:write`; in a managed pilot only for owner or editor |
| `review` | `project:write` in a managed pilot, for owner or reviewer |
| `see` | any of read, write or review (writers must see rows to check versions) |
| `knowledge-read` / `knowledge-write` | `knowledge:read` / `knowledge:write`, plus membership in a managed pilot |
| `knowledge-see` | either knowledge capability |

A deactivated member loses access on the next request.

## Policy matrix

Every row is also limited to `project_id = rls_project()`. "Actor" means the actor or creator column must equal `rls_principal()`.

| Table | See | Insert | Update | Delete |
| --- | --- | --- | --- | --- |
| `projects` | see or knowledge-see | write, owner = me | write, owner unchanged | no |
| `project_events` | see | write, actor | no (append-only) | no |
| `knowledge_objects`, `knowledge_relations`, `knowledge_assertions` | knowledge-see | knowledge-write, actor | no | no |
| `tlps_entities` | see | write | write; reviewer only on `profiles`, no undelete | no (soft delete by update) |
| `tlps_links` | see | write | no | write |
| `tlps_events` | see | write or review, actor | no (append-only) | no |
| `tlps_idempotency` | see, **own principal only** | write, principal = me | no | no |
| `tlps_pilot_projects` | own project | no (administrator) | no | no |
| `tlps_pilot_members` | own membership, or read | no (administrator) | no | no |
| `tlps_pilot_items` | see | write, creator | write, creator unchanged | no |
| `tlps_pilot_reviews` | see | review, actor | no (append-only) | no |
| `tlps_pilot_audit` | see | write or review, actor | no (append-only) | no |
| `tlps_skus` | everyone (reference data) | no | no | no |
| `principals`, `access_tokens`, migration ledgers | system session only | | | |

A test fails the build if any table gains a `project_id` column without a policy (`every_table_with_a_project_column_has_a_policy`).

## API

Each route authenticates the bearer token, then runs its store call in `scoped(identity)`, so the project in the path must match the token's project and the database applies the matrix above. `tests/tlps_http.rs::http_row_level_isolation_across_every_route` creates rows in project B for every TLPS collection and checks that project A's token cannot read, update, delete, list, export or see events for them on any route, even with B's entity IDs.

Routes outside this boundary:

- **Admin routes** (`/v1/admin/*`) use the bootstrap secret and the system session.
- **`/healthz` and `/readyz`** touch no project data.
- **The Desktop bridge and the pilot origin** forward only allow-listed project routes. Behind them the same scoped sessions apply.

## Limits

- This protects against mistakes and injected SQL inside the API process. It is not a defence against code that deliberately opens a system session. Review every new `system()` call.
- Policies trust trigger and view code named `rls_`. Only the system session can create schema objects, and only this module creates `rls_` objects.
- Row counts for writes through a view come from `rls::execute_counted`, because SQLite reports zero changes for a view.
