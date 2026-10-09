#!/bin/bash
# Phase 5 runtime evidence collector (macOS host).
#
# Read-only toward source trees:
#   - cargo always runs with --offline --locked (no downloads, no lockfile writes)
#   - CARGO_TARGET_DIR points OUTSIDE every repository
#   - RUSTUP_AUTO_INSTALL=0; steps whose pinned toolchain/target is not
#     already installed are SKIPPED, never installed
#   - git is used with --no-optional-locks; status is captured before/after
# Nothing is installed, fetched, committed, cleaned or deleted.
#
# Optional: MAATAA_EVIDENCE_ALLOW_FETCH=1 first runs `cargo fetch --locked` per
# repository. That downloads crates into ~/.cargo (network) but writes nothing
# inside the repositories; every build step stays --offline --locked.
#
# Usage:  bash scripts/collect-runtime-evidence.sh
# Output: docs/product/evidence/runtime-evidence-<UTC>.log (in this checkout)
set -u

ALPHA7="$(cd "$(dirname "$0")/.." && pwd)"
ALLB="${ALLB_REPO:-/Users/vesahe/Documents/Repos/allb.xyz}"
MOS="${MAATAA_OS_REPO:-/Users/vesahe/revenue/live/maataa-os}"
BUILD_ROOT="${MAATAA_EVIDENCE_BUILD:-$HOME/maataa-evidence-build}"
MIN_FREE_GB="${MAATAA_EVIDENCE_MIN_FREE_GB:-15}"
STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
LOG="$ALPHA7/docs/product/evidence/runtime-evidence-$STAMP.log"
export RUSTUP_AUTO_INSTALL=0 CARGO_TERM_COLOR=never
mkdir -p "$(dirname "$LOG")"
SUMMARY=()

log() { printf '%s\n' "$*" | tee -a "$LOG"; }
step() { # step <name> <dir> <cmd...>
  local name="$1" dir="$2"; shift 2
  log ""; log "### $name"; log "\$ (cd $dir && $*)"
  ( cd "$dir" && "$@" ) >>"$LOG" 2>&1
  local code=$?
  log "exit=$code"
  SUMMARY+=("$( [ $code -eq 0 ] && echo PASS || echo "FAIL($code)" ) | $name")
  return $code
}
skip() { log ""; log "### $1"; log "SKIPPED: $2"; SUMMARY+=("SKIPPED | $1 | $2"); }
snapshot() { # snapshot <label> <repo>
  log "--- $1: $2"
  log "commit: $(git -C "$2" --no-optional-locks rev-parse HEAD 2>&1)"
  log "branch: $(git -C "$2" --no-optional-locks branch --show-current 2>&1)"
  git -C "$2" --no-optional-locks status --porcelain >"$BUILD_ROOT/status-$1-$(basename "$2").txt" 2>&1
  log "status (porcelain):"; sed 's/^/    /' "$BUILD_ROOT/status-$1-$(basename "$2").txt" | tee -a "$LOG" >/dev/null
}

mkdir -p "$BUILD_ROOT"
log "# MAATAA runtime evidence $STAMP"
log "host: $(uname -a)"
FREE_GB=$(df -Pk "$HOME" | awk 'NR==2 {print int($4/1048576)}')
log "free space on \$HOME volume: ${FREE_GB} GB (minimum required: $MIN_FREE_GB GB)"
if [ "${FREE_GB:-0}" -lt "$MIN_FREE_GB" ]; then log "ABORT: insufficient free disk"; exit 2; fi

log ""; log "## Tool versions"
for tool in cargo rustc rustup node pnpm qemu-system-arm arm-none-eabi-size; do
  if command -v "$tool" >/dev/null 2>&1; then log "$tool: $("$tool" --version 2>&1 | head -1)"; else log "$tool: NOT FOUND"; fi
done
HAVE_CARGO=0; command -v cargo >/dev/null 2>&1 && HAVE_CARGO=1
toolchain_installed() { rustup toolchain list 2>/dev/null | grep -q "^$1"; }
ALLOW_FETCH="${MAATAA_EVIDENCE_ALLOW_FETCH:-0}"
log "crate fetch allowed: $ALLOW_FETCH"
maybe_fetch() { # maybe_fetch <name> <dir> [env...]
  local name="$1" dir="$2"; shift 2
  if [ "$ALLOW_FETCH" = "1" ]; then step "$name: cargo fetch --locked (network, ~/.cargo only)" "$dir" env "$@" cargo fetch --locked; fi
}
target_installed() { rustup +"$1" target list --installed 2>/dev/null | grep -qx "$2"; }

log ""; log "## Repository state BEFORE"
for repo in "$ALPHA7" "$ALLB" "$MOS"; do snapshot before "$repo"; done

log ""; log "## Checks"
# 1. alpha7 contract suite (node only)
if command -v node >/dev/null 2>&1; then
  step "alpha7 contracts typecheck" "$ALPHA7" node node_modules/typescript/bin/tsc -p tsconfig.contracts.json
  step "alpha7 contract tests" "$ALPHA7" bash -c 'node --experimental-strip-types --no-warnings --test tests/contracts/*.contract-spec.ts'
else skip "alpha7 contract tests" "node not found"; fi

# 2. alpha7 Tauri desktop
if [ $HAVE_CARGO -eq 1 ]; then
  step "alpha7 Tauri cargo fmt --check" "$ALPHA7/apps/maataa-desktop-tauri/src-tauri" cargo fmt --check
  step "alpha7 Tauri cargo test" "$ALPHA7/apps/maataa-desktop-tauri/src-tauri" \
    env CARGO_TARGET_DIR="$BUILD_ROOT/alpha7-tauri" cargo test --offline --locked
else skip "alpha7 Tauri cargo test" "cargo not found"; fi

# 3. ALLB (pinned toolchain from its rust-toolchain.toml)
ALLB_TC=$(awk -F'"' '/^channel/ {print $2}' "$ALLB/rust-toolchain.toml" 2>/dev/null)
if [ $HAVE_CARGO -eq 0 ]; then skip "ALLB cargo test" "cargo not found"
else
  ALLB_RUSTUP_TC=""
  if [ -n "$ALLB_TC" ] && ! toolchain_installed "$ALLB_TC"; then
    DEFAULT_TC=$(rustup default 2>/dev/null | awk '{print $1}')
    if [ -n "$DEFAULT_TC" ] && rustc +"$DEFAULT_TC" --version 2>/dev/null | grep -q "^rustc $ALLB_TC "; then
      ALLB_RUSTUP_TC="$DEFAULT_TC"
      log ""; log "NOTE: ALLB pins toolchain '$ALLB_TC', which is not installed under that name."
      log "      Using installed '$DEFAULT_TC' because it is the same rustc version ($(rustc +"$DEFAULT_TC" --version))."
      log "      Pinned components/targets (clippy, rustfmt, wasm32) are not required by cargo test."
    fi
  fi
  if [ -n "$ALLB_TC" ] && ! toolchain_installed "$ALLB_TC" && [ -z "$ALLB_RUSTUP_TC" ]; then
    skip "ALLB cargo test" "pinned toolchain $ALLB_TC not installed and no same-version toolchain available (not auto-installing)"
  else
    ALLB_ENV=(CARGO_TARGET_DIR="$BUILD_ROOT/allb")
    [ -n "$ALLB_RUSTUP_TC" ] && ALLB_ENV+=(RUSTUP_TOOLCHAIN="$ALLB_RUSTUP_TC")
    step "ALLB contract drift check" "$ALLB" node scripts/generate-contracts.mjs --check
    maybe_fetch "ALLB" "$ALLB" "${ALLB_ENV[@]}"
    step "ALLB cargo test (default members: runtime + siddham-contracts)" "$ALLB" \
      env "${ALLB_ENV[@]}" cargo test --offline --locked
    step "ALLB cargo test (Siddham Authority desktop)" "$ALLB" \
      env "${ALLB_ENV[@]}" cargo test --offline --locked -p siddham-authority-desktop
  fi
fi

# 4. maataa-os: host tests, embedded build, size, QEMU boot
MOS_TARGET=thumbv7em-none-eabihf
MOS_DIR="$BUILD_ROOT/maataa-os"
if [ $HAVE_CARGO -eq 0 ]; then skip "maataa-os checks" "cargo not found"
else
  HOST_TRIPLE=$(rustc -vV | awk '/host:/ {print $2}')
  maybe_fetch "maataa-os" "$MOS" CARGO_TARGET_DIR="$MOS_DIR"
  step "maataa-os host unit tests" "$MOS" env CARGO_TARGET_DIR="$MOS_DIR" cargo test --offline --locked --lib --target "$HOST_TRIPLE"
  MOS_TC=$(cd "$MOS" && rustup show active-toolchain 2>/dev/null | awk '{print $1}')
  if ! (cd "$MOS" && rustup target list --installed 2>/dev/null | grep -qx "$MOS_TARGET"); then
    skip "maataa-os embedded build + QEMU" "target $MOS_TARGET not installed for toolchain ${MOS_TC:-unknown} (not auto-installing)"
  else
    step "maataa-os cargo check ($MOS_TARGET)" "$MOS" env CARGO_TARGET_DIR="$MOS_DIR" cargo check --offline --locked --target "$MOS_TARGET"
    if step "maataa-os release build ($MOS_TARGET)" "$MOS" env CARGO_TARGET_DIR="$MOS_DIR" cargo build --offline --locked --release --target "$MOS_TARGET"; then
      BIN="$MOS_DIR/$MOS_TARGET/release/maataa-os"
      log "binary sha256: $(shasum -a 256 "$BIN" | awk '{print $1}')"
      if command -v arm-none-eabi-size >/dev/null 2>&1; then
        step "maataa-os size check (<= 524288 bytes text+data)" "$MOS" bash -c "arm-none-eabi-size '$BIN' && test \$(arm-none-eabi-size -B '$BIN' | tail -1 | awk '{print \$1+\$2}') -le 524288"
      else skip "maataa-os size check" "arm-none-eabi-size not found"; fi
      if command -v qemu-system-arm >/dev/null 2>&1; then
        step "maataa-os QEMU boot (netduinoplus2, 60s limit)" "$MOS" perl -e 'alarm 60; exec @ARGV' \
          qemu-system-arm -machine netduinoplus2 -cpu cortex-m4 -kernel "$BIN" -nographic \
          -semihosting -semihosting-config enable=on,target=native -serial mon:stdio </dev/null
      else skip "maataa-os QEMU boot" "qemu-system-arm not found"; fi
    fi
  fi
fi

log ""; log "## Repository state AFTER"
CHANGED=0
for repo in "$ALPHA7" "$ALLB" "$MOS"; do
  snapshot after "$repo"
  if ! diff -q "$BUILD_ROOT/status-before-$(basename "$repo").txt" "$BUILD_ROOT/status-after-$(basename "$repo").txt" >/dev/null; then
    CHANGED=1; log "WARNING: working tree of $repo changed during the run:"
    diff "$BUILD_ROOT/status-before-$(basename "$repo").txt" "$BUILD_ROOT/status-after-$(basename "$repo").txt" | tee -a "$LOG"
  fi
done
# The log file itself is new in alpha7; that is expected.

log ""; log "## Summary"
for line in "${SUMMARY[@]}"; do log "- $line"; done
log "external repos unchanged: $([ $CHANGED -eq 0 ] && echo yes || echo NO-see-above)"
log "build outputs: $BUILD_ROOT (outside all repositories; safe to delete)"
log ""; log "Evidence log: $LOG"
