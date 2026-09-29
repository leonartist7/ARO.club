# RB16 visual coherence evidence

Status: IMPLEMENTED / PARTIAL VERIFICATION. Unmerged; no production-ready or release claim.

## Source and boundary

Remote RB15 was verified through `git ls-remote` at `a0cef112380f34f9c47c2a7e160fbbe4561fcf2e`; PR #90 was open/draft with the same head. An isolated scoped worktree branches directly from that combined head. No main-based reconstruction, owner-branch rewrite, dependency/lockfile change, provider/data/Auth/Trust/payment change or F7 evidence edit.

Spec: [ARO-RB16-VISUAL-COHERENCE.md](../../specs/ARO-RB16-VISUAL-COHERENCE.md), version 1.0.0. The approved reference was visually inspected at `docs/rebrand/reference/ARO-approved.png`.

## Rendered findings and corrections

| Surface | Before | Correction / comparison with reference |
| --- | --- | --- |
| Create | Full dark canvas in light mode; long heading; ingredient labels overlap diagram intro; vertically stacked modes | Warm ivory canvas, readable dark text, shorter English heading above actions, three compact mode choices, flowing ingredient grid and yellow possibility circle; dark variants retained |
| App Home | Greeting/location panels and dark gradients cover portal artwork; large dark container | Labels above complete artwork, ivory opening card and white stage; orange first-action field retained |
| Opportunity list | Desktop image column stretches to text height, leaving huge gray bands; step numbers split | Intrinsic 3:2, top-aligned complete image, rounded cards/tags, nonshrinking step markers |
| Opportunity detail | Dark hero in daylight; tight heading; 11–12px logistics/disclosures | Ivory/white hero, complete unobstructed art, readable heading, 16px logistics/preview terms; fictional host label immediately next to fixture identity |
| Shared app | Inconsistent primary heading scale; narrow central exit wraps below its allocated label area | Larger primary headings and compact centered exit label; existing navigation destinations retained |
| Preferences | Motion ignores reduced-motion request; no arrow menu navigation | Motion-safe transforms; Up/Down wrap, Home/End focus, Tab exit and Escape focus return; existing persistence retained |
| Public/onboarding/account | Existing RB13/RB15 visual hierarchy is already close to reference | Inspected and retained, including full 4:3 onboarding art, orange/ivory public entry, compact footer and disabled account entry |

## Before / after gallery

All 28 baseline and 28 final core-route renders are retained at four viewports: 320×620, 390×844, 768×900 and 1440×900. Full-page screenshots include the fixed bottom navigation at its initial viewport position; scrolling moves page content behind that fixed bar normally. These captures are browser evidence, not native-device certification.

| Route | Phone before / after | Desktop before / after |
| --- | --- | --- |
| Public Home | [Before](before/public-home-320.png) · [After](after/public-home-320.png) | [Before](before/public-home-1440.png) · [After](after/public-home-1440.png) |
| Onboarding | [Before](before/onboarding-320.png) · [After](after/onboarding-320.png) | [Before](before/onboarding-1440.png) · [After](after/onboarding-1440.png) |
| App Home | [Before](before/home-390.png) · [After](after/home-390.png) | [Before](before/home-1440.png) · [After](after/home-1440.png) |
| Explore | [Before](before/explore-320.png) · [After](after/explore-320.png) | [Before](before/explore-1440.png) · [After](after/explore-1440.png) |
| Opportunity list | [Before](before/opportunities-390.png) · [After](after/opportunities-390.png) | [Before](before/opportunities-1440.png) · [After](after/opportunities-1440.png) |
| Create | [Before](before/create-320.png) · [After](after/create-320.png) | [Before](before/create-1440.png) · [After](after/create-1440.png) |
| Opportunity detail | [Before](before/detail-390.png) · [After](after/detail-390.png) | [Before](before/detail-1440.png) · [After](after/detail-1440.png) |

## Local verification

- `npm ci --no-audit --no-fund` used the frozen lockfile. Node 24.11.0 emits the existing jsdom engine warning (its declared floor is 24.15.0); no dependencies were changed.
- Ordinary `npm run build` (Turbopack) passed. Earlier baseline/changed webpack builds also passed. Existing Browserslist age notice retained.
- `npm run lint -- --max-warnings=0` passed; the first attempt caught an unused import after removing the fictional greeting and it was removed.
- `npm run type-check` passed.
- Full unit suite via supported Vitest runner config loader: 190 passed, 3 existing browser-gated skips, 22 files.
- Existing F4/F5/F6 browser suite: 32 passed; 80 F4, 20 F5 + 4 zoom, 40 F6 + 8 zoom observations. F4 selected system Chrome; F5/F6 used installed Playwright Chromium revision 1234. These are visual regression checks, not F7 controlled measurement.
- Full existing E2E: all 25 checks passed, including disabled accounts, local-identity rejection, public/protected sweeps, responsive and dark mode.
- RB14 ordinary preferences browser matrix: all 17 paths passed, including FR/ES, theme persistence, 200% text scaling and keyboard focus. Copied results: [preferences-browser.json](preferences-browser.json).
- RB16 baseline and final ordinary-build matrix: each passed 28 core screenshots plus 36 supporting routes. Zero recorded page exceptions, non-GET requests or horizontal overflow. Final keyboard checks include arrow focus, End, Escape, Tab exit and theme toggle. [Before results](before/browser.json), [after results](after/browser.json), [dark Create](after/create-dark-390.png).
- New captures reuse existing image/font assets; first mobile onboarding exports remain 65,630 bytes (connect), 62,540 bytes (learn), 54,702 bytes (teach-language), below the existing 250KB target. No Core Web Vitals improvement or full accessibility certification is claimed.

The final exact-head hosted workflow also reruns the complete acceptance suites and RB16 captures. English/light local build/check and hosted results are recorded below once observed.

## Inherited CodeRabbit findings from PR #90

1. RB13 stale retry statement: corrected to recorded historical pass, without replacing old results.
2. RB15 status drift: append-only exact-head reconciliation records Quality `36593625126` and isolated `36593625117` success on `a0cef112`; chooser passed only after rerun, root cause remains open.
3. Reduced motion: valid; hover translation and chevron rotation now motion-safe.
4. Language menu arrows: valid; wrapped navigation and Home/End added, unit and browser checks cover focus/exit behavior.

These fixes are scoped here; PR #90 conversations were not self-resolved. RB16 CodeRabbit review and final-head CI must be examined separately.

## Remaining issues and release decisions

1. Independent design/accessibility approval of this combined result is still required, including screen-reader, native mobile browser zoom and full-route contrast/focus review. Small nonessential eyebrow/status text remains in supporting fixtures.
2. Authenticated host/admin/application content cannot be visually certified from a signed-out preview; current checks verify protected redirects only. A separately authorized isolated Auth lane must supply those renders.
3. App fixture content still contains English-only descriptions and legacy synthetic qualification/price/demand wording. It remains explicitly fictional; broader Trust/content acceptance and complete FR/ES/dark polish are open.
4. Polymath licensed web assets are absent; approved Manrope fallback remains. Existing artwork differs from the reference's exact four-person composition; no raster reference logo or fabricated human evidence was introduced.
5. RB0 open conversations, RB2 independent privacy/eligibility/security/Trust, RB4 Trust/persisted-fixture review, RB5 Contact draft retention/deletion specification and review remain blocking release-stack decisions.
6. Platform document-chooser intermittency remains unresolved from RB15, even when a rerun passes. F7, production Auth/SMTP, live inventory/bookings/payments, native packaging and production smoke/release gates remain separate and open.

CodeRabbit is defect review, not any of the independent decisions above. This PR is ready for code review but must remain unmerged.


### Local English/light build

`NEXT_PUBLIC_ARO_RELEASE_SCOPE=english-light npm run build` passed with the existing Browserslist notice. The ordinary build and 17-path preference matrix passed separately.
