# Circle Builder screen and navigation contract
Version 1.0.0 · ARO-CB1-P · 2026-10-01 · Candidate for reviewed CB1-F2/F3/F4 adoption; not current UI.

## Scope and hierarchy
Four memory-only screens and a ready state. The full MVP source is reconciled separately, including six-stage lesson/evidence/session/review content; this preview is not its completion.
Use existing ARO tokens, typography, shell, locale/theme and primitives. English/light is the released presentation; underlying EN/FR/ES and dark paths remain supported. Never rename Coco or the Tonguee vertical.

## Screens
| State | Content order | Primary action | Back/Edit |
|---|---|---|---|
| Choose | Local-only disclosure → heading → labelled search → wrapping guide-group buttons → one labelled example or own idea → compact guide | Shape my idea | Shell exits guarded after meaningful selection |
| Shape | heading → title → learner outcome → selected-category optional questions → proposed example help | Add the details | Back to Choose; preserve edits |
| Details | heading → People, Place, Time disclosure groups → actual entered sketch | Review my Circle | Back to Shape |
| Review | category/guide → title/outcome → category answers → People/Place/Time → local-only reminder | Finish my sketch | Edit Shape or named Details group |
| Ready | “Your sketch is ready. It hasn't been saved or published.” → actual summary | Edit sketch | Start another with discard confirmation |

“Build your Circle” describes a sketch of an Opportunity/Experience for a future cohort. Never describe a verified host, active session, attendee, published listing or available venue.
Choose has three preview guide groups, explicitly labelled as sketch choices rather than launched subject categories. Skills/Music visibility grants no eligibility. Search is case/accent tolerant; search text is UI state, not a sketch field. Empty search has Clear search; no dead “Other” button. Own idea stays in selected group.
Only category, title and outcome are required to finish a local sketch. Optional omissions display “To decide”; no fake progress/participants. One active Details group; opening another closes the prior group without clearing it.
Desktop >=1024 uses readable sketch side panel; smaller widths stack a labelled Show my sketch disclosure. Keyboard/DOM reading order stays form first, preview second.

## Exact transient field contract
All strings start empty, trim for validation/summary, retain typed text during editing. Limits use JavaScript UTF-16 string length, matching F1; surrogate pairs count as two units. Render as text. Do not silently truncate.
| Key | Surface/purpose | Type/constraint | Default |
|---|---|---|---|
| categoryId | Choose/guide group | languages, skills, music only; required | null |
| title | Shape/recognizable idea | text, trimmed 1–80 UTF-16 units; required | empty |
| outcome | Shape/realistic takeaway | textarea, trimmed 1–240; required | empty |
| audience | People/adult starting level description | text, optional max160; adult example copy | empty |
| groupSize | People/planned learner seats | inputmode numeric; optional whole decimal 1–4, hosts excluded; never a granted cap | empty |
| venueType | Place/public setting | to-decide, indoor-cafe, public-studio, public-rehearsal-space, public-library, other-public-venue | to-decide |
| placeDescription | Place/coarse public description | optional text max160; helper prohibits private address/contact details | empty |
| durationMinutes | Time/illustrative duration | optional whole decimal 1–240 | empty |
| date | Time/optional planned date | YYYY-MM-DD, actual calendar date; no past-date promise/rejection for sketch | empty |
| time | Time/optional planned local start | 24-hour HH:mm | empty |
| timeZone | Time/optional explicit timezone | valid IANA zone via Intl.DateTimeFormat; max80; no inferred location | empty |
| targetLanguage | Shape/Languages | text max160 | empty |
| practiceLevel | Shape/Languages | text max160 | empty |
| activity | Shape/Languages | text max160 | empty |
| skill | Shape/Skills | text max160 | empty |
| experienceLevel | Shape/Skills or Music | text max160; compatible across these groups | empty |
| materials | Shape/Skills | text max160 | empty |
| instrument | Shape/Music incl voice | text max160 | empty |
| practiceFormat | Shape/Music | text max160 | empty |
| equipment | Shape/Music | text max160 | empty |

Date/time/zone are optional individually; if both date and time are supplied, require an explicit valid timeZone before Review. A partial plan is labelled “Date/time/zone to decide” for missing parts. Never compute/store a booking instant, resolve DST ambiguity or infer actual availability in CB1. Later Session package owns those rules.
Known F1 deltas assigned to F2/F3: 1–4 preview bound; date/time/timeZone fields and errors; detailsGroup; reviewReturnTarget; meaningful-edit detection. These are future source edits, not authorized by this preparation commit.
No price, qualifications, contacts, addresses, uploads, cohost invitation or attendance field. Lesson outline/prerequisites/setup/accessibility/quiz/evidence content is retained in the source-requirement map for its dedicated package; absence is explicit.

## Example and suggestion semantics
Use the three F1 curated examples, labelled Example, with explicit “Use this example”. Manual path is equally prominent. The curated guidance is static assistance, never AI/chat.
Example fill touches only untouched empty supported fields. A typed or explicitly cleared field is protected. Display the proposed replacement and affected field if a separate suggestion targets an already-entered answer; apply only after explicit acceptance. Decline preserves input. F2 spec must not invent broader automatic mutation authority.
Tonguee asks a speaking-outcome question; Squilly asks what people can make/practice; Rockatoo asks a feasible musical practice question. No typewriter, nagging, autoplay sound, looping dance, fake praise or income promise. Hide guide hides only the panel/art; instructions, errors and actions remain.

## Navigation, focus and review return
NEXT validates active required fields plus any supplied optional field. Failure preserves state, associates error through aria-describedby and focuses first invalid field; concise polite live message.
After explicit Next/Back, focus the new heading with tabindex=-1; after pill selection, typing, suggestion acceptance or disclosure toggle, keep focus at the trigger/field.
Review Edit sets target=shape or details:people/place/time. Only that group opens; button becomes “Return to review”. On successful validation return directly to Review and focus the edited summary section/heading. Cancel editing returns to Review with current edits retained (label “Back to review”, no claim of undo). Ordinary Back from other steps follows the preceding screen.
Ready → Edit sketch returns Review, preserving data. Start another requests reset when meaningful sketch exists.
Category changes retain shared fields and destination-allowlisted compatible answers/touched markers. If incompatible nonempty answers exist, show their human labels in confirmation; Keep category / Change category. Cancel preserves answers, category, focus and pending target. Confirm clears only identified incompatible answers and old untouched example defaults per F1 rules, returns Choose, then focuses the selected group button.
Meaningful sketch means selected category or any nonblank supported field/answer; search/guide visibility/disclosure/touched markers alone do not cause a discard prompt. Reset on empty state is immediate; nonempty uses Keep editing / Start another.

## Exit guard contract
A registered builder guard coordinates owned same-app navigation: shell Create→World link, header profile/brand links, footer navigation, builder links and programmatic app navigation through the shared navigation adapter. Modified/new-tab/download/external links retain browser semantics and do not discard the current tab's sketch.
For same-tab owned navigation with meaningful input: prevent transition, store only destination route (no input), show Keep editing / Discard sketch. Cancel preserves state and restores initiating control focus. Confirm clears component state, removes guard, navigates once. Never add a second central Create button.
Cross-document close/reload uses beforeunload only while meaningful state exists; remove listener on reset/unmount. Browser controls and mobile termination are best-effort: native wording/browser support varies. Client-side browser Back/Forward cannot be reliably vetoed by Next's public router; do not add history traps, monkey-patch private Next APIs or promise guaranteed blocking. Disclosure covers loss. Route/shell acceptance must explicitly test actual back/reload behavior and this limitation.
No persisted copy for recovery and no leave beacon. Nested dialogs are prohibited; one pending confirmation at a time.

## Accessibility, motion and failure
44x44 controls; >=16px essential copy; AA text/UI contrast; visible focus; native button/input/fieldset/legend/disclosure semantics. Pill buttons use aria-pressed (not a faux tablist); loading art is decorative when adjacent guide name supplies meaning. Art alt="" in that context; labelled fallback shows guide name and category with stable icon.
Dialogs have named title/description, focus trap, Escape=cancel, trigger restoration; destructive confirm is not initial focus. Errors remain usable with guide hidden and CSS/animation disabled.
Reduced motion disables transform arrivals/orbit interpolation; same labels/state remain. Standard transitions use existing runtime, 150–200ms micro-interactions and <=300ms step changes; no forced delay. Sketch completeness uses text; never social proof.
Reserve art aspect ratio. Asset failure replaces image once with stable icon/guide text; no reload loop. Initial render, empty input, populated, validation, pending confirmation, ready and art failure are explicit. Remote saving/loading/permission errors are absent because there is no operation to perform.

## Release evidence required in F4
320/360/390/768/1440, short phone/keyboard and safe-area/nav clearance; keyboard through all groups/examples/manual/edit/dialog paths; reduced motion; EN/FR/ES and both themes; three guide full silhouettes/failure; before/after route metrics; unique canary text absent from URLs/storage/request bodies/headers/server actions/console. Inspect outgoing GET query and POST/beacon/WebSocket paths, not only fetch calls.
No builder input on page-render, step, edit, exit, reload or completion; legacy mode=learn/share/gather reads for entry compatibility without writing sketch values. They may map to preview defaults only under F4's explicit accepted rule; current fixture behavior remains during preparation.
