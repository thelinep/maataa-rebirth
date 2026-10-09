#!/bin/bash
# First live MAATAA Desktop ↔ ALLB handshake (macOS host).
#
# What it does:
#   1. Builds ALLB's WASM runtime from the CURRENT ALLB working tree with
#      wasm-pack, writing output OUTSIDE the ALLB repository.
#   2. Copies ALLB's edge-worker source into a staging folder outside the repo,
#      with a minimal local wrangler config (no routes, no deploy, no build hook).
#   3. Starts `wrangler dev --local` on 127.0.0.1:8787, probes /health and one
#      real runtime operation, then runs the alpha7 LIVE contract tests.
#   4. Stops wrangler and checks ALLB's git status is unchanged.
#
# Safety: no files are written inside ALLB; nothing is deployed; no Cloudflare
# login is used. Downloads (crates, wasm-bindgen via wasm-pack, wrangler +
# workerd via npx into the npm cache) happen ONLY with
# MAATAA_EVIDENCE_ALLOW_DOWNLOADS=1. Missing tools are reported, not installed.
#
# Usage: MAATAA_EVIDENCE_ALLOW_DOWNLOADS=1 bash scripts/run-allb-live-handshake.sh
set -u

ALPHA7="$(cd "$(dirname "$0")/.." && pwd)"
ALLB="${ALLB_REPO:-/Users/vesahe/Documents/Repos/allb.xyz}"
BUILD_ROOT="${MAATAA_EVIDENCE_BUILD:-$HOME/maataa-evidence-build}"
WRANGLER_VERSION="4.126.0"   # ALLB pnpm-lock.yaml resolves wrangler@4.126.0
VITEST_VERSION="4.1.11"      # ALLB pnpm-lock.yaml resolves vitest@4.1.11
PORT=""
WASM_BINDGEN_VERSION="$(awk '/^name = "wasm-bindgen"$/ {getline; gsub(/[^0-9.]/,""); print; exit}' "${ALLB_REPO:-/Users/vesahe/Documents/Repos/allb.xyz}/Cargo.lock")"
STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
STAGE="$BUILD_ROOT/allb-live/$STAMP"
LOG="$ALPHA7/docs/product/evidence/allb-live-handshake-$STAMP.log"
ALLOW="${MAATAA_EVIDENCE_ALLOW_DOWNLOADS:-0}"
export RUSTUP_AUTO_INSTALL=0 CARGO_TERM_COLOR=never WRANGLER_SEND_METRICS=false
mkdir -p "$STAGE" "$(dirname "$LOG")"
RESULTS=()
log() { printf '%s\n' "$*" | tee -a "$LOG"; }
record() { RESULTS+=("$1 | $2"); log "=> $1: $2"; }
finish() {
  log ""; log "## Summary"; for r in "${RESULTS[@]}"; do log "- $r"; done
  log "Evidence log: $LOG"; exit "${1:-0}"
}

log "# ALLB live handshake $STAMP"
log "downloads allowed: $ALLOW"
log "ALLB commit: $(git -C "$ALLB" --no-optional-locks rev-parse HEAD)"
git -C "$ALLB" --no-optional-locks status --porcelain > "$STAGE/allb-status-before.txt"
log "ALLB status before:"; sed 's/^/    /' "$STAGE/allb-status-before.txt" >> "$LOG"

# ---- preflight -------------------------------------------------------------
missing=()
for tool in cargo rustup node npx curl shasum; do command -v "$tool" >/dev/null 2>&1 || missing+=("$tool"); done
if [ ${#missing[@]} -gt 0 ]; then record "preflight" "BLOCKED: missing tools: ${missing[*]} (not installing)"; finish 3; fi
# Build tool: a working wasm-pack, else cargo + wasm-bindgen CLI at the exact
# version locked in ALLB's Cargo.lock ($WASM_BINDGEN_VERSION).
BUILDER=""
if command -v wasm-pack >/dev/null 2>&1 && wasm-pack --version >/dev/null 2>&1; then
  BUILDER="wasm-pack"; log "wasm-pack: $(wasm-pack --version)"
else
  [ -n "$(command -v wasm-pack)" ] && log "NOTE: $(command -v wasm-pack) exists but does not run on this Mac ($(file -b "$(command -v wasm-pack)" | head -c 80)); using cargo + wasm-bindgen instead."
  BINDGEN=""
  for candidate in "$BUILD_ROOT/tools/bin/wasm-bindgen" "$(command -v wasm-bindgen 2>/dev/null)"; do
    [ -n "$candidate" ] && [ -x "$candidate" ] && [ "$("$candidate" --version 2>/dev/null | awk '{print $2}')" = "$WASM_BINDGEN_VERSION" ] && { BINDGEN="$candidate"; break; }
  done
  if [ -z "$BINDGEN" ]; then
    if [ "$ALLOW" = "1" ]; then
      log "Building wasm-bindgen-cli $WASM_BINDGEN_VERSION into $BUILD_ROOT/tools (contained; nothing global is changed)"
      cargo install wasm-bindgen-cli --version "$WASM_BINDGEN_VERSION" --locked --root "$BUILD_ROOT/tools" \
        --target-dir "$BUILD_ROOT/tools-target" >>"$LOG" 2>&1 && BINDGEN="$BUILD_ROOT/tools/bin/wasm-bindgen"
    fi
    if [ -z "$BINDGEN" ] || ! "$BINDGEN" --version >/dev/null 2>&1; then
      record "preflight" "BLOCKED: no runnable wasm-pack or wasm-bindgen $WASM_BINDGEN_VERSION"; finish 3
    fi
  fi
  BUILDER="cargo+wasm-bindgen"; log "wasm-bindgen: $("$BINDGEN" --version) ($BINDGEN)"
fi
PINNED=$(awk -F'"' '/^channel/ {print $2}' "$ALLB/rust-toolchain.toml")
TC="$PINNED"
if ! rustup toolchain list | grep -q "^$PINNED"; then
  DEFAULT_TC=$(rustup default | awk '{print $1}')
  if rustc +"$DEFAULT_TC" --version | grep -q "^rustc $PINNED "; then TC="$DEFAULT_TC"; log "NOTE: using '$TC' (same rustc $PINNED as ALLB's pinned name)."
  else record "preflight" "BLOCKED: rustc $PINNED not installed"; finish 3; fi
fi
if ! rustup target list --toolchain "$TC" --installed | grep -qx wasm32-unknown-unknown; then
  record "preflight" "BLOCKED: wasm32-unknown-unknown target not installed for $TC (run: rustup target add wasm32-unknown-unknown --toolchain $TC)"; finish 3
fi
if lsof -nP -iTCP:8787 -sTCP:LISTEN >/dev/null 2>&1; then
  log "NOTE: port 8787 is already in use and is left untouched:"; lsof -nP -iTCP:8787 -sTCP:LISTEN | sed 's/^/    /' >> "$LOG"
fi
for candidate in $(seq 8787 8799); do
  lsof -nP -iTCP:$candidate -sTCP:LISTEN >/dev/null 2>&1 || { PORT=$candidate; break; }
done
[ -z "$PORT" ] && { record "preflight" "BLOCKED: no free port in 8787-8799"; finish 3; }
record "preflight" "ok (toolchain $TC, wasm32 target present, builder $BUILDER, port $PORT)"

# ---- 1. WASM build outside the repo ----------------------------------------
NET_OFFLINE=true; [ "$ALLOW" = "1" ] && NET_OFFLINE=false
log ""; log "## WASM build via $BUILDER (output and target-dir outside ALLB)"
if [ "$BUILDER" = "wasm-pack" ]; then
  ( cd "$ALLB" && RUSTUP_TOOLCHAIN="$TC" CARGO_NET_OFFLINE=$NET_OFFLINE CARGO_TARGET_DIR="$BUILD_ROOT/allb-wasm-target" \
      wasm-pack build --target web --release --out-dir "$STAGE/pkg" ) >>"$LOG" 2>&1
  code=$?
else
  ( cd "$ALLB" && RUSTUP_TOOLCHAIN="$TC" CARGO_NET_OFFLINE=$NET_OFFLINE CARGO_TARGET_DIR="$BUILD_ROOT/allb-wasm-target" \
      cargo build --locked --lib --release --target wasm32-unknown-unknown ) >>"$LOG" 2>&1 \
  && "$BINDGEN" --target web --out-dir "$STAGE/pkg" --out-name maataa_runtime \
      "$BUILD_ROOT/allb-wasm-target/wasm32-unknown-unknown/release/maataa_runtime.wasm" >>"$LOG" 2>&1
  code=$?
  log "NOTE: wasm-opt (ALLB's optional size pass) not applied in this path; behaviour is unchanged, size is larger."
fi
if [ $code -ne 0 ] || [ ! -f "$STAGE/pkg/maataa_runtime_bg.wasm" ]; then
  record "wasm build" "FAIL($code) — see log (offline=$NET_OFFLINE; wasm-pack may need to download wasm-bindgen)"; finish 4
fi
record "wasm build" "PASS sha256 $(shasum -a 256 "$STAGE/pkg/maataa_runtime_bg.wasm" | awk '{print $1}') ($(wc -c < "$STAGE/pkg/maataa_runtime_bg.wasm" | tr -d ' ') bytes)"

# ---- 2. stage worker source -------------------------------------------------
mkdir -p "$STAGE/services/edge_worker"
cp -R "$ALLB/services/edge_worker/src" "$STAGE/services/edge_worker/src"
( cd "$ALLB/services/edge_worker/src" && find . -type f -print0 | sort -z | xargs -0 shasum -a 256 ) > "$STAGE/source-digests.txt"
( cd "$STAGE/services/edge_worker/src" && find . -type f -print0 | sort -z | xargs -0 shasum -a 256 ) | diff -q - "$STAGE/source-digests.txt" >/dev/null \
  && record "stage worker source" "PASS (byte-identical copy; digests in $STAGE/source-digests.txt)" \
  || { record "stage worker source" "FAIL copy mismatch"; finish 5; }
cat > "$STAGE/wrangler.local.jsonc" <<JSON
{
  "name": "maataa-sovereign-worker",
  "main": "services/edge_worker/src/index.ts",
  "compatibility_date": "2026-08-28",
  "compatibility_flags": ["nodejs_compat"],
  "workers_dev": false,
  "rules": [{ "type": "CompiledWasm", "globs": ["**/*.wasm"], "fallthrough": true }],
  "vars": { "ENVIRONMENT": "local-evidence" },
  "dev": { "ip": "127.0.0.1", "port": $PORT }
}
JSON
log "local wrangler config: same name/main/compatibility/rules as ALLB wrangler.jsonc; routes, build hook and observability removed; ENVIRONMENT=local-evidence"

# ---- 3. run wrangler dev locally ---------------------------------------------
if [ "$ALLOW" != "1" ]; then
  if ! (cd "$STAGE" && npx --no-install wrangler@$WRANGLER_VERSION --version) >/dev/null 2>&1; then
    record "wrangler" "BLOCKED: wrangler@$WRANGLER_VERSION not in npm cache; re-run with MAATAA_EVIDENCE_ALLOW_DOWNLOADS=1"; finish 6
  fi
fi
log ""; log "## wrangler dev --local"
( cd "$STAGE" && exec npx --yes wrangler@$WRANGLER_VERSION dev --config wrangler.local.jsonc --local --ip 127.0.0.1 --port $PORT ) >"$STAGE/wrangler.log" 2>&1 &
WPID=$!
cleanup() { kill "$WPID" 2>/dev/null; pkill -f "wrangler.local.jsonc" 2>/dev/null; pkill -f "workerd.*$STAGE" 2>/dev/null; }
trap cleanup EXIT
up=0
for _ in $(seq 1 120); do
  if curl -fsS "http://127.0.0.1:$PORT/health" >/dev/null 2>&1; then up=1; break; fi
  kill -0 "$WPID" 2>/dev/null || break
  sleep 1
done
sed 's/^/    [wrangler] /' "$STAGE/wrangler.log" | tail -40 >> "$LOG"
if [ $up -ne 1 ]; then record "wrangler dev" "FAIL: /health did not answer within 120 s"; finish 7; fi
record "wrangler dev" "PASS: local worker answering on 127.0.0.1:$PORT"

log ""; log "## ALLB worker route tests (vitest@$VITEST_VERSION on the staged copy)"
mkdir -p "$STAGE/tests/fixtures"
cp "$ALLB/tests/worker.test.ts" "$STAGE/tests/"; cp "$ALLB/tests/fixtures/wasm-module-stub.ts" "$STAGE/tests/fixtures/"; cp "$ALLB/vitest.config.ts" "$STAGE/"
printf '{"name":"allb-worker-evidence","private":true,"type":"module"}\n' > "$STAGE/package.json"
# vitest.config.ts imports "vitest/config", so vitest must be installed next to
# the staged copy (inside the build folder, never in ALLB or $HOME/node_modules).
( cd "$STAGE" && npm install --no-save --no-package-lock --no-audit --no-fund "vitest@$VITEST_VERSION" \
    && ./node_modules/.bin/vitest run tests/worker.test.ts ) >"$STAGE/vitest.log" 2>&1
code=$?
sed 's/^/    [vitest] /' "$STAGE/vitest.log" | tail -25 >> "$LOG"
[ $code -eq 0 ] && record "ALLB worker route tests" "PASS ($(perl -pe 's/\e\[[0-9;]*m//g' "$STAGE/vitest.log" | grep -Eo 'Tests +[0-9]+ passed' | head -1))" || record "ALLB worker route tests" "FAIL($code) — see log"

log ""; log "## Raw probes"
HEALTH=$(curl -sS "http://127.0.0.1:$PORT/health"); log "GET /health -> $HEALTH"
TOK=$(curl -sS -X POST -H 'content-type: application/json' --data '{"text":"𑀅𑀆"}' "http://127.0.0.1:$PORT/api/z0/tokenize-brahmi"); log "POST /api/z0/tokenize-brahmi (synthetic Brahmi text) -> $TOK"
SUTRA=$(curl -sS "http://127.0.0.1:$PORT/api/z0/sutra/6.1.77"); log "GET /api/z0/sutra/6.1.77 -> $SUTRA"
CAPS=$(curl -sS -w ' [HTTP %{http_code}]' "http://127.0.0.1:$PORT/capabilities"); log "GET /capabilities -> $CAPS"

# ---- 4. alpha7 live contract tests ------------------------------------------
log ""; log "## alpha7 LIVE contract tests"
( cd "$ALPHA7" && MAATAA_RUNTIME_URL="http://127.0.0.1:$PORT" node --experimental-strip-types --no-warnings --test tests/contracts/runtime-integration-gate.contract-spec.ts ) >"$STAGE/live-tests.log" 2>&1
grep -E "^(ok|not ok)|LIVE_HANDSHAKE_RESULT|LIVE_GATE_VERDICT|gate failed" "$STAGE/live-tests.log" | tee -a "$LOG" >/dev/null
grep -q "^ok .*LIVE: real loopback runtime answers" "$STAGE/live-tests.log" \
  && record "live handshake" "PASS: connected to ALLB worker (identity + contract version verified)" \
  || record "live handshake" "FAIL — see log"
if grep -q "^ok .*LIVE: Desktop integration acceptance gate" "$STAGE/live-tests.log"; then
  record "integration gate" "PASS"
else
  record "integration gate" "RED: $(grep -o 'gate failed: .*' "$STAGE/live-tests.log" | head -1)"
fi

cleanup; trap - EXIT; sleep 1
git -C "$ALLB" --no-optional-locks status --porcelain > "$STAGE/allb-status-after.txt"
diff -q "$STAGE/allb-status-before.txt" "$STAGE/allb-status-after.txt" >/dev/null \
  && record "ALLB working tree" "unchanged" || record "ALLB working tree" "CHANGED — see $STAGE"
lsof -nP -iTCP:$PORT -sTCP:LISTEN >/dev/null 2>&1 && record "cleanup" "WARNING: something still listening on $PORT" || record "cleanup" "wrangler stopped"
finish 0
