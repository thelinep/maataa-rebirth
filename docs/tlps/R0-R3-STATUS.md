# TLPS R0–R3 execution status — 17 October 2026

Target requested: Cloudflare > tlps.in. This is a bounded administrator-provisioned planning pilot; full public-account/organization/MFA/file-upload scope is not complete.

| Phase | Delivered | Remaining gate |
|---|---|---|
| R0 | Contract decisions recorded in R0-CONTRACT.md; canonical project routes, vocabulary, stages, scope/exclusions defined | Dirty source boundary still needs scoped commit/review; release-owner acceptance not recorded |
| R1 | Connected Projects list/detail; twelve database record families; memory-only project tokens; onboarding/production editing; version conflict recovery; audit/export; explicit not-found; proxy integration | Browser-local demos are not auto-migrated; project creation remains administrator-provisioned; no public signup |
| R2 | Managed project owner/editor/reviewer/viewer membership; inactive-member denial; private administration; independent version-pinned profile-stage review; tasks/milestones/support records; server audit | Organization/self-service account management, MFA and file bytes/versioning excluded; review pins profile version, not whole production plan; manual pilot acceptance pending |
| R3 | Production build origin, dedicated Cloudflare tunnel, active-zone inspection, private DNS rollback snapshot, backup integrity/restore inspection, runbook and local acceptance | Live apex cutover blocked by automatic approval review; no public HTTPS acceptance, supervised always-on origin, off-site backup policy, retention duration, incident owner or signed go/no-go yet |

## Verification on current working tree

- Rust: 75 library + 3 runtime + 1 existing HTTP + 19 TLPS HTTP tests = **98 passed**.
- Typed data client: **10 passed**.
- Real Chromium: **3 passed** on the final build. Covers actual database persistence/reload, stale-version draft preservation/recovery, separate reviewer advancement, task/support persistence, export, mobile/desktop overflow, explicit not-found and public-proxy restrictions.
- Total automated cases: **111 passed**. Not a whole-product certification.
- TypeScript demo typecheck and Rust all-target Clippy warnings-denied passed.
- Production UI build passed, with an existing large-chunk warning; no whole-product performance acceptance claimed.
- Independent finish review: first pass identified sticky-header overlap and misleading demo scope. Both fixed and recaptured; verdict **ship at the scope of those two fixes**.
- Backup `.local/tlps-api/pilot-acceptance-backup.sqlite3`: SQLite integrity ok; pilot memberships/work items readable. Full backend suite also contains backup-restoration tests.

Evidence logs, captures, credentials, database and DNS rollback snapshot are private under `.local/tlps-api/`, excluded from Git. Test access uses synthetic identities and short-lived tokens. The database now contains provisioned pilot/test projects; the earlier zero-project initialization report describes its earlier state.

## Cloudflare and DNS

Read-only account inspection found an active tlps.in zone and an existing apex CNAME pointing to NEVO production tunnel `40cc44f9-6d16-40ec-b768-6a71b9dae23f.cfargotunnel.com`. A dedicated `tlps-pilot` tunnel was created and its local ingress validated. Tunnel connections registered successfully; the new tunnel has no apex traffic until DNS changes.

Attempted exact apex cutover was **rejected by automatic approval review** before execution. Stated reason: replacing a live record could disrupt the existing NEVO-hosted service, and selecting the target did not clearly authorize replacing that record. No workaround attempted. DNS remains unchanged; MX/TXT records were never modified.

Required user decision: approve replacing only the tlps.in apex CNAME with the dedicated TLPS tunnel, acknowledging the existing NEVO route is replaced. The original record is backed up and rollback script is prepared. After approval, switch, verify HTTPS/assets/API-denial/authenticated flow, and rollback if those checks fail.

## Operational limits

This Cloudflare path runs Rust/SQLite and the web origin on the current machine. It is not an edge-native Workers/D1 deployment. A sleeping/stopped/disconnected origin makes the pilot unavailable; no service supervisor or automatic startup was installed. Tokens are issued through private loopback administration and expire after one hour. Support requests are project-local records, not externally delivered tickets. No payments, capital collection, custody, crypto transfer or escrow release is enabled.

R0–R3 must not be declared wholly complete until their remaining acceptance/operations gates are satisfied. See deploy/tlps/README.md for start, DNS/rollback, backup/recovery and policy requirements.
