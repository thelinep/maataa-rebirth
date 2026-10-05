# Canonical composer integration

VisualComposer evaluates the same composition kernel as CanonicalCompositionRuntime. Its status is `invalid` for identity/scene errors, `verified` for a canonical evidence-backed tuple, and `unverified` when canonical identities lack tuple evidence. Unverified selections stay selectable. User selections are never silently replaced. Recorded page/layout recommendations rank first.

The demo preview now mounts CanonicalCompositionRuntime. The original CompositionRuntime remains public and reports unverified when only legacy identity validation is supplied.

Phase A2 validation: 64 unit tests, package TypeScript, production demo build and 34 desktop/mobile Chromium route/accessibility tests passed before milestone commit. No dynamic/static collision warnings appeared in that build. These are development gates; no GA or current packed-consumer claim is made.

The compatibility registry currently records eight default/demo tuples. This is source-backed tuple evidence, not universal runtime or device certification.
