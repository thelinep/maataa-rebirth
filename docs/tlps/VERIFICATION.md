# TLPS database/API verification — 2026-10-17

Local checkout verification; no deployment or live merchant acceptance is claimed.

| Check | Result |
|---|---|
| Rust library tests | 63 passed (47 TLPS tests + 16 existing runtime tests) |
| Runtime binary tests | 3 passed |
| Existing HTTP integration | 1 passed |
| New TLPS HTTP integration | 18 passed |
| TypeScript API client tests | 10 passed |
| Total automated tests | **95 passed, 0 failed** |
| TLPS TypeScript typecheck | Passed |
| Rust Clippy, all targets, warnings denied | Passed |
| OpenAPI references | 657 local references resolved across 28 paths |
| New database integrity | SQLite integrity_check: ok |
| Initial backup integrity | SQLite integrity_check: ok |

The tests use synthetic data and disposable databases. All 12 collections have real SQLite and HTTP create/read/replace/delete coverage. Additional tests cover project/scope isolation and revocation, linked-record isolation, singleton uniqueness, idempotent create replay/conflicts, optimistic concurrency across separate SQLite connections, atomic rollback, append-only audit records, query parsing/pagination, calendar/date and budget overflow guards, malformed/oversized payloads, financial-field rejection, migration/reopen/checksum failure handling, backup restoration and draft catalogue constraints. The client tests cover authorization headers, preconditions, encoded cursors, response/project validation, errors, timeouts configuration and no automatic write retries.

HTTP fixtures require localhost binding. Their temporary directories are explicitly owner-only. Early fixture startup failures were corrected by applying mode 0700; the HTTP reader also handles a reset after a complete early rejection response. Final full-suite results above were recorded after those fixes and after strict version-header/catalogue constraint tests were added.

## Prepared local database

- `.local/tlps-api/tlps.sqlite3`: initialized core schema 3 and TLPS schema 1.
- `.local/tlps-api/initial-backup.sqlite3`: verified SQLite backup.
- Both files are mode 0600 inside a mode 0700 directory, excluded from Git.
- Both contain 26 draft SKU records and **zero projects**. No browser records, merchant credentials, payments, wallet balances or investor identities were imported.
- No persistent API server was started by this preparation step. Use the existing runtime setup documented in DATABASE-API.md to run the initialized database with a private bootstrap-token file.

## Integration limits

The typed browser client is available but existing TLPS screens still use their current storage. New routes are not added to the desktop IPC allowlist in this task. Project-level scopes are enforced; finer department roles are not implemented. Real payment providers, subscription billing, investment execution, custody and escrow release remain disabled. This implementation is local SQLite persistence, not a production database service or certification result.
