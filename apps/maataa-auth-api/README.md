# MAATAA Auth + API Runtime (local v1 foundation)

This Rust service is a bounded local implementation of the MAATAA identity, API and knowledge-store boundary. It uses versioned SQLite migrations for principals, revocable project-scoped bearer tokens, project records, append-only activity metadata, and a project-scoped HKDB-shaped knowledge slice (objects, relations, assertions and provenance). Token plaintext is returned once at issuance; only its SHA-256 digest is persisted. Random token material comes from the operating system RNG. Administrative operations require a bootstrap bearer token supplied through the process environment.

## Run

From this directory:

```sh
export MAATAA_BOOTSTRAP_TOKEN="replace-with-a-random-secret-at-least-32-characters"
cargo run --release --offline
```

For a self-hosted deployment, prefer a mounted secret file instead of an environment variable: set `MAATAA_BOOTSTRAP_TOKEN_FILE=/run/secrets/maataa-bootstrap-token`. On Unix the file must be a regular file with no group/other permissions (for example mode `0400` or `0600`); configure only one token source. The token is never logged.

Create a consistent, integrity-checked SQLite snapshot to a new path in an existing private directory:

```sh
MAATAA_AUTH_API_DB=./data/maataa-auth-api.sqlite3 cargo run --release --offline -- backup ./private-backups/maataa-auth-api-2026-10-09.sqlite3
```

The backup command does not start the HTTP listener, requires a private destination directory, checks SQLite integrity and schema version, writes the snapshot with owner-only permissions, and refuses to overwrite an existing file. This supports local recovery drills; it is not an offsite or disaster-recovery system.

Optional settings: `MAATAA_AUTH_API_DB` (SQLite path; default `./data/maataa-auth-api.sqlite3`) and `MAATAA_AUTH_API_PORT` (default `4381`). The server binds only to `127.0.0.1`. Never expose this HTTP listener publicly; a future self-hosted deployment needs TLS termination, a selected identity authority, an owner-operated secrets manager, rate limits, backup/restore, monitoring, and a reviewed threat model.

The current HTTP process caps concurrent connections at 128, closes connections at a 60-second deadline, adds request IDs and basic response security headers, and drains active connections for up to 10 seconds on Ctrl-C. These are bounded local-service safeguards; they are not a substitute for an edge proxy, distributed rate limiting, or production observability.

## v1 routes

- `GET /healthz` — liveness only; no credentials.
- `GET /readyz` — checks the expected SQLite schema is available; no credentials.
- `POST /v1/admin/principals` — bootstrap bearer only; `{ "principalId": "...", "displayName": "..." }`.
- `POST /v1/admin/tokens` — bootstrap bearer only; `{ "principalId": "...", "projectId": "prj:<uuid>", "scopes": ["project:read", "project:write"], "ttlSeconds": 3600 }`. Returns the secret once; store it in an OS secret manager.
- `POST /v1/admin/tokens/{tokenId}/revoke` — bootstrap bearer only.
- `GET /v1/auth/whoami` — bearer-authenticated identity, project scope and permissions.
- `POST /v1/projects` — create an empty version-zero project record, scoped to its project token.
- `GET /v1/projects/{projectId}` — read the project record with `project:read` scope.
- `PUT /v1/projects/{projectId}` — update with `If-Match: <current-version>`; the record must advance exactly one version.
- `GET /v1/projects/{projectId}/events` — read metadata-only event history.
- `POST /v1/knowledge/objects` and `GET /v1/knowledge/objects` — write/list at most 500 metadata objects within the token's project.
- `POST /v1/knowledge/relations` — create a project-local relationship between existing knowledge objects.
- `POST /v1/knowledge/assertions` and `GET /v1/knowledge/assertions` — create/list project-local, source-attributed assertions. `verificationState` is limited to `unverified` or `provisional`; the service cannot promote a claim to verified.

Knowledge requests require `knowledge:read` and/or `knowledge:write` scopes in addition to the project scope. Each object, relation and assertion records method/version, source reference/type/digest, actor, and a host timestamp explicitly labeled unverified. Knowledge objects are metadata only: properties accept bounded scalar values, and assertion values are bounded scalars. Relations and assertions must reference existing objects in the same project. This is a local HKDB-shaped v1 store, not a separate canonical DBB service and not yet a general graph/query engine.

Schema migrations are additive and run transactionally at startup. The service records versions 1 and 2, rejects unexpected migration fingerprints and refuses a database with a newer schema version. Existing v1 tables are retained while migration v2 adds the knowledge tables.

Project payloads are bounded to 1 MiB and validated for the current MAATA project schema identity. Activity timestamps explicitly say `host-unix-clock-unverified`. No script or artifact body is stored by this service; records should contain references and digests only.

## Deliberate limits

This is not yet production Auth or public API hosting: there is no interactive password/passkey/OIDC login, MFA, TLS listener, cross-device deployment, CORS policy, rate limiting, organization/tenant administration, key rotation workflow, or backup automation. The SQLite knowledge slice is not the canonical DBB/HKDB service, and there is no DB Studio migration-authoring UI or product-client integration. It is a local bearer-token and knowledge-contract foundation for synthetic data and integration work. Do not use real customer or production data until these gates are implemented and independently reviewed.

## Verify

```sh
cargo fmt --check
cargo test --offline
cargo clippy --offline --all-targets -- -D warnings
```
