# N1 independent-review repairs

Baseline: b431fb59981458f82c635deb2d60e7ffb4077d43. Owning PR: #54. Scope: N1 v1.3, September 21 controller handoff. One writer; no SQL, provider or production changes.

## N1-U
Cleanup outcomes are associated with the original metadata error through a WeakMap, including frozen errors. A confirmed exact-path deletion reports `removed`; a resolved provider error, rejection or missing deletion confirmation reports `failed`. Raw cleanup responses, paths and credentials are not attached or logged. Seven focused tests pass, including exact uploaded-path matching and both failure forms; the original error identity is preserved. The UI exposes a safe cleanup warning and retains the ability to report the original failure at the data layer.

## N1-A11Y
The private document upload surface is explicitly bound in N1 v1.3. A native button opens the file input, has a visible keyboard focus outline and a document-specific accessible name. Pending/success states use a polite live region; errors use an alert. Upload remains keyboard-focusable during pending work while activation is guarded, and choosing the same file again is possible. The CI proof tabs to the control, asserts visible focus and opens the real file chooser with Enter before supplying a synthetic file. It does not bypass activation with input.setInputFiles.

## N1-R7
Controller approved only the additional auth/run fixture paths: four separate applicants and the API owner; exactly five accounts before reset, zero after. Each 360/1440 × light/dark case uses its own context/account and completes onboarding, editable draft, pending upload, induced metadata failure, cleanup/error focus, retry, persisted document and explicit submission. Reloads verify persisted profile, application and document values and immutable submission timestamp/status. Screenshots are named by case and state; only synthetic documents are used.

Successful browser Auth/data request durations are collected without URLs, query strings, payloads, account identifiers or credentials. Each case records counts and p95 timings and requires both categories below I0.2 §20's 1,000 ms budget. Induced failures are not treated as successful-call timings. Evidence JSON shares the existing seven-day synthetic CI artifact directory.

## Verification state
Local lint, type checking, production build, boundary tests and cleanup unit tests pass. Full unit suite passed before the final additional unconfirmed-removal test; the final seven-case cleanup suite also passed. Bundle comparison covers all client chunk files under the same Next.js toolchain; JSON evidence records the incremental delta. This is not a claim that the earlier Vite-to-Next.js payload regression is resolved.

Exact-head hosted CI and independent finished-diff review remain required. Hosted email, production backend/SMTP, human acceptance and release gates remain separate. The controller reconciles final acceptance; these implementation notes do not self-approve it.
