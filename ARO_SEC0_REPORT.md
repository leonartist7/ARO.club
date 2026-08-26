# ARO-SEC0 — Repository Secret Hygiene

## Status

**Status: COMPLETE — founder/provider decision recorded 2026-08-26.**

This package removes the tracked `.env` from the active Git tree without reading, printing, or copying its values. It does not rewrite Git history. The founder confirmed that the historical file contained only the browser-facing Supabase project URL and anonymous client key variable categories; no server credential, Stripe configuration, or Google configuration was present.

## Scope and evidence handled safely

- Repository: `leonartist7/Tonguee`
- Base: ARO P0.1 commit `0bc4b99`
- Historical `.env` commits observed by SHA/message only: `b93acb3` (`Create .env`) and `a87c913` (`Update .env`)
- Current `.env` was not opened or emitted to output.
- `.env.example` was inspected and contains placeholders only.
- No secret values, tokens, keys, passwords, or environment contents are recorded here.

## Changes in this package

- `.env` is removed from Git tracking while the founder’s local file is left in place for local recovery/configuration.
- `.gitignore` now ignores `.env` and all `.env.*` variants while explicitly allowing `.env.example`.
- `.env.example` remains the safe template and is not populated with real values.

## Variable/provider review required by founder

The safe template names these client-exposed configuration categories:

| Variable category | Exposure/impact review |
|---|---|
| Supabase URL | Identifier; confirm it points to the intended project. |
| Supabase anonymous client key | Designed for client use but governed by Supabase RLS; confirm RLS and project policy, and rotate if the project owner requires it. |
| Stripe publishable key | Client-visible; confirm test/live mode and Stripe restrictions. Never place a secret key in any `VITE_*` value. |
| Google Maps browser key | Client-visible but potentially billable; confirm HTTP/API restrictions, quotas, and rotation. |
| Google OAuth client ID | Public identifier; confirm authorized origins/redirects. It is not a client secret. |

Do not infer that a value is safe solely because it has a `VITE_` prefix. Vite exposes `VITE_*` values to browser bundles. Any server credential found by the founder in the local file or provider dashboard requires immediate rotation and relocation to server-side configuration.

## Founder decision — 2026-08-26

- The founder confirmed that the historical file contained only `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` variable categories. Values are intentionally omitted.
- No Stripe or Google configuration was present.
- The canonical backend remains the Supabase project named **Tonguee**; the separately named `aro-platform` project contains an unrelated venue/ordering schema and is not the ARO migration target.
- The Supabase URL and legacy anonymous client key are browser-facing configuration. Their safety depends on correct RLS and least-privilege database grants; a service-role or other server secret must never be placed in a `VITE_*` variable.
- No credential rotation is required solely because these browser-facing values appeared in Git. Supabase RLS and API exposure still require review before production data work, and migration to a modern publishable key may be considered separately.
- The founder accepts the documented historical exposure and chooses **no Git history rewrite**. Removing the file from the active tree is sufficient for SEC0.
- Vercel remains connected to the Tonguee GitHub repository. Deployment environment values remain managed outside Git.

## Founder/provider actions

1. Confirm whether the historical `.env` contained only the above client configuration categories or any server secrets.
2. If any secret or unrestricted/billable credential was present, rotate/restrict it in the owning provider before broad multi-agent access or production financial work.
3. Confirm Supabase RLS, Auth redirect settings, storage policies, Stripe mode/restrictions, and Google Maps quotas after rotation/restriction.
4. Keep the local `.env` untracked. Use `.env.example` for onboarding and secret-manager/provider configuration for deployed environments.
5. Decide whether Git history cleanup is necessary. This package intentionally does not rewrite history; cleanup requires coordinated approval because it changes commit IDs and every clone/branch.
6. Record completion of provider actions without writing secret values into GitHub issues, PRs, commits, or chat.

## Verification

- [x] `.env` no longer appears in the index on this branch.
- [x] `.env` remains ignored locally.
- [x] `.env.example` remains tracked and placeholder-only.
- [x] No runtime, schema, route, dependency, or product code changed.
- [x] Historical exposure is documented without values.
- [x] Provider rotation/restriction decision completed by the founder: no rotation required for the confirmed browser-facing categories.
- [x] History-cleanup decision completed by the founder: no rewrite; historical exposure accepted and documented.

## Gate

**ARO-SEC0 is closed.** P1 may begin on the Tonguee Supabase project. Production financial integrations remain separately blocked until their provider-specific credentials and server-side configuration receive explicit security review.
