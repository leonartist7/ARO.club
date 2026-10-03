The founder-requested yellow primary, orange secondary, and supplied Noise Order title font were implemented in an older uncommitted checkout. This PR reconciles that brand work onto current `main`, preserving the newer FV1 route and content fixes instead of copying older pages over them.

Shared tokens, main headings, the wordmark and mark, browser icon, buttons, and related contrast treatments use the new identity. The font and its supplied license are included. The PR contains no Auth, data, Trust, or purchase changes.

Validation: `npm run build` and `npm run lint` passed. Vitest passed 175 tests with 3 skipped. Production-server Chromium checks passed at 360px and 1440px in light and dark themes; the font loaded, `/` and `/app` returned 200, and there were no page errors or horizontal overflow. Refreshed screenshots and the browser report are in `artifacts/ARO-R2/`.

Founder visual review and the required PR checks remain open. This draft does not authorize a production release.
