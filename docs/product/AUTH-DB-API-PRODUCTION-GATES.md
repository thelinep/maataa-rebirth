# MAATAA Auth, HKDB and API production gates

**Status: NOT PRODUCTION READY.** This document separates verified local engineering work from the remaining decisions and release gates. Nothing here authorizes deploying public endpoints, moving user data, or changing DNS.

See `MAATAA-PRODUCTION-SERVICE-ROADMAP.md` for the atomic dependency-ordered plan covering Auth/MIP, API, DBB/HKDB, messaging, notifications, Desktop clients and operations.

The domain split and the supplied archival-zone-export review are recorded in `MAATAA-DOMAIN-AUTHORITY-MAP.md`. The exports are not live DNS evidence and do not close Gate 3.2.

**Owner decision (2026-10-09):** MAATAA must own the identity protocol and implementation as well as the data and infrastructure; do not depend on a managed identity provider or an external OIDC authority. The protocol design baseline is in `MAATAA-IDENTITY-PROTOCOL-V1.md`. This is a custom security protocol and remains unimplemented; established cryptographic primitives and passkey verification libraries are still required, and independent security review is a hard gate before real accounts.

## Implemented in the current alpha7 tree

- `apps/maataa-auth-api` is one Rust process, bound to `127.0.0.1`, with project-scoped opaque bearer tokens, expiry/revocation, project records, event metadata, and SQLite schema versions 1–2.
- The knowledge slice supports bounded project-scoped objects, relations and assertions with source/method provenance. Assertion status is restricted to `unverified` or `provisional`; there is no mechanism that certifies evidence as true.
- The HTTP process caps concurrent connections at 128, applies a 60-second connection deadline, returns request IDs and basic security headers, exposes liveness/readiness endpoints, and drains connections for up to 10 seconds on Ctrl-C.
- Bootstrap credentials may be loaded from an owner-only secret file; insecure file permissions fail startup. SQLite backup uses the online backup API, validates integrity/schema, enforces owner-only permissions, and refuses overwrite.
- Current local gates: 16 unit tests and the loopback HTTP integration test pass; format, Clippy with warnings denied, and optimized release build pass. These checks use synthetic fixtures and do not establish production security or load capacity.

## Production target architecture

Keep these authorities separate and deployable:

1. **MAATA Auth** owns the MAATA Identity Protocol (MIP), principal, authenticator, session, organization, membership, role, consent and revocation policy. MIP is a first-party protocol, not OIDC. Its v1 design starts with invite-only passkey authentication, opaque server-side sessions, scoped API credentials and owner-operated recovery; it must use established cryptographic primitives and maintained WebAuthn verification libraries rather than handwritten cryptography.
2. **DB Studio** is the reviewed schema, retention and migration authoring surface. It does not write directly to production without a reviewed migration artifact and approval.
3. **DBB/HKDB** is a separate Rust service boundary, outside the MAATA OS kernel. PostgreSQL is the recommended shared production store; SQLite remains for single-user local development. The service owns typed knowledge, relationships, assertions, source/evidence references, lineage, temporal basis, retention, access control, versioning and search. Film scripts and other domain payloads remain owned by their domain apps; HKDB stores approved references and metadata.
4. **MAATA API Runtime** is the versioned API gateway for product clients. It validates the MIP credential/session with MAATA Auth and checks audience, expiry, revocation, scopes and project/tenant policy server-side, then accesses HKDB through its service contract. It does not accept trusted identity from UI-supplied headers.
5. **API Studio** authors versioned OpenAPI/contracts and generates conformance tests. It is not the production API server.
6. **Desktop, MAATA UI, Brahmini and TLPS** use only the API contract for shared records. No client receives database credentials. The OS consumes a narrow status/time adapter; it does not host database drivers or business auth.

Public deployment must sit behind HTTPS ingress, an owner-operated secrets manager and a private service network. It needs structured redacted audit logs, request correlation, metrics/alerts, per-principal and per-IP rate limits, bounded payloads, abuse controls, data-retention policy, tested backup/restore, migration rollback/forward strategy, dependency/SBOM scanning, threat model, penetration review and incident response. A successful compile or local HTTP test is not a release approval.

## Blocking inputs before production implementation

1. **Identity review:** complete and independently review the MIP threat model, exact `auth.allb.xyz` issuer, `allb.xyz` RP ID, ceremony/client-origin separation, TLPS callback/code-exchange rules, recovery ceremonies and protocol schemas before enabling real accounts.
2. **Hosting boundary:** verify registrar/DNS account access for `allb.xyz` and `tlps.in`; select owned server(s), TLS/certificate renewal, DNSSEC/CAA/change process and owner-operated secrets/key manager. The logical domain split is recorded, but it does not close Gate 3.2. Do not expose the current loopback binary.
3. **Data authority:** confirm PostgreSQL as production DBB/HKDB storage and identify the owner/operator of its backups and retention. The current SQLite data is local prototype data and must not be copied into production by default.
4. **Tenant policy:** define organization/project membership, roles, sharing, deletion/retention, and which approved metadata may leave TLPS/Brahmini.

Until those are supplied, the safe and honest status remains: locally tested service prototype; production deployment blocked. First reconcile the exported `staging.nevo.tlps.in` record with the TLPS-only ownership rule. Then continue protocol review and the separate Auth/MIP boundary, followed by PostgreSQL-backed DBB/HKDB and API Runtime, contract conformance, synthetic end-to-end client integration, and an operations/security release gate.
