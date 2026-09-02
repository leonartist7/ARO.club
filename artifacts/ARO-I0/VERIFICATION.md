# ARO-I0 Specification Package Verification

> Date: 2026-08-28
>
> Branch: `spec/aro-i0-isolated-infrastructure`
>
> Base: `67d5c8d24bd6b6a11cff10d49407b321b1bf74cb`
>
> Result: **SPECIFICATION/HYGIENE VERIFIED; BRANCH PROTECTION VERIFIED; INFRASTRUCTURE IMPLEMENTATION BLOCKED**

Provider-gate evidence branch: `infra/aro-i0-branch-protection`, PR #30.

## Scope

This delivery verifies the I0 specification, provider baseline, status synchronization and removal of literal Supabase key values from deployment documentation. It does not claim that local, Preview or Production infrastructure is ready.

No runtime source, dependency, schema, migration, RLS policy, Auth setting, Vercel variable, domain, Supabase resource, billing plan or user data changed.

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
| Latest M0 production deployment READY | PASS |
| Tonguee Supabase ACTIVE_HEALTHY and untouched | PASS |
| `aro-platform` INACTIVE, quarantined and untouched by this audit | PASS |
| Free plan/one active slot currently available | PASS |
| Current new-project quote recorded without confirmation | PASS — $0/month; confirmation not submitted |
| Current Preview-branch quote recorded without confirmation | PASS — $0.01344/hour; paid capability unapproved |
| Local container runtime | FAIL — Docker-compatible command unavailable |
| Hosted isolated ARO target | FAIL — unassigned |
| `aro.club` routing to connected ARO project | FAIL — different Spanish product currently served |

## Acceptance mapping

| ID | Result | Evidence |
|---|---|---|
| I0-001 | PASS | live Vercel/GitHub separation evidence in baseline |
| I0-002 | PASS | live Supabase project status; no mutations |
| I0-003 | PASS | literal values removed; repository scan clean |
| I0-004 | BLOCKED | no compatible local container runtime |
| I0-005 | BLOCKED | $0 project quote confirmed; explicit cost confirmation and region still required; no hosted target |
| I0-006 | BLOCKED | target does not exist; env-scope dashboard evidence unavailable |
| I0-007 | BLOCKED | isolated Auth target absent |
| I0-008 | BLOCKED | isolated recovery target absent |
| I0-009 | PASS | main protection requires strict `static`, `browser-smoke`, `platform`, PRs and resolved conversations |
| I0-010 | PASS TO DATE | no charge, project, branch or destructive operation occurred |
| I0-011 | FAIL / FOUNDER ACTION | connected project does not own/list `aro.club`; hostname serves another product |

## Review conclusion

The package is safe to merge as specification/evidence/hygiene. I0 itself must remain **SPEC-READY / IMPLEMENTATION BLOCKED**. Do not advance I0 to VERIFIED, do not start P1 runtime migrations, and do not point ARO.club at either preserved Supabase project.

Safe continuation after founder action:

1. confirm the quoted $0 `ARO.club Staging` project and select its region;
2. create and verify that isolated target without touching either preserved project;
3. identify the current `aro.club` owner/project;
4. optionally install/enable a compatible container runtime for the local path.
