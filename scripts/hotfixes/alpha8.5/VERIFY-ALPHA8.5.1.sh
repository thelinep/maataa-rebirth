#!/usr/bin/env bash
set -euo pipefail

echo "[1/4] Verify source import"
head -n 5 examples/redux-demo/main.tsx
grep -q 'import "./a11y-hotfix";' examples/redux-demo/main.tsx

echo "[2/4] Build demo"
rm -rf demo-dist playwright-report test-results
pnpm demo:build

echo "[3/4] Verify hotfix survived bundling"
if ! grep -R -q 'alpha8\.5\.1' demo-dist/assets; then
  echo "ERROR: alpha8.5.1 runtime marker not found in demo bundle. Hotfix is not active."
  exit 2
fi
echo "Hotfix marker found in demo bundle."

echo "[4/4] Run accessibility gate"
pnpm exec playwright test tests/e2e/accessibility.spec.ts \
  --project=chromium-desktop \
  --project=chromium-mobile
