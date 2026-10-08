# Brahmini independent desktop app generator

Brahmini Product Forge now connects a reviewed product graph to a fixed Electron or Tauri v2 starter. The graph drives the starter's product name, idea, audience, initial feature cards, and open questions. The frontend uses the shared `@maataa/ui` package.

## Flow

1. Complete and review the guided product brief.
2. Use the selected provider to propose a structured product graph; validate and review it.
3. Compile the canonical MAATAA UI snapshot.
4. Choose Electron or Tauri and inspect the generated file list and source.
5. Explicitly approve folder creation. The loopback Brahmini runtime writes fixed-template files beneath `generated-apps/<project-slug>` and refuses to overwrite an existing folder.
6. Review the generated app. Dependency installation, desktop builds, and packaging are separate commands and are never run automatically.

Electron uses a main process and a narrow preload bridge with context isolation, no renderer Node integration, and sandboxing. Tauri uses a Rust v2 shell with only its default core capability. Both starters keep sample interaction state in the browser and label their preview boundary.

The app projects use `@maataa/ui` through `file:../..`, so they run as separate folders within this checkout. Moving one to a different repository requires the shared package to be published or packed and the dependency updated. The generator does not create a complete domain backend, authentication, production data, signing, or release artifacts. It does not execute source suggested by a model.
