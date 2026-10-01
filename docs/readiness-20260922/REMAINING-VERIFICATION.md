# Remaining verification — bounded successor packet

Prepared under READY1, not a new execution claim. Owner: existing N1 owner; independent security/Trust reviewer after finished diff. Source base f37dc084d7172415f581a41e90d2edd9ba3738b9. Governing acceptance: I0.2 §§8, 19–23, existing N1 scope. Preserve accepted corrective source.

## Existing evidence reused

The four-context applicant journey and 91 SQL assertions twice remain accepted at N1 66d77dfe. auth.mjs already tests old-password rejection after recovery and revoked refresh rejection after global logout. Those checks do not prove expired access-token rejection or live reviewer-role revocation. Existing SQL serially approves, publishes and suspends one teacher; this does not prove competing decisions.

Controller searched current tools/ci, teacherApplications tests and I0.2/N1 artifacts for concurrent, duplicate, revocation, stale/expired and signed-access coverage. No completed evidence for the missing rows below was identified. This is evidence absence, not a finding that runtime fails.

## Exact next test-only package

Before editing, the N1 owner creates a SPEC-READY verification package binding new test files and the minimum runner changes. No production/client/migration/dependency/workflow edits. One isolated checkout, database and evidence root. Preserve current SQL suite and genuine keyboard matrix; if new tests use extra fixtures, explicitly amend setup/reset counts rather than loosening equality assertions.

| Scenario | Acceptance assertion |
|---|---|
| Duplicate draft | Same user's second active application is rejected; exactly one draft remains |
| Duplicate submit | Repeated same-state request cannot create another application, teacher or decision; canonical submission time is preserved |
| Duplicate approval | Repeated same-state approval produces one teacher, one verification and one transition audit event |
| Competing decisions | Two independent reviewer sessions attempt conflicting final transitions on one in-review application; exactly one final transition wins and its actor/review/audit match. Loser must not report successful conflicting state |
| Reviewer revocation | Token issued while admin remains unchanged; remove role using fixture-only authority; privileged reads and decision writes are denied on subsequent requests |
| Expired access token | Exercise a genuinely expired locally issued token; protected Auth/data access is denied. Do not invent a production session-revocation guarantee |
| Expired document URL | Issue a short-lived signed URL in the disposable environment, prove access before expiry and denial after expiry; do not log URL/token or weaken production ten-minute policy |
| Review lifecycle | Applicant submits, reviewer requests changes, applicant edits/resubmits, reviewer approves; separate rejection case; state, public reason and private notes visibility match actor permissions |
| Interrupted upload | Cancellation/failure never reports a persisted document; exact cleanup/uncertainty evidence, no fabricated success |

Use real disposable API/SQL behavior for authorization and races, not mocked policy answers. Use authenticated UI coverage for reviewer lifecycle where the original journey requires it. Keep failures named and secret-safe. Do not suppress failures, add sleeps/retries to make them disappear, or change requirements after running tests.

One new exact-head CI attempt is justified by these genuinely missing tests. A reproduced product defect stops test-only work and returns the minimal reproduction for a separate bounded repair. No automatic re-run or product fix under this packet.

## Other remaining acceptance

- Mobile fixed-navigation reachability: a bounded viewport/scroll/keyboard check of the affected onboarding/status actions at 360px, light/dark. Full-page screenshot overlap alone proves neither obstruction nor reachability. Repair only a reproduced defect under a separate claim.
- Payload: compare current N1 affected-route transfer/build measurements with the applicable baseline and package budget. The old Vite main-chunk measurement cannot be equated to total Next.js route transfer. Record comparable measurements and any approved exception; never relabel a regression as optimized.
- Human: NVDA/Chromium Windows and founder visual acceptance retain their existing owners/gates. Automated semantics and screenshots do not replace them.

Exit: reviewer maps every remaining criterion to evidence or an exact block. The packet cannot independently approve I02-08, hosted readiness, F7 or P1.
