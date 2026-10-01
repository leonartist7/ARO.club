# N1-R1 — Applicant public decision and load recovery
Version 1.0.0 · 2026-09-23 · SPEC-READY, bounded existing-contract repair.

## Authority and source
Founder requested readiness implementation and foundation repairs. Governing AGENTS.md and full chain, I0.2 §§8–10,16–19,21–23, N1 platform and rollout boundaries apply. This restores approved applicant-visible public decisions and truthful recoverable failure states; no new Trust/privacy policy. Source base f37dc084d7172415f581a41e90d2edd9ba3738b9. Independent nonwriting reviewer /root/ready1_trust_review confirmed source defect and reran pure reproduction (2 pass,1 fail). Historical stop receipt docs/autonomous-control-20260916/results/N1-V1-STOP-20260923.md blob2aec2292f190e713978b648a252b99de8cbbe04e. Mock mapping evidence is not database/browser/hosted proof.

## Scope and ownership
Existing N1 owner only, new isolated branch codex/n1-applicant-decision-repair-20260923 and separate checkout/evidence. N1-V1 execution paused; preserve its two untracked files untouched. Controller owns specification/ledger/evidence registry persistence. Four runtime/test allowlisted paths only:
- src/lib/teacherApplications.js
- src/lib/teacherApplications.test.js
- src/views/teacher/TeacherApplicationStatus.jsx
- src/views/teacher/TeacherApplicationStatus.test.jsx (new)
No SQL/migration/RLS/dependency/workflow/CI-harness/provider/auth-config or other product edits. Revalidate unchanged base before starting; stop unexplained drift.

## Implementation contract
After finding owner's latest application, query existing teacher_application_decisions using that returned application ID and explicit application_id, decision_reason projection only. Deliberately map only decision_reason; never spread arbitrary decision data or read private reviews. Existing authenticated client and owner/admin RLS remain authority; public schema is not anonymous access. Missing application returns null without decision read; missing decision means no reason. Query errors propagate.
Status component must show visible accessible load-error/retry before false empty branch; retry repeats real load, clears relevant prior failure and preserves truthful loading/status states. Do not conflate load and upload failures. Prevent stale prior application/decision presentation from being reported as a successful current load. Keep changes_requested/rejected-only reason display. Successful resubmission hides previous correction reason through actual current status. No redesign/new copy beyond concise actionable failure/retry; existing UI/theme/focus patterns.

## Acceptance before implementation completion
1 Module tests: changes-requested/rejected public reason mapped; exact returned application ID and safe projection; no application skips decision read; missing decision returns no reason; both query errors propagate.
2 Component tests: correct reason visible only in intended states; submitted/approved hide old reason; first-load application/decision failures visibly show error plus working Retry, never false No application yet; successful retry recovers actual application.
3 No private notes/reviewer identity requested or rendered; unexpected fields in fixture cannot enter application through decision mapping.
4 Existing submission-status and upload-cleanup tests unchanged and passing.
5 Focused module/component tests, lint and production build/TypeScript pass. Inspect exact final diff and source preservation. Independent nonwriting Trust reviewer evaluates candidate before push/CI.
6 Real authenticated API/browser owner/cross-user/private-note/reload evidence remains required through resumed N1-V1. Pure tests do not accept I02-08/hosted/P1/F7.

## Stops and delivery
No push/CI before independent finished-diff review. No merge/deploy/cost/provider operation. Stop on out-of-scope defect or required policy/SQL change; return smallest reproduction. Return immutable base/head, exact paths, command exits, evidence, remaining gaps. Later controller may approve one exact-head normal CI after review. No blanket acceptance from green CI. Repair specification is accepted for these literal existing-contract fixes, not full release.
