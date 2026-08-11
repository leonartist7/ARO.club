# ARO — Architecture Direction

## Scope and posture

ARO evolves the current React/Vite/Supabase application. The client, Supabase Auth, RLS policies, Trust Engine, admin tooling, routes, reusable UI, Passport, and tests are assets to preserve. This document sets boundaries; it authorizes no schema or code changes by itself.

## Layered model

| Layer | Responsibility | Current foundation |
|---|---|---|
| Experience | Screens, accessibility, consent, honest states | React, Router, Tailwind, UI primitives |
| Application | Journeys and orchestration | contexts, Zustand, library modules |
| Domain | Intent, capability, commitment, opportunity, outcome | experiences, teachers, bookings, reviews, profiles |
| Trust & policy | authorization, verification, audit, moderation | RLS, `trust-engine.sql`, admin app |
| Data | durable facts and permitted derived data | Supabase Postgres and Storage |

## Architecture rules

- PostgreSQL/RLS is the authoritative boundary; client UI is never enforcement.
- Server-side code owns privileged operations, financial calculation, webhooks, and security-sensitive decisions.
- Migrations are append-only. Existing schema and Trust migrations are not edited in place.
- A derived recommendation is not a source of truth. Store its inputs, consent state, and outcome only when an approved spec requires it.
- AI features must have explicit input scope, confirmation for consequential actions, and auditability for privileged actions.
- Do not prematurely replace the marketplace model; new abstractions need an approved package.

## Future intelligence systems (not implementation authorization)

- **ARO Signal:** explicit intent and demand.
- **ARO Graph:** permitted capabilities, resources, and contextual trust.
- **ARO Catalyst:** viable opportunity proposals.
- **ARO Director:** host-quality assistance.
- **ARO Commit:** commitment states.
- **ARO Proof:** validated outcomes.
