# RB1 foundation evidence — implementation branch

Base `5497d1a` (RB0 documentation, stacked on main `fdda810`). This branch changes presentation and shared navigation only. No schema, RLS, Auth, payment, Trust or provider files changed.

| Check | Result | Evidence / limit |
|---|---|---|
| `npm run build` | PASS | Next 16.3.5 production build, all routes generated; current code after locale fixes |
| `npm run lint` | PASS | ESLint exit 0 |
| `npm run type-check` | PASS on initial RB1 edit | `next typegen && tsc --noEmit`; final build also completed TypeScript |
| `npm test -- --maxWorkers=2 --fileParallelism=false` | PASS | 19 files; 175 passed, 3 skipped |
| Browser route/render | PASS for six sampled combinations | `browser.json`; public/app responses 200, nonempty rendered body, no page errors |
| Visual review | PARTIAL | `home-320-light-en.png`, `home-1440-dark-es.png`, `app-360-light-en.png`, `app-1440-dark-fr.png` inspected. Header open-O and orange action hierarchy read correctly. Existing Home first viewport remains tall and text-heavy for RB3. |
| Font transfer | PARTIAL | R2's 619,560-byte Noise Order is no longer referenced. Manrope remains the existing remote Google import, not a pinned local asset. Polymath is withheld pending licensed web files. |
| Contrast/accessibility | PARTIAL | Primary control uses white on `#C94320` (4.88:1). Found and fixed one yellow admin badge with white text. Full-route computed contrast and screen-reader review remain. |

The first browser capture ran during the existing 500 ms route fade and produced pale/incomplete frames; the capture script now waits for hydration, theme and fade completion. Superseded frames were replaced. Visual review also found missing Spanish header navigation strings, now added; recheck the Spanish desktop header after the final build before upgrading visual status.

Current package state: **IMPLEMENTED / PARTIAL VERIFICATION**, not VERIFIED or SHIPPED. Review/merge and production release remain separate. RB2 may build a stacked preview from this source without claiming this package's release gate passed.
