$ErrorActionPreference = 'Stop'

Write-Host "ARO Knowledge Tooling — Windows setup"

if (-not (Get-Command uv -ErrorAction SilentlyContinue)) {
  Write-Host "uv was not found. Install it with: winget install astral-sh.uv"
  exit 1
}

Write-Host "Installing pinned Graphify CLI (graphifyy==0.9.49)..."
uv tool install --upgrade "graphifyy==0.9.49"

Write-Host "Registering the official Graphify skill project-scoped for Codex..."
graphify install --project --platform codex

Write-Host ""
Write-Host "Graphify is ready for this repository."
Write-Host "Use: graphify ."
Write-Host "Use: graphify query \"How does the Trust Engine connect to publishing?\""
Write-Host "Use: graphify path \"ARO Catalyst\" \"Passport\""
Write-Host ""
Write-Host "Obsidian: open this repository root as a vault and start at ARO_HOME.md."
