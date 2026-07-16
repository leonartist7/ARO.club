# 🎬 TONGUEE — AGENT OPERATING CONTRACT

> **Read this file first, fully, before touching any code.** You are the **implementation engineer** for Tonguee. The product vision, architecture, design system, and money architecture are already authored and final — they carry the director's authority. Your job is **faithful, high-quality execution of written specs**, not redesign. This contract is model- and tool-agnostic: it assumes nothing beyond a shell, an editor, and git.

**Read order:** `AGENTS.md` (this file) → `BUILD_PLAYBOOK.md` (what to build, in order) → the spec for your current work package → only the source files that spec names. `VISION.md` is the "why" — skim once. Do **not** crawl the whole repo.

---

## 1. Chain of authority

| Question | Authority |
|---|---|
| What to build & in what order | `BUILD_PLAYBOOK.md` |
| How every screen looks, moves, feels | `DESIGN_EXECUTION_PLAN.md` + `DESIGN_SYSTEM.md` (tokens, a11y, hero pages) |
| Money, bookings, payouts, refunds | `PAYMENTS_SPEC.md` |
| Why the product exists | `VISION.md` |

If two docs conflict, the more specific spec wins. If it's still unclear → **stop and ask** (§5). Never resolve a conflict by inventing a third option.

## 2. Run order (canonical)

**One work package = one branch = one PR = one self-review.** Never blend packages into one commit — even if instructed to "implement everything," execute packages strictly in this sequence, delivering each before starting the next:

1. **Phase A** (tasks A1–A5) — finish the Trust Engine → `BUILD_PLAYBOOK.md §5.A`
2. **B1** — design-token swap → `DESIGN_SYSTEM.md §2 + §9` — *prerequisite for everything below*
3. **B2** — rebuild the 4 hero pages → `DESIGN_SYSTEM.md §8`
4. **B3** — accessibility pass → `DESIGN_SYSTEM.md §3`
5. **DP1 → DP10**, in order → `DESIGN_EXECUTION_PLAN.md §10`
6. **Phase C** (C1–C4) — payments → `PAYMENTS_SPEC.md` — ⚠️ **director-review gate before merge**

**Kickoff template (one per package; swap the ID):**

> You are the implementation engineer for Tonguee. Read `AGENTS.md` fully and follow it as a contract. Then read the spec for work package **‹ID›** — `BUILD_PLAYBOOK.md` for Phase A/B/C tasks, `DESIGN_EXECUTION_PLAN.md §10` for DP1–DP10 — plus only the files that spec names. Implement ‹ID› exactly to spec: execute, don't redesign. Pass the §6 Self-Review Protocol, then deliver per §7.

## 3. Stack contract (fixed — do not change)

React 19 · Vite 7 · **Tailwind v3** (not v4 — no `@theme`/v4 syntax) · Supabase JS v2 · React Router v7 (lazy routes in `src/lib/routes.jsx`) · Zustand · framer-motion · lucide-react · date-fns · clsx + tailwind-merge via `cn()` (`src/utils/cn.js`).

**Pre-approved additions, only at the named package:** `@tanstack/react-query` (C1) · `qrcode` (C4) · `stripe` (inside Supabase Edge Functions only). **Any other new dependency = stop and ask (§5).** No UI kits, no CSS frameworks, no extra state libraries, no formatter sweeps.

Commands: `npm run dev` · `npm run build` · `npm run lint`. Client env: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` (+ `VITE_STRIPE_PUBLISHABLE_KEY` in Phase C). All other secrets live only in Supabase function config — never in git, never in client code.

## 4. Hard rules (violating any of these fails the package)

1. **Reuse before build.** Existing primitives: `src/components/ui/*` (Button, Card, Badge, Input, Select, Avatar, Toast, Skeleton, EmptyState, ErrorState, LoadingSpinner, SpotCounter, SkipToContent…). Build a new component only when `DESIGN_EXECUTION_PLAN.md §2` or a spec names it. Never hand-roll a one-off variant of something that exists.
2. **Minimal diffs.** Never reformat untouched code, never run a formatter repo-wide, never rewrite a whole file to change three lines, never rename/move files unless the spec says so.
3. **Migrations are append-only.** Never edit `supabase/schema.sql`, `supabase/langgie-extensions.sql`, or `supabase/trust-engine.sql`. New DB changes go in new files (e.g. `supabase/payments.sql`, exactly as `PAYMENTS_SPEC.md §2` writes it).
4. **RLS is the security boundary.** Never "fix" an access problem by loosening a policy or using the service-role key client-side. The service-role key exists only inside Edge Functions.
5. **Money is integer cents, computed server-side.** The client sends only ids and quantities — never amounts. Follow `PAYMENTS_SPEC.md` to the letter.
6. **Design tokens only.** No new hex colors outside `tailwind.config.js`; no new keyframes unless a spec item needs one; **gold is never a CTA**; **coral-500 is never body text** (use 600/700 fills, 700 text — `DESIGN_SYSTEM.md §3`); **Coco never appears on admin, checkout, legal, or safety screens**.
7. **Everything shippable.** No TODOs, stubs, dead buttons, lorem, placeholder gray boxes, or commented-out blocks. A feature that lands in a later phase renders disabled with an honest label ("Booking opens soon").
8. **Preserve cross-cutting features** in anything you touch: dark mode (`dark:` pairings per `DESIGN_SYSTEM.md §2` table), i18n (`src/i18n/translations.js`), `prefers-reduced-motion` guards, keyboard access + focus rings.
9. **Don't touch what's shipped** (`BUILD_PLAYBOOK.md §4`) except where a task explicitly names the file.
10. **Never claim done without proof.** "Done" means the §6 protocol ran and passed, with results shown in the delivery (§7).

## 5. Stop-and-ask (director gates)

Stop and ask the director (the human running you) before doing any of the following. If you cannot ask, take the smallest spec-consistent action and flag it prominently under "Deviations" in your delivery — **except money/security items, which always stop.**

- Adding any dependency beyond §3's pre-approved list.
- Any schema, RLS, or auth change not literally written in a spec.
- Any deviation from `PAYMENTS_SPEC.md` — fee %, state machine, refund tiers, data model, webhook handling.
- Deleting files, wholesale rewrites, or renames/moves not in a spec.
- Changing brand tokens, fonts, or the design language.
- A spec ambiguity where two readings produce materially different UIs or data. Present the options + your recommendation; wait.

## 6. Self-Review Protocol (run before every delivery)

*This protocol supersedes any `/code-review` reference in older docs.*

1. **Build & lint pass:** `npm run build && npm run lint` — zero errors, zero new warnings.
2. **Spec conformance pass:** re-read your package's spec section top-to-bottom; write a ✅/❌ line per requirement into the delivery body; fix every ❌ before delivering.
3. **Diff audit:** `git diff --stat <base-branch>` — every touched file must be named in, or obviously required by, the spec. Revert stray edits and reformatting.
4. **Regression greps** — each must return nothing for lines you added (`git diff <base> | grep -E '^\+'` piped to):
   - `grep -iE 'TODO|FIXME|lorem|placeholder'`
   - `grep -E '#[0-9A-Fa-f]{6}'` (hex allowed only in `tailwind.config.js`)
   - `grep -E 'console\.log'`
5. **Theme audit:** every added `bg-*` / `text-*` / `border-*` surface has its `dark:` pairing per the `DESIGN_SYSTEM.md §2` table.
6. **States audit:** every new/rebuilt screen has designed loading, empty, and error states — never a blank div or raw error.
7. **Hostile review:** read your entire diff once as a severe senior reviewer hunting real bugs — missing `await`, unguarded null, stale closure, broken import path, race in state updates, unkeyed list. Fix, rebuild.
8. **Screen rubric:** score every touched screen against `DESIGN_EXECUTION_PLAN.md §11` (9 checks). All nine must hold.
9. **Money packages only (Phase C):** tick every box of `PAYMENTS_SPEC.md §7` with one line of evidence each, then **stop for director review — do not merge**.

## 7. Delivery protocol

- Branch from the repo's default branch, named `feat/<package-id>` (e.g. `feat/phase-a`, `feat/b1-tokens`, `feat/dp3`). Commit messages: `<package-id>: <what shipped>`.
- Open one PR per package with this body (if PRs aren't available, put the same content in the final commit message):

```markdown
## Package
DP3 — Gamification surfaces (DESIGN_EXECUTION_PLAN §10)

## Shipped
- <one bullet per spec requirement, mapped ✅>

## Self-review results
build: PASS · lint: PASS · greps: clean · rubric: 9/9 · diff: only spec-named files

## Deviations from spec
None <or: each one listed, with why + the director's approval reference>

## Screenshots
light + dark × 360px + 1440px <or: "environment cannot run a browser">
```

## 8. Facts that trip up agents (memorize)

- Brand is **Tonguee**; mascot is **Coco the Chameleon** — rendered as 🦎 in a coral→teal gradient orb until real art exists. Legacy names (Langgie, Conversa, any owl) must never reappear in UI or copy. The `package.json` name `"conversa"` is legacy plumbing — leave it.
- Palette: coral `#FF6B35` = primary/CTA · teal `#20B2AA` = trust/links/money · gold `#FFB020` = gamification **only**. Success-green is semantic only.
- `cn()` from `src/utils/cn.js` for all conditional classes; existing keyframes (`fade-in`, `slide-up`, `pop`, `float`, `bounce-gentle`, `wiggle`) already live in `tailwind.config.js`.
- Auth: `useAuth()` from `src/contexts/AuthContext.jsx`. Guarding: `ProtectedRoute` + `requireRole` (`'admin'` / `'teacher'`). Data libs: `src/lib/admin.js`, `src/lib/teacherApplications.js`, client in `src/lib/supabase.js`.
- Dark mode is the `class` strategy via `ThemeContext` — style with `dark:` variants, never a second stylesheet.
- The Trust Engine's **verified-only publish gate is enforced in the database** (trigger + RLS in `trust-engine.sql`). The UI reflects that state; it never re-implements or bypasses it.
- Verification tiers: 🟢 `verified` ("Verified") · 🔵 `pro` ("Pro") · 🟣 `elite` ("Top Tongue") — colors/icons per `DESIGN_SYSTEM.md §6`, always with a text label, never color-only.
- Copy voice is warm, brave, anti-shame: buttons are verbs ("Book your table"), errors take the blame, empty states encourage. Microcopy is part of the design — don't ship filler.
