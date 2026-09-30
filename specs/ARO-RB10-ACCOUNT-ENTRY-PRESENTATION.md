# ARO-RB10 — Account entry presentation

## Authority and scope

- Status: **SPEC-READY**, version 1.0.0, 2026-09-28. Founder-approved orange rebrand and request to finish theme/language UI across actual surfaces. Stacked on RB9.
- Scope: signed-out `/login`, `/signup` and `/forgot-password` presentation and copy in EN/FR/ES, including preview-disabled, validation, pending, success and error text already surfaced by these components. Reuse `LanguageContext`, controlled ARO wordmark and brand tokens. Preserve exact EN form-control names used by existing browser gates.
- No Auth behavior, callback/recovery contract, backend enablement, schema, role, Trust, payments or data write changes. N1 Auth PR #70 owns its callback/context files; RB10 does not edit them. Live password-reset execution and hosted signup cycle remain independently gated.

## Experience contract

Replace Tonguee-specific introductory language with ARO’s general learning/sharing promise. Account access and creation must remain visibly unavailable when no backend is configured; disabled controls stay disabled. Translate local interface copy and validation while leaving provider-supplied errors intact rather than guessing their meaning. Dark mode must keep text, cards, links and notices readable. Keep keyboard/focus semantics and safe deep-link return handling. Avoid decorative motion that ignores reduced-motion preference.

## Verification

- Phone 320/390 and desktop, light/dark, all supported languages on actual signed-out routes. No horizontal overflow, missing strings, console exceptions or enabled account actions in preview mode.
- Back navigation and `/terms`, `/privacy`, `/forgot-password`, `/login`, `/signup` destinations remain intact. Existing browser gate EN labels still pass.
- Build, lint, type checks, full tests and relevant browser checks. Record precise limits; this package does not certify live Auth, hosted recovery or independent security/privacy review.
