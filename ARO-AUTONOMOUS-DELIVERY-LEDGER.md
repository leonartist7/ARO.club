# ARO Autonomous Delivery Ledger

> **Operational document.** Controller-only append/write authority. Product authority remains in approved repository specifications; this ledger records status, claims, evidence and bounded dispatches. It does not approve a product design, repair, merge, deployment or release.

## Identity and concurrency

- **Ledger path:** `ARO-AUTONOMOUS-DELIVERY-LEDGER.md`
- **Ledger branch:** `codex/aro-overnight-controller-20260916`
- **Initial controller run:** 2026-09-16T10:19:39Z
- **Ledger version:** 4
- **Concurrency rule:** a controller fetches this file, verifies its recorded version and Git blob SHA, writes a `CLAIMED` transition with that SHA as the GitHub contents-update precondition, then performs exactly one bounded task. A conflicting update, unavailable readback, or ambiguous write stops the controller. Workers never edit this file; they return immutable result bundles to the controller.
- **Source/output isolation:** every task uses a new clean checkout/source path and a distinct external evidence/output root. No shared `node_modules`, build output, browser cache, evidence root, database resource or F7 measurement host.
- **One product writer:** no product repair writer starts while any other product writer claim is RUNNING. F7’s owner remains reserved; a later I0.2 writer must revalidate that PR #48 has no active execution claim and must not use F7’s measurement host.

## Last verified reality

| Field | Value | Verification |
|---|---|---|
| Default branch | `main` | GitHub read-only inspection |
| Main SHA | `79603ae1af60a30f86c105e0f2a4d841043eb727` | 2026-09-16 controller preflight |
| Main state | F1–F6 integrated through F6; no F7 acceptance merged | merge history and handoff reconciliation |
| AGENTS.md blob | `ca000032caf29308fd1b2ca9c08e4216f3d085c5` | governing contract read in full |
| FV-1 governing spec on main | v0.2.2, blob `1f1bb5840294e2336ae1d61e4be36b07736bc3d4` | main snapshot; later amendment is not merged |
| PR #47 | OPEN, `docs/fv1-lab-profile-amendment` at `eec03532558e18e3ea0ce600efbda8a584be4880`; mergeable but blocked | PR metadata; unresolved review findings require its owner’s repair |
| PR #48 / F7 | DRAFT, `codex/fv1-f7-acceptance-evidence` at `123a31f25ed5ce5faae7d5484f578622b2f57ca2` | F7 owner preserved |
| PR #49 | DRAFT, `docs/aro-autonomous-handoff-20260915` at `871c7bebf61386aab65e9957bf5b1b48d274379e` | source-readable handoff; not merged |
| Existing C1 schedule | `6a9fc0ca3f14819191ddb24e1bbd6ff0`, enabled, weekly Monday 09:00 America/Edmonton | scheduler inventory; preserve unchanged |
| F7 lab gate | BLOCKED | exact Playwright-managed Chromium revision 1234 was absent/unlaunchable; documentation amendment is unmerged; no F7 measurement or acceptance evidence exists |
| Controller model selection | not exposed by the scheduler controls | never claim Terra/high; scheduled work records the actual environment only |

## Verified corrected inputs

All three input bytes were retrieved and SHA-256 verified on 2026-09-16. They remain external immutable inputs; do not copy them into a competing repository specification.

| Input | External identity/version | SHA-256 | State |
|---|---|---|---|
| FV2 participant-loop proposal | `libfile_b0f0a712935c8191943eb7e8c26975f1` version 2 | `7bd3b856ee122f49c75ea36faba606b02e37098181b8af9efb5efe829e004bfe` | verified, PROPOSED |
| FV3 creator-preview proposal | `libfile_961f9d4285a48191bab66690004fbd2a` version 1 | `16eb5d87e62bd349a8f12c3ce0add27926fa66549bfadf2e8376bdd205427610` | verified, PROPOSED |
| I0.2 independent review | `libfile_08223bc2b908819195d0dd1c2ba4bf41` | `9778b2cecd75bb617105d009f7c70067d0d93acbccde8b1e67d23383b4e99467` | verified, I02-08 NOT PASS |

The older repository record `artifacts/ARO-I0.2/INDEPENDENT_REVIEW.md` hashes to `f975bf4393e138315b784679dd925b26b766d2c46433217df3e958ca9cfd9d4b`, so it is retained as historical supplemental evidence and is not substituted for the corrected independent review.

## Authority and absolute boundaries

- This window allows read-only discovery, durable documentation/task packets, bounded approved-contract repairs, focused verification, independent finished-diff review and scoped draft PRs.
- No merge, deployment, release, provider/secret/account/infrastructure mutation, billing, payments, AI, real location, AR, Seasons, Beacons or P1+ implementation.
- Founder approval is recorded in `docs/autonomous-control-20260916/FOUNDER-APPROVAL-20260916.md` (commit `a114c6f879984e1d661bfa2896d9cf60ced3d91d`). FV2/FV3 are **PACKAGE ACCEPTED / IMPLEMENTATION BLOCKED** pending final F7 acceptance/reconciliation, a pinned post-F7 base, exclusive ownership, evidence and independent review. No runtime or visual implementation dispatch is permitted now.
- The founder-approved I0.2 R3 rule is: direct owner deletion is allowed only before any `teacher_verifications` history exists; a protected record (including suspended or banned) requires a separately defined authorized support/retention process. B2 is a later, separate repair after B1’s final independent review.
- I0.2 is **IMPLEMENTED / CI-VERIFIED historically** but **I02-08 NOT PASS** after the corrected independent review. No status upgrade is permitted.
- Human NVDA/Chromium-on-Windows and founder visual review remain human gates. CI or an AI review cannot fabricate them.
- Historic migrations stay unchanged; every SQL repair is append-only and runs only in disposable CI.

## Task board

| Task | State | Dependency / exact blocker | Owner | Source / output | Acceptance next step |
|---|---|---|---|---|---|
| A-F7-existing | BLOCKED | PR #47 must be corrected/merged; exact bundled Chromium revision 1234 must install and launch; retain §20 | existing PR #48 owner only | branch `codex/fv1-f7-acceptance-evidence` / its existing evidence root | owner records only legitimate F7 evidence; independent review follows finished diff |
| B-I02-corrective-packet | REVIEW_READY | corrected review + current source reconciled | controller | `docs/autonomous-control-20260916/I02-CORRECTIVE-PACKET.md` | approve/claim only the package rows that restore literal I0.2 contract |
| B1-I02-repair-within-contract | RUNNING | claim `B1-20260916-001`; F7 no active execution claim observed; one product writer reserved | B1 writer (gpt-5.6-terra, high) | base `79603ae…`; branch `codex/i02-corrective-repairs-20260916`; source `/workspace/scratch/95edc6c9ef6a/aro-b1-20260916-claim-001/source`; evidence `/workspace/scratch/95edc6c9ef6a/aro-b1-20260916-claim-001/evidence` | exact allowlist repair, focused CI, immutable result, independent review |
| B2-I02-R3-protected-Trust-repair | READY_AFTER_B1 | founder decision is recorded; wait for B1’s final independent review, then revalidate single-writer/host conditions and current base | unassigned | founder approval record; new branch/evidence root after B1 | append-only policy repair, focused disposable-CI proof, final independent review |
| C-FV2-preparation | PACKAGE_ACCEPTED / IMPLEMENTATION_BLOCKED | founder approval recorded; F7 acceptance/reconciliation, pinned base, exclusive ownership and evidence/review still required | controller/product-design | verified external input; founder approval record | no implementation claim until all gates validate |
| D-FV3-preparation | PACKAGE_ACCEPTED / IMPLEMENTATION_BLOCKED | founder approval recorded; F7 acceptance/reconciliation, pinned base, exclusive ownership and evidence/review still required | controller/product-design | verified external input; founder approval record | no implementation claim until all gates validate |
| E-documentation-integrity | REPAIR_REQUIRED | PR #47 has review findings; PR #49 is a draft and shares registries | existing PR owners, serialized | PR #47/#49 heads above | owner repairs/reconciles; controller must not overwrite their paths |
| F1-I0-gate-matrix | READY | read-only, no provider access necessary | unassigned read-only worker | source `79603ae…`; unique external output | current-vs-historical I0/I0.2/P1 evidence matrix, no live claim |
| F2-plan-gap-register | READY | read-only, after F1 only if no more urgent eligible task | unassigned read-only worker | source `79603ae…`; unique external output | at most two isolated non-product gaps, no new feature design |

## Dispatch packets

### B1-I02-repair-within-contract

- **Outcome:** restore I0.2’s already-approved isolated application/Trust contract for R1, R2, R4, R5, R6, R7, server review timestamps and partial-upload cleanup. Do not mark I02-08 accepted.
- **Authority:** `specs/ARO-I0.2-APPLICATION-BASELINE.md` v1.0.0 §§6, 8–13, 16–23; corrected independent review SHA-256 `9778…99467`. R3 remains excluded from B1 to keep its finished diff reviewable; it is handled only by sequential B2.
- **Base:** `79603ae1af60a30f86c105e0f2a4d841043eb727`; revalidate no unexplained drift before claiming.
- **Closed write allowlist:** exactly the files enumerated in the I02 corrective packet. Any extra path, provider interaction, package/dependency change, historical-migration edit, status-ledger write, or policy decision is a stop.
- **Non-goals:** live migration, provider mutation, new retention policy, P1, payment, role redesign, Trust tier changes, real user data, new APIs or visual redesign.
- **Verification/evidence:** disposable CI only; focused pgTAP/REST/Storage/browser journey tests plus existing required lint/build; external immutable evidence bundle names source SHA, migration checksum, command exits, synthetic-only proof and exact failures.
- **Review:** after a finished immutable diff, a separate non-writing security/privacy/Trust reviewer must review it. The writer cannot sign acceptance.
- **Stop/retry:** maximum two repair cycles; one transient transfer retry. On ambiguous storage/network/claim state, scope drift, failed database isolation, or B2 decision dependency, mark BLOCKED and continue a different ready task.
- **Worker result format:** `taskId, claimNonce, baseSHA, headSHA, changedFiles, migrationChecksum, tests[{command,exit}], evidenceRoot, findings, criteriaStatus, nextState`.

### B2-I02-R3-protected-Trust-repair

- **Outcome:** restore the approved Trust-record deletion boundary: direct owners may delete a teacher record only if it has no `teacher_verifications` history. A suspended or banned record with verification history is protected from direct owner deletion.
- **Authority:** founder approval record above; `specs/ARO-I0.2-APPLICATION-BASELINE.md` v1.0.0 Trust/authorization/append-only contract; corrected review R3. This is a corrective repair only, not a new retention design.
- **Base:** the exact B1 head only after B1’s focused checks and final independent review are retrieved and reconciled. The controller records a fresh claim and branch; unexplained drift stops the task.
- **Closed write allowlist:** one new append-only migration `tools/ci/supabase/migrations/20260916113000_i02_protect_teacher_verification_history.sql`, `tools/ci/supabase/tests/application.test.sql`, and `tools/ci/run.mjs` only if the test total must change. Historical migrations, source UI, Storage policy, roles, providers and this ledger are excluded.
- **Interface contract:** replace only the direct-owner deletion condition so it denies deletion when a matching verification-history row exists; it must retain other approved authorization behavior and must not implement support tooling, duration, purge, public-visibility or reviewer workflow policy.
- **Verification/evidence:** disposable CI only; focused policy/database tests cover (a) no-history owner deletion remains allowed and (b) verified suspended/banned-owner deletion is denied, then relevant required CI checks. Immutable evidence includes base/head SHA, migration checksum, synthetic-only confirmation, commands/exits and exact policy test results.
- **Review:** a separate non-writing security/privacy/Trust reviewer reviews the final immutable diff. No self-acceptance or I02-08 status upgrade.
- **Stop/retry:** at most two repair cycles; one transient storage/network retry. Stop on scope drift, an unapproved support/retention decision, failure to prove disposable isolation, unavailable B1 review result, or writer/host contention.
- **Worker result format:** `taskId, claimNonce, baseSHA, headSHA, changedFiles, migrationChecksum, tests[{command,exit}], evidenceRoot, findings, criteriaStatus, nextState`.

### F1-I0-gate-matrix

- **Outcome:** update a fact-labelled I0/I0.2/Q0/P1 remaining-gate matrix without provider calls.
- **Authority:** documentation/evidence preparation only under AGENTS and existing I0/I0.2/Q0/P1 specifications.
- **Base:** `79603ae…`; write nothing in source; output only to a unique external evidence directory.
- **Read-only dependencies:** I0/I0.2/Q0/P1 specs, current status/infrastructure, retained artifacts, corrected I0.2 review, PR #28 metadata/log references.
- **Acceptance:** each row is classified current evidence / historical only / missing / provider-only / independent-review-only, with owner and smallest action. No “current live” conclusion from historical evidence.
- **Stop:** unavailable source/input, secret request, provider mutation requirement or scope beyond evidence matrix.
- **Result format:** `taskId, baseSHA, inspectedPaths, evidenceRows, blockers, proposedNextAction, outputLocation`.

### C/D preparation handling

FV2/FV3 are already complete proposal deliverables at the verified external identities above. A worker may only check their source drift and package completeness, returning a result bundle; it may not turn either into SPEC-READY, write UI code, alter routes/shared files, or claim F7 acceptance.

## Schedule inventory

| Schedule | ID | Enabled | Limit / termination | Purpose |
|---|---|---:|---|---|
| ARO C1 Documentation Health | `6a9fc0ca3f14819191ddb24e1bbd6ff0` | yes | existing weekly cadence | preserve; no duplicate |
| ARO Overnight Delivery Controller | \`6aaa6e5567ac81919a0793a4e1c73eae\` | yes | 90-minute recurrence, COUNT=8; final tick no later than 12 hours after activation | serialized controller only |

The scheduler can express finite recurrence and termination. It exposes no dependency-trigger or model-selection control. Therefore the controller itself re-fetches this ledger and validates every dependency/claim before dispatch; time never proves completion.

## Append-only execution history

| UTC time | Ledger version | Event | Evidence / result |
|---|---:|---|---|
| 2026-09-16T10:19:39Z | 1 | Controller preflight | Main `79603ae…`; PR #47/#48/#49 read; C1 preserved; corrected inputs retrieved and hashes verified; F7 left with existing owner |
| 2026-09-16T10:19:39Z | 1 | I0.2 reconciliation | Corrected independent review confirms R1–R7 plus timestamp/partial-upload gaps against unchanged reviewed source. Corrective packet prepared; R3 separated as a founder retention decision. |
| 2026-09-16T10:24:21Z | 2 | Controller schedule activated | Schedule \`6aaa6e5567ac81919a0793a4e1c73eae\` uses a finite 90-minute RRULE with COUNT=8. Ledger/packet branch was re-fetched before activation; C1 remains unchanged. |
| 2026-09-16 | 3 | Founder approvals recorded | Direct founder instruction approved the R3 protected Trust-record rule and FV2/FV3 proposal content. Record: `docs/autonomous-control-20260916/FOUNDER-APPROVAL-20260916.md` at `a114c6f879984e1d661bfa2896d9cf60ced3d91d`. B2 is serialized after B1 review; FV2/FV3 stay implementation-blocked on F7 and all required gates. |
| 2026-09-16 | 4 | B1 implementation claimed | Claim `B1-20260916-001`; exact base `79603ae1af60a30f86c105e0f2a4d841043eb727`; product branch `codex/i02-corrective-repairs-20260916`; isolated source/evidence roots recorded. Scope is the existing B1 corrective packet only; R3 remains reserved for sequential B2. |
