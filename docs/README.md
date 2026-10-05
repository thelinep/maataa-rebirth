# MAATAA developer documentation

Start with the root Getting Started and theming guides for package usage. The package remains a private prerelease; passing a local check does not establish enterprise certification.

| Audience | Canonical guides |
| --- | --- |
| UI consumer | Root README, THEMING, ACCESSIBILITY, MIGRATION; engineering/accessibility-contracts.md |
| Application developer | engineering/canonical-composer.md, composition-spec.md, package-consumers.md |
| Platform architect | Root ARCHITECTURE and REGISTRIES; engineering/composition-grammar.md, performance.md |
| AI/tool developer | composition-spec.md, engineering/codegen-trust-boundary.md |
| Enterprise evaluator | versioning-policy.md, security/dependency-policy.md, package-consumers.md, performance.md |

`canonical-catalog.json` is generated from component, layout, page, workspace, device and region source records. `pnpm docs:check` rejects drift. IDs, names, categories, paths and device declarations are copied only where the canonical record supplies them. Missing purpose, props, anatomy, accessibility qualification, supported relationships or deprecation data remains unknown; documentation does not manufacture complete coverage.

Use the resolved `PUBLIC_API.json` for concrete import symbols and prerelease classifications. Use the composition relationships and compatibility records for provenance. Device dimensions and capabilities are declarations; executable transformations and actual layout placement are separate runtime contracts. Generated JSX accepts validated data and serializes text safely.

Browser support, supported framework versions, release ownership, manual reviews and pilot acceptance must be qualified in a fresh release pack before any GA support claim. Historical root certification documents are not current execution evidence.
