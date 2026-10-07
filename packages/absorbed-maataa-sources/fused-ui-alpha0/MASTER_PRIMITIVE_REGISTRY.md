# Master Primitive Registry

The source inventory is available as TypeScript from `@maataa/primitives/master-registry` and from the package root. It has 57 categories and 901 entries, preserving the supplied registry while making implementation status explicit.

## Status meanings

- **Implemented** means a matching export exists in the current MAATAA UI source. It does not certify production behavior or feature completeness.
- **Planned** means the entry is in the desired product inventory but is not a matching current export. A `relatedExistingExport` can point to a narrower or adjacent implementation; it does not change the status.
- **Required foundation** means a non-UI capability that the registry identifies as a product/platform dependency. It is not a visual component.
- Category status is `implemented`, `planned`, `required-foundation`, or `partial`, derived from the statuses of that category's entries.

## Coverage snapshot

The registry currently records 61 implemented entries, 813 planned entries, and 27 required foundations. These counts are an inventory snapshot, not a quality or release-readiness score. Category matters when names repeat: the layout `Grid` is implemented, while the separate spatial `Grid` is planned.

`@tlps/domain-primitives` now includes a general vector canvas (`CanvasSurface`/`Canvas`/`SpatialCanvas`) and an interactive WebGL 3D scene surface with basic box/sphere/plane geometry, orbit and pan camera controls, object transforms, material color, lighting, environment grid, and PNG snapshot callback. These primitives support lightweight planning and preview surfaces; they are not a full CAD/modeling suite. `Simulation`, `LiveSimulation`, `DigitalTwin`, and `FilmTwin` remain planned. `VenueFloorPlan` remains the specialized 2D floor-plan/map component, separate from the general canvas editor.

## Package boundaries

The canonical boundaries in the registry (`@maataa/tokens`, `@maataa/primitives`, `@maataa/ui`, and the TLPS domain/workflow/evidence/generative/composite/template packages) are extracted as workspace packages. The MAATAA UI package is `@maataa/ui`; existing primitives and tokens have their own source packages. `@tlps/domain-primitives` now ships the general canvas and basic 3D viewport described above, while other TLPS packages and the remaining planned entries continue to expose package-owned catalogs until implemented.

## Update discipline

When an implementation lands, update its entry only after confirming the named export in source. Keep adjacent/specialized implementations as `relatedExistingExport` until they actually satisfy the registry contract. Update the registry coverage test whenever the source inventory intentionally changes.
