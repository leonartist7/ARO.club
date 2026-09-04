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

## ADR-024 — Tonguee Supabase project is the canonical migration backend

**Status:** Accepted

**Decision:** ARO P1 and subsequent governed migration packages extend the existing Supabase project named **Tonguee**. The separately named `aro-platform` Supabase project contains an unrelated venue/ordering schema and is not an ARO runtime target.

**Rationale:** The Tonguee project matches the repository’s implemented profiles, teachers, experiences, bookings, reviews, Trust, auth and RLS foundation. Reusing it follows ADR-001, ADR-012 and ADR-013 and avoids an unnecessary backend rewrite.

**Consequences:** P1 must audit and extend the Tonguee project additively. Environment configuration must remain outside Git. Switching projects requires a new approved migration decision and explicit data/auth/RLS cutover plan.

## ADR-025 — Quarantine the secondary aro-platform project before disposition

**Status:** Accepted

**Decision:** Supabase project jjgccfrwjkwknyjtbtxa (aro-platform) is classified as **QUARANTINED — KEEP**. It is not an ARO runtime target and must not be deleted, paused, merged into Tonguee or repurposed until its five auth accounts, creator/purpose and external references are identified.

**Rationale:** Its hospitality-oriented schema does not match Tonguee/ARO, public tables appeared empty and storage had no objects, but five auth accounts remain. Those accounts create enough uncertainty that destructive action would be irresponsible.

**Consequences:** The founder completes the dependency/account checklist in ARO_INFRASTRUCTURE.md. If no dependency exists, pause first, observe, then delete only with explicit founder authorization and appropriate export/recovery preparation.

## ADR-026 — Separate ARO.club from Tonguee production

**Status:** Accepted

**Decision:** `leonartist7/ARO.club` is the independent runtime repository for the ARO platform. `leonartist7/Tonguee`, its production deployment and Supabase project `ybhecubqnhukgpvchjay` remain preserved as the Tonguee vertical and recovery path. The separated ARO.club app has no approved production Vercel or Supabase target until a dedicated environment/cutover decision is made.

**Rationale:** Repository separation allows a full ARO platform identity and future architecture to evolve without putting the working Tonguee production path or its users at risk.

**Consequences:** This decision narrows ADR-024: the Tonguee Supabase project remains the source migration foundation and evidence base, but it is no longer the automatic runtime target for the separated ARO.club repository. P1 must use an explicitly approved isolated environment or staged migration plan. `aro-platform` remains quarantined under ADR-025.

## ADR-027 — Govern V1 through one durable master delivery objective

**Status:** Accepted

**Decision:** `ARO_MASTER_DELIVERY_PLAN.md` coordinates the production-ready V1 path through P5. It inserts M0 governance, I0 isolated infrastructure, Q0 reliability, N1 platform/Next.js decision, X1 experience foundation and A1 AI foundation at explicit gates while preserving the semantic product dependency P1 → P2 → P3 → P4 → P5.

**Rationale:** A durable, verifiable objective lets local and cloud agents make autonomous progress without relying on chat history or mixing unrelated behavior into one package. Infrastructure, reliability, platform, design and AI foundations need their own evidence before downstream product packages depend on them.

**Consequences:** Every phase remains one spec, branch, PR and review. The master plan does not authorize runtime implementation by itself. Production 3D/AR, Seasons, P6, money providers and consequential autonomous AI remain separately gated.

## ADR-028 — Prototype the Opportunity Formation experience before hosted Auth completion

**Status:** Accepted

**Decision:** ARO may deliver UX0 as a synthetic frontend-only prototype while parent-I0 hosted Auth, recovery, Preview literal-value matching and domain gates remain open. UX0 must make the three-point formation model—what a person wants, what they can bring, and people · place · time—feel immediate, distinctive and explainable. Original generated imagery is authorized when it satisfies the package's provenance, accessibility and performance rules.

**Rationale:** The current shell validates deployment but does not yet communicate ARO's product difference. A bounded prototype allows the visual language and core interaction to be discovered without coupling that work to accounts, live data or P1 semantics.

**Consequences:** UX0 uses fixtures and deterministic client interaction only. It cannot add Supabase Realtime, AI, connected backend/Auth behavior, P1 schema, production data or new dependencies, and it does not waive any I0/P1 gate. A fail-closed source guard and zero-network assertion are required while Preview values remain unverified. Founder visual approval is required before the implementation package merges.

