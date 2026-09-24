# Independent N1 Trust review — September 21

Reviewer: separate read-only agent `/root/review_n1_trust`. Candidate: `b431fb59981458f82c635deb2d60e7ffb4077d43`, PR #54. **Changes required before full I0.2/N1 acceptance.** No writes, builds, database or provider actions by reviewer.

## Evidence

Exact-head static, browser-smoke and platform checks succeeded. [Platform job](https://github.com/leonartist7/ARO.club/actions/runs/35585633732/job/106288198241) records 91/91 SQL assertions twice, authenticated browser completion, account reset and successful cleanup. Artifact ZIP SHA-256 from job log: `06e4d702ac2fac14c5d4feda57171419e2f0ad5482ce7ab67091f520f4fad4d0`. Screenshot contents were not independently visually inspected.

R1/R2/R3/R4/R5/R6/TIME changes appear consistent with N1 v1.2's bounded reconciliation: restricted reputation inserts, reviewer immutability, protected history, server timestamps, editable onboarding and submitted-object deletion policy. Auditor-role reset repairs the history assertion without granting owner access. No newly introduced SQL authorization bypass identified in this reviewed diff.

## Findings

1. **P2 — cleanup failures unobservable.** `src/lib/teacherApplications.js:130` ignores resolved removal errors and rejected promises. A metadata failure can leave a sensitive object without distinguishing successful cleanup from failure. Preserve the original error, attach a secret-safe cleanup outcome, test both failure forms and assert attempted path equals uploaded path. I02-UPLOAD remains partial.
2. **P2 — R7 evidence incomplete.** `tools/ci/browser.mjs:187` exercises onboarding/document/error/retry/submission at 360 light only; other cases inspect profile. Capture changed surfaces at 360/1440 × light/dark. Verify keyboard/focus/status, persisted values and relevant data-call timing. The 34.85-second phase duration is not query-performance evidence.
3. **P2 inherited release blocker — upload inaccessible by keyboard.** `src/views/teacher/TeacherApplicationStatus.jsx:191–203` has a display:none file input in a nonfocusable label/span; setInputFiles bypasses the defect. Provide focusable activation and announcements for upload/error states (also lines 200/210). This path needs explicit binding into the owning N1 package before repair; original corrective allowlist does not include it.

## Disposition

| Requirement | Assessment |
|---|---|
| R1–R6/TIME | Static implementation supported; disposable CI passes on exact head |
| UPLOAD | Partial; compensation attempted but failed cleanup not observable/tested |
| R7 | Partial; real 360-light flow passes, full matrix/accessibility/persistence/timing missing |
| Hosted email/production | Separate gates; not closed by this review |

No merge, hosted migration, production activation or I02-08 acceptance is authorized by this report. Later changes need a new immutable head and focused review; do not re-run all historical audits.
