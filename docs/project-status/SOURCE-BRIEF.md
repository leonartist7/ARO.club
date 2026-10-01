# Circle Builder source brief

Reference copy read from [ARO Circle Builder MVP and Implementation Prompt](https://chatgpt.com/space/page_45144b8be2b48191a8abb6b60895f8a2) on 2026-10-01, Page sequence 0. The original is preserved. This copy is source/proposal material, not approved runtime authority. Newer explicit mascot requirements and narrower governing package specs remain controlling. [Reconciliation](README.md#source-reconciliation-for-circle-builder).

ARO’s Circle builder helps people turn something they know into a small, worthwhile learning experience. This document brings together the category catalog, mascot guidance, teaching eligibility, evidence review, collaboration, capacity, and the creation experience. It includes a master prompt for continuing the work in a new build chat.

A **Circle** is a hosted lesson with a clear outcome, an interactive activity, a welcoming setting, and a host who can support the learners. A **session** is a dated occurrence of that Circle. The goal is to make creation feel friendly and creative while giving learners clear reasons to pay.

This is an MVP specification, not a statement that these features already exist. Policy recommendations are labeled below.

## MVP decisions

| Area | User requirement | Proposed implementation |
|---|---|---|
| Create | A prominent central button | Primary navigation action with a visible Create label |
| Categories | Attractive pills and useful ideas | Searchable catalog, one primary category, optional topic tags |
| Mascots | Tongy for languages; Philly the squirrel for skills | Two guides at launch; category assigns the guide automatically |
| Builder | Guided, fun, simple and pleasant | Six short stages, animated cards, autosave and editable preview |
| Hosting access | Attend three classes before teaching | Three verified attended Circles unlock host review; drafting remains open |
| Teaching evidence | Upload work and use AI to review it | Private evidence, sample lesson and AI advisory review |
| Group size | One-to-one through groups, up to four learners | Proposed initial approved cap of one or two; expansion reviewed after four hosted sessions |
| Collaboration | Work with another person | One invited cohost with explicit acceptance |
| Support | Help build lessons, materials and quizzes | Editable lesson outline, uploads and optional short quizzes |

The three-attendance rule measures familiarity with ARO, not subject expertise. A host still needs approval for what they propose to teach. Four completed hosted sessions should open a capacity review rather than automatically prove readiness to teach larger groups.

**Recommended launch exception:** approved founding hosts can enter through a human-reviewed route, with an audited reason, so the first Circles can exist before anyone has attended three. This is an operational proposal, not an open self-service bypass. Free, subsidized and paid sessions can count toward attendance; purchasing bookings alone never counts.

## Category catalog

Use stable internal IDs and configurable category definitions. Each category needs examples, topic tags, a guide, evidence prompts and suitable venue hints.

| Category | Example Circle ideas | Learner takeaway |
|---|---|---|
| Languages | French café conversation, travel Spanish, pronunciation | Practiced conversation and useful phrases |
| Writing | Short stories, poetry, journaling, personal essays | A revised piece with feedback |
| School and study skills | Essay structure, math puzzles, science concepts, revision planning | Solved problems or a study plan |
| Photography | Phone portraits, sunset photo walks, composition, editing | Three improved photos |
| Video and content | Reels storytelling, phone editing, product videos | An edited clip or storyboard |
| Communication and social confidence | Public speaking, conversation practice, storytelling, improv | A practiced introduction or short talk |
| Art and illustration | Plaza sketching, watercolor, collage, comics, calligraphy | A sketch or artwork |
| Career and professional skills | CVs, interviews, portfolio storytelling, presentations | Improved professional material |
| Digital and technology | Canva, spreadsheets, beginner coding, websites, practical AI | A working design or small project |
| Crafts and making | Crochet, embroidery, mending, origami, jewelry | A made or repaired object |
| Nature and gardening | Plant care, balcony gardens, nature journals, bird observation | A care plan or field journal |
| Food and drink culture | Coffee brewing, tea traditions, baking, cooking | A practiced technique or recipe |
| Music and sound | Theory, songwriting, rhythm, headphone production | A melody, rhythm or audio sketch |
| Movement and coordination | Beginner dance, juggling, gentle mobility | A practiced sequence |
| Games and problem solving | Chess, strategy, logic puzzles, collaborative challenges | A strategy practiced through play |
| City and culture | Architecture, local history, observation walks, cultural sketch trails | An observation journal or cultural understanding |

Avoid duplicate categories for overlapping lessons. A creative short-story workshop belongs in Writing; academic essay coaching can belong in School and study skills with a writing tag. A photo walk belongs in Photography with city and outdoor tags.

Seed the full catalog with at least one editable template per category. **Recommended publishing rollout:** start with languages, writing, photography, art, communication, games, digital skills and adult study skills. Other categories remain visible with clear availability labels until their venue, safety and review requirements are operational. Specialized school sessions involving children require their own later workflow; do not imply it already exists.

An Other option collects a topic proposal for review and assignment. It must not bypass category requirements.

## Mascot guidance

**Tongy** guides Languages. **Philly**, the squirrel, guides the other launch categories using prompts appropriate to each subject. More category mascots can be added later without changing the builder. These are the latest requested names; reconcile older names or assets deliberately while preserving existing data.

Choose the category first and introduce its mascot. Let users hide the guide or switch presentation preferences. Every required function remains usable without the mascot or AI.

The guide asks one question at a time and offers two or three useful choices plus Write my own. It helps the host think; it never certifies expertise or promises income.

Tongy might ask: “What should learners feel comfortable saying by the end?” or “Would a café role-play or a conversation walk suit this?”

Philly might ask: “What could someone make or improve?” or “Would you like a practice challenge, a feedback round, or both?”

Useful controls: Suggest ideas, Show an example, Write my own and Hide guide. AI suggestions remain proposals until the host accepts or edits them.

## Six stages of creation

### 1 Choose a category and idea

Show category pills, search and relevant idea cards. The host can use a template or their own idea. Assign the mascot and save the choice. A user below the attendance threshold sees: “You can build your Circle now. Attend three Circles to unlock host review.”

### 2 Define the learner outcome

Ask what the host knows, who the Circle is for, the starting level and what learners can do afterward. Capture title, prerequisites and one realistic outcome.

Help narrow vague promises. “Learn photography” becomes “Take a better phone portrait using light and framing.” Show a short editable summary before moving on.

### 3 Build the lesson

Offer three editable sections: welcome and demonstration, guided practice, feedback and recap. Capture duration and section timings.

Allow instructions, a worksheet or image, and an optional quiz of up to five questions. Each quiz needs an answer and explanation. Creative subjects can use practice challenges or reflection instead of a single correct answer. The host must review generated content.

### 4 Show teaching evidence and choose the group

Ask for relevant experience, work samples and a short explanation or mini lesson. Examples include a speaking sample, annotated writing feedback, photography portfolio, worked math explanation or project walkthrough.

Choose the number of learners within the approved capacity. Show hosting eligibility and review progress. Offer an optional cohost invitation. Evidence is private by default; hosts choose any portfolio subset they want displayed publicly.

### 5 Plan the setting and session

Choose venue, date, time, timezone, duration, accessibility details and a weather backup where needed. Separate what the host provides from what learners bring.

Offer an optional setup checklist for seating, work surfaces, lights, decorations, equipment, sound level, permissions and cleanup. This expresses the creative setup concept without requiring expensive decorations.

A café, plaza, fountain or beautiful city spot can work when suitable and permitted. Quiet music lessons can use theory, songwriting or headphones. Venue selection does not itself establish permission to run a paid class.

Show an appropriate public area or venue description; exact meeting instructions can be restricted to confirmed attendees.

### 6 Preview and submit

Show the learner-facing listing: outcome, host, level, activity, date, duration, place, materials, capacity, price per learner, total charges and cancellation terms. Each section has an Edit action.

The main action reflects the real state: Save draft, Finish eligibility, Submit for review or Publish. Publication requires completed fields, host eligibility, relevant approval, a reviewed lesson and a working booking configuration. Paid publication uses real payment infrastructure; unavailable integrations leave the listing in draft or an explicitly free pilot.

## Teaching eligibility and evidence review

Count three distinct completed sessions the person actually attended. Exclude canceled sessions, no-shows, duplicates and sessions they hosted or cohosted. Attendance across subjects can count toward community familiarity. Approval to teach remains category-specific.

Use a trustworthy attendance record, with a correction and dispute path. Show progress privately, such as “2 of 3 Circles attended.” Enforce eligibility on the server.

Assess whether the outcome is realistic, the host’s evidence supports the claimed level, the explanation is clear, the practice activity works, and the materials match. Formal credentials need not be mandatory for every creative subject; some categories need additional checks.

AI may summarize work, flag missing evidence and suggest improvements. It cannot reliably prove authorship or certify competence from an upload. Its structured output should contain observations, missing information, concerns and a suggested next step. Do not display an AI expert score.

**Recommended review default:** a human reviews the first category application and each new Circle before initial publication. Outcomes are approved, changes requested or declined with specific reasons and an appeal route. Repeated sessions can reuse an approved lesson plan. Material changes to category, outcome, claims or relevant venue conditions trigger a new review.

Public wording should describe the actual check, such as Lesson plan reviewed, without implying professional accreditation.

## Capacity and collaboration

**Proposed capacity policy:** a new approved host starts with one or two learners, based on preference and reviewer approval. After four verified completed hosted sessions, they can request a cap of up to four. A reviewer checks group suitability, available feedback and any complaints. Missing reviews alone should not permanently block progression.

Four is the global MVP learner limit. Hosts may always choose a smaller group. Hosts do not count as learner seats. A cohost does not increase capacity. Approval in one category does not grant approval in another.

Enforce capacity atomically during booking, including simultaneous purchases and expiring seat holds. Never reduce capacity below confirmed bookings.

Allow one invited cohost. They explicitly accept, and both teaching hosts need the relevant eligibility and approval before publication. Pending invitations must not silently list someone as a teacher.

The lead owns, submits and publishes the Circle. The cohost can suggest edits and contribute material. Record accepted changes and role permissions. Avoid simultaneous document editing in the MVP.

Use the existing accountable host payment model. Automated split payouts, external musician hiring and decoration marketplaces are future features. Do not imply the platform has already implemented them.

## Visual design and learner value

Use the existing ARO design system and mascot assets after inspecting them. The mood should be warm, beautiful, playful and mature. Rounded cards, generous space, readable text and restrained brand color support clarity.

Place Create centrally in primary navigation with a visible label. One active question card dominates the screen. Keep Back, Continue, Save status and Preview predictable. Desktop can show a side preview; mobile can open it separately.

Animate category selection, card arrival, stage transitions and completion. Suggested timings are 150–250 ms for small interactions and 250–400 ms for stage transitions. Use the app’s existing animation library; GSAP is an option if compatible. Avoid constant mascot bouncing, forced waits and autoplay sound.

Support keyboard navigation, focus management, screen readers, large touch targets and reduced motion. Status must remain understandable without color or animation. Show save failures and retry controls.

People pay for an attainable outcome, useful feedback, a capable host and a good learning experience. The atmosphere enhances that value. Put the learner outcome before decorative details.

After attendance, provide permitted lesson materials, a recap, saved work, feedback and an optional next Circle with a clear outcome and price. Examples: café French → park conversation; first photo walk → portraits; first story → character writing.

MVP retention features are saved materials, history, feedback and a manually linked next Circle. More elaborate learning paths and recommendations come later.

## Data and implementation requirements

Adapt to the existing backend rather than building duplicate systems.

| Entity | Main responsibility |
|---|---|
| Category | Stable ID, label, tags, enabled status, guide, review requirements |
| Guide | Display name, asset, tone and prompts |
| Template | Outcome, audience, duration, outline, materials and activity |
| Host eligibility | Verified attendance, category approvals, approved capacity, audited overrides |
| Circle | Owner, category, lesson content, evidence references and approved version |
| Session | Date, timezone, venue, capacity, price and attendance |
| Evidence | Owner, private storage, visibility consent and review status |
| Cohost invitation | Inviter, invitee, permissions and acceptance state |
| Review | Version reviewed, reviewer, advisory AI result, reasons and decision |
| Booking | Learner, seat/payment state, attendance and cancellation |

Circle states: draft, submitted, changes requested, approved, published and archived. Session states: scheduled, completed or canceled. Keep lesson approval separate from bookings and attendance.

Autosave drafts with ownership checks and conflict handling. A category change preserves general information but clears incompatible category approval. Edits after submission must create a new review version or invalidate the submitted version. Publish is an idempotent server operation.

Evidence needs private storage, file type and size limits, controlled access and deletion controls. Treat uploads and external links as untrusted AI input; their text cannot change system instructions or trigger tools. Never make private work public or enable additional model-training use without appropriate explicit consent. Keep provider secrets server-side and audit overrides.

If AI is unavailable, manual creation must still work. Clearly distinguish prototype behavior from production integrations.

## Delivery order and acceptance

1. Inspect the actual repository, applicable AGENTS.md, existing navigation, authentication, Circle data, payments, booking flow, design tokens and mascot assets.

2. Add configurable categories, guides and templates.

3. Build the six-stage journey with preview, autosave and accessible animation.

4. Add lesson materials, optional quizzes and AI suggestions with manual fallback.

5. Add attendance eligibility, evidence uploads, a minimal reviewer interface, approval states and capacity rules.

6. Add one-cohost invitations.

7. Integrate publication, booking and actual payment infrastructure.

8. Add saved materials, feedback and linked next Circles; pilot and refine.

Acceptance requires all of the following:

- Anyone can draft and resume; only eligible approved hosts can publish.

- All catalog categories have useful examples and templates; unavailable publishing categories are labeled.

- Tongy and Philly give relevant prompts and can be hidden.

- AI suggestions require acceptance and never silently overwrite a lesson.

- Attendance counts distinct verified sessions and excludes self-hosting, cancellations and no-shows.

- Private drafts and evidence are inaccessible to other users.

- Human decisions have reasons, revisions and an appeal path.

- Publication uses the approved version; client values cannot bypass policy.

- Bookings cannot exceed the host cap or four learners, including concurrent attempts.

- Cohost acceptance and permissions work without bypassing review or capacity.

- Keyboard and reduced-motion users can complete every stage.

- Payment states reflect real integrations.

- Completed learners can retrieve permitted materials, review their experience and see an honest next offer.

Track draft completion, abandonment by stage, review time, publication, bookings, attendance, learner outcome feedback and repeat booking. Test whether the attendance gate and capacity progression help or hinder the marketplace before treating them as permanent rules.

Out of MVP: unlimited learners, many cohosts, mascots for every topic, automatic AI certification, public expertise scores, musician hiring, automatic split payouts, full workflows for children and complex subscriptions.

## Master prompt for the next build chat

Copy the prompt below into the implementation chat. The defaults marked proposed remain visible product assumptions.

```codex-prompt
Implement the ARO Build Your Circle MVP in the existing app. Begin by inspecting the repository, applicable AGENTS.md, framework, navigation, authentication, Circle/session models, storage, booking and payment integrations, design system and mascot assets. Preserve existing functionality and work in progress. Do not assume backend features exist or replace unrelated app systems.

Product goal:
Make the central Create action a fun, clear, beautiful and pleasant guided journey. A Circle is a hosted lesson with a concrete learner outcome. A session is a dated occurrence. The host creates the learning experience and welcoming setup, while ARO helps shape the idea, materials and listing.

Categories:
Provide searchable pills, topic tags and configurable stable IDs for Languages; Writing; School and study skills; Photography; Video and content; Communication and social confidence; Art and illustration; Career and professional skills; Digital and technology; Crafts and making; Nature and gardening; Food and drink culture; Music and sound; Movement and coordination; Games and problem solving; City and culture. Seed at least one editable template per category with an outcome, audience, duration, three-part outline, practice activity and materials. Other collects a proposal for review. Distinguish catalog availability from publishing readiness. Proposed initial publishing focus is languages, writing, photography, art, communication, games, digital and adult study skills.

Mascots:
Tongy guides languages. Philly the squirrel guides other launch categories with relevant prompts. Use these latest display names, reconciling existing names/assets deliberately. Assign after category selection; allow hiding the guide. Ask one question at a time, offer a few suggestions and let users write their own. AI assistance is optional and never blocks manual completion.

Builder:
Create six stages:
1. Category and idea.
2. Learner outcome, title, audience, level and prerequisites.
3. Timed lesson outline, materials and optional quiz.
4. Host evidence, learner capacity and optional cohost.
5. Suitable venue, date/time/timezone, materials, accessibility and optional setup checklist.
6. Learner-facing preview, transparent price and cancellation details, eligibility checks and submission/publication.

Use cards, gentle animations, clear progress, Back/Continue, autosave and resume. Respect keyboard navigation, screen-reader labels, focus management and reduced motion. Use existing compatible animation tools; GSAP is optional. Hosts accept or edit AI suggestions before applying them. Do not fabricate assets, AI approval or payment success.

Eligibility and review:
Everyone can draft. Three distinct verified attended Circles unlock host review. Bookings alone, cancellations, no-shows and self-hosted/cohosted sessions do not count. Attendance is community familiarity, not teaching certification. Teaching approval is category-specific.
Collect relevant experience, work samples and a short teaching demonstration or sample explanation. Private evidence remains private unless the host chooses a public portfolio subset. AI provides observations and improvement suggestions; it cannot certify expertise or prove authorship. Proposed MVP default is a human reviewer for initial category approval and each new Circle before publication, with reasons, changes requested and an appeal path. Repeated sessions may reuse an approved plan; material edits trigger review.
Proposed founding-host exception requires a human-approved audited reason to solve initial supply.

Capacity and collaboration:
Global ceiling is four learners, excluding hosts. Proposed starting cap is one or two, based on approval. Four verified completed hosted sessions unlock a request for review to expand up to four, not an automatic increase. Keep thresholds configurable. Hosts can choose smaller groups.
Allow one cohost with explicit acceptance. Both teaching hosts need relevant eligibility. Lead host owns/submits/publishes; cohost suggests changes and contributes materials. Cohosts do not expand capacity. Do not add automated split payouts without real provider support.

Backend:
Enforce ownership, attendance, approvals, review versions and capacity server-side. Preserve a submitted/approved version so unseen edits cannot inherit approval. Keep Circle states separate from session/booking states. Use safe private uploads and controlled access. Treat uploaded content as untrusted AI input. Handle autosave conflicts, AI errors and retries. Enforce booking capacity atomically and never lower it below confirmed bookings.
Integrate existing booking/payment systems honestly. If an integration is missing, implement a clearly scoped adapter or blocked state and report the limitation; do not portray a mock transaction as production.

Learner value:
Show the concrete takeaway and host support before atmosphere. After attendance, provide permitted materials, saved work, feedback and a manually linked next Circle with a clear outcome and price. Avoid fabricated popularity or forced purchase rewards.

Delivery:
First report integration findings and proposed assumptions, then implement the scoped MVP in dependency order: taxonomy/templates; builder/persistence; materials/AI; eligibility/review; cohost; publication/bookings; recap/next Circle. Use migrations and existing project patterns where appropriate.
Validate complete draft/resume, private access, attendance accounting, approval versioning, declined/pending cohosts, AI fallback, keyboard/reduced motion, real payment states and concurrent capacity enforcement. Run project checks appropriate to the change.
Finish with what changed, how it was validated and unresolved limitations. Keep policy assumptions explicit. Do not deploy or enable live charging without authorization.
```
