# ARO-RB2 — Truthful onboarding vertical slice

## 0. Metadata

- Status: IMPLEMENTED ON BRANCH / MERGE GATED for **nonpersistent preview only**; version 1.2.0; founder-approved rebranding request, 2026-09-27. Independent privacy/security review has not been recorded.
- Owner/director: ARO founder. Implementation: `codex/rb2-onboarding-preview-20260927`, PR #74. Depends on RB1 PR #73; blocks any live onboarding migration. Public-entry follow-ups require their own package specifications and review gates.
- Required reviewers: independent privacy/security for name, age, city, consent and minor/vulnerable-user treatment; Trust for the teaching-category boundary; design/accessibility for release acceptance. No reviewer sign-off is recorded.
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

## 5. Goals, non-goals and permissions

The goal is a skippable visual introduction and a useful **local example** for each starting intent. This public route has no account requirement and creates no real profile, listing, application, booking or permission. It does not grant Host mode or publishing authority. Any visitor may advance, go back, edit or reset their own in-memory example; there is no server-side create/update/delete operation and no other-user data to read. Live eligibility, identity proofing, account migration, analytics, payment, publication and category expansion are explicit non-goals. The existing verified-teacher trigger and RLS remain the only publishing authority.

## 6. State, data and authorization contract

The legal UI progression is `opening scene → task choice → setup → example result`, with skip entering task choice, back/edit returning to earlier local steps, and refresh/leave resetting the preview. Validation keeps the visitor on setup with field-level guidance; an empty supply state offers an honest next action. No server state transition, audit event, retryable external write or idempotency key applies. Name, age, coarse city and interest/skill exist only in page memory during this visit, are never placed in a URL, storage, analytics or request, and disappear on refresh or leave. No migration, API endpoint, database entity or RLS policy is created or modified. Existing Auth and teacher application routes remain separate and protected by their current server and database controls.

## 7. Privacy, Trust, failure and review cases

The screen discloses the nonpersistent example before requesting values. City is manually chosen at coarse granularity; precise location is never requested. The visitor can stop, go back or reload to discard values. The preview does not decide legal eligibility from age; a specialist must approve the consent and minor/vulnerable-user treatment before merge. Teaching output uses only adult public-place language/community example fixtures. Free-form skills are not promoted into eligible listings, and closed or moderate-risk categories never become apparently authorized classes. A rejected or unclear input returns neutral guidance rather than a verified, paid or published claim. Network/storage leakage, misleading demand/earnings, stale preview after refresh, broken skip/back navigation and existing Auth/Trust regression are stop conditions.

Money and AI are N/A for runtime behavior: scene two describes a possible paid class without a price, earnings estimate, checkout, entitlement or AI decision. Illustrations are examples, never evidence of a real host or class. Rollback is a presentation-route revert; there is no data rollback. PR #74 needs the acceptance evidence above, independent privacy/security and Trust decisions linked in the PR, a current design/accessibility review and successful required CI before it may move from IMPLEMENTED to VERIFIED or merge. Release approval is separate.
