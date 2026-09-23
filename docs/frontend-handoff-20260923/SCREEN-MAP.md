# Ecosystem coverage and capability boundaries

The master blueprint remains the complete 64-family inventory. This map groups it into buildable journeys, including surfaces that do not exist yet. “Future” is a design target, not a claim of route availability. Never create navigation to an absent route merely to make the ecosystem look larger.

| Area | Present anchor | Required expansion | Owning lane / dependency |
|---|---|---|---|
| Arrival | Existing public/auth boundaries | Welcome, intent explanation, consent, accessible onboarding and recovery | Existing auth/governance package; no bypass |
| Daily possibility | `/app` | Finite useful selection, return context, honest empty/recovery | EF-P preview; connected P1–P3 later |
| Explore | `/app/world`, `/app/opportunities` | Spatial/list parity, filters, valid detail, unavailable case | EF-P |
| Participation | `/app/opportunities/[id]/commit` | Clear terms, minimum viability, pending/full/cancel states | EF-P synthetic; P4 connected |
| Together | `/app/circles`, `/app/circles/[id]`, `/app/messages` | Foyer, preparation, direct conversation, notifications and boundaries | Existing previews; messaging/privacy/moderation specs needed |
| Creation | `/app/create` | Ingredients, preview, edit, draft lifecycle, later human-approved publish | EF-C; P2/A1/P3 and publishing authority later |
| Saved | `/app/saved` | Filters, empty state, eventually real saved records | EF1 synthetic; persistence package later |
| Identity | `/app/profile` | Clear personal field, visibility explanation, preferences | EF-I; real identity/privacy changes separately |
| Expression | `/app/personalize` and character/space/shop | Character, collection, object details, room editor | EF-I then EF-X |
| Memory | `/app/passport` | Accessible constellation/list, memory detail, proof lifecycle | EF-I preview; P5 proof |
| Season | `/app/personalize/season` | Chapter detail, world/list, archive, future quest detail | EF-S preview; governed progression later |
| Account | `/app/settings`, `/app/insights` | Clear settings groups, notification controls, data/export/delete explanations, honest insights | Separate settings/privacy and analytics scopes |
| Host | Existing Tonguee host/teacher surfaces retained | Overview, opportunity editor, participant roster, operations, cancellation, outcomes | Host work package after core; verified-publish guard preserved |
| Commerce | No new checkout authorized here | Plan comparison, purchase, pending, entitlement, restore, cancellation, receipt, support | Money/RevenueCat/platform specs |
| Marketplace | Existing legacy foundations are not new certification | Service booking, price breakdown, cancellation/refund, payout status, disputes | Marketplace/payment specialist specs |
| Help and safety | Existing controls retained | Contextual help, report/block, accessibility information, support case status | Safety/moderation/support packages |
| Operations | Existing admin foundations retained | Review queues, decision reasons, audit trail, incident/support resolution | Role/RLS/security gates |
| Place and partners | Vision only for this handoff | Venue detail, Beacon, Trail, Expedition, partner console | Location/privacy/physical-safety specs, after core |

## Navigation relationships

The five primary destinations stay stable. Your World opens from the avatar. Within Your World, distinguish Personal Field, Character, My Space, Collection and Passport with short descriptions. Season is reachable from Home and Your World without becoming another permanent primary tab. Host mode must be explicit if a future package introduces it; it should not crowd participant navigation.

Each deep destination needs a visible parent/back action, safe direct-entry state and meaningful empty state. Detail sheets are appropriate for objects and example memories; long editorial/operational flows should use pages. A new route must have an owner, data source, page title, entry points, back behavior, loading/error policy and acceptance row before implementation.

## Monetization lifecycle design contract — future, not authorized runtime

| System | Required states | Truth/authority rule |
|---|---|---|
| Cosmetic catalog | Available, unavailable, previewed, owned, equipped, incompatible | Server inventory determines real ownership; try-on never buys |
| Digital checkout | Quote/terms, pending, success, failure, cancel, delayed reconciliation | Price/product/renewal source must be approved; never infer success from a click |
| Entitlement | Active, renewing, canceled but active, expired, restored, disputed | Provider/server reconciliation; retain access according to actual terms |
| Season | Not started, active, complete, archived, expired activity | Actual server progress only; distinguish access expiry from owned-object policy |
| Quest | Eligible, active, evidence pending, accepted, rejected, retry, unavailable | Human/server proof rules and appeal where applicable; no client-awarded progress |
| Real-world booking | Available, commitment pending, threshold met, confirmed, canceled, fulfilled | Governed booking/money system; digital subscription is not booking settlement |
| Refund/support | Requested, under review, resolved, declined with reason | Never promise eligibility or refund timing without adopted policy |

Do not print a proposed revenue split, percentage, recurring price or refund promise from a monetization handoff as if adopted. Re-read `ARO_MONEY.md`, `ARO_SEASONS_AR.md` and the current monetization proposal/PR59 before specifying these systems. Host Pro and Season+ are digital entitlement concepts; real-world marketplace payments remain separate.

Keep five distinct concepts in copy and data: money, community-access credits, Season progress, cosmetic objects, contextual Trust. Sparks are memories, not a wallet balance. No purchased Trust, paid randomness, fake urgency, punitive streak loss or confusing currency conversion.

## Future package order

1. Finish bounded preview quality and reconcile existing FV work.
2. Governed P1–P5 connected participant loop and its infrastructure/security prerequisites.
3. Account/support/host operational completeness alongside eligible core packages.
4. Proof-backed progression and entitlement/inventory services with explicit policies.
5. Commerce and Season lifecycle, only after specialist adoption.
6. Places, partners, Trails and AR after location/privacy/safety readiness.

This sequence preserves the creative vision without making a beautiful facade imply capabilities that do not exist.
