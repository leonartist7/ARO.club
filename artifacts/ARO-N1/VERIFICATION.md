# FV1-docs — ARO-N1 verification

Status: **IMPLEMENTED / PARTIALLY VERIFIED**, 2026-09-20. Local working-tree evidence; not a merged revision, CI certification or release approval.

## Baseline and implementation

Baseline revision: d0c6fdb150b33d88b148bb4542a64b2815476e60. Separate branch: codex/nextjs-migration. Baseline lint, 80 unit tests and Vite production build passed. The original 25 browser checks also pass against the reconstructed baseline production build (baseline-browser.log). See baseline.json. Next.js 16.3.5, React 19.2.0, TypeScript 5.9.3 and Supabase SSR 0.12.7 are pinned; the lockfile pins transitive dependencies. Vite remains only for Vitest tooling. The application uses filesystem App Router routes, with no React Router runtime, Pages Router or SPA catch-all.

Preserved public/account/teacher/admin URLs, synthetic /app routes, assets, language content and design. One server-protected admin layout preserves the previously reachable dashboard and review routes. Existing JSX views live in src/views so Next cannot interpret them as Pages Router pages. New routes/server auth use TypeScript. Legal content renders as a Server Component; interactive views retain Client Component boundaries. Browser state initializes after hydration.

FV1-specific AppShell, AppImage, translations, image manifest, component tests and in-shell unknown-route fallback are retained. Screenshots show the fictional-preview banner and newer shell.

## Executed checks

| Check | Result |
| --- | --- |
| npm run lint -- --max-warnings=0 | PASS |
| npm run type-check | PASS |
| npm test | 96 PASS |
| npm run build | PASS, Next.js 16.3.5 App Router |
| node --test tools/autonomy/core.test.mjs tools/ci/boundary.test.mjs | 29 PASS |
| node e2e/next-parity.mjs against production build | 71 PASS; browser-parity.json |
| npm run test:e2e against production server | 25 PASS |
| node e2e/staging-boundary.mjs against staging-configured local server | 6 PASS; staging-boundary.json |
| npm audit --omit=dev | 0 runtime vulnerabilities; runtime-audit.json |
| git diff --check | PASS |

Browser coverage includes direct loads, real experience/teacher parameters, query-preserving protected redirects, client navigation/back, invalid callbacks, external redirect rejection, unknown routes, 360/1440 app views, 360/390/430/768/1440 formation views, light/dark, translated controls, keyboard input, reduced motion, local language/theme persistence, and no hydration/page errors. The mobile dark and desktop light screenshots were visually inspected; the full app-*.png matrix is retained for review. SSR tests wait for hydration before manipulating controls; initial streamed markup alone is not interaction readiness.

Auth regression tests cover authoritative role lookup, rejection of editable admin metadata, unavailable roles, callback exchange/token verification, refreshed cookies forwarded to both request and response, no-store headers, spoofed return-path replacement, and actual header logout/error handling. Logout clears displayed profile/player/mock account state and refreshes server state. Default browser tests make zero Supabase requests. Source configuration exposes only publishable browser values; ignored .env.staging.local files are outside Git.

## Staging observation

Registered target: mibydnerayobemhnlfyl (ARO.club Staging). It was inactive and restored during this task; observed ACTIVE_HEALTHY afterward. Read-only Auth settings showed email enabled, confirmation required, signup enabled and Google disabled. Invalid synthetic credentials were rejected, anonymous admin requests redirected to login and expired callbacks failed without creating a session. Read-only schema inspection found the authoritative api.current_user_role view and RLS enabled on all eight public tables. No database/schema/Trust/RLS changes or account creation were performed.

## Performance

Baseline Vite main chunk: 605.3 kB decoded / 193.88 kB gzip; CSS 129.43 kB. Next local cold-context desktop samples: home median LCP 520 ms, app median LCP 360 ms; median CLS 0.000599 / 0.000161. Script resource bytes: home 1170624, app 1127741. Full measurements: performance.json, reproducible with node e2e/next-performance.mjs against a running production server.

The baseline was reconstructed from the recorded Git revision in an isolated snapshot and measured with the same script/browser/viewport. Comparison of median observations:

| Route | Vite LCP | Next LCP | Vite script bytes | Next script bytes |
| --- | --- | --- | --- | --- |
| / | 840 ms | 520 ms | 629579 | 1170624 |
| /app | 676 ms | 360 ms | 615393 | 1127741 |

Next rendered the largest content sooner in these samples, but downloaded more decoded JavaScript. This is a material payload tradeoff, not a blanket performance improvement. These are three unthrottled local observations per route, with other verification processes running; preview/mobile network performance acceptance remains pending. Public routes currently render per request; caching optimization is deferred until account isolation is independently verified. See baseline-performance.json and performance.json.

## Outstanding gates — do not report as passed

- Successful hosted signup/email delivery/confirmation, persistent login, real token refresh, logout, recovery/reset and reused/expired emailed links need an approved synthetic participant account and accessible test inbox. No credentials/inbox were supplied. e2e/auth.mjs now exercises login, reload, external-return rejection, non-admin denial, cross-context isolation and logout when E2E_AUTH_BASE, E2E_TEST_EMAIL and E2E_TEST_PASSWORD are provided through the environment.
- Verify Supabase Site URL, callback allowlist and email/recovery templates against an approved staging deployment origin. Provider settings were not changed and no preview deployment was created.
- Run the existing disposable Linux database/Trust/RLS CI suite, including transactional SQL assertions and authenticated browser matrix. Docker/Supabase CLI were unavailable locally; the 29 local boundary tests are not a substitute. Required CI names static, browser-smoke and platform are preserved.
- Independent security/privacy review, human assistive-technology/visual acceptance and comparable preview performance checks remain pending. Full npm audit also reports existing development-tool vulnerabilities (15); runtime audit is clear. Local Node 24.11 ran the checks; use Node 24.15+ for the current jsdom engine requirement.

## Run, preview and rollback

Use npm ci, npm run dev, npm run build and npm start. For explicitly enabled local staging, populate ignored .env.staging.local from .env.example, then npm run dev:staging. Public settings require rebuilding for deployment. See ../../DEPLOYMENT.md for Next.js preview settings, auth templates and boundaries.

No production deployment, domain cutover or database mutation occurred. Roll back using the prior deployment/source revision above and the prior VITE_* environment mapping; no database rollback is needed. Retain the prior deployment until provider and independent-review gates pass. Caffi.pro and P1–P5 work remain outside N1.
