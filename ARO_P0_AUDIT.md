# ARO-P0 — Authority and Foundation Audit

**Scope:** documentation and repository orientation only. No product behavior, schema, or security policy was changed by this audit.

## Authority findings

| Source | Finding | P0 disposition |
|---|---|---|
| `AGENTS.md` | Declared Tonguee brand, architecture, and work order final; directed all agents to the old playbook. | Replaced with ARO-first operating contract while preserving execution discipline. |
| `BUILD_PLAYBOOK.md` | Routes agents through legacy Tonguee A–G phases. | Kept as historical/vertical reference; `ARO_BUILD_PLAYBOOK.md` is now canonical. |
| `VISION.md` | Valuable language-vertical, Trust, safety, marketplace, and operational knowledge; product framing is Tonguee-only. | Retained as reference; ARO vision and V1 scope added separately. |
| `ARCHITECTURE.md` | Describes older project state and mock-data assumptions. | Retained as historical implementation reference; ARO architecture direction added separately. |
| `PAYMENTS_SPEC.md` | Contains existing Stripe/Connect and server-side money discipline. | Retained as reusable Tonguee payment intelligence. `ARO_MONEY.md` governs ARO; a money-bearing package must explicitly confirm or supersede legacy values before implementation. |
| `DESIGN_SYSTEM.md` / `DESIGN_EXECUTION_PLAN.md` | Existing visual and accessibility implementation authority. | Preserved as Tonguee implementation reference beneath `ARO_DESIGN_SYSTEM.md`. |

## Reusable foundations observed

- React 19/Vite/Tailwind/Supabase stack, routed UI, Zustand, reusable UI primitives, dark mode, i18n, Vitest, and Playwright.
- Marketplace concepts: profiles, teachers, experiences, bookings, reviews, and Passport.
- Trust Engine: teacher applications/documents, admin role/audit log, private storage, verified-only public experience RLS policy, and a database publish trigger.
- Admin experience and role-protected routes.

## Security follow-up outside P0

`.env` is tracked by git. Its contents were not opened or copied during this audit. `ARO_BUILD_PLAYBOOK.md` now defines **ARO-SEC0 — Repository Secret Hygiene**: safely remove it from tracking, verify ignore/example files, classify rotation needs by provider/variable name only, and assess history cleanup without exposing values. Adding `.env` to `.gitignore` alone is not remediation. ARO-SEC0 must precede P1 and broad multi-agent or production-financial access.

## P0.1 completion update

P0.1 adds `ARO_DESIGN_SYSTEM.md`, `ARO_TRUST_SAFETY.md`, `ARO_MONEY.md`, `ARO_GROWTH.md`, `ARO_SHIPATON.md`, and `DECISIONS.md`; makes ARO-P1 through P6 executable with explicit gates and evidence; and visibly deprecates the legacy Tonguee playbook. The authority hierarchy is now recorded in `AGENTS.md`.

## P0 conclusion

The codebase is suitable to evolve as ARO’s first vertical. The governing-document conflict is resolved by the ARO Director Pack, while the current security, payments, UI, and Trust controls remain in force. ARO-SEC0 remains a mandatory security prerequisite to P1 because documentation alone does not remediate the tracked `.env`.
