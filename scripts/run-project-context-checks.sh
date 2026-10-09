#!/bin/bash
# Same-record handoff checks (macOS host): Desktop (Tauri) → MAATAA UI → TLPS.
#   contracts · TLPS typecheck · Tauri fmt + cargo test (offline, target outside the repo)
#   Playwright: project-context (TLPS + MAATAA UI), Desktop web shell, TLPS Idea → Script (mocked)
# Synthetic data, mocked Brahmini/Tauri bridges; nothing installed, downloaded or committed.
# Output: docs/product/evidence/project-context-<UTC>.log
set -u
ALPHA7="$(cd "$(dirname "$0")/.." && pwd)"
BUILD_ROOT="${MAATAA_EVIDENCE_BUILD:-$HOME/maataa-evidence-build}"
STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
LOG="$ALPHA7/docs/product/evidence/project-context-$STAMP.log"
mkdir -p "$BUILD_ROOT" "$(dirname "$LOG")"
SUMMARY=()
log() { printf '%s\n' "$*" | tee -a "$LOG"; }
step() { local name="$1"; shift; log ""; log "### $name"; log "\$ $*"
  ( cd "$ALPHA7" && "$@" ) >>"$LOG" 2>&1; local code=$?; log "exit=$code"
  SUMMARY+=("$( [ $code -eq 0 ] && echo PASS || echo "FAIL($code)" ) | $name"); return $code; }
log "# Project-context checks $STAMP"
log "alpha7: $(git -C "$ALPHA7" --no-optional-locks rev-parse HEAD) (+ local edits)"
git -C "$ALPHA7" --no-optional-locks status --porcelain > "$BUILD_ROOT/pc-status-before.txt"

step "contract typecheck" node node_modules/typescript/bin/tsc -p tsconfig.contracts.json
step "contract tests" bash -c 'node --experimental-strip-types --no-warnings --test tests/contracts/*.contract-spec.ts'
step "TLPS typecheck" node node_modules/typescript/bin/tsc --noEmit -p apps/tlps/tsconfig.json
step "Tauri cargo fmt --check" cargo fmt --check --manifest-path apps/maataa-desktop-tauri/src-tauri/Cargo.toml
step "Tauri cargo test" env CARGO_TARGET_DIR="$BUILD_ROOT/alpha7-tauri" cargo test --manifest-path apps/maataa-desktop-tauri/src-tauri/Cargo.toml --locked --offline
step "Playwright: Desktop web shell (mocked Tauri bridge)" node node_modules/@playwright/test/cli.js test --config playwright.desktop-tauri-trial.config.ts
step "Playwright: TLPS Idea → Script (mocked Brahmini)" node node_modules/@playwright/test/cli.js test --config playwright.tlps-idea-to-script.config.ts
# Last, so other configs (default outputDir test-results/) do not wipe its failure screenshots and traces.
UI_PORT=4198
while lsof -nP -iTCP:$UI_PORT -sTCP:LISTEN >/dev/null 2>&1; do UI_PORT=$((UI_PORT+1)); done
export PROJECT_CONTEXT_UI_PORT=$UI_PORT
log "MAATAA UI test server port: $UI_PORT (first free from 4198; busy ports are left untouched)"
step "Playwright: project context (TLPS + MAATAA UI)" node node_modules/@playwright/test/cli.js test --config playwright.project-context.config.ts

git -C "$ALPHA7" --no-optional-locks status --porcelain > "$BUILD_ROOT/pc-status-after.txt"
diff -q "$BUILD_ROOT/pc-status-before.txt" "$BUILD_ROOT/pc-status-after.txt" >/dev/null && TREE="unchanged" || TREE="CHANGED (see diff below)"
diff "$BUILD_ROOT/pc-status-before.txt" "$BUILD_ROOT/pc-status-after.txt" >> "$LOG"
log ""; log "## Summary"; for line in "${SUMMARY[@]}"; do log "- $line"; done
grep -E "^\s+[0-9]+ (passed|failed|skipped|flaky)|test result:" "$LOG" | sed 's/^/  /' | tee -a /dev/null
log "- alpha7 working tree during run: $TREE"
log "Evidence log: $LOG"
