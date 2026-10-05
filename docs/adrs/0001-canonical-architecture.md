# ADR 0001: Canonical surface architecture

Status: Implemented development architecture; enterprise freeze pending.

## Canonical registry ownership
Registry IDs and recorded import paths own runtime addressing. Exact generated leaf loaders resolve those paths. No broad source glob, runtime path guessing or parallel ID namespace is allowed. Generated documentation and mappings include source facts and drift checks.

## Composition grammar
Relationships carry explicit status and provenance. Source-declared slots are declarations; execution placement is checked separately against actual layout templates. Missing relationships remain unverified. Compatibility evidence covers recorded tuples, never all combinations by implication.

## AI boundaries
Visual tooling, persistence, planner proposals, runtime and codegen use the same versioned specification. A host supplies the planner and owns authorization. Bounded JSON validation precedes rendering; a planner cannot bypass canonical identity or code serialization checks.

## Device runtime
Canonical device declarations drive dimensions, orientation, input and capabilities. Container semantics adapt simulated devices inside larger hosts. Typed transformation operations execute known rules; other applicable declarations remain unverified. Missing capability evidence is not a denial.

## Codegen trust boundary
Strings are serialized as JavaScript literals within JSX expressions. Identifiers are validated and made safe. Generated code uses canonical imports and the same region plan as runtime. Data remains data even when it resembles JavaScript or markup.

## Canonical ID stability
Display-name changes preserve IDs. Identity replacements require explicit aliases, versioned saved-scene migrations, tests and release notes. Stable removals are major changes. No unneeded migration aliases are fabricated.

## Evidence model
Execution logs, exit codes and generated artifacts identify a single unchanged clean source commit. Static manifests and checksum pairs do not establish freshness. Missing gates remain NOT_RUN, failure stops subsequent execution, and manual/external acceptance is explicit.

## Release process
Features are qualified in coherent commits. Full automation runs after the candidate commit exists so SHA attribution is exact. Alpha tags follow applicable gates. Beta, RC and GA require progressively stronger acceptance, with immutable tags, controlled publishing and human ownership. A blocked enterprise report never becomes GA because automated checks passed.
