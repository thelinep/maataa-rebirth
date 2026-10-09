# MAATAA Identity Protocol (MIP) — v1 design baseline

**Status: design draft; not implemented and not approved for real accounts.**

## Ownership decision

MAATAA owns the identity protocol, account model, issuer policy, session lifecycle, authorization vocabulary, key lifecycle, and service implementation. The protocol is not OIDC and does not promise compatibility with third-party identity providers. All identity data and signing/sealing keys stay on owner-operated infrastructure. Cryptographic algorithms and authenticator ceremonies must use established, maintained implementations; MAATAA must not invent cryptographic primitives. This is still a custom security protocol and requires independent threat review before real users or sensitive data.

## Service boundaries

- **MAATA Auth** is the sole authority for principals, authenticators, sessions, recovery, organizations, memberships, grants, revocation and audit events.
- **MAATA API Runtime** authenticates each request from server-verifiable credentials and asks MAATA Auth for current session/token status when needed. UI-supplied identity headers are never authority.
- **DBB/HKDB** stores domain knowledge and provenance, not passwords, authenticators, sessions, recovery material, or API secrets.
- **DB Studio** authors reviewed schema migrations; it cannot silently alter production identity records.
- **Desktop, MAATA UI, Brahmini and TLPS** are clients. They never receive database credentials or signing/sealing keys.

## v1 protocol shape

Use HTTPS with a versioned JSON envelope and stable machine-readable error codes. Every request has a unique request ID, a protocol version, a server response timestamp with an explicit time basis, and strict size limits. The issuer identifier is configured once per deployment and cannot be supplied by the client. Unknown protocol versions, fields that affect authorization, malformed encodings, expired messages and replayed challenges fail closed.

For the current domain direction, the MIP issuer is `https://auth.allb.xyz`. The v1 WebAuthn ceremony runs only at `https://auth.allb.xyz`, with RP ID `allb.xyz` as the owner-selected MAATAA-wide scope. This is broader than using `auth.allb.xyz` as the RP ID and means other MAATAA subdomains are within the credential's potential WebAuthn scope; only Auth should invoke ceremonies in v1. The TLPS app origins `https://app.tlps.in` and, if it hosts a client, `https://tlps.in` belong in the separate MIP client registry, not in the v1 WebAuthn-origin list. The callback is exact: `https://app.tlps.in/auth/callback`.

TLPS login is a top-level redirect to Auth followed by a short-lived, single-use code to the registered callback. Bind the code to the registered client and exact callback, a one-time state value and a transaction-specific PKCE challenge; exchange it server-to-server and consume it atomically. Do not send an access token through the browser redirect. After exchange, TLPS creates a separate host-only session. Never share cookies across the two registrable domains. Direct WebAuthn ceremonies on `tlps.in` are outside the v1 design; the WebAuthn related-origin mechanism would require explicit `.well-known/webauthn` configuration and verified browser support before adoption.

The first human-authentication profile is **invite-only passkey authentication**. It uses the WebAuthn ceremony and maintained platform/library implementations for cryptographic verification; MAATA defines enrollment policy, challenge purpose and lifecycle, origin/RP binding, session issuance, grants, revocation, recovery and audit. A challenge is random, single-use, short-lived, bound to the exact client/origin and intended operation, and consumed atomically. No email or phone provider is assumed. Password login is excluded from v1 until an explicit need and a reviewed password-storage and recovery design exist.

Browser sessions use random opaque, server-side session secrets. Store only a keyed digest; return the raw value once in a `Secure`, `HttpOnly`, host-only cookie with restrictive `SameSite` policy. Rotate after authentication, privilege change and recovery; support idle and absolute expiry, global and per-device revocation, and CSRF protection on state-changing cookie-authenticated requests. Never put credentials in URLs, local storage, logs, analytics or crash reports.

Service/API credentials are a separate profile from human sessions. Start with random opaque, short-lived, project/organization-scoped credentials, stored only as keyed digests, with explicit audience, minimum scopes, expiry, rotation and immediate revocation. Use authenticated private service-to-service transport. Do not treat a long-lived bootstrap secret as a user login. API Runtime must check current authorization on the server for every protected operation.

## Required data and invariants

Persist versioned records for principals, passkey authenticators, challenges, sessions, service credentials, organizations, memberships, grants, recovery events, signing/sealing key metadata and append-only security audit events. Each record has a stable ID, creation/update basis, issuer, status and schema version. Secrets are never stored in plaintext. Cross-organization/project access is denied by default. Recovery, authenticator removal, role changes, key rotation and credential revocation are audited and require step-up proof or an explicit owner-operated recovery ceremony.

Use transaction boundaries to consume a challenge once, rotate a session once, and revoke refresh/session families atomically. Enforce unique credential IDs, origin and RP ID checks, rate limits, bounded request bodies, generic authentication failures, timing-safe secret comparisons, lockout/abuse controls, and race-safe revocation. Keep clocks and authentication state separate: wall time is provenance-labelled; expiry decisions require a monitored host clock and bounded skew policy.

## Implementation sequence and gates

1. **MIP v1 threat model and protocol review:** enumerate attackers, assets, trust boundaries, abuse cases, recovery risks, origin/issuer configuration and operational assumptions. Freeze schemas and error semantics only after review.
2. **Storage and migration boundary:** create a separate MAATA Auth service crate/repository boundary and versioned schema. Add migration checks, backup/restore and integrity tests before account data exists.
3. **Passkey enrollment and sign-in:** invite creation, single-use challenge, verified enrollment/assertion, session rotation, CSRF, logout and replay/race tests. Use maintained WebAuthn and cryptographic libraries; no handwritten crypto.
4. **Authorization and operations:** organizations, memberships, project grants, step-up actions, owner recovery, audit export, key rotation, abuse/rate controls and retention.
5. **API Runtime and HKDB:** separate deployable services, private authenticated service transport, PostgreSQL-backed DBB/HKDB, contract/conformance tests, least-privilege grants and tenant-isolation tests.
6. **Client integration:** Desktop → MAATA UI → Brahmini → TLPS uses one account/session and project authority. Verify native and browser clients, logout/revocation, expiry, recovery and denial paths with synthetic data.
7. **Production qualification:** reproducible self-hosted deployment, TLS, owner-operated secret/key management, least-privilege networking, monitored backups and restore drill, SBOM/dependency review, load/abuse tests, independent security review and incident/recovery runbooks. Only then consider real accounts; only then make a production claim.

## Current implementation versus this target

`apps/maataa-auth-api` is still one loopback-only Rust prototype with bootstrap bearer credentials, project-scoped opaque tokens and local SQLite. It has no passkey ceremony, human session, organization policy, key lifecycle, PostgreSQL, separate DBB service, separate API Runtime, or product-client integration. It is not MIP v1 and must not be exposed publicly or used for real accounts. Existing prototype records are synthetic/local and are not migrated into any future identity database by default.

## Security references

- [WebAuthn Level 3, W3C](https://www.w3.org/TR/webauthn-3/) — authenticator ceremony and relying-party verification baseline.
- [NIST SP 800-63B-4](https://pages.nist.gov/800-63-4/sp800-63b.html) — authenticator and session-management guidance; use as a review input, not a claim of compliance.
- [RFC 9700](https://www.rfc-editor.org/rfc/rfc9700.html) — relevant threat patterns for delegated API credentials, even though MIP is not OAuth/OIDC.
