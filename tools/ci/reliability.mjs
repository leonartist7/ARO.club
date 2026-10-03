import { randomBytes, randomUUID } from 'node:crypto';
import { writeFileSync } from 'node:fs';
import { setTimeout as delay } from 'node:timers/promises';
import { API, localFetch, requireCondition, validateTarget } from './boundary.mjs';
import { authClient } from './auth.mjs';
import { createFixtureAuthority } from './reliability-fixtures.mjs';
import { reviewerLifecycle, interruptedUpload, revokedReviewerNavigation } from './reviewer-browser.mjs';

const criteria = ['V1_01', 'V1_02', 'V1_03', 'V1_04', 'V1_05', 'V1_06', 'V1_07', 'V1_08', 'FIXTURES', 'EXPIRED_JWT', 'LITERAL_DRAFT'];
const eventNames = new Set(['R1_REVIEW_SENT', 'R2_REVIEW_SENT', 'R1_REVIEW_SAVED', 'R2_REVIEW_SAVED',
  'R1_DECISION_SENT', 'R2_DECISION_SENT', 'R1_DECISION_SETTLED', 'R2_DECISION_SETTLED']);
const numberFields = new Set(['durationMs', 'count', 'httpStatus', 'teachers', 'verifications', 'decisions', 'audit', 'objects', 'metadata', 'authCount', 'dataCount', 'authP95Ms', 'dataP95Ms']);
const booleanFields = new Set(['reviewChanged', 'reviewActorChanged', 'reviewTimestampChanged', 'credentialUnchanged', 'confirmedAbsent']);
export function safeEvidenceRow(id, status, details = {}) {
  requireCondition(criteria.includes(id) && ['PASS', 'FAIL', 'UNTESTED'].includes(status), 'V1_EVIDENCE_ID');
  const safe = {};
  for (const [key, value] of Object.entries(details)) {
    if (numberFields.has(key)) requireCondition(typeof value === 'number' && Number.isFinite(value) && value >= 0, 'V1_EVIDENCE_NUMBER');
    else if (booleanFields.has(key)) requireCondition(typeof value === 'boolean', 'V1_EVIDENCE_BOOLEAN');
    else if (key === 'winner') requireCondition(['R1', 'R2'].includes(value), 'V1_EVIDENCE_ACTOR');
    else if (key === 'state') requireCondition(['submitted', 'changes_requested', 'approved', 'rejected'].includes(value), 'V1_EVIDENCE_STATE');
    else if (key === 'sequence') requireCondition(Array.isArray(value) && value.length <= 8 && value.every(v => eventNames.has(v)), 'V1_EVIDENCE_SEQUENCE');
    else throw new Error('V1_EVIDENCE_FIELD');
    safe[key] = value;
  }
  return { id, status, ...safe };
}

export function barrier(parties = 2) {
  requireCondition(parties === 2, 'V1_RACE_PARTIES');
  let arrived = 0;
  let release;
  const gate = new Promise(resolve => { release = resolve; });
  return async signal => {
    requireCondition(++arrived <= 2, 'V1_RACE_BARRIER_REUSE');
    if (arrived === 2) release();
    signal.throwIfAborted();
    await new Promise((resolve, reject) => {
      const abort = () => { cleanup(); reject(new Error('V1_RACE_DEADLINE')); };
      const cleanup = () => signal.removeEventListener('abort', abort);
      signal.addEventListener('abort', abort, { once: true });
      gate.then(() => { cleanup(); resolve(); });
    });
  };
}

export function platformClient(anonKey) {
  const timings = [];
  const request = async (path, { token, method = 'GET', body, schema = 'public', signal } = {}) => {
    requireCondition(/^\/(rest|storage)\/v1\//.test(path) && !path.includes('..') && !path.includes('\\')
      && !/%(?:2e|2f|5c)/i.test(path), 'V1_REQUEST_PATH');
    requireCondition(['public', 'api'].includes(schema), 'V1_REQUEST_SCHEMA');
    const started = performance.now();
    const response = await localFetch(`${API}${path}`, API, {
      method, signal: signal ?? AbortSignal.timeout(20000), cache: 'no-store',
      headers: { apikey: anonKey, ...(token ? { Authorization: `Bearer ${token}` } : {}),
        'Content-Type': 'application/json', 'Accept-Profile': schema, 'Content-Profile': schema,
        Prefer: 'return=representation' },
      ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    });
    const text = await response.text();
    timings.push(performance.now() - started);
    return { status: response.status, data: text ? JSON.parse(text) : null };
  };
  return { request, timings };
}
const equal = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const requireOK = response => requireCondition(response.status >= 200 && response.status < 300, 'V1_API_REJECTED');
export function effects(snapshot) {
  return { application: snapshot.application, role: snapshot.role, applications: snapshot.applications,
    teachers: snapshot.teachers, verifications: snapshot.verifications, decisions: snapshot.decisions, audit: snapshot.audit };
}
export function assertDecision(snapshot, reviewerId, status) {
  const [review] = snapshot.reviews;
  const [decision] = snapshot.decisions;
  const events = snapshot.audit.filter(a => a.action === `application_${status}`);
  requireCondition(snapshot.application.status === status && snapshot.reviews.length === 1 && snapshot.decisions.length === 1
    && events.length === 1 && events[0].admin_id === reviewerId && review.reviewed_by === reviewerId
    && decision.reviewed_at === review.reviewed_at && decision.decision_reason === review.decision_reason
    && decision.tier === review.tier && Boolean(review.reviewed_at), 'V1_DECISION_INCONSISTENT');
  if (status === 'approved') requireCondition(snapshot.role === 'teacher' && snapshot.teachers.length === 1 && snapshot.verifications.length === 1
    && snapshot.verifications[0].teacher_id === snapshot.teachers[0].id && snapshot.verifications[0].verified
    && snapshot.verifications[0].status === 'active' && snapshot.verifications[0].tier === decision.tier, 'V1_APPROVAL_EFFECTS');
  else requireCondition(snapshot.teachers.length === 0 && snapshot.verifications.length === 0, 'V1_NONAPPROVAL_EFFECTS');
}

export async function exerciseRemainingVerification({ browser, base, screenshotDir, anonKey, emails, password, phase, countFive, countSeven }) {
  requireCondition(emails.length === 5 && new Set(emails).size === 5, 'V1_APPLICANT_BUDGET');
  const sourceSha = process.env.GITHUB_SHA;
  requireCondition(/^[a-f0-9]{40}$/.test(sourceSha ?? '') && /^\d+$/.test(process.env.GITHUB_RUN_ID ?? '')
    && /^\d+$/.test(process.env.GITHUB_RUN_ATTEMPT ?? ''), 'V1_PROVENANCE');
  const report = { sourceSha, run: process.env.GITHUB_RUN_ID, attempt: process.env.GITHUB_RUN_ATTEMPT, rows: [] };
  const record = (id, status, details) => report.rows.push(safeEvidenceRow(id, status, details));
  record('EXPIRED_JWT', 'UNTESTED'); record('LITERAL_DRAFT', 'UNTESTED');
  const auth = authClient(anonKey);
  const authTimings = [];
  const authRequest = async (...args) => { const start = performance.now(); const result = await auth(...args); authTimings.push(performance.now() - start); return result; };
  const { request: api, timings } = platformClient(anonKey);
  const applicants = [], reviewers = [];
  let fixture;
  async function check(id, action) {
    const started = performance.now();
    try { await phase(`remaining-${id}`, action); record(id, 'PASS', { durationMs: performance.now() - started }); }
    catch { record(id, 'FAIL', { durationMs: performance.now() - started }); throw new Error(`${id}_FAILED`); }
  }
  async function login(email, candidatePassword) {
    const session = await authRequest('token?grant_type=password', { method: 'POST', body: { email, password: candidatePassword } });
    requireCondition(session.user?.id && session.access_token, 'V1_SESSION_MISSING');
    return { userId: session.user.id, token: session.access_token, email, password: candidatePassword };
  }
  async function saveReview(actor, index, values, signal) {
    const id = applicants[index].applicationId;
    const existing = await api(`/rest/v1/teacher_application_reviews?application_id=eq.${id}&select=application_id`, { token: actor.token, schema: 'api', signal });
    requireOK(existing);
    requireCondition(Array.isArray(existing.data) && existing.data.length <= 1, 'V1_REVIEW_CARDINALITY');
    const result = await api(`/rest/v1/teacher_application_reviews${existing.data.length ? `?application_id=eq.${id}` : ''}`, {
      method: existing.data.length ? 'PATCH' : 'POST', token: actor.token, schema: 'api', signal,
      body: existing.data.length ? values : { application_id: id, ...values },
    });
    requireOK(result);
    requireCondition(result.data?.length === 1 && result.data[0].reviewed_by === actor.userId, 'V1_REVIEW_ACTOR');
  }
  const setStatus = (actor, index, status, signal) => api(`/rest/v1/teacher_applications?id=eq.${applicants[index].applicationId}`, {
    method: 'PATCH', token: actor.token, body: { status }, signal,
  });
  async function startReview(actor, index) {
    await saveReview(actor, index, {});
    const result = await setStatus(actor, index, 'in_review');
    requireOK(result); requireCondition(result.data?.[0]?.status === 'in_review', 'V1_START_REVIEW');
  }
  async function duplicate(index) {
    const a = applicants[index], before = fixture.snapshot(index);
    const response = await api('/rest/v1/teacher_applications', { token: a.token, method: 'POST', body: { user_id: a.userId, status: 'draft', display_name: 'Synthetic duplicate' } });
    requireCondition(response.status === 409, 'V1_DUPLICATE_ACTIVE_ACCEPTED');
    const after = fixture.snapshot(index);
    requireCondition(after.applications === 1 && equal(effects(before), effects(after)), 'V1_DUPLICATE_ACTIVE_EFFECT');
    record('V1_01', 'PASS', { state: before.application.status, httpStatus: response.status });
  }
  try {
    await check('FIXTURES', async () => {
      countFive();
      for (const email of emails) {
        const a = await login(email, password);
        const found = await api(`/rest/v1/teacher_applications?user_id=eq.${a.userId}&select=id,status`, { token: a.token });
        requireOK(found); requireCondition(found.data?.length === 1 && found.data[0].status === 'submitted', 'V1_EXISTING_APPLICATION');
        applicants.push({ ...a, applicationId: found.data[0].id });
      }
      for (let i = 0; i < 2; i++) {
        const email = `v1-reviewer-${randomUUID()}@example.invalid`, secret = `Aa1!${randomBytes(24).toString('hex')}`;
        const signedUp = await authRequest('signup', { method: 'POST', body: { email, password: secret } });
        requireCondition(signedUp.user?.id, 'V1_REVIEWER_SIGNUP');
        reviewers.push({ userId: signedUp.user.id, email, password: secret });
      }
      fixture = createFixtureAuthority(applicants, reviewers);
      fixture.promoteReviewers();
      for (let i = 0; i < reviewers.length; i++) {
        const session = await login(reviewers[i].email, reviewers[i].password);
        requireCondition(session.userId === reviewers[i].userId, 'V1_REVIEWER_IDENTITY');
        reviewers[i] = session;
      }
      countSeven();
    });
    await check('V1_01', () => duplicate(0));
    await check('V1_02', async () => {
      const before = fixture.snapshot(0);
      const response = await setStatus(applicants[0], 0, 'submitted');
      requireCondition([200, 204, 401, 403].includes(response.status), 'V1_DUPLICATE_SUBMIT_RESPONSE');
      requireCondition(equal(effects(before), effects(fixture.snapshot(0))), 'V1_DUPLICATE_SUBMIT_EFFECT');
      record('V1_02', 'PASS', { httpStatus: response.status });
    });
    await check('V1_07', () => reviewerLifecycle({ browser, base, applicants, reviewers, fixture, api, record, assertDecision }));
    await check('V1_03', async () => {
      const before = fixture.snapshot(1);
      assertDecision(before, reviewers[0].userId, 'approved');
      await saveReview(reviewers[0], 1, { tier: 'verified', rubric_scores: {}, admin_notes: 'Synthetic repeated private review', decision_reason: null });
      const repeated = await setStatus(reviewers[0], 1, 'approved');
      requireOK(repeated);
      const after = fixture.snapshot(1);
      requireCondition(equal(effects(before), effects(after)), 'V1_DUPLICATE_APPROVAL_EFFECT');
      record('V1_03', 'PASS', { reviewChanged: !equal(before.reviews, after.reviews),
        reviewActorChanged: before.reviews[0].reviewed_by !== after.reviews[0].reviewed_by,
        reviewTimestampChanged: before.reviews[0].reviewed_at !== after.reviews[0].reviewed_at });
    });
    // A4 becomes legitimately editable; no privileged status/evidence reset.
    await startReview(reviewers[0], 4);
    await saveReview(reviewers[0], 4, { decision_reason: 'Synthetic certificate correction', admin_notes: 'Synthetic private A4 note' });
    requireOK(await setStatus(reviewers[0], 4, 'changes_requested'));
    await check('V1_01', () => duplicate(4));
    await check('V1_08', () => interruptedUpload({ browser, base, applicant: applicants[4], fixture, record }));
    await check('V1_06', async () => {
      // Supabase createSignedUrl expiresIn is seconds. Local fixture has no CDN.
      // Bound the server-issued exp and use one post-expiry request, no polling.
      const started = Date.now(), signal = AbortSignal.timeout(60000);
      const doc = fixture.snapshot(4).documents[0];
      requireCondition(doc && doc.doc_type === 'intro_video', 'V1_SIGNED_DOCUMENT_FIXTURE');
      const path = doc.object_path.split('/').map(encodeURIComponent).join('/');
      const signed = await api(`/storage/v1/object/sign/teacher-portfolio/${path}`, { method: 'POST', token: reviewers[1].token, body: { expiresIn: 5 }, signal });
      requireOK(signed);
      requireCondition(typeof signed.data?.signedURL === 'string' && signed.data.signedURL.startsWith('/object/sign/'), 'V1_SIGNED_URL_SHAPE');
      const url = validateTarget(`${API}/storage/v1${signed.data.signedURL}`, API);
      requireCondition(url.pathname === `/storage/v1/object/sign/teacher-portfolio/${path}`, 'V1_SIGNED_URL_PATH');
      let expiry;
      try { expiry = JSON.parse(Buffer.from(url.searchParams.get('token').split('.')[1], 'base64url').toString()).exp; }
      catch { throw new Error('V1_SIGNED_EXPIRY_UNPROVEN'); }
      requireCondition(Number.isInteger(expiry) && expiry * 1000 > Date.now() && expiry * 1000 - started <= 10000, 'V1_SIGNED_EXPIRY_UNPROVEN');
      const before = await localFetch(url.href, API, { cache: 'no-store', signal });
      requireCondition(before.status === 200, 'V1_SIGNED_ACCESS_BEFORE'); await before.arrayBuffer();
      await delay(Math.max(0, expiry * 1000 + 1000 - Date.now()), undefined, { signal });
      const after = await localFetch(url.href, API, { cache: 'no-store', signal });
      requireCondition([400, 401, 403].includes(after.status), 'V1_SIGNED_ACCESS_AFTER');
      await after.arrayBuffer();
    });
    await check('V1_04', async () => {
      await startReview(reviewers[0], 3);
      const before = fixture.snapshot(3), sequence = [];
      const signal = AbortSignal.timeout(20000), begin = barrier(), decisions = barrier();
      const tasks = reviewers.map(async (actor, i) => {
        const label = `R${i + 1}`, status = i === 0 ? 'approved' : 'rejected';
        await begin(signal);
        sequence.push(`${label}_REVIEW_SENT`);
        await saveReview(actor, 3, i === 0
          ? { tier: 'verified', rubric_scores: {}, admin_notes: 'Synthetic race private note', decision_reason: null }
          : { admin_notes: 'Synthetic race private note', decision_reason: 'Synthetic race rejection' }, signal);
        sequence.push(`${label}_REVIEW_SAVED`);
        await decisions(signal);
        sequence.push(`${label}_DECISION_SENT`);
        const response = await setStatus(actor, 3, status, signal);
        sequence.push(`${label}_DECISION_SETTLED`);
        return { actor, status, response };
      });
      const settled = await Promise.allSettled(tasks);
      record('V1_04', 'UNTESTED', { sequence });
      requireCondition(settled.every(r => r.status === 'fulfilled'), 'V1_RACE_OPERATION_FAILED');
      const results = settled.map(r => r.value), winners = results.filter(r => r.response.status >= 200 && r.response.status < 300 && r.response.data?.[0]?.status === r.status);
      requireCondition(winners.length === 1, 'V1_RACE_WINNER_COUNT');
      const winner = winners[0], loser = results.find(r => r !== winner);
      requireCondition([400, 401, 403, 409].includes(loser.response.status), 'V1_RACE_LOSER_SUCCESS');
      requireCondition(Math.max(sequence.indexOf('R1_DECISION_SENT'), sequence.indexOf('R2_DECISION_SENT'))
        < Math.min(sequence.indexOf('R1_DECISION_SETTLED'), sequence.indexOf('R2_DECISION_SETTLED')), 'V1_RACE_OVERLAP_UNPROVEN');
      const after = fixture.snapshot(3);
      assertDecision(after, winner.actor.userId, winner.status);
      requireCondition(after.audit.length === before.audit.length + 1, 'V1_RACE_EXTRA_AUDIT');
      record('V1_04', 'PASS', { sequence, winner: winner.actor === reviewers[0] ? 'R1' : 'R2' });
    });
    await check('V1_05', async () => {
      const actor = reviewers[1], token = actor.token, before = fixture.snapshot(4), app = applicants[4].applicationId;
      const navigation = await revokedReviewerNavigation({ browser, base, reviewer: actor, applicationId: app });
      try {
      fixture.revokeReviewer();
      for (const [table, filter, schema] of [
        ['teacher_applications', `id=eq.${app}`, 'public'], ['teacher_documents', `application_id=eq.${app}`, 'public'],
        ['teacher_application_reviews', `application_id=eq.${app}`, 'api'], ['admin_audit_log', `target_id=eq.${app}`, 'api'],
      ]) {
        const response = await api(`/rest/v1/${table}?${filter}&select=*`, { token, schema });
        requireCondition(response.status === 200 && Array.isArray(response.data) && response.data.length === 0, 'V1_REVOKED_READ_VISIBLE');
      }
      const doc = before.documents[0], path = doc.object_path.split('/').map(encodeURIComponent).join('/');
      const storage = await localFetch(`${API}/storage/v1/object/authenticated/teacher-portfolio/${path}`, API, { headers: { apikey: anonKey, Authorization: `Bearer ${token}` } });
      requireCondition([400, 401, 403, 404].includes(storage.status), 'V1_REVOKED_STORAGE_VISIBLE'); await storage.arrayBuffer();
      for (const response of [await setStatus(actor, 4, 'rejected'), await api(`/rest/v1/teacher_application_reviews?application_id=eq.${app}`, {
        method: 'PATCH', token, schema: 'api', body: { decision_reason: 'Denied synthetic write' },
      })]) requireCondition([200, 204, 401, 403].includes(response.status) && (!response.data || !Array.isArray(response.data) || response.data.length === 0), 'V1_REVOKED_WRITE_ACCEPTED');
      requireCondition(equal(before, fixture.snapshot(4)) && actor.token === token, 'V1_REVOKED_WRITE_EFFECT');
      await navigation.check();
      record('V1_05', 'PASS', { credentialUnchanged: actor.token === token });
      } finally { await navigation.close(); }
    });
    countSeven();
  } finally {
    const p95 = values => { const sorted = [...values].sort((a, b) => a - b); return sorted[Math.max(0, Math.ceil(sorted.length * 0.95) - 1)] ?? 0; };
    record('FIXTURES', 'UNTESTED', { authCount: authTimings.length, dataCount: timings.length, authP95Ms: p95(authTimings), dataP95Ms: p95(timings) });
    writeFileSync(`${screenshotDir}/remaining-verification.json`, JSON.stringify(report, null, 2));
  }
}
