#!/usr/bin/env bash
set -euo pipefail

MARKER='MAATAA_A11Y_HOTFIX_ACTIVE_ALPHA8_5_2'

echo "[1/5] Verify referenced source import + explicit call"
grep -n 'import { installA11yHotfix } from "./a11y-hotfix";' examples/redux-demo/main.tsx
grep -n '^installA11yHotfix();$' examples/redux-demo/main.tsx

echo "[2/5] Build demo"
rm -rf demo-dist playwright-report test-results
pnpm demo:build

echo "[3/5] Verify hotfix retained in production bundle"
if ! grep -R -F -q "$MARKER" demo-dist/assets; then
  echo "ERROR: alpha8.5.2 marker not found. Explicit installer was still not retained."
  exit 2
fi
echo "PASS: alpha8.5.2 marker found in demo bundle."

echo "[4/5] Show bundle location"
grep -R -F -l "$MARKER" demo-dist/assets | head -n 5

echo "[5/5] Run accessibility gate"
pnpm exec playwright test tests/e2e/accessibility.spec.ts \
  --project=chromium-desktop \
  --project=chromium-mobile
