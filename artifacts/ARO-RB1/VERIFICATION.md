# RB1 foundation evidence — implementation branch

Base is RB0, now reconciled with `main` at `721b2b7` (PR #83 local Manrope). This branch changes presentation and shared navigation only. No schema, RLS, Auth, payment, Trust or provider files changed. The 2026-09-28 review repair migrates charcoal-on-orange pairings to the brighter brand orange, restores the Create exit, matches the browser icon to the symbol geometry and fixes screenshot preference initialization.

| Check | Result | Evidence / limit |
|---|---|---|
| `npm run build` | PASS on earlier RB1 commit; repair pending hosted CI | Next 16.3.5 production build previously generated all routes. Local repair build cannot use the sibling dependency junction because Turbopack rejects it. |
| `npm run lint` | PASS | ESLint exit 0 |
| `npm run type-check` | PASS on initial RB1 edit | `next typegen && tsc --noEmit`; final build also completed TypeScript |
| `npm test -- --maxWorkers=2 --fileParallelism=false` | PASS | 19 files; 175 passed, 3 skipped |
| Browser route/render | PASS for six sampled combinations after repair | Refreshed `browser.json`; public/app responses 200, nonempty rendered body, no page errors; capture script now correctly seeds theme and language through Playwright. Next webpack dev used for these captures. |
| Create exit | PASS on local browser check | `/app/create` returned 200 and its primary-navigation “Back to World” link resolved to `/app/world`. |
| Visual review | PARTIAL | Refreshed `home-1440-dark-es.png` inspected; Spanish highlight wraps without clipping. Other representative captures retained for comparison. Existing Home first viewport remains tall and text-heavy for RB3. |
| Font transfer | PARTIAL | R2's 619,560-byte Noise Order is no longer referenced. Current main serves Manrope from licensed WOFF2 files in `public/fonts/manrope/`; RB1 inherits those assets without duplicating a remote import. This merged head needs a fresh hosted build/network check. Polymath is withheld pending licensed web files. |
| Contrast/accessibility | PARTIAL | Primary action uses white on `#C94320` (4.88:1); audited charcoal-text pairings use `#F05A28` (4.58:1). Lint and type-check pass after repair. Full-route computed contrast and screen-reader review remain. |

The first browser capture ran during the existing 500 ms route fade and produced pale/incomplete frames; the capture script now waits for hydration, theme and fade completion. Superseded frames were replaced. Visual review also found missing Spanish header navigation strings, now added. Hosted CI must confirm the production build of the review repair before upgrading package status.

Second review repair on 2026-09-28: legacy `text-primary-500` foregrounds receive the lighter primary-300 shade in dark mode while `bg-primary-500` keeps the accessible action orange. The generated Tailwind CSS was inspected and contains this specific dark foreground rule. Three brand-orange actions now hover to a visibly lighter orange. Focused screenshot capture no longer overwrites the six-case `browser.json`, and a mistyped slug fails. Local lint/type and Tailwind compilation pass; hosted CI and full dark-text sampling remain pending on this head.

PR #83 reconciliation: the local Manrope files and `@font-face` declarations were merged from current main without a source conflict. Existing screenshots precede this merge; hosted checks and a focused font/network visual recheck are required for the resulting head.

Third review repair: the brand manifest now records Manrope v20's six local WOFF2 subsets, source hashes and included OFL. The dark compatibility layer also lifts `dark:text-primary-400` and group-hover primary foregrounds to the readable primary-300 shade. Linked wordmarks in the public header/footer and app shell now have 44px hit areas. The app shell translates its four navigation labels, status, search/notification descriptions, skip link and accessible navigation name through the existing EN/FR/ES shell copy. On the combined RB6 production tree, lint and webpack build pass; the 1440px French dark app shell was visually inspected with the local font and translated bottom navigation. Fresh hosted checks and full-route assistive-technology review remain separate.

Current package state: **IMPLEMENTED / PARTIAL VERIFICATION**, not VERIFIED or SHIPPED. Review/merge and production release remain separate. RB2 may build a stacked preview from this source without claiming this package's release gate passed.
