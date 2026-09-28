# RB3 discovery and Create presentation — implementation ledger

Status: **IMPLEMENTED / PARTIAL VERIFICATION** on `codex/rb3-public-discovery-20260927`, stacked on RB2. This package changes presentation and preview navigation only.

## Completed criteria and evidence

| Criterion | Evidence |
|---|---|
| Public promise, benefits and three task paths | Home first-fold captures at 320 EN light, 390 ES dark, 1440 FR light; routes link to onboarding, Explore and host guidance |
| Honest public discovery | `/explore` hides the dated fixture catalogue because none has verified live provenance; 360 EN and 1440 FR captures show the useful no-supply state and next links |
| Useful app first step; no fictional personal progress | App Home first-fold captures at 360 EN and 1440 ES; removed the synthetic 62% Season progress UI |
| World/Create continuity | World 390 FR and Create 320 EN/1440 ES captures; Create task entrances select, scroll and focus the updated composition; the Home gathering link lands with Gather selected |
| Truth and landmarks | Footer names the enforced teacher gate; the formation anchor has a visible preview boundary; empty Explore has one main landmark |
| Theme, locale, widths | Refreshed `browser.json`: ten sampled routes, 320–1440px, light/dark, EN/FR/ES, 200 response, zero page errors or horizontal overflow, with route-specific behavioral assertions |

Review repair on 2026-09-28: `npm run lint` and `npm run type-check` pass. Browser captures ran against Next webpack dev on port 3103 with installed Chrome, fonts ready, image decode and reduced motion. This worktree uses a junction to a sibling's locked dependencies because local disk space prevented `npm ci`; Turbopack build rejects the cross-worktree junction, and Vitest's esbuild cannot resolve its config through it. Hosted CI must confirm the production build and focused tests for this repair. The original package build/test results above remain historical evidence for the pre-repair commit, not validation of the new commit.

Representative comparison: [prior public Home at 390px](../ARO-RB1/home-390-light-fr.png), [RB3 Home at 1440px FR](home-1440-light-fr.png), [RB3 Home at 390px ES dark](home-390-dark-es.png), [prior app Home at 360px](../ARO-RB1/app-360-light-en.png), [RB3 app Home at 360px](app-360-light-en.png), [RB3 Explore empty state](explore-360-light-en.png), [RB3 Create at 320px](app-create-320-dark-en.png).

## Material limits and next work

- The existing `/experience/[id]`, `/teacher/[id]`, map, booking and related legacy deep links still consume dated fixtures with invented review/booking counts. RB3 removes the public Explore entrance to that catalogue but does not rewrite those governed flows. A separate fixture/deep-link package must remove claims safely while preserving route recovery.
- App World/opportunities remain explicitly fictional F1–F6 previews. Their formation counts are labelled examples; no live demand is claimed. Full route accessibility and localization remain to be audited.
- Typography asset licensing/local pinning, independent design/security/privacy review, live onboarding spec and production release gates remain open.
