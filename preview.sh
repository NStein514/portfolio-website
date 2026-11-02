#!/usr/bin/env bash
# Local preview for this portfolio site.
#
#   ./preview.sh
#
# Starts the Vite dev server, waits until it is actually answering, then opens
# it in your browser. Edits hot-reload in place. Press Ctrl+C to stop.
#
# This script never runs git commands, never commits, never pushes, and never
# deploys. Nothing it does is visible anywhere except on this computer.

set -euo pipefail

cd "$(dirname "$0")"

log() { printf '\033[1;36m==>\033[0m %s\n' "$*"; }
fail() { printf '\033[1;31mError:\033[0m %s\n' "$*" >&2; exit 1; }

# --- 1. Dependencies -------------------------------------------------------
if [ ! -x node_modules/.bin/vite ]; then
  log "First run: installing dependencies (this changes no tracked files)..."
  if command -v bun >/dev/null 2>&1; then
    bun install --frozen-lockfile || fail "bun install failed."
  elif command -v npx >/dev/null 2>&1; then
    # Use Bun through npx so bun.lock stays the source of truth.
    npx --yes bun@1 install --frozen-lockfile || fail "Dependency install failed."
  elif command -v npm >/dev/null 2>&1; then
    npm install --no-package-lock || fail "Dependency install failed."
  else
    fail "Need bun, npx, or npm to install dependencies."
  fi
fi

# --- 2. Start the dev server ----------------------------------------------
LOG_FILE="$(mktemp -t portfolio-preview).log"

log "Starting local preview (not a commit, not a deploy)..."
node_modules/.bin/vite dev >"$LOG_FILE" 2>&1 &
VITE_PID=$!

cleanup() {
  if kill -0 "$VITE_PID" 2>/dev/null; then
    kill "$VITE_PID" 2>/dev/null || true
    wait "$VITE_PID" 2>/dev/null || true
  fi
  rm -f "$LOG_FILE"
  printf '\nPreview stopped.\n'
}
trap cleanup EXIT INT TERM

# --- 3. Wait for it to be reachable ---------------------------------------
URL=""
for _ in $(seq 1 240); do
  URL="$(grep -Eo 'http://localhost:[0-9]+/?' "$LOG_FILE" | head -1 || true)"
  [ -n "$URL" ] && break
  if ! kill -0 "$VITE_PID" 2>/dev/null; then
    echo "--- dev server output ---" >&2
    cat "$LOG_FILE" >&2
    fail "The dev server exited before it was ready."
  fi
  sleep 0.25
done

if [ -z "$URL" ]; then
  echo "--- dev server output ---" >&2
  cat "$LOG_FILE" >&2
  fail "Timed out waiting for the dev server. See output above."
fi

# Poll until the page actually responds, so the browser does not open too early.
for _ in $(seq 1 120); do
  if curl -fsS -o /dev/null "$URL" 2>/dev/null; then break; fi
  sleep 0.25
done

log "Your site is running locally at: $URL"
log "Edit files and the page updates instantly. Press Ctrl+C to stop."
log "Nothing here is live on your domain."

if [ "$(uname)" = "Darwin" ]; then
  open "$URL" >/dev/null 2>&1 || true
else
  command -v xdg-open >/dev/null 2>&1 && xdg-open "$URL" >/dev/null 2>&1 || true
fi

printf '\n'
tail -f "$LOG_FILE" &
TAIL_PID=$!
wait "$VITE_PID" || true
kill "$TAIL_PID" 2>/dev/null || true
