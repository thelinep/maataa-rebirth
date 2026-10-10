# MAATAA Auth/API prototype threat model — draft

**Status: working draft for review; not approved, independently reviewed, or a production security assessment.** This document advances roadmap task P-02 for the current local Rust prototype only. It records code-observed controls and gaps; it does not assert that a proposed MAATA Identity Protocol (MIP) or future service architecture is implemented.

## Scope and system boundary

The assessed target is `apps/maataa-auth-api`: one Rust process that binds to IPv4 loopback, uses a local SQLite database, accepts a bootstrap bearer credential for principal/token administration, and accepts project-scoped opaque bearer credentials for project and knowledge metadata routes. It is a single-user/local prototype and is not a network-facing identity provider. The separate MIP v1 document is a design draft, not part of the running service.

Included assets are: the bootstrap credential; issued bearer credentials and their scopes; principal/project associations; project records and activity metadata; knowledge objects, relations, assertions and provenance; SQLite database and local backups; and the integrity and availability of the local process. The prototype does not implement passkeys, browser sessions, organizations/memberships, cross-device identity, messaging, notification delivery, or a separate DBB/HKDB/API deployment.

### Trust boundaries

| Boundary | Current behavior | Security significance |
| --- | --- | --- |
| Local process ↔ caller | HTTP listener binds to `127.0.0.1`; callers send bearer credentials in `Authorization`. | Loopback limits remote reachability in the current launch mode, but any local process or local account compromise may reach it. HTTP is not TLS and must not be exposed through a public interface or untrusted proxy. |
| Process ↔ bootstrap secret | Secret comes from one environment variable or a configured file; Unix secret files reject group/other permissions. | Secret-file mode checks reduce accidental disclosure, but environment variables and the host's process/account controls remain trusted. No external secret manager integration exists. |
| Process ↔ SQLite | One local SQLite file; private parent-directory check on Unix; migrations are checksummed and transactional. | Database-file or host compromise exposes metadata and credential digests; SQLite is not encrypted by this service. |
| Backup ↔ filesystem | Backup command writes a new file under a private directory, sets owner-only permissions, checks integrity/schema and refuses overwrite. | This supports a local snapshot check only; it is not encrypted off-site backup, key custody, disaster recovery or a tested operational restore service. |
| Future MIP clients ↔ Auth | MIP draft proposes `https://auth.allb.xyz`, WebAuthn RP ID `allb.xyz`, exact client/callback registry and one-time code exchange. | These are design choices only. There is no live issuer, passkey ceremony, callback registry, session cookie or client integration in the prototype. |

## Adversaries and assumptions

The initial review considers an untrusted local process or browser, a user who obtains an issued project token, a caller that submits malformed or oversized data, a person who can read the database/backup or process environment, a compromised operator account, and—if someone changes the bind/proxy topology—an unauthenticated remote caller. These scenarios are not claims that exploitation has occurred.

The local prototype assumes the machine, operating-system account, executable, dependencies, bootstrap-token provisioning, database directory and backup destination are controlled by one trusted operator. It does not defend against a host administrator, malware running as the service account, filesystem snapshots made outside the backup command, or a compromised build/dependency chain. No production attacker likelihood or residual-risk rating is assigned; that requires an owner-approved deployment and data classification.

## Existing controls verified in source

- Listener binds to `127.0.0.1`; active connections are capped at 128, each connection has a 60-second deadline, and shutdown drains for at most 10 seconds (`apps/maataa-auth-api/src/main.rs`).
- Bootstrap token must be 32–256 bytes. Only one source may be configured. On Unix, a configured token file must be regular and have no group/other permissions. The in-memory bootstrap check compares SHA-256 digests using constant-time equality (`src/main.rs`, `src/lib.rs`).
- Issued project tokens use 32 bytes from the operating-system RNG, are returned once, and are persisted as SHA-256 digests. They carry a project and explicit scope list, expire after a bounded TTL, and can be revoked (`src/lib.rs`).
- Protected handlers authenticate the bearer token, enforce project/scope checks in storage operations, validate record shapes and provenance, and use parameterized SQLite queries. Project updates require an `If-Match` version (`src/lib.rs`).
- Request bodies are capped at 1 MiB; knowledge lists are bounded; knowledge assertions cannot be marked `verified` by this service. Responses set `Cache-Control: no-store`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY` and `Referrer-Policy: no-referrer` and include a request ID (`src/lib.rs`).
- SQLite foreign keys, a five-second busy timeout and checksum-checked schema versions 1–2 are configured. The backup path validates SQLite integrity and schema, requires a private destination directory on Unix, applies owner-only file permissions and refuses overwrite (`src/lib.rs`).
- The checked-in MIP draft explicitly calls for established crypto/WebAuthn implementations, single-use challenges, server-side sessions, exact origin/RP binding, client-specific redirect allowlists, state/PKCE-bound one-time codes, CSRF controls, revocation and independent review. These are requirements in the design, not existing mitigations in this code.

## Abuse cases and current disposition

The severity labels below are preliminary review priorities for the prototype, not quantified production risk ratings.

| Priority | Abuse case and impact | Existing mitigation | Remaining exposure / required evidence |
| --- | --- | --- | --- |
| High | **Prototype exposed beyond the local host.** An attacker could probe admin and project routes, steal/replay credentials in transit, or exploit the absence of a hardened public edge. | Hard-coded loopback bind; README warns not to expose it publicly. | No TLS listener, ingress policy, network-authenticated service identity or deployment guardrail. Keep it local until a separately reviewed deployment boundary exists; verify firewall/proxy behavior before any test deployment. |
| High | **Bootstrap credential theft or misuse.** An attacker with the credential can create principals/tokens and revoke tokens. | Minimum length; private Unix secret file option; one token source; constant-time digest comparison; no deliberate token logging. | No rotation/expiry, principal-scoped administration, multi-admin policy, rate limit, audit trail for bootstrap actions or external secret manager. Define custody, rotation, emergency revocation and operator separation; test them. |
| High | **Project bearer token theft, replay or over-broad issue.** A stolen token can act until expiry/revocation within its project and scopes. | High-entropy random tokens; plaintext returned once; digest stored; scope/project checks; TTL cap and revocation. | No user/passkey session, audience binding, per-token owner UI, automatic rotation, IP/device anomaly handling, authentication rate limit or current identity-provider check. Add lifecycle, least-privilege and replay/revocation tests before broader use. |
| High | **Unauthorized cross-project or future cross-tenant access.** Incorrect scope or query handling could leak or alter another project's records. | Current token stores one project ID; operations check project ID and required scope; relation/assertion validation requires same-project objects. | No organization/tenant model, database row-level policy, adversarial property-based isolation suite or production DB constraints. Test every route with mismatched IDs and future tenant roles; default deny. |
| High | **Clock rollback or host-time manipulation.** Token expiry, migration timestamps and audit/provenance ordering can be wrong or bypassed if the host wall clock is manipulated. | Responses label time as `host-unix-clock-unverified`; TTL is stored and checked. | No trusted/monitored time source or bounded skew policy. Expiry is only as trustworthy as the host clock. Define clock error budget and fail-closed skew behavior before using credentials operationally. |
| Medium | **Malformed/oversized request or connection exhaustion.** Attackers can consume memory, CPU or connection slots or trigger parser/database errors. | 1 MiB JSON body limit; 128-connection semaphore; 60-second connection timeout; bounded knowledge list; SQLite busy timeout. | No per-IP/per-principal rate limits, request-specific compute quotas, explicit per-body read deadline separate from connection deadline, load/DoS testing or production edge controls. Test concurrency, slow uploads, malformed JSON and saturation; decide target limits. |
| Medium | **Sensitive metadata or credential material leaks through storage, logs, backups or diagnostics.** | Token plaintext is returned once; token digests are stored; error responses expose stable coarse codes; backup permissions/integrity checks exist. | No at-rest database encryption, log redaction verification, key custody, encrypted/off-site backups, retention/deletion rules or recovery drill. Bootstrap env source may be visible to privileged host tooling. Define data classes and retention; verify logs and backup access. |
| Medium | **Race/version conflicts or duplicate effects.** Concurrent updates or retries may overwrite work or repeat a side effect. | Project updates require a version precondition and advance by version; database transactions protect selected operations. | No general idempotency keys, API event/outbox contract or load/race tests. Specify per-operation concurrency/retry behavior and prove it under concurrent requests. |
| Medium | **Knowledge provenance is mistaken for scientific truth.** A caller could submit misleading source/method metadata or treat a stored assertion as independently verified. | Schema bounds provenance fields; verification state permits only `unverified` or `provisional`; UI/docs say local timestamps are unverified. | Provenance claims are caller-supplied and not authenticated against source registries; no evidence review/signature workflow. Preserve source bytes/digests and reviewer identity where needed; never infer truth from storage acceptance. |
| High (future design) | **Custom MIP protocol flaw, WebAuthn origin confusion, callback/code replay, session fixation or recovery takeover.** These could permit account takeover or cross-domain identity confusion. | Design draft proposes exact issuer/RP/origin separation, single-use challenges, PKCE/state-bound code exchange, opaque host-only sessions, CSRF and independent review. | None of those flows exists in the Rust prototype, and the protocol draft is not reviewed or frozen. Do not enable real accounts until state machines, conformance tests, WebAuthn library choice, browser/native matrix, recovery review and independent security assessment pass. |
| High (future integration) | **Untrusted client-supplied identity or stale authorization in Desktop/UI/Brahmini/TLPS.** Could expose shared records after account/project access changes. | Architecture docs say clients are not authority and TLPS should use one-time server-side exchange; desktop prototype currently stores only local project metadata. | There is no shared Auth/API integration or deployed revocation authority. Build end-to-end synthetic tests for exact callback/CORS allowlists, replay denial, cookie isolation and immediate revocation after service contracts exist. |

## Unresolved decisions and owner inputs

Before a complete threat model can be reviewed, the product/security owner must decide or supply:

1. Pilot users, operators, service accounts, supported clients and the one initial use case.
2. Data classification, jurisdiction/data residency, tenant/project boundaries, retention, deletion/export, legal hold, and whether any mission-sensitive or customer data is in scope.
3. The acceptable clock error/freshness and expiry-skew policy for authentication and audit timestamps.
4. Whether the MIP draft's issuer, RP ID, exact WebAuthn origin, client allowlist and TLPS callback remain the intended values; who owns recovery and signing/sealing keys.
5. The owned hosting topology, ingress/TLS, private service network, operator identities, secrets/key management and incident response ownership.
6. PostgreSQL/operator selection, backup encryption/location, measurable RPO/RTO, and who performs restore drills.
7. Expected load, SLOs, rate-limit policy and abuse response.
8. Whether messaging is required in the pilot and whether message content must be end-to-end encrypted.

No credentials, account secrets or customer data are requested by this draft.

## Production blockers

The prototype must remain loopback-only and synthetic-data-only. Production use is blocked by the absence of: an independently reviewed MIP threat model/protocol; passkey enrollment and sign-in; sessions, recovery and organization policy; separate deployable Auth, API Runtime and DBB/HKDB boundaries; PostgreSQL and reviewed migrations; TLS/private networking and owner-operated secret/key management; rate limiting and monitoring; audit/retention/deletion policy; encrypted backup plus measured restore; client integrations and revocation tests; and independent security review. The existence of tests/builds or the proposed domain map does not close these blockers.

## Review and test plan

This draft is a starting point for P-02, not its acceptance evidence. Review should include the service owner, product/data owner and an independent security reviewer. Before accepting the threat model:

- Map each HTTP route and data field to an owner, classification, authorization rule and negative test.
- Add adversarial tests for bootstrap and token lifecycle, expiry under clock skew, cross-project access, replay/revocation races, malformed/slow requests, backup-file access, error/log redaction and migration failure.
- Review the MIP state machines separately, then update this model for implemented code rather than assuming the design draft is deployed behavior.
- Record residual risks, named owners, target environment, test evidence and review date. Re-open the model whenever trust boundaries, identity flows or data classes change.

## Source basis

- [`apps/maataa-auth-api/README.md`](../../apps/maataa-auth-api/README.md) — supported local routes, limits and explicit non-production scope.
- [`apps/maataa-auth-api/src/main.rs`](../../apps/maataa-auth-api/src/main.rs) — loopback bind, connection limits, shutdown, bootstrap-secret handling and Unix directory permissions.
- [`apps/maataa-auth-api/src/lib.rs`](../../apps/maataa-auth-api/src/lib.rs) — token generation/storage, authz, request bounds, SQLite migrations/backup and route handling.
- [`apps/maataa-auth-api/tests/http_flow.rs`](../../apps/maataa-auth-api/tests/http_flow.rs) — local synthetic HTTP flow coverage.
- [`MAATAA-IDENTITY-PROTOCOL-V1.md`](MAATAA-IDENTITY-PROTOCOL-V1.md) — MIP design assumptions and required review gates; not implemented protocol behavior.
- [`AUTH-DB-API-PRODUCTION-GATES.md`](AUTH-DB-API-PRODUCTION-GATES.md) — target service boundaries and remaining production gates.
