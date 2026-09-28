# RB1 foundation evidence — implementation branch

Base `5497d1a` (RB0 documentation, stacked on main `fdda810`). This branch changes presentation and shared navigation only. No schema, RLS, Auth, payment, Trust or provider files changed. The 2026-09-28 review repair migrates charcoal-on-orange pairings to the brighter brand orange, restores the Create exit, matches the browser icon to the symbol geometry and fixes screenshot preference initialization.

| Check | Result | Evidence / limit |
|---|---|---|
| `npm run build` | PASS on earlier RB1 commit; repair pending hosted CI | Next 16.3.5 production build previously generated all routes. Local repair build cannot use the sibling dependency junction because Turbopack rejects it. |
| `npm run lint` | PASS | ESLint exit 0 |
| `npm run type-check` | PASS on initial RB1 edit | `next typegen && tsc --noEmit`; final build also completed TypeScript |
| `npm test -- --maxWorkers=2 --fileParallelism=false` | PASS | 19 files; 175 passed, 3 skipped |
| Browser route/render | PASS for six sampled combinations after repair | Refreshed `browser.json`; public/app responses 200, nonempty rendered body, no page errors; capture script now correctly seeds theme and language through Playwright. Next webpack dev used for these captures. |
| Create exit | PASS on local browser check | `/app/create` returned 200 and its primary-navigation “Back to World” link resolved to `/app/world`. |
| Visual review | PARTIAL | Refreshed `home-1440-dark-es.png` inspected; Spanish highlight wraps without clipping. Other representative captures retained for comparison. Existing Home first viewport remains tall and text-heavy for RB3. |
| Font transfer | PARTIAL | R2's 619,560-byte Noise Order is no longer referenced. Manrope remains the existing remote Google import, not a pinned local asset. Polymath is withheld pending licensed web files. |
| Contrast/accessibility | PARTIAL | Primary action uses white on `#C94320` (4.88:1); audited charcoal-text pairings use `#F05A28` (4.58:1). Lint and type-check pass after repair. Full-route computed contrast and screen-reader review remain. |

The first browser capture ran during the existing 500 ms route fade and produced pale/incomplete frames; the capture script now waits for hydration, theme and fade completion. Superseded frames were replaced. Visual review also found missing Spanish header navigation strings, now added. Hosted CI must confirm the production build of the review repair before upgrading package status.

Current package state: **IMPLEMENTED / PARTIAL VERIFICATION**, not VERIFIED or SHIPPED. Review/merge and production release remain separate. RB2 may build a stacked preview from this source without claiming this package's release gate passed.
