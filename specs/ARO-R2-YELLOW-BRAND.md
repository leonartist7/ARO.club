# ARO-R2 — Yellow / orange and Noise Order

## 0. Metadata
- Spec version: 1.0.0
- Status: IMPLEMENTED / REVIEW PENDING (reconciled candidate on current `main`; founder visual review and PR gates pending)
- Authorization: founder request, 2026-09-26, yellow primary, orange secondary, attached Noise Order for main titles and branding.
- Governing documents: AGENTS.md, ARO_DESIGN_SYSTEM.md, ARO_EXPERIENCE_SYSTEM.md. This explicit brand request supersedes their prior palette/heading font only.
- Depends on: existing R1 / UX0 / N1 local application. No downstream gates change.
- Integration branch: `codex/r2-yellow-brand-reconcile-20260927`, based on current `main`. The original migration checkout and its uncommitted work remain preserved.

## 1–6. Problem, outcome, scope and invariants
Replace the existing red/saffron identity with yellow/orange and the supplied Noise Order title face. Apply shared tokens, readable button treatments, main headings, ARO wordmarks, circular brand mark, and browser theme/icon. Preserve body typography, content, routes, semantic status colors, accessibility, Tonguee and Coco.

## 7–16. Product and data boundaries
Personas, permissions, journeys and state transitions remain unchanged. Data, migrations, authorization, privacy, Trust, money, AI and server contracts: N/A; this package changes presentation only.

## 17–19. UI, responsiveness and accessibility
Use yellow #F4D000 and orange #F58220 with deeper shades for small text. Dark ink on bright fills. Use locally hosted Noise Order regular for main titles and brand text, with sans fallback and font-display swap. Preserve the supplied glyphs, including the inner-circle o. Keep small utility headings/body copy in Manrope. Check 360px and 1440px in light/dark modes; keyboard focus, existing reduced motion and semantics remain intact.

## 20–23. Performance, reliability and checks
Existing typography uses remote Manrope/DM Serif. New local font is 619560 bytes; budget <= 620 KB added font bytes, no runtime dependency or new JS feature. Font failure uses sans fallback. No analytics changes. Run build/lint, inspect browser font load, overflow, console, navigation and screenshots. Preserve license alongside supplied font. No backend/RLS tests required for presentation-only changes.

## 24. Acceptance criteria
| ID | Requirement | Verification |
|---|---|---|
| R2-1 | Yellow primary, orange secondary | Tokens and browser computed colors |
| R2-2 | Supplied Noise Order titles/wordmark | Font load and visual inspection |
| R2-3 | Inner-circle brand motif | Wordmark, mark and browser icon inspection |
| R2-4 | Readable controls and responsive themes | 360/1440 light/dark screenshots and contrast checks |
| R2-5 | Application still builds | Build, lint and focused existing tests |

## 25–30. Delivery and recovery
Integrate through a separate PR after founder visual review; production deployment is not part of this package. Recover by reverting only R2 changes. Record checks and limits in artifacts/ARO-R2/VERIFICATION.md. No independent security review is required because no security boundary changes.
