# TLPS workflow through MAATAA

Open the demo at `/#/tlps-workflow`. The TLPS scenario dashboard and shell navigation link to it.

The workflow covers one production plan through eight steps:

1. Project intake: title, production city, type, shoot date and budget ceiling.
2. Whole-rupee budget lines, with submission blocked above the ceiling.
3. Crew responsibilities and location planning notes.
4. Timed call-sheet scenes, with JSON download.
5. Producer submission and owner preview review by Hemant Kumar Dixit. Owner approval requires a note and locks planning; returning a plan reopens it.
6. Local setup, rehearsal and wrap checklist.
7. Distinct planning and rehearsal evidence files, capped at 2 MB each. Only metadata and actual SHA-256 hashes are retained.
8. Local closeout, audit history and JSON handover, including canonical MAATAA composition and safe JSX.

MAATAA Button, Input, Select, Card and Badge components drive the UI. CanonicalCompositionRuntime renders the Studio composition with laptop and phone previews. Runtime identity resolution does not establish compatibility qualification for this exact tuple.

## Persistence and limits

A validated schema is stored in this browser's localStorage. Invalid or corrupted saved state is rejected. Export the handover pack for a portable record. File bytes are neither uploaded nor retained. Preview roles and audit history are client-side demonstration controls, not authenticated server authorization or tamper-proof records.

This demo establishes no real booking, payment, legal clearance, shoot completion or production readiness. These flags remain false in the handover. Enterprise pilot acceptance, server identity and authorization, persistence services, approvals, permissions and external security review remain separate release requirements.

## Validation and recording

Model tests exercise incomplete plans, budget limits, role transitions, immutable closed plans, evidence uniqueness and corrupt persisted data. Browser tests execute the complete flow, downloads, restore, responsive composition, accessibility and viewport overflow, as well as refusal of incomplete submissions.

Run:

```sh
pnpm exec tsc -p tsconfig.demo.json
pnpm test
pnpm demo:build
pnpm exec playwright test tests/e2e/tlps-workflow.spec.ts
TLPS_RECORD_VIDEO=1 TLPS_VIDEO_DIR=/absolute/output/directory pnpm exec playwright test --config playwright.tlps-video.config.ts
```

Create the output directory before recording. The recording configuration reuses the verified walkthrough, adds explanatory captions, and records desktop and mobile Chromium video. Recordings are silent.
