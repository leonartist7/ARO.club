# ARO frontend implementation handoff

Version 1.0 · 2026-09-23 · Architecture proposal prepared for the next implementation model.

## Mandate

Make ARO a warm, legible, tactile world that helps people do meaningful things together. Build the complete participant experience, then deepen expression and Seasons. The ambition is an award-worthy experience; awards and universal appeal are aspirations, not acceptance claims. Borrow the clarity, friendly feedback and coherent illustration system of excellent learning apps without copying Duolingo's identity or introducing pressure mechanics.

This handoff translates the [master blueprint](../experience-foundation/MASTER-BLUEPRINT.md) into bounded work. It does not replace that blueprint's 64 screen families, the governing documents, or approved specialist specifications. No runtime changed in this handoff.

Read in order:

1. Repository `AGENTS.md` and its required authority chain.
2. This document and [shared implementation contract](SHARED-CONTRACT.md).
3. [Execution packages](PACKAGES.md), selecting exactly one eligible package.
4. [Screen and capability map](SCREEN-MAP.md).
5. [Asset direction](ASSET-DIRECTION.md) for that package.
6. [Acceptance ledger](ACCEPTANCE.md).
7. [Receiving-model prompt](GPT6-PROMPT.md).

## Verified starting points

| Reference | Observed state on September 23 |
|---|---|
| Repository | `leonartist7/ARO.club` |
| Main | `0661589affcf54a1324e489b09afb213a1a4019f` — advanced since the preview was built |
| Personalization PR #60 | Predecessor of EF1; do not assume merged |
| EF1 PR #61 | Open draft; base `codex/aro-personalization-preview-20260922` |
| EF1 published head | `fec6492c3b54952b1dbb048fc60457a6402ec7cd` |
| EF1 tree | `8b475d3d6d1d7441e799ac541c64f950d1dcd3fe` |
| EF1 head checks | `static`, `browser-smoke`, `platform`, Vercel Preview Comments completed successfully |
| Local equivalent before this document | `72c0f1b`; identical tree, different commit lineage |
| Live coordination source | `codex/aro-overnight-controller-20260916`; read its newest ledger before allocation |

Source: GitHub PR, branch and check-run endpoints read on September 23. CI success is not independent product acceptance. Local graph output was absent; no Graphify graph was available to query.

The first implementation session must reconcile main, PR60, PR61 and the controller branch. Do not start from an old SHA merely because it is printed here. Preserve newer safe-reset diagnostics and other main changes. Do not merge these branches automatically or assume that copying the EF1 tree over main is safe.

## What exists versus what remains

EF1 contains the consumer navigation, sample Messages and Saved pages, a more legible Season hub, and mobile personalization navigation. PV1 contains five working synthetic personalization screens, original optimized artwork, character choices and room placement. These are preview experiences with local state.

EF1 evidence records 27 passing scoped tests and one inherited skipped browser case, build/lint success, eight Season width/theme checks and two additional locale checks. Browser route-switch evaluation prevented a complete changed-route matrix. Physical phone, full assistive-technology, performance, network and independent acceptance evidence remain incomplete. See [the original evidence](../experience-foundation/VERIFICATION.md); do not rewrite its historical results.

There is no defensible whole-product percentage yet. Screen count is not functional completion. Track design specified, implemented, evidence complete, independently accepted, and released separately. The ledger in this handoff establishes that denominator for the next work packages only.

## Execution order

| Order | Package | Outcome | Current eligibility |
|---|---|---|---|
| 0 | EF-Q | Reconciled baseline and precise outstanding verification | Read-only reconciliation/evidence preparation can start now; fixes stay within an applicable approved spec |
| 1 | EF-P | Cohesive Home → Explore → detail → commit preview → Circle | Proposed; reconcile FV2 ownership and get package adopted |
| 2 | EF-C | Useful Learn/Share/Gather proposal preview | Proposed; reconcile FV3 ownership and get package adopted |
| 3 | EF-I | Clear identity, expression and Passport hierarchy | Proposed; package adoption required |
| 4 | EF-S | Attractive Season detail, chapter flow and archive preview | Proposed; package adoption required; no progression service |
| 5 | EF-X | Coherent collection, character and room customization | Proposed; package adoption required; no checkout |
| Later | Operational and connected capability packages | Host, support, commerce, proof, location and partner systems | Individually specified after governing dependencies |

One package, one branch, one PR. Sequence is intentional: make participation understandable before adding more ornament. EF-S and EF-X own overlapping personalization files and must run serially. A new owner must consume the previous package's exact final SHA and evidence.

## Decisions fixed for these proposals

- Keep Home / Explore / Create / Messages / Saved as consumer primary navigation; the avatar opens Your World.
- Your World is expression. Personal Field is the existing profile concept. Passport is lived memory. Saved is future intent to revisit. Shop/Collection is objects. My Space is decoration. Real-world Spaces remain a different concept.
- Season 01 is **Awaken Your City**, with Step Outside, Connect, Contribute, Create. Its attraction comes from a coherent world and useful invitations.
- Use existing typography, tokens, contexts, primitives and original assets. No new design system or renderer dependency.
- Preview actions are honestly labeled and reversible. Memory objects are not currency, trust or financial assets.
- Current proposals do not introduce prices, recurring billing, rewards, real completion, persistent drafts, public profiles or data collection.

## Adoption record needed before new runtime work

Each proposed package must be copied into `specs/` using `PACKAGE_TEMPLATE.md`, with the shared contract's sections incorporated by reference, and assigned a version, owner, exact source SHA, dependency results, reviewer and explicit SPEC-READY record from the authorized process. Resolve any conflict with older FV2/FV3 proposals in that record. Do not self-approve. The user requested this architecture handoff; this document intentionally leaves approval and implementation status truthful.

The next model may finish reconciliation, exact scope preparation and evidence organization autonomously. If an implementation gate remains closed, deliver the concrete adoption packet and continue other authorized preparation. Do not turn a speculative capability into runtime just to make the demo appear complete.
