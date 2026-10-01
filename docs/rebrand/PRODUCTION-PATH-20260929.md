# ARO release path from the reference-led preview

The six founder references establish the intended visual direction. They do not establish live supply, member activity, city coverage, checkout policy or review approval. PR #92 is merged into the RB15 integration branch, not `main`. RB17 is a presentation package on that head. The existing public deployment still serves the older released site.

| Lane | User outcome and boundary | Dependency / approval | Suggested branch ownership |
| --- | --- | --- | --- |
| A. Visual journey | Home story, onboarding preview, app Home/Explore/Create/detail cohesion; working links, theme and language, truthful examples | RB17 and independent design/accessibility review | Website and existing app presentation only |
| B. Account and profile | Real signup/recovery, eligibility, consent, account mode, editable private profile, deletion/export | Parent I0/Auth baseline; RB2 privacy/security/eligibility review; separate SPEC-READY live onboarding package and RLS tests | Auth, private profile, onboarding; coordinate with current Google Auth owner |
| C. Personal discovery | User chosen interests with controlled taxonomy, safe suggestions, coarse city choice, real eligible supply and meaningful empty states | P1 baseline and RLS, then P2/P3; location privacy/physical safety and Trust review before any geolocation/map | Taxonomy/profile and discovery data; no speculative host fixtures |
| D. Host class lifecycle | Draft → review → publish → scheduled session → cancel/complete, with server-side verification and clear participant terms | Verified-only publish trigger, RB4 Trust, host moderation, availability and P4 package | Host/admin workflow and existing Tonguee vertical |
| E. Booking and money | Authoritative availability/price, explicit payment or approved credit redemption, confirmation, cancellation/refund, reconciliation | Separate marketplace payment/compliance/security spec, provider and webhook review, P4; credits need issuance, ledger, abuse, expiry, tax and refund decisions | Transactions, isolated from RevenueCat subscription entitlements |
| F. Release | Exact-head CI, privacy/Trust/design/accessibility reviews, performance and full browser matrix, operational support, native store requirements if applicable | Protected merge order and release checklist | Release coordinator after A–E gates |

Implement each approved package on its own branch and PR, with one owner for shared files. Parallel work can proceed on independent visual review, Auth baseline, privacy/Trust decisions and payment specification; runtime branches merge only after their dependencies pass. `main` and production are not promoted from a visual preview alone.

## Product decisions still required

1. Which countries/currencies and class categories launch first, and who supplies verified real classes?
2. Whether ARO credits exist at launch, what they represent, how they are earned/bought/redeemed/refunded and who bears the liability. Until decided, class checkout should use no implied coin balance.
3. Whether city is chosen manually at coarse granularity or precise location is explicitly consented to, and what map provider, retention and safety rules apply.
4. Which custom interests may be private free text, searchable public tags or moderated taxonomy. The current P1 spec allows bounded language goals and capabilities; it does not authorize arbitrary public tags.
5. The initial app packaging target (responsive web/PWA versus native store), support owner, and independent release reviewers.

This document is a dependency map, not authorization for runtime changes in lanes B–F. Each lane needs a package spec using `specs/PACKAGE_TEMPLATE.md` and evidence under `artifacts/` before it can claim VERIFIED.
