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

## Work areas

Every TLPS OS entry opens a work area (`?area=index`, or `?area=<id>`). Production, Finance, Evidence, Crew and Location open their step of the planning workflow. The other fifteen keep a browser-local register with validated fields, local status labels and sample records. Each area lists its workspaces (the TLPS Production, Casting and Crew workspaces live in `src/registries/workspaceRegistry.ts`) and the TLPS AI spaces from `src/ai-spaces`, which are not connected to a model.

Selecting a workspace also opens its separate demo workflow: sample or personal records, an owner, four area-specific review notes and a JSON handover. Runs are saved independently for each area/workspace pair. Editing records or the owner restarts review. Completion means a local rehearsal only; exports explicitly deny production readiness, real payments, confirmed bookings and authenticated approval. The MAATAA public demo exposes all mapped workplaces at `/#/tlps/workplaces`.

## Sign-in and server storage

`src/services/contracts.ts` defines the service boundary: auth, project storage, bookings, payments and legal clearance. Two adapters exist:

- **Local mock** (`src/services/mocks.ts`): in memory. Bookings, payments and legal clearance are mocks in every mode and only return a draft or waiting status.
- **MAATAA Auth API** (`src/services/maataaAuthApi.ts`): calls `apps/maataa-auth-api` through the Vite proxy at `/api/maataa` (port `MAATAA_AUTH_API_PORT`, default 4381).

To try the server mode on one computer:

```sh
# terminal 1: the service (see apps/maataa-auth-api/README.md)
mkdir -m 700 -p apps/maataa-auth-api/data
cd apps/maataa-auth-api && MAATAA_BOOTSTRAP_TOKEN="<at least 32 random characters>" cargo run --release --offline

# terminal 2: issue a project token (an administrator step)
curl -s -X POST 127.0.0.1:4381/v1/admin/principals -H "authorization: Bearer $MAATAA_BOOTSTRAP_TOKEN" \
  -H 'content-type: application/json' -d '{"principalId":"producer-1","displayName":"Producer"}'
curl -s -X POST 127.0.0.1:4381/v1/admin/tokens -H "authorization: Bearer $MAATAA_BOOTSTRAP_TOKEN" \
  -H 'content-type: application/json' \
  -d '{"principalId":"producer-1","projectId":"prj:<new lowercase uuid>","scopes":["project:read","project:write"],"ttlSeconds":3600}'

# terminal 3: the app
pnpm tlps:dev
```

Open Work areas → Core Platform OS, choose "MAATAA Auth API on this computer" and paste the `access_token`. The token is held in memory only. The server stores the project record, version summaries and the SHA-256 and size of each plan snapshot; the plan itself stays in this browser. Saves send `If-Match` with the version you started from, so a stale copy is refused.

This is a local integration. It has no interactive login, TLS, CORS policy, rate limits or tenant administration; see the Auth API README before using real data.
