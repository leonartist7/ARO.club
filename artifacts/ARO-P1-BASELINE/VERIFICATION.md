# ARO-P1 Baseline Verification

> Date: 2026-08-27
>
> Branch: `feat/aro-p1-baseline`
>
> Exact base: `494817f4ea6053409bd713205fe343e0d9734213`
>
> Result: **EXECUTED; GATE NOT PASSED — SAFE MIGRATION ENVIRONMENT REQUIRED**

## Release and repository state

- R1 PR #22 merged into `main` as `494817f`.
- Vercel production deployment `dpl_DKCbYy8LvJAWP3tAzCA43oGGJUA2` reached `READY` from that merge commit.
- Production build completed in 10 seconds with only the recorded large-chunk warning.
- Tonguee production repository and Supabase project were not changed.
- Supabase project `jjgccfrwjkwknyjtbtxa` remains **QUARANTINED — KEEP**.

## Automated baseline

| Check | Result | Evidence |
|---|---|---|
| Unit | PASS | Vitest: 2 files, 61 tests passed in 5.44s |
| Build | PASS | Vite 7.2.2; 2,601 modules; 13.85s |
| Main JS | RECORDED | 750.65 kB minified / 229.96 kB gzip; inherited >500 kB warning |
| CSS | RECORDED | 89.84 kB minified / 13.92 kB gzip |
| Lint | BASELINE FAIL | 19 errors / 9 warnings; unused-code, Fast Refresh and Hooks debt |
| Legacy E2E | BASELINE FAIL | 11 passed / 18 failed; see R1 verification for the complete run |

The E2E harness first required two environment workarounds: the runner cannot spawn `npm` directly on this Windows host and its default Chromium executable is a hardcoded Linux path. Once run with a separately started Vite server and installed Chrome, stale auth/onboarding assumptions caused cascading journey failures. Route-render, blank-page and responsive sweeps still passed.

## Browser and accessibility evidence

The prescribed `agent-browser` executable was unavailable, so the installed repository Playwright package and system Chrome were used through `capture-baseline.mjs`.

Both protected routes were requested at 360 × 800 and 1440 × 1000 in light and dark modes:

- `/profile`
- `/onboarding/student`

Because no approved backend is configured, every request correctly redirected to `/login`. Across all eight captures:

- no page or console errors;
- no Vite error overlay;
- meaningful body content;
- one H1 and one `main` landmark;
- no unnamed buttons or links;
- no horizontal overflow;
- truthful account-unavailable copy and disabled submission.

The protected profile/onboarding content itself cannot be captured without a safe authenticated environment. This is a named gate failure, not skipped evidence.

## Live Tonguee Supabase audit — read only

Project `ybhecubqnhukgpvchjay` remains evidence/source only under ADR-026. No SQL mutation was performed.

- Eight public tables; RLS enabled on all eight; connector-reported public row counts were zero.
- No connector-visible migration history.
- Three Auth accounts, counted only; no personal data inspected.
- `anon` and `authenticated` have all table privileges on every public table.
- Existing policies target broad `public`; duplicate public profile policies exist.
- Several UPDATE policies lack a separate `WITH CHECK`.
- Three public functions have mutable `search_path`.
- `public.handle_new_user()` is `SECURITY DEFINER` and executable by `anon` and `authenticated`.
- Security advisors: 29 warnings (3 mutable search paths, 16 GraphQL exposure warnings, 2 executable security-definer warnings, 7 anonymous-sign-in policy warnings, 1 leaked-password-protection warning).
- Performance advisors: 45 findings (3 unindexed foreign keys, 20 auth RLS init-plan warnings, 10 unused indexes, 12 duplicate permissive-policy warnings).

These findings confirm that P1 private records must use dedicated tables with explicit minimal grants and owner-only RLS. They do not authorize altering Tonguee production.

Relevant remediation references:

- [Mutable function search paths](https://supabase.com/docs/guides/database/database-linter?lint=0011_function_search_path_mutable)
- [Anonymous GraphQL exposure](https://supabase.com/docs/guides/database/database-linter?lint=0026_pg_graphql_anon_table_exposed)
- [Public SECURITY DEFINER execution](https://supabase.com/docs/guides/database/database-linter?lint=0028_anon_security_definer_function_executable)
- [Leaked password protection](https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection)
- [RLS initialization plans](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select)

## Safe migration environment attempt

- Approved organization: `lionovart's Org` (`svemweqlxcebycqclhww`).
- Approved project name/region: `ARO.club Staging`, `eu-north-1`.
- Supabase quoted cost: **$0/month**.
- Creation result: rejected before creation because the account already has the maximum two active free projects.
- No staging project and no charge were created.
- No existing project was paused, deleted, transferred, upgraded or repurposed.

The two counted projects are Tonguee and quarantined `aro-platform`. Neither may be used to clear the limit under current authority.

## Gate conclusion

The repository, release, build, unit, visual, accessibility, performance-size and live read-only Trust evidence is captured. The P1 baseline gate does **not** pass because:

1. no isolated Supabase migration environment exists;
2. authenticated protected-surface screenshots and hostile RLS tests cannot run safely;
3. representative owner-query plans cannot be measured without the P1 schema/test data;
4. legacy E2E and lint debt remain explicitly recorded.

P1 runtime implementation and migrations remain prohibited until the founder provides safe free-project capacity or explicitly approves a paid isolated environment. Do not point ARO.club at Tonguee production and do not repurpose `aro-platform`.
