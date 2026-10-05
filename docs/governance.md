# Enterprise release governance

This policy defines the release process; it does not appoint an owner or certify GA.

| Contract | Policy or current evidence |
| --- | --- |
| SemVer and canonical IDs | docs/versioning-policy.md; persisted IDs are never silently renamed or reused |
| Deprecation | At least two minor releases and six months before stable removal in a major release; urgent security exceptions require release notes |
| Browsers | Automated Chromium, Firefox and WebKit desktop/small viewport matrix; real-device and assistive-technology approval separate |
| React | Declared peer range 18.2 to below 20; packed fixtures target React 18.2 minimum peer and React 19; browser interaction matrix currently uses React 19 |
| Next.js | App Router packed fixture pinned to 16.3.8; no universal Next version support claim |
| Node | Declared Node 20 or newer; current execution environment recorded in each pack; packed SSR imports also target Node 20.0.0; full toolchain qualification on the minimum remains separate |
| Security | Private reporting channel, triage owner and response commitments must be appointed before GA |
| Vulnerabilities | Known moderate-or-higher audit findings block qualification until patched or owner-assessed; urgent critical/high issues receive immediate triage |
| Release ownership | Unassigned; an accountable human release owner must approve publishing and evidence acceptance |
| Breaking changes | Owner approval, migration notes, saved-spec tests and major version for stable contracts |
| Patch releases | Repeat relevant regressions, complete exact-commit certification, preserve prior tags and artifacts |
| LTS | No LTS commitment until an owner approves duration, maintenance resources and supported version lines |
| Dependencies | docs/security/dependency-policy.md; frozen lockfile, audit, license review, SBOM and hashes |
| Accessibility | Target WCAG 2.2 AA; automated checks and critical interaction contracts are evidence, not a conformance determination |
| Release freeze | Reviewed API/schema/canonical-ID freeze required before RC; classifications remain experimental until approved |

A candidate may receive an alpha feature tag after its applicable automated gates pass for the exact clean commit. Beta acceptance additionally requires qualified packaging and a reviewed security baseline. Beta 2 requires real, structurally different product pilots. RC and GA require the full manual and external acceptance record as well as automated PASS.

Do not substitute example surfaces for real enterprise pilots. Event/operational, finance/review and developer/evidence classes are proposed pilot categories; no application has been selected or validated by this document. Pilot evidence must measure upgrades, extension without forks, bounded planner determinism, device adaptation, registry stability, runtime performance and developer experience.

Release tags are immutable. The alpha8.6 frozen baseline stays at 7e75dd421a5f1df83ceb9dc2cc65bce12561719b. Remote protection settings and controlled publishing require repository-host evidence. Local tag presence does not prove either. Package versions change only in a dedicated qualified release step; the current alpha.8.4 package version remains deliberate release debt until then.
