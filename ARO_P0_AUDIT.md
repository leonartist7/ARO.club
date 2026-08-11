# ARO-P0 — Authority and Foundation Audit

**Scope:** documentation and repository orientation only. No product behavior, schema, or security policy was changed by this audit.

## Authority findings

| Source | Finding | P0 disposition |
|---|---|---|
| `AGENTS.md` | Declared Tonguee brand, architecture, and work order final; directed all agents to the old playbook. | Replaced with ARO-first operating contract while preserving execution discipline. |
| `BUILD_PLAYBOOK.md` | Routes agents through legacy Tonguee A–G phases. | Kept as historical/vertical reference; `ARO_BUILD_PLAYBOOK.md` is now canonical. |
| `VISION.md` | Valuable language-vertical, Trust, safety, marketplace, and operational knowledge; product framing is Tonguee-only. | Retained as reference; ARO vision and V1 scope added separately. |
| `ARCHITECTURE.md` | Describes older project state and mock-data assumptions. | Retained as historical implementation reference; ARO architecture direction added separately. |
| `PAYMENTS_SPEC.md` | Contains existing Stripe/Connect and server-side money discipline. | Preserved as current authority until a future ARO payments spec explicitly supersedes it. |
| `DESIGN_SYSTEM.md` / `DESIGN_EXECUTION_PLAN.md` | Existing visual and accessibility implementation authority. | Preserved until an approved ARO design package exists. |

## Reusable foundations observed

- React 19/Vite/Tailwind/Supabase stack, routed UI, Zustand, reusable UI primitives, dark mode, i18n, Vitest, and Playwright.
- Marketplace concepts: profiles, teachers, experiences, bookings, reviews, and Passport.
- Trust Engine: teacher applications/documents, admin role/audit log, private storage, verified-only public experience RLS policy, and a database publish trigger.
- Admin experience and role-protected routes.

## Security follow-up outside P0

`.env` is tracked by git. Its contents were not opened or copied during this audit. This needs a dedicated security-response package: determine whether it contains secrets, rotate any exposed credentials, remove it from tracking through an approved recovery procedure, and add safe ignore/config guidance. Do not treat adding it to `.gitignore` alone as remediation.

## P0 conclusion

The codebase is suitable to evolve as ARO’s first vertical. The governing-document conflict is resolved by the ARO Director Pack, while the current security, payments, UI, and Trust controls remain in force.
