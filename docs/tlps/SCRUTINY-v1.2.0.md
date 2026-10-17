# Scrutiny of the pasted v1.1 audit and v1.2 completion claims

17 October 2026. Inputs: user-pasted historical audit/completion narrative and supplied `TLPS_Schema_Grouped_English_v1.2.0.json`. Current application backend is a different, bounded schema; the proposed 169-table design is not installed there. No application database or supplied source file was modified.

## Verdict

**v1.2 improves the baseline but does not close the integrity audit.** Counts and selected guards are reproducible. Approval project/resource ownership, durable decision history, version deletion protection, evidence/deal-room scoping and append-only audit remain incomplete. The “implemented” narrative must be read as proposed schema work, not working platform implementation or production acceptance.

## Reproduced findings

All probes used disposable in-memory SQLite with foreign keys enabled and synthetic accounts, workspace, two projects, files/versions and deal room. `scripts/tlps/audit-proposed-schema.py` recreates the checks; `PROPOSED-SCHEMA-AUDIT-EVIDENCE.json` records results.

| Priority | Finding | Reproduction / consequence |
|---|---|---|
| High | Approval accepts a version from another project and another file | Project p1 approval for f1 accepted file version vf2 belonging to p2/f2. Trigger checks existence/type, not the approved resource/project relationship. |
| High | Approved version can be deleted | Deleted vf1 after approving it. Polymorphic version_id has no foreign key; UPDATE immutability alone leaves a dangling approval. |
| High | Approval decision is mutable | Approved row accepted status→pending and rewritten note. Pin immutability does not preserve the approval decision. |
| High | Deal-room document accepts another project's file | Room in p1 accepted f2/vf2 from p2. File/version match is enforced; room/project/file authorization consistency is not. If external sharing is intended, require an explicit grant rather than treating this as automatically authorized. |
| High | Evidence project/file and link scope can diverge | Evidence for p1 accepted p2 file; an evidence link for p2 accepted p1 evidence. Valid foreign keys do not establish scope consistency. |
| High | Audit is mutable/deletable | Both UPDATE and DELETE on audit_log succeeded. Source contains no append-only protection for it. |
| Medium | Payment reference deduplication has NULL-provider hole | Two rows with identical external_reference and NULL provider_key succeeded under the composite UNIQUE. |
| Important | Version immutability means UPDATE only | file_versions UPDATE rejected, DELETE accepted. Deletion/retention policy and pinned-reference protection need explicit handling. |

These are direct database invariants missing from this supplied design. An application could reject them, but no corresponding service code was supplied to demonstrate that. Authorization remains mandatory even after database constraints are fixed.

## Claims verified

- 169 tables, 279 explicit indexes and 42 triggers assemble successfully in SQLite.
- Foreign-key check is clean **after the synthetic probe fixture**, including the unchanged legitimate records. A clean FK check does not catch polymorphic ownership/dangling-pointer issues shown above.
- 378 FK child-column entries; 84 lack a leading index under the stated single-column heuristic. This matches the pasted claim. It is not a workload performance benchmark or a requirement for 84 standalone indexes.
- Mismatched OS type versus project_kind is rejected.
- Membership without a canonical role is rejected by triggers even though role_id is nullable in DDL. Calling the field nullable alone is therefore insufficient to claim new writes bypass the guard.
- Approval of a nonexistent version is rejected.
- File version updates are rejected.
- Deal-room document triggers validate file_version_id belongs to file_id. That narrower guarantee does not imply room/project scoping.

## Claims not established from available artifacts

| Claim | Evidence boundary |
|---|---|
| 19 roles, 20 permissions, 151 mappings seeded | JSON declares counts; it provides no row INSERTs/payloads. Reconstructed schema installs zero rows in those catalogues. This does not prove the separate ZIP lacked seeds; that ZIP was not available in the inspected Downloads inventory. |
| Three migration/integrity tests pass | Historical narrative only. No referenced test suite/results/source runner supplied here. |
| v1.1→v1.2 migration preserves recognizable approvals and flags uncertain ones | Runner, original v1.1 database/schema and representative upgrade fixtures unavailable. Cannot verify preservation, rollback or issue flagging. |
| SQL hash matches snapshot | Source SQL file unavailable; cannot compare its raw-byte SHA-256 against source_sql_sha256 from this grouped JSON. Reassembled JSON DDL is not the same byte stream. |
| v1.0 upgrade path | Explicitly excluded by the pasted narrative; remains unimplemented/unverified. |
| SCHEMA.md evidence wording fixed | Referenced original SCHEMA.md unavailable here. Cannot confirm that documentation correction. |
| v1.1 counts and 294/377 missing indexes | Original v1.1 artifact unavailable; no independent reproduction of historical numbers. |
| 228 implemented pages/routes | Files explicitly distinguish prototype/generic/planned scope. Route records and frame descriptions do not prove working interactions or backend services. |

## Recommended correction order

1. Enforce same-project/resource approval resolution for each supported version type; bind decision records to the exact resource and immutable version. Consider typed association tables or complete INSERT/UPDATE/DELETE guards for polymorphic references.
2. Protect approved decisions and referenced versions against update/delete/reparenting, including parent cascades. Record a new decision/supersession rather than rewriting history. Test status downgrade→pin rewrite bypasses explicitly.
3. Define deal-room external-sharing policy. Enforce project ownership by default; allow cross-project documents only with explicit verifiable grants. Add evidence item/file and evidence-link ownership guards.
4. Make audit append-only at the database boundary and redact sensitive before/after metadata at the service boundary. Retention deletion needs a separately controlled policy, not accidental application CRUD.
5. Require provider identity or a deliberate NULL-provider uniqueness rule for external payments; define amount/status/reconciliation rules separately.
6. Supply actual seed rows and migration runner/tests. Test v1.1 upgrade with valid, invalid, ambiguous and cross-project historical approvals; failed migration rollback; seed idempotency; repeated upgrade; restore and v1.0 rejection.
7. Add multi-tenant service tests covering read/write/list/export, invitation redemption, grants, revocation, role scope and inaccessible resource lookup. Database tests do not replace endpoint authorization tests.
8. Use real query plans to prioritize the 84 remaining index candidates; then test booking overlaps, rights totals/windows, capacity/check-in and invoice/budget reconciliation as explicit transactional contracts.

## Relationship to the current TLPS pilot

The current pilot has its own project tokens, membership roles, versioned entity storage and append-only audit tables. Its stage review pins a project-profile version, not these proposed immutable file/creative/proposal records. Passing the pilot tests does not validate this normalized design; fixing this design does not automatically migrate or certify the pilot. Keep both release evidence sets separate.

No SQL changes are proposed for automatic application by this audit. The next implementation should first locate the original v1.2 ZIP and v1.1 migration inputs, then add a new revision with regression tests rather than silently modifying an applied migration.
