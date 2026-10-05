# CompositionSpec v1

The visual editor, host-supplied planner, persistence, runtime and code generator share `CompositionSpecV1`. Its `schemaVersion` is `"1"`; canonical workspace, page, layout and device IDs identify the surface. Blocks carry canonical component IDs and typed renderer kinds. Region assignments refer to canonical region IDs and block IDs.

`toCompositionSpec` explicitly migrates legacy scenes without changing their identities. `parseCompositionInput` bounds JSON input and validates before accepting it. `validateCompositionSpec` rejects malformed data, unknown identities, duplicate placements and mismatched component bindings. Property getters, executable values, cycles and unsafe object keys are rejected before evaluation.

Canonical combinations without recorded compatibility evidence remain selectable and unverified. A declared region whose executable placement is not established falls back to the selected layout's primary content slot with an explicit warning. Runtime and generated code consume the same placement plan.

`planCanonicalComposition` accepts a host-owned planner adapter and supplies canonical vocabulary, the implemented block bindings and recorded compatibility evidence. Proposals pass the same validator before acceptance. This adapter is a bounded planning interface; it does not certify a model, invoke a provider or establish authorization for application actions.

The editor preserves existing placements, removes deleted block references and places newly created blocks in the canonical primary region. Persisted history is validated and migrated before restoration; corrupt history is refused.

Qualification includes adversarial data, malformed proposals, persistence, canonical component bindings, multiple regions, runtime override resistance and safe generated TSX. Production browser qualification is required because unit tests alone do not expose dependency cycles in split bundles.
