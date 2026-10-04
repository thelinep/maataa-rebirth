# Migration notes

This standalone package consolidates generic visual UI under `@maataa/ui`.

Application/domain packages should import only generic UI from this package. TLPS-, NEVO-, finance-, event-, infrastructure-, auth- and database-specific behavior must remain outside.

Prefer stable root or documented subpath imports. Do not import `@maataa/ui/src/*` internals.

The package does not replace host routing, auth, permissions, API calls or persistence. Existing application adapters should continue supplying state and callbacks.
