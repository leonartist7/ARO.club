# Latest-work reconciliation — 2026-09-21

This integration preserves the latest reviewed Next.js runtime from main b44c82f59a339c0c240894c981401625df9456de. It adds reviewed delivery/submission records and reconciles two independently developed AUTO0 fixes. It does not activate obsolete implementations or claim that all product gates have passed.

Authority: [MERGE1](../../specs/ARO-MERGE1-RECONCILIATION.md). The sole live controller ledger remains on branch `codex/aro-overnight-controller-20260916`; any main copy is an integration snapshot. Read its latest version before claiming work. Existing F7/N1 ownership and FV2/FV3 accepted preparation are preserved.

## Complete open-PR disposition

The immutable head for every PR and every fetched remote branch is recorded in [refs.json](refs.json). Original branches remain intact. Independent legacy and Trust reviewers inspected actual source, not just PR titles or mergeability.

| PR | Disposition in this integration | Reason / remaining action |
|---|---|---|
| 5, 6, 7, 8 | Already included in main | Each exact head is an ancestor of b44c82f, with zero unique commits. Conflicts against their obsolete target branches do not indicate missing features. |
| 15 | Preserved inactive proposal | Legacy Codex harness/skills use Vite launch and weaker source/environment/server boundaries. Keep original head and recovery bundle; do not activate old skills/workflow or replace AUTO0. |
| 16 | Superseded remediation; observations retained below | Current SEC0 resolves active-tree secret removal/history decision through c2c8e38. Old provider observations are historical, not current verified findings. |
| 17 | Superseded specification | Current approved P1 spec from ee0c506 uses aro_profile_goals/aro_profile_capabilities. Old aro_learning_goals/aro_capabilities schema and semantics must not be combined. P1 baseline gates stay open. |
| 36 | Preserved inactive automation | New comment-triggered external worker, unpinned action and id-token write permission require their own authority/security review. Not activated. |
| 47 | Original amendment diff preserved, not applied | Historical patch retains approved CPU proposal. Binding/ownership/registry review corrections remain with F7 owner; no silent lab or release approval. |
| 48 | Original F7 evidence preserved, not accepted | Historical patch retains complete failed preflight/acceptance JSON. No F7 measurements or human acceptance exist in that record. |
| 49 | New historical handoff documents included; full original diff preserved | Current status must use this reconciliation and live controller ledger. Older source/profile hashes and N1-not-started prose are historical, not current dispatch authority. Do not replace newer registries or manifests with old versions. |
| 50 | Included with commit ancestry | Canonical controller decisions, original failure evidence and accepted preparation records preserved. Live writes remain on canonical branch. |
| 51, 52, 53 | Runtime corrections superseded by merged PR54 | Detailed mapping below proves preservation; do not restore Vite implementation or overwrite stronger current tests. Original failed runs remain failures. |
| 55 | Included with commit ancestry | Reviewed SH1 preparation, category answers, truthful submission drafts, native/Pro proposal and sprint. Date-specific findings are historical; newer controller results supersede status assumptions only. |
| 56 | Included with commit ancestry | Fixed Next inventory/launch and fresh synthetic browser build, independently verified 150-case capture on matching merge tree. |
| 57 | Included with commit ancestry and reviewed conflict resolution | Adds route-handler/kind and routeFramework metadata through PR56's stricter single scanner. C1 regression test retained; page/handler collision and escaping-handler tests added. No C1 schedule/checkpoint change. |

## Trust/auth preservation map

PR51→52→53 is cumulative. Independent review found no missing accepted runtime correction versus main.

| Historical path / behavior | Current main disposition |
|---|---|
| src/lib/admin.js | Identical blob 85afe03731c20c1ee10bb9e062999a3b9e4950bd |
| tools/ci/boundary.test.mjs | Identical blob 2b07a096b74fc446dae1ee21f66f893500f3866a |
| 20260916103000_i02_corrective_repairs.sql | Identical blob e8732358851d143eec93d477c9dca8ec3d45cd83 |
| 20260916113000_i02_protect_teacher_verification_history.sql | Identical blob 96e6760d2b2c901736bdc9863c4d3582e6341687 |
| teacherApplications.js and tests | Server submission and compensation retained; safe cleanup outcome and original-error preservation strengthened |
| TeacherOnboarding component/test | Moved pages→views; draft persistence retained with Next navigation, accessible selectors, truthful copy and contrast fix |
| ux0.js old disposable Vite guard | Superseded by Next auth/config.ts and supabase.ts boundaries; source synthetic constant remains true |
| tools/ci/auth.mjs | API assertions retained; four distinct browser applicants added |
| tools/ci/browser.mjs | Next launch, all four authenticated cases, persistence, actual keyboard chooser, cleanup, contrast and p95 replace weaker historical journey |
| tools/ci/run.mjs | 91 SQL assertions retained; Next harness and five-to-zero reset counts |
| application.test.sql | All old assertions retained; reset role added before private-history auditor read |

This is source reconciliation, not retroactive acceptance of failed historical runs. N1's successful successor evidence and intermittent chooser limitation remain recorded in the controller results.

## Unique historical security observations from PR16

The old report at 79fd5b3bab517f579f020858c22a86f26bd51217 recorded broad public-profile fields, an exposed SECURITY DEFINER signup RPC, mutable search paths on handle_new_user/handle_updated_at/update_updated_at_column, broad table grants/API discoverability, and disabled leaked-password protection. These were observations of an older provider boundary. They require current-target revalidation before any present-tense defect claim or repair, and do not override SEC0 VERIFIED or authorize provider mutations.

## Preservation and recovery

- [archive.json](archive.json) records the verified complete Git bundle hash and exact historical patch hashes. The local bundle contains 124 refs and full history; do not publish historical objects indiscriminately because old secret-bearing history can exist.
- historical-pr47/48/49.patch.txt are inert original diffs, not instructions or active approval. Never apply them blindly. Their internal timestamps, old hashes and statuses remain original evidence.
- docs/autonomous-handoff-20260915 is a preserved September15 snapshot; current controller acceptance of FV2/FV3 preparation takes precedence over its old proposal status.
- [local-workspaces.json](local-workspaces.json) inventories untouched local work. Uncommitted changes are not part of this merge; no reset/clean/delete was used. Inspect and validate them separately before claiming inclusion.
- refs.json also preserves branches without an open PR. Unmerged historical alternatives remain recoverable; ancestry alone cannot establish semantic equivalence after squash merges.

## Current release reality and verification

F1–F6 and N1 source are integrated. Full N1/I02-08 acceptance, hosted email/recovery, F7 exact lab and human tests, payload regression review, mobile packaging, RevenueCat and store release remain open. Free language Circles with digital Pro is approved release direction; pricing/entitlements/native proposals do not become implemented from these documents.

Tooling:24 tests pass, including both original C1 and synthetic-boundary suites plus handler collision/escape coverage. Independent finished-diff review found no blocking defect. Final lint/build and protected PR CI are required before merge. No product source, migration, dependency, workflow or provider change is permitted by MERGE1. Final immutable CI result belongs in the canonical controller ledger rather than moving the tested candidate merely to update this note.

Independent documentation review also verified all three archived patch hashes, all six copied historical handoff blobs and an empty protected-source diff. No blocking issue found; final build/CI remains a separate gate.

Local final checks: npm ci, lint and Next production build/TypeScript passed. Node24.11 emitted existing jsdom engine-range warning; pinned CI uses newer Node24. Source preparation identified a colocated route.test.ts misclassification before CI; exact handler discovery now ignores test files with a regression assertion. Historical Markdown hard-break spaces and exact archived patch context trigger whole-diff whitespace warnings and are intentionally preserved; new tooling edits pass scoped diff check.
