# B1 independent finished-diff review — 2026-09-19

```yaml
taskId: B1-IND-20260919-001
reviewerIdentity: independent non-writing security/privacy/Trust reviewer
baseSHA: 79603ae1af60a30f86c105e0f2a4d841043eb727
headSHA: fd169e43d481c9ee25c0ed051659adb7736265b2
evidenceRoot: /workspace/scratch/95edc6c9ef6a/aro-b1-independent-review-20260919-claim-001/evidence
manifestSHA: recorded with the verified handoff; manifest.sha256 verifies this report
nextState: B1 remains REPAIR_REQUIRED and I02-08 remains NOT PASS; B1B is terminally BLOCKED in this window.
```

## Scope and method

This is a read-only review of the immutable PR #52 comparison only:
`79603ae1af60a30f86c105e0f2a4d841043eb727..fd169e43d481c9ee25c0ed051659adb7736265b2`.
The detached checkout is at the stated head. No source, documentation, PR, ledger,
provider, CI run, database, build cache, browser cache, schedule, or artifact was
changed. `git diff --check` was clean. The 12 changed paths exactly match the B1
corrective-packet allowlist (including its two listed new tests and one new
append-only migration).

I read the governing `AGENTS.md`, ledger v20 B1-IND dispatch row, I0.2 baseline
v1.0.0 §§6, 8–13 and 16–23, the corrective packet, the B1B amendment, and the
retained final B1B result. The corrected independent-review input is identified
in the canonical ledger/packet as SHA-256
`9778b2cecd75bb617105d009f7c70067d0d93acbccde8b1e67d23383b4e99467`.

## Inspected evidence

| Evidence | Result |
|---|---|
| Final Quality run `35431430371` | Retained final-result record says **success**. This is not used to infer R7 success. |
| Final disposable run `35431430361` | Retained final-result record says boundary 11/11, pgTAP 86/86, synthetic Auth/Trust and cleanup completed, then failed `BROWSER_ONBOARDING_DRAFT_CREATE_REQUEST_360_LIGHT`. |
| Actions artifact `10580653458` | Local archive SHA-256 is `1d31bdf62b8a62c7b50e3d241a54506244bfce8a2150321f59039dabb50dc65d`; `unzip -t` passed. |
| Local retrieved archive | `/workspace/scratch/95edc6c9ef6a/aro-b1b-r2-20260919-claim-001/retrieved-artifact/b1b-r2-ci-artifact.zip` has one file only: `authenticated-synthetic-journey-360-light-onboarding-diagnostic.png`. Visual inspection found a diagnostic/mostly blank onboarding viewport with no credential fields, not journey-success evidence. |
| Source/static security review | Migration functions use `SECURITY DEFINER` with `search_path = ''`, revoke direct execution, and preserve RLS-admin checks. The browser marker is restricted to a disposable child and loopback HTTP origin; IPC supplies synthetic credentials without command-line/environment/log output. |

## Requirement conclusions

“ACCEPT WITH CONDITIONS” means the finished diff statically implements the named
bounded repair and has a matching retained test/check record, but this reviewer
does not grant package acceptance or replace a required independent evidence
gate.

| Requirement | Implementation and test evidence reviewed | Review result |
|---|---|---|
| I02-R1 — fabricated reputation | `tools/ci/supabase/migrations/20260916103000_i02_corrective_repairs.sql:5-7` revokes broad teacher insert and permits only non-authoritative columns; the existing approval insert omits reputation fields at `tools/ci/supabase/migrations/20260831235206_application_trust_baseline.sql:303-308`. Forged insert and server-default assertions are at `tools/ci/supabase/tests/application.test.sql:70-73,114-117`. | ACCEPT WITH CONDITIONS |
| I02-R2 — reviewer ownership/consent | The before-update immutability trigger is at corrective migration `:11-35`; it rejects each packet-listed applicant field for an admin. The hostile consent attempt is asserted at `application.test.sql:98-100`; valid review/status path follows at `:101-113`. | ACCEPT WITH CONDITIONS |
| I02-R4 — server `submitted_at` | Client helper sends only `{ status: 'submitted' }` at `src/lib/teacherApplications.js:69-79`; the existing server transition canonicalizes the time at baseline migration `:255-280`. Unit assertion is `teacherApplications.test.js:40-48`; disposable Auth assertion is `tools/ci/auth.mjs:141-147`. | ACCEPT WITH CONDITIONS |
| I02-R5 — onboarding draft | `TeacherOnboarding.jsx:50-86,169-188` persists profile plus draft/update and routes to `/teacher/application` without a submission call. Component test `TeacherOnboarding.test.jsx:38-76` asserts no status in the update payload. | ACCEPT WITH CONDITIONS |
| I02-R6 — owner-deletable evidence | Corrective storage DELETE policy requires the private bucket, owner/application path and `draft`/`changes_requested` state at migration `:57-68`. The direct authenticated post-submit deletion denial is in `tools/ci/auth.mjs:141-150`. | ACCEPT WITH CONDITIONS |
| I02-TIME — reviewer timestamp/identity | Client review helpers no longer send reviewer identity/time at `src/lib/admin.js:120-190`. Trigger `:39-53` requires an admin and replaces both values from `auth.uid()`/`statement_timestamp()`; hostile SQL proves canonical values at `application.test.sql:101-109`. | ACCEPT WITH CONDITIONS |
| I02-UPLOAD — partial-upload cleanup | On metadata failure, `src/lib/teacherApplications.js:105-139` performs one best-effort same-path deletion and rethrows the original error. Unit coverage includes metadata failure, upload failure, and post-persistence signed-URL failure at `teacherApplications.test.js:50-96`. | ACCEPT WITH CONDITIONS |
| I02-R7 — authenticated persisted journey | Browser code defines the intended POST/PATCH proof and named captures at `tools/ci/browser.mjs:190-258`, but final run `35431430361` timed out waiting for the required draft-create POST at `:192-196`. Artifact `10580653458` contains only its diagnostic image; there is no draft, failure, retry, submit/timestamp, or 360/1440 light/dark success evidence. | **NOT PASS** |

## Findings

| Severity | Requirement | Path | Evidence | Owner | Acceptance |
|---|---|---|---|---|---|
| blocking | I02-R7 | `tools/ci/browser.mjs:190-258`; retained final result; artifact `10580653458` | The final permitted hosted run reached the explicit onboarding action but no expected `POST /rest/v1/teacher_applications` response arrived. The digest-verified archive has only `authenticated-synthetic-journey-360-light-onboarding-diagnostic.png`; it has no required success captures. | Future controller under a newly authorized task, then its explicitly assigned repair owner | Do not infer a pass. Any future work needs new authority, a fresh isolated claim, a real-cause diagnosis, successful required request evidence, all named capture evidence, cleanup, independently retrieved digest, and a separate finished-diff review. |
| high | I02-R7 | `tools/ci/browser.mjs:171-190,262-289` | Static review finds the authenticated login/onboarding block runs only when `width === 360 && theme === 'light'`. The new dark context never authenticates before its profile checks, and changed-surface authenticated journey captures are only named for 360/light. Thus even a repaired initial POST would not establish the packet’s 360/1440 light/dark changed-journey evidence. | Future controller under a newly authorized task | Treat as an unresolved R7 evidence-scope condition; controller must assign and independently verify any future remedy. This review requests no code change and grants no acceptance. |

## Security and scope assessment

- RLS/`SECURITY DEFINER`: the two added trigger functions use fixed empty search
  paths and have execute revoked from `public`, `anon`, `authenticated`, and
  `service_role` (`20260916103000_i02_corrective_repairs.sql:11-53,70-73`). They
  call the existing server-derived `app_private.is_admin()` function, whose
  fixed search path and execute grant are at the baseline migration `:21-34`.
  No new client bypass, broad table grant, or `app_private` API exposure was
  found in the changed diff.
- Direct evidence deletion: the replacement Storage DELETE policy is narrower
  than the inherited owner-prefix-only policy and the retained disposable Auth
  lane directly attempts deletion after server submission. No broad delete
  policy was introduced.
- Loopback/marker guard: `src/config/ux0.js:9-25` requires both compile marker
  and HTTP loopback; `browser.mjs:53-58` negative-checks marker-only and remote
  origins. `run.mjs:82-113` strips inherited marker state and passes it only to
  the disposable child.
- Credentials/data: local synthetic values are used in the Auth/browser code;
  the browser child receives credentials over IPC and suppresses stdio. The
  diagnostic capture refuses credential-input pages. The retrieved image has no
  visible credential field. No real data, live target, or credential value was
  observed in the comparison or retrieved artifact.
- Test integrity: no allowlist escape or direct assertion weakening was located.
  The runner requires 86 pgTAP assertions (`run.mjs:65-69`) and failure remains
  fail-closed. This static conclusion does not substitute for a fresh runnable
  verification, which this review intentionally did not execute.

## Overall conclusion

The bounded R1, R2, R4, R5, R6, I02-TIME, and I02-UPLOAD changes are accepted
with conditions for static finished-diff review only. R7 is **NOT PASS** and
therefore the package is not accepted, I02-08 is not accepted, no merge or
status upgrade is authorized, and B1B remains terminally blocked for this
window. R3 is outside this B1 diff and remains for the separately governed B2
path.
