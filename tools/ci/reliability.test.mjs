import test from 'node:test';
import assert from 'node:assert/strict';
import { fixtureRegistry, validateAttemptPath, createFixtureAuthority } from './reliability-fixtures.mjs';
import { safeEvidenceRow, barrier, platformClient, assertDecision, effects } from './reliability.mjs';

const id = n => `00000000-0000-4000-8000-${String(n).padStart(12, '0')}`;
const applicants = Array.from({ length: 5 }, (_, i) => ({ userId: id(i + 1), applicationId: id(i + 20) }));
const reviewers = [{ userId: id(6) }, { userId: id(7) }];
const secret = "private-path?token=sentinel'; select secret; --";

test('fixture inventory is exactly five applicants and two distinct reviewers with immutable identities', () => {
  const a = structuredClone(applicants), r = fixtureRegistry(a, reviewers);
  a[0].userId = id(99);
  assert.equal(r.applicants[0].userId, id(1));
  assert.throws(() => { r.applicants.push(applicants[0]); }, TypeError);
  for (const [aa, rr] of [[applicants.slice(1), reviewers], [applicants, reviewers.slice(1)], [applicants, [...reviewers, { userId: id(8) }]]]) {
    assert.throws(() => fixtureRegistry(aa, rr), { message: 'V1_FIXTURE_BUDGET' });
  }
  assert.throws(() => fixtureRegistry(applicants, [{ userId: id(1) }, reviewers[1]]), { message: 'V1_FIXTURE_DISTINCT' });
  assert.throws(() => fixtureRegistry(applicants.map((a, i) => i === 1 ? applicants[0] : a), reviewers), { message: 'V1_FIXTURE_DISTINCT' });
});

test('UUID validation rejects executable or missing identity without echoing it', () => {
  for (const userId of [secret, null, undefined, {}, '../other', id(1).toUpperCase() + 'x']) {
    assert.throws(() => fixtureRegistry([{ ...applicants[0], userId }, ...applicants.slice(1)], reviewers),
      error => error.message === 'V1_FIXTURE_UUID' && !error.message.includes(secret));
  }
});

test('only one new A4 certificate object can be registered and no generic privileged capability is exposed', () => {
  const r = fixtureRegistry(applicants, reviewers), a4 = applicants[4];
  const path = `${a4.userId}/${a4.applicationId}/certification-123.pdf`;
  assert.equal(validateAttemptPath(r, path), path);
  for (const invalid of [secret, path + '/extra', path.replace(a4.userId, id(1)), path.replace('certification', 'intro_video'), path.replace('123', '../123')]) {
    assert.throws(() => validateAttemptPath(r, invalid), { message: 'V1_ATTEMPT_PATH' });
  }
  const authority = createFixtureAuthority(applicants, reviewers);
  assert.deepEqual(Object.keys(authority).sort(), ['attemptedObject', 'promoteReviewers', 'registerAttempt', 'revokeReviewer', 'snapshot'].sort());
  assert.throws(() => authority.snapshot(5), { message: 'V1_APPLICATION_LABEL' });
  assert.throws(() => authority.attemptedObject(), { message: 'V1_UPLOAD_ATTEMPT_MISSING' });
  authority.registerAttempt(path);
  assert.throws(() => authority.registerAttempt(path), { message: 'V1_UPLOAD_ATTEMPT_BUDGET' });
  assert.throws(() => authority.revokeReviewer(), { message: 'V1_REVOCATION_ORDER' });
});

test('privileged helper fails outside an approved disposable runner before Docker access', () => {
  const previous = process.env.CI;
  process.env.CI = 'false';
  try { assert.throws(() => createFixtureAuthority(applicants, reviewers).promoteReviewers(), { message: 'CI_ONLY' }); }
  finally { if (previous === undefined) delete process.env.CI; else process.env.CI = previous; }
});

test('evidence accepts only safe numbers, booleans and enumerated labels', () => {
  assert.deepEqual(safeEvidenceRow('V1_04', 'PASS', { winner: 'R1', sequence: ['R1_REVIEW_SENT'], durationMs: 1 }),
    { id: 'V1_04', status: 'PASS', winner: 'R1', sequence: ['R1_REVIEW_SENT'], durationMs: 1 });
  const cases = [
    () => safeEvidenceRow(secret, 'FAIL'), () => safeEvidenceRow('V1_04', secret),
    () => safeEvidenceRow('V1_04', 'PASS', { token: secret }),
    () => safeEvidenceRow('V1_04', 'PASS', { winner: secret }),
    () => safeEvidenceRow('V1_04', 'PASS', { sequence: [secret] }),
    () => safeEvidenceRow('V1_04', 'PASS', { count: secret }),
    () => safeEvidenceRow('V1_04', 'PASS', { count: NaN }),
    () => safeEvidenceRow('V1_04', 'PASS', { credentialUnchanged: secret }),
  ];
  for (const action of cases) assert.throws(action, error => /^V1_EVIDENCE_/.test(error.message) && !error.message.includes(secret));
});

test('request boundary rejects remote and escaped endpoints before fetch', async t => {
  let calls = 0;
  t.mock.method(globalThis, 'fetch', async () => { calls++; throw new Error(secret); });
  const { request } = platformClient('synthetic');
  for (const path of ['https://example.invalid/' + secret, '//example.invalid/', '/auth/v1/admin', '/rest/v1/../../auth', '/rest/v1/%2e%2e/auth', '/rest/v1/\\other']) {
    await assert.rejects(request(path), { message: 'V1_REQUEST_PATH' });
  }
  await assert.rejects(request('/rest/v1/teacher_applications', { schema: 'app_private' }), { message: 'V1_REQUEST_SCHEMA' });
  assert.equal(calls, 0);
});

test('two-party barrier prevents either decision proceeding alone and is single use', async () => {
  const meet = barrier(), signal = new AbortController().signal, released = [];
  const first = meet(signal).then(() => released.push('R1'));
  await Promise.resolve();
  assert.deepEqual(released, []);
  const second = meet(signal).then(() => released.push('R2'));
  await Promise.all([first, second]);
  assert.deepEqual(released.sort(), ['R1', 'R2']);
  await assert.rejects(meet(signal), { message: 'V1_RACE_BARRIER_REUSE' });
});

test('missing race participant aborts without polling or retry', async () => {
  const controller = new AbortController(), meet = barrier();
  const pending = meet(controller.signal);
  controller.abort();
  await assert.rejects(pending, { message: 'V1_RACE_DEADLINE' });
});

function approved() {
  return { applications: 1, application: { status: 'approved', submitted_at: 'synthetic-time', bio: 'synthetic' }, role: 'teacher',
    teachers: [{ id: id(99) }], verifications: [{ teacher_id: id(99), verified: true, status: 'active', tier: 'verified' }],
    decisions: [{ reviewed_at: 'same-time', decision_reason: null, tier: 'verified' }],
    reviews: [{ reviewed_by: id(6), reviewed_at: 'same-time', decision_reason: null, tier: 'verified' }],
    audit: [{ action: 'application_approved', admin_id: id(6) }] };
}

test('decision consistency catches conflicting actors, timestamps, duplicate effects and tiers', () => {
  assertDecision(approved(), id(6), 'approved');
  for (const mutate of [
    s => { s.reviews[0].reviewed_by = id(7); }, s => { s.audit.push(s.audit[0]); },
    s => { s.decisions[0].reviewed_at = 'different'; }, s => { s.teachers.push(s.teachers[0]); },
    s => { s.verifications[0].tier = 'elite'; }, s => { s.application.status = 'rejected'; },
  ]) {
    const snapshot = approved(); mutate(snapshot);
    assert.throws(() => assertDecision(snapshot, id(6), 'approved'), error => ['V1_DECISION_INCONSISTENT', 'V1_APPROVAL_EFFECTS'].includes(error.message));
  }
});

test('duplicate-approval effect comparison does not invent private review immutability', () => {
  const before = approved(), after = structuredClone(before);
  after.reviews[0].reviewed_at = 'later mutable review';
  after.reviews[0].admin_notes = secret;
  assert.deepEqual(effects(before), effects(after));
  after.decisions[0].reviewed_at = 'changed committed decision';
  assert.notDeepEqual(effects(before), effects(after));
});
