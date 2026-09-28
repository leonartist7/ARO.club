# ARO-RB1 — Orange brand foundation

## 0. Metadata

- Status: SPEC-READY for presentation scope; version 1.1.0; founder-approved creative direction, 2026-09-27; updated 2026-09-28.
- Owner/director: ARO founder; implementation engineer: Codex. Implementation branch `codex/rb1-orange-foundation-20260927`, PR #73. Depends on RB0 PR #72 and blocks RB2 PR #74.
- Governing: `AGENTS.md`, `ARO_DESIGN_SYSTEM.md`, `ARO_EXPERIENCE_SYSTEM.md`, `specs/ARO-R2-YELLOW-BRAND.md` as historical baseline.
- Required review: independent design/accessibility and code review of the shared shell, tokens, fonts and metadata; security/privacy/Trust/payment reviewers only if the diff crosses those boundaries. Founder direction is approved; review and release remain separate.

## 1. User outcome and scope

Users recognize one consistent ARO mark, type hierarchy and action language across shared public/app shells and onboarding primitives in light/dark modes. This package changes shared presentation, SVG/logo assets, font delivery and metadata only. No new dependency, schema, role, authorization, booking, provider or payment behavior.

## 2. Implementation contract

- Introduce semantic brand/action/surface/text/focus tokens and compatibility mappings for existing Tailwind classes. Preserve semantic danger, warning, info, Trust and Tonguee-specific treatments.
- Use brand orange `#F05A28` for signature fields, `#C94320` for white-label primary controls, yellow `#FFD447` with charcoal text, ivory `#FFF8EE`, charcoal `#252420`, green `#27834A` and darker `#206D3D` for light-theme green text. Audit actual dark combinations.
- Remove Noise Order from ARO headings and wordmark. Use existing Manrope with 700 heading fallback until licensed Polymath Display WOFF2 assets and use rights are verified. Avoid new font purchase or duplicate remote imports.
- Draw one controlled open-O SVG with a single detached upper-right dot; export symbol, wordmark, reversed/monochrome forms and icon. Test 16/24/32/48px and linked-logo accessible naming.
- Align shared Button/Input/Card/Empty/Error/Loading controls and shells for 44px targets, visible focus, readable body/labels, reduced motion, translation expansion and honest preview disclosure.
- Update theme color/social metadata only to verified assets and origin; never point at unverified `aro.club` URLs.

## 3. States, budget, verification

Existing behavior and routes remain. Test interactive/disabled/validation/loading/empty/error/success states, EN/FR/ES, light/dark, 320/360/390/430/768/1440 widths and 200% text. Baseline R2 includes 619,560-byte Noise Order OTF; removing it should reduce local display-font transfer. First mobile illustration target is at most 250 KB compressed unless an exception is evidenced. Build, lint, type check, relevant tests, focused browser checks, contrast and screenshot review are required.

| ID | Criterion | Evidence |
|---|---|---|
| RB1-1 | Tokens and contrast roles match approved direction | computed colors and contrast matrix |
| RB1-2 | One SVG geometry is used consistently | icon/header/wordmark captures at small and large sizes |
| RB1-3 | Fonts load legally with controlled fallback | rights/source record and network inspection |
| RB1-4 | Shared controls work in themes/locales/accessibility states | browser matrix and automated checks |
| RB1-5 | No runtime authority or route regression | diff audit and existing checks |

Rollback is a presentation-only revert on its branch/PR. Record measured asset deltas and any incomplete review before status change.

## 4. Complete package boundary

**Problem and timing.** R2's yellow/Noise Order presentation conflicts with the newly approved orange identity, and shared tokens and navigation currently disagree between public and app surfaces. RB1 follows the RB0 inventory so the same controlled mark, font and accessible actions can support the onboarding and public-page packages. Goals are consistent brand geometry, hierarchy, colors, focus and honest preview framing. Non-goals are new routes, live inventory, account authority, eligibility, category expansion, payments, purchase of Polymath assets, and claiming trademark uniqueness.

**Personas, permissions and state.** Anonymous visitors and signed-in learners, hosts and admins may read the same shared presentation; RB1 grants none of them new create, update, delete or publish authority. Existing server Auth/RLS and role checks remain decisive. Theme choice uses the existing ThemeContext and language choice uses the existing localization context; `light ↔ dark` and `EN ↔ FR ↔ ES` change presentation only. Loading, empty, validation, pending, success and error content retains the existing underlying state and action. A stale preference falls back to the current context default. There is no new state machine for persisted business objects, database entity, migration, RLS rule, API endpoint or service-role operation.

**Privacy, Trust, money, AI and analytics.** No new personal data, precise location, consent, retention period, analytics event, AI input/output, subscription entitlement, price, payout or provider call is introduced. Existing privacy, Trust category and publication boundaries remain unchanged. Decorative people in the approved reference and RB1 assets must never be represented as actual hosts or reviews. These domains are N/A to the RB1 code change for that reason, rather than implicitly approved. Any later live use needs its own governed package.

**Failure and recovery.** A missing optional Polymath asset uses the existing licensed local Manrope 700 fallback; a font or image load failure leaves semantic text and actions usable. Invalid theme/language preference uses the existing fallback; a broken deep link uses the retained route recovery. Duplicate clicks and provider timeouts do not gain a new mutation path. Rollback reverts the RB1 presentation commit while preserving RB0 and the current-main local Manrope files. No destructive data operation or user-data migration occurs.

**Performance and measurement.** Current main's local Manrope WOFF2 subsets are the font baseline after PR #83; RB1 adds no second remote font import. The removed Noise Order file was 619,560 bytes. Mobile illustrations target at most 250 KB compressed; log any exception and the actual transferred bytes in `artifacts/ARO-RB1/VERIFICATION.md`. Compare the 320px Home image/font requests and route bundle with the baseline before a performance claim. LCP, INP and CLS require a measured production baseline; no numeric improvement is asserted here. API latency, cache invalidation, list pagination, realtime lifecycle and AI cost are N/A because this package creates none of those flows.

**Rollout and sign-offs.** Land RB0 first, then RB1 after required independent review, hosted Quality/isolated-database checks, and visual/keyboard inspection of public and app shells. Keep the PR separate from RB2. If a focus, contrast, font or route regression appears, revert RB1 rather than changing Auth or Trust gates. The founder's creative approval does not approve accessibility, licensing or release.

**Definition of done.** RB1-1 through RB1-5 each need linked evidence in `artifacts/ARO-RB1/VERIFICATION.md`: computed contrast and captures; SVG geometry comparison; local-font license/network inspection; EN/FR/ES and light/dark responsive keyboard states; lint/type/build/test and route-regression checks. Record unresolved full-route screen-reader and performance work as limits. Mark VERIFIED only after those checks and independent review; mark SHIPPED only after the separate release gate.
