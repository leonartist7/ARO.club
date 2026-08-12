# ARO-SEC0 — Repository Secret Hygiene

## Status

**Current status: remediation prepared; founder/provider review required before declaring the incident closed.**

This package removes the tracked `.env` from the active Git tree without reading, printing, or copying its values. It does not rewrite Git history. Because the file was committed previously, credentials that may have appeared there must be treated as potentially exposed until the owner of each provider confirms otherwise.

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
- [ ] Provider rotation/restriction decision completed by the founder.
- [ ] History-cleanup decision completed by the founder.

## Gate

P1 may begin only after the unchecked founder/provider decisions are resolved or explicitly accepted as a documented risk. Production financial integrations remain blocked until any relevant credentials are confirmed safe and server-side secrets are configured outside Git.
