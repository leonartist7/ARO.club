---
tags:
  - aro
  - master
  - specs
  - architecture
aliases:
  - ARO Home
  - ARO Project Brain
---

# ARO — Project Brain

> Obsidian entry point for the ARO Human Opportunity Network. This note is navigation, not implementation authority.

## Start here

- [[ARO_MASTER_DELIVERY_PLAN]] — **canonical cross-package delivery objective and cloud-task handoff**
- [[ARO_CURRENT_STATE]] — **what is true right now; current strategy, implementation state, blocker and latest ideas**
- [[ARO_MASTER]] — recovered and optimized master vision
- [[ARO_SPEC_INDEX]] — canonical spec registry and status vocabulary
- [[ARO_IMPLEMENTATION_STATUS]] — what exists, what is verified, what is blocked, what comes next
- [[ARO_BUILD_PLAYBOOK]] — package sequence, gates, acceptance criteria
- [[DECISIONS]] — durable accepted architecture/product decisions
- [[ARO_CHANGELOG]] — append-only product/architecture evolution history
- [[ARO_RECOVERY_STATUS]] — recovery provenance and surviving artifacts

## Latest experience direction

- [[ARO_EXPERIENCE_SYSTEM]] — Living Opportunity OS, ARO Field, Orbit/Portal/Path/Constellation, mobile UX, visual identity, motion, voice and ethical engagement
- [[ARO_SEASONS_AR]] — Seasons, quests, real-life progression, AR, Beacons, Trails, Expeditions and strategic monetization

These are approved strategic direction, but runtime implementation remains package/spec gated.

## Governing architecture

- [[ARO_VISION]]
- [[ARO_PRODUCT]]
- [[ARO_ARCHITECTURE]]
- [[ARO_DATA_MODEL]]
- [[ARO_OPPORTUNITY_ENGINE]]
- [[ARO_DESIGN_SYSTEM]]
- [[ARO_TRUST_SAFETY]]
- [[ARO_MONEY]]
- [[ARO_GROWTH]]
- [[ARO_SHIPATON]]
- [[ARO_MIGRATION]]

## Execution

- [[AGENTS]] — agent operating contract
- [[specs/PACKAGE_TEMPLATE|Package Spec Template]]

### Current sequence

`SEC0 → R1 → M0 → I0 → Q0 → P1 → N1 → X1 → P2 → A1 → P3 → P4 → P5 → V1 release audit`

P6, production 3D/AR, Seasons and money remain outside the V1 release gate unless a separately approved package changes that scope.

## Knowledge graph workflow

ARO uses two complementary graphs:

1. **Obsidian graph** — human-readable relationships created by Markdown links, tags, decisions, specs and status documents.
2. **Graphify graph** — machine-queryable relationships across code, docs, SQL, configs and architecture.

The graph is an exploration layer. It never overrides the governing spec hierarchy in [[AGENTS]].

## Always-current protocol

Any PR that materially changes strategy, implementation state, active blocker, design doctrine, product sequencing, Trust/privacy/money direction or major capability status must:

1. update [[ARO_CURRENT_STATE]];
2. append [[ARO_CHANGELOG]];
3. update [[ARO_SPEC_INDEX]] / [[ARO_IMPLEMENTATION_STATUS]] when status changes;
4. update [[DECISIONS]] or specialist docs when a durable domain decision changes;
5. refresh Graphify locally when available.

This prevents ARO from depending on any single chat conversation.

## Master loop

**KNOW → SENSE → COMPOSE → QUALIFY → COMMIT → DIRECT → LIVE → PROVE → BECOME → COMPOUND**

**AI organizes. Humans approve. Real life happens.**
