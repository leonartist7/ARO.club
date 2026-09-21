# ARO Autonomous Delivery Ledger

> **Operational document.** Controller-only append/write authority. Product authority remains in approved repository specifications; this ledger records status, claims, evidence and bounded dispatches. It does not approve a product design, repair, merge, deployment or release.

## Identity and concurrency

- **Ledger path:** `ARO-AUTONOMOUS-DELIVERY-LEDGER.md`
- **Ledger branch:** `codex/aro-overnight-controller-20260916`
- **Initial controller run:** 2026-09-16T10:19:39Z
- **Ledger version:** 33
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
- B1B is founder-approved in `docs/autonomous-control-20260916/FOUNDER-APPROVAL-20260919-B1B.md` (commit `030ecd1d9b45781a832bf0ce58af051d696262be`). It authorizes only the proposed loopback-and-disposable-CI authenticated mode; no preview/production Auth enablement or other guard bypass is allowed.
- I0.2 is **IMPLEMENTED / CI-VERIFIED historically** but **I02-08 NOT PASS** after the corrected independent review. No status upgrade is permitted.
- Human NVDA/Chromium-on-Windows and founder visual review remain human gates. CI or an AI review cannot fabricate them.
- Historic migrations stay unchanged; every SQL repair is append-only and runs only in disposable CI.

## Task board

| Task | State | Dependency / exact blocker | Owner | Source / output | Acceptance next step |
|---|---|---|---|---|---|
| A-F7-existing | BLOCKED | PR #47 must be corrected/merged; exact bundled Chromium revision 1234 must install and launch; retain §20 | existing PR #48 owner only | branch `codex/fv1-f7-acceptance-evidence` / its existing evidence root | owner records only legitimate F7 evidence; independent review follows finished diff |
| B-I02-corrective-packet | REVIEW_READY | corrected review + current source reconciled | controller | `docs/autonomous-control-20260916/I02-CORRECTIVE-PACKET.md` | approve/claim only the package rows that restore literal I0.2 contract |
| B1-I02-repair-within-contract | REPAIR_REQUIRED | R1/R2/R4–R6 diff is implemented/tested; R7 final hosted evidence is absent and B1B is terminally blocked | controller validation | PR #52 head `fd169e43d481c9ee25c0ed051659adb7736265b2`; final result blob `7e4b997a4060a664fddec446358e6a4e077b0c65` | independent review reports exact requirement status; no package acceptance while R7 is NOT PASS |
| B1A-I02-boundary-acknowledgement | VERIFIED | claim `B1A-20260916-001` completed; B1 scope guard retained | controller validated | result `docs/autonomous-control-20260916/results/B1A-BOUNDARY-ACKNOWLEDGEMENT-20260916.md`, blob `295629217a9499bfb322dbe10ed76f11fdf7b1b6` | boundary test passes; B1 still waits for disposable CI |
| B2A-I02-boundary-acknowledgement | VERIFIED | claim `B2A-20260919-001` completed; controller independently reran boundary 11/11 and exact one-file diff | controller validated | result `docs/autonomous-control-20260916/results/B2A-BOUNDARY-ACKNOWLEDGEMENT-20260919.md` blob `91d3a6a46b6ddd379d3593223ba0c765441ccb68` | B2 still needs hosted disposable CI and independent B2-tail review |
| B2-I02-static-failure-diagnosis | VERIFIED | independent read-only claim completed; manifest verified and result preserved | independent read-only SQL reviewer | result `docs/autonomous-control-20260916/results/B2-STATIC-DIAGNOSIS-20260919.md` blob `261bab807791632725aa86437db474073b7e9a3a`; content SHA-256 `af7d090b7802504031d720b4a9c69ca77d75b1575a358e778ed5b185bbe650ee` | no specific B2 repair proposed; B2 is BLOCKED pending safe diagnostic capability |
| B1-I02-independent-finished-diff-review | VERIFIED | independent claim `B1-IND-20260919-001` completed; controller verified manifest and persisted/re-fetched review | independent non-writing reviewer | result `docs/autonomous-control-20260916/results/B1-INDEPENDENT-REVIEW-20260919.md` blob `3ae61239ea709ab8dddaa1d064d9553838002ddf`; content SHA-256 `350381faf150f944259a22abe338862beb9028a9169f6ad99cf6e6f28ae83e4c` | R1/R2/R4–R6/TIME/UPLOAD static ACCEPT WITH CONDITIONS; R7 NOT PASS; B1/package remain unaccepted |
| B1B-I02-R7-authenticated-CI-mode | BLOCKED | final permitted hosted run reached draft-create request but no expected draft-create POST / required R7 captures; no repair cycle remains | controller validated | final head `fd169e43d481c9ee25c0ed051659adb7736265b2`; artifact 10580653458 digest `1d31bdf62b8a62c7b50e3d241a54506244bfce8a2150321f59039dabb50dc65d`; final result blob `7e4b997a4060a664fddec446358e6a4e077b0c65` | future owner must diagnose real missing request under a newly authorized task; never infer R7 pass |
| B2-I02-R3-protected-Trust-repair | BLOCKED | hosted disposable pgTAP failed before 91/91; source diagnosis found no specific allowable repair and safety policy suppresses the raw CLI signal | controller validated | PR #53 head `b2dd8b6a4afd7299857510fd1d7891feffb6723a`; CI result blob `b01ad2653cf5598c1badad94f1d41ef83be1dfa8`; diagnosis below | provide an authorized redacted failure classifier (migration vs assertion vs count) or a fresh approved reproduction capability; then a new claim |
| C-FV2-preparation | PACKAGE_ACCEPTED / IMPLEMENTATION_BLOCKED | founder approval recorded; F7 acceptance/reconciliation, pinned base, exclusive ownership and evidence/review still required | controller/product-design | verified external input; founder approval record | no implementation claim until all gates validate |
| D-FV3-preparation | PACKAGE_ACCEPTED / IMPLEMENTATION_BLOCKED | founder approval recorded; F7 acceptance/reconciliation, pinned base, exclusive ownership and evidence/review still required | controller/product-design | verified external input; founder approval record | no implementation claim until all gates validate |
| E-documentation-integrity | REPAIR_REQUIRED | PR #47 has review findings; PR #49 is a draft and shares registries | existing PR owners, serialized | PR #47/#49 heads above | owner repairs/reconciles; controller must not overwrite their paths |
| F1-I0-gate-matrix | VERIFIED | read-only claim `F1-20260916-001` completed; no product/provider status changed | controller validated | result `docs/autonomous-control-20260916/results/F1-I0-GATE-MATRIX-20260916.md` commit `db68b2cd7631dcda5096cf250e9302e8fcf370fe`, blob `7cec72d3e05719ce874ecb5fe6408f0213414e6b` | 13 fact-labelled rows; B1 then B2 + review remains next non-provider path |
| F2-plan-gap-register | VERIFIED | claim `F2-20260919-001` returned no eligible additional task; controller verified source clean and manifest, then preserved/re-fetched the result | controller validated | result `docs/autonomous-control-20260916/results/F2-PLAN-GAP-REGISTER-20260919.md` blob `08d4690004016d552a6e9f24fb2a929e7829dc97`; content SHA-256 `c7fc2643790c7575b3062e454ca5ad7ffba2faba217ed9cbc4a6d39b5122801c` | no dispatch from F2; B1B evidence and review completed with R7 NOT PASS; future work needs a new authorized R7 diagnosis |

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

### B1A-I02-boundary-acknowledgement

- **Outcome:** preserve the approved append-only-migration guard by adding only `20260916103000_i02_corrective_repairs.sql` to its expected migration list.
- **Authority:** B1 scope amendment above, which is a bounded existing-contract test repair, not a product/Trust/retention/authorization/UX decision. Candidate base/head must be revalidated.
- **Base:** PR #51 candidate head `deb9db3f5e6937c48892b818740022e8b54421e3`; exact write allowlist is `tools/ci/boundary.test.mjs` only.
- **Non-goals:** changing any existing guard, migration body/list besides the new filename, CI runner restriction, SQL policy, test count, workflow, dependency, provider or source behavior.
- **Acceptance/evidence:** `node --test tools/ci/boundary.test.mjs` passes; controller records resulting head, changed path and command exit. The B1 package remains REPAIR_REQUIRED until disposable CI and later independent review.
- **Stop/retry:** one edit only; any added path/semantic guard weakening, drift, failed boundary test or provider/CI bypass is BLOCKED.
- **Worker result format:** `taskId, claimNonce, baseSHA, headSHA, changedFiles, tests[{command,exit}], evidenceRoot, findings, criteriaStatus, nextState`.

### B1B-I02-R7-authenticated-CI-mode

- **Outcome:** if founder-approved, add a non-deployable loopback-and-disposable-CI-only compile condition so I0.2 browser verification can genuinely exercise the local authenticated applicant journey without changing preview/production behavior.
- **Authority:** proposed amendment above only; it is not approved by this ledger. The B1 candidate/diff stays frozen while blocked.
- **Exact ownership, non-goals, acceptance, reviewer and stop rules:** as specified in `docs/autonomous-control-20260916/I02-R7-UX0-CI-AMENDMENT-PROPOSED-20260916.md`. No dispatch is allowed until the founder records the decision.
- **Worker result format after a valid claim:** `taskId, claimNonce, baseSHA, headSHA, changedFiles, tests[{command,exit}], evidenceRoot, artifactId,digest, findings, criteriaStatus, nextState`.

### B1-I02-independent-finished-diff-review

- **Task ID / outcome:** B1-IND; independently review the immutable PR #52 final diff and retrieved evidence. Report each I0.2 corrective finding as implemented/tested/reviewed/blocked separately. It may never accept the package.
- **Authority:** corrected independent-review input SHA-256 9778b2cecd75bb617105d009f7c70067d0d93acbccde8b1e67d23383b4e99467; approved I0.2 baseline; B1/B1B packets; final candidate fd169e43d481c9ee25c0ed051659adb7736265b2.
- **Base / read dependencies:** main 79603ae1af60a30f86c105e0f2a4d841043eb727; PR #52 final head and comparison; final CI runs 35431430361/35431430371; artifact 10580653458 digest 1d31bdf62b8a62c7b50e3d241a54506244bfce8a2150321f59039dabb50dc65d; all retained B1/B1B result files.
- **Write allowlist:** none in source, docs, PR, ledger or artifact. Output one immutable local review bundle only at /workspace/scratch/95edc6c9ef6a/aro-b1-independent-review-20260919-claim-001/evidence/. Controller alone preserves a result after retrieval.
- **Required review:** verify scope/file ownership and R1 fabricated reputation, R2 reviewer-owned fields, R4 submitted_at, R5 onboarding draft, R6 owner-deletable evidence, reviewer timestamps and partial-upload cleanup. Verify R7 remains NOT PASS because the final hosted run reached draft-create request but produced no required success evidence. Check disposable isolation, SECURITY DEFINER/RLS exposure, loopback/marker guard, secret/synthetic-data handling, evidence integrity, and no test weakening.
- **Acceptance / commands:** review exact comparison and source only; validate retrieved artifact digest and filename list; cite paths/line findings. Conclude ACCEPT WITH CONDITIONS, REJECT, or NOT PASS by requirement. No green CI inference.
- **Non-goals:** no code fix, policy decision, test change, merge, review request, provider/live action, deployment or release.
- **Stop/retry:** stop for unreadable candidate/evidence or any mutation request. No repair. Return exact blocker and review bundle hash.
- **Result format:** taskId, reviewerIdentity, baseSHA, headSHA, inspectedEvidence, findings[{severity,requirement,path,evidence,owner,acceptance}], criteriaStatus, evidenceRoot, manifestSHA, nextState.

### B2A-I02-boundary-acknowledgement

- **Outcome:** preserve the append-only-migration guard by adding only 20260916113000_i02_protect_teacher_verification_history.sql to its exact expected migration list.
- **Authority:** B2’s already-authorized append-only corrective migration and the existing boundary test’s literal filename guard. This is a bounded test acknowledgement, not a product, Trust, retention, authorization, or UX decision.
- **Base:** B2 candidate 7f86f07f0d4d8ec7c523f8c4f95e9fa780fefb1f; the controller must verify no unexplained drift before publication.
- **Closed write allowlist:** tools/ci/boundary.test.mjs only.
- **Non-goals:** changing any migration body/order other than acknowledgement, any SQL policy, runner expectation, workflow, dependency, provider, UI, ledger, documentation, or test semantics.
- **Acceptance / evidence:** node --test tools/ci/boundary.test.mjs passes; exact diff is one file and one appended filename; controller records command exit and re-fetches result.
- **Review:** B2 still requires full hosted disposable CI and a separate independent finished-diff review. B2A does not sign acceptance.
- **Stop/retry:** one edit only. Any changed path or guard weakening is BLOCKED.
- **Worker result format:** taskId, claimNonce, baseSHA, headSHA, changedFiles, tests[{command,exit}], evidenceRoot, findings, criteriaStatus, nextState.

### B2-I02-static-failure-diagnosis

- **Task ID / outcome:** B2-DIAG; read-only diagnosis of the exact B2 SQL diff after hosted pgTAP returned PROCESS_FAILED with deliberate CLI output suppression. Identify only concrete, source-supported likely failure(s) and the smallest in-scope repair if one can be established.
- **Authority:** B2 approved-contract repair packet and its first hosted failure; preparation/diagnosis only. It cannot make a policy decision or change the output-suppression safety control.
- **Base / read dependencies:** final B2 candidate b2dd8b6a4afd7299857510fd1d7891feffb6723a; B2 tail from fd169e43d481c9ee25c0ed051659adb7736265b2; migrations/tests/boundary/runner and retained CI result run 35432443191.
- **Write allowlist:** none in source/docs/PR/ledger. Output one immutable local diagnosis bundle only under /workspace/scratch/95edc6c9ef6a/aro-b2-static-diagnosis-20260919-claim-001/evidence/.
- **Required analysis:** SQL syntax/order/RLS/SECURITY DEFINER/function grants/test role/pgTAP count and the direct-owner/no-history contract. Separate proven facts, likely causes, and unknowns. Do not run local DB/Supabase/provider CI.
- **Acceptance:** cite exact paths/lines; name only an existing B2-allowlisted repair when logically supported; otherwise say BLOCKED (exact hidden CI diagnostic is required).
- **Stop/retry:** no code edits, no provider action, no output-suppression weakening. One result only.
- **Result format:** taskId, baseSHA, inspectedPaths, provenFacts, likelyCauses, unknowns, allowableRepair, evidenceRoot, manifestSHA, nextState.

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

### F2-plan-gap-register

- **Task ID / outcome:** F2; produce a fact-labelled, maximum-two-item register of genuinely independent, currently known remaining gaps from the master delivery plan. It must identify only preparation or approved-contract repair candidates; it must not start an audit or invent product work.
- **Authority:** documentation/evidence preparation under AGENTS.md and docs/MASTER_PLAN.md; this is preparation-only, not a product decision.
- **Immutable base:** 79603ae1af60a30f86c105e0f2a4d841043eb727; read-only dependencies: governing chain, approved specs/status/workboard, current PR #47/#48/#49/#51/#52 metadata, canonical ledger.
- **Write allowlist:** no repository files, branches, PRs or ledger. Output exactly one immutable local result bundle under /workspace/scratch/95edc6c9ef6a/aro-f2-20260919-claim-001/evidence/; the controller alone may later preserve it under its documentation branch.
- **Non-goals / interface:** no F7 measurement, no I0.2 code/policy decision, no provider call, no F1–F6 restart, no FV2/FV3 runtime design. Each row must state its authority, why it does not depend on unresolved F7/I0/P1 gates, exact non-overlapping prospective ownership, deliverable, acceptance condition and blocker.
- **Acceptance / reproducible checks:** full-read cited input paths; a machine-readable manifest with inspected path/blob or SHA; sha256sum -c manifest.sha256; no source diff. Return no more than two candidates, or explicit “none eligible”.
- **Evidence / review:** result bundle includes F2-PLAN-GAP-REGISTER-20260919.md, manifest.sha256, and a concise controller-result record. Controller re-fetches/preserves it before any status change; any later implementation requires its own claim and independent review.
- **Stop/retry:** stop for missing governing source, a proposed product/retention/authorization decision, scope overlap, or a provider/secret request. One transient retrieval retry only.
- **Required result format:** taskId, claimNonce, baseSHA, inspectedPaths, candidates[{authority,independence,writeAllowlist,deliverable,acceptance,blocker}], evidenceRoot, manifestSHA, findings, nextState.

### C/D preparation handling

FV2/FV3 are already complete proposal deliverables at the verified external identities above. A worker may only check their source drift and package completeness, returning a result bundle; it may not turn either into SPEC-READY, write UI code, alter routes/shared files, or claim F7 acceptance.

## Schedule inventory

| Schedule | ID | Enabled | Limit / termination | Purpose |
|---|---|---:|---|---|
| ARO C1 Documentation Health | `6a9fc0ca3f14819191ddb24e1bbd6ff0` | yes | existing weekly cadence | preserve; no duplicate |
| ARO Overnight Delivery Controller | `6aaa6e5567ac81919a0793a4e1c73eae` | no | disabled early after immediate controller run: all remaining work requires founder B1B decision or an existing external owner | serialized controller only; no automatic renewal |

The scheduler can express finite recurrence and termination. It exposes no dependency-trigger or model-selection control. Therefore the controller itself re-fetches this ledger and validates every dependency/claim before dispatch; time never proves completion.


## September 21 sprint reconciliation

This dated section supersedes September 19 next-action assumptions only for the newer N1 candidate. Earlier lane evidence and dispositions remain historical facts; no retroactive I02-08 acceptance is granted.

| Task | State | Immutable evidence | Owner / next action |
|---|---|---|---|
| SH1-20260921-001 | VERIFIED preparation / CLOSED | PR #55, head 1dbff390562a1a13483dd6c5c62e2aa0e9b2b8bb; spec ARO-SH1 v1.0.0; shipaton/sprint-20260921/VERIFICATION.md and manifest.sha256 | Controller; docs-only build/lint/link/diff checks pass; independent review no blocking findings |
| N1 Trust reconciliation | SQL CI VERIFIED on candidate; package REPAIR_REQUIRED | PR #54 b431fb59981458f82c635deb2d60e7ffb4077d43; platform run 35585633732/job/106288198241; 91 assertions twice, authenticated journey/reset/cleanup pass; artifact SHA256 06e4d702ac2fac14c5d4feda57171419e2f0ad5482ce7ab67091f520f4fad4d0 | Existing N1 owner; independent report in SH1 requires observable failed-upload cleanup, keyboard upload and full R7 changed-journey evidence |
| N1-U/R7/A11Y | RUNNING in existing owner lane | Owner task Plan full migration to Next.js acknowledged b431fb5 and N1 v1.3 scope binding before edits | One product writer only; fresh head/checks and independent review required; hosted/human gates remain |
| F7 / FV2 / FV3 | Unchanged BLOCKED / accepted preparation | SH1 UNBLOCK-PACKETS.md preserves exact source and owner gates | Existing #47/#48/#49 owners; serialize shared registries, exact Chromium, independent and human acceptance |
| S01/S08/S14 | Accounts unknown / native and Pro PROPOSED | SH1 native feasibility and release checklist | Founder eligibility/enrollment/access facts; separate approved native/money packages before implementation |
| S09–S13 / S18–S20 | Core/release/submission still gated | SH1 SPRINT.md and truthful submission drafts | Existing product/release owners; no full-core or store/publication claim |

Founder September 21 scope: full language-focused P1–P5, free real-world Circles, paid digital Pro; Seasons/AR/extra verticals/marketplace charges/host payouts excluded. This strategic decision does not make downstream specs ready.

Controller's bounded N1 fixture approval: tools/ci/auth.mjs and tools/ci/run.mjs may be bound into N1 v1.3 solely to create four independent browser applicants plus one API owner in existing disposable signup, assert five before reset and zero after. Submitted applications are immutable, so independent cases are needed. No hosted account, RLS, auth-mode, provider or isolation-guard change. Existing N1 owner retains implementation and registry authority.

No new schedule, merge, release or external submission was performed by SH1. Prior schedule rows are historical, not a fresh scheduler-status assertion.

## Append-only execution history

| UTC time | Ledger version | Event | Evidence / result |
|---|---:|---|---|
| 2026-09-16T10:19:39Z | 1 | Controller preflight | Main `79603ae…`; PR #47/#48/#49 read; C1 preserved; corrected inputs retrieved and hashes verified; F7 left with existing owner |
| 2026-09-16T10:19:39Z | 1 | I0.2 reconciliation | Corrected independent review confirms R1–R7 plus timestamp/partial-upload gaps against unchanged reviewed source. Corrective packet prepared; R3 separated as a founder retention decision. |
| 2026-09-16T10:24:21Z | 2 | Controller schedule activated | Schedule \`6aaa6e5567ac81919a0793a4e1c73eae\` uses a finite 90-minute RRULE with COUNT=8. Ledger/packet branch was re-fetched before activation; C1 remains unchanged. |
| 2026-09-16 | 3 | Founder approvals recorded | Direct founder instruction approved the R3 protected Trust-record rule and FV2/FV3 proposal content. Record: `docs/autonomous-control-20260916/FOUNDER-APPROVAL-20260916.md` at `a114c6f879984e1d661bfa2896d9cf60ced3d91d`. B2 is serialized after B1 review; FV2/FV3 stay implementation-blocked on F7 and all required gates. |
| 2026-09-16 | 4 | B1 implementation claimed | Claim `B1-20260916-001`; exact base `79603ae1af60a30f86c105e0f2a4d841043eb727`; product branch `codex/i02-corrective-repairs-20260916`; isolated source/evidence roots recorded. Scope is the existing B1 corrective packet only; R3 remains reserved for sequential B2. |
| 2026-09-16 | 5 | F1 read-only matrix claimed | Claim `F1-20260916-001`; base `79603ae1af60a30f86c105e0f2a4d841043eb727`; isolated source/evidence roots recorded. No source, provider, secret, or product status mutation is allowed. |
| 2026-09-16 | 6 | F1 matrix verified and preserved | Controller re-read the isolated report, verified `sha256sum -c manifest.sha256`, then persisted and re-fetched result blob `7cec72d3e05719ce874ecb5fe6408f0213414e6b`. It confirms I0 provider gates, Q0 and P1 remain blocked; next non-provider work is B1 followed by separate B2 and independent review. |
| 2026-09-16 | 7 | B1 candidate preserved; B1A claimed | B1 exact allowlist candidate is draft PR #51 at `deb9db3f5e6937c48892b818740022e8b54421e3`; local unit/lint/build checks pass but boundary rejects the new migration only due to the stale two-file expected list and CI-only commands truthfully stop outside disposable CI. Result blob `4feff493d22feb94ae8a298a270a99c1e0231e6e`; exact amendment blob `6edaf254820d617db21bde1a6b091b4868761802`; B1A claim `B1A-20260916-001` is limited to that list acknowledgement. |
| 2026-09-16 | 8 | B1A verified; B1 remains repair-required | Fresh isolated clone at `998b39b7fc9af32d632882442a53dad47e8710ce` passed `node --test tools/ci/boundary.test.mjs`; durable result blob `295629217a9499bfb322dbe10ed76f11fdf7b1b6` was re-fetched. The initial wrong-directory invocation is retained in that result. No assertion was weakened. B1 still requires hosted disposable CI, then a separate independent reviewer. |
| 2026-09-16 | 9 | B1 repair cycle 1 claimed | Hosted Quality and Isolated database runs succeeded and the artifact digest was independently retrieved, but its four screenshots are only inherited prototype-boundary evidence. Result blob `b08ac99c143c84466a5eb252ae3bf58958e59c98` records the R7 failure. Claim `B1-R1-20260916-001` routes the fix to the existing B1 writer in a fresh isolated source/evidence root; one repair cycle remains after this. |
| 2026-09-16 | 10 | B1 R7 blocked; exact amendment prepared | Existing B1 writer verified that `src/config/ux0.js` hard-codes prototype mode and `tools/ci/browser.mjs` returns from its prototype branch, so the compiled app cannot supply genuine authenticated evidence. No source edit was made. Blocker blob `d2b6b0da589bb20bac82c543691a39de30bab613`; proposed founder decision/amendment blob `43083433b54e1fab5fb1ff4f039ba9b7dcc68f29`. |
| 2026-09-16 | 11 | Overnight controller disabled early | The finite controller schedule was disabled after the immediate run because B1B requires a founder decision, B2 depends on final B1 review, FV2/FV3 remain F7-gated, and F7/PR #47/#49 retain external owners. C1 was preserved unchanged. |
| 2026-09-19 | 12 | Founder approved B1B; build claimed | Founder approval commit `030ecd1d9b45781a832bf0ce58af051d696262be` authorizes the exact loopback-only disposable-CI mode. Claim `B1B-20260919-001` starts a fresh isolated writer on branch `codex/i02-r7-authenticated-ci-20260919` from candidate `998b39b7fc9af32d632882442a53dad47e8710ce`. |
| 2026-09-19 | 13 | B1B candidate published; CI running | Draft PR #52 pins composite head `6c65965758c7c695aecd343d84287e54b0e53d73` to main `79603ae…`. Writer result was persisted and independently re-fetched as blob `f13c35079dd54a593c43bbc175d9c4f0ca7ded6a`. Hosted Quality run `35430717521` and disposable Isolated database run `35430717532` are the only active validation; no reviewer, acceptance, merge, deployment or release has occurred. |
| 2026-09-19 | 14 | B1B R7 CI failure recorded; repair claimed | Quality succeeded, but isolated DB run `35430717532` passed 11/11 boundary tests, pgTAP 86/86, auth/Trust phases and cleanup before failing `BROWSER_ONBOARDING_DRAFT_360_LIGHT`; no screenshot artifact existed. The controller re-fetched failure result blob `c0732dfc3ef681e0adde8c59d6042e643ec55fb2`, then claimed `B1B-R1-20260919-001` for one test-driver-only repair on a fresh branch from the failed immutable head. |
| 2026-09-19 | 15 | F2 read-only preparation claimed | Claim `F2-20260919-001` uses immutable main `79603ae…`, a distinct source/evidence root and no repository writes. It may return at most two independent non-product candidates; it cannot approve or implement them. |
| 2026-09-19 | 16 | B1B focused repair published; fresh CI pending | Controller verified the local immutable diff: only `tools/ci/browser.mjs`, no whitespace error, semantic wait/scoping repair only. Writer-reported checks passed; result was persisted/re-fetched as blob `a879a135f49fe9ffd0227aa21d839b2275420476`. PR #52 now pins `c502aa378b151bb2651a621628106834184df288`; no hosted result, review, acceptance, merge, deployment or release is claimed. |
| 2026-09-19 | 17 | F2 verified; no additional dispatch | Detached source remained at `79603ae…` with no source changes; controller ran `sha256sum -c manifest.sha256`, then persisted/re-fetched the negative eligibility report blob `08d4690004016d552a6e9f24fb2a929e7829dc97` and its manifest blob `4299e3c2f20bf7b02645730bcb2ec7e3ae2626fd`. No second additional work item meets the authority/dependency/ownership constraints. |
| 2026-09-19 | 18 | B1B second hosted CI failure recorded; final diagnostic repair claimed | Quality run `35431096907` passed; disposable run `35431096853` again passed boundaries, pgTAP 86/86, auth/Trust and cleanup before `BROWSER_ONBOARDING_DRAFT_360_LIGHT`, with no artifact. Controller re-fetched failure result blob `92c5fa6c14858a062dab4fa332ca7ae50a99a203` and claimed `B1B-R2-20260919-001`. A third hosted failure or missing evidence is terminal BLOCKED for this window. |
| 2026-09-19 | 19 | B1B final diagnostic candidate published; hosted validation pending | Controller independently checked local diff scope and whitespace: only `tools/ci/browser.mjs`; stage labels plus credential-input-gated diagnostic screenshot only. Result was persisted/re-fetched as blob `0d3180386a50c93f7faa21afed19b1807bfe12e6`. PR #52 now pins `fd169e43d481c9ee25c0ed051659adb7736265b2`; this is the final permitted hosted attempt. |
| 2026-09-19 | 20 | B1B terminal evidence failure retrieved; independent review claimed | Final run 35431430361 passed quality-adjacent isolation, boundary, pgTAP, auth/Trust and cleanup work but failed `BROWSER_ONBOARDING_DRAFT_CREATE_REQUEST_360_LIGHT`. Controller matched artifact 10580653458 ZIP digest `1d31…c65d`, verified its sole credential-free diagnostic filename, stored a durable evidence copy, re-fetched final result blob `7e4b997a4060a664fddec446358e6a4e077b0c65`, and marked B1B BLOCKED. Claim `B1-IND-20260919-001` now reviews the immutable finished diff; it cannot accept R7. |
| 2026-09-19 | 21 | Independent B1 review verified; B2 becomes eligible | Controller validated the reviewer manifest, persisted/re-fetched review blob `3ae61239ea709ab8dddaa1d064d9553838002ddf`, and reconciled its findings: R1/R2/R4/R5/R6/TIME/UPLOAD are static ACCEPT WITH CONDITIONS, while R7 is NOT PASS for missing POST/success captures plus unproven dark/responsive journey coverage. No package acceptance/merge/deployment/release occurred. B2 now has its named sequential-review dependency satisfied, but still needs a fresh claim/preflight. |
| 2026-09-19 | 22 | B2 R3 repair claimed after fresh preflight | Main remains `79603ae…`; PR #48 remains blocked/draft with no active execution claim; PR #52 pins the reviewed B1 head `fd169e…`; no product repair writer is active. Claim `B2-20260919-001` is limited to the existing B2 append-only migration/policy/test packet. R7 remains NOT PASS and cannot be conflated with B2. |
| 2026-09-19 | 23 | B2 candidate held at boundary guard; B2A claimed | Controller verified B2 candidate scope/migration checksum/runner syntax then found the existing exact migration list excludes the new B2 migration. Result blob `6c1d66dca6f79c564ccd40ce78cac8a9d2724de1` preserves this static failure. Claim `B2A-20260919-001` is a one-file, one-filename guard acknowledgement; no SQL or product behavior is reopened. |
| 2026-09-19 | 24 | B2A verified; B2 composite PR published | Controller reran boundary 11/11 and verified B2A’s one-file/one-insertion diff; durable result blob `91d3a6a46b6ddd379d3593223ba0c765441ccb68` was re-fetched. Composite head `b2dd8b6a4afd7299857510fd1d7891feffb6723a` was published on new draft PR #53. Hosted CI must prove B2’s 91 pgTAP assertions before the known inherited R7 block; no acceptance is implied. |
| 2026-09-19 | 25 | B2 hosted pgTAP failure retained; static diagnosis claimed | Run `35432443191` passed boundary 11/11 and cleanup but failed `sql-isolation-first: PROCESS_FAILED` before `PASS pgTAP 91/91`. Result blob `b01ad2653cf5598c1badad94f1d41ef83be1dfa8` preserves the intentionally hidden CLI diagnostic. Claim `B2-DIAG-20260919-001` cannot change code or the suppression control. |
| 2026-09-19 | 26 | B2 static diagnosis verified; task blocked without speculative repair | Controller verified diagnosis manifest and persisted/re-fetched result blob `261bab807791632725aa86437db474073b7e9a3a`; PR #53’s Quality run `35432443188` succeeded. The reviewer’s local source did not contain remote commit `b2dd…`, but controller provenance confirms B2 remote tree `5651a6cce50581598fa36808bcd4e3a7dfffa0e2` equals local B2A tree `86e53b…`; its static observations apply to the published content. Neither the actual pgTAP assertion nor a safe category is available, so B2 is BLOCKED rather than altered. |
| 2026-09-19 | 27 | Final controller close and handoff verified | Controller created and re-fetched `docs/autonomous-control-20260916/HANDOFF-20260919.md` (blob `3ebd7cda1300e31e98e2ad7d744699d447d0a2b3`). No eligible work remains: B1B/R7 and B2 are BLOCKED with exact next actions; F7 remains reserved to its existing owner; FV2/FV3 remain implementation-blocked. The temporary controller schedule remains disabled; C1 remains enabled and unchanged. No product merge, deployment, release, provider or live-data action occurred. |

| 2026-09-21 | 28 | SH1 documentation preparation CLAIMED | Claim SH1-20260921-001; controller task Prepare ARO for Shipathon, explicit founder instruction to implement approved sprint. Source 2c564a974a2ac221425b40184c7192327cd9f205, branch codex/shipaton-sprint-20260921, isolated checkout ARO-shipaton-sprint. Exactly one bounded documentation/evidence package: refresh existing competition materials, record immutable N1 independent review, prepare F7 and native/monetization handoffs. No product writer, provider mutation, runtime approval, merge, release or schedule change. Existing F7/N1 owners and accepted FV2/FV3 preparation preserved. |

| 2026-09-21 | 29 | SH1 preparation verified and closed; N1 owner repair coordinated | PR #55 at 1dbff390562a1a13483dd6c5c62e2aa0e9b2b8bb contains 17 documentation files and LF-normalized manifest. Independent documentation review has no blocking findings; build/lint pass. Newer N1 CI proves repaired SQL/POST, but independent review retains R7/UPLOAD/accessibility gaps. Existing N1 owner is executing the bounded follow-up with disposable fixture extension recorded above. F7 ownership, human gates and FV2/FV3 accepted preparation preserved. |

| 2026-09-21 | 30 | N1 finished-diff static review accepted; desktop CI selector repair bounded | Candidate 5ef1377d1fdabea7c6977cca488a475644e7cdc1 addresses cleanup/keyboard/full-matrix code; independent review finds no blocking defect. Platform run35588997825 nevertheless fails BROWSER_LOGIN_INPUTS_1440_LIGHT after initial91 SQL pass; no dynamic acceptance. Review/failure result persisted and re-fetched as blob 535fd46036c5b08b566583dba48788db93a4f5f7. Existing owner may make one DOM-confirmed form-scoped Sign In selector correction in tools/ci/browser.mjs and run fresh exact-head CI; all assertions/isolation retained. F7 documentation handoff sent to existing task F7 Blocked Evidence, but no execution/result observed. |

| 2026-09-21 | 31 | N1 narrow selector delta accepted; screenshot evidence correction assigned to same owner | Controller read exact 5ef1377..fd63c59cf2ad9fe5d2705b1d2a22067126ca1953 diff: one form-scoped login assertion plus failure documentation only; static delta accepted. Fresh platform35589619254/quality35589619246 running at observation; no dynamic acceptance. Owner visually found prior 360px error/retry/draft/submitted screenshots crop relevant status. Controller authorizes only full-page capture for these four changed states, preserving synthetic/privacy guards and all assertions, after recording current CI outcome. Final exact-head CI, visual inspection and controller readback remain required. Owner explicitly instructed to return immutable final evidence to controller task 01a0c346-9e61-7f63-a511-f72097fbf59c. No new schedule or release action. |

| 2026-09-21 | 32 | N1 response-wait lifecycle repair CLAIMED | Claim N1-WAIT-20260921-001, existing N1 owner only, base6bbc599fcac161574c5e58d8b763de4ba837bcb4. Controller verified fd63 all checks pass;6bbc static/browser pass but platform35590132599/job106302413916 fails unhandled waitForResponse20000ms at browser.mjs331. Initial91SQL passes; owner reports light cases complete and dark360 induced error with retained focus, artifact10634610671 digestc832de65ada2cd5c25cd2449d3f0b13e9db9b8814c188b27ecee959e9c7751c9. Independent source review proves premature unhandled response waiter and unnecessary initial Tab; actual delay cause remains unknown. One bounded harness repair allowed in tools/ci/browser.mjs plus owning spec/evidence: preserve existing focus when already on target, acquire real chooser by keyboard, arm20s response wait immediately before setFiles and await both concurrently so rejection reaches named-stage catch. Retain all keyboard/focus/persistence/matrix/privacy guards, p95<1s and120s journey cap. One fresh exact-head CI and independent delta/visual review; stop on further unexplained failure, no retry/timeout relaxation or product/provider changes. |

| 2026-09-21 | 33 | N1-WAIT candidate independently accepted statically; CI pending | Exact head d664d094650f1f74097b5775b12d64305705709f, diff against6bbc599 changes only browser.mjs plus owning spec/evidence. Controller independently verified focus-before-Tab, real keyboard chooser and response-first immediate Promise.all; all assertions/budgets remain; node --check and git diff --check pass. Static CI succeeds; browser-smoke quality35590975053 and platform35590974916/job106305052117 running at observation. Dynamic/visual acceptance remains pending. Existing owner must return immutable artifact/timings and stop on further unexplained failure; no product/provider/release scope expansion. |
