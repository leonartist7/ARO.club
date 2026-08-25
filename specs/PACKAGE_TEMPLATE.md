# ARO — Package Specification Template

> Copy this file for every implementation package. Replace all bracketed text. A package may not move to **SPEC-READY** while consequential sections remain unresolved.

---

# [PACKAGE-ID] — [Package name]

## 0. Metadata

- **Status:** SPEC-REQUIRED / SPEC-READY / IN-PROGRESS / BLOCKED / IMPLEMENTED / VERIFIED / SHIPPED
- **Spec version:** 0.1.0
- **Owner/director:** [name/role]
- **Implementation branch:** [branch]
- **PR:** [link/number when created]
- **Depends on:** [packages]
- **Blocks:** [packages]
- **Governing docs:** [list]
- **Required reviewers:** [product/design/security/privacy/trust/money/etc.]
- **Last updated:** [date]

## 1. Problem

Describe the concrete user/product problem. Do not start with the proposed UI or technology.

## 2. User outcome

State what a user can successfully accomplish after this package that they could not reliably accomplish before.

## 3. Why now

Explain why this package belongs at this point in the dependency sequence.

## 4. Goals

- [goal]
- [goal]

## 5. Explicit non-goals

- [non-goal]
- [non-goal]

Anything in the master vision not named in Goals remains out of scope.

## 6. Locked decisions and invariants

List all behavior the implementer may not reinterpret.

Examples:

- humans approve consequential AI actions;
- RLS remains the authorization boundary;
- money values are server-authoritative;
- self-declared capability is not verified qualification;
- existing verified-publish gate remains intact.

## 7. Personas and permissions

| Persona / role | Can read | Can create | Can update | Can delete | Special restrictions |
|---|---|---|---|---|---|
| Owner/user | | | | | |
| Other ordinary user | | | | | |
| Host/teacher | | | | | |
| Admin/reviewer | | | | | |
| Server/service role | | | | | |

## 8. User journeys

### Journey A — [name]

1. ...
2. ...
3. ...

### Journey B — [name]

1. ...

Include cancellation, retry, expired, permission-denied and destructive-action paths where relevant.

## 9. State machine

Define explicit states and legal transitions.

```text
DRAFT → ACTIVE → PAUSED → EXPIRED
  └────────────→ DELETED
```

For each transition, define:

- actor allowed;
- preconditions;
- server validation;
- side effects;
- audit/analytics event;
- idempotency behavior;
- user-visible result.

## 10. Data specification

### New/changed entities

| Entity/field | Type | Required | Public/private | Source/provenance | Retention | Notes |
|---|---|---:|---|---|---|---|
| | | | | | | |

### Migration rules

- append-only migration;
- rollback/forward-fix strategy;
- existing data backfill behavior;
- indexes/constraints;
- deletion/export behavior;
- no sensitive field without explicit purpose.

## 11. RLS and authorization matrix

Define actual database/server enforcement. UI hiding is never sufficient.

| Operation | Owner | Other user | Host | Admin | Service role | Expected policy/test |
|---|---:|---:|---:|---:|---:|---|
| SELECT | | | | | | |
| INSERT | | | | | | |
| UPDATE | | | | | | |
| DELETE | | | | | | |

## 12. Privacy

- data purpose;
- consent moment;
- public/private boundary;
- precise/coarse location treatment;
- retention;
- deletion/export;
- analytics minimization;
- withdrawal behavior;
- inference vs explicitly declared data.

## 13. Trust & safety

- category/risk classification;
- qualification requirement;
- reporting/blocking implications;
- abuse cases;
- admin escalation;
- eligibility failures;
- minors/vulnerable-user implications;
- stop conditions.

Write **N/A with rationale** if genuinely not applicable.

## 14. Money / entitlement implications

Define separately:

- marketplace money;
- digital subscription entitlement;
- fees/discounts/refunds/payouts;
- server authority;
- provider/webhook requirements;
- idempotency;
- tax/currency implications;
- user-visible terms.

Never leave this ambiguous if a price, commitment, discount, balance, payout or entitlement appears in UI.

## 15. AI specification

If AI is used, define:

### Inputs

Exactly what data may be supplied and why.

### Outputs

Schema/constraints and what the model is allowed to recommend.

### Prohibited actions

What the model may never infer/do automatically.

### Human approval boundary

Which actions require confirmation.

### Evaluation

- deterministic fixtures;
- quality rubric;
- hallucination/unsafe-output cases;
- provider failure behavior;
- freshness/provenance display;
- latency/cost budget.

Write **N/A** if no AI is used.

## 16. API / server contract

For each endpoint/RPC/function:

| Operation | Auth | Input schema | Output schema | Errors | Idempotency | Rate limit |
|---|---|---|---|---|---|---|
| | | | | | | |

## 17. UI / UX specification

For every surface define:

- primary action;
- information hierarchy;
- progressive disclosure;
- privacy/trust/terms copy;
- confirmation behavior;
- destructive-action behavior.

### Required states

- loading/skeleton;
- empty;
- populated;
- validation;
- pending mutation;
- success;
- error;
- retry;
- permission denied;
- expired/stale;
- offline/timeout if relevant.

No dead buttons, fake data presented as live, or generic “Something went wrong” when a recoverable action is known.

## 18. Responsive requirements

At minimum specify and verify:

- 360px phone;
- representative larger phone;
- tablet where layout meaning changes;
- 1440px desktop.

Wide screens add context; they do not merely stretch mobile cards.

## 19. Accessibility

- 44x44 minimum touch targets;
- body text baseline >=16px unless justified;
- WCAG AA contrast;
- semantic labels/roles;
- keyboard complete;
- visible focus;
- logical reading order;
- screen-reader announcement for consequential state changes;
- `prefers-reduced-motion` equivalent;
- no status conveyed by color alone.

## 20. Performance budget

Measure baseline before setting final thresholds.

Define:

- initial route JS/bundle delta budget;
- LCP/INP/CLS target for affected pages where applicable;
- API/query latency budget;
- max request count for primary journey;
- image/media loading strategy;
- cache strategy and invalidation;
- list pagination/windowing threshold;
- subscription/realtime lifecycle;
- AI latency/token/cost ceiling if applicable;
- mobile memory/animation constraints if relevant.

Do not write “fast” or “optimized” without a measurement.

## 21. Reliability and failure analysis

For each important failure:

| Failure | User impact | Detection | Recovery | Data consistency |
|---|---|---|---|---|
| duplicate submission | | | | |
| timeout | | | | |
| stale state | | | | |
| authorization change | | | | |
| provider unavailable | | | | |

Include concurrency and retry hazards.

## 22. Analytics / measurement

Define event names and semantics before implementation.

| Event | Trigger | Properties | Privacy classification | Decision it supports |
|---|---|---|---|---|
| | | | | |

Do not collect data without a decision/use case.

## 23. Test matrix

### Unit

- [ ] validation
- [ ] mapping/state transitions
- [ ] failure cases

### Data / RLS

- [ ] owner
- [ ] other user
- [ ] host
- [ ] admin
- [ ] unauthenticated
- [ ] service role where applicable

### Integration

- [ ] server/provider boundaries
- [ ] idempotency/retry
- [ ] migration compatibility

### E2E

- [ ] primary success journey
- [ ] edit/cancel/delete as relevant
- [ ] validation
- [ ] failure/retry
- [ ] role/permission denial

### Visual / accessibility

- [ ] phone light
- [ ] phone dark
- [ ] desktop light
- [ ] desktop dark
- [ ] keyboard
- [ ] reduced motion
- [ ] screen reader semantics spot-check

### Performance

- [ ] baseline recorded
- [ ] package budget passed

## 24. Acceptance criteria and evidence

| ID | Requirement | Verification | Evidence location | Status |
|---|---|---|---|---|
| REQ-001 | | | | TODO |

Every requirement must have evidence.

## 25. Rollout

- feature flag if needed;
- migration order;
- test/staging path;
- production gate;
- monitoring window;
- support/admin readiness;
- rollout percentage/cohort if needed.

## 26. Rollback / forward recovery

Explain how to recover safely from:

- bad UI release;
- migration issue;
- provider failure;
- incorrect analytics;
- unexpected Trust/safety issue.

Never assume destructive database rollback is safe.

## 27. Security / privacy / Trust review

- Reviewer:
- Date:
- Findings:
- Resolution:
- Approved: yes/no

## 28. Product / design review

- Reviewer:
- Date:
- Findings:
- Resolution:
- Approved: yes/no

## 29. Definition of Done

The package is VERIFIED only when:

- [ ] spec approved and versioned;
- [ ] all acceptance criteria pass;
- [ ] package-relevant unit/integration/E2E tests pass;
- [ ] RLS/security verification passes where applicable;
- [ ] mobile/desktop and light/dark evidence exists for user-facing work;
- [ ] accessibility requirements pass;
- [ ] performance budget passes or an approved exception is recorded;
- [ ] no unresolved critical/high review findings;
- [ ] diff contains no unrelated work;
- [ ] migration/rollback/operational notes are complete;
- [ ] `ARO_IMPLEMENTATION_STATUS.md` and `ARO_SPEC_INDEX.md` are updated;
- [ ] PR records deviations/follow-ups honestly.

## 30. Delivery record

Fill at implementation completion:

```text
Package:
Spec version:
Branch:
PR:
Commit:
Acceptance:
Unit:
Integration:
E2E:
RLS/security:
A11y:
Performance:
Screenshots/evidence:
Reviewers:
Known follow-ups:
Release environment:
Status:
```
