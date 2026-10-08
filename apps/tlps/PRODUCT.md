# TLPS Planning Workspace

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Reuse the shared `@maataa/ui` React and TypeScript package. Prototype app shell uses the repository's Vite conventions.

## Users

Initial local workflow roles are Producer and Plan Owner. Additional source-declared TLPS roles are not part of this app's initial interactive scope.

## Product Purpose

Guide a production plan from intake to review, rehearsal, and a local handover. Success means a user can complete a synthetic or self-entered plan, understand validation and review state, and export its handover record.

## Positioning

The first app slice is a bounded planning-to-handover workflow. It is a local prototype and is not a connected TLPS tenant or production service.

## Operating Context

The established MAATAA demo workflow covers project intake, budget, crew assignments, location planning notes, call sheet, owner-preview review, rehearsal checklist, evidence metadata, audit display, and JSON handover. The new app is a separate shell and state store; existing workflow code is a reference baseline, not a real TLPS backend.

## Capabilities and Constraints

- Keep records in this browser unless a future backend is explicitly scoped.
- Preview roles do not authenticate users or enforce server-side authorization.
- Approval is a local workflow state only; location notes do not establish access, availability, permission, or booking.
- Evidence metadata and exports are illustrative; no payment, legal, booking, or production integrations are connected.
- Broader catalogue families remain reference material unless implemented and verified separately.

## Evidence on Hand

- `examples/redux-demo/TlpsWorkflow.tsx` and `examples/redux-demo/tlpsWorkflowModel.ts` provide the current local workflow baseline.
- `docs/engineering/tlps-local-demo.md` documents routes, local persistence, transitions, export behavior, and evidence limits.
- No pilot tenant, production data, customer acceptance, or production deployment evidence was supplied.

## Product Principles

- Separate planning intent from confirmed execution.
- Make validation, review ownership, and workflow state explicit.
- Keep local data and exported evidence understandable and user-controlled.
- Clearly label synthetic examples and preview-only actions.
- Open on a guided idea-first start screen. Ask the user's role, supported production type, and idea before showing the planning dashboard; save this context only in the browser-local draft.
- Ask for role first and recommend OS areas from that role. The role mapping is navigation guidance, not authorization. Mark areas that this local app can open separately from catalogue-only OS entries.

## Accessibility & Inclusion

Responsive web interface with keyboard-operable controls. Product localization and whole-product accessibility conformance remain open.
