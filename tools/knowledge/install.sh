#!/usr/bin/env bash
set -euo pipefail

echo "ARO Knowledge Tooling — Unix setup"

if ! command -v uv >/dev/null 2>&1; then
  echo "uv was not found. Install it first: https://docs.astral.sh/uv/getting-started/installation/"
  exit 1
fi

echo "Installing pinned Graphify CLI (graphifyy==0.9.49)..."
uv tool install --upgrade "graphifyy==0.9.49"

echo "Registering the official Graphify skill project-scoped for Codex..."
graphify install --project --platform codex

echo
echo "Graphify is ready for this repository."
echo 'Use: graphify .'
echo 'Use: graphify query "How does the Trust Engine connect to publishing?"'
echo 'Use: graphify path "ARO Catalyst" "Passport"'
echo
echo "Obsidian: open this repository root as a vault and start at ARO_HOME.md."
