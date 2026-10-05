# Canonical layout runtime

`layoutRegistry.ts` owns layout IDs, import paths and export names. The generator reads literal data without executing registry source, audits each source leaf and its shared LayoutPreset, and derives exact lazy loaders and content-placement contracts. `layout-audit.json` records all 100 layouts, source hashes and declared regions. Run `node scripts/generate-layout-loaders.mjs --check` to detect drift.

CanonicalLayout caches lazy components outside rendering and exposes loading, unknown-ID and load-failure states. CompositionRuntime refuses invalid scenes and mounts the actual selected layout. Blocks go into main, canvas or details according to the implementation's declared desktop CSS areas. Main is an explicit fallback where those areas are unspecified; this does not prove application-specific placement compatibility. Caller-supplied header/sidebar/inspector remain optional.

Safe code generation imports the selected canonical leaf and uses the same content-placement contract. Function identifiers also avoid imported-name collisions. No namespace resolver, broad source glob or new component wrapper per layout was introduced.

Phase B development qualification: TypeScript, package build, production demo build, 174 unit tests (including all 100 layouts and compilation of generated TSX for all 100), and 38 desktop/mobile Chromium tests passed before commit. Zero dynamic/static collision warnings. Demo total JS: 1,754,215 bytes; largest chunk: 367,542 bytes. This is build measurement, not initial-load or interactive performance qualification.
