# ARO — Tonguee Migration Map

## Decision

Evolve; do not replace. Tonguee becomes ARO’s first language-learning vertical while the codebase progressively gains neutral domain capabilities.

## Preserve now

| Existing asset | ARO role | Protection |
|---|---|---|
| Experiences and teachers | First opportunity type and hosts | no disruptive rename/data rewrite |
| Trust Engine and verified publish gate | Baseline marketplace trust | preserve trigger and RLS |
| Admin panel and audit log | Human operations layer | retain role checks/auditability |
| Bookings and payments spec | Transaction foundation | server-side money rules/review gate |
| Passport and gamification | Real-world progress record | meaningful, non-shaming framing |
| Dark mode, i18n, UI, tests | Quality baseline | retain cross-cutting requirements |

## Translation guide

| Tonguee term | ARO equivalent | Action now |
|---|---|---|
| Experience | Opportunity (language vertical) | none |
| Teacher | Host with language capability | none |
| Learner | Participant with learning intent | none |
| Booking | Confirmed participation | none |
| Teacher verification | Contextual host trust evidence | none |
| Passport stamp | Verified real-world progress | none |

## Sequence

1. P0 installs the Director Pack only.
2. P1 establishes safe profile/capability and goal foundations.
3. P2 adds opt-in intent signals after data/RLS approval.
4. P3 tests transparent language-vertical opportunity suggestions.
5. P4 adds commitment only after safety, cancellation, and payment boundaries are specified.
6. P5 adds the outcome/Proof loop.
7. P6 pilots one adjacent vertical with category-specific Trust and operations requirements.

P0 authorizes no historical migration, brand replacement, generic marketplace launch, or schema change.
