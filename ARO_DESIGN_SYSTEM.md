# ARO — Design and Experience Direction

## Authority and scope

This document governs ARO’s product feeling, interaction principles, brand architecture, and cross-platform experience direction. It does not authorize a pixel-by-pixel redesign. `DESIGN_SYSTEM.md` and `DESIGN_EXECUTION_PLAN.md` remain implementation references for existing Tonguee surfaces where they do not conflict with this document or an approved ARO package.

## Product feeling

ARO should feel human, premium, optimistic, spatial, intelligent, alive, warm, modern, and globally relevant. It should feel like a living interface to possibilities around a person—not a database of listings.

Avoid generic SaaS dashboards, gratuitous glassmorphism, cyberpunk AI, robot imagery, endless card grids or feeds, gamification clutter, and meaningless gradients. Screen time is not the product outcome.

## Core philosophy

AI appears through opportunities forming, connections becoming visible, demand signals, contextual intelligence, and elegant recommendations. “Chatbot everywhere” is not the interaction model. Conversation may help a user express intent, but the primary artifact is an understandable opportunity with people, place, time, trust, commitment, and expected value.

Every recommendation should answer, at the appropriate level:

- Why am I seeing this?
- What would need to happen next?
- Who can see my information?
- What am I agreeing to?
- Can I change my mind?

## Mobile-first experience rules

- Establish one obvious primary action per view and reveal complexity progressively.
- Prefer a focused bottom navigation for frequent participant actions; keep admin and complex host operations outside that pattern when space or risk demands it.
- Minimum touch target is 44 by 44 CSS pixels. Body text is at least 16px. Interactive state never depends on color alone.
- Small screens stack information in decision order: outcome → trust → logistics → economics → details.
- Wide layouts add context and spatial relationships; they do not merely stretch cards.
- Motion explains formation, causality, transition, and success. It must not manufacture urgency or hide state changes.
- Respect `prefers-reduced-motion`; provide an equivalent static state and avoid looping nonessential motion.
- Meet WCAG AA contrast, keyboard navigation, semantic labeling, visible focus, logical reading order, and screen-reader announcements for consequential state changes.
- Light and dark themes are equal product states. Every new surface, chart, overlay, map treatment, and status must work in both.
- Loading preserves layout and explains progress; empty states teach the next useful action; errors take responsibility, preserve user input, and offer recovery.

## Opportunity interface

### Opportunity Radar

The Radar shows relevant possibility and emerging demand, not a surveillance map. Use coarse location until precise location is necessary and consented. Separate ready opportunities from forming opportunities. Relevance indicators must be understandable and must not imply certainty.

### Opportunity summary and detail

Lead with the real-world outcome and current state. Then show why it fits, time/place, participant and host context, trust requirements, commitment threshold, cost or earning estimate, cancellation terms, and next action. “Suggested,” “forming,” “open,” “confirmed,” “completed,” and “cancelled” require explicit labels.

### Demand signals

Visualize aggregate demand without exposing private individual intent. Show sample size, locality granularity, freshness, and whether the signal is interest, conditional commitment, or paid booking. Do not use false precision.

### Commitments

Commitment UI must state what triggers confirmation or payment, the minimum threshold, deadline, cancellation effect, and how to withdraw. Progress should feel collective, not coercive.

### Host economics

Show price, fees, expected payout, threshold, assumptions, and uncertainty as separate values. Never present projected earnings as guaranteed. Money values use plain language and an accessible breakdown.

### Trust

Use contextual qualification labels and plain explanations rather than one universal score. High-risk gates are prominent, sober, and never gamified. Trust status is always text plus icon—not color alone.

### ARO Director

ARO Director should feel like quiet expert assistance: structured suggestions for agenda, atmosphere, accessibility, materials, timing, and contingencies. Hosts approve changes. Avoid a chat transcript when a checklist, preview, or direct manipulation is clearer.

### Spaces

Represent what a place enables: capacity, accessibility, available times, equipment, location context, and category suitability. Precise access details remain private until appropriate.

### Proof and outcomes

Celebrate completed real-world value, clearly separating participant report, host report, system record, and verified evidence. Avoid manipulative streak loss and vanity metrics.

### Passport

Passport is a durable record of real-world progress: experiences joined, skills practiced/shared, people helped, places explored, and outcomes achieved. It is identity through lived evidence—not a points cabinet.

## Brand architecture

ARO is the master platform. Tonguee is the first language vertical. The platform shell and universal opportunity patterns use ARO’s neutral, globally relevant system; Tonguee may retain its recognizable coral/teal/gold palette, Coco, language-specific warmth, and vertical storytelling inside its surfaces. ARO must not become visually language-specific, and Tonguee must not disappear through an incidental global rebrand.

## Reuse and generalization

Reuse or generalize:

- existing accessible UI primitives and state components;
- coral/teal semantic lessons, contrast rules, layout spacing, dark mode, motion restraint, and warm anti-shame copy;
- responsive shell patterns, cards, badges, inputs, toasts, skeletons, and error/empty states;
- Trust presentation, Passport patterns, real-human imagery, i18n, and reduced-motion handling.

Keep Tonguee-specific until an approved migration package says otherwise:

- Coco and language-learning illustrations;
- “teacher,” “learner,” and language-specific experience copy;
- Top Tongue and language gamification language;
- Tonguee campaign messaging and vertical landing-page compositions.

P1 must specify the smallest component and token changes it requires. No package may use this direction as permission to redesign every existing page.
