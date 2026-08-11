# ARO — Data Model Principles

## Status

This is a conceptual contract, not a migration. No agent may create tables, columns, RLS policies, indexes, or data backfills from this document alone. A later package must supply append-only SQL and a policy review.

## Canonical concepts

| Concept | Meaning | Tonguee relationship |
|---|---|---|
| Intent | Declared desired outcome and constraints | future opt-in learner-goal extension |
| Capability | Declared or verified ability/resource | generalizes teacher skill, venue, resource data |
| Commitment | Graded, revocable participation indication | future extension; not payment authorization by default |
| Opportunity | Proposed or published real-world arrangement | `experience` is the first instance |
| Outcome | Evidence of what happened | attendance, completion, review, repeat behavior |
| Trust evidence | Context-specific verification/reliability evidence | current teacher verification and audit records |

## Data handling rules

- Separate private inputs from public opportunity presentation.
- Default precise location, availability, identity documents, financial data, safety reports, and raw AI inputs to private.
- Each introduced sensitive data type needs a purpose, retention policy, access control, and deletion/export path.
- Never turn a single rating into a universal trust score. Trust is contextual and contestable.
- Commitment lifecycle: draft → expressed → conditional → confirmed → fulfilled/cancelled/expired. Payment commitment requires a dedicated payments spec and server enforcement.
- Outcomes distinguish participant report, host report, system record, and verified evidence.
