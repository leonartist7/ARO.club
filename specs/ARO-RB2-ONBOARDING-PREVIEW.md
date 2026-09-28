# ARO-RB2 — Truthful onboarding vertical slice

## 0. Metadata

- Status: IMPLEMENTED ON BRANCH / MERGE GATED for **nonpersistent preview only**; version 1.1.0; founder-approved rebranding request, 2026-09-27. Independent privacy/security review has not been recorded.
- Depends on RB1. Dedicated branch/PR, based on reviewed RB1 head.
- Governing: `AGENTS.md`, `ARO_DESIGN_SYSTEM.md`, `ARO_EXPERIENCE_SYSTEM.md`, `ARO_TRUST_SAFETY.md`, existing Auth/onboarding contracts.
- Live age/profile persistence, role migration, analytics and host publication require a separate specialist-reviewed runtime spec.

## 1. Outcome and journeys

Three brief, replayable and skippable scenes show learning, possible paid teaching and a choice: Find a class / Teach a skill / Explore both. Skip bypasses only the introduction. Setup then asks name and age, manually selected coarse city, and interests or a starting skill/outcome. The preview finishes with an honestly labelled relevant opportunity example or editable class draft. “Both” starts with discovery and retains a visible host shortcut. Back/edit preserve entered state; a refresh resets this nonpersistent preview with a clear notice.

## 2. Privacy, Trust and behavior boundary

The preview uses in-memory React state only. No name, age, city, interest or skill is sent to Supabase, analytics, localStorage or URL. Age is required to complete the sample flow but does not assert eligibility, verification or a legal threshold. It explains that live eligibility rules are pending a separate specification. **Do not merge RB2 until independent privacy/security review approves name/age collection, consent notice, minor/vulnerable-user handling and the nonpersistence evidence.** The teaching preview is limited to adult public-place language/community fixtures; a free-form skill must not be echoed as an apparently eligible class draft. Closed and moderate-risk categories in `ARO_TRUST_SAFETY.md` remain unavailable, including childcare, fitness and food preparation. No income, demand, review, booking, progress or verified status is fabricated. Existing authenticated student/teacher onboarding behavior is retained until the live migration spec is approved; preview has its own route and clear entry from the public experience. Existing deep links are not redirected into a new unapproved identity write.

## 3. UI contract

Use localized EN/FR/ES copy through the existing language context, ThemeContext and shared primitives. The introduction never auto-advances or requires swipe; art carries no UI text. Scene choice, skip, back, validation, manual city entry, empty result, edit draft, completion and retry have meaningful text and keyboard actions. Use an explicit example disclosure throughout. Keep the main CTA visible on short phones without obscuring fields when the software keyboard opens; respect reduced motion and safe areas.

## 4. Verification and recovery

Exercise all three branches, skip/back/edit, invalid name/age, city entry, no-supply example, refresh reset and navigation. Assert zero persistence/network writes for preview input. Check 320/360/390/430/768/1440 widths, short height, themes, locales, keyboard, semantics and 200% text. Run build/lint/type checks and relevant tests; compare screenshot and asset transfer against baseline. Revert only RB2 preview code/assets if needed; no data rollback exists.

| ID | Criterion | Evidence |
|---|---|---|
| RB2-1 | All intro and task paths reach a useful honest preview | E2E path matrix |
| RB2-2 | Setup validation, back/edit/skip and keyboard work | tests and browser captures |
| RB2-3 | Input remains in memory and example claims are explicit | source/network/storage audit |
| RB2-4 | Responsive, themed and localized results are usable | screenshot/semantic matrix |
| RB2-5 | Existing live Auth/Trust/onboarding routes stay intact | route regression checks |

Do not mark live onboarding implemented from this prototype. Independent privacy/security review is required before RB2 merge and again for any later persistent runtime package.
