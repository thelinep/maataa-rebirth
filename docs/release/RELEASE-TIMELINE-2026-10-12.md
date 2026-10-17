# Release timeline and sequence — 2026-10-12

This is a planning sequence, not release evidence or approval. Calendar duration depends on reviewer, device, pilot, repository-admin, and CI availability. The release scope in the current acceptance addendum is the private `@maataa/ui` package only. Hemant, Desktop, TLPS/TLP Film applications, Auth/API, Support Center, Brahmini, Workstation, and other applications remain outside this package's release claims. TLPS may be a pilot consumer without entering the package release scope.

## Starting snapshot

- Branch: `feat/alpha8.7-composition-kernel`.
- Observed HEAD: `ff908c17b5d5dba865cde17ea16af531f97b5120`.
- The worktree was dirty at planning time; changes are not covered by the saved release pack.
- The newest saved enterprise qualification is for `255854d577870fbc25b8c20ca2e515a9fa700566`; it does not qualify HEAD or later changes.
- The 2026-10-12 acceptance addendum reports missing local `vitest` and `tsc` launchers after the offline store lacked `semver@6.3.1`. No install retry or network fetch is planned by this timeline.
- Existing release tags are immutable. `1.0.0-alpha.8.4` remains documented release debt until the dedicated qualified release step.

## Ordered phases

| Phase | Work | Exit evidence | Owner / dependency |
| --- | --- | --- | --- |
| **0. Reconcile release decisions** | Reconcile the newer acceptance-status addendum with the older acceptance packet. Confirm one current record for package scope, supported family/environment matrix, performance thresholds, and API/schema freeze. Keep application products outside this package's claims. | Dated, internally consistent decision record tied to the intended candidate scope. | Release owner. The records currently differ on whether performance thresholds are selected or deferred, and whether support-matrix acceptance is formal. |
| **1. Review current dirty changes** | Review the uncommitted Auth/API and Desktop IPC changes, screen-reader review update, product PRD, acceptance addendum, and security note. Run their scoped checks, stage only approved release-related changes, and create a clean commit. | Reviewed diff, scoped checks recorded, clean committed tree. | Engineering/release owner. Do not include unrelated work. |
| **2. Restore qualification environment** | Make the pinned dependencies and tools available from a populated local store or an authorized CI runner. Preserve lockfiles unless a separately reviewed dependency change is needed. | `vitest`, `tsc`, and all configured certification tools resolve on the intended runner. | Environment/CI maintainer. Current local store is missing `semver@6.3.1`; no offline retry is scheduled by this plan. |
| **3. Freeze exact candidate and certify automation** | Select a clean commit after phases 0–2 and run `pnpm certify:enterprise`; verify the generated evidence pack, source integrity, checksums, and recorded exit status. | Evidence pack names the exact commit and clean tree. Exit 1 means an automated gate failed. Exit 2 means automated gates passed but release acceptance remains blocked. | Engineering + release owner; depends on phase 2. |
| **4. Complete human and external reviews in parallel** | Against that exact candidate: legal/license review; screen-reader review; real-device review; performance measurement against approved thresholds; TLPS pilot and a structurally different second pilot; signed API/schema acceptance; private security-reporting channel activation and monitoring; remote tag protection verification. | Each review has a named responsible person, candidate commit, evidence, findings, and disposition. | Legal reviewer, accessibility reviewer, device reviewers, pilot owners, release owner, security/repository administrators. Availability and external access determine elapsed time. |
| **5. Resolve findings and recut if needed** | Triage review findings. Fix required code or documentation issues. Any changed candidate invalidates candidate-specific review and certification evidence where affected; repeat reviews and full certification on the final clean commit. | All required evidence references one final candidate and matching package checksum. | Engineering and each affected reviewer. |
| **6. Step 32 — Alpha promotion decision** | Confirm candidate scope, exact clean commit, and the dedicated version/tag decision. Never move existing tags. | Recorded release-owner decision; version change and any new tag occur only in the dedicated qualified release step. | Release owner; depends on exact-candidate qualification. |
| **7. Steps 33–35 — Beta 1, pilots, Beta 2** | Complete Beta 1 packaging/security and applicable legal, accessibility, and device acceptance. Run both pilots against the qualified candidate, collect predeclared measures and owner dispositions, then assess Beta 2 entry. | Accepted pilot results from TLPS and a selected structurally different application; performance and developer-experience evidence. | Pilot owners and release owner. TLPS tenant and named participants, plus the second pilot owner/application, are external prerequisites. |
| **8. Steps 36–37 — API/schema freeze and RC1** | Record the final approved API/schema compatibility and migration commitments. Close release ownership, private reporting/response commitments, remote protection, supported-version acceptance, and controlled-publisher configuration. | All RC1 gates have accepted evidence; reporting is live and monitored; publisher and repository controls are verified. | Release owner, security owner, repository admin, authorized publisher. |
| **9. Step 38 — Fresh final certification** | Run the full certification suite on the exact clean RC commit after all required code/configuration changes. Verify evidence hashes and candidate identity. | Fresh complete evidence pack passes and matches the final candidate/artifact. | Engineering/CI; no earlier pack substitutes for this run. |
| **10. Step 39 — Enterprise 1.0 GA** | Release owner reviews the RC evidence and records the final disposition. Publish only through the authorized publisher with provenance; record the published artifact hash. | Owner approval and qualified publication evidence. | Release owner and controlled publisher. No GA claim before these records exist. |

## Parallel work and critical path

Phases 0–3 are sequential: decisions and the current tree must be reconciled before a clean candidate can be certified. Phase 4 reviews can proceed in parallel only after the candidate is frozen. Pilot provisioning, legal review, device access, repository administration, and security-channel monitoring are the likely calendar-critical dependencies. Phase 5 can send the work back to phase 3 whenever fixes change the candidate.

The shortest credible path is therefore:

```text
Reconcile records → review/commit dirty changes → unblock qualification runner
→ clean candidate → automated certification → parallel human/external reviews
→ findings and recertification if needed → Beta/pilots → RC controls
→ fresh RC certification → owner disposition → controlled GA publication
```

## Gate interpretation

- A test pass is evidence for the command and revision that ran it; it is not a human approval.
- `pnpm certify:enterprise` exit 2 means automated gates passed while manual/external acceptance remains blocked. It is not release certification.
- Historical packs are commit-scoped. The saved `255854d` pack does not qualify `ff908c17` or the dirty worktree.
- Performance thresholds in the current addendum are proposed acceptance goals until their conflicting older status is reconciled and representative-device measurements are recorded.
- A selected security-reporting option is not an active route until an administrator enables it and monitoring/notifications are verified.
- No phase in this document establishes production deployment, scientific validation, hardware-clock verification, legal approval, pilot acceptance, or residency.

## Current blockers to scheduling

1. Dirty worktree and no clean candidate for the current changes.
2. Local qualification tools unavailable because the cached dependency store is incomplete; requires a populated store or authorized CI runner.
3. Release records need reconciliation for support-matrix acceptance and performance-target disposition.
4. Human/external reviewers and physical devices must be scheduled.
5. TLPS pilot operators/participants and sandbox, plus a second pilot application and owner, are not yet recorded as ready.
6. GitHub private reporting activation/monitoring, remote tag protection, controlled publisher, and release-owner disposition remain to be evidenced.

## Source records

- [Acceptance gate status addendum](ACCEPTANCE-GATE-STATUS-2026-10-12.md)
- [Release readiness](RELEASE-READINESS.md)
- [Manual and external acceptance packet](ACCEPTANCE-PACKET.md)
- [Completion matrix and steps 32–39](COMPLETION-MATRIX.md)
- [Certification evidence rules](EVIDENCE.md)
- [Governance](../governance.md)
