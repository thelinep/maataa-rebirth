#!/usr/bin/env bash
set -euo pipefail
rm -rf demo-dist playwright-report test-results
pnpm demo:build
pnpm exec playwright test tests/e2e/accessibility.spec.ts \
  --project=chromium-desktop \
  --project=chromium-mobile
