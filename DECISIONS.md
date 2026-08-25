# ARO — Architecture and Product Decision Record

This file records durable choices. Package-specific implementation details belong in their specifications.

## ADR-001 — ARO is the master platform

**Status:** Accepted

**Decision:** Tonguee becomes ARO’s first language-learning vertical.

**Rationale:** Preserve proven assets while enabling a broader opportunity network.

**Consequences:** Universal platform language must not erase Tonguee; Tonguee documents cannot override ARO authority.

## ADR-002 — Opportunity is the universal domain abstraction

**Status:** Accepted

**Decision:** An Opportunity is a proposed or operating real-world arrangement. A Circle is its participant cohort/operating group. A Tonguee Experience is the first vertical format.

**Rationale:** One abstraction can support learning, earning, creating, and collaborating without flattening vertical vocabulary.

## ADR-003 — ARO is demand-first

**Status:** Accepted

**Decision:** ARO begins with legitimate intent and demand, then finds capability and capacity; it is not listing-first.

**Consequence:** Demand signals must be privacy-preserving and distinguish interest from commitment.

## ADR-004 — Five foundational primitives

**Status:** Accepted

**Decision:** Intent, Capability, Commitment, Composition, and Outcome are foundational primitives.

## ADR-005 — Trust is contextual and category-aware

**Status:** Accepted

**Decision:** ARO will not reduce Trust to one universal score; eligibility depends on category, evidence, jurisdiction, and context.

## ADR-006 — Calgary is the first density market

**Status:** Accepted

**Decision:** Prove local liquidity and operating quality in Calgary before geographic breadth.

## ADR-007 — No speculative native crypto token in MVP

**Status:** Accepted

**Decision:** ARO will not issue or position a native speculative token in MVP.

## ADR-008 — Crypto is optional future infrastructure

**Status:** Accepted

**Decision:** Stablecoins or regulated financial integrations may be considered only when compliant and useful; no guaranteed yield claims.

## ADR-009 — Optimize for real-world value

**Status:** Accepted

**Decision:** Completed, safe, meaningful outcomes outrank screen time, feeds, and vanity engagement.

## ADR-010 — Opportunity Engine is the core differentiator

**Status:** Accepted

**Decision:** Signal → qualification → composition → commitment → operation → Proof → learning is the core system loop.

## ADR-011 — ARO Director is the quality layer

**Status:** Accepted

**Decision:** ARO Director assists hosts with experience design and operations; the human host approves consequential changes.

## ADR-012 — Generalize Tonguee incrementally

**Status:** Accepted

**Decision:** Reuse and generalize existing infrastructure through scoped packages rather than wholesale rewrite.

## ADR-013 — Database evolution is additive by default

**Status:** Accepted

**Decision:** Use append-only migrations and preserve existing Trust/RLS protections unless an approved migration explicitly supersedes them.

## ADR-014 — One package, one branch, one PR

**Status:** Accepted

**Decision:** Work packages have isolated scope, verification, review, and delivery evidence.

## ADR-015 — Repository specifications own product authority

**Status:** Accepted

**Decision:** Models may implement and review, but cannot override approved repository specifications or invent missing authority.

## ADR-016 — Shipathon proves one magical loop

**Status:** Accepted

**Decision:** The MVP proves demand + capability → opportunity → commitment → outcome; it does not attempt the full future platform.

## ADR-017 — Subscription and marketplace payments are separate

**Status:** Accepted

**Decision:** RevenueCat is the likely entitlement layer for eligible digital subscriptions/purchases. Real-world marketplace transactions use a separate server-authoritative payment/payout architecture.

**Consequence:** RevenueCat does not calculate or settle host service transactions.

## ADR-018 — Regulated categories require launch gates

**Status:** Accepted

**Decision:** No regulated or high-risk category opens without category-specific legal, qualification, insurance, safety, data, and operations approval.

## ADR-019 — Human approval for consequential AI actions

**Status:** Accepted

**Decision:** ARO may recommend and prepare; users approve outreach, publication, booking, visibility changes, charges, payouts, and other consequential external actions.

## ADR-020 — Existing Trust boundary remains authoritative

**Status:** Accepted

**Decision:** Supabase RLS and database triggers remain enforcement; UI and AI cannot substitute for or bypass them.

## ADR-021 — Mobile reuse before rewrite

**Status:** Accepted

**Decision:** Preserve React/Vite and evaluate Capacitor through an explicit technical gate with current platform evidence before choosing a native packaging strategy.

## ADR-022 — P0.1 is governance-only

**Status:** Accepted

**Decision:** P0.1 may change only documentation. Runtime, schema, dependencies, routes, UI, payments, and product behavior are excluded.

## ADR-023 — Real-world outcomes lead; online supports access

**Status:** Accepted

**Decision:** ARO’s signature loop culminates in real-world human activity. Approved online formats may improve access, preparation, and follow-up, but metrics must distinguish in-person, live-online, and asynchronous activity.

**Consequence:** Online engagement cannot be reported as physical real-life hours or become an endless content feed.
