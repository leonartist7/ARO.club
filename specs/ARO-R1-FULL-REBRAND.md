# ARO-R1 — Platform Rebrand and Repository Separation

> **Status:** IMPLEMENTED / PROVIDER-SEPARATION BLOCKED; not SHIPPED
> **Version:** 1.0.0  
> **Approved by:** Founder, 2026-08-26  
> **Implementation branch:** `feat/aro-r1-full-rebrand`

## 1. Goal

Make `leonartist7/ARO.club` the independent home of the ARO platform and present ARO as the primary product identity throughout the universal application shell and public entry experience. Preserve Tonguee as ARO's first language vertical and preserve all working language, teacher, booking, Passport and Trust foundations.

## 2. Locked brand architecture

- **Platform:** ARO — The Human Opportunity Network.
- **Promise:** AI for a more human world.
- **Product experience:** Living Opportunity OS.
- **First live vertical:** Tonguee — language experiences, teachers and cultural learning.
- ARO owns the global shell, navigation, homepage, metadata, account entry and universal Trust language.
- Tonguee remains visible where the product is specifically about language learning, language teachers or existing language experiences.
- Coco may remain a Tonguee vertical guide; Coco is not the global ARO platform logo.

## 3. Repository and infrastructure boundary

- New repository: `leonartist7/ARO.club`.
- Original `leonartist7/Tonguee` repository and its production deployment remain untouched.
- The governed ARO history through `9394cb7` is integrated into the new repository before runtime changes.
- ARO.club must receive its own Vercel project before production release.
- ARO.club must not silently point at the Tonguee production database. Its safe preview/backend target remains unassigned until founder approval.
- Supabase `jjgccfrwjkwknyjtbtxa` remains quarantined and may not be repurposed.

## 4. Adopted design direction

This package adopts the platform-level portions of `ARO_DESIGN_SYSTEM.md` and `ARO_EXPERIENCE_SYSTEM.md`:

- Bone / Warm Ivory surfaces;
- Ink / Near Black typography;
- ARO Vermilion as the primary action/signal;
- Saffron, Moss, Clay and Mineral Sky as restrained supporting signals;
- editorial hierarchy, negative space and orbit geometry;
- possibility shown as forming around a person;
- no generic neon-purple AI identity;
- meaningful motion only, with reduced-motion support.

This package does not implement the future 3D world, AR, Seasons, Catalyst, demand engine or fake Opportunity data.

## 5. Allowed implementation scope

- ARO brand mark/wordmark component.
- Universal color and typography tokens.
- Header, footer and global platform language.
- Public homepage restructured as an honest ARO entry surface, with Tonguee identified as the first live path.
- Browser metadata, package identity, README and public/legal brand references.
- Existing direct Tonguee/Conversa/Langgie platform-brand references updated to ARO where they do not describe the language vertical.
- Compatibility-preserving legacy local-storage keys may remain unchanged.
- Governance/infrastructure/status records updated for the new repository boundary.

## 6. Explicit non-goals

- No schema, migration, RLS, auth-provider or Supabase project mutation.
- No Stripe, Google, payment, pricing, payout or subscription work.
- No autonomous AI, matching, public demand, precise location or new vertical.
- No deletion of Tonguee language-domain data or Trust controls.
- No deployment or production-domain switch in this package.
- No claim that P1 or the wider ARO opportunity engine is implemented.

## 7. UX requirements

- Homepage explains what ARO is within the first viewport.
- Homepage makes the live Tonguee language path distinct from future ARO capability.
- Primary actions are real existing routes.
- No infinite feed, fabricated nearby demand, fake user counts or invented ARO intelligence.
- Header remains keyboard-complete and responsive.
- Brand mark has an accessible name; decorative orbit elements are hidden from assistive technology.
- 360px and 1440px layouts have no horizontal overflow.
- Light and dark modes remain first-class.
- Reduced-motion preference removes nonessential orbit motion.

## 8. Acceptance criteria

| ID | Requirement | Evidence |
|---|---|---|
| R1-001 | ARO.club is the repository target and Tonguee origin stays untouched | PASS — verification record |
| R1-002 | Governed ARO history through `9394cb7` exists in the branch | PASS — ancestry check |
| R1-003 | ARO is the global shell identity | PASS — header/footer/home screenshots |
| R1-004 | Tonguee is presented as the language vertical, not erased | PASS — homepage/public copy review |
| R1-005 | Browser metadata and package identity use ARO/aro.club | PASS — source/build inspection |
| R1-006 | Brand palette follows approved ARO tokens in light/dark | PASS — source + screenshots |
| R1-007 | Homepage contains no fabricated ARO intelligence | PASS — hostile copy review |
| R1-008 | Existing working routes and language experience cards remain reachable | PASS — browser smoke test |
| R1-009 | Keyboard, focus, semantic headings and reduced motion remain valid | PASS — accessibility spot check |
| R1-010 | 360px/1440px light/dark layouts pass | PASS — screenshot evidence |
| R1-011 | Unit tests and production build pass; legacy baseline issues are reported honestly | PASS with inherited lint qualification |
| R1-012 | No provider, schema, Trust, money, Google or Stripe change occurs | BLOCKED — no code/config mutation, but Vercel automatically deployed the branch through inherited project `lionovart/langgie`; detach/relink review required |

## 9. Rollout and recovery

- Work only on `feat/aro-r1-full-rebrand` in `leonartist7/ARO.club`.
- Preview deployment must use an ARO.club Vercel project and a non-production backend target.
- Original Tonguee production remains the recovery path.
- If the visual rebrand fails review, revert this branch; no data migration is involved.

## 10. Definition of VERIFIED

The package is VERIFIED when all acceptance criteria have evidence, required tests/build succeed or pre-existing failures are clearly separated, mobile/desktop and light/dark browser evidence exists, no high-severity accessibility regression exists, governance records are current, and no original Tonguee production/provider state has changed. The current inherited Vercel Preview connection prevents this state.
