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
- F5 production browser suite: PASS after correcting enlarged-text shell layout; complete results retained locally in `fv1-browser.log`.
- F6 production browser suite: final recheck pending after correcting Library minimum width at 200% text size.
- Full disposable Auth/RLS/Trust execution requires Docker/hosted CI; no local Docker success is claimed.
- Hosted signup/confirmation/login persistence/recovery/expiry tests remain pending synthetic inbox and provider Auth configuration access.

## Live provider audit
| Connection | Observation |
|---|---|
| GitHub → Vercel | `aro-club`, team `lionovart`, linked to `leonartist7/ARO.club`, production branch `main` |
| Current production | READY Vite deployment `dpl_68dG57YPqK6PUp8ZwNRv3h2eLPUX`; Next.js is not yet promoted |
| Environment variables | Existing Supabase variables use VITE names and Preview scope; migration branch needs NEXT_PUBLIC equivalents |
| Supabase | `mibydnerayobemhnlfyl` / ARO.club Staging ACTIVE_HEALTHY; security advisor reports no findings |
| Production backend | Not selected; existing staging stays isolated; quarantined aro-platform and Tonguee are untouched |
| AI Gateway | Project OIDC enabled with team issuer; dashboard still shows activation/card-verification step. No paid inference or credit purchase performed |
| Public domain | Current production alias `aro-club.vercel.app`; custom domain decision pending |

## Release gates
Branch-scoped preview environment values, READY Next.js deployment, hosted smoke/runtime checks, successful stable CI checks (`static`, `browser-smoke`, `platform`), independent security review, Auth redirect/SMTP confirmation and real synthetic email flows. Production also needs the backend and domain decisions. Draft Trust/security PRs #51–#53 remain separate; no failed or unreviewed changes are merged here.

## Recovery
Keep the existing READY production deployment available. Versioned `vercel.json` applies Next.js only to this source revision; the global Vite framework setting is unchanged until cutover. Roll back a future frontend release to the previous READY deployment and its environment-name mapping. This package has no database rollback.
