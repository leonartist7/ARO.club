# N1-V1 — Remaining disposable verification

Version 0.1.0 · 2026-09-22 · **PROPOSED — NOT AN EXECUTION CLAIM**

This isolated preparation artifact is for controller persistence and independent review. No candidate code commit exists. It grants no permission to execute tests, CI, provider operations or runtime changes. Proposed repository destination: `specs/ARO-N1-REMAINING-VERIFICATION.md`.

## Authority and provenance

Source base: `f37dc084d7172415f581a41e90d2edd9ba3738b9`. Preparation read checkout: `C:/Users/leona/Documents/Web dev/ARO/ARO-readiness-foundation-20260922`.

Governing citations, relative to that repository:

- `AGENTS.md`, “Spec-driven execution contract”: approved package, bounded implementation, evidence and independent review before acceptance; documentation preparation is not an implementation claim.
- `specs/ARO-I0.2-APPLICATION-BASELINE.md` §8: real applicant/reviewer journeys and private-document review; §9: server state machine, actor-owned complete review and atomic decision side effects; §10: one non-rejected application per user, private reviews/audit and public decision projection.
- I0.2 §§17–19: truthful persistence, affected responsive contexts, keyboard/focus/status semantics; §20: Auth/data performance evidence; §21: duplicate operations, competing decisions, revocation, expiry and interruptions; §§22–23: sanitized evidence, real authorization and reset/cleanup.
- `specs/ARO-N1-NEXTJS-PLATFORM.md`, “Locked interfaces and permissions,” “Security and provider boundary,” and “Acceptance and evidence”: authoritative roles/RLS, disposable CI isolation and preserved CI names. Read the later rollout specification for existing production status; this packet itself has no hosted authority.
- `docs/readiness-20260922/REMAINING-VERIFICATION.md`: missing evidence matrix, original 91 assertions twice/four applicant contexts, single new exact-head CI attempt, stop on reproduced product defect.
- `docs/readiness-20260922/HOSTED-READINESS.md`: hosted SQL/Auth gaps remain a separate package; local verification does not repair or accept hosted deployment.
- Controller instruction in “Prepare ARO for Shipathon,” thread `01a0c346-9e61-7f63-a511-f72097fbf59c`, 2026-09-22: approve exactly two additional disposable reviewers and 5→7→0 accounting; fixed fixture commands only; defer genuine JWT expiry; duplicate approval checks original side effects without inventing terminal-review immutability; competing decisions require consistent actor/review/decision/audit. Controller must persist this decision with this proposal before any execution claim.

## Outcome and exclusions

Add missing real API and authenticated reviewer-browser evidence while preserving accepted N1 corrective source and existing checks. Accepted historical evidence at `66d77dfe` remains historical; new tests must not relabel previous failures or retroactively replace their artifacts.

No product implementation, migrations, schema/RLS changes, new RPC, provider operations, hosted account creation, SMTP, production enablement, dependency changes, CI workflow edits, F7 work, registry edits, performance acceptance or human accessibility acceptance. Genuine expired access JWT remains **UNTESTED / DEFERRED**. Revoked refresh credentials and revoked reviewer roles are distinct tests and cannot satisfy that criterion.

## Closed future code allowlist

| Path | Permitted change |
|---|---|
| `tools/ci/run.mjs` | Add named phases and literal 5/7/0 count checkpoints; pass narrow fixture functions; preserve all original isolation/reset/91-SQL/cleanup checks |
| `tools/ci/auth.mjs` | Pass original applicant identities and credentials in memory to additive checks; retain every original Auth/API assertion |
| `tools/ci/browser.mjs` | Add one hook after all four accepted applicant cases finish and before existing browser/server teardown; preserve original inputs, assertions, keyboard chooser behavior, screenshots and timing measurements |
| `tools/ci/reliability.mjs` (new) | Real API duplicate, race, revocation and signed-document expiry assertions |
| `tools/ci/reviewer-browser.mjs` (new) | Real reviewer/applicant lifecycle and interruption assertions |
| `tools/ci/reliability-fixtures.mjs` (new) | Fixed synthetic fixture setup and redacted observations described below |
| `tools/ci/reliability.test.mjs` (new) | Focused fixture-budget, target-boundary and evidence-redaction guard tests |

No additional path is implicitly allowed. Existing `tools/ci/supabase/tests/application.test.sql`, every migration, `config.toml`, workflow and product source remain byte-identical. Controller owns persistence of this specification and any registry/status updates separately.

## Fixture inventory and allowed privileged operations

Keep original A0 API applicant and A1–A4 browser applicants. Complete the original API boundary phase and all four 360/1440 light/dark browser contexts before reusing their applications. Assert `auth.users` count equals **5** at this checkpoint. Then create exactly R1 and R2, with random credentials and `example.invalid` addresses, against the already validated disposable Auth endpoint. Assert exactly **7**. Never replace equality with a lower bound.

Fixed local database helper operations are limited to:

1. Promote precisely the newly created R1/R2 UUIDs to `admin` in `app_private.user_roles`; verify both previously held participant roles and exactly two intended rows were affected.
2. Revoke R2 to `participant` once, checking exactly its registered UUID and prior admin role. Never alter an applicant role through fixture authority.
3. Read fixed projections/counts for the registered five application IDs, their teacher/verification/decision/review/audit rows, registered user roles, and exact registered document objects/metadata. Return sanitized comparison outcomes/actor labels/counts to evidence; raw values remain in memory.
4. Existing runner count/reset/resource cleanup remains the sole teardown authority. No ad hoc deletion of Auth users, application/audit records or database objects.

The helper exposes named operations, not arbitrary SQL strings, table names, HTTP URLs or shell commands. Validate UUID syntax and membership in the in-memory fixture registry before fixed parameterized operations. Use only the existing owned disposable database container and existing runner checks. No service credential in browser environment, arguments, screenshot, trace or artifact. Existing SQL fixture authority is not permission to bypass RLS in the operations being tested.

Maximum accounts: **7**; maximum application records: original **5**. R1/R2 create no applications. A0 covers duplicate active draft and submitted request. A1 covers request changes/resubmit/approve/repeated approval. A2 covers rejection. A3 covers competing complete decisions. A4 covers private document access/revocation and interrupted upload while legitimately editable. Existing document fixtures remain; add at most one attempted upload object and zero successful new metadata rows for the interrupted-upload case. Reject accidental extra account/application creation.

## Runner and ordering contract

Use a fresh isolated checkout, separate external evidence root and exclusively owned disposable database/network. Revalidate exact base, clean source, approved specification and exclusive claim before editing or execution. Retain current hosted-runner, loopback, unlinked-project, resource ownership, version, startup, reset and teardown guards. No developer laptop or hosted database substitutes.

Order: clean reset/count0 → original SQL91 → original five-account Auth/API phases → unchanged four-context browser matrix → count5 → create/promote two reviewers/count7 → additive scenarios → original password recovery/global logout → count7 → original reset/count0 and credential rejection → original SQL91 repeat → owned resource cleanup. Keep the browser server alive solely through its existing lifecycle for additive UI checks; all created contexts close in `finally`.

Duplicate active-draft coverage first proves the non-rejected uniqueness constraint against A0's submitted record. Also attempt a duplicate insert when A4 is legitimately in changes_requested; it must still leave exactly one active application. These prove active-application uniqueness, not a second fresh-draft browser journey; report the starting state explicitly rather than label the existing submitted record a draft.

Run bounded duplicate/state scenarios before the terminal competing-decisions case; finish R2-dependent actions before revocation. Do not reset terminal statuses or rewrite reviews through fixture authority to manufacture another test case. On a product failure, stop scenario execution, retain sanitized minimal reproduction, and run mandatory cleanup. No automatic product repair or CI rerun.

## Acceptance oracles

| ID | Real operation and required result |
|---|---|
| V1-01 | Same owner POSTs second active application: rejected, one active application remains; no teacher/decision/audit side effect. Record actual pre-existing state. |
| V1-02 | Repeat A0 submitted-state PATCH: original application and canonical submitted_at remain; no new application, teacher, verification, public decision or transition audit. Error/zero-row denial is distinguished from a successful mutation. |
| V1-03 | After A1 approval, repeat the complete current save-review then approval operation: exactly one teacher, verification and approval-transition audit; no duplicate decision row. Record private-review field/actor and public-decision observations. Do not require blanket terminal-review immutability. Any inconsistency of final actor/review/public decision/audit is a finding, not silently ignored or repaired. |
| V1-04 | Two separately authenticated reviewer sessions attempt complete approve and reject operations on A3 in_review. Exercise current separate review-write and status-write requests. Exactly one terminal transition wins; committed actor, review, public decision and transition audit agree; loser must not report successful conflicting terminal state. Observe resulting row counts and absence of losing side effects. |
| V1-05 | R2's token is minted while admin and kept byte-identical across authoritative role revocation. Subsequent foreign application, document, private-review and audit reads expose nothing; privileged decision/review writes change nothing; direct protected admin navigation is denied. Owner-visible data is not incorrectly required to disappear. HTTP200 with empty RLS result may be denial; status alone is not the oracle. |
| V1-06 | A reviewer obtains a short-lived signed URL for A4's existing disposable document. Initial retrieval succeeds; fresh uncached retrieval after its actual expiry is denied. Never record URL/token or change product ten-minute policy. If supported TTL/leeway cannot be established, report UNTESTED capability block. |
| V1-07 | Real browser login and direct admin application page: A1 submitted → request changes with public reason/private note → applicant reload, edit and resubmit → reviewer reload and approve. A2 follows separate real rejection path. Check durable canonical states, server actor/time and matching public reason. Applicant/public responses and visible UI must not expose private notes. Reviewer can access authorized private document. API-only lifecycle is insufficient. |
| V1-08 | Put A4 in changes_requested through reviewer UI/API, then interrupt one genuine browser upload request before storage persistence is acknowledged. UI must not claim a persisted document; no new metadata row. Inspect exact object/metadata result through fixed fixture readback and distinguish confirmed absence, confirmed cleanup and unresolved storage outcome. Preserve existing metadata-failure cleanup tests; never infer rollback merely from request abortion. |

Concurrency uses an explicit request barrier and logs sanitized stage ordering. Release both operations once, preserving each operation's internal save-review→status ordering; record the actual interleaving. No sleep/retry until desired winner, no mock authorization result, and no fixture-created atomic RPC. If overlap cannot be demonstrated within a fixed deadline, mark the race unproven rather than claim concurrency from serial requests. The winner need not be predetermined.

Repeated approval may expose a runtime inconsistency even when duplicate counts pass. Preserve this evidence and stop for a separate repair decision; never add an immutability guard in test-only work. Likewise, duplicate submitted-state rejection can satisfy the no-side-effects oracle without inventing idempotent success semantics.

## Bounds and evidence

Preserve existing browser journey timeouts and original performance measurements. New API operations have a 20-second deadline; new individual UI lifecycle scenarios have a 120-second deadline; race has a 20-second deadline. Document expiry has one deadline of 60 seconds, including initial retrieval and a single fresh post-expiry retrieval. A bounded wait for the documented expiry boundary is legitimate; repeated probes until denial are not. Determine the supported test TTL and validator leeway from pinned service behavior/current official documentation during implementation review; insufficient capability must remain UNTESTED, not an improvised clock or token change.

Report each criterion PASS/FAIL/UNTESTED with assertion identifiers, source SHA, runner/run/attempt, actual stage ordering, safe actor labels, counts, timing and cleanup outcome. Never emit passwords, JWTs, email bodies, signed URLs, object paths, private notes, request bodies or raw service errors. Disable sensitive browser traces/HAR for added checks; screenshots must exclude document links and private fixture content. Existing four applicant captures remain unchanged.

Record added phase Auth/data timings separately from accepted applicant timing series. This packet does not establish comparable Next.js payload acceptance or resolve mobile fixed-navigation/human NVDA/founder visual gates.

## Review, execution gate and stop rules

First, controller persists and reviews this proposal, including the active-draft coverage distinction and fixed helper boundary. Independent security/Trust review of the finished test diff precedes the one permitted exact-head CI attempt. Local pure guard/unit checks may be proposed under the later claim; no current test execution is authorized by this preparation artifact. Required existing CI names and checks remain unchanged.

Return task/claim identity, base/head SHA, exact changed paths, migration/source preservation checks, command exits, sanitized criteria matrix, artifact digest/location and cleanup proof. A failure or missing evidence is not acceptance. New files outside the allowlist, unsafe fixture targeting, secret leakage, inability to demonstrate overlap, unexpected row counts or a reproduced runtime defect stop the package for controller disposition. Mandatory owned cleanup is still attempted; cleanup failure is separately reported.

Only controller may advance PROPOSED to reviewed/SPEC-READY and issue an exclusive claim. No writer self-acceptance of I02-08, hosted readiness, F7 or P1.

## Explicit remaining decisions and deferred work

- Controller accepted two extra reviewers, 5→7→0, fixed commands, original duplicate side-effect semantics and race consistency. These are preparation decisions pending durable persistence/review, not an execution claim.
- Exact duplicate-in-draft-state coverage is not provided by reusing five already-submitted applications. This proposal truthfully limits V1-01 to active-application uniqueness. If literal concurrent/fresh draft coverage is required, approve an additive pre-submit assertion inside an original case or a separately bound fixture amendment before coding; do not silently expand either.
- Genuine expired JWT: UNTESTED/deferred to separately reviewed supported disposable short-expiry capability. Current committed Auth config has jwt_expiry=3600. No config edits, signing fake tokens, host-clock changes, refresh-revocation substitution or production guarantee in N1-V1.
- Signed-URL expiry capability and barrier feasibility must be substantiated in finished test review. Failure to establish them yields explicit blocked criteria, not relaxed acceptance.
- Hosted corrections/SMTP/recovery, production release, mobile reachability, comparable payload checks and human gates remain separately owned.
