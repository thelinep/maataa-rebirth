# Absorbed MAATAA UI source generations

This directory brings the independently developed MAATAA UI package sources
into one repository while preserving each generation in a separate namespace.
The active canonical package remains the top-level `@maataa/ui` source at
`src/`; archived copies are migration evidence and are not automatically
published, compiled, or imported at runtime.

`manifest.json` records each original source, source Git state, file hashes,
and duplicate aliases. The absorption only copied package/workspace source;
it did not edit or remove the original checkouts. Generated output, installed
dependencies, and build caches were excluded.

## Convergence rule

Promote a capability into the canonical package only after its API and runtime
dependencies are mapped, its consumer is identified, and tests pass against
the canonical package. Domain-branded adapters stay behind explicit integration
subpaths. Historical workspace architectures stay archived until a deliberate
port replaces them; overlapping files are never overlaid by filename.
