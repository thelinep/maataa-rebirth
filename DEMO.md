# MAATAA UI demo

Alpha 7.4 includes a complete Vite bootstrap for the public/full-surface Redux demo.

## Run

```bash
pnpm install
pnpm demo
```

Open `http://127.0.0.1:4173/`.

The Vite demo resolves `@maataa/ui/*` directly to `src/*`, so it can run before `dist/` is built.

## Build the demo

```bash
pnpm demo:build
pnpm demo:preview
```

Output is written to `demo-dist/`.

## Surfaces

- Landing
- Full Surface — three-pane catalog + live visual canvas + inspector/copy controls
- Playground — interactive package components, viewport/theme/density/radius controls, copyable code
- Sandbox — safe block composition, editable JSON, generated/copyable JSX
- Demos — deterministic Redux scenarios
- Docs — copyable code examples
- Help
- Support — local ticket composer with copy action

## pnpm build-script policy

The project `pnpm-workspace.yaml` explicitly allows the required `esbuild` lifecycle script. If this project was installed before that file was added, run:

```bash
pnpm rebuild esbuild
```

## Runtime boundary

The demo uses Redux Toolkit, React Redux, the canonical registries, deterministic static demo data and package-owned visual components. It performs no live model, connector, payment, auth-provider, database, or backend execution. The Sandbox never evaluates arbitrary code.

## Identity and avatar data

The demo session now starts as **Brahmini** and uses symbolic avatar identities for workspace ownership, activity, agents, approvals and team groups. The full set includes Shiv, Parvati, seven Saptarishis and five Panchtatva personas.
