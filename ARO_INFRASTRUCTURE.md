# ARO — Infrastructure, Environment, and Operations Registry

> **Canonical operational map.** Agents must read this before changing Git branches, deployment configuration, Supabase projects, authentication providers, environment variables, migrations or production state.
>
> **Last verified:** 2026-08-26
>
> This document records identifiers and decisions only. Never add secret values, tokens, service-role keys, passwords, recovery codes or private user data.

---

## 1. Executive truth

- ARO is being evolved inside the existing GitHub repository leonartist7/Tonguee.
- Tonguee remains ARO's first language vertical and the current production foundation.
- The governed ARO integration branch is feat/aro-p0-director-reset.
- GitHub main remains the Tonguee production/default branch.
- The current Vercel deployment is connected to the Tonguee GitHub repository.
- The Supabase project named Tonguee, ref ybhecubqnhukgpvchjay, is the canonical ARO migration backend.
- The separate Supabase project named aro-platform, ref jjgccfrwjkwknyjtbtxa, is not the ARO migration backend and must not be deleted or repurposed until its five auth accounts and any external dependencies are identified.
- Stripe is not configured.
- Google authentication is not configured by the founder, even though a Google sign-in UI affordance exists in source.
- ARO-SEC0 is VERIFIED.
- ARO-P1 is SPEC-READY; runtime implementation has not begun.

---

## 2. GitHub registry

| Item | Current value | Rule |
|---|---|---|
| Repository | leonartist7/Tonguee | Single source repository for current ARO evolution |
| Production/default branch | main at ce29119386df32e8571403c2cf0189680d92a8a8 | Do not merge ARO work here without a separate founder release gate |
| Governed ARO branch | feat/aro-p0-director-reset at 6faf0bee272caefe040534720669cbe8151d1bbc after the infrastructure-registry merge | Base/integration branch for approved ARO packages |
| P0 Director Pack commit | fc9d3c0 | Historical P0 installation commit |
| SEC0 merge commit | c2c8e388e3dd33d94c04df4e67ff965d5bb829a6 | Removed tracked .env from active ARO tree and completed security documentation |
| SEC0 PR | #18 | Merged into governed ARO branch |
| P1 spec merge commit | ee0c5066adde24faf0eb8f9bb92753641c8b6770 | Added P1 spec/baseline docs and moved P1 to SPEC-READY |
| P1 spec PR | #19 | Merged into governed ARO branch |
| Current documentation package | docs/aro-infrastructure-registry | This registry only; no runtime changes |

### Branch discipline

- One package equals one branch and one PR.
- Product/runtime packages branch from the current governed ARO branch, not stale main.
- Documentation governance packages also target the governed ARO branch.
- main remains untouched until a deliberate release/migration package is reviewed.
- No force push, history rewrite or destructive branch cleanup is authorized by this registry.
- Old PR #9 is superseded by SEC0 PR #18 and remains historical evidence.
- Post-registry comparison reports main and the governed ARO branch as diverged: ARO is three commits ahead and one commit behind.
- The main-only commit ce291193 is an empty documentation-promotion commit: comparing it with parent 931f2614 reports no changed files. This is ancestry divergence, not a missing source/content change.
- The P1 execution baseline must record and, if needed for clean ancestry, reconcile this no-content main commit without overwriting newer ARO governance.

---

## 3. Vercel registry

### Known state

- The founder reports that the active Vercel deployment contains the latest Tonguee GitHub work.
- GitHub deployment checks on ARO documentation PRs report through the Vercel project path lionovart/langgie.
- Vercel preview checks passed for SEC0 and P1 documentation changes.
- No Vercel configuration was mutated during P0, SEC0 or P1 specification work.

### Required deployment posture

- Production should continue to deploy from main until a separate ARO release gate changes that decision.
- ARO package branches and PRs should use Preview deployments.
- The governed ARO branch must not silently become Production.
- Environment variables remain managed in Vercel, not committed to Git.
- Preview and Production variable scopes must be reviewed separately.
- Any future server-only secret must use a non-VITE name and must never be exposed to client bundles.

### Manual verification required in Vercel

The founder must confirm in the Vercel project settings:

1. Git repository is leonartist7/Tonguee.
2. Production branch is main.
3. VITE_SUPABASE_URL points to the canonical Tonguee Supabase project, ref ybhecubqnhukgpvchjay.
4. VITE_SUPABASE_ANON_KEY is an active publishable/anonymous client key from that same Tonguee project.
5. Both variables exist in the intended Production and Preview scopes.
6. No service-role, database password, Stripe secret or Google client secret is stored under a VITE-prefixed variable.
7. Deployment protection and domain assignments match the founder's intended public/staging behavior.

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

### Canonical project: Tonguee

| Field | Value |
|---|---|
| Name | Tonguee |
| Project ref | ybhecubqnhukgpvchjay |
| Role | Canonical backend for Tonguee and the staged ARO migration |
| Current action | Preserve; use for read-only baseline and approved append-only migrations |
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
- The P1 execution baseline must verify which repository Trust controls are applied in the live project.
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
| ARO-P1 spec | SPEC-READY | specs/ARO-P1-CAPABILITY-GOAL.md, specs/ARO-P1-BASELINE.md, PR #19, merge ee0c506 | capture execution baseline |
| ARO-P1 runtime | Not IN-PROGRESS | no runtime branch/migration/UI work | baseline must pass first |
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

### NOW — required before P1 production work

- [ ] In Vercel, confirm the repository is leonartist7/Tonguee and Production Branch is main.
- [ ] In Vercel, confirm both VITE variables belong to Supabase project ybhecubqnhukgpvchjay in the intended Production and Preview scopes.
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

**ARO-P1-BASELINE — Pre-code execution baseline**

An agent must:

1. read the required governance chain and P1 spec;
2. obtain authenticated repository access to the exact governed ARO head;
3. record branch SHA, clean diff and the known no-content main/ARO ancestry divergence;
4. run npm test, npm run lint and npm run build;
5. run available auth/onboarding/profile/teacher/Passport E2E checks;
6. capture 360px and 1440px light/dark baseline screenshots;
7. record accessibility and performance baselines;
8. snapshot Tonguee Supabase grants, policies, constraints, advisors and applied Trust controls;
9. confirm a safe migration/test environment;
10. update specs/ARO-P1-BASELINE.md with evidence and blockers;
11. open a documentation/evidence PR to the governed ARO branch.

Only after that baseline is verified may an agent create the P1 runtime implementation branch.

### Subsequent package

**ARO-P1-IMPLEMENTATION — Capability and Goal Foundation**

Follow specs/ARO-P1-CAPABILITY-GOAL.md exactly. One implementation branch, one PR, append-only migration, strict owner RLS, full regression/evidence. Do not touch main or production without the separate release gate.

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
- do not merge ARO into main;
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
