# OneSignal award evidence

Updated 2026-09-08. SDK absent; App ID unknown; deployed campaigns: unverified/none evidenced. This is a proposed retention design, not an active campaign.

## First valuable campaign

After a user explicitly joins a real language Circle and opts into reminders, send a reminder before its confirmed start. Deep-link into that Circle's authenticated details. On the lock screen use neutral copy: “Your Circle is coming up. Open ARO for the details.” Do not include private interests, exact meeting points or participant names.

Optional follow-up after a completed Circle: “How did your Circle go? Add a moment to your Passport.” Suppress after an outcome is recorded, opt-out, deletion, cancellation or loss of access. No fake readiness signals from prototype fixtures.

## Implementation acceptance

Permission education after first value; native permission denied/re-enabled handling; account-bound subscription login/logout; unsubscribe controls; server-verified membership; campaign deduplication by user/Circle/trigger/version; timezone and quiet hours; stale-message expiry; cancellation suppression; deep-link authorization and unavailable-Circle fallback. Proposed cap: one nonessential push per day and two per week. Confirm product/privacy policy before implementation.

Configure sandbox and production separately. Keep provider secrets server-side. Do not send marketing or test notifications to real people without the founder's explicit sending approval. User-facing preferences and published privacy statements must match actual processing.

## Evidence checklist

- [ ] OneSignal App ID and native SDK version.
- [ ] Real device permission/token registration, foreground/background/terminated-state deep links.
- [ ] Deployed campaign ID/configuration and dated dashboard screenshot.
- [ ] Logged-out, switched-account, revoked-consent and deleted-account suppression tests.
- [ ] Eligible → delivered → opened → meaningful return → attendance counts.
- [ ] Holdout comparison where sample size permits; no causal claim from opens alone.

Award argument after verification: ARO invites users back when a real shared experience needs their attention, and measures whether that return leads to participation.

[Official category](https://www.shipaton.com/categories/keep-them-coming-back-award), checked September 8: working integration and deployed campaign required; App ID and implementation explanation accompany submission.
