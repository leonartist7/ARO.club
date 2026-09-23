# Shared implementation contract

Status: PROPOSED for EF-P/C/I/S/X. Existing approved scopes retain their own authority. This is the common portion of the package-template contract; `PACKAGES.md` provides package-specific behavior and ownership.

## Template coverage and invariants

| Template sections | Contract |
|---|---|
| 0–5 Metadata/problem/outcome/goals | Per package in PACKAGES; source pin and adoption record added at execution |
| 6 Invariants | Existing ARO identity, synthetic-only boundary, existing route semantics, explicit human control, no paid trust or pressure mechanics |
| 7 Personas/permissions | Anonymous preview visitor; no new account role or permission |
| 8–9 Journeys/state | Per package; all new preview transitions are synchronous local UI operations |
| 10 Data | Source-controlled fictional fixtures and React state; no migration, storage, retained input, new profile fields or uploads |
| 11 RLS | No changes; no new server entities to authorize. Existing guards remain intact |
| 12 Privacy | Never request real location, identity, availability or sensitive intent; user-entered proposal text stays in memory and out of URLs/logs |
| 13 Trust/safety | Preserve existing status and safety copy; synthetic circles never imply verified attendance or trusted strangers |
| 14 Money/entitlement | No charge, price commitment, upgrade, balance, ownership claim, redemption or entitlement write |
| 15 AI | No generation service or AI authority; deterministic composition only |
| 16 API | No new API, SDK call or external write; reuse safe existing navigation only |
| 17 UI states | Detailed below and in each package |
| 18–20 Responsive/a11y/performance | Rules and measurable targets below |
| 21 Reliability | Reload restores documented fixture defaults; preserve browser history; invalid identifiers fail safely |
| 22 Analytics | No new analytics events, identifiers, session replay or telemetry |
| 23–24 Tests/evidence | ACCEPTANCE.md plus per-package requirements |
| 25 Rollout | Draft PR and authorized preview only; existing release gates remain |
| 26 Rollback | Revert only the package commit(s); no data migration rollback necessary |
| 27 Security review | Verify zero new external writes/storage, no guard changes; specialist gate if scope changes |
| 28 Product review | Review mobile hierarchy, truthful preview copy, complete task path, all locales and meaningful return loop |
| 29 Verified | Every required evidence row passes at a pinned commit and required independent review is recorded |
| 30 Delivery | Final SHA, diff scope, evidence paths, results, gaps, reviewers and rollback record |

## Interaction architecture

Keep route wrappers in `src/app/app/`; screens live in `src/views/` or existing feature components. Do not revive obsolete `src/pages/` paths. Use existing navigation abstraction, language and theme contexts. Avoid extracting a universal component until two actual screens share behavior. Good candidates are a page heading, inline preview notice, object tile, labeled empty state and accessible detail dialog.

Use URLs for actual navigable destinations; use component state for a dialog, selected chapter, view mode or unsaved composition. Do not put sensitive/free-text input in URLs. Back must close or return in the way the existing routing pattern promises. Unknown IDs produce an intentional not-found state and a known safe destination, never an unrelated first item disguised as a match.

Local selection → preview is synchronous. Do not fake a network spinner or timed AI thinking. If an image fails, keep its allocated geometry and show the object name plus a quiet fallback. Route-loading treatment belongs to the existing navigation boundary; add it only where actual waiting exists. No retry action that cannot retry a real failed operation.

All modal surfaces require accessible title, initial focus, contained keyboard focus, Escape dismissal and focus restoration. On phones use a full-width sheet with scrollable content and visible close action; use the same semantics on desktop. A drag action must have buttons/selectors that achieve the same result. Dismissal must not silently commit an edit.

## Visual grammar

Use Bone and Ink as the quiet base, Vermilion for the main action, Moss for contribution, Saffron for discovery, Clay for human warmth, Plum for night scenes and Sky for exploration. Reuse token names already in the repo; exact colors are governed by `ARO_DESIGN_SYSTEM.md`. Essential text should sit on a controlled surface rather than across detailed artwork.

DM Serif Display expresses possibility in headings; Manrope carries decisions and forms. Prefer one expressive title, one clear sentence and one dominant action in the initial viewport. ARO's signature element must explain the screen: Orbit for forming possibility, closed Circle for commitment, Portal for creation, Path for Season, Constellation for memory. Avoid repeating the same ornamental ring behind every card.

Spacing proposals: 4/8/12/16/24/32/48/64 CSS px. Body text 16px minimum; metadata 14px only where secondary and comfortably legible. Phone headings 32–40px, desktop 48–64px where content permits; never crop titles with fixed heights. Do not introduce new fonts. Use a consistent corner hierarchy: 12px controls, 20px cards, 28px scene containers, round avatar. Adopt these refinements only where compatible with existing approved tokens.

## Responsive rules

| Width | Composition |
|---|---|
| 320–599 | One content column, 16px gutters; personalization native page selector; all key actions reachable without horizontal scrolling |
| 600–1023 | 24px gutters; two object columns where each retains its full label; content before supporting panels |
| 1024+ | Existing desktop rail; centered content up to 1200px; primary content plus 320–360px decision panel where useful |

Use content constraints, not device detection. Sticky action areas include safe-area inset and leave scroll padding so focused fields and final content remain visible. Test virtual keyboard open, landscape and short viewport. No hover-only feature. Browser emulation is not a physical iPhone/Android result.

## Accessibility and motion

Target WCAG 2.2 AA. Product target is 44×44 CSS px minimum for interactive controls, preferably 48px for primary phone actions; this is intentionally stronger than WCAG's 24px minimum with exceptions. Preserve visible focus, 4.5:1 normal-text contrast and 3:1 large-text/control contrast where applicable. Check 200% text sizing and reflow at 320 CSS px. Selection is conveyed with text/icon/state, not color alone. Use buttons for actions and links for navigation.

Proposed motion tokens: press feedback 100–140ms, selection 160–200ms, sheet 220–280ms, one-shot scene settling up to 400ms. These are design choices, not platform requirements. Animate opacity/transform, never layout-heavy perpetual motion. Respect `prefers-reduced-motion`; eliminate spatial translation, parallax and ambient loops. No automatic sound, haptics promises or forced confetti. Reward feedback is permitted only for an actual local preview action and must not imply an earned entitlement.

Sources checked September 23: [WCAG 2.2](https://www.w3.org/TR/WCAG22/), [WAI quick reference](https://www.w3.org/WAI/WCAG22/quickref/), [Apple accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility), [Apple motion](https://developer.apple.com/design/human-interface-guidelines/motion). These sources guide interaction quality; they do not certify this application.

## Performance contract

Before implementation, capture the exact Next.js source SHA, build, environment, browser, cache mode, route and viewport. Compare before/after in that same setup. Older Vite budgets and F7 measurements cannot be transplanted silently to Next.js. F7 owns its controlled host and adopted acceptance thresholds; this package cannot redefine them.

Proposed additional local budgets: zero new runtime dependencies; zero new external requests; no more than 10KB gzip route JS growth or 3KB gzip CSS growth per package without a documented scope decision; initial visible image transfer at most 400KB on phone and 600KB desktop; CLS ≤0.1; lab LCP ≤2.5s and interaction response ≤200ms in a declared repeatable profile. Existing stricter adopted ceilings win. If the inherited baseline already exceeds a ceiling, record it as a blocker/deviation requiring disposition, not a pass or permission to hide the measurement.

Use responsive AVIF/WebP exports with intrinsic dimensions. Load only the initial scene eagerly; defer hidden chapter and object imagery. CSS/SVG should handle simple geometry. No WebGL renderer for a static room. Treat a generated PNG as an art master, not a production payload.
