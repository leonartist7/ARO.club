# N1-V1-20260922-001 — stopped on applicant decision mapping defect

Date: 2026-09-23. Status: IMPLEMENTATION INCOMPLETE / REPAIR DECISION REQUIRED.

Checkout: `C:/Users/leona/Documents/Web dev/ARO/ARO-n1-remaining-verification-20260922`
Branch: `codex/n1-remaining-verification-20260922`
Base and unchanged HEAD: `f37dc084d7172415f581a41e90d2edd9ba3738b9`
No candidate commit, push, CI attempt, database/container startup, browser run or provider operation.

Authority read: SPEC-READY v1.0.0 at commit `8f6ed2e622477f391478df12e046d676f56ef1d3`, blob `ea4ac42a81ad48471703c70438071d60be5ce10c`; exclusive claim dispatched after ledger v50. READY1 source documents read at exact PR62 head `0e935e1f2a53d3edc7fca3dbe21feef5ab9d032d`.

## Minimal source/client reproduction

V1-07 requires the applicant to see the public changes-requested/rejection reason. In current source:

1. `src/lib/teacherApplications.js:38` reads only `teacher_applications` and returns that row unchanged.
2. The baseline defines the public reason on `teacher_application_decisions` (migration line106), not `teacher_applications`; the decision trigger writes it there (line320).
3. `src/views/teacher/TeacherApplicationStatus.jsx:63` stores the unchanged mapper result, and line148 renders the reason only when that result has `decision_reason`.

Local pure reproduction executes the actual getMyApplication function body with a fluent fixture client offering separate application and public-decision rows. Returned application lacks the required public reason. No mock authorization, SQL or hosted result is presented as evidence. No RLS, browser or deployment conclusion is claimed.

Command: `node --test tools/ci/reliability.test.mjs`
Exit: 1. Three tests: two passed, one failed.
Failure: `V1_07_PUBLIC_DECISION_REASON_MISSING`.
Passing guards: exact five-applicant/two-reviewer inventory and distinct UUIDs; rejection of executable UUID input without echoing its content.

Reproduce from this checkout with the same command. Expected current failure is the named V1-07 assertion. This is a minimal stopped-work reproduction, not a completed general regression suite or full approved eight-scenario implementation.

## Partial files and preservation

Only two untracked files were added, both within the approved seven-path allowlist:

- `tools/ci/reliability-fixtures.mjs`: partial fixed local fixture authority and registry. Not wired into runner, not runtime-tested, not independently reviewed; do not execute it as an accepted helper.
- `tools/ci/reliability.test.mjs`: two pure boundary guards plus the failing applicant mapping reproduction.

No tracked file changed. Original runner, account count checks, four applicant contexts, SQL91 suite, source, migrations, dependencies, config and workflows are unchanged. Syntax checks were performed on the two added modules. No accounts/resources exist from this work, so no provider or database teardown was needed.

## Next disposition

Controller should review this source-level defect and authorize a separate bounded product repair if accepted. This writer made no product fix and did not proceed to remaining test implementation after the failure. Preserve the failed reproduction; do not weaken the expected public-reason behavior. All N1-V1 runtime criteria remain unexecuted. Genuine expired JWT and literal draft-state duplicate coverage remain explicitly deferred.
