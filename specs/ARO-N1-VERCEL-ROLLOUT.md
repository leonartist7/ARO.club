# ARO-N1 — Current-main reconciliation and Vercel rollout

Version 1.3.0. Bounded independent-review repairs: SPEC-READY / IN-PROGRESS. Baseline b431fb59981458f82c635deb2d60e7ffb4077d43 passes required CI; production/provider verification remains open.
Owner: founder. Authorization: explicit Next.js migration request and September 21 request to verify/deploy Vercel, Supabase and GitHub integration, including AI Gateway readiness.
Branch: `codex/nextjs-vercel-rollout`. Baseline: `79603ae1af60a30f86c105e0f2a4d841043eb727`.

## Scope and sequencing
On September 21 the founder explicitly authorized production readiness, deployment and necessary provider configuration with full autonomy. This supersedes the earlier preview-only release boundary. Use `https://aro-club.vercel.app` for the initial public release. Provision a separate ARO production Supabase project after the provider-required organization/cost selection, preserve staging, and configure confirmation/recovery redirects and email delivery. Production accounts must remain unavailable until the separate backend, authoritative roles/RLS and email delivery have evidence. Existing unmerged security fixes require inspection and regression verification; authorization is not evidence of a passing review.

Production preparation may add deployment-scoped account configuration, provider checks, security fixes necessary for this release and operational documentation. It does not authorize paid subscriptions without a quoted cost, reuse of quarantined databases, or connecting fictional product data to live users. Gateway readiness uses Vercel OIDC; activation requiring a card remains a provider step. No unbounded public AI endpoint is part of this release.

The necessary Trust correction scope reconciles the existing I0.2 candidate at `b2dd8b6a4afd7299857510fd1d7891feffb6723a`: restricted teacher insert fields, reviewer evidence immutability, database reviewer identity/timestamps, submitted-document deletion protection, protected verification history, failed-upload cleanup and editable onboarding drafts. Preserve both append-only SQL files byte-for-byte in disposable CI. Retain 91 pgTAP assertions, with the final protected-history integrity check executed as the test auditor (ordinary owners cannot read those rows). Use the second synthetic account for fresh browser onboarding because the API fixture already submitted the first account's application. Verify upload failure/retry and explicit submission in the existing Next.js browser lane. No hosted schema application occurs before passing evidence and independent review.

Port the existing N1 App Router and staging-account implementation onto current GitHub main. Both earlier local checkouts share the same remote; preserve current F1–F6 pages, images, translations and assertions. This scoped stack exception precedes P1 without unlocking synthetic product data, payments, Google OAuth, Trust/schema changes or unrelated packages.
Governing documents: AGENTS.md, ARO_BUILD_PLAYBOOK.md, ARO_ARCHITECTURE.md, ARO_INFRASTRUCTURE.md and ARO_TRUST_SAFETY.md. N1's original acceptance requirements continue to apply.

## Runtime and permissions
The September 21 controller handoff binds N1-U, N1-R7 and N1-A11Y to this sole owning branch. Repair paths are `src/lib/teacherApplications.js`, `src/lib/teacherApplications.test.js`, `src/views/teacher/TeacherApplicationStatus.jsx`, and `tools/ci/browser.mjs`; existing spec/evidence/status documentation is included. Cleanup must preserve the original metadata error and expose only a safe removed/failed outcome, including rejected and resolved-error removal results. Upload controls must be keyboard reachable/activatable with visible focus, and pending/success/error states must be announced. Browser verification covers the entire changed journey at 360/1440 in light/dark, reload persistence, keyboard activation, status semantics and sanitized data-call timing. No SQL, role, retention, dependency, provider or auth-mode changes are authorized by this repair. Additional fixture paths require the controller's bounded amendment; no parallel writer starts. A new exact-head independent review is required after the repair.

Controller decision (September 21, task 01a0c346-9e61-7f63-a511-f72097fbf59c): `tools/ci/auth.mjs` and `tools/ci/run.mjs` are explicitly included for four distinct synthetic browser applicants plus the API owner. Assert exactly five accounts before reset and zero afterwards; retain disposable-only isolation and secret suppression. Measure successful browser Auth/data requests by safe operation category, without URLs/query strings, credentials or payloads; p95 remains below 1 s under I0.2 §20. Capture draft, pending upload, induced error, successful retry, submitted state and profile in every matrix case. This decision does not authorize hosted accounts or alter RLS.

Next.js routes/layouts use TypeScript; existing JavaScript components remain. Cookie-based Supabase SSR verifies identity and authoritative database roles. Only the registered isolated staging project may serve enabled preview accounts. Missing configuration fails closed. Authenticated responses use private/no-store caching. Logout clears account state. Callback destinations are validated same-origin paths. RLS and verified-teacher publishing remain unchanged.

## Provider work
Verify GitHub → Vercel linkage, framework/build settings, environment scopes, preview deployment, runtime errors and Supabase project health. Use branch-scoped preview variables and versioned framework settings. Never replace existing production with a staging backend. Production uses the existing Vercel public domain and a separate backend. Preserve required CI names and independent security/Trust review gates; failing draft security PRs are not merged by this package.

## AI boundary
Verify Vercel OIDC and Gateway availability; document the server-only integration contract. No public unrestricted generation endpoint, automatic consequential actions, personal-data prompts, purchased credits or new AI product behavior. Product AI activation needs an explicit feature contract, model/budget/rate limits and evaluations. Existing fictional experiences remain fictional.

## Verification and acceptance
| Requirement | Evidence | Initial state |
|---|---|---|
| Preserve latest upstream content | upstream diff and retained F1–F6 tests | PASS |
| Lint, unit, type and production build | local evidence and static CI | PASS; migrated 147 unit tests |
| Direct routes, navigation, mobile/dark/hydration | N1 browser and F1–F6 browser suites | PASS; 71 hosted checks plus retained suites |
| Isolated preview provider mapping | Vercel/Supabase live audit | PASS; branch-scoped staging variables |
| Real email confirmation/recovery/session refresh | hosted synthetic account evidence | pending dashboard/email access |
| Preview build/runtime | deployment ID, logs and browser results | PASS; see N1 verification |
| Security and rollout review | independent review plus required CI | CI PASS; independent review and production/provider gates pending |

## Reliability, data, privacy, UI and performance
No schema, retention, money or new analytics changes. Reuse existing account error/loading/retry states and preview disclosure. Preserve keyboard access, reduced motion, 360px/1440px light/dark layouts and browser preferences. Compare payload/performance evidence with the actual current-main baseline; do not claim optimization without measurements. Provider failures disable live actions without fabricating success. Never commit environment values or credentials.

## Rollout and recovery
Deploy a preview only after local checks pass; verify the exact deployed revision. Production promotion depends on reviewed code, successful required checks, the selected backend/domain and auth/email verification. Roll back frontend by promoting the prior READY deployment and restoring its configuration; no database rollback is part of this package. Report partial verification honestly until every gate has evidence.
