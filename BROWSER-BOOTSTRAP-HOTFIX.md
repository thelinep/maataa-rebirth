# Alpha 8.4 browser bootstrap hotfix

This patch targets production-preview startup before Beta browser certification.

- Replaces registry and Redux selector barrel imports in the demo App with leaf imports.
- Stops forcing interconnected Redux/static-data/demo/generic-registry modules into separate manual chunks.
- Dynamically imports App from `main.tsx` and renders a visible bootstrap-error surface if module evaluation fails.
- Makes Playwright report bootstrap/page/console errors instead of timing out on an absent readiness marker.

Run `pnpm demo:build && pnpm browser:test`. If bootstrap still fails, the test output now contains the actual runtime exception.
