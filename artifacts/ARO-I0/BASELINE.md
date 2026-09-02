# ARO-I0 Provider and Environment Baseline

> Date: 2026-08-28
>
> Branch: `spec/aro-i0-isolated-infrastructure`
>
> Base: `67d5c8d24bd6b6a11cff10d49407b321b1bf74cb`
>
> Method: live read-only GitHub, Vercel and Supabase connector/API inspection plus local repository/runtime checks

No provider, database, environment variable, domain, billing or user-data mutation was performed.

## 2026-09-02 live refresh

- Current GitHub `main` is `2712642`; requested baseline `5c3d55c` remains in its ancestry.
- `main` is protected: pull requests, resolved conversations and strict successful
  `static`, `browser-smoke` and `platform` checks are required; admins are
  included and force-pushes/deletion are disabled.
- Vercel project `aro-club` remains linked to `leonartist7/ARO.club`; production
  deployment `dpl_CvXygcqWmPHRTS5YP9XG8bvLaxhM` for `2712642` is READY. Its
  project domains still do not include `aro.club`.
- `aro.club` still returns the Spanish-language product title recorded below.
- Supabase reports Tonguee `ACTIVE_HEALTHY` and quarantined `aro-platform`
  `INACTIVE`. No ARO hosted project exists. A new project in `lionovart's Org`
  currently quotes $0/month; creation still needs the provider's explicit cost
  confirmation and an approved region.
- Docker, Podman, nerdctl and a local Supabase CLI remain unavailable on this host.

The provider-setting mutation in this refresh is limited to GitHub branch
protection. Tonguee, `aro-platform`, Supabase capacity, Vercel variables/domains,
billing and user data were not changed.

The sections below preserve the original 2026-08-28 snapshot. Where a current
field differs, the 2026-09-02 refresh above supersedes it.

## Executive result

I0 has enough evidence for a complete implementation specification, but cannot pass yet. ARO.club is correctly separated at GitHub and Vercel; its backend remains fail-closed. Hosted capacity is unavailable under the current Free allocation, and the local machine has no compatible container runtime. The public hostname `aro.club` is not attached to the connected `aro-club` Vercel project and currently serves a different Spanish-language product.

## GitHub evidence

| Check | Result |
|---|---|
| Repository | `leonartist7/ARO.club` |
| Default branch | `main` |
| Audited main commit | `67d5c8d24bd6b6a11cff10d49407b321b1bf74cb` |
| M0 plan | merged through PR #24 |
| Main protected | no |
| Workflow directory | `.github/` absent |
| Active package branch | `spec/aro-i0-isolated-infrastructure` |

Required-check and branch-protection implementation belongs to I0/Q0 and remains pending.

## Vercel evidence

Connected team: `lionovart`, Hobby plan, team ID `team_X1uT5IYWuEZNZ8o54SCyioEu`.

### ARO.club

| Field | Value |
|---|---|
| Project | `aro-club` |
| Project ID | `prj_lFGjUkwTZHQAse6sxPXTQLK3qMeY` |
| Git link | `leonartist7/ARO.club` |
| Framework | Vite |
| Node | 24.x |
| Latest audited deployment | `dpl_Gk92V3NpoRFwCTCKJyGRyGvn9M5S` |
| Commit | `67d5c8d24bd6b6a11cff10d49407b321b1bf74cb` |
| Target/state | Production / READY |
| Deployment URL | `aro-club-apafxxpvi-lionovart.vercel.app` |
| Project domains | `aro-club.vercel.app`, `aro-club-lionovart.vercel.app`, `aro-club-git-main-lionovart.vercel.app` |

### Tonguee

| Field | Value |
|---|---|
| Project | `langgie` |
| Project ID | `prj_TZl9H4B2BiFX6sB9g00D64QVur4B` |
| Git link | `leonartist7/Tonguee` |
| Framework | Vite |
| Node | 22.x |

The repository/project link separation is confirmed. The connector does not expose environment-variable names/scopes, so that audit remains a founder-dashboard gate. No variable values were requested or recorded.

## `aro.club` domain conflict

On 2026-08-28:

- `https://aro.club` returned HTTP 200 from Vercel;
- its HTML title was `Aro Club · Un club para conocer gente en tu ciudad`;
- DNS A records resolved to `216.150.16.65` and `216.150.1.65`;
- `aro.club` was absent from the domains of every project visible to the connected `lionovart` Vercel team;
- the connected ARO project therefore does not currently prove ownership/routing of `aro.club`.

Do not detach or overwrite the domain. The founder must identify the account/project and confirm whether the existing Spanish product is theirs and whether/when the hostname should move to ARO Human Opportunity Network.

## Supabase evidence

Organization `lionovart's Org` (`svemweqlxcebycqclhww`) is on the Free plan.

| Project | Ref | Region | Status | I0 rule |
|---|---|---|---|---|
| Tonguee | `ybhecubqnhukgpvchjay` | `eu-north-1` | ACTIVE_HEALTHY | preserve; read-only evidence |
| aro-platform | `jjgccfrwjkwknyjtbtxa` | `eu-north-1` | ACTIVE_HEALTHY | QUARANTINED — KEEP |

Other listed projects were INACTIVE and do not change the fact that the two active Free slots are occupied. `aro-platform` still has no Supabase branches listed. The connector reports Tonguee's default `main` branch only; no paid Preview branch was created.

Current provider quotes:

| Resource | Quote | Result |
|---|---:|---|
| New project in current organization | $0/month | cannot create while active Free limit is exhausted |
| Preview branch | $0.01344/hour | requires paid branching capability and founder approval |

Five hours of quoted branch compute is approximately $0.0672. This does not include the required paid organization plan or other usage. Nothing was confirmed or created.

Official current documentation confirms:

- Free users receive two active projects across organizations where they are Owner/Admin; paused projects do not count.
- Preview branching is a Pro feature.
- Preview branches are billed for their resource usage and are not covered by Spend Cap.
- local CLI-based development works on all plans.

References:

- https://supabase.com/docs/guides/platform/billing-on-supabase
- https://supabase.com/docs/guides/platform/billing-faq
- https://supabase.com/docs/guides/deployment
- https://supabase.com/docs/guides/platform/manage-your-usage/branching

## Local environment evidence

| Prerequisite | Result |
|---|---|
| Docker-compatible runtime | FAIL — `docker` command not installed/found |
| Supabase CLI | not locally available; `npx` fetch was sandbox-blocked during audit |
| `supabase/config.toml` | absent |
| Ordered migration directory | absent; inherited SQL snapshots exist under `supabase/` |

Supabase local development therefore remains a viable $0 strategy but cannot be verified on this host until the founder installs/enables a compatible container runtime. Installing desktop virtualization software is outside a repository agent's authority.

## Repository hygiene finding

`DEPLOYMENT.md` embedded Tonguee's full legacy browser anon JWT. This category is intentionally publishable and does not trigger rotation solely because it appeared in Git, per SEC0. It is nevertheless removed in I0 because literal values in deployment instructions create accidental cross-project coupling and conflict with the environment registry.

No service-role key, database password, Stripe secret or Google client secret was identified by this scoped check.

## Current gates

| Gate | State | Required action |
|---|---|---|
| GitHub/Vercel repo separation | PASS | preserve |
| Fail-closed ARO deployment | PASS | preserve until target approval |
| Local isolated database | BLOCKED | install compatible container runtime; initialize and verify local stack |
| Hosted isolated database | BLOCKED | founder selects/approves capacity path |
| Vercel Preview/Production scopes | BLOCKED | founder/dashboard audit after target exists |
| Auth URLs/callbacks | BLOCKED | configure in isolated target |
| Recovery drill | BLOCKED | requires isolated target |
| GitHub branch protection/checks | BLOCKED | implement with Q0 checks |
| `aro.club` routing | FAIL / OWNER ACTION | identify existing site/account and decide intended domain |

## Safe next actions

1. Merge the reviewed I0 spec/evidence/hygiene package.
2. Install a compatible local container runtime, then initialize the local Supabase stack and migration baseline.
3. Choose one hosted capacity path only after current total cost is displayed.
4. Keep Production fail-closed until hosted staging, callbacks, RLS, recovery and deployment scopes pass.
