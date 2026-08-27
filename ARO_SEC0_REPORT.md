# ARO-SEC0 — Repository Secret Hygiene

## Status

**VERIFIED — 2026-08-26**

Repository secret hygiene is complete for the active ARO branch. The tracked local environment file is removed, local environment variants are ignored, the founder classified the historical variables, and the Git-history decision is recorded without exposing values.

## Scope and evidence handled safely

- Repository: `leonartist7/Tonguee`
- Target branch: `feat/aro-p0-director-reset`
- Finalization branch: `agent/aro-sec0-finalize`
- Historical environment-file commits were previously identified by commit metadata only.
- No secret value, token, password, key material, or environment-file content is recorded in this report.
- `.env.example` remains the onboarding template and must contain placeholders only.

## Repository changes

- Removed `.env` from the active Git tree.
- Updated `.gitignore` to ignore `.env` and all `.env.*` variants while explicitly retaining `.env.example`.
- Preserved existing Obsidian/Graphify ignore rules.
- Made no runtime, schema, RLS, route, dependency, UI, payment, or product-feature change.

## Founder/provider decision — 2026-08-26

The founder confirmed:

1. The historical file contained only the variable categories `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`; values are intentionally omitted.
2. No Stripe or Google configuration was present.
3. The Supabase project named **Tonguee** is the canonical backend for the ARO migration.
4. The separate Supabase project named `aro-platform` contains an unrelated venue/ordering schema and is not the current ARO migration target.
5. Vercel is connected to the Tonguee GitHub repository and manages deployment configuration outside Git.
6. Historical exposure of the browser-facing Supabase project URL and legacy anonymous client key is accepted and documented.
7. No Git history rewrite is requested.
8. No credential rotation is required solely because those browser-facing categories appeared in Git.

## Security interpretation

A Supabase project URL and browser client key are designed to be used by public clients. They are not equivalent to a service-role key, database password, JWT secret, or other server credential.

Their safe use depends on:

- RLS enabled and correctly scoped for every exposed table;
- least-privilege grants for `anon` and `authenticated`;
- no service-role or server secret in any `VITE_*` variable;
- server-side handling for privileged operations;
- deployment secrets stored in provider configuration rather than Git.

The current Supabase security-advisor findings and public API/RLS behavior must be reviewed as part of the P1 pre-implementation security baseline. That review is a data-authorization task, not an unresolved repository-secret incident.

## Verification

- [x] `.env` is absent from the active tree on the finalization branch.
- [x] `.env` and `.env.*` are ignored.
- [x] `.env.example` remains explicitly allowed.
- [x] Founder classified the historical variable categories without values.
- [x] Stripe and Google configuration were confirmed absent.
- [x] Canonical Supabase project selection is recorded.
- [x] Rotation/restriction decision is recorded.
- [x] History-cleanup decision is recorded.
- [x] No runtime or product feature was mixed into SEC0.

## Gate

**ARO-SEC0 is VERIFIED after this branch merges into `feat/aro-p0-director-reset`.**

ARO-P1 may proceed to package specification and baseline verification against the Tonguee Supabase project. Production financial integrations remain separately gated by provider-specific money and security specifications.
