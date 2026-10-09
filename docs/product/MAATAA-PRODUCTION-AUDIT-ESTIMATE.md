# MAATAA production services — audit and effort estimate

**Prepared:** 2026-10-09
**Status:** planning estimate from the current local checkout; not a quote, schedule commitment, or production-readiness claim.

## Executive assessment

There is a useful local Rust foundation, but not yet a deployed identity or service platform. The current service combines prototype Auth/API/project records and a small HKDB-shaped metadata slice in one loopback-only SQLite process. The first-party MAATAA Identity Protocol (MIP) and wider production roadmap are design drafts. Human sign-in, PostgreSQL, separate DBB/HKDB and API services, messaging, notifications, client integration, and production deployment are not implemented or verified.

For the self-hosted scope described in `MAATAA-PRODUCTION-SERVICE-ROADMAP.md`, estimate **187–340 experienced engineering person-days remaining**, plus owner infrastructure setup and an independent security review. A realistic elapsed range is **about 5–9 months with three experienced product engineers and part-time platform/security support**, assuming decisions arrive promptly and the scope stays bounded. One engineer working alone is roughly **9–17 months** before external review and operational waiting time. Treat the upper half as more credible until the threat model, message encryption, load targets and owned hosting are decided.

## What was checked now

- Fresh local validation: 13 library tests, 3 executable/startup tests and 1 isolated loopback HTTP integration test passed. `cargo fmt --check`, Clippy with warnings denied, and the optimized release build passed.
- The HTTP service remains loopback-only and uses synthetic/local SQLite data. These checks do not demonstrate public deployment, human authentication, PostgreSQL behavior, production capacity or security certification.
- The current checkout has 58 modified or untracked paths. Many are unrelated Desktop/TLPS/Workbench work; they have not been treated as Auth/DB/API completion and were not staged by this audit.
- No separate deployed MAATA Auth, DBB/HKDB, API Runtime, messaging or notifications service was found in the reviewed source/evidence set.
- The owner assigned `allb.xyz` to MAATAA, `tlps.in` to TLPS, and `nevoevents.in` to NEVO, which the owner reports is managed through a separate Cloudflare account. Supplied files are archival DNS-zone exports; they do not verify live records, registrar access, TLS automation or Gate 3.2. The newest TLPS export omits `staging.nevo.tlps.in`, which appeared in the earlier export; live removal and any migration to NEVO's domain remain unverified.

## Gate-by-gate remaining effort

Ranges are person-days, not calendar days. Each estimate includes implementation and focused verification for that gate, but not waiting for the owner to provision infrastructure or approve policy.

| Gate | Remaining work | Person-days |
|---|---|---:|
| 0. Authority/source inventory | Freeze current tree, verify canonical locations, data ownership and migration boundary. Existing maps help, but exact release baseline is not closed. | 1–3 |
| 1. Product and security requirements | Data classification, tenancy, retention, abuse model, RPO/RTO/SLO, expected load, incident roles and message-encryption decision. | 6–12 |
| 2. Protocol and contracts | Finish MIP state machines and threat review input; finalize API, events, HKDB, messaging and notification schemas and conformance fixtures. Drafts exist; protocol review and frozen contracts do not. | 5–10 |
| 3. Owner-operated platform | Hosts/environments, DNS/TLS, secrets/keys, private networking, deploy definitions, CI/SBOM, logs/metrics/alerts. | 10–20 |
| 4. PostgreSQL and recovery | Roles/databases, migration discipline, tenant constraints, backup/WAL/PITR, isolated restore, failover and capacity tests. | 12–22 |
| 5. MAATA Auth and MIP | Separate service/store, passkey enrollment/sign-in, secure sessions, CSRF, organization/project grants, recovery, revocation, audit, abuse controls and independent protocol/security review preparation. | 35–60 |
| 6. DBB/HKDB | Separate Rust service, typed knowledge/provenance model, tenant authorization, history/conflicts, bounded retrieval, migration/import/export and audit. | 20–35 |
| 7. API Runtime and Studios | Separate API, Auth/HKDB integration, versioned contracts, limits/idempotency, conformance, DB Studio migration proposals and API Studio authoring. | 25–40 |
| 8. Messaging | Separate message store/service, access checks, delivery/reconnect semantics, encryption policy implementation, abuse/reporting, retention and tests. | 20–35 |
| 9. Notifications | Preferences, in-app delivery, outbox/retry/dedupe, owner-operated email option, optional platform push adapters and privacy/outage tests. | 10–18 |
| 10. Event integration | Transactional outbox/inbox, event ownership/compatibility, tracing, replay and crash/duplicate tests; broker only if measured needs warrant it. | 8–15 |
| 11. Desktop and product clients | Credential storage, passkey handoff, shared sessions/scopes, TLPS project round-trip, Electron/Tauri parity, revocation and accessibility E2E. | 15–30 |
| 12. Production qualification | Fuzz/security/load/soak/chaos tests, penetration assessment, restore/incident drills, exact-commit evidence, canary and rollback. | 20–40 |
| **Total** | **All listed services and their first production qualification** | **187–340** |

### Staged delivery estimate

- **Private alpha vertical slice:** narrow MIP/Auth, PostgreSQL, minimal DBB/API contracts, and one synthetic Desktop → MAATA UI → TLPS flow, with baseline deployment and recovery checks: approximately **110–200 person-days**. It remains a private alpha, not public production.
- **Full service platform:** add separately operated DBB/HKDB, messaging, notifications, client parity, observability, security review and recovery qualification: the full **187–340 person-day** range above.
- **Independent review and owner setup:** reserve **2–6 calendar weeks** for security review/remediation cycles and infrastructure/domain/TLS provisioning; some of this can overlap with engineering, but it cannot be eliminated by passing unit tests.
- **Contingency:** if review changes the custom MIP, message encryption must be end-to-end, or native passkey support requires client-specific workarounds, plan an additional **20–40%**. External regulatory certification, 24/7 staffing, mobile apps, and guaranteed push delivery are not included.
- **Planning envelope with contingency:** approximately **225–475 person-days**. This is a risk reserve over the engineering range, not a vendor quote.

## Token-count and cost interpretation

- **MAATA auth/API credentials:** no fixed token count can be chosen before expected users, devices, service workloads, session lifetime and revocation policy are known. For sizing, count concurrent human sessions by active devices, then add separately issued service credentials. Passkeys themselves do not create a monthly provider token allotment.
- **LLM token budget:** this Auth/API/database roadmap does not specify any model calls, so an LLM input/output token count cannot be responsibly estimated from it.
- **Money estimate:** no currency total is defensible until host count/regions, storage/backup retention, traffic, team rates and independent review scope are supplied. Calculate as engineering person-days × loaded daily rate, plus owner-operated infrastructure, backups, monitoring, independent review and ongoing on-call/support.

## Main sources of schedule risk

1. MIP is custom security protocol work. The MAATA semantics can be first-party, but cryptographic primitives and passkey verification should use maintained implementations; independent review and remediation are mandatory before real accounts.
2. “Production” is not measurable until SLO, RPO/RTO, data retention and incident coverage have numeric owners.
3. E2EE materially changes search, moderation, recovery and key management in messaging; decide before storing real message content.
4. Mobile push depends on Apple/Google delivery infrastructure even when MAATA owns its service and data. This estimate treats it as optional and does not promise provider-independent push.
5. The working tree is dirty. A production release needs an exact reviewed commit and evidence tied to that commit; the existing 58 changed paths must be separated into intended release groups first.

## Next execution order

1. Close Gate 0: freeze the exact source baseline and confirm canonical service boundaries.
2. Close Gate 1: approve data, tenancy, message-encryption, SLO and recovery requirements.
3. Freeze MIP/API/HKDB/event contracts and obtain a threat-model review before the human-auth implementation.
4. Provision owned test infrastructure, then implement PostgreSQL, Auth/MIP, DBB/HKDB and API in dependency order.
5. Add messaging and notifications only after event, retention and encryption policy is fixed.
6. Integrate Desktop/MAATA UI/Brahmini/TLPS with synthetic data; finish independent review, restore drills and exact-commit release gates.

**Release conclusion:** the prototype has passed its local engineering gates, but none of the production service gates is closed. Do not expose the current process publicly or store real identity, customer, message or production knowledge data in it.
