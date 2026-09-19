# B2 static diagnosis — 2026-09-19

```yaml
taskId: B2-DIAG-20260919-001
mode: read-only SQL/static diagnosis
claimedBaseSHA: fd169e43d481c9ee25c0ed051659adb7736265b2
claimedFinalCandidateSHA: b2dd8b6a4afd7299857510fd1d7891feffb6723a
availableDetachedSourceSHA: 86e53b372b6b759ca56998049e04d7b1fea13fc8
evidenceRoot: /workspace/scratch/95edc6c9ef6a/aro-b2-static-diagnosis-20260919-claim-001/evidence
result: BLOCKED
nextState: BLOCKED — do not authorize a B2 repair, rerun, merge, status change, or suppression-control change from this diagnosis. Supply the claimed final-candidate object and the governing ledger-v25 B2 packet to a fresh read-only claim; preserve hosted run 35432443191 as failed SQL evidence until then.
```

## Scope, provenance, and limitation

This was a non-writing diagnosis of SQL and source text only. No controller,
writer, PR, ledger, provider, CI, local Supabase, database, Docker, or browser
action was run. The runner's output-suppression behavior was inspected but not
changed.

The required final candidate
`b2dd8b6a4afd7299857510fd1d7891feffb6723a` is absent from every supplied
repository object store, including the fresh clone. `git cat-file -e` therefore
failed for that SHA. The canonical-ledger v25 B2 packet is also not present in
the supplied checkout/workspace. These are provenance blockers: the available
SHA `86e53b372b6b759ca56998049e04d7b1fea13fc8` is inspected only as a nearby
B2-tail reference and is **not** substituted for the claimed candidate.

The detached source is clean at `86e53b372b6b759ca56998049e04d7b1fea13fc8`.
That available tail is two commits after the stated base:

| Available comparison | Changed paths |
|---|---|
| `fd169e43d481c9ee25c0ed051659adb7736265b2..86e53b372b6b759ca56998049e04d7b1fea13fc8` | `tools/ci/boundary.test.mjs`, `tools/ci/run.mjs`, `tools/ci/supabase/migrations/20260916113000_i02_protect_teacher_verification_history.sql`, `tools/ci/supabase/tests/application.test.sql` |

`git diff --check` for that available comparison is clean. It is not a
verification of the missing claimed candidate.

## Proven static facts from the available B2 tail

1. Migration order is lexical and explicit in `boundary.test.mjs`: baseline,
   default-privilege hardening, corrective repairs, then
   `20260916113000_i02_protect_teacher_verification_history.sql`. The new
   migration is append-only relative to the available base.
2. The baseline `teachers_owner_delete` policy allowed an authenticated owner
   to delete while `is_teacher_eligible(id)` was false. Since a suspended or
   banned verification is ineligible and `teacher_verifications.teacher_id`
   had `ON DELETE CASCADE`, that policy could delete verification history.
3. The B2-tail replacement function checks both authenticated ownership and
   the total absence of a `teacher_verifications` row. Its `SECURITY DEFINER`
   body uses a fixed empty search path and fully qualified relations/functions.
   Public/anon/authenticated/service_role execution is revoked before execute
   is granted only to `authenticated`; `app_private` schema usage already
   exists for that role in the baseline.
4. The replacement DELETE policy calls that function. Thus, in the available
   tail, any verification row—including active, suspended, or banned—makes an
   owner DELETE return zero rows; an owner with no verification row may delete.
   This is a static policy conclusion, not an executed database result.
5. The SQL test plan changes from 65 to 70 and adds five assertions. Textual
   counting finds 70 pgTAP assertion invocations in `application.test.sql`; the
   unchanged platform plan is 21, matching the runner's expected aggregate
   `Tests=91` (rather than the prior 86). The tests reset to the privileged
   migration role before fixture updates, then set the authenticated role and
   JWT claim before each owner deletion probe. They exercise no-history,
   verified/active, suspended, banned, and preserved-row cases.
6. The runner executes `supabase test db --local` first in
   `sql-isolation-first`, requires both `Tests=91` and `Result: PASS`, and
   intentionally retains only its coarse failure code. Its phase order means
   run `35432443191` failing `sql-isolation-first` cannot be attributed from
   later Auth/browser phases.

## Diagnosis of hosted run `35432443191`

| Classification | Conclusion |
|---|---|
| Proven | The retained run reached the boundary check (11/11) and failed `sql-isolation-first` with `PROCESS_FAILED`; the source runner suppresses underlying CLI output, so the retained phase label does not identify a failed migration statement, pgTAP assertion, CLI invocation, or count/result regex. |
| Likely cause | **Unknown.** The available B2-tail text has no proven count mismatch: 21 platform + 70 application assertions equals the required 91, and the migration list/order and role-reset sequence are internally consistent. A specific SQL cause cannot be inferred without the withheld CLI output or an authorized isolated reproduction. |
| Candidate-specific status | **Unknown / uninspectable.** The claimed candidate object is absent, so it cannot be compared with the base, checked for the intended B2 allowlist, or related definitively to the hosted run. |

## Repair decision

No B2 allowlisted repair is identified. A repair would be speculation because
the exact candidate, B2 packet/allowlist, and raw failing SQL signal are not
available. In particular, do not change the pgTAP count, migration, role-reset
sequence, grants/RLS/policy semantics, function privileges/search path, or
runner output-suppression controls from this record.

## Required next input for a fresh diagnosis

Provide the immutable object for
`b2dd8b6a4afd7299857510fd1d7891feffb6723a` plus the canonical-ledger v25 B2
packet (including its allowlist). If policy permits, provide a redacted
failure-classification signal that distinguishes migration failure, pgTAP
failure, and count/result assertion failure without exposing CLI payloads or
credentials. Only then can a fresh static diagnosis determine whether a
specific allowlisted repair is logically supported.
