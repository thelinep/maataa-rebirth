# Generator workbench

The 208 named generator wrappers share an interactive workbench and keep their stable package subpaths, for example:

```tsx
import { FormGenerator } from "@maataa/ui/generators/FormGenerator";

<FormGenerator />;
```

Without an adapter, the workbench accepts a brief and optional context, validates that the brief is present, and creates a clearly labelled illustrative local draft. It does not call an AI provider, write files, or claim to produce a production artifact.

Consumers connect authorized generation through `onGenerate`. The workbench sends a normalized `GeneratorRequest`, displays the returned JSON-compatible result, and reports rejected promises as an accessible error state.

```tsx
<FormGenerator
  onGenerate={async ({ generatorId, brief, context }) => {
    return domainAdapter.prepareDraft({ generatorId, brief, context });
  }}
/>
```

The consumer owns provider credentials, authorization, persistence, side effects, domain validation, and whether the adapter can execute in the current environment. Keep those integrations in the consumer or an explicitly owned adapter package. Supplied `inputs`, `prompt`, `context`, `controls`, and output slots remain available for product-specific composition.

## Verified behavior

`tests/generator-workbench.test.tsx` checks the local fallback, empty-brief validation, normalized callback payload, adapter success and failure, and the import/render/action contract for every record in `GENERATOR_REGISTRY`. That registry currently contains 208 named generators. `GeneratorSurface` is the shared workbench surface and is counted separately in the broader package catalogue.

Page and workspace wrappers remain composition primitives. `tests/preset-compositions.test.tsx` mounts each named page and workspace wrapper with consumer-owned header, content, and sidebar regions to verify the published composition API. Neither those package presets nor the example route mappings assert that an application route is deployed.
