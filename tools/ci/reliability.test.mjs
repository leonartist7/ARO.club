import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fixtureRegistry } from './reliability-fixtures.mjs';

const id = n => `00000000-0000-4000-8000-${String(n).padStart(12, '0')}`;
const applicants = Array.from({ length: 5 }, (_, i) => ({ userId: id(i + 1), applicationId: id(i + 20) }));
const reviewers = [{ userId: id(6) }, { userId: id(7) }];

test('fixture registry requires exactly five distinct applicants and two distinct reviewers', () => {
  assert.equal(fixtureRegistry(applicants, reviewers).applicants.length, 5);
  assert.throws(() => fixtureRegistry(applicants, reviewers.slice(0, 1)), /V1_FIXTURE_BUDGET/);
  assert.throws(() => fixtureRegistry(applicants, [...reviewers, { userId: id(8) }]), /V1_FIXTURE_BUDGET/);
  assert.throws(() => fixtureRegistry(applicants, [{ userId: applicants[0].userId }, reviewers[1]]), /V1_FIXTURE_DISTINCT/);
  assert.throws(() => fixtureRegistry(applicants.map((a, i) => i === 1 ? applicants[0] : a), reviewers), /V1_FIXTURE_DISTINCT/);
});

test('fixture registry rejects executable input without echoing its value', () => {
  const secret = "synthetic-value'; select 1; --";
  assert.throws(() => fixtureRegistry([{ ...applicants[0], userId: secret }, ...applicants.slice(1)], reviewers),
    error => error.message === 'V1_FIXTURE_UUID' && !error.message.includes(secret));
});

test('V1-07 applicant mapping supplies the public decision reason required by the status UI', async () => {
  // Pure client mapping reproduction, NOT RLS/API/browser acceptance. Execute
  // the current function body verbatim with a deterministic fluent data client.
  // No product module edits, Supabase runtime, credentials or network involved.
  const source = readFileSync(new URL('../../src/lib/teacherApplications.js', import.meta.url), 'utf8');
  const match = source.match(/export async function getMyApplication\(userId\) \{([\s\S]*?)\n\}/);
  assert.ok(match, 'Current applicant mapper must be located without replacement logic');
  const application = { id: id(20), user_id: id(1), status: 'changes_requested' };
  const decision = { application_id: id(20), decision_reason: 'Synthetic public correction reason',
    tier: null, reviewed_at: '2026-09-22T12:00:00Z' };
  const requests = [];
  const client = { from(table) {
    requests.push(table);
    const row = table === 'teacher_applications' ? application
      : table === 'teacher_application_decisions' ? decision : null;
    assert.ok(row, 'Only declared applicant and decision tables are fixture inputs');
    const query = {
      select() { return query; }, eq() { return query; }, order() { return query; }, limit() { return query; },
      async maybeSingle() { return { data: { ...row }, error: null }; },
    };
    return query;
  } };
  const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
  const getMyApplication = new AsyncFunction('supabase', 'userId', match[1]);
  const result = await getMyApplication(client, id(1));
  // Emit only a named failure, never fixture records/private values.
  assert.ok(result?.decision_reason === decision.decision_reason
    && requests.includes('teacher_application_decisions'), 'V1_07_PUBLIC_DECISION_REASON_MISSING');
});
