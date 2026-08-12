# ARO — Trust, Safety, and Category Risk

## Authority and posture

This is the canonical policy direction for qualification, safety, contextual reputation, and category gating. It does not authorize schema, RLS, verification-vendor, background-check, or moderation implementation. The current Tonguee Trust Engine, admin roles, audit records, private document storage, and verified-publish protections remain mandatory infrastructure.

## Qualification levels

These working labels separate types of evidence; they are not global status ranks.

| Level | Evidence | Typical eligibility |
|---|---|---|
| Community Host | account integrity, basic identity where required, conduct agreement | approved low-risk community formats |
| Verified Host | identity plus ARO host review and category requirements | public low/moderate-risk hosting as policy permits |
| Certified Expert | verified relevant training or credential | categories where expertise materially affects safety/quality |
| Licensed Professional | current applicable professional licence and jurisdiction checks | regulated services only after category launch approval |

Tonguee’s current `verified`, `pro`, and `elite` tiers remain vertical-specific presentation/reputation levels. They must not be silently mapped to legal qualification. A future migration must separate verification evidence from commercial or achievement tiers.

## Risk classes

| Class | Examples | Default posture |
|---|---|---|
| Low | language conversation, photography walk, drawing Circle | identity/conduct baseline, public-place rules where applicable, reporting and admin oversight |
| Moderate | outdoor activities, pet care, fitness instruction, food preparation | category training/credentials as applicable, enhanced screening, insurance/venue rules, explicit participant disclosures |
| High / regulated | healthcare, legal, electrical, professional financial services, childcare, other licensed professions | closed until a category-specific legal, licensing, insurance, safety, and operations gate is approved |

Risk is determined by activity, participant vulnerability, location, jurisdiction, equipment, money, and provider role—not merely by the marketing category.

## Required controls

- **Identity:** use proportionate identity/liveness checks where risk or in-person interaction warrants them. Keep identity documents private with purpose and retention limits.
- **Credentials:** verify issuer, scope, expiry, jurisdiction, and status when a category depends on expertise. Self-declaration is not certification.
- **Background checks:** require only where legally appropriate and materially risk-reducing, especially work involving minors or vulnerable people. Define jurisdiction, renewal, adjudication, and appeal before use.
- **Insurance:** require category-appropriate coverage where needed; verify policy scope and expiry.
- **Venue/public space:** first-time or higher-risk in-person formats may require approved public venues, accessibility disclosures, emergency access, and prohibited-location rules.
- **Reporting and blocking:** every relevant entity must support discoverable reporting and immediate user blocking. Blocking prevents further direct interaction without revealing the reporter.
- **Incident handling:** triage by severity; preserve evidence access-controlled; acknowledge quickly; protect participants; escalate emergencies to appropriate local services; document decisions in an immutable audit trail.
- **Cancellations/no-shows:** record actor and reason, apply published rules, distinguish safety cancellation from ordinary reliability, and protect reporters from retaliation.
- **Two-way Trust:** participants and hosts both need protection. Reputation is contextual: reliability, communication, expertise, teaching, collaboration, safety, and outcome evidence are distinct.
- **Admin escalation:** identity, credential, safety, fraud, financial, or repeat-behavior cases route to trained human review with least-privilege access and recorded actions.

## Category-specific gates

Before enabling a category, the director must approve:

1. risk classification and prohibited subactivities;
2. participant age/vulnerability rules;
3. required identity, credential, background-check, and insurance evidence;
4. venue/equipment and emergency rules;
5. content, reporting, incident, dispute, cancellation, and support operations;
6. jurisdiction and legal/compliance review;
7. RLS, retention, audit, appeal, and enforcement design;
8. launch monitoring and stop conditions.

## Categories closed for MVP

Do not casually open healthcare, therapy, legal services, electrical or other regulated trades, professional financial/investment advice, childcare or unsupervised minor access, transportation for hire, weapons, controlled substances, intimate services, high-risk adventure, or any activity requiring licensing/insurance that ARO cannot verify and operate safely.

Pet care, fitness, food preparation, and outdoor activities remain closed until their moderate-risk category gates exist. Tonguee’s adult, public-place language experiences remain the initial proving ground. Minors are out of MVP scope.

## Future Category Policy Engine

The Category Policy Engine will evaluate opportunity type, jurisdiction, participants, provider evidence, venue, and risk factors to determine eligibility and required controls. It must fail closed, preserve human override/audit, and never replace RLS or professional/legal review. It is not implemented in P0.1.
