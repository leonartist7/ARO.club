# ARO-H0 snapshot publication verification

Date: 2026-09-08. Source: existing UX0 commit `b5028abe721f0e4197740674fb99a26dee005b99` plus the reviewed H0 snapshot. The delivery PR identifies the immutable tested source revision; final remote/clean-state results are checked after merge and reported in the task delivery.

## Fresh local checks

| Check | Observed result |
|---|---|
| `npm run lint -- --max-warnings=0` | PASS, exit 0 |
| `npm test` | PASS, 73 tests across 5 files, 27.08 seconds |
| `npm run build` | PASS, 2623 modules, 16.89 seconds |
| Targeted app route smoke | PASS, 56 route/viewport/theme combinations; see route-smoke.json |
| Credential-pattern scan of candidate text | No matching private-key/token patterns; no environment files in candidate paths. Pattern scan is not a full security certification. |
| Diff whitespace check | PASS before staging; repeated on staged snapshot |

Browser smoke used the existing Playwright package and installed Chrome against an isolated Vite server on 127.0.0.1:5198, with synthetic Supabase boundary values. The optional agent-browser CLI was unavailable. Fourteen app routes were loaded at 390 and 1440px in light and forced DOM dark themes. All rendered content with no uncaught page errors, Vite overlay, broken loaded images or horizontal overflow. This does not prove that every button works or theme switching is complete. Requests to Google Fonts were observed; no Supabase host was observed in the app matrix.

Screenshots: app-390-light.png, app-390-dark.png, app-1440-light.png, app-1440-dark.png. The additional app-mobile-light.png is the initial 390x844 load check. Visual inspection found weak hero text contrast, especially over the desktop dark-theme image. This remains an A2/FV-1 finding; no complete visual or accessibility PASS is claimed.

## Performance and remaining scope

Main JS: 604.45 kB minified / 193.55 kB gzip; CSS: 129.34 kB / 19.62 kB gzip. Vite warns about the greater-than-500-kB chunk. Existing browsers data is stale. No dependency update or optimization is included; A3 must propose a measured budget. Nine added source PNGs total 20,369,032 bytes.

The public `/app` surface is a synthetic prototype with incomplete visual/package coverage and inert controls described in ARO_CLOUD_HANDOFF.md. Existing root UX0 work from PR #35 is included in this branch's ancestry. The snapshot does not grant P1/P2–P5, I0 sign-off, FV-1 implementation or native-launch readiness. No provider secrets, schema changes or dependency changes are introduced by H0.

## Publication checks

Use a normal PR merge after current required CI succeeds. `snapshot-files.txt` records this publication's paths. After merge, verify the remote default branch advertises the merge SHA, all listed files exist in that tree, and the founder checkout is clean at the same SHA. A snapshot cannot contain its own final commit SHA; obtain that value from the merged PR and dispatcher before scheduling.

Existing regression suite: `E2E_BASE=http://127.0.0.1:5198 npm run test:e2e` — PASS, all 25 checks, exit 0. Covers UX0 formation, synthetic account boundaries, public/protected route sweep, responsive and legacy dark-mode assertions. These assertions do not certify every new app control or override the contrast finding above.
