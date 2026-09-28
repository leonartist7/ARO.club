# ARO-RB5 — Public story, host guidance and help

## Authority and scope

- Status: **SPEC-REQUIRED / independent privacy review pending**, version 1.1.0, founder-approved rebrand and truthful-claims direction, updated 2026-09-28. The branch has provisional implementation evidence; this status does not authorize merge or release.
- Owner: ARO director. Implementation: `codex/rb5-public-support-20260927`, PR #77. Depends on RB0–RB4; blocks public story release. Product/design review is covered by the founder's scoped approval; an independent privacy reviewer must accept the on-device contact-draft retention contract before merge.
- Separate branch/PR stacked on RB4. Governing: `AGENTS.md`, `ARO_TRUST_SAFETY.md`, privacy/eligibility and payment/release boundaries, RB0–RB4.
- Scope: public About, How it Works, For Teachers, FAQ and Contact presentation/copy, plus global public header/footer links. Existing Auth/application/legal contracts stay in place. The old Contact page includes unverified email addresses, phone, office address and response claim; replace its public entry with a truthful on-device draft state without deleting any stored draft.

## Outcome

Replace legacy language-only story, fictional team/city/teacher/customer statistics, fabricated income/platform-fee/cancellation claims, and live-booking instructions with the approved orange-led ARO promise and honest Learn/Earn/Connect explanation. Host guidance must distinguish self-declared skill, verification and publishing authorization, with no income guarantee or review-time claim. FAQ must reflect current preview status and point to the actual Trust, privacy and contact routes. Contact must clearly state that no support mail backend is connected, offer an on-device draft, and retain existing local drafts without submitting private text. The public footer must have only working destinations; absent verified social URLs are omitted, not guessed. Do not remove Tonguee or Coco vertical identity or rewrite their governed contracts.

## UI and verification

Shared responsive layouts, EN/FR/ES, light/dark, keyboard/focus/reduced motion. Use RB1 tokens and RB2 assets, live UI copy, and existing routes. Keep external links only when verified. Check representative phone/desktop screenshots and navigation; run build/lint/type and meaningful route checks. No Auth, schema, Trust approval, payment or release assertion is created by this page copy.

## Personas, permissions and journeys

| Visitor | Read public story/help | Create or delete local contact draft | Server or other user access |
|---|---|---|---|
| Anonymous or signed-in visitor | Yes | On the current browser only | None from RB5 |
| Host applicant | Yes | Same as visitor | Existing governed application path only |
| Admin/service | Same public pages | No special draft access | No RB5 endpoint or privileged data |

About, How it Works and For Teachers explain the preview boundary and link to existing destinations. FAQ opens answers with native `details`; the host-verification answer links to `/for-teachers`, the age/privacy answer to `/privacy`, and the page links to `/contact`. Contact visitors read the on-device warning, enter subject and note, save locally, then see explicit confirmation that nothing was sent. Reloading shows stored drafts. Invalid input keeps the form; storage failure keeps the typed text and announces failure. The visitor can leave at any time; no draft is transmitted. Existing drafts under `conversa-contact-messages` remain readable in this package.

## State and data contract

`EMPTY → EDITING → VALIDATION_ERROR | SAVED_LOCAL | STORAGE_ERROR`. Retry after validation or storage recovery returns to EDITING. There is no `SENT` state. Save is an explicit visitor action and appends one record per successful click; repeat clicks may append duplicates and are not represented as delivery retries.

| Data | Source | Where stored | Visibility | Retention |
|---|---|---|---|---|
| Subject, max 120 characters | Visitor input | Browser `localStorage`, `conversa-contact-messages` | Same browser profile, including anyone sharing it | Until browser storage is cleared; no automatic expiry in this package |
| Note, max 4,000 characters | Visitor input | Same key | Same browser profile | Same |
| `savedAt` timestamp | Device clock | Same key | Same browser profile | Same |
| Older draft fields (including historical name/email) | Previous local Contact form | Existing records at same key; not rewritten | Same browser profile | Same |

No database schema, migration, RLS policy, API, email provider, analytics event or server-side copy is created. The form warns against sensitive information before save and does not imply confidentiality on a shared device. Browser storage is not encrypted by this app; deletion currently requires clearing site data. These retention and deletion limits require independent privacy acceptance before merge. A separate reviewed package must add export/delete controls or automatic expiry if required by that review; do not silently erase historical drafts.

## Locked boundaries and exclusions

- Self-declared skills never imply verified qualification or permission to publish. The existing teacher application/publishing gate remains the authority.
- No verified live class, booking, review, demand, income, platform-fee or support-response claim may be inferred from this preview.
- No price, payment, subscription, entitlement, refund or payout changes occur. AI, location and analytics are not used.
- No new account role, Trust rule, eligibility decision, mail delivery or production support promise is introduced.
- Tonguee and Coco retain their intentional vertical identities.

## UI, accessibility and responsive requirements

Public pages use one main landmark from the shared layout, a clear heading, readable body copy and working links. Contact has labelled fields, `role=status` for validation/save/failure, keyboard-operable controls and a disabled save button when storage cannot be read. FAQ uses native expandable controls and contextual routes. Art is decorative with empty alt text and explicit dimensions. Check 320/360/390px phone and 768/1440px desktop, short phone heights, light/dark, EN/FR/ES, focus visibility and reduced motion. A draft failure must never be phrased as successful submission.

## Reliability and performance

| Failure | User-visible recovery | Data consequence |
|---|---|---|
| Blank subject or note | Announce validation and keep input | No write |
| Storage unavailable, quota exceeded or malformed existing JSON | Announce local-save failure; keep input to copy manually | No claimed save or send; existing storage is not overwritten |
| Page reload after save | Show saved draft locally | No network request |
| Missing external support provider | Explain that support mail is not connected | No message leaves device |
| Stale/duplicate click | Existing implementation can append twice | No delivery; privacy review may require an idempotency or deduplication amendment |

The visual package reuses existing component dependencies and responsive WebP art; it must not add a new third-party request for contact text. The review evidence must record route responses, request methods, horizontal overflow and representative screenshots. No numeric performance improvement is claimed without a measured production baseline; the existing production build and image budgets remain the acceptance gate.

## Test matrix and acceptance mapping

| ID | Requirement | Evidence | Current result |
|---|---|---|---|
| RB5-1 | About/How/Host/FAQ present approved promise and truthful preview limits | `artifacts/ARO-RB5/browser.json`, responsive screenshots; copy inspection | Implemented, partial verification |
| RB5-2 | FAQ links to actual host Trust guidance, privacy and contact destinations | `/faq` browser link assertions | Pending refreshed evidence |
| RB5-3 | Contact validates, saves only on device, reloads draft, and never claims sent | Contact browser save/reload and non-GET audit | Implemented, partial verification |
| RB5-4 | Storage failure preserves input and discloses failure; historical drafts are not silently deleted | Source review and focused failure test | Source behavior present; test pending |
| RB5-5 | EN/FR/ES, light/dark, keyboard and responsive layouts | Six-route browser matrix plus focused accessibility review | Partial; full screen-reader review open |
| RB5-6 | Build/lint/type/regression and performance budget | Hosted Quality, local checks and production metrics | New-head hosted checks pending; numeric baseline open |
| RB5-7 | Independent privacy review accepts local retention/deletion behavior | Reviewer decision linked in PR #77 | **Blocking** |

No data/RLS integration test is applicable because RB5 creates no server operation. No analytics event is collected. Errors, retry, empty, validation and local success states are in scope; provider pending/sent states are deliberately absent. All acceptance rows and the privacy decision must be satisfied before this package can become VERIFIED or merge.
