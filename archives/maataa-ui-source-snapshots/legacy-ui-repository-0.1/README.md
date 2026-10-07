# Maataa UI

The sovereign interaction and observability layer for MaataaOS products.

## Scope

- universal application shell and navigation contracts
- accessible React primitives and status components
- contextual HUD models
- runtime observatory and topology contracts
- evidence, authority and readiness semantics
- 68-theme registry across 11 families
- adapters for product runtimes; no direct runtime ownership

## Repository

```text
apps/demo             interactive integration surface
packages/ui           publishable @maataa/ui package
docs                   architecture, registry and governance
```

## Commands

```bash
pnpm install
pnpm check
```

## Readiness

This initial extraction establishes the standalone repository contract. It does
not certify every historical product screen or adapter as production-ready.
See `docs/STATUS.md`.
