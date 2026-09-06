# ARO-UX0 Verification

> **Package:** ARO-UX0 — Opportunity Formation Frontend Prototype
> **Spec:** 1.0.0
> **Base:** `main` `2e0a97f` (PR #34 merge)
> **Branch:** `feat/aro-ux0-opportunity-prototype`
> **Pull request:** [#35](https://github.com/leonartist7/ARO.club/pull/35)
> **Status:** IMPLEMENTED / CI VERIFIED / FOUNDER PREVIEW/PRODUCTION APPROVAL PENDING
> **Captured:** 2026-09-05

## Verified story

A visitor chooses one bounded synthetic want, contribution and context. The
browser immediately and deterministically forms one explainable prototype
possibility, lets the visitor edit or reset it, and performs no Supabase, Auth,
AI, realtime, location, payment or persistence work.

## Acceptance traceability

| ID | Implementation | Automated / visual evidence | Status |
|---|---|---|---|
| UX0-001 | authored first viewport + `OpportunityFormation` | ten responsive/theme captures; founder Preview review still required | PENDING FOUNDER |
| UX0-002 | `fixtures.js`, `formationMachine.js` | 27-combination unit test + focused E2E form/edit/reset | PASS |
| UX0-003 | translated prototype labels and truth section | locale test + E2E copy assertions + captures | PASS |
| UX0-004 | `UX0_PROTOTYPE_MODE = true`, `PrototypeAuthProvider`, guarded client and fail-closed legacy role route | unit boundary test + compiled seven-route network/account audit with synthetic Supabase-shaped build variables: 0 domain requests and no local player creation | PASS |
| UX0-005 | responsive field/control/result composition | 360, 390, 430, 768×1024, 1440 in light/dark; 0 overflow; no clipped field anchors | PASS |
| UX0-006 | native radio controls, restored edit/reset focus, state-aware semantic figure/text result, live region, reduced-motion CSS | keyboard/reduced-motion E2E; 44×44 minimum; rendered contrast evidence | PASS |
| UX0-007 | no dependency; route-local code; responsive WebP | bundle delta, 2.1 ms response, CLS ≤0.000301, image budgets | PASS |
| UX0-008 | original face-free editorial image + responsive variants | `ASSET_MANIFEST.md`, generated asset review and sizes | PASS |
| UX0-009 | existing tests/build and required hosted checks | PR #35 `static`, `browser-smoke`, `platform`, Vercel and review integrations green on `f19fb31`; platform run `33987770971`, quality run `33987770974` | PASS |
| UX0-010 | Preview creative approval | founder review pending; do not merge or release | PENDING FOUNDER |
| UX0-011 | all controls, validation, provenance, fixtures and result clauses use locale keys | complete key test for `en`, `fr`, `es`; E2E locale spot check | PASS |

Current acceptance: **9/11 PASS**, with only founder Preview and explicit
Production release approval remaining. This is not VERIFIED or SHIPPED.

## Review resolution

The substantive PR passes raised thirteen actionable findings: nine from Codex
review and four from CodeRabbit. All thirteen are resolved in the package: the callback is
truthfully unavailable, rendered rationale contrast is 5.74:1, canonical
measurements match machine evidence, figure semantics track zero/one/two/three
selections, edit/reset restore focus, and the formation owns a level-two heading.
The release sequence names both Preview and Production approval, account-route
errors are included in evidence, both timing observers are bounded, and the
initial implementation commit is recorded. The legacy `/choose-role` entry now
redirects to the fail-closed login boundary, clearing an anchor restores focus
to that anchor's first radio, and the rendered People/Place/Time labels measure
13.59:1. Focused E2E assertions cover each behavioral resolution.

## Automated checks

| Command | Result |
|---|---|
| `npm run lint` | PASS, zero warnings |
| `npm test` | PASS, 73/73 tests across 5 files |
| focused `e2e/ux0.mjs` | PASS, 9/9 checks |
| `npm run test:e2e` | PASS, 25/25 checks from a cold server with synthetic Supabase-shaped variables |
| `npm run build` | PASS, 2,606 modules |

Vite/Vitest continue to print the inherited stale browser-data advisories, and
Rollup continues to print the inherited shared-chunk advisory. UX0 adds no
dependency and does not change those toolchain inputs.

## Browser / responsive / console matrix

The compiled production bundle was built with synthetic
`VITE_SUPABASE_URL=https://ux0-network-boundary.supabase.co` and a synthetic
browser-key string, then served locally. This proves the source-controlled
prototype override wins even when variables are present. No real credential or
provider was used.

| Viewport | Light | Dark | Overflow | Smallest UX0 target | Console / failed requests |
|---|---|---|---:|---:|---|
| 360×800 | [capture](screenshots/360-light.jpg) | [capture](screenshots/360-dark.jpg) | 0 px | 44×44 | 0 / 0 |
| 390×844 | [capture](screenshots/390-light.jpg) | [capture](screenshots/390-dark.jpg) | 0 px | 44×44 | 0 / 0 |
| 430×932 | [capture](screenshots/430-light.jpg) | [capture](screenshots/430-dark.jpg) | 0 px | 44×44 | 0 / 0 |
| 768×1024 | [capture](screenshots/tablet-768x1024-light.jpg) | [capture](screenshots/tablet-768x1024-dark.jpg) | 0 px | 44×44 | 0 / 0 |
| 1440×1000 | [capture](screenshots/desktop-1440-light.jpg) | [capture](screenshots/desktop-1440-dark.jpg) | 0 px | 44×44 | 0 / 0 |

Every capture contains the same formed fixture result. Full machine-readable
measurements and request inventories are in `browser-evidence.json`.

## Accessibility evidence

- keyboard-only radio selection produces the same result as pointer input;
- visible focus uses the existing primary focus ring and offset treatment;
- the field is a labelled figure with a semantic relationship caption;
- formed people/place/time and all three rationale clauses exist in text;
- the completed result is announced through a polite atomic live region;
- reduced motion shortens transitions to `0.000001s` and preserves the same result;
- edit and reset return focus to the first signal control instead of the document;
- all UX0 interactive targets measure at least 44×44 CSS pixels;
- each captured page has one `main`, one `h1`, a non-empty image alternative,
  no unnamed visible interactive controls and no clipped diagram anchors;
- representative approved token contrast ratios: Ink/Bone 13.59:1,
  white/Primary-600 5.74:1, Bone/Ink 13.59:1 and Secondary-300/Ink 9.09:1.
- the actual rendered rationale paragraph computes to white `rgb(255, 255, 255)`
  on Primary-600 `rgb(190, 50, 25)`, or **5.74:1**.
- the actual rendered People/Place/Time labels compute to Ink `rgb(40, 36, 32)`
  on Bone `rgb(246, 240, 230)`, or **13.59:1**.

## Network and account boundary

Audited compiled routes:

- `/`
- `/login`
- `/signup`
- `/forgot-password`
- `/auth/callback`
- `/choose-role`
- `/leaderboard`

Result: **0 Supabase-domain requests**, **0 failed requests**, **0 console
warnings/errors**. Login, signup and recovery remain disabled. The callback
route shows translated unavailable copy, creates no session and does not perform
the prior success redirect. `/choose-role` redirects to the disabled login
boundary and cannot create a legacy local player; `/leaderboard` renders no
simulated signed-in rank. The static `PrototypeAuthProvider` is mounted instead
of initializing the connected `AuthProvider` while UX0 mode is on.

No API, migration, RLS, realtime channel, analytics, remote write, P1 field,
payment, Google, AI or location behavior was added.

The first hosted `platform` run passed fresh-runner, loopback binding, clean
reset, 81/81 SQL, synthetic Auth/API and Trust phases, then correctly exposed an
outdated browser assumption that login would be enabled. The hosted browser
phase now follows the source-controlled mode: while UX0 is on it verifies
disabled login inputs, the non-redirecting callback, protected-route rejection,
light/dark responsiveness and zero application requests to the local Supabase
API. The underlying disposable Auth lifecycle continues separately. This makes
the required check truthful; it does not satisfy or waive parent-I0 hosted Auth.
The corrected hosted run passed the complete disposable sequence, including
81/81 SQL checks and the prototype browser boundary, in run `33987770971`;
`static` and `browser-smoke` passed in run `33987770974`.

## Performance and bundle evidence

| Measure | Baseline | UX0 | Delta / budget |
|---|---:|---:|---:|
| Home chunk gzip | 2.75 kB | 6.14 kB | +3.39 kB |
| Global CSS gzip | 13.92 kB | 15.04 kB | +1.12 kB |
| Shared entry JS gzip | 230.09 kB | 188.84 kB | −41.25 kB |
| Initial JS+CSS gzip (named assets) | 246.76 kB | 210.02 kB | −36.74 kB; ≤+35 kB PASS |
| Generated image selected per viewport | none | 52.43 or 126.30 kB | ≤250 kB PASS |
| Formation response begins | N/A | 2.1 ms | ≤100 ms PASS |
| CLS across matrix | 0.000103 at 1440 baseline | max 0.000301 | ≤0.10 PASS |
| Local compiled FCP across matrix | 1,036 ms dev baseline | 708–936 ms | diagnostic only |

Compiled homepage loads used 10 requests per capture. Mobile/tablet transferred
266,007 bytes and desktop transferred 339,879 bytes in the local production
preview. The image is below-fold and lazy-loaded. Exact generated asset and all
dist sizes are in `bundle-evidence.json`.

## Scope and release boundary

- Tonguee source, repository, provider and data were untouched.
- `aro-platform` (`jjgccfrwjkwknyjtbtxa`) was untouched and remains quarantined.
- No provider or Production configuration/data was changed.
- No new dependency, paid resource, Stripe, Google, key rotation or history
  rewrite was introduced.
- Parent I0 remains gates-blocked; P1 remains unauthorized.
- Merge remains prohibited until founder approval explicitly includes the
  automatic Production release.
