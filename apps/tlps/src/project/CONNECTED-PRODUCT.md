# Connected Projects extension

Visitor mode: Operate. Extend the existing MAATAA/TLPS visual system, keeping theme tokens, Button/Input/Select controls and the existing stage component. No new visual identity.

Audience/job: an administrator-provisioned production team opens its token-scoped project, edits planning records, coordinates tasks and reviews stage changes.

First viewport: Projects heading, server-save explanation, clear token connection form before any data, then project title/current stage with handover and disconnect actions. The distinguishing interaction is version-aware record editing with a kept draft and explicit latest-record recovery on conflict. Stage selection is navigation; advancement is a separately recorded independent review.

States: connection/loading, empty collection, saved, recoverable error, forbidden, unavailable project, version conflict, offline without queued writes, destructive removal confirmation and disconnected session. Access tokens are memory-only; leaving or disconnecting clears project data. No localStorage fallback/import.

Structure: project list limited to the session's one project; detail uses record-family navigation, record list/editor, team work/support, stage review and audit. Narrow view stacks navigation and forms; retain text labels and native keyboard access.

Limits: metadata-only evidence; no public signup, paid entitlement, financial execution, email sending or full mobile-route parity. Existing PRODUCT.md is historically browser-local; this extension's server behavior is bounded by the current release report and must not rewrite unrelated product claims.
