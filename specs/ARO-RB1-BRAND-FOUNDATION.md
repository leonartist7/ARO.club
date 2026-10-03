# ARO-RB1 — Orange brand foundation

## 0. Metadata

- Status: IMPLEMENTED / PARTIAL VERIFICATION on branch; version 1.0.0; founder-approved creative direction, 2026-09-27. See `artifacts/ARO-RB1/VERIFICATION.md`.
- Depends on RB0 adoption. Branch/PR: a dedicated branch and PR based on the reviewed RB0 head.
- Governing: `AGENTS.md`, `ARO_DESIGN_SYSTEM.md`, `ARO_EXPERIENCE_SYSTEM.md`, `specs/ARO-R2-YELLOW-BRAND.md` as historical baseline.
- Review: founder direction approved; independent review and release remain separate.

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
