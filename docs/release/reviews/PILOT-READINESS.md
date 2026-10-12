# Enterprise pilot readiness (gate 6)

**Prepared:** 2026-10-12 · **Candidate:** `5bc8c7b8` · **Status:** NOT_RUN. Charters: [`2026-10-08-charters-and-rehearsal.md`](../../pilots/2026-10-08-charters-and-rehearsal.md).

A pilot here means a real application consuming the **packed** `@maataa/ui` candidate through its **stable** exports only (`manifests/STABLE_API.json`), in an isolated non-production tenant, with named people and owner acceptance. The TLPS demo surfaces in this repository are not the pilot; the TLPS application is outside release scope and acts only as a consumer.

## TLPS (selected first pilot) — what is still missing

| Item | State | Who |
| --- | --- | --- |
| Pilot authority | Hemant Kumar Dixit (chat, 2026-10-08) | — |
| Integration lead, pilot operator, privacy reviewer | TBD | TLPS owner to name |
| Participants (2 producers, 1 independent owner/reviewer, 2 crew/evidence reviewers) | Roles approved; people not named | TLPS owner |
| Tenant `TLPS-PILOT-SANDBOX-01` | Designated; not provisioned or verified | TLPS host team |
| Host integration (identity, tenant, authorization, review service, export) | NOT_RUN | TLPS engineering |
| Integration uses only stable exports | Not checked | Integration lead — compare the app's `@maataa/ui` imports with `STABLE_API.json` |
| Measures and thresholds | Approved in the charter | — |
| Run against an exact candidate build and record results | NOT_RUN | Operator |
| Owner acceptance of the results | NOT_RUN | Pilot authority |

## Second, structurally different application

Required for Beta 2 / multi-product acceptance. NEVO Events is an unselected candidate. A suitable second pilot:

- has a different domain and workflow shape from TLPS (for example event operations, finance review, or developer evidence);
- has its own named application owner who approves a charter;
- can run in an isolated tenant with synthetic or approved minimal data;
- integrates through the stable exports only.

```
Second pilot: NEVO / other: ________        Owner:        Charter approved on:
```

## Pilot record (per pilot)

```
Application / host commit:        @maataa/ui candidate commit and tarball sha256:
Tenant / environment:        Participants (roles):        Dates:
Task results vs thresholds:        Defects (severity):        Upgrade/extension notes:
Owner disposition: ACCEPT / ACCEPT WITH CONDITIONS / REJECT        Owner:        Date:
```
