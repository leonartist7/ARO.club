# ARO — Infrastructure, Environment, and Operations Registry

> **2026-08-31 execution handoff:** I0.1 is **SHIPPED** through PR #27 at
> `467a11d`; main Isolated database and Quality CI passed. Next is
> [I0.2 application baseline proposal](specs/ARO-I0.2-APPLICATION-BASELINE.md),
> version 0.1.0, **SPEC-REQUIRED / DIRECTOR DECISION REQUIRED**.
> [Application audit](artifacts/ARO-I0.2/APPLICATION_BASELINE_AUDIT.md) records
> profile privacy, field authority, approval and booking conflicts.
> No repair is implemented. Isolated-only direction and reviewed exact contracts
> are required before runtime work; full I0/Q0/P1 gates remain in force.

> **Canonical operational map.** Agents must read this before changing Git branches, deployment configuration, Supabase projects, authentication providers, environment variables, migrations or production state.
>
> **Last verified:** GitHub 2026-08-31; hosted-provider snapshot 2026-08-28
>
> This document records identifiers and decisions only. Never add secret values, tokens, service-role keys, passwords, recovery codes or private user data.

---

## 1. Executive truth

- ARO now has an independent GitHub repository: `leonartist7/ARO.club`.
- Tonguee remains ARO's first language vertical; `leonartist7/Tonguee`, its `main` branch, deployment and Supabase project remain the untouched production foundation and recovery path.
- The governed ARO history through `9394cb7` is present in ARO.club. M0, I0 spec and Q0 implementation merged through PRs #24–26; the active package branch is `spec/aro-i0-application-baseline`.
- ARO.club `main` is `467a11df122651df561adde2b3e03a35c6b25aaf` (live GitHub verification 2026-08-31). I0.1 production verification is recorded in [PR #27's release comment](https://github.com/leonartist7/ARO.club/pull/27#issuecomment-5470297817); this documentation pass does not claim a fresh Vercel audit.
- ARO.club now has an independent Vercel project named `aro-club`. Its Supabase runtime target remains unassigned; it must not silently use Tonguee production credentials.
- Supabase project Tonguee, ref `ybhecubqnhukgpvchjay`, is preserved for the original Tonguee product. Reuse or migration into a new ARO environment requires a new explicit provider/cutover decision.
- The separate Supabase project named aro-platform, ref jjgccfrwjkwknyjtbtxa, is not the ARO migration backend and must not be deleted or repurposed until its five auth accounts and any external dependencies are identified.
- Stripe is not configured.
- Google authentication is not configured by the founder, even though a Google sign-in UI affordance exists in source.
- ARO-SEC0 is VERIFIED.
- ARO-R1 is SHIPPED. M0 is VERIFIED as governance.
- I0 spec 1.0.0 and live provider evidence are recorded under `specs/ARO-I0-ISOLATED-INFRASTRUCTURE.md` and `artifacts/ARO-I0/BASELINE.md`; implementation is blocked by hosted capacity and the absence of a local container runtime.
- ARO-P1 remains SPEC-READY; its execution baseline is recorded, but runtime implementation has not begun because the application database baseline is not verified.

---

## 2. GitHub registry

| Item | Current value | Rule |
|---|---|---|
| ARO runtime repository | `leonartist7/ARO.club` | Independent ARO product repository |
| ARO.club base | `main` at `467a11df122651df561adde2b3e03a35c6b25aaf` | Default branch; protection unresolved at last audit |
| Active governed package branch | `spec/aro-i0-application-baseline` | I0.2 audit/proposal only; no product migration or hosted mutation |
| Governed source history | `leonartist7/Tonguee`, `feat/aro-p0-director-reset`, through `9394cb7` | Historical governance source; preserve, do not develop new ARO runtime there |
| Original production repository | `leonartist7/Tonguee`, branch `main` | Untouched Tonguee production and recovery path |
| P0 Director Pack commit | fc9d3c0 | Historical P0 installation commit |
| SEC0 merge commit | c2c8e388e3dd33d94c04df4e67ff965d5bb829a6 | Removed tracked .env from active ARO tree and completed security documentation |
| SEC0 PR | #18 | Merged into governed ARO branch |
| P1 spec merge commit | ee0c5066adde24faf0eb8f9bb92753641c8b6770 | Added P1 spec/baseline docs and moved P1 to SPEC-READY |
| P1 spec PR | #19 | Merged into governed ARO branch |
| Current package | `ARO-I0.2`, branch `spec/aro-i0-application-baseline` | Audit/proposal only; director decision and reviewed exact contracts required |

### Branch discipline

- One package equals one branch and one PR.
- New product/runtime packages branch from the latest verified ARO.club package head.
- Governance and runtime delivery now target `leonartist7/ARO.club`; the Tonguee repository remains a preserved source/production boundary.
- ARO.club packages reach `main` only through reviewed PRs and required checks; Tonguee `main` remains untouched by ARO packages.
- No force push, history rewrite or destructive branch cleanup is authorized by this registry.
- Old PR #9 is superseded by SEC0 PR #18 and remains historical evidence.
- The ARO.club R1 branch merged the governed Tonguee ARO history into the copied `ce291193` base without rewriting either repository's history.
- `9394cb7` is an ancestor of the R1 branch; this is the minimum governance ancestry gate for the separated repository.

---

## 3. Vercel registry

### Known state

- The existing Vercel deployment remains associated with the original Tonguee repository and production path.
- GitHub initially recorded ARO.club Preview deployments in inherited project path `lionovart/langgie`, including deployment `6113868573`.
- The founder separated the repositories and created Vercel project `aro-club`.
- GitHub deployment `6114077718` successfully deployed safe ARO.club `main` commit `ce291193` as the new project's Production baseline at `https://aro-club-mffksnmw5-lionovart.vercel.app`.
- R1 PR #22 merged as `494817f`; production deployment `dpl_DKCbYy8LvJAWP3tAzCA43oGGJUA2` reached `READY` on 2026-08-27.
- M0 PR #24 merged as `67d5c8d`; production deployment `dpl_Gk92V3NpoRFwCTCKJyGRyGvn9M5S` reached `READY` on 2026-08-27.
- Live connector evidence confirms Vercel project `aro-club` (`prj_lFGjUkwTZHQAse6sxPXTQLK3qMeY`) links to `leonartist7/ARO.club`; project `langgie` (`prj_TZl9H4B2BiFX6sB9g00D64QVur4B`) links to `leonartist7/Tonguee`.
- Account functionality remains intentionally unavailable until an isolated ARO.club backend is approved.
- `aro.club` is not listed on the connected `aro-club` project's domains. It currently returns a different Spanish-language product from Vercel. Do not detach or overwrite it until the founder identifies its account/project and intended disposition.

### Required deployment posture

- Tonguee production continues to deploy from its existing `main` configuration.
- ARO.club uses its independent Vercel project for Preview and Production deployments.
- Future branches must not inherit Tonguee environment variables.
- Environment variables remain managed in Vercel, not committed to Git.
- Preview and Production variable scopes must be reviewed separately.
- Any future server-only secret must use a non-VITE name and must never be exposed to client bundles.

### Manual verification required in Vercel

Before release, the founder must confirm in Vercel:

1. The existing Tonguee project still points to `leonartist7/Tonguee` and its intended production branch.
2. Confirm `leonartist7/ARO.club` remains linked only to Vercel project `aro-club` and Tonguee remains linked to its intended project.
3. Audit ARO.club Preview/Production environment scopes before promotion; rotate only if a non-browser secret or unintended privileged credential is discovered.
4. The selected ARO.club backend project and client variables match the separately approved migration/environment decision.
5. No service-role, database password, Stripe secret or Google client secret is stored under a VITE-prefixed variable.
6. Deployment protection and domain assignments match the founder's intended public/staging behavior.
7. Identify the existing `aro.club` site/account and decide whether/when the domain should move to this ARO project.

Do not paste values into issues, PRs, chat, screenshots or this repository. Compare project identifiers and key category inside provider dashboards.

---

## 4. Environment-variable registry

### Current application variables

| Variable | Classification | Client exposure | Current decision |
|---|---|---:|---|
| VITE_SUPABASE_URL | Supabase public project URL | yes | Keep in Vercel/local environment; do not commit |
| VITE_SUPABASE_ANON_KEY | Supabase browser client anon/publishable key | yes | Keep in Vercel/local environment; rely on correct RLS |
| Stripe variables | Not configured | N/A | Out of scope until an approved money package |
| Google OAuth variables | Not configured by founder | N/A | Out of scope until a dedicated auth package |

### SEC0 decision

- The historical tracked .env contained only the two browser-facing Supabase categories named above.
- The active ARO tree removes .env and ignores .env variants while preserving .env.example.
- No credential rotation is required solely because these browser-facing categories appeared in Git.
- The founder accepted the documented historical exposure and chose no Git-history rewrite.
- This decision does not make the database safe by itself. RLS, grants, storage policy and API exposure remain mandatory security boundaries.
- A service-role key, database password, payment secret or OAuth secret discovered later would trigger a new incident assessment and likely rotation.

---

## 5. Supabase project registry

### Preserved production project: Tonguee

| Field | Value |
|---|---|
| Name | Tonguee |
| Project ref | ybhecubqnhukgpvchjay |
| Role | Original Tonguee production backend and migration evidence source |
| Current action | Preserve; read-only audit is allowed, but do not connect the separated ARO.club app without an explicit migration/environment package |
| Destructive action | Not authorized |

Read-only inspection observed eight public tables with RLS enabled:

- profiles
- teachers
- experiences
- bookings
- reviews
- user_badges
- notifications
- contact_messages

Important baseline facts:

- profiles is publicly readable and is not safe for private P1 goal/capability fields.
- Repository SQL defines the Trust Engine, teacher applications/documents, admin audit behavior and verified-publish enforcement.
- A read-only 2026-08-30 catalog audit confirmed the repository Trust tables, profiles.role and verified-publish trigger are absent from this live source. Only the timestamp trigger exists on experiences, and its RLS checks publication status/teacher ownership, not verification. See `artifacts/ARO-I0.1/MIGRATION_SOURCE_AUDIT.md`; do not copy this schema as a verified Trust baseline or mutate Tonguee under I0.1.
- The connector reported no recorded migrations even though live schema exists. Future work must reconcile migration provenance and use append-only migrations.
- Existing policies/grants include legacy broad patterns. New P1 tables must use explicit authenticated owner-only RLS and least privilege.
- No P1 schema or RLS changes have been applied.

### Quarantined project: aro-platform

| Field | Value |
|---|---|
| Name | aro-platform |
| Project ref | jjgccfrwjkwknyjtbtxa |
| Role | Unrelated/uncertain legacy project; not the ARO migration backend |
| Current action | Quarantine and investigate |
| Destructive action | Do not delete, reset, merge into Tonguee or repurpose |

Read-only inspection found:

- 37 public tables oriented around hospitality/restaurant operations such as venues, menus, orders, reservations, loyalty and payments;
- five auth users;
- zero storage objects;
- zero estimated live rows across public tables at the inspection snapshot;
- no auth events in the inspected 24-hour auth-log window;
- observed API/storage/realtime activity appeared to be provider-management health/inspection traffic;
- no deployed Edge Functions were found in the earlier project comparison.

These signals suggest the project may be unused or experimental, but the five auth accounts mean deletion or pausing is not yet justified. The age and ownership of those accounts were not confirmed.

### Safe decision sequence for aro-platform

1. Identify the creator/owner and intended product.
2. Inspect the five auth accounts in the Supabase dashboard without copying personal data into Git.
3. Confirm whether any Vercel project, local .env, domain, webhook, mobile app or external integration references jjgccfrwjkwknyjtbtxa.
4. Export schema/config if the project has archival value.
5. If no dependency exists, pause it first.
6. Observe for at least seven days or the provider's appropriate monitoring period.
7. Delete only after the founder explicitly authorizes deletion and recovery/export needs are satisfied.

Until these steps pass, status is **QUARANTINED — KEEP**.

---

## 6. Authentication/provider registry

### Supabase Auth

- Existing email/password/session behavior is part of the Tonguee foundation.
- AuthContext loads and updates the existing profiles row.
- P1 private records will use the current authenticated user and database RLS.
- P1 must not add admin access to private goal/capability records by default.
- Supabase Auth Site URL and redirect allow-list must match the current public Vercel domain and intended preview callback URLs.

### Google

- Founder has not configured Google OAuth.
- Source contains a Google sign-in UI path.
- This is a known product/config mismatch, not a P1 task.
- Do not create credentials or enable the provider without a dedicated auth package.
- Until configured, production UI should not promise working Google sign-in; remediation belongs in a separately scoped issue/package.

### Stripe

- Founder has not configured Stripe.
- No P1 work requires Stripe.
- Do not add placeholder payment secrets or client-side financial authority.
- Stripe begins only under an approved money/payment package governed by ARO_MONEY.md.

---

## 7. Program status registry

| Package | Status | Evidence | Exact next gate |
|---|---|---|---|
| P0/P0.1 Director Pack | VERIFIED | Director Pack, ARO_P0_AUDIT.md | none |
| ARO-SEC0 | VERIFIED | ARO_SEC0_REPORT.md, PR #18, merge c2c8e3 | keep secrets/config outside Git |
| ARO-R1 repository separation + rebrand | SHIPPED | `specs/ARO-R1-FULL-REBRAND.md`, `artifacts/ARO-R1/VERIFICATION.md`, merged PR #22 | monitor independent deployment; preserve provider boundary |
| ARO-M0 master delivery governance | VERIFIED | `ARO_MASTER_DELIVERY_PLAN.md`, PR #24, merge `67d5c8d` | keep status synchronized |
| ARO-I0 isolated infrastructure | SPEC-READY / IMPLEMENTATION BLOCKED | `specs/ARO-I0-ISOLATED-INFRASTRUCTURE.md`, `artifacts/ARO-I0/BASELINE.md` | local container runtime + founder-approved hosted capacity/domain decision |
| ARO-P1 spec | SPEC-READY / BASELINE BLOCKED | specs/ARO-P1-CAPABILITY-GOAL.md, specs/ARO-P1-BASELINE.md, artifacts/ARO-P1-BASELINE/VERIFICATION.md | provide isolated Supabase capacity and finish authenticated/RLS gate |
| ARO-P1 runtime | Not IN-PROGRESS | no runtime branch/migration/UI work | pass the safe-environment baseline first |
| ARO-P2–P6 | SPEC-REQUIRED | ARO_BUILD_PLAYBOOK.md | remain blocked by sequence |

P1's locked data direction:

- dedicated owner-private aro_profile_goals;
- dedicated owner-private aro_profile_capabilities;
- no private P1 data in public profiles;
- no automatic backfill from Zustand/local profile fields;
- no location, demand, matching, AI, money, Stripe, Google or new vertical;
- self-declared capability is not verified qualification;
- main/production remains unchanged until release approval.

---

## 8. Human-only TODOs

These actions require founder/provider-dashboard authority and cannot safely be completed by an implementation agent without explicit access and confirmation.

### NOW — required before ARO.club provider work

- [x] Confirm the existing Tonguee Vercel project still links to `leonartist7/Tonguee`; its intended Production Branch remains a dashboard check.
- [x] Separate `leonartist7/ARO.club` into Vercel project `aro-club` and establish a safe copied-main Production baseline.
- [x] Confirm Tonguee remains linked to Vercel project `langgie`; confirm its intended Production Branch manually.
- [ ] Audit ARO.club Preview/Production environment-variable scopes without pasting values into Git or chat.
- [ ] Provide safe ARO.club Supabase capacity. The approved $0/month `ARO.club Staging` creation was rejected at the account's two-active-free-project limit; no project or charge was created. Do not clear the limit by touching Tonguee or quarantined `aro-platform`.
- [ ] Install/enable a Docker-compatible container runtime if the founder chooses the $0 local Supabase development path.
- [ ] Identify which account/project currently serves the Spanish product at `aro.club` and decide whether the Human Opportunity Network should later receive that hostname.
- [ ] In Supabase Tonguee Auth URL Configuration, confirm the public Site URL and necessary callback/preview redirect URLs.
- [ ] In Supabase aro-platform, identify the five auth accounts and the project owner/purpose without copying personal data into Git.
- [ ] Search Vercel projects/local configs/external services for references to jjgccfrwjkwknyjtbtxa.
- [ ] Tell the director whether aro-platform is confirmed disposable, archival or owned by another product.

### LATER — only when relevant packages open

- [ ] Configure Google OAuth only if a dedicated auth package is approved.
- [ ] Configure Stripe only when the approved money/payment package begins.
- [ ] Approve any merge/release from the governed ARO branch into main.
- [ ] Explicitly authorize pause/delete of aro-platform only after the quarantine checklist passes.

---

## 9. Agent TODOs

### Exact next work package

**ARO-I0 — Isolated Infrastructure and Provider Boundary**

Completed implementation slice: **ARO-I0.1 Ephemeral Supabase CI**, spec 1.0.0, SHIPPED through PR #27 at `467a11d`. Target is only the disposable CI project `aro-i0-ci` under `tools/ci`; it is not a hosted project ref. See `artifacts/ARO-I0.1/VERIFICATION.md`. Real CI proves platform/Auth/SQL-probe/reset/cleanup; automated security/operations review findings are resolved. No application migration target is certified yet.

Current slice: **ARO-I0.2 application baseline audit/proposal**, version 0.1.0.
Read `specs/ARO-I0.2-APPLICATION-BASELINE.md` and obtain the isolated-only
director decision in section 6 before finalizing implementation contracts.

Follow `specs/ARO-I0-ISOLATED-INFRASTRUCTURE.md`. Complete the $0 local stack when a compatible container runtime is available, then obtain explicit founder approval before any hosted cost/provider/domain mutation. Record evidence in `artifacts/ARO-I0/VERIFICATION.md`.

Only after I0 provides a safe target may Q0/P1 run authenticated and hostile-RLS verification. P1 implementation still follows `specs/ARO-P1-CAPABILITY-GOAL.md` exactly.

---

## 10. Agent start checklist

Before any infrastructure or package work, an agent must answer:

- Which repository and branch am I changing?
- Which Supabase project ref am I targeting?
- Is this Preview/staging or Production?
- Does the requested work have a SPEC-READY package?
- Am I about to expose a VITE variable that is not intended for the browser?
- Am I changing public profiles or existing Trust policies?
- Am I introducing Google, Stripe, money, location, AI or a new vertical without authority?
- Have I preserved main and the current production deployment?
- Have I updated ARO_CURRENT_STATE.md, ARO_SPEC_INDEX.md, ARO_IMPLEMENTATION_STATUS.md and ARO_CHANGELOG.md when status changes?

If any answer is unclear, stop before mutation and resolve it through the director/founder.

---

## 11. Prohibited actions

Unless a later approved package explicitly authorizes them:

- do not delete or pause either Supabase project;
- do not merge or copy the aro-platform hospitality schema into Tonguee;
- do not point Vercel at aro-platform;
- do not move private P1 fields into profiles;
- do not commit .env or secret values;
- do not put service-role keys in VITE variables;
- do not rewrite Git history;
- do not enable Google or Stripe casually;
- do not apply experimental migrations to production;
- do not bypass the package PR/release gate when merging to ARO.club `main`;
- do not claim runtime work is complete because documentation is complete.

---

## 12. Change protocol

Update this registry whenever any of these changes:

- GitHub repository/default/integration/release branch;
- Vercel project, production branch, domains or environment scope;
- canonical Supabase project;
- Supabase project quarantine/disposition;
- auth or payment provider configuration;
- environment-variable categories;
- package status or release environment;
- destructive infrastructure decision.

Also update:

- ARO_CURRENT_STATE.md for current truth;
- ARO_SPEC_INDEX.md for authority/status;
- ARO_IMPLEMENTATION_STATUS.md for execution state;
- ARO_CHANGELOG.md for append-only history;
- DECISIONS.md for durable architecture/product decisions.

Never record secret values.
