# ARO-R1 Verification Record

> Date: 2026-08-27
>
> Branch: `feat/aro-r1-full-rebrand`
>
> Commit: `17996ade695f243a363d832a7c13658048f335f2`
>
> Spec: `specs/ARO-R1-FULL-REBRAND.md` v1.0.1
>
> Result: **VERIFIED locally / PROVIDER-SEPARATED; not SHIPPED**

## Repository and scope

- `origin` is `https://github.com/leonartist7/ARO.club.git`.
- `tonguee-governed` is a read-only governance source remote for `leonartist7/Tonguee`.
- `git merge-base --is-ancestor 9394cb7 HEAD` passed.
- The R1 diff contains no `supabase/`, SQL, Vercel, CI, auth-provider, payment, Stripe or Google configuration change.
- No Supabase or Vercel configuration mutation was performed by the implementation agent.
- After the branch was pushed, the existing Vercel integration automatically created Preview deployment `6113868573` in project path `lionovart/langgie` at `https://langgie-k8zpre22r-lionovart.vercel.app`. Earlier ARO.club commits show the same inherited behavior.
- The founder then separated the repositories in Vercel and created project `aro-club`. GitHub deployment `6114077718` successfully deployed safe base commit `ce291193` as that project's Production baseline at `https://aro-club-mffksnmw5-lionovart.vercel.app`.
- Vercel Preview deployment `dpl_AFEUhcQeqEJ54M7g9ehMuVrn3RZB` built R1 commit `17996ad` in independent project `aro-club` and reached `READY`. The protected review URL rendered `ARO — The Human Opportunity Network` with no browser-console warnings or errors.
- Supabase `jjgccfrwjkwknyjtbtxa` remains **QUARANTINED — KEEP**.

## Automated verification

| Check | Result | Evidence |
|---|---|---|
| Unit tests | PASS | Vitest: 2 files, 61 tests passed |
| Production build | PASS | Vite 7.2.2; 2,601 modules transformed |
| Main JS bundle | BASELINE RECORDED | 750.65 kB minified / 229.96 kB gzip; inherited >500 kB warning remains |
| CSS bundle | BASELINE RECORDED | 89.84 kB minified / 13.92 kB gzip |
| Repository lint | INHERITED FAILURE | 19 errors / 9 warnings; unused-code, context-export and Hooks debt remains outside R1 scope |
| Legacy E2E | BASELINE FAILURE | 11 passed / 18 failed after Windows harness workarounds; stale auth/onboarding expectations dominate, route-render and responsive sweeps pass |
| Diff whitespace | PASS | `git diff --check` returned no whitespace error |

Environment note: Node 24.11.0 is below `jsdom@30.0.0`'s preferred Node 24.15.0 floor. The suite nevertheless passed. Upgrade Node before treating that engine warning as resolved.

## Browser and accessibility evidence

- Local preview used dummy, non-production Supabase-shaped values. No live backend data was requested or changed.
- A second local preview used no Supabase variables at all. The public homepage rendered with no browser warnings/errors; `/login` displayed a truthful backend-unavailable notice and disabled account submission.
- Page title: `ARO — The Human Opportunity Network`.
- Browser console: no warnings or errors during the homepage and `/explore` smoke check.
- Primary CTA navigated to `/explore`; the destination rendered `Explore Language Experiences`.
- One `main` landmark, one H1, ordered H2/H3 hierarchy, and a working `#main-content` skip target were observed.
- No unnamed buttons or links were observed on the homepage.
- Decorative orbit elements are hidden from assistive technology; the ARO mark is named.
- 360px layout: no horizontal overflow.
- 1440px layout: no horizontal overflow.
- Source review confirms visible focus-ring styles and a `prefers-reduced-motion` path that disables `.aro-orbit-motion`.
- The legacy route sweep found no runtime errors or blank pages on public or signed-in protected routes.
- The responsive sweep found no horizontal overflow at 390px or 768px. Dark-mode text readability passed; one inherited light-surface class remains on `/signup`.

## Legacy E2E qualification

The repository runner is not portable on this Windows host without workarounds: it spawns `npm` directly and hardcodes `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`. Running against an already-started Vite server with `E2E_CHROME` set to installed Chrome allowed the suite to execute.

The first journey expects role selection to enter `/onboarding/student`, but the current unauthenticated application correctly routes to `/login`. That stale assumption causes cascading timeouts in onboarding, booking, review and Passport steps. Separate successful checks confirm that public/protected pages render, no tested route is blank, responsive layouts do not overflow, and dark-mode text remains readable. These failures are baseline debt and are not represented as R1 regressions or as a passing P1 gate.

## Screenshots

- `home-mobile-light.png` — 360 × 800, light.
- `home-mobile-dark.png` — 360 × 800, dark.
- `home-desktop-light.png` — 1440 × 1000, light.
- `home-desktop-dark.png` — 1440 × 1000, dark.

## Acceptance map

| Criterion | Result | Evidence |
|---|---|---|
| R1-001 | PASS | ARO.club origin; Tonguee preserved as separate remote/recovery path |
| R1-002 | PASS | `9394cb7` ancestry check |
| R1-003 | PASS | ARO header, footer, homepage and screenshots |
| R1-004 | PASS | Tonguee explicitly presented as the first live language path |
| R1-005 | PASS | package metadata, HTML metadata and production build |
| R1-006 | PASS | ARO tokens plus four breakpoint/theme screenshots |
| R1-007 | PASS | hostile copy review; future engine is labelled as future, not live |
| R1-008 | PASS | `/explore` route smoke and six existing experience cards rendered |
| R1-009 | PASS | semantic/accessibility spot check and reduced-motion source review |
| R1-010 | PASS | four screenshots; no horizontal overflow at 360/1440 |
| R1-011 | PASS with inherited lint qualification | tests/build pass; legacy lint debt recorded |
| R1-012 | PASS | source diff has no provider/schema/Trust/money/Auth expansion; founder created independent Vercel project `aro-club`; rebrand branch remains unpromoted |
| R1-013 | PASS | no-env production build plus homepage/login browser verification |

## Release boundary

The R1 rebrand branch is not deployed to Production and neither repository's `main` branch has changed. The founder created independent Vercel project `aro-club`, whose Production baseline is the safe copied `main` commit. Before promoting R1, verify the new project's Preview/Production environment-variable scopes and create/select an isolated ARO.club backend environment. Tonguee production is not the approved ARO.club target.

## Blank-preview incident

The first separated preview exposed two independent conditions: Vercel authentication protected the Preview URL, and the application previously threw during module initialization when Supabase variables were absent. R1 v1.0.1 removes the application crash. Public review routes now work without backend configuration; account actions remain unavailable and fail closed until an approved ARO.club backend is configured. Deployment Protection remains a Vercel access setting, not an application failure.
