# ARO-I0 Specification Package Verification

> Date: 2026-08-28
>
> Branch: `spec/aro-i0-isolated-infrastructure`
>
> Base: `67d5c8d24bd6b6a11cff10d49407b321b1bf74cb`
>
> Result: **HOSTED CAPACITY ACTIVE; APPLICATION RLS VERIFIED; REMAINING I0 GATES BLOCKED**

Provider-gate evidence branch: `infra/aro-i0-branch-protection`, PR #30.

Hosted-staging evidence branch: `infra/aro-i0-hosted-staging`, PR #31.

Post-merge verification reconciliation: `docs/aro-i0-hosted-verification`, PR
#32.

CI-reset-equivalence amendment: `spec/aro-i0-ci-reset-equivalence`, PR #33.

## 2026-09-03 hosted-staging execution

- PR #30 merged at `eb297e0` after all corrected-commit checks passed and all
  review conversations were resolved. The explicitly authorized administrator
  merge did not alter branch protection.
- Supabase re-quoted one project in `lionovart's Org` at exactly $0/month. The
  founder-approved `ARO.club Staging` project `mibydnerayobemhnlfyl` became
  `ACTIVE_HEALTHY` in `ca-central-1`.
- Tonguee remained `ACTIVE_HEALTHY`; quarantined `aro-platform` remained
  `INACTIVE` and untouched.
- The approved I0.2 application migration applied successfully. All 60
  transactional application Trust/RLS assertions passed and rolled back; zero
  synthetic Auth users remained.
- Supabase security advisors returned no findings. Performance advisors
  returned only fresh-database unused-index INFO notices and multiple-policy
  optimization warnings; no correctness or security failure.
- The 21-test platform probe found three failures: newly created `postgres`-
  owned public tables inherited broad grants for `anon`, `authenticated` and
  `service_role`. Existing application tables remain explicitly revoked/RLS-
  protected. The append-only `20260903074000_lock_public_default_privileges.sql`
  migration fixes repository-migration defaults. PR #31 passed `static`,
  `browser-smoke` and `platform`, merged at `1415113`, and the migration applied
  successfully to staging.
- Post-hardening hosted verification passes all 21 platform and 60 application
  assertions transactionally. Supabase records both migrations, security
  advisors remain clean, and only expected fresh-database performance notices
  remain.
- The staging database remains synthetic-empty after verification: zero Auth
  users, profiles and applications. The 2026-09-03 Vercel gate snapshot is
  `READY` on merged `main` commit `bce0675` at deployment
  `dpl_5F7Pp6Vc1EsZyWpxJyuiJVxppAXL`; Preview/Production variables were not
  changed.
- On 2026-09-03 the founder approved the protected GitHub-hosted disposable
  reset/replay/cleanup lane as equivalent I0 reproducibility evidence. I0-004
  therefore passes without requiring Docker on the founder's computer; a local
  container runtime remains optional developer tooling.

## Scope

This delivery verifies the I0 specification, provider baseline, status synchronization and removal of literal Supabase key values from deployment documentation. It does not claim that local, Preview or Production infrastructure is ready.

The original 2026-08-28 specification/hygiene package changed no runtime source,
dependency, schema, migration, RLS policy, Auth setting, Vercel variable,
domain, Supabase resource, billing plan or user data. The 2026-09-03 execution
created only the founder-approved $0 staging resource and applied the approved
application migration; no real user data was introduced.

## Repository verification

| Check | Result | Evidence |
|---|---|---|
| Diff whitespace | PASS | `git diff --check` |
| Literal JWT/key-pattern scan | PASS | no tracked `eyJhbGciOi` value remains after excluding dependency metadata |
| Canonical I0 discovery links | PASS | master plan, current state, infrastructure registry, spec index, implementation ledger, changelog and project brain reference the package/evidence |
| I0 spec completeness | PASS | 30 template-aligned sections, 365 lines |
| Provider baseline | PASS | `artifacts/ARO-I0/BASELINE.md` |
| Runtime/source delta | PASS | none |
| GitHub branch protection | PASS | strict `static`, `browser-smoke`, `platform`; PR/conversation resolution required; admin enforcement; force-push/deletion disabled |

## Automated baseline

2026-09-02 documentation/provider-gate self-review:

| Check | Result | Evidence |
|---|---|---|
| Lint | PASS | `npm run lint -- --max-warnings=0` |
| Unit | PASS | Vitest 2 files / 61 tests |
| Build | PASS | Vite 7.2.2; 2,602 modules |
| Main JS | RECORDED | 750.86 kB minified / 230.09 kB gzip |
| CSS | RECORDED | 89.84 kB minified / 13.92 kB gzip |
| Diff whitespace | PASS | `git diff --check` |

The package changes documentation and the GitHub protection setting only; it
adds no runtime source or dependency. The inherited large-chunk and stale
browser-dataset warnings remain unchanged in scope.

| Check | Result | Evidence |
|---|---|---|
| Unit | PASS | Vitest: 2 files, 61 tests passed |
| Build | PASS | Vite 7.2.2; 2,601 modules; production bundle completed |
| Main JS | UNCHANGED BASELINE | 750.65 kB minified / 229.96 kB gzip; inherited >500 kB warning |
| CSS | UNCHANGED BASELINE | 89.84 kB minified / 13.92 kB gzip |
| Lint | KNOWN BASELINE FAIL | 19 errors / 9 warnings, identical categories/count to P1 baseline; Q0 owns remediation |

The build also reports stale browser-compatibility datasets. No dependency update is allowed in this documentation/infrastructure-spec package; Q0 will measure and address dependency/tooling hygiene.

## Live read-only provider verification

| Requirement | Result |
|---|---|
| GitHub repo/default branch/current main | PASS |
| ARO.club ↔ Vercel `aro-club` Git link | PASS |
| Tonguee ↔ Vercel `langgie` Git link | PASS |
| 2026-09-03 `main` production deployment snapshot READY | PASS — `bce0675` / `dpl_5F7Pp6Vc1EsZyWpxJyuiJVxppAXL` |
| Tonguee Supabase ACTIVE_HEALTHY and untouched | PASS |
| `aro-platform` INACTIVE, quarantined and untouched by this audit | PASS |
| Free plan/one active slot currently available | PASS |
| New-project quote and confirmation | PASS — exactly $0/month; staging created |
| Current Preview-branch quote recorded without confirmation | PASS — $0.01344/hour; paid capability unapproved |
| Local container runtime | OPTIONAL / unavailable — CI reset equivalence approved |
| Hosted isolated ARO target | PASS — `mibydnerayobemhnlfyl`, `ACTIVE_HEALTHY`, `ca-central-1`, $0/month |
| `aro.club` routing to connected ARO project | FAIL — different Spanish product currently served |

## Acceptance mapping

| ID | Result | Evidence |
|---|---|---|
| I0-001 | PASS | live Vercel/GitHub separation evidence in baseline |
| I0-002 | PASS | live Supabase project status; no mutations |
| I0-003 | PASS | literal values removed; repository scan clean |
| I0-004 | PASS | protected CI reset/replay/cleanup evidence; founder-approved equivalence |
| I0-005 | PASS | isolated target `mibydnerayobemhnlfyl` active in `ca-central-1` at confirmed $0/month |
| I0-006 | BLOCKED | Preview/Production variable scopes not configured or verified |
| I0-007 | BLOCKED | isolated Auth URL/callback configuration not verified |
| I0-008 | BLOCKED | isolated recovery drill not performed |
| I0-009 | PASS | main protection requires strict `static`, `browser-smoke`, `platform`, PRs and resolved conversations |
| I0-010 | PASS TO DATE | founder approved the exactly $0 project; no charge or destructive operation occurred |
| I0-011 | FAIL / FOUNDER ACTION | connected project does not own/list `aro.club`; hostname serves another product |

## Review conclusion

I0 is now **IN-PROGRESS / GATES BLOCKED**. Do not advance I0 to VERIFIED, do not start P1 runtime migrations, and do not point ARO.club at either preserved Supabase project.

Safe continuation:

1. configure and verify Preview-scoped variables and Auth callbacks;
2. perform hosted recovery and authenticated E2E evidence;
3. identify the current `aro.club` owner/project before any domain action.
