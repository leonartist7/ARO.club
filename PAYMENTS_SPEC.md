# 💳 TONGUEE — PAYMENTS & PAYOUTS SPEC (C0, Opus-authored)

> **For the implementing agent (Phase C).** This is the money architecture: Stripe Checkout + Connect Express, escrow-style hold, payout release, refunds, and the data model. **Read `AGENTS.md` first — it is the operating contract.** Implement C1–C4 against it **in Stripe test mode**. Follow the data model exactly; if anything is ambiguous, stop and ask rather than guess. **The director reviews the final PR before merge — mandatory; do not merge without it.**
>
> Builds on the schema already in `supabase/schema.sql` (`bookings`, `experiences`, `teachers`) and the Trust Engine in `supabase/trust-engine.sql`.

---

## 0. Principles
1. **Never trust client amounts.** All prices computed server-side from the `experiences` row.
2. **Escrow the money.** Learner pays in full → platform **holds** funds → release to teacher only **after the experience completes** + a dispute window. This protects learners and is the trust backbone.
3. **Verified teachers only get paid.** Payouts require a connected, `payouts_enabled` account AND the teacher is `verified=true, status='active'` (Trust Engine).
4. **Idempotent + signed.** Every Stripe webhook verified; every money mutation idempotent.
5. **Test mode first.** Ship and verify entirely on Stripe test keys before any live key exists.

---

## 1. Stripe architecture — Separate Charges & Transfers (chosen)
**Decision:** use **Separate Charges and Transfers**, *not* destination charges.

- **Charge:** learner pays the **platform** account (PaymentIntent via Checkout Session). Funds land in the Tonguee platform balance.
- **Hold:** funds sit in the platform balance until the experience is completed + dispute window passes.
- **Transfer:** after completion, platform creates a **Transfer** of `payout_amount` to the teacher's **Connect Express** account.

**Why:** clean escrow (we decide when teachers get paid), trivial full refunds before transfer, and per-booking control. Destination charges would auto-route funds and fight the hold model.

**Commission:** **18%** platform fee (within the 15–20% band).
```
platform_fee = round(total_price * 0.18)      // cents
payout_amount = total_price - platform_fee     // Stripe processing fees absorbed by platform out of commission for MVP
```
(Document the Stripe-fee decision in code comments; revisit at scale.)

---

## 2. Data model — additions (new migration `supabase/payments.sql`)

```sql
-- 2.1 Extend bookings (table already exists in schema.sql)
ALTER TABLE bookings
  ADD COLUMN IF NOT EXISTS stripe_checkout_session_id TEXT,
  ADD COLUMN IF NOT EXISTS stripe_payment_intent_id TEXT,
  ADD COLUMN IF NOT EXISTS platform_fee INTEGER,           -- cents
  ADD COLUMN IF NOT EXISTS payout_amount INTEGER,          -- cents
  ADD COLUMN IF NOT EXISTS payout_status TEXT DEFAULT 'none'
    CHECK (payout_status IN ('none','held','paid','reversed')),
  ADD COLUMN IF NOT EXISTS payout_transfer_id TEXT,
  ADD COLUMN IF NOT EXISTS refund_amount INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS refunded_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS checked_in_at TIMESTAMPTZ;
-- NB: bookings already has total_price, original_price, discount_applied,
-- status (pending|confirmed|cancelled|completed),
-- payment_status (pending|paid|refunded|failed), stripe_payment_id, completed_at.
-- Treat money columns as CENTS going forward; migrate existing decimals if seeded.

-- 2.2 Cancellation policy on experiences
ALTER TABLE experiences ADD COLUMN IF NOT EXISTS cancellation_policy TEXT
  DEFAULT 'moderate' CHECK (cancellation_policy IN ('flexible','moderate','strict'));

-- 2.3 Teacher payout accounts (Connect Express)
CREATE TABLE IF NOT EXISTS teacher_payout_accounts (
  user_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  stripe_account_id TEXT UNIQUE,
  charges_enabled BOOLEAN DEFAULT FALSE,
  payouts_enabled BOOLEAN DEFAULT FALSE,
  details_submitted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.4 Payout ledger (finance audit trail)
CREATE TABLE IF NOT EXISTS payout_ledger (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
  teacher_user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  amount INTEGER NOT NULL,                 -- cents, signed
  kind TEXT CHECK (kind IN ('payout','refund','reversal','fee')),
  stripe_ref TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.5 Webhook idempotency
CREATE TABLE IF NOT EXISTS stripe_events (
  id TEXT PRIMARY KEY,                      -- Stripe event id
  type TEXT, processed_at TIMESTAMPTZ DEFAULT NOW()
);
```
**RLS:** `teacher_payout_accounts` → owner (`user_id = auth.uid()`) + admin (`is_admin()`); `payout_ledger` & `stripe_events` → admin-only read, service-role writes (edge functions use the service-role key, which bypasses RLS — keep these tables locked to clients).

---

## 3. State machine (booking)
```
[create] pending/unpaid
   │ Checkout completed (webhook)
   ▼
confirmed/paid, payout_status=held, booked_spots++   ← funds in platform balance
   │ teacher scans QR at the session
   ▼
checked_in_at set
   │ experience end + DISPUTE_WINDOW (24h) passes, no open dispute
   ▼ (cron: release-due-payouts)
completed, payout_status=paid (Transfer created)     ← teacher paid (amount − 18%)

Cancellations/refunds branch off pending/confirmed per policy (§5).
DISPUTE_WINDOW = 24h after experience end (config constant).
```

---

## 4. Edge functions (Supabase Functions, Deno + `stripe` SDK)
All use the **service-role** key (server-only) and Stripe **secret** key. Never expose either to the client.

| Function | Trigger | Does |
|----------|---------|------|
| `create-checkout-session` | client (authed) POST `{experience_id, num_people, is_couple}` | Re-reads experience server-side; **computes** total/discount/platform_fee/payout_amount; checks spots; inserts `bookings` (pending/unpaid) with computed amounts; creates Stripe **Checkout Session** (mode=`payment`, `metadata.booking_id`, success/cancel URLs); returns `{url}`. Idempotency-Key = booking id. |
| `stripe-webhook` | Stripe | Verify signature (`STRIPE_WEBHOOK_SECRET`); dedupe via `stripe_events`. Handle: `checkout.session.completed` → set booking paid+confirmed, `payout_status='held'`, store PI id, `booked_spots++` (atomic); `payment_intent.payment_failed` → `payment_status='failed'`; `charge.refunded` → reflect; `account.updated` (Connect) → sync `teacher_payout_accounts` flags. |
| `connect-create-account` | teacher (authed, must be verified) | Create Express account; upsert `teacher_payout_accounts`; return account id. |
| `connect-onboarding-link` | teacher | Create AccountLink (onboarding) and return URL. |
| `release-due-payouts` | **cron (hourly)** | Select bookings `status='completed' AND payout_status='held' AND now() > (experience end + 24h)` whose teacher `payouts_enabled`; create **Transfer**(`payout_amount`, dest=connected acct, `transfer_group`/metadata booking_id); set `payout_status='paid'`, `payout_transfer_id`; write `payout_ledger`. Idempotency-Key = booking id. |
| `process-refund` | learner cancel OR admin | Compute refundable per policy (§5); create Stripe Refund; set `payment_status='refunded'`(or partial), `status='cancelled'`, `refund_amount`, `refunded_at`, `booked_spots--`; if already transferred, create Transfer **reversal**; ledger row. |

**Check-in / completion:** a small authed endpoint (or teacher dashboard action) sets `checked_in_at` and, at/after experience end, flips `status='completed'` + `completed_at`. (Can also be a cron that auto-completes past, paid, non-cancelled bookings.) Completion is what makes a payout *eligible*; the cron in `release-due-payouts` enforces the dispute window.

---

## 5. Cancellation / refund policy tiers (`experiences.cancellation_policy`)
Computed against time-to-start `Δ = experience_start - now`:
| Policy | Full refund | Partial | None |
|--------|-------------|---------|------|
| **flexible** | Δ ≥ 24h → 100% | — | Δ < 24h → 0% |
| **moderate** (default) | Δ ≥ 7d → 100% | 7d > Δ ≥ 48h → 50% | Δ < 48h → 0% |
| **strict** | Δ ≥ 14d → 100% | 14d > Δ ≥ 7d → 50% | Δ < 7d → 0% |
- **Teacher cancels** or **no-show by teacher** → always **100% learner refund** + flag teacher (Trust Engine quality monitoring).
- Refund logic lives server-side in `process-refund`; the UI only *shows* the computed refundable amount before confirm.

---

## 6. QR ticket & check-in
- On paid booking, generate a ticket QR encoding a **signed token** (HMAC of `booking_id` + secret) — not just the raw id.
- Teacher's dashboard "scan / enter code" verifies the token, marks `checked_in_at`. Attendance + experience-end → `completed` → payout eligibility (§3/§4).
- Library: `qrcode` (render) client-side; verification server-side in an edge function.

---

## 7. Security checklist (the director verifies every box in review)
- [ ] Webhook signature verified; events deduped via `stripe_events`.
- [ ] All amounts computed server-side from DB; client sends only ids/quantities.
- [ ] Idempotency keys on session creation, transfers, refunds.
- [ ] Secret key & Connect account ids never reach the browser; only `VITE_STRIPE_PUBLISHABLE_KEY` is public.
- [ ] Transfers gated on teacher `verified=true, status='active', payouts_enabled=true`.
- [ ] `payout_ledger`/`stripe_events` not client-readable (admin/service-role only).
- [ ] Spots updated atomically on pay/refund (no oversell).

---

## 8. Env / config
- Supabase function secrets: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` (+ Connect webhook secret if separate), `SUPABASE_SERVICE_ROLE_KEY`, `TICKET_HMAC_SECRET`.
- Frontend: `VITE_STRIPE_PUBLISHABLE_KEY`.
- Constants: `PLATFORM_FEE_PCT = 0.18`, `DISPUTE_WINDOW_HOURS = 24`.

---

## 9. Worked example (sanity check)
Experience $20.00, couple (×2, 15% existing discount): `original = 4000¢`, `discount = 600¢`, `total = 3400¢`. `platform_fee = round(3400*0.18) = 612¢`. `payout_amount = 2788¢`. Learner charged $34.00 → after the session + 24h, teacher receives $27.88; Tonguee keeps $6.12 (less Stripe fees).

---

## 10. C-phase implementation checklist (for the implementing agent)
- **C0 (this doc):** done — director-authored.
- **C1 🟦 S·hi:** add `@tanstack/react-query` + provider in `src/main.jsx`; replace mock-JSON reads (`src/data/experiences.json`, `teachers.json`) with Supabase queries via hooks (`useExperiences`, `useExperience`, `useTeacher`). Keep verified-only (RLS already enforces). Apply `supabase/payments.sql`.
- **C2 🟦 S·hi:** `create-checkout-session` + `stripe-webhook` functions; wire **"Book now"** on `ExperienceDetailPage` (per DESIGN_SYSTEM §8.3) → session → redirect; `BookingConfirmation` + `MyBookings` pages; reuse booking fields.
- **C3 🟦 S·hi:** Connect onboarding (`connect-create-account`/`connect-onboarding-link`) surfaced in Teacher Dashboard; `release-due-payouts` cron; payout status UI.
- **C4 🟦 S·lo:** QR ticket (`qrcode`) + teacher check-in; cancellation-policy selector on Create Experience + refund preview on cancel.
- **Verify (test mode):** `stripe listen` → webhook; pay with `4242 4242 4242 4242`; confirm booking flips to paid+held and spots increment; simulate completion + run cron → Transfer appears in Stripe test dashboard; test each refund tier; reversal after transfer.
- Finish: `npm run build` + `npm run lint` + the `AGENTS.md §6` Self-Review Protocol; **request director review before merge** (money + security).
