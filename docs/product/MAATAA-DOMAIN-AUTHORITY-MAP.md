# MAATAA and TLPS domain authority map

**Status:** naming/ownership direction recorded; DNS, TLS and deployment gates remain open.
**Owner direction:** `allb.xyz` is for MAATAA-owned services and authorities; `tlps.in` is for TLPS only. This is a product/authority boundary, not evidence of registrar ownership or a live DNS change.

## Intended public and private names

| Domain | Logical owner | Purpose | Exposure intent | State |
|---|---|---|---|---|
| `allb.xyz` | MAATAA | MAATAA root/landing | Public | Existing zone export has apex/www A records; validate target and ownership before deployment. |
| `auth.allb.xyz` | MAATA Auth | MIP issuer, passkey ceremonies, sessions | Public HTTPS | Proposed issuer; no host/service deployment verified. |
| `api.allb.xyz` | MAATA API Runtime | Protected MAATAA API | Public HTTPS edge, authenticated requests | Proposed; no record/service deployment verified. |
| `hkdb.allb.xyz` | DBB/HKDB | Knowledge authority | Private/restricted | Prefer private DNS and network; no public record. |
| `msg.allb.xyz` | MAATA Messaging | Messaging API/WebSocket gateway | Public HTTPS edge, authenticated requests | Proposed; no service deployment verified. |
| `notify.allb.xyz` | MAATA Notifications | Outbox and delivery workers | Private/restricted | Keep worker/database endpoints private; public callbacks only if a channel requires them. |
| `studio.allb.xyz` | MAATA DB Studio | Schema/migration review | Restricted | Proposed; protect with MIP authorization and operator policy. |
| `apistudio.allb.xyz` | MAATA API Studio | Contract review | Restricted | Proposed; protect with MIP authorization and operator policy. |
| `tlps.in` | TLPS | TLPS root | Public | Existing zone export contains this name; export is archival, not live proof. |
| `app.tlps.in` | TLPS | TLPS web app | Public HTTPS | Proposed; exact hostname/callback must be registered. |
| `api.tlps.in` | TLPS | Separate TLPS domain API, only if needed | Public HTTPS edge, authenticated requests | Optional; TLPS-only data and audience. |
| `nevoevents.in` | NEVO | NEVO root and event platform | Public, by deployment need | Owner reports it is managed through a separate Cloudflare account; account-level access and live records are not independently verified. |
| `*.internal.allb.xyz` | MAATAA service operators | Service-to-service names | Private DNS only | Do not publish public DNS records; enforce private routing and service authentication too. |

The root-domain split is now a recorded owner decision. NEVO's DNS administration is reported to be in a separate Cloudflare account; treat it as an independent administrative boundary and verify authorized operator access there without copying credentials or assuming shared access. Registrar account access, authoritative DNS account access, DNSSEC, CAA, TTL/change policy and service routing still need separate evidence. This does **not** close production roadmap Gate 3.2.

## MIP issuer and WebAuthn binding

- **MIP issuer for the design:** `https://auth.allb.xyz`.
- **WebAuthn RP ID direction:** `allb.xyz`, to allow MAATAA subdomain-wide credentials by design.
- **WebAuthn ceremony origin for v1:** `https://auth.allb.xyz` only. This origin performs the passkey ceremony; TLPS is a registered MIP client, not a WebAuthn ceremony origin in the initial flow.
- **MIP client origins:** enumerate exact deployed origins, initially `https://app.tlps.in` and `https://tlps.in` only if each actually hosts an app. Add MAATAA product origins individually. This list is separate from the WebAuthn origin allowlist.
- **TLPS callback:** exact registered URI `https://app.tlps.in/auth/callback`; no wildcard subdomains or arbitrary redirect URLs.

The RP ID `allb.xyz` is a valid parent RP ID for a WebAuthn ceremony running at `auth.allb.xyz`. It intentionally gives credentials broader scope across MAATAA subdomains than `auth.allb.xyz` would. Keep the ceremony on the central Auth origin for v1. A direct ceremony on `tlps.in` must not be assumed to work with RP ID `allb.xyz`: WebAuthn has a related-origin mechanism, but that needs a well-known allowlist and an explicit browser/platform compatibility test. The central redirect flow avoids depending on it. See the [W3C WebAuthn RP ID and related-origin rules](https://www.w3.org/TR/webauthn-3/#relying-party-identifier).

## TLPS sign-in handoff

1. `app.tlps.in` starts a MIP authorization request to `auth.allb.xyz`, bound to a registered client, exact callback, one-time state and a transaction-specific PKCE challenge.
2. The browser moves to the Auth origin. Its host-only Auth cookie is used there; the passkey challenge and assertion stay on the Auth origin.
3. After authentication, Auth redirects only to the exact TLPS callback with a short-lived, single-use authorization code. The front channel never receives a MAATA API credential.
4. The TLPS backend verifies the returned state, then exchanges the code directly with Auth. The exchange is bound to the client, callback and PKCE verifier; consumption is atomic and replay fails.
5. TLPS creates its own host-only session cookie for `app.tlps.in`. Logout/revocation handling is explicit; the browser never reads an `allb.xyz` cookie.
6. For shared MAATA API use, prefer a TLPS backend-for-frontend (BFF) so browser JavaScript does not hold a long-lived MAATA credential. If direct browser API calls are needed, use a short-lived, narrowly scoped audience token and exact CORS origins; CORS is not authorization.

The one-time code must not become an open redirect or reusable bearer credential. These controls mirror relevant authorization-code threat mitigations such as transaction binding, PKCE, exact redirect matching and replay prevention; MIP remains a first-party protocol, not an OIDC implementation. See [RFC 9700](https://www.rfc-editor.org/rfc/rfc9700.html).

## Cookie, CORS and service-network policy

- Auth cookie on `auth.allb.xyz`: host-only (no `Domain` attribute), `Secure`, `HttpOnly`, `SameSite=Lax`; rotate after sign-in and privilege changes.
- TLPS session cookie on `app.tlps.in`: separate host-only `Secure`, `HttpOnly` cookie, set by the TLPS backend after code exchange.
- Do not depend on cross-domain cookies or `SameSite=None` for the primary sign-in path.
- If browser JavaScript calls `api.allb.xyz` directly, allow only exact registered origins such as `https://app.tlps.in`; do not use `*`. Avoid cross-origin cookies; if cookies are unavoidable, add explicit CSRF controls and exact credentialed CORS. Prefer BFF for long-lived application sessions.
- Each token/credential has an explicit audience. A TLPS-only credential for `api.tlps.in` cannot be treated as a general MAATAA credential for `api.allb.xyz`.
- Public hostnames terminate at a controlled HTTPS edge. HKDB and notification workers should use private DNS/network paths plus authenticated service-to-service transport; DNS privacy alone is not an authorization control.

## What the supplied zone exports establish

The supplied files identify Cloudflare authoritative nameserver names in the exported snapshots. `allb.xyz`'s export lists apex and `www` address records; it does not list the proposed Auth/API/HKDB/messaging/notification/studio hostnames. The newer `tlps.in` export (`tlps.in (5).txt`, export time recorded as 2026-10-09 18:44:27) contains 13 RRsets; compared with `tlps.in (2).txt` (17:54:37), the only owner/type record removed is `staging.nevo.tlps.in` CNAME, and the SOA serial advanced. `staging.tlps.in` remains. Both files are **archival zone exports** that explicitly say they must be edited before production use; they do not prove current live DNS, account/registrar control, TLS issuance, or route health.

The earlier `tlps.in` export included `staging.nevo.tlps.in`; the newer supplied export omits it. This resolves the discrepancy in the **new snapshot only**. It does not prove that a live DNS change occurred or that NEVO staging was moved under `nevoevents.in`; verify the live TLPS zone and the separate NEVO Cloudflare account before closing the ownership item. Do not change or delete DNS based only on either export.

The listed mail records show configuration intent, not successful delivery. The export shows a monitoring-mode DMARC policy; any enforcement change needs sender inventory, report review and a staged rollout. The exports do not establish DNSSEC status, CAA policy, certificate automation, secret storage, firewall rules or private network topology.

## Gate status and evidence still required

| Gate | What the domain decision contributes | What remains before closure |
|---|---|---|
| 3.2 Registrar/DNS | Logical owner split is recorded: MAATAA=`allb.xyz`, TLPS=`tlps.in`, NEVO=`nevoevents.in`; the latest supplied TLPS snapshot omits the earlier NEVO staging CNAME. | Verify registrar and DNS account ownership/access for all three zones; DNSSEC, CAA, TTL/change policy; confirm the old record's live removal and whether NEVO staging now exists under NEVO ownership; verify live records and routes. |
| 3.3 TLS | Names to cover are known. | Select certificate strategy for exact public hosts/wildcards, automated renewal, HSTS rollout, origin TLS and expiry monitoring; prove renewal in staging. |
| 5.2 MIP | Issuer, RP ID direction, central ceremony origin and callback are specified. | Freeze MIP client registry and callback/origin list; implement passkey flow; test RP/origin, callback allowlisting, code replay, PKCE, cookie isolation and revocation. |
| 5.6 Sessions | Host-only Auth and TLPS cookie boundaries are specified. | Implement and test cookie flags, session rotation, CSRF, logout, idle/absolute expiry and back-channel revocation. |
| 7.3 API | Private Auth/HKDB calls and exact browser-origin constraints are specified. | Implement private authenticated service calls; test audience/scope/tenant checks and exact CORS behavior; confirm no browser-held long-lived secret. |
| 9.4 Email | TLPS mail records are present in the supplied export; MAATAA mail authority remains undecided. | Choose whether notifications use separate `notify.allb.xyz`/`mail.allb.xyz`; verify sender inventory, SPF/DKIM/DMARC alignment and real delivery; configure MAATAA DNS only after access and ownership are confirmed. |
| 11.2 Native handoff | TLPS callback and central passkey origin are specified. | Test Electron/Tauri/native browser handoff, one-time code binding, callback restrictions, cancellation and replay rejection. |

No live DNS, TLS, email or identity-provider configuration was changed during this review.
