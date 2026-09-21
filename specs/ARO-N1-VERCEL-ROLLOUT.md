# ARO-N1 — Current-main reconciliation and Vercel rollout

Version 1.1.0. Status: IMPLEMENTED / PARTIALLY VERIFIED. Preview deployment and required CI pass; production/provider release gates remain open.
Owner: founder. Authorization: explicit Next.js migration request and September 21 request to verify/deploy Vercel, Supabase and GitHub integration, including AI Gateway readiness.
Branch: `codex/nextjs-vercel-rollout`. Baseline: `79603ae1af60a30f86c105e0f2a4d841043eb727`.

## Scope and sequencing
Port the existing N1 App Router and staging-account implementation onto current GitHub main. Both earlier local checkouts share the same remote; preserve current F1–F6 pages, images, translations and assertions. This scoped stack exception precedes P1 without unlocking synthetic product data, payments, Google OAuth, Trust/schema changes or unrelated packages.
Governing documents: AGENTS.md, ARO_BUILD_PLAYBOOK.md, ARO_ARCHITECTURE.md, ARO_INFRASTRUCTURE.md and ARO_TRUST_SAFETY.md. N1's original acceptance requirements continue to apply.

## Runtime and permissions
Next.js routes/layouts use TypeScript; existing JavaScript components remain. Cookie-based Supabase SSR verifies identity and authoritative database roles. Only the registered isolated staging project may serve enabled preview accounts. Missing configuration fails closed. Authenticated responses use private/no-store caching. Logout clears account state. Callback destinations are validated same-origin paths. RLS and verified-teacher publishing remain unchanged.

## Provider work
Verify GitHub → Vercel linkage, framework/build settings, environment scopes, preview deployment, runtime errors and Supabase project health. Use branch-scoped preview variables and versioned framework settings. Never replace existing production with a staging backend. Production backend and public domain decisions are pending founder answers. Preserve required CI names and independent security/Trust review gates; failing draft security PRs are not merged by this package.

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
