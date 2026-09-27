# R2 rebrand — current-main reconciliation, 2026-09-27

Package: ARO-R2 v1.0.0. Status: IMPLEMENTED / REVIEW PENDING. This candidate starts from `main` at `e1ad705` and preserves its FV1 route and content fixes. The original uncommitted migration checkout remains in place.

- Yellow primary `#F4D000`, orange secondary `#F58220`, and deeper text shades are defined in shared tokens. The supplied Noise Order OTF (619,560 bytes) and license are preserved together; main titles and the ARO wordmark use that face.
- `npm run build`: PASS, including TypeScript and route generation.
- `npm run lint`: PASS.
- `npm test -- --configLoader runner`: 19 files passed, 175 tests passed, 3 skipped.
- Production-server Chromium checks: `/` returned 200 at 360px and 1440px in light and dark themes; `/app` returned 200. All four home cases had content, loaded Noise Order for title and wordmark, had no horizontal document overflow, uncaught page errors, or Next error overlay. See `browser.json` and the five refreshed screenshots in this directory.
- Visual inspection of the refreshed screenshots found the yellow/orange identity and Noise Order on the home and app surfaces. This is a focused visual check; full-route accessibility and founder visual approval remain open.
- The new font stays below the 620 KB package budget. No before/after LCP or INP claim is made.
- No runtime dependency, server, Auth, data, Trust, or money boundary changed. The unreleased RevenueCat preview from the older checkout is outside this branch.
