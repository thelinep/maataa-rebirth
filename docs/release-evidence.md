# Execution-backed release evidence

`pnpm certify:enterprise` starts only from a clean committed tree and executes the complete configured automated matrix. Each gate captures its command, exit code, times and raw log. The workflow stops after a failure; remaining gates stay NOT_RUN. A successful script lookup or historical PASS document never substitutes for execution.

Evidence is saved under `.certification/release-evidence/<full-commit-SHA>/<run-ID>/`, with environment, Git, tests, browser/accessibility, bundle, canonical catalogue, public API, packed consumers, audit, licenses, SBOM, artifact provenance and checksums. The source commit must remain unchanged and clean through the run. Tarball hashes identify the actual local consumer artifact.

Exit 1 means an automated gate failed. Exit 2 means automated gates passed but enterprise acceptance is BLOCKED by outstanding external/manual requirements. There is no GA success path before reviewed pilot, license, accessibility, performance, ownership, API-freeze and publisher evidence is connected. Do not reinterpret exit 2 as certification.

Generated records are execution evidence for their exact commit. Each execution receives a separate run directory; earlier local packs are preserved. Root historical certification documents remain historical and must not be used as current qualification.
