# Disposable Supabase platform tests

Authority: `specs/ARO-I0.1-EPHEMERAL-SUPABASE-CI.md` v1.0.0.

The `Isolated database / platform` GitHub check runs this workdir on a standard disposable Ubuntu runner. No GitHub secrets or hosted Supabase project are required. The destructive runner refuses local machines and self-hosted CI. Do not remove that guard to reuse it against a personal database.

Safe local verification: `node --test tools/ci/boundary.test.mjs` and `node --check tools/ci/run.mjs`.

CI sequence: pinned CLI → loopback-only Docker network → platform start → local reset → transactional SQL matrix → synthetic Auth lifecycle (including local recovery email) → reset/account-erasure proof → SQL repeat → project-specific cleanup. Read the named phase output; failures never print CLI credentials or recovery payloads. Fix the failing phase against the spec and rerun the PR workflow. No health-check bypass or blanket retry is allowed.

## What this proves—and does not

- Proves only the assertions that actually pass in the named CI run: service operation, platform reset, synthetic Auth and test-only RLS enforcement.
- `platform.test.sql` rolls back its probe table and contains no product migration.
- This workdir has zero application migrations. `supabase/*.sql` at the repository root is **not loaded**. In particular, `clean-schema.sql` drops existing tables and must not be used as a blind bootstrap.
- Application schema/Trust import requires a separate reviewed baseline reconciliation. Future migrations must be created through the CLI and append-only; no production dump or user migration is authorized here.
- This does not verify browser onboarding, hosted recovery/deliverability, profile/Trust compatibility, P1 storage, production rollout or full I0 acceptance.
- Hosted capacity, scoped variables/callbacks, recovery, domain ownership and branch protection remain separate gates.

## Boundaries and retention

Project: `aro-i0-ci`. Network: `aro-i0-ci-net`, labeled with the current GitHub run/attempt/job. Cleanup requires that exact ownership label and removes only that project's disposable volumes. Existing resources cause preflight rejection. The workflow repeats cleanup with `always()`; GitHub runner disposal is the final containment boundary after a hard cancellation.

CLI and HTTP payloads are held in memory, not uploaded. Synthetic addresses end in `.invalid`; credentials are random per run. CLI telemetry is disabled. Do not add a raw-output artifact upload, Supabase access token, linked-project file or production credentials.

## Sources checked 2026-08-30

- [Supabase CI testing](https://supabase.com/docs/guides/deployment/ci/testing)
- [Supabase CLI and local development](https://supabase.com/docs/guides/local-development/cli/getting-started)
- [CLI 2.116.0 release](https://github.com/supabase/cli/releases/tag/v2.116.0)
- [Supabase breaking changes](https://supabase.com/changelog?types=breaking-change): explicit table grants, no modifications to provider-owned schemas; SQL fixture does not change Auth schema.
- [Mailpit local API](https://mailpit.axllent.org/docs/api-v1/)

The Supabase documentation's example action versions are illustrative and older. This workflow pins CLI 2.116.0 and setup-cli v2.1.1 by immutable commit. Existing checkout/setup-node major versions are retained; their Node runtime deprecation annotation is a separate maintenance follow-up, not silently treated as a failed product gate.
