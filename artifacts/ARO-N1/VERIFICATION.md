# N1 Vercel rollout verification — 2026-09-21

Status: IMPLEMENTED / PARTIALLY VERIFIED; not production-released.
Spec: [N1 rollout v1.1](../../specs/ARO-N1-VERCEL-ROLLOUT.md).
Baseline: GitHub main `79603ae1af60a30f86c105e0f2a4d841043eb727`.

## Source reconciliation
ARO.club and FV1-docs both use `leonartist7/ARO.club`; they are separate local histories, not separate GitHub deployment targets. This branch ports the N1 migration onto current main, preserving its F1–F6 pages, complete translations, data fixtures, image manifest and WebP assets. Existing assertions remain; their router harness and production server now use Next.js. No Supabase SQL/migration file changed.

## Local evidence
- Baseline: lint/build PASS, 131 unit tests PASS, three opt-in browser cases skipped.
- Migrated: production build PASS; lint/type-check PASS; 147 unit tests PASS, three opt-in browser cases skipped in that run.
- Infrastructure: 18 autonomy and 11 isolated database boundary tests PASS.
- F4 production browser suite: 40 light/dark responsive observations PASS, 44px minimum controls, zero horizontal overflow and no product network side effects.
- F5 production browser suite: 20 responsive and four zoom observations PASS; no profile collisions or product network writes. Evidence: `fv1-personal-browser.json`.
- F6 production browser suite: 40 responsive and eight zoom observations PASS, zero horizontal overflow and five keyboard destinations. Evidence: `fv1-return-browser.json`.
- Required GitHub checks all PASS at `2a3dd3505b980a793895bbd766d3dc3c45bd4a86`: [static/browser-smoke](https://github.com/leonartist7/ARO.club/actions/runs/35579171065), [platform](https://github.com/leonartist7/ARO.club/actions/runs/35579171059). Browser CI includes 32 retained F4–F6 tests and 25 full E2E checks.
- Disposable CI passes 81 transactional SQL assertions twice, two-user signup, password login/refresh, application/Trust boundaries, authenticated responsive browser matrix, recovery/password change, logout revocation, reset isolation and cleanup. Hosted staging email delivery remains a separate gate.
- Hosted signup/confirmation/login persistence/recovery/expiry tests remain pending synthetic inbox and provider Auth configuration access.

## Live provider audit
| Connection | Observation |
|---|---|
| GitHub → Vercel | `aro-club`, team `lionovart`, linked to `leonartist7/ARO.club`, production branch `main` |
| Current production | READY Vite deployment `dpl_68dG57YPqK6PUp8ZwNRv3h2eLPUX`; Next.js is not yet promoted |
| Environment variables | NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY and NEXT_PUBLIC_ENABLE_STAGING_ACCOUNTS configured only for Preview branch `codex/nextjs-vercel-rollout`; actual token endpoint returns the expected invalid-credentials response |
| Supabase | `mibydnerayobemhnlfyl` / ARO.club Staging ACTIVE_HEALTHY; security advisor reports no findings |
| Production backend | Not selected; existing staging stays isolated; quarantined aro-platform and Tonguee are untouched |
| AI Gateway | Project OIDC enabled with team issuer; dashboard still shows activation/card-verification step. No paid inference or credit purchase performed |
| Public domain | Current production alias `aro-club.vercel.app`; custom domain decision pending |

## Hosted preview evidence
[CI-verified Preview](https://aro-club-2paam6kbk-lionovart.vercel.app), deployment `dpl_Dw1qV5L3dmvkkQKEbUiTtuF2McHu`, is READY at `2a3dd35`. Account fields were checked again on that deployment. Full browser evidence was captured at `cfa78a3` on deployment `dpl_5Jg3ZMNthEBN5giX3GCPDjvNDL26`; subsequent changes declare the server-only dependency and correct test readiness, with no page/auth behavior change.

- `browser-parity.json`: 71 checks PASS; routes, parameters, protected query returns, invalid callbacks, unknown routes, mobile/desktop light/dark, browser history, zero page/hydration errors.
- `staging-boundary.json`: six checks PASS; email login enabled, Google disabled, staging rejects synthetic invalid credentials, anonymous admin denied, expired callback stays local, no session created.
- Supabase public Auth settings: email enabled, signup enabled, confirmation required, Google disabled. Dashboard Site URL/redirect allowlist/SMTP have not been verified because browser sign-in is pending.
- Vercel runtime error audit: no error clusters in the inspected window. This is an observation, not a guarantee of future behavior.
- Protected previews remain protected. A temporary deployment-specific access link was used for automated verification; its value was stored only in an ignored local file.
- Production dependency audit: zero known findings; the complete development tree still reports 15 findings (2 low, 5 moderate, 8 high).

## Performance and existing production failure
Direct loading of production `/app` returns Vercel 404; Next.js Preview resolves it correctly. Its error response is excluded from the performance comparison.
Three unthrottled desktop samples per route are observational, not a release benchmark. Current Vite `/` median LCP: 1128ms; Next.js Preview `/`: 904ms. Decoded JavaScript increased from 629,951 to 1,176,270 bytes. Preview `/app` median LCP: 436ms, decoded JS 1,152,581 bytes; no valid direct-load production baseline exists. Preview CLS was zero in these samples. The payload regression remains a review consideration; no general optimization claim or performance-budget waiver is made. Raw evidence: `baseline-performance-hosted.json`, `performance-hosted.json`.

## Release gates
Remaining: independent security review, Auth redirect/SMTP confirmation and real hosted synthetic email flows. Production also needs the backend and domain decisions, and explicit enablement/configuration for that selected backend; the current account guard intentionally rejects production. AI Gateway needs account activation, spend limits and an approved bounded feature before live inference. Draft Trust/security PRs #51–#53 remain separate; no failed or unreviewed changes are merged here.

## Recovery
Keep the existing READY production deployment available. Versioned `vercel.json` applies Next.js only to this source revision; the global Vite framework setting is unchanged until cutover. Roll back a future frontend release to the previous READY deployment and its environment-name mapping. This package has no database rollback.
