#!/usr/bin/env bash
set -euo pipefail

echo "[1/5] Verify referenced source import + explicit call"
grep -n 'installA11yHotfix' examples/redux-demo/main.tsx

echo "[2/5] Build demo"
rm -rf demo-dist playwright-report test-results
pnpm demo:build

echo "[3/5] Verify alpha8.5.3 retained in production bundle"
if grep -R -l 'MAATAA_A11Y_HOTFIX_ACTIVE_ALPHA8_5_3' demo-dist/assets/*.js >/tmp/maataa-a853-marker.txt; then
  echo "PASS: alpha8.5.3 marker found in demo bundle."
else
  echo "FAIL: alpha8.5.3 marker missing from demo bundle." >&2
  exit 1
fi

echo "[4/5] Show bundle location"
cat /tmp/maataa-a853-marker.txt

echo "[5/5] Run accessibility gate"
pnpm exec playwright test tests/e2e/accessibility.spec.ts \
  --project=chromium-desktop \
  --project=chromium-mobile
