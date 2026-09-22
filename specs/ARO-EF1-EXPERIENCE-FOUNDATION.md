# ARO-EF1 — Experience foundation and Season visual journey

Version 1.0 · 2026-09-22 · SPEC-READY for synthetic frontend implementation.

## Authority and sequencing
Founder approved the presented Frontend Master Blueprint with “Go ahead”. This package implements the first coherent visual wave: A0/A1 navigation, participant entry continuity and B2 Season composition. It explicitly extends PV1's previous shell-preservation boundary for this new package. No runtime P1–P5, money, Trust, reward, messaging, persistence, location or provider authority is inferred. F7 ownership and evidence remain untouched; these changed shared surfaces require fresh package-specific checks and later acceptance.

Base: published PV1 1749575aa12e1b240ed2ca6273defd391f0588f5; local a99c051 has the same source tree. Branch codex/aro-experience-foundation-20260922, stacked on PV1. New package, separate review. Existing PR60 and PR59 remain unchanged.

## Durable design decisions
Consumer navigation becomes Home / Explore / Create / Messages / Saved; Explore links existing World. Existing routes remain reachable. Avatar opens Your World preview; its existing Profile return preserves the original profile. Messages and Saved gain real local demonstration destinations, with explicit fictional/empty states and no sending/saving claims. Create remains selected and retains a separate Back to World exit.
Home removes the unearned 62% bar in favor of a Season invitation. Season uses one selectable chapter state shared by spatial and list views; four chapter concepts lead to existing discovery/Create examples and preview keepsakes. No earned or locked progress, price, claim, purchase, timer or active entitlement is created.

## Owned files
src/components/app/AppShell.jsx and test; src/app/app/layout.tsx; src/views/AppHomePage.jsx and the affected shell expectation in AppDiscovery.test.jsx; new src/components/experience/** and src/i18n/experience/**; new /app/messages and /app/saved route wrappers; src/components/personalization/PersonalizationPage.jsx and test; new SeasonExplorer.jsx; append personalization CSS; this spec, public/experience/review.html and docs/experience-foundation/**. Append package-only status entries to four registries after validation. Preserve historical specs/records.

## State and contracts
Shell reads existing language/theme contexts. No new storage. Messages has Circles/Direct filters: Circles offers a marked sample room; Direct has honest empty state and Explore recovery. Saved offers two fictional inspiration items, searchable/filterable with clear empty/reset; no favorite mutation. Season default chapter outside, world view; selection survives view switch; local reset/remount restores default. Chapter dialog uses native focus trapping and existing Escape/return behavior. Existing character/shop/room interactions remain.

## Acceptance
EF1-01: five localized nav destinations work; correct active state; avatar personal hub; old routes retained.
EF1-02: Home links Season and existing participant flow without fabricated percentage.
EF1-03: Messages/Saved filters and empty recovery work, no send/save side effect.
EF1-04: Season world/list parity, four selectable chapters, keepsake previews and truthful Plus comparison.
EF1-05: 320/390/768/1440 light/dark, EN/FR/ES, keyboard, reduced-motion, no page overflow; physical devices separately pending.
EF1-06: baseline/final lint/build and meaningful component tests pass; source/network scope inspected.
EF1-07: no new dependencies, provider settings, APIs, persistence, money or actual rewards; existing optimized art reused.

## Performance and rollback
Reuse existing images with dimensions and lazy loading. No new media transfer masters or animation dependency. Capture build results; do not claim F7 or field performance acceptance. Revert this package to restore previous shell/Home/Season; no data rollback. No merge/production deployment. Independent/founder review pending.
