# CB1-F4 physical-device and assistive-technology acceptance packet

- **Prepared:** 2026-10-22
- **Package:** CB1-F4 — Guided Create route integration
- **Pull request:** [#105](https://github.com/leonartist7/ARO.club/pull/105)
- **Base:** `f7adc10a40fa5388b8b1956bd80160b7f72cc990`
- **Pre-packet documentation head:** `41cba77740964de87416482252871cc92f05acc2`
- **Runtime/evidence source:** `8ec6979c83ab988639372f1797844ebb558155d9`
- **Status:** TEST HANDOFF — required physical-device and assistive-technology evidence has not yet been supplied

This packet turns the remaining product/design/accessibility gate into a reproducible test handoff. It is documentation only: it does not claim acceptance, broaden runtime behavior, enable a merge, activate a provider, or authorize a store or production action.

## Preconditions and evidence hygiene

1. Exercise the Vercel preview associated with the exact PR head being accepted, or a verified local/hosted production build of the same source. Record the exact commit SHA and URL.
2. Use only dedicated synthetic/test data. Do not enter secrets or personal information, and do not include either in screenshots, recordings, logs, filenames, or notes.
3. Before each platform run, start from a known clean synthetic session. Reset only dedicated test data; do not delete or mutate a real account.
4. Record device model, OS version, browser and version, screen reader and version, orientation, locale, theme, timestamp, exact URL/head, tester, and independent reviewer.
5. Use representative typed synthetic content so the unsaved-state and keyboard behaviors are exercised.

## Mandatory coverage matrix

| ID | Platform | Required coverage |
| --- | --- | --- |
| IOS | Physical iPhone + Safari | Portrait and landscape; dynamic address bar; home-indicator/safe-area behavior; short viewport; soft keyboard |
| AND | Physical Android phone + Chrome | Portrait and landscape; dynamic browser chrome; gesture/navigation bar; short viewport; soft keyboard |
| VO | VoiceOver on iOS | Full guided-flow semantics, focus, validation, disclosure states, exit guard, and Ready status |
| SR2 | TalkBack on Android **or** NVDA on Windows | Same semantic and focus checks as VO; record which alternative was used |

The gate requires both physical mobile rows, VoiceOver, and one of TalkBack or NVDA. Emulator-only, responsive-mode-only, or automated accessibility output is useful supporting evidence but does not replace these rows.

## Test flows and acceptance criteria

### 1. Entry semantics

Open `/app/create` with each query below and record the initial selection:

| Query | Expected initial selection |
| --- | --- |
| `?mode=learn` | Languages |
| `?mode=share` | Skills |
| `?mode=gather` | No category selected |
| invalid value | No category selected |
| absent `mode` | No category selected |

Confirm that legacy query handling selects only the intended category and does not bypass the guided flow.

### 2. End-to-end guided flow

Complete Choose → Shape → Details → Review → Ready with synthetic data. Cover EN, FR, and ES across the required devices, with representative light and dark runs. Verify:

- the current step, progress, headings, labels, help, and validation remain understandable;
- category selection and optional disclosures keep their visible and programmatic states;
- Review targeted edits return to Review with the edited data intact;
- Ready distinguishes saved/unsaved and published/unpublished truthfully;
- reset clears the guided state and removes the unsaved-exit guard without promising recovery.

### 3. Dynamic viewport, safe areas, and rotation

On both physical mobile platforms:

- collapse and expand browser chrome while moving through the flow;
- rotate portrait ↔ landscape on a populated step;
- use a short viewport and scroll to every action.

Pass only if content is not clipped, there is no viewport trap or unexpected horizontal scroll, fixed navigation does not cover controls or messages, and the home indicator / gesture bar does not conflict with actions.

### 4. Soft keyboard

Focus category search, manual-entry, and Details fields. With the keyboard open:

- ensure the focused control and its label remain visible;
- submit invalid data and ensure the error plus first invalid target can be reached;
- use fixed Back/Continue actions without overlap;
- close the keyboard and confirm viewport and focus recover coherently.

### 5. Screen-reader semantics and focus

Run the complete flow with VoiceOver and with TalkBack or NVDA. Pass only if:

- step headings and progress are announced meaningfully;
- categories, fieldsets, inputs, disclosures, buttons, and selected/expanded states have correct names and roles;
- validation is announced and focus moves to the first invalid field without losing context;
- a targeted Review edit returns to Review with predictable focus;
- the native unsaved-exit dialog exposes understandable choices, Cancel restores the page/focus, and Discard navigates once;
- Ready announces the status and the unsaved/unpublished disclosure truthfully.

Record the screen-reader gestures/commands used when a result depends on navigation mode.

### 6. Exit guard and navigation truth

After creating an unsaved change:

- Cancel from the native prompt retains data and restores usable focus.
- Discard navigates exactly once.
- Modified-click, new-tab, download, and fragment-only navigation remain unaffected.
- Back/reload receive the strongest browser-supported warning.
- Mobile termination/OS kill is documented as best-effort only; do not record it as guaranteed interception.

After reset, repeat navigation and confirm the guard is absent.

## Evidence package

Store evidence under:

`artifacts/ARO-CB1-F4/device-a11y/<run-id>/`

Include:

- `RESULTS.md` with the completed table below and the sign-off;
- optional `device.json` containing non-sensitive device/build metadata;
- focused screenshots or short recordings that show the criterion under test;
- a defect note for every failure with reproducible steps, expected result, actual result, severity, device/build metadata, and retest result.

Use descriptive filenames, for example:

- `ios-voiceover-learn-en-light-portrait-01.png`
- `android-talkback-share-es-dark-keyboard-01.mp4`
- `windows-nvda-review-focus-fr-01.mp4`

Hash the completed evidence package with SHA-256 and record the digest in the sign-off. Do not commit personal information, account identifiers, tokens, browser storage, or unrelated screen content.

## Results table

Duplicate rows as needed so every mandatory device, orientation, locale/theme sample, and criterion has an explicit result.

| ID | Platform / AT | Locale / theme / orientation | Criterion | Evidence path | Result (PASS/FAIL/BLOCKED) | Notes / defect |
| --- | --- | --- | --- | --- | --- | --- |
| IOS-01 | iPhone / Safari | EN / light / portrait | Entry + complete flow |  |  |  |
| IOS-02 | iPhone / Safari | FR / dark / landscape | Safe area + rotation + keyboard |  |  |  |
| AND-01 | Android / Chrome | ES / light / portrait | Entry + complete flow |  |  |  |
| AND-02 | Android / Chrome | EN / dark / landscape | Browser chrome + rotation + keyboard |  |  |  |
| VO-01 | iPhone / VoiceOver | Representative complete run | Semantics + focus + validation + guard + Ready |  |  |  |
| SR2-01 | TalkBack or NVDA | Representative complete run | Semantics + focus + validation + guard + Ready |  |  |  |

## Acceptance and sign-off

Acceptance requires all of the following:

- every mandatory row is PASS, or a recorded blocker/defect is resolved and its exact scenario is retested;
- no required physical iOS, physical Android, VoiceOver, or TalkBack/NVDA row remains “not tested”;
- the evidence paths resolve, the package SHA-256 is recorded, and results identify the exact accepted head;
- an independent product/design/accessibility reviewer explicitly accepts the exact head and evidence-package hash;
- normal exact-head repository checks pass.

Any runtime or test-harness change made in response to findings requires the applicable specialist reviews again. Publishing evidence or documentation alone still requires normal exact-head checks and does not itself close the independent acceptance gate.

### Sign-off template

- **Accepted PR head:**
- **Preview/build URL:**
- **Evidence run ID/path:**
- **Evidence package SHA-256:**
- **Physical iOS result:**
- **Physical Android result:**
- **VoiceOver result:**
- **TalkBack or NVDA result:**
- **Open defects/blockers:**
- **Tester name/date:**
- **Independent product/design/accessibility reviewer name/date:**
- **Decision:** ACCEPT / REJECT
- **Reviewer statement:** I reviewed the recorded results and evidence for the exact head and accept or reject CB1-F4 against the governing specification without expanding its scope.
