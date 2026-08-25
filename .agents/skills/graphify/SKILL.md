---
name: graphify
description: "Use for ARO codebase architecture, file relationships, cross-spec dependencies, SQL/RLS relationships, and project-content questions. Prefer an existing graphify-out/graph.json before broad raw-file exploration."
---

# ARO Graphify Skill

Graphify is repository tooling for understanding the ARO/Tonguee codebase and specification graph. It is **not** implementation authority.

Upstream: `Graphify-Labs/graphify`
Pinned CLI package: `graphifyy==0.9.49`

## First rule

For architecture, dependency, flow, ownership, or “where is this implemented?” questions:

1. Check whether `graphify-out/graph.json` exists.
2. If it exists, query the graph before broad raw-file exploration.
3. Verify important conclusions against source/spec files.
4. Resolve authority through `AGENTS.md`, `ARO_BUILD_PLAYBOOK.md`, the package spec, and specialist specs.

## Core commands

```bash
graphify .
graphify . --update
graphify . --mode deep
graphify . --watch
graphify . --wiki
graphify query "<question>"
graphify path "<concept A>" "<concept B>"
graphify explain "<concept>"
```

## ARO queries worth using

```bash
graphify query "How does teacher verification protect experience publishing?"
graphify query "Which files enforce Supabase RLS and admin authorization?"
graphify query "How does Passport connect bookings, cities, and outcomes?"
graphify path "ARO Signal" "ARO Proof"
graphify path "teacher application" "published experience"
graphify explain "Trust Engine"
```

## Install/refresh

If the `graphify` command is missing, use the repository installer:

Windows:

```powershell
./tools/knowledge/install.ps1
```

macOS/Linux:

```bash
bash tools/knowledge/install.sh
```

The installer runs Graphify's official project-scoped Codex registration as well.

## Safety and spec boundaries

- Do not treat `INFERRED` graph edges as facts without verification.
- Do not use Graphify output to bypass RLS, Trust, privacy, money, or package gates.
- Do not commit generated `graphify-out/` unless a future package explicitly authorizes a durable graph artifact.
- Graphify is for finding relationships and reducing context/search cost; approved specs remain the source of truth.
