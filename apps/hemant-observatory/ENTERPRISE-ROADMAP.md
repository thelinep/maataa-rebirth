# Hemant Samwat: enterprise delivery roadmap

Status: an evidence-labelled local roadmap and browser-local Kanban are implemented. This plan is not a production-readiness certificate, a customer commitment, or a deployment authorization.

## How to use the board

- Open `/roadmap` for the Kanban and `/roadmap/plan` for the full atomic checklist.
- The canonical task definitions, initial statuses, acceptance conditions, owner inputs and dependencies are in `lib/enterprise-roadmap.ts`.
- Board updates live only in this browser's localStorage. They do not sync to another person or device and are not an audit log.
- Moving a task to **Evidence-backed** requires an evidence note. Existing baseline tasks link to checked-in project evidence and cover only the prototype scope. New notes entered by a board user are self-reported until independently reviewed.
- No task is “production complete” solely because its card moved. Release approval is a separate gate with customer, science, security and operations evidence.
- Buyer choice, customer discovery, commercial packaging and customer-pilot/release tasks are intentionally in **Deferred until product is built**. This is a sequencing decision, not completion: the technical science, security, platform and hosting work remains active or blocked on its actual technical inputs.

## Ordered delivery gates

1. **Technical baseline** — preserve capability boundaries and evidence; reproduce a clean build, tests, local runtime preview and evidence bundle from one exact source revision.
2. **Scientific qualification** — establish clock error budget, time-scale transformations, coordinate/frame conventions, independent ephemeris comparison, named Panchanga profiles and field-level vectors, separately-qualified Sankranti observance, and mission-specific SCLK correlation where demanded.
3. **Platform, data and security** — map MAATAA/TLPS authorities, threat model, specify and review MIP, implement account/passkey lifecycle, establish PostgreSQL/HKDB authority, type and version API contracts, audit/retention controls, key custody, backup/restore and licenses.
4. **Integrations** — connect the versioned Hemant clock source to MAATA OS; integrate Desktop, MAATA UI and TLPS through approved identity/API contracts; add reproducible exports.
5. **Hosting and operations** — confirm owned Cloudflare zone and target topology, DNS/TLS, monitoring/on-call, recovery and exact-revision release automation. Customer-agreed SLOs stay deferred until a pilot is selected; infrastructure and technical observability work can proceed now.
6. **Technical governance and readiness** — prepare data maps, threat/control evidence, audit and recovery mechanisms, and a truthful technical capability matrix. Customer jurisdiction review and accepted support commitments wait for a selected pilot.
7. **Optional technical services** — build messaging and notifications only when their technical need is established; decide encryption and delivery guarantees before implementing outbox, retries, preferences, privacy and operations telemetry.
8. **Deferred: customer discovery and offer** — after the technical product baseline is built, choose a user/budget owner, conduct consented interviews, measure a real problem, define pilot exit criteria and cost delivery before pricing.
9. **Deferred: packaging and market access** — after the technical baseline and buyer problem are known, select a truthful offer, validate a buyer-specific demo, prepare procurement materials and check academic/IN-SPACe/SpaceTech routes.
10. **Deferred: customer pilot and production release** — after a pilot is selected, deploy a bounded non-flight-critical workload, close customer-scoped defects/reviews, freeze one candidate and obtain named approvals.

The board breaks these gates into individual tasks with explicit dependency links and acceptance criteria. Buyer selection and customer-facing work are visibly deferred by the user’s sequencing decision; technical science, mission, jurisdiction, hosting and commercial-license gates keep their real owner/external inputs and are not silently deferred or marked complete.

The broader MAATAA initiative map and the deeper self-hosted Auth, DBB/HKDB, API, messaging and notifications plan remain in the product authority documents: [Phase Zero authority baseline](../../docs/product/PHASE-ZERO-AUTHORITY-BASELINE.md), [MAATAA production-service roadmap](../../docs/product/MAATAA-PRODUCTION-SERVICE-ROADMAP.md), [domain authority map](../../docs/product/MAATAA-DOMAIN-AUTHORITY-MAP.md), and [Auth/DB/API production gates](../../docs/product/AUTH-DB-API-PRODUCTION-GATES.md). This Observatory board turns the enterprise-delivery path into visible tasks; those architecture documents remain the detailed authority for the shared MAATAA services.

## Plausible first offers and limits

- A research/education workbench for reproducible time and astronomy exploration is the nearest plausible pilot, after science vectors and user workflows are validated.
- An observatory toolkit can compare named calendar profiles only after each profile has its own sources, reference cases and tolerances.
- A ground-data adapter needs mission-approved products, full coverage and differential tests; the current Mars 2020 V19 subset is archival and explicitly not an operational correlation.
- Flight or navigation software is a separate safety-critical effort. The present software has no sensor ingestion, sensor fusion, orbit determination, attitude estimation, target-hardware qualification or flight assurance evidence.

NAIF describes SPICE as mission geometry and observation planning/analysis infrastructure and explicitly says SPICE is not an orbit determination, trajectory propagation or attitude estimation solution. This roadmap keeps that product boundary explicit: [NAIF SPICE overview](https://naif.jpl.nasa.gov/naif/spiceconcept.html), [NAIF limitations](https://naif.jpl.nasa.gov/naif/about.html).

For India-first discovery, official paths worth evaluating—not assumed sales, funding or eligibility—include [ISRO Academia](https://www.isro.gov.in/academia.html), [ISRO RESPOND](https://www.isro.gov.in/SponsoredResearch.html), [IN-SPACe](https://www.inspace.gov.in/), [SpIN](https://www.isro.gov.in/Spin.html), and [NSIL](https://www.isro.gov.in/ISRO_EN/NSIL.html). Recheck current calls, eligibility, procurement and dates before investing effort.

## Current verified boundary

The checked-in project notes describe a local prototype with Rust clock/time conversion, Worker packaging/preview, a bounded JPL angle-to-instantaneous-tithi/karana slice, an assumptions-only calendar comparison, and a bounded archival Mars 2020 clock sample. Evidence recorded in `PROGRESS.md` and `SCIENTIFIC-VALIDATION.md` is local and snapshot-specific. It does not prove a production service, continuous clock discipline, complete Panchanga, live spacecraft link, enterprise control set, external customer validation, or public release.
