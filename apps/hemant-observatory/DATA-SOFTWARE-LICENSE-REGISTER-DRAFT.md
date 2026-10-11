# Data and software license register — draft

**Status:** source inventory for review, not legal advice or permission to redistribute. A “public” URL does not establish commercial-use or redistribution rights. Recheck the linked terms before bundling, hosting, or selling derived data.

| Item | Current role/evidence | Redistribution/commercial state | Next atomic action |
| --- | --- | --- | --- |
| Rust standard library and local Rust crates | Dependency inventory lists no crates.io runtime dependencies | Confirm from current toolchain and source; not a product data licence | Regenerate dependency/SBOM inventory from exact release tree |
| Next.js, React, TypeScript, Playwright | Listed in `DEPENDENCIES.md`; some tooling comes from workspace-linked installs | Package manifest alone is not a complete transitive SBOM | Generate lockfile-derived SBOM and validate package licence metadata |
| `h5wasm`, Wrangler, OpenNext | App dependencies; versions pinned or range-constrained in package manifests/lockfile | Audit direct and transitive notices and deployment terms | Extract exact locked versions and licence files |
| JPL Horizons results/fixtures | NASA/JPL provider responses used for documented science fixtures | Verify NASA/JPL data and attribution terms for each bundled fixture | Record request, retrieval date, response identity, hash and applicable terms |
| NAIF SPICE kernels / SCLK correlation | Mission-specific kernel references and a bounded Mars 2020 fixture are documented | Redistribution terms are not established by the current register | Pin exact kernel file/version/hash; inspect NAIF terms and permitted packaging |
| Aditya-L1 MAG sample and derived values | PRADAN sample used locally for parser tests; boundary report records source constraints | Commercial use and redistribution require explicit terms review; do not include raw sample in product bundle | Obtain written permission for commercial derived use, or keep out of commercial scope |
| Panchanga publications and calendar references | Candidate sources are listed; no canonical authority/edition selected | Rights vary by publisher and edition | Record source edition, permitted quotation/data extraction, and attribution requirements |
| MAATAA/ALLB supplied artwork | Local gallery reproduces user-supplied screenshots/artwork references | Ownership/licence must be documented before external distribution | Map each asset to source and permission evidence |

## Release gate

For every shipped software package, dataset, kernel, fixture, font, and image, record exact version/source, licence or terms URL, notices, modification status, redistribution permission, commercial-use permission, and whether generated outputs inherit restrictions. Keep unresolved items out of commercial packaging or mark them blocked; do not infer permission from public availability.
