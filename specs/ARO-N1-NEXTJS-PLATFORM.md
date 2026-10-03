# ARO-N1 — Next.js platform and staging accounts

## Authority and metadata
Version: 1.0.0. Status: IMPLEMENTED / PARTIALLY VERIFIED. Authorized by the founder's explicit implementation request on 2026-09-20. Branch: codex/nextjs-migration. Applies independently to ARO.club and FV1-docs.

## Outcome and scope
Replace Vite/React Router with Next.js App Router; preserve URLs, visual behavior, synthetic product features and each checkout's differences. Add incremental TypeScript and email/password SSR accounts on isolated staging only. This instruction authorizes N1 before P1, but does not unlock P1–P5, payments, Google OAuth, live synthetic product data, production changes, schema changes or Trust changes. Governing documents: AGENTS.md, ARO_ARCHITECTURE.md, ARO_INFRASTRUCTURE.md, ARO_TRUST_SAFETY.md and ARO_BUILD_PLAYBOOK.md, with the explicitly approved stack/sequencing exception above.

## Locked interfaces and permissions
Real filesystem routes replace the route table; inventory is in artifacts/ARO-N1/route-inventory.json. Server layouts/pages verify users and api.current_user_role; RLS remains authoritative. Never use editable metadata for authorization. Browser and server clients use publishable credentials and cookie sessions. Private responses must not enter shared caches. No schema/entity/retention changes. Existing owners/teachers/admins retain existing database permissions.

## Journeys and states
Public navigation remains available without configuration. Staging supports signup → email confirmation → authenticated session → logout, and recovery request → verified callback → password reset. Missing configuration disables accounts. Invalid/expired callbacks return an actionable error. Role lookup failures deny access. Requests may be retried; Supabase owns token expiry and single-use verification.

## Security and provider boundary
Only mibydnerayobemhnlfyl.supabase.co is accepted for hosted accounts, with explicit staging enablement. Production is disabled. Local disposable Supabase is allowed for CI only. Callback destinations must be same-origin relative paths. Existing RLS/Trust SQL is unchanged. No AI, money, new analytics or personal-data collection is introduced. Security/privacy review is required before merge; no review is claimed by this specification.

## UI, accessibility and performance
Retain existing typography, Tailwind tokens, languages, focus handling, reduced motion and local storage keys. Verify 360px and 1440px in light/dark. New account states provide labelled inputs, pending/error/success feedback and retry navigation. Record build and browser baselines, compare route payloads and layout shifts; do not claim optimization without evidence.

## Acceptance and evidence
Record baseline/post-change lint, unit, typecheck, build, browser and auth results in artifacts/ARO-N1/VERIFICATION.md. All inventory routes load directly and navigate correctly. Test return-path attacks, session refresh/logout, unauthorized roles, recovery and disabled-account behavior. Preserve required static/browser-smoke/platform CI names. Hosted tests require active isolated staging and synthetic credentials; missing access is reported, never replaced with a PASS.

## Rollout and recovery
Local implementation and staging verification only. Restore previous branch/build and environment mapping to roll back; no data rollback is needed. Production promotion requires separate approval and independent review. Package is VERIFIED only when all required evidence and reviews pass; otherwise record partial verification explicitly.
