# ARO-KNOWLEDGE-TOOLS — Obsidian + Graphify Repository Brain

**Status:** IMPLEMENTED / pending merge verification  
**Type:** repository tooling; no product runtime behavior  
**Owner:** ARO Director  
**Dependencies:** ARO master recovery + spec-driven registry  

## 1. Problem

ARO contains a large product vision, specialist specifications, durable decisions, legacy Tonguee implementation, SQL/RLS, tests, and future work packages. Flat file search alone makes it too easy for agents or humans to miss relationships, duplicate concepts, or work from stale context.

## 2. Outcome

Provide two complementary knowledge layers:

- **Obsidian** for human navigation, backlinks, linked specs, decisions, and graph visualization.
- **Graphify** for machine-queryable relationships across code, docs, SQL, configs, and architecture.

Both layers reduce context/search cost while preserving the spec hierarchy as authority.

## 3. Goals

1. Make the repository root directly usable as an Obsidian vault.
2. Provide a single ARO vault entry point linking master, specs, status, decisions, and specialist documents.
3. Provide project-scoped Graphify/Codex guidance.
4. Pin the Graphify package used by ARO tooling.
5. Provide Windows and Unix installation scripts.
6. Keep Graphify outputs and Obsidian transient workspace state out of Git.
7. Require graph conclusions to be verified against source/specs before implementation decisions.

## 4. Non-goals

- Do not add Obsidian or Graphify to the application runtime bundle.
- Do not vendor the large `obsidianmd/obsidian-releases` repository; it contains release/plugin/theme metadata rather than the application source.
- Do not make Graphify inferred edges authoritative.
- Do not commit generated `graphify-out/` by default.
- Do not weaken existing package/spec review requirements.
- Do not require a cloud graph service or external database.

## 5. Upstreams

### Obsidian

- Official release/community metadata: `obsidianmd/obsidian-releases`
- Integration model: repository root is the vault; `.obsidian/` contains shared minimal graph/app settings.

### Graphify

- Repository: `Graphify-Labs/graphify`
- Package: `graphifyy==0.9.49`
- CLI: `graphify`
- License upstream: Apache-2.0
- Project-scoped Codex registration: `graphify install --project --platform codex`

## 6. Repository surfaces

- `ARO_HOME.md`
- `.obsidian/app.json`
- `.obsidian/graph.json`
- `.agents/skills/graphify/SKILL.md`
- `tools/knowledge/README.md`
- `tools/knowledge/install.ps1`
- `tools/knowledge/install.sh`
- `.gitignore` generated/transient knowledge-tool entries

## 7. Authority boundary

Knowledge tooling follows this invariant:

`graph discovery → source/spec verification → governing authority → package decision`

It must never become:

`graph inference → implementation`

The source-of-truth hierarchy remains defined by `AGENTS.md`.

## 8. Security and privacy

- Graphify is repository tooling and may index source/docs locally.
- Sensitive files must remain excluded from Git and should not be intentionally added to graph corpora.
- `.env` and provider secrets must never be copied into Obsidian notes or Graphify source corpora deliberately.
- Generated graph artifacts are local by default and ignored.
- Semantic extraction/cloud behavior must not be assumed safe for sensitive data; a future package must explicitly authorize any external semantic backend.

## 9. Performance / cost

- No production bundle impact: **0 runtime dependency target**.
- No application-request latency impact: **0 ms target**.
- Generated graph outputs remain local and incremental updates are preferred after the initial build.
- Use Graphify primarily to reduce repeated repository reading and context cost, not to add another mandatory CI bottleneck.

## 10. Acceptance criteria

- [x] Repository root has an Obsidian entry note linking the canonical ARO documents.
- [x] Minimal shared Obsidian configuration exists.
- [x] Graphify upstream and package version are documented.
- [x] Windows installer exists.
- [x] Unix installer exists.
- [x] Project-scoped Graphify skill exists under `.agents/skills/graphify/`.
- [x] `AGENTS.md` defines how graphs may and may not influence implementation.
- [x] Generated Graphify output and Obsidian workspace/cache state are ignored.
- [x] Product runtime dependencies are unchanged.
- [x] No schema, RLS, auth, money, Trust, or user behavior is changed.

## 11. Verification evidence

Before merge:

1. PR file list contains only documentation, agent tooling, `.obsidian/`, scripts, and ignore rules.
2. No `package.json`, runtime source, Supabase migration, RLS, or payment file changes.
3. Obsidian links resolve to existing canonical Markdown files by basename/path.
4. Install scripts reference the pinned `graphifyy==0.9.49` package and project-scoped Codex install.
5. Graphify output remains ignored.

## 12. Definition of Done

This package is VERIFIED when its PR is reviewed/merged into the ARO director branch and the changed-file audit confirms no runtime/product behavior changes.

Local Graphify binary installation on a developer machine is an environment setup action, not a Git verification requirement. The repository contains everything necessary to perform that setup consistently.
