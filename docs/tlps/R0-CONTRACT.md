# R0 implementation contract — 17 October 2026

Authorized scope: R0 → R1 → R2 → R3; hosted target selected by user: Cloudflare, tlps.in.

## Decisions used for implementation

- Preserve existing /#/tlps routes. Add /#/tlps/projects and /#/tlps/projects/prj:<uuid>. Proposed /m routes remain a separate later mobile contract; unknown TLPS paths render not-found.
- Keep current core projects and project-scoped token foundation. Do not execute the conflicting proposed projects CREATE statement. TLPS domain migration 1 stays immutable; team-pilot schema is a separate checksummed migration.
- A project profile contains title/stage/city. A personal profile is a later account capability. A workflow workplace is not a tenant workspace.
- Internal pilot uses administrator-provisioned principals and expiring tokens, with per-project owner/editor/reviewer/viewer memberships. It does not offer public signup, organization onboarding, MFA or identity verification.
- Eight UI stages stay idea/story/board/pre/production/post/release/shree. In managed pilots, only independent reviewer/owner decisions advance one stage. A decision pins the project-profile version, not every production record. The broader lifecycle mapping remains documented rather than auto-converted.
- Existing local demos stay explicitly local. New Projects surface uses server persistence without localStorage fallback or automatic imports. No browser records are uploaded implicitly.
- Evidence metadata/reference only; uploaded file bytes, rights validation, bookings and financial execution are excluded from this pilot. File upload/versioning is not silently counted as delivered.
- Tasks, milestones and support requests are project records; support does not send email or messages externally. Membership administration remains a private administrator function, not an owner-controlled escalation UI.
- Cloudflare Tunnel is the initial hosting path for the existing Rust/SQLite origin. Database remains on a persistent private origin disk; this is not a D1/Workers migration. Origin availability depends on the machine/service running it.

## Acceptance ownership

Earlier project records designate Hemant Kumar Dixit as release owner. That designation is not a signed pilot acceptance. The current user selected domain/hosting, but did not provide new release approver/contact or retention duration. Technical checks and a manual acceptance checklist will be recorded separately; missing approval will not be labeled complete.

## Review boundary

This task owns new pilot backend/schema/tests, connected Projects UI, provisioning/origin/deployment scripts, route/proxy additions and TLPS release documentation. Preserve pre-existing auth runtime/IPC/Tauri/selector/Storybook/release changes. Do not commit them as if they were all authored or approved by this task.

## Exit disposition

This contract records engineering defaults within the requested pilot scope. Identity/workspace and mobile expansion beyond those defaults needs an explicit next scope. R0 source isolation requires scoped review rather than claiming the dirty repository is a clean release candidate.
