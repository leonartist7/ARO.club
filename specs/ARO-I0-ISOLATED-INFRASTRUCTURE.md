# ARO-I0 — Isolated Infrastructure and Provider Boundary

## 0. Metadata

- **Status:** IN-PROGRESS / GATES BLOCKED
- **Spec version:** 1.1.1
- **Owner/director:** ARO founder/director
- **Specification branch / PR:** `spec/aro-i0-isolated-infrastructure` / #25, merged at `3e66b60`
- **Current governance-gate branch:** `spec/aro-ux0-opportunity-prototype`
- **Current governance-gate PR:** pending
- **Depends on:** SEC0 VERIFIED; R1 SHIPPED; M0 VERIFIED
- **Blocks:** Q0 hosted verification; P1 authenticated/RLS baseline and runtime implementation
- **Governing docs:** `AGENTS.md`, `ARO_MASTER_DELIVERY_PLAN.md`, `ARO_INFRASTRUCTURE.md`, `ARO_ARCHITECTURE.md`, `ARO_DATA_MODEL.md`, `ARO_TRUST_SAFETY.md`, ADR-025 through ADR-027
- **Required reviewers:** infrastructure/operations, security/privacy, founder for any cost or provider mutation
- **Last updated:** 2026-09-03

The founder's approved master objective authorizes reversible, $0, spec-driven preparation. It does not authorize a purchase, plan upgrade, domain transfer, production migration, project pause/delete/transfer, or repurposing of Tonguee or `aro-platform`.

## 1. Problem

ARO.club has its own GitHub repository, Vercel project and founder-approved isolated Supabase staging target. On 2026-09-03 `ARO.club Staging` (`mibydnerayobemhnlfyl`) became `ACTIVE_HEALTHY` in `ca-central-1` at a confirmed $0/month. Pointing the application at Tonguee would still expose production data and is prohibited. `aro-platform` remains quarantined and `INACTIVE` because its Auth accounts and external ownership/dependencies are unresolved.

The repository also inherits deployment documents and SQL snapshots from Tonguee. They are valuable migration evidence but are not an ordered, reproducible ARO migration history.

## 2. User outcome

Developers and agents can build and verify ARO without touching Tonguee production. Preview and Production deployments fail closed unless explicitly configured for the correct ARO environment. Before public release, users authenticate against a dedicated ARO backend with tested migrations, RLS, callback URLs, backups and recovery procedures.

## 3. Why now

P1 stores private goals and capabilities. Its migration, hostile RLS tests and authenticated browser evidence cannot run safely against Tonguee or quarantined `aro-platform`. I0 must establish the environment boundary before Q0/P1 can claim complete verification.

## 4. Goals

- Establish a reproducible disposable Supabase development/test environment at
  $0 through the isolated GitHub-hosted CI lane; a local container runtime is
  optional developer convenience, not an I0 release gate.
- Establish one founder-approved hosted ARO Supabase environment before hosted authenticated testing.
- Keep Vercel Preview and Production variables explicitly scoped and fail closed when missing or mismatched.
- Define GitHub, migration, seed/test-account, backup, recovery, Auth callback and secret-handling contracts.
- Preserve Tonguee as the production vertical/recovery source and keep `aro-platform` quarantined.
- Remove literal provider keys from active documentation even when the key category is browser-publishable.
- Record provider identifiers and evidence without recording secret values or personal data.

## 5. Explicit non-goals

- P1 schema, RLS, UI or product behavior.
- Migrating Tonguee users or customer data.
- Reusing, pausing, deleting, transferring or repurposing `aro-platform`.
- Altering Tonguee schema, Auth, functions, policies, domains or Vercel variables.
- Google OAuth, Stripe, payments, AI, precise location, AR, Seasons or new verticals.
- Next.js migration or any application dependency change.
- A custom Supabase domain, PITR, branching or add-on without a separate cost approval.

Anything in the master vision not named in Goals remains out of scope.

## 6. Locked decisions and invariants

1. ARO.club never silently falls back to Tonguee or `aro-platform`.
2. The canonical hosted ARO project ref must be explicitly recorded before any Vercel variable is set.
3. Tonguee project `ybhecubqnhukgpvchjay` is read-only evidence under this package.
4. `aro-platform` project `jjgccfrwjkwknyjtbtxa` remains **QUARANTINED — KEEP**.
5. A missing or invalid public Supabase configuration produces an honest unavailable state; it never uses hard-coded defaults.
6. Browser publishable/legacy anon keys may be present in client bundles, but values are stored in provider/local environment configuration and never in Git documentation.
7. Secret/service-role keys, database passwords and provider tokens are server-only and never use a `VITE_` prefix.
8. Migrations are append-only and ordered. Existing Tonguee SQL files remain evidence; they are not edited into a false migration history.
9. Test accounts use synthetic addresses and contain no founder/customer data.
10. No paid resource or plan is created without the provider's current quoted cost being shown to and approved by the founder.
11. Production database changes require a separate release gate after Preview/staging verification and recovery evidence.

## 7. Personas and permissions

| Persona / role | Can read | Can create | Can update | Can delete | Special restrictions |
|---|---|---|---|---|---|
| Ordinary ARO user | own authorized application data | own authorized data | own authorized data | own authorized data | RLS is authoritative; no provider administration |
| Other ordinary user | public/explicitly shared data only | own authorized data | own authorized data | own authorized data | cannot inspect environment or another user's private records |
| Developer/agent | repository config/evidence; synthetic local/staging data | migrations and synthetic fixtures in approved targets | approved package resources | disposable local/preview resources only when authorized | no production or quarantined-project mutation |
| Founder/provider owner | provider configuration and billing | approved hosted resources | domain/env/team settings | only after named destructive approval | verifies costs and ownership before mutation |
| Service role | server-only package-authorized operations | package-authorized | package-authorized | package-authorized | never reaches browser; least privilege and audit required |

## 8. Environment journeys

### Journey A — Disposable reset and RLS verification

1. The protected GitHub-hosted Linux workflow starts its pinned Supabase CLI
   and loopback-only disposable container stack.
2. Ordered migrations apply to a clean database through `supabase db reset`.
3. Synthetic owner, other-user and admin fixtures are created through the
   documented test harness.
4. Unit, migration, hostile RLS and authenticated browser tests run.
5. A second reset/replay proves the same schema and boundaries.
6. Ownership-labelled cleanup removes only the disposable CI resources.
7. Developers may run the same stack locally when a compatible container
   runtime is available, but local installation is not required for I0.

### Journey B — Pull-request Preview

1. A feature branch deploys to the independent Vercel `aro-club` project.
2. Preview is fail-closed unless Preview-scoped variables reference the approved isolated hosted target.
3. A paid Supabase Preview branch may be used only after founder cost approval; otherwise local/CI database testing remains authoritative and the hosted preview uses synthetic staging data only.
4. Preview never receives Tonguee production variables or customer data.

### Journey C — Production cutover

1. The package-specific migration passes locally and in the isolated hosted pre-production target.
2. Backup/export and forward-recovery evidence is recorded.
3. Production-scoped Vercel variables are compared by project ref and key category without exposing values.
4. Supabase Site URL and redirect allow-list contain only approved ARO production/preview URLs.
5. A founder approves the production provider/cutover action.
6. Production deploys, smoke tests run and an observation window begins.

### Journey D — Provider unavailable or misconfigured

1. The app detects missing/malformed configuration or an unavailable backend.
2. Public pages remain usable where safe.
3. Account-dependent actions display truthful unavailable/retry guidance.
4. No alternate project is selected automatically.
5. Operators use deployment/provider logs and the recovery runbook; data is not mutated speculatively.

## 9. Infrastructure state machine

```text
UNASSIGNED
  → RESET_READY
  → HOSTED_STAGING_READY
  → PRODUCTION_APPROVED
  → PRODUCTION_ACTIVE
  → OBSERVING
  → VERIFIED

Any hosted state → DEGRADED → RECOVERING → prior healthy state
```

`UNASSIGNED → RESET_READY` requires reproducible clean-reset evidence from the
protected isolated CI lane or an equivalent reviewed local run. `RESET_READY →
HOSTED_STAGING_READY` requires a named isolated project and verified scoped
variables/callbacks. No transition to `PRODUCTION_APPROVED` occurs without
founder approval and backup/recovery evidence.

## 10. Environment and data specification

| Environment | Backend | Data class | Vercel scope | Persistence | Current state |
|---|---|---|---|---|---|
| Local | optional local Supabase containers | synthetic only | none / `.env.local` ignored | disposable | OPTIONAL: compatible container runtime absent |
| CI | pinned loopback-only Supabase services on GitHub-hosted Linux | synthetic only | no hosted credentials | disposable | VERIFIED: I0.1/I0.2 clean reset, replay and cleanup |
| Preview | `mibydnerayobemhnlfyl` after scoped variable/callback approval | synthetic/test only | Preview | staging | TARGET ACTIVE / VARIABLE SCOPES VERIFIED / VALUE MATCH + AUTH BLOCKED |
| Production | dedicated approved ARO hosted project | real ARO data after release | Production | durable | target unassigned |
| Tonguee | `ybhecubqnhukgpvchjay` | preserved Tonguee data | Tonguee project only | durable | ACTIVE, read-only for I0 |
| Quarantine | `jjgccfrwjkwknyjtbtxa` | unknown legacy Auth/dependencies | none for ARO | preserve | INACTIVE, do not restore or use |

### Migration rules

- create new migration files using the current Supabase CLI command discovered through `--help`;
- never edit `supabase/schema.sql`, `trust-engine.sql`, `admin-panel.sql` or other inherited SQL snapshots to simulate a migration;
- establish a documented baseline migration/import strategy before P1 DDL;
- migration names are chronological and descriptive;
- a clean reset must match the expected schema;
- production rollback defaults to forward recovery; destructive rollback requires explicit approval;
- backfills are separate, idempotent and bounded;
- seeds contain synthetic data only and never run automatically in Production.

## 11. Authorization and provider matrix

| Operation | Developer/agent | Founder | CI | Browser user | Expected enforcement |
|---|---:|---:|---:|---:|---|
| Read provider identifiers/status | yes | yes | minimal | no | connector/dashboard permissions |
| Create local database | yes | yes | yes | no | local machine/CI boundary |
| Create hosted project/branch | no without cost approval | yes | no | no | Supabase organization role + cost confirmation |
| Set Preview variables | only after target approval | yes | approved workflow | no | Vercel team role/scopes |
| Set Production variables | no without release approval | yes | release workflow only | no | Vercel team role + release gate |
| Apply local migration | yes | yes | yes | no | CLI/local credentials |
| Apply hosted staging migration | package-authorized | yes | approved workflow | no | scoped database credentials |
| Apply production migration | no without release approval | explicit approval | release workflow only | no | protected environment/manual gate |
| View secret values | only when operationally required | yes | secret injection only | never | provider secret store |

## 12. Privacy

- Local, CI and Preview use synthetic identities and content.
- No production database dump is copied to local/Preview under I0.
- Evidence records counts, identifiers, settings and outcomes—not emails, tokens, key values or row contents.
- Auth URLs are allow-listed; wildcard previews are used only if their security implications are explicitly accepted.
- Logs and screenshots redact query parameters, tokens, emails and personal data.
- Provider audit events are retained according to provider capability and the later observability package.

## 13. Trust & safety

Infrastructure is a high-impact trust boundary. A wrong target can expose private data or bypass intended controls. All environments fail closed, Trust migrations remain intact, admin/service access is least-privilege, and test fixtures never masquerade as verified people or real demand.

Stop conditions include target-ref mismatch, unexpected real data, missing RLS on exposed tables, public service-role material, migration drift, unverified callback/domain ownership or inability to recover.

## 14. Money / entitlement implications

No product money or entitlement behavior is introduced.

Provider cost options, refreshed 2026-09-03:

- The Free organization quoted a new project at **$0/month** immediately before
  the founder-approved creation of `ARO.club Staging` in `ca-central-1`.
  Quarantined `aro-platform` remained `INACTIVE` and untouched.
- Supabase Preview branching is a Pro capability; the connector quoted **$0.01344/hour** for a branch. Five hours of branch compute would be about **$0.0672**, excluding the required paid organization plan and other usage.
- No paid option is selected by this spec. Any later project/branch cost must be
  re-queried and approved immediately before creation.

## 15. AI specification

N/A. I0 introduces no AI provider, model, prompt, inference or automated consequential action.

## 16. Configuration contract

| Variable/category | Environment | Exposure | Required behavior |
|---|---|---|---|
| `VITE_SUPABASE_URL` | local/Preview/Production | browser | exact approved project URL; missing/malformed fails closed |
| `VITE_SUPABASE_ANON_KEY` or future publishable-key name | local/Preview/Production | browser | active publishable/legacy anon category for the same project ref |
| service-role/secret key | server-only future function environment | secret | never committed, logged or prefixed `VITE_` |
| database password/connection string | migration/CI secret store | secret | least-privilege, never browser-visible |

The URL and public key must resolve to the same approved project. Key values are never written to evidence.

## 17. Operational UX

No new product UI is required. Existing account-unavailable behavior remains the approved fail-closed state until a backend is configured. Operator documentation must make the active environment and target ref obvious without exposing secrets.

## 18. Responsive requirements

N/A for configuration. Any fail-closed product state touched by implementation must retain the R1 evidence requirements at 360px and 1440px in light/dark modes.

## 19. Accessibility

Any configuration-error surface must retain semantic headings/landmarks, keyboard access, visible focus, WCAG AA contrast, reduced-motion behavior and understandable recovery copy. No account action may appear enabled when the backend is unavailable.

## 20. Performance budget

- Local clean reset target: recorded baseline before enforcement; deterministic success is mandatory.
- Provider-target validation adds no runtime network request beyond the existing Supabase initialization path.
- I0 adds zero production JavaScript unless a later reviewed configuration guard requires it.
- Hosted health/auth smoke latency is recorded, not optimized by weakening checks.
- No always-on paid branch is created merely for speed.

## 21. Reliability and failure analysis

| Failure | User impact | Detection | Recovery | Data consistency |
|---|---|---|---|---|
| wrong project ref | privacy/production boundary breach | prebuild/ref audit and runtime smoke | stop release; restore scoped variables | no writes allowed before validation |
| missing variable | account actions unavailable | build/runtime configuration guard | configure correct scope and redeploy | fail closed |
| migration failure | feature unavailable or partial schema | migration exit/advisors/smoke | forward-fix from backup-tested state | transactional DDL where possible |
| stale Preview data | misleading tests | seed version/fresh reset | reset synthetic target | Preview contains no real data |
| provider outage | sign-in/data unavailable | provider/Vercel logs and health checks | honest degraded state; retry after recovery | no speculative writes |
| callback mismatch | Auth loop/failure | Auth E2E and provider logs | correct allow-list; retry sign-in | no data mutation required |
| leaked secret | account compromise | secret scanning/provider audit | incident assessment and rotation | revoke/reissue before release |
| local container runtime absent | local convenience unavailable | prerequisite check | use the protected isolated CI reset lane | no data affected; not an I0 blocker |

## 22. Analytics / measurement

No user analytics are added. Operational evidence records deployment status, migration/test outcomes, response status/latency and error counts without personal data.

## 23. Test matrix

### Repository/configuration

- [ ] secret/key-pattern scan passes with no literal provider values in active docs/source;
- [ ] `.env*` ignore rules preserve `.env.example` only;
- [ ] ARO.club has no hard-coded Tonguee/`aro-platform` fallback;
- [x] GitHub default branch and required checks/branch protection are recorded.

### Disposable reset data

- [x] protected GitHub-hosted Linux container runtime available;
- [x] pinned Supabase CLI version recorded and workflow reviewed;
- [x] clean start/reset applies ordered migrations twice;
- [x] synthetic Auth fixtures work;
- [ ] owner/other/anon/admin/service hostile tests run;
- [ ] stop/reset is reproducible.

### Hosted/provider

- [ ] isolated project ref is recorded;
- [ ] project status/region/ownership and cost are recorded;
- [ ] Supabase advisors reviewed;
- [ ] Site URL and redirect allow-list verified;
- [ ] Preview and Production env names/categories/scopes verified without exposing values; Preview names/scopes pass, literal value/category matching and Production remain open;
- [ ] Preview cannot reach Tonguee or `aro-platform`;
- [ ] backup/export and recovery drill passes before Production.

### Deployment/E2E

- [ ] fail-closed deployment works with no backend variables;
- [ ] authenticated local/staging sign-up/sign-in/recovery works;
- [ ] protected-route mobile/desktop light/dark captures exist;
- [ ] production smoke passes only after founder release approval.

## 24. Acceptance criteria and evidence

| ID | Requirement | Verification | Evidence location | Status |
|---|---|---|---|---|
| I0-001 | ARO.club GitHub/Vercel are separated from Tonguee | live connector project/link/deployment audit | `artifacts/ARO-I0/BASELINE.md` | PASS |
| I0-002 | Tonguee and `aro-platform` remain untouched and correctly classified | live Supabase read-only project audit | `artifacts/ARO-I0/BASELINE.md` | PASS |
| I0-003 | literal provider key values are absent from active documentation/source | repository pattern scan | `artifacts/ARO-I0/VERIFICATION.md` | PASS |
| I0-004 | disposable isolated stack is reproducible | protected CI clean reset/replay/cleanup | `artifacts/ARO-I0.1/VERIFICATION.md`, PR #31 platform check | PASS |
| I0-005 | hosted isolated ARO project exists | connector project inspection | `artifacts/ARO-I0/VERIFICATION.md` | PASS — `mibydnerayobemhnlfyl`, $0/month, `ca-central-1` |
| I0-006 | Preview/Production variable scopes match the approved target | provider dashboard/connector audit | `artifacts/ARO-I0/VERIFICATION.md` | PARTIAL — Preview names/scopes and READY render pass; literal value matching and Production remain blocked |
| I0-007 | Auth URLs/callbacks are allow-listed correctly | provider configuration + E2E | future verification | BLOCKED |
| I0-008 | backup/export and forward recovery are tested | restore drill | future verification | BLOCKED |
| I0-009 | GitHub required checks and branch protection are active | GitHub API | `artifacts/ARO-I0/VERIFICATION.md` | PASS — 2026-09-02 |
| I0-010 | no provider cost or destructive change occurs without approval | audit trail | package PR + provider logs | PASS TO DATE |
| I0-011 | custom-domain ownership/routing is unambiguous | Vercel project-domain audit + DNS/content smoke | `artifacts/ARO-I0/BASELINE.md` | FAIL / FOUNDER ACTION |

## 25. Rollout

1. Merge the spec/evidence/hygiene package after documentation and security review.
2. Verify the protected disposable CI reset/replay/cleanup lane.
3. Re-query provider cost and obtain founder approval for exactly one hosted path.
4. Create/identify the isolated hosted project; record its ref before configuring Vercel.
5. Configure Preview first, run migrations/advisors/Auth/RLS/E2E, then record recovery evidence.
6. Keep Production fail-closed until the package release gate.
7. Configure Production, smoke test and observe only after founder approval.

## 26. Rollback / forward recovery

- Documentation/configuration PR: revert through a normal PR; never rewrite history.
- Local environment: stop and reset disposable containers/volumes after verifying the resolved project path.
- Preview variables: restore the prior fail-closed state and redeploy.
- Hosted migration: prefer transactional migration and forward-fix; restore into an isolated target before any destructive recovery.
- Production: roll back the Vercel artifact only when schema compatibility is proven; otherwise deploy a compatible forward fix.
- Domain: preserve the current owner/site until ownership and intended transfer are verified; never detach speculatively.

## 27. Security / privacy / Trust review

- **Reviewer:** Codex using the Supabase security workflow; independent/founder review still required for provider mutation
- **Date:** 2026-09-03 refresh of the 2026-08-28 review
- **Findings:** the original baseline lacked an isolated target, branch protection
  and reproducible reset evidence; Preview literal value matching, Auth/recovery
  and domain ownership remain unverified
- **Resolution:** literal key removal, branch protection, hosted staging and the
  protected CI reset/replay/cleanup lane are complete; the founder approved CI
  equivalence so local Docker is optional; Preview names/scopes now pass, while
  value matching, Auth/recovery/domain remain
- **Approved:** CI-reset equivalence and $0 hosted staging yes; production mutation no

## 28. Product / design review

- **Reviewer:** not required for infrastructure-only documentation
- **Date:** 2026-08-28
- **Findings:** existing fail-closed account UI remains truthful
- **Resolution:** no product UI change
- **Approved:** yes for documentation scope

## 29. Definition of Done

I0 is VERIFIED only when:

- [x] spec is versioned and governance/status documents point to it;
- [x] protected disposable CI runtime and reproducible reset/replay/cleanup pass;
- [x] isolated hosted project is approved, active and recorded;
- [ ] Preview/Production scopes and Auth callbacks pass; Preview names/scopes are verified but value matching and Production remain open;
- [ ] migrations, advisors, hostile RLS and authenticated E2E pass in the isolated target;
- [ ] backup/export and recovery drill pass;
- [x] GitHub required checks/branch protection are active;
- [ ] domain ownership/routing is resolved;
- [ ] no unresolved critical/high security finding remains;
- [ ] all acceptance criteria have evidence;
- [ ] status registry, implementation ledger, current state, infrastructure registry and changelog match provider truth.

## 30. Delivery record

```text
Package: ARO-I0
Spec version: 1.1.1
Branch: spec/aro-ux0-opportunity-prototype
PR: pending
Base: 58bf3da
Acceptance: 7 pass-to-date / 1 partial / 2 blocked / 1 fail
Unit: 61/61 passed
Build: passed; inherited large-chunk warning unchanged
Lint: zero errors / warnings
Integration: disposable CI and hosted SQL matrices pass; Preview scopes/render pass; value matching/Auth recovery blocked
E2E: disposable authenticated evidence and public Preview render pass; hosted Auth/callback evidence blocked
RLS/security: disposable and hosted 21+60 SQL matrices pass; advisors clean
A11y: inherited R1/P1 fail-closed evidence
Performance: no runtime delta
Screenshots/evidence: artifacts/ARO-I0/BASELINE.md; artifacts/ARO-I0/VERIFICATION.md
Reviewers: founder approved CI-reset equivalence; independent I0.2 review remains open
Known follow-ups: Preview value matching, Auth callbacks, recovery, domain ownership
Release environment: none
Status: IN-PROGRESS / GATES BLOCKED
```
