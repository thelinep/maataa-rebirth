# TLPS local demo

This MAATAA demo is a browser-local planning walkthrough built from the TLPS planning baseline. It is independent of `tlps.in` and does not connect to a TLPS host, tenant, API, database, identity provider, booking service, or payment provider.

The extension stays within the incumbent MAATAA demo shell and its dark, gold-accented visual system. Its pages reuse MAATAA controls such as Button, Input, Select, Card, and Badge; TLPS-specific page styles add the workflow and catalogue layouts without changing the global identity. The Support Center screen inventory includes the overview, workflow explanation, catalogue, selected family references, onboarding, and workflow preview.

## Run it

From the repository root:

```sh
pnpm install
pnpm demo --host 127.0.0.1
```

Open the local Vite URL printed by the command, then use these hash routes:

- `/#/tlps` — local TLPS overview.
- `/#/tlps/marketing` — workflow explanation and documented product families.
- `/#/tlps/catalog` — searchable product-family index; select an entry for its reference screen at `/#/tlps/catalog/<family-id>` (`production-film`, `campaign-event`, `marketplace-locations`, or `evidence-finance`).
- `/#/tlps/onboarding` — private idea intake and guided I2S/I2R/I2B path. I2R shows the six authored film stages, mapped OS, workspace families, role contracts, stage topics and current preview boundary.
- `/#/tlps-workflow` — production planning-to-handover workflow.

The guided setup is separate from the workflow draft. It carries role and format choices into an idea brief, shows an explicit automation preference, and saves the idea/path only when **Save this idea locally** is chosen, under `maataa.tlps.onboarding.v1` in this browser. Voice entry uses browser speech recognition when available; there is no connected conversational model in this route.

With no saved draft, the workflow starts blank so users can enter their own synthetic scenario. **Load synthetic sample** fills the draft with fictional planning values; they remain editable. Draft records persist in this browser under `maataa.tlps.workflow.v1` and are restored on revisit. Clearing site data removes both local records. Handover, call-sheet JSON, and safe JSX exports are downloads generated in the browser.

## Lifecycle

1. Project intake and budget ceiling.
2. Cost estimates and budget review.
3. Crew responsibilities and location planning notes.
4. Timed call-sheet entries.
5. Producer submission and owner-preview approve/return controls.
6. Local rehearsal checklist.
7. Planning/rehearsal file metadata and SHA-256 digests.
8. Local closeout, audit display, and JSON handover.

The workflow and exports are illustrative. Role switching is not authorization; approval is not an authoritative decision. A location note does not prove availability, permission, or a booking. Evidence files are hashed in memory; only the filename, evidence category, byte count, and SHA-256 digest are saved, while file bytes are not uploaded or retained. The local closeout is not production completion. The demo does not process payments or create real TLPS records.

## Product catalogue

The current reference catalogue groups documented scope into Production & Film (`production-film`), Campaign & Event (`campaign-event`), Marketplace & Locations (`marketplace-locations`), and Evidence & Finance (`evidence-finance`), and lists all 16 declared product OS. I2R maps the six film lifecycle stages onto the product IDs and workspace families, including Casting, Crew, Location & Venue, Equipment & Logistics, Finance, Evidence, Marketing, Marketplace, Investor and Event families. It surfaces the cast, crew, department-head and payment-basis type contracts. These are taxonomy and workflow references, not proof that the operating systems are integrated. Production & Film is the only catalogue family labeled **Local workflow demo**; location notes and evidence metadata also appear as bounded steps within that production workflow.

## Checks

```sh
pnpm exec tsc --noEmit -p tsconfig.demo.json --pretty false
pnpm exec playwright test tests/e2e/tlps-workflow.spec.ts
pnpm demo:build
```

The browser checks cover the end-to-end workflow, incomplete-plan gate, synthetic starter persistence, catalogue search/detail, accessibility checks included by the workflow suite, and narrow viewport overflow.
