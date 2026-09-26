# I0.2 Corrective Packet — verified-source repair preparation

**Task ID:** B1-I02-repair-within-contract  
**Status:** READY for a single guarded implementation claim; not accepted and not merged  
**Prepared:** 2026-09-16 UTC  
**Immutable base:** `79603ae1af60a30f86c105e0f2a4d841043eb727`  
**Corrected independent review:** external `libfile_08223bc2b908819195d0dd1c2ba4bf41`, SHA-256 `9778b2cecd75bb617105d009f7c70067d0d93acbccde8b1e67d23383b4e99467`  
**Governing package:** `specs/ARO-I0.2-APPLICATION-BASELINE.md` v1.0.0, especially §§6, 8–13, 16–23  
**Authority:** isolated disposable-CI repair only. No hosted or production mutation, real account, provider change, payment, P1 work, secrets, dependency change, merge, deployment or release.

## 1. Reconciliation result

The corrected independent review is corroborated by unchanged current source:

| Finding | Current source evidence | Repair disposition |
|---|---|---|
| R1: fabricated public reputation | application baseline migration grants authenticated INSERT on `public.teachers` and its owner policy checks only `user_id`; approval preserves existing statistics | **in scope**: narrow INSERT column privileges plus approval/public-read regression |
| R2: reviewer can rewrite applicant evidence/consent | authenticated admins can UPDATE applicant fields; `validate_application_transition()` checks status but not applicant fields | **in scope**: append-only reviewer immutability guard |
| R3: suspended owner can delete protected Trust record | teacher owner DELETE permits `not is_teacher_eligible(id)`; suspension makes that predicate true | **not implemented here**: retention/authorization amendment required |
| R4: client sends forbidden `submitted_at` | `src/lib/teacherApplications.js` sends it; migration grants no such UPDATE column | **in scope**: status-only submission, server timestamp regression |
| R5: onboarding submits before documents | `TeacherOnboarding.jsx` calls `submitApplication()` before navigating to the document surface | **in scope**: create/update draft then navigate; submission remains explicit after collection |
| R6: submitted object stays owner-deletable | Storage DELETE policy checks only bucket/owner prefix while document metadata DELETE checks editable application state | **in scope**: align Storage DELETE with draft/changes_requested contract |
| R7: browser is heading smoke, not persisted journey proof | `tools/ci/browser.mjs` verifies token/heading/overflow but not client helper persistence, onboarding→document→submission, failure/retry or required a11y/request proof | **in scope**: focused actual-client journey and request assertions |
| reviewer timestamps | `src/lib/admin.js` supplies `new Date()`; spec §9 requires server-set timestamps | **in scope**: server canonicalizes reviewer identity/timestamps; client stops asserting them |
| partial-upload cleanup | `uploadDocument()` leaves a private object after metadata insert failure | **in scope**: compensating delete and honest failure test |

The report’s cited migration, teacher-application library and onboarding blobs remain unchanged from PR #28 at this base. This packet does not reclassify historical CI as proof that the repaired contract passes.

## 2. Exact write allowlist

One writer may change only these paths on a new branch from the immutable base:

1. `tools/ci/supabase/migrations/20260916103000_i02_corrective_repairs.sql` — **new append-only migration**
2. `tools/ci/supabase/tests/application.test.sql`
3. `tools/ci/run.mjs`
4. `tools/ci/auth.mjs`
5. `tools/ci/browser.mjs`
6. `src/lib/teacherApplications.js`
7. `src/lib/teacherApplications.test.js` — **new**
8. `src/lib/admin.js`
9. `src/pages/TeacherOnboarding.jsx`
10. `src/pages/TeacherOnboarding.test.jsx` — **new**

Everything else is read-only, including every historical migration, all status/registry files, workflows, shared design/shell code, provider configuration, legacy SQL and F7 paths. If a test needs a workflow, database-runner, route, shell, status-ledger, dependency or any other edit, stop and return the precise scope amendment request. Do not substitute a shallow test.

## 3. Required migration behavior

The new migration must be additive and preserve prior history.

### R1 — teacher presentation statistics

- Revoke broad authenticated INSERT on `public.teachers`.
- Re-grant INSERT only for the non-authoritative draft/presentation columns needed by the existing permitted draft path: `id, user_id, name, photo, languages, specialties, bio, tagline, years_teaching`.
- Do not grant client INSERT or UPDATE for `rating, total_reviews, total_sessions, created_at, updated_at`.
- Retain owner `user_id` RLS and existing server approval flow. After approval, public presentation values for new records must remain server/default-derived; no client-supplied reputation survives.

### R2 — applicant evidence/consent immutability for reviewers

- Add a BEFORE UPDATE trigger/function which, for an administrator actor, rejects any change to applicant-owned fields: `display_name, headline, bio, languages, experience_types, cities, teaches_online, teaches_in_person, social_links, background_check_consent, agreed_to_standards`.
- Allow the already-approved administrator status transitions and review-table operations; do not add a new reviewer role, tier, qualification rule or applicant field.
- Preserve existing owner draft/changes-requested editing and state-machine transition validation.

### Reviewer identity and timestamp

- Add a server-side review trigger/function that sets `reviewed_by = auth.uid()` and `reviewed_at = statement_timestamp()` for a permitted admin review write. It must reject a non-admin path rather than trust client values.
- Update client review helpers so they do not send an identity or timestamp as authoritative input.
- Preserve the existing decision transaction’s requirement that the review belongs to the acting reviewer and has a server timestamp.

### R6 — document object deletion

- Replace only the Storage object DELETE policy with an equivalent named policy that requires: allowed private bucket, owner path prefix, matching application/user, and application status in `draft, changes_requested`.
- Do not change bucket privacy, MIME/size bounds, select paths, signed-URL duration, document metadata policy or retention language.
- Owner delete after submitted/in_review/approved/rejected must fail. Owner replacement remains available only while the application is editable.

## 4. Required client behavior

### R4 / R5

- `submitApplication(id)` sends only `{ status: 'submitted' }`; the server sets `submitted_at`.
- Teacher onboarding persists the approved profile/application draft fields, then navigates to `/teacher/application` without submitting.
- The status page remains the existing explicit document collection/submission surface. Do not add a new onboarding form, requirement, route, role or completeness policy.

### Partial-upload cleanup

- When Storage upload succeeds but teacher-document metadata creation fails, attempt exactly one removal of that same object path in the same private bucket, then surface the original metadata failure.
- A cleanup failure must not produce a false success or hide the original failed metadata write. It is an evidence-bearing failure, not a network retry loop.
- No object is removed after a successful metadata insertion, and no deletion is attempted when Storage upload itself fails.

## 5. Required focused tests and evidence

### pgTAP / disposable database

Extend `application.test.sql` from 60 to exactly 65 assertions; `tools/ci/run.mjs` must require the corresponding 86 total tests (21 platform + 65 application), not a vague green result.

The five new application assertions must establish:

1. authenticated users lack INSERT column privilege for teacher reputation fields;
2. a forged owner teacher INSERT that supplies reputation is denied;
3. approval/public read exposes server/default reputation values rather than fabricated applicant values;
4. an admin attempt to mutate applicant-owned evidence/consent is denied while a valid status decision remains possible;
5. a client-supplied reviewer identity/timestamp is overwritten/rejected in favor of the authenticated reviewer and server time.

### Auth/API/Storage

In the isolated disposable flow:

- use the actual submission helper contract (status only) and assert durable `submitted` plus non-null server timestamp;
- after submission, attempt direct authenticated Storage DELETE of the uploaded document and require denial;
- retain cross-user/private-document, publication and reset/cleanup checks.

### Component/browser

- Unit-test `submitApplication` payload and each partial-upload failure branch, including compensating delete behavior.
- Unit-test the onboarding completion flow: it creates/updates a draft and never submits before the application-status route.
- Extend the real authenticated browser lane beyond heading arrival: prove profile persistence after refresh, onboarding lands in the draft/document surface, an initial document can be collected before explicit submit, the explicit submit persists status/timestamp, error/retry is visible and no fake success is rendered.
- Capture keyboard/focus/status and 360px/1440px light/dark evidence only for changed journey surfaces; measure actual relevant data calls. A total phase time is not p95 proof.

### Commands

Run only in a clean isolated worktree/evidence root:

```bash
npm ci
npm run lint
npm test -- --run src/lib/teacherApplications.test.js src/pages/TeacherOnboarding.test.jsx
npm test -- --run
npm run build
node --test tools/ci/boundary.test.mjs
node tools/ci/run.mjs
node tools/ci/run.mjs --cleanup
```

The database command is CI/disposable only. No local/hosted Supabase or production target is substituted. Preserve raw service-output suppression and ensure cleanup runs after failure.

## 6. Acceptance and review

| ID | Required result |
|---|---|
| I02-R1 | crafted applicant reputation cannot reach a public eligible teacher |
| I02-R2 | reviewer status decisions cannot rewrite applicant evidence/consent |
| I02-R4 | normal helper submits with server timestamp |
| I02-R5 | initial document collection occurs while editable draft exists |
| I02-R6 | submitted evidence object cannot be deleted by owner |
| I02-R7 | browser proves named persistent journeys rather than headings only |
| I02-TIME | review identity/time are server-derived |
| I02-UPLOAD | metadata failure cleans the orphan object or reports verifiable cleanup failure |
| I02-REG | historical Trust, private profile, verified publish, reset/cleanup and no-client-money boundaries still pass |

After the final immutable diff and evidence bundle are complete, a separate non-writing security/privacy/Trust reviewer must inspect it. That reviewer may reject it; neither CI nor the implementation writer can mark I02-08 accepted.

## 7. R3 founder-only amendment

**Decision required before any R3 code change.** Current specification requires preservation of Trust/verification controls but does not state the retention/deletion rule for a suspended/banned owner’s existing Trust record. The following narrow amendment is proposed, not approved:

> For I0.2’s isolated baseline, an owner may delete only a teacher record that has never acquired a `teacher_verifications` history. Once a verification record exists, including suspended or banned, direct owner deletion is denied. Any removal or correction of protected Trust history requires a separately defined authorized support/retention process. This does not define production retention length, alter public visibility, create a new admin UI, or authorize a live migration.

If approved, a separate R3 patch must be appended to a later migration and test active, suspended, banned and no-booking cases. It must not be silently combined with B1.

## 8. Claim, stop and result rules

- Claim only after the controller reads the latest ledger and confirms F7 has no active execution claim and its controlled host will not be used.
- At most two repair cycles; one transient transfer retry. Do not weaken a check, budget, RLS policy or evidence requirement to pass.
- Stop immediately for base drift, a required unlisted file, a new retention/authorization/product decision, unavailable isolated CI, secret/provider request, non-synthetic data, failed cleanup isolation or ambiguous ledger write.
- The result bundle must include: task ID, claim nonce, base/head SHA, changed-file list, new migration checksum, exact test exits, CI run/artifact identifiers, evidence root, each acceptance row PASS/FAIL/BLOCKED, reviewer request and unresolved R3 state.
