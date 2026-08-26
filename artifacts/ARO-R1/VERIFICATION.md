# ARO-R1 Verification Record

> Date: 2026-08-26  
> Branch: `feat/aro-r1-full-rebrand`  
> Spec: `specs/ARO-R1-FULL-REBRAND.md` v1.0.0  
> Result: **VERIFIED locally; not SHIPPED**

## Repository and scope

- `origin` is `https://github.com/leonartist7/ARO.club.git`.
- `tonguee-governed` is a read-only governance source remote for `leonartist7/Tonguee`.
- `git merge-base --is-ancestor 9394cb7 HEAD` passed.
- The R1 diff contains no `supabase/`, SQL, Vercel, CI, auth-provider, payment, Stripe or Google configuration change.
- No Supabase or Vercel provider mutation was performed.
- Supabase `jjgccfrwjkwknyjtbtxa` remains **QUARANTINED — KEEP**.

## Automated verification

| Check | Result | Evidence |
|---|---|---|
| Unit tests | PASS | Vitest: 2 files, 61 tests passed |
| Production build | PASS | Vite 7.2.2; 2,601 modules transformed |
| Main JS bundle | BASELINE RECORDED | 750.30 kB minified / 229.86 kB gzip; inherited >500 kB warning remains |
| CSS bundle | BASELINE RECORDED | 89.61 kB minified / 13.91 kB gzip |
| Repository lint | INHERITED FAILURE | 23 errors / 9 warnings, matching the recorded Tonguee baseline; no new R1-specific failure category |
| Diff whitespace | PASS | `git diff --check` returned no whitespace error |

Environment note: Node 24.11.0 is below `jsdom@30.0.0`'s preferred Node 24.15.0 floor. The suite nevertheless passed. Upgrade Node before treating that engine warning as resolved.

## Browser and accessibility evidence

- Local preview used dummy, non-production Supabase-shaped values. No live backend data was requested or changed.
- Page title: `ARO — The Human Opportunity Network`.
- Browser console: no warnings or errors during the homepage and `/explore` smoke check.
- Primary CTA navigated to `/explore`; the destination rendered `Explore Language Experiences`.
- One `main` landmark, one H1, ordered H2/H3 hierarchy, and a working `#main-content` skip target were observed.
- No unnamed buttons or links were observed on the homepage.
- Decorative orbit elements are hidden from assistive technology; the ARO mark is named.
- 360px layout: no horizontal overflow.
- 1440px layout: no horizontal overflow.
- Source review confirms visible focus-ring styles and a `prefers-reduced-motion` path that disables `.aro-orbit-motion`.

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
| R1-012 | PASS | diff and provider review; no provider/schema/Trust/money/Auth expansion |

## Release boundary

R1 is not deployed and neither repository's `main` branch has changed. Before release, the founder must approve the visual direction and the team must create/select an isolated ARO.club Vercel and backend environment. Tonguee production is not the default ARO.club target.
