# TLPS Planning Workspace

Standalone local planning rehearsal for intake, budget estimates, crew responsibilities, location notes, call sheet, owner preview, rehearsal, evidence metadata, activity, and JSON handover.

```sh
pnpm tlps:dev
pnpm tlps:typecheck
pnpm tlps:build
```

Drafts persist in this browser only. Preview approval is not authenticated or server-enforced. Location notes do not prove access or booking. Evidence bytes are not uploaded or retained. JSON exports mark themselves local-demo-only and never claim production readiness, confirmed bookings, or real payments.

## Central domain types

`src/types.ts` is the shared type contract for TLPS product IDs, account roles, deduplicated crew roles, cast roles, heads of department, project types, opening payment options, planning records, resource provenance and availability, script documents, budget estimates, and the Magic Writer / Magic LP request and result shapes. The standalone workspace uses the project-type list and offers crew-role suggestions. Cast, department, and payment vocabularies are reference contracts; their presence does not imply casting workflows, contracts, payroll, model providers, live resource feeds, screenplay parsers, quotes, or budget integrations are connected.
