#!/bin/bash
# TLPS Idea → Script checks (macOS host).
#   1. Contract typecheck + tests (node)
#   2. TLPS typecheck and a production build into ~/maataa-evidence-build (apps/tlps/dist untouched)
#   3. Playwright, mocked Brahmini (synthetic responses)
#   4. Playwright LIVE: real Brahmini runtime + a local Ollama model (skipped if Ollama is not running)
# Nothing is installed or downloaded. Output: docs/product/evidence/tlps-idea-to-script-<UTC>.log
# Optional: BRAHMINI_LIVE_MODEL=llama3.2:latest to choose the live model.
set -u
ALPHA7="$(cd "$(dirname "$0")/.." && pwd)"
BUILD_ROOT="${MAATAA_EVIDENCE_BUILD:-$HOME/maataa-evidence-build}"
STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
LOG="$ALPHA7/docs/product/evidence/tlps-idea-to-script-$STAMP.log"
mkdir -p "$BUILD_ROOT" "$(dirname "$LOG")"
SUMMARY=()
log() { printf '%s\n' "$*" | tee -a "$LOG"; }
step() { local name="$1"; shift; log ""; log "### $name"; log "\$ $*"
  ( cd "$ALPHA7" && "$@" ) >>"$LOG" 2>&1; local code=$?; log "exit=$code"
  SUMMARY+=("$( [ $code -eq 0 ] && echo PASS || echo "FAIL($code)" ) | $name"); return $code; }
log "# TLPS Idea → Script checks $STAMP"
log "alpha7: $(git -C "$ALPHA7" --no-optional-locks rev-parse --short HEAD) (+ local edits)"
git -C "$ALPHA7" --no-optional-locks status --porcelain > "$BUILD_ROOT/its-status-before.txt"

step "contract typecheck" node node_modules/typescript/bin/tsc -p tsconfig.contracts.json
step "contract tests" bash -c 'node --experimental-strip-types --no-warnings --test tests/contracts/*.contract-spec.ts'
step "TLPS typecheck" node node_modules/typescript/bin/tsc --noEmit -p apps/tlps/tsconfig.json
step "TLPS production build (outside the repo)" node node_modules/vite/bin/vite.js build --config apps/tlps/vite.config.mjs --outDir "$BUILD_ROOT/tlps-dist" --emptyOutDir
step "Playwright: mocked Brahmini" node node_modules/@playwright/test/cli.js test --config playwright.tlps-idea-to-script.config.ts

if curl -fsS http://127.0.0.1:11434/api/tags >/dev/null 2>&1; then
  log ""; log "Ollama models (name + digest prefix):"
  curl -fsS http://127.0.0.1:11434/api/tags | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{for(const m of JSON.parse(s).models||[])console.log(`    ${m.name}  ${String(m.digest).slice(0,12)}`)})' | tee -a "$LOG"
  step "Playwright LIVE: Brahmini runtime + local Ollama" env BRAHMINI_LIVE=1 node node_modules/@playwright/test/cli.js test --config playwright.tlps-idea-to-script.config.ts
  grep -E "LIVE_(MODEL|CHECK|RESULT)" "$LOG" | sed 's/^/    /' | tee /dev/null >/dev/null
else
  log ""; log "### Playwright LIVE"; log "SKIPPED: Ollama is not answering on 127.0.0.1:11434"; SUMMARY+=("SKIPPED | Playwright LIVE | Ollama not running")
fi

git -C "$ALPHA7" --no-optional-locks status --porcelain > "$BUILD_ROOT/its-status-after.txt"
diff -q "$BUILD_ROOT/its-status-before.txt" "$BUILD_ROOT/its-status-after.txt" >/dev/null && TREE="unchanged" || TREE="CHANGED (see diff below)"
diff "$BUILD_ROOT/its-status-before.txt" "$BUILD_ROOT/its-status-after.txt" >> "$LOG"
log ""; log "## Summary"; for line in "${SUMMARY[@]}"; do log "- $line"; done
grep -E "LIVE_(MODEL|CHECK|RESULT)" "$LOG" | sed 's/^/  /' | sort -u
log "- alpha7 working tree during run: $TREE"
log "Evidence log: $LOG"
