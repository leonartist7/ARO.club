# ARO Knowledge Tooling

ARO uses two complementary project-brain layers.

## 1. Obsidian — human knowledge graph

The repository root is intentionally Obsidian-compatible. Open the repo folder as an Obsidian vault and start at `ARO_HOME.md`.

Obsidian is used for:

- master-plan navigation;
- backlinks between specs and decisions;
- graph visualization of product/architecture relationships;
- founder notes and decision discovery;
- quickly seeing which concepts are disconnected or over-coupled.

The official `obsidianmd/obsidian-releases` repository contains releases, community plugin metadata and themes. It is referenced as upstream tooling but is **not vendored into the product repository**, because it is not the Obsidian application source and would add a large unrelated dependency.

Upstream: `https://github.com/obsidianmd/obsidian-releases`

## 2. Graphify — machine knowledge graph

Upstream: `https://github.com/Graphify-Labs/graphify`

Pinned package for this project: `graphifyy==0.9.49`.

Graphify maps code, Markdown, SQL, configs and other project material into a queryable knowledge graph. The CLI command remains `graphify`.

### Install

Windows:

```powershell
./tools/knowledge/install.ps1
```

macOS/Linux:

```bash
bash tools/knowledge/install.sh
```

The installer uses Graphify's official project-scoped Codex integration:

```bash
graphify install --project --platform codex
```

This creates the official Graphify skill beneath the repository's agent-skill directory rather than modifying ARO runtime dependencies.

### Build the graph

```bash
graphify .
```

Useful forms:

```bash
graphify . --mode deep
graphify . --update
graphify . --watch
graphify . --wiki
graphify . --svg
graphify query "How does teacher verification protect experience publishing?"
graphify path "ARO Signal" "ARO Proof"
graphify explain "Passport"
```

Graphify output belongs in `graphify-out/` and is treated as generated analysis, not product authority.

## Source-of-truth rule

Neither Obsidian nor Graphify changes ARO authority.

The hierarchy remains:

`AGENTS.md → ARO_BUILD_PLAYBOOK.md → approved package spec → specialist specs / decisions`

Graphs help discover relationships, contradictions and optimization opportunities. They do **not** authorize schema, Trust, money, privacy, AI or product changes.

## Recommended workflow for every ARO package

1. Open `ARO_HOME.md` in Obsidian and inspect related specs/decisions.
2. If `graphify-out/graph.json` exists, query Graphify before broad source exploration.
3. Write/approve the package spec.
4. Implement only the approved package.
5. Run tests and performance/accessibility/security evidence.
6. Run `graphify . --update` after meaningful architecture changes.
7. Update `ARO_IMPLEMENTATION_STATUS.md` and relevant Obsidian links.

This gives ARO both a **human second brain** and a **machine-readable architecture brain** while remaining spec-driven.
