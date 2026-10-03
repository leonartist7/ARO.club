import { API, localFetch, requireCondition, validateTarget } from './boundary.mjs';

const privateNote = 'Synthetic reviewer-only note';
const correctionReason = 'Please clarify your synthetic teaching biography.';
const rejectionReason = 'Synthetic review could not approve this application.';
const revisedBio = 'Revised synthetic biography demonstrates the applicant correction and durable resubmission journey.';

async function session(browser, base, identity) {
  validateTarget(base, 'http://127.0.0.1:5173', '/');
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, colorScheme: 'light', reducedMotion: 'reduce' });
  // No trace, video, screenshots or storageState export: reviewer data stays in memory.
  const timer = setTimeout(() => { void context.close().catch(() => {}); }, 120000);
  const close = async () => { clearTimeout(timer); await context.close(); };
  try {
    const page = await context.newPage();
    page.setDefaultTimeout(20000);
    page.setDefaultNavigationTimeout(20000);
    await page.goto(`${base}/login`, { waitUntil: 'networkidle' });
    await page.getByLabel('Email Address').fill(identity.email);
    await page.getByLabel('Password', { exact: true }).fill(identity.password);
    const [response] = await Promise.all([
      page.waitForResponse(r => new URL(r.url()).origin === API && new URL(r.url()).pathname === '/auth/v1/token'),
      page.getByRole('button', { name: 'Sign In', exact: true }).click(),
    ]);
    requireCondition(response.status() === 200, 'V1_UI_LOGIN');
    await page.waitForURL(url => url.pathname !== '/login');
    return { page, close };
  } catch {
    await close();
    throw new Error('V1_UI_LOGIN_FAILED');
  }
}

async function reviewPage(page, base, applicationId) {
  await page.goto(`${base}/admin/applications/${applicationId}`, { waitUntil: 'networkidle' });
  await page.getByRole('heading', { name: 'Review', exact: true }).waitFor();
  await page.getByRole('button', { name: 'Request changes', exact: true }).waitFor();
}

async function decision(page, button, reason) {
  // Existing labels are visual labels without htmlFor; use their containing
  // fields rather than pretend accessible label associations already exist.
  await page.getByText('Internal notes (private)', { exact: true }).locator('..').locator('textarea').fill(privateNote);
  if (reason) await page.getByText('Message to applicant (reject / changes)', { exact: true }).locator('..').locator('textarea').fill(reason);
  const [response] = await Promise.all([
    page.waitForResponse(r => new URL(r.url()).origin === API && new URL(r.url()).pathname === '/rest/v1/teacher_applications' && r.request().method() === 'PATCH'),
    page.getByRole('button', { name: button, exact: true }).click(),
  ]);
  requireCondition(response.ok(), 'V1_UI_DECISION_REJECTED');
  await page.waitForURL(url => url.pathname === '/admin');
}

async function applicantPage(page, base, heading, reason) {
  await page.goto(`${base}/teacher/application`, { waitUntil: 'networkidle' });
  await page.getByRole('heading', { name: heading, exact: true }).waitFor();
  if (reason) await page.getByText(reason, { exact: false }).waitFor();
  requireCondition(!(await page.locator('body').innerText()).includes(privateNote), 'V1_UI_PRIVATE_NOTE');
}

async function editBiography(page, base) {
  // Reuse the real onboarding edit path; do not add documents or bypass UI.
  await page.goto(`${base}/onboarding/teacher`, { waitUntil: 'networkidle' });
  await page.getByPlaceholder("What's your name?").fill('Synthetic Teacher');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.getByRole('button', { name: 'Choose language', exact: true }).click();
  await page.getByRole('button', { name: 'Skip remaining', exact: true }).click();
  await page.getByRole('button', { name: 'Choose experience', exact: true }).click();
  await page.getByRole('button', { name: 'Skip remaining', exact: true }).click();
  await page.getByRole('heading', { name: 'Create Your Avatar', exact: true }).waitFor();
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.getByPlaceholder("I'm passionate about teaching...").fill(revisedBio);
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.getByRole('button', { name: 'Continue to documents', exact: true }).click();
  await page.waitForURL(url => url.pathname === '/teacher/application');
  await page.getByRole('button', { name: 'Resubmit for review', exact: true }).waitFor();
}

export async function reviewerLifecycle({ browser, base, applicants, reviewers, fixture, api, assertDecision }) {
  const r = await session(browser, base, reviewers[0]);
  let a;
  const visible = async (index, reason) => {
    const owner = applicants[index];
    const decision = await api(`/rest/v1/teacher_application_decisions?application_id=eq.${owner.applicationId}&select=*`, { token: owner.token });
    requireCondition(decision.status === 200 && decision.data?.length === 1 && decision.data[0].decision_reason === reason
      && !JSON.stringify(decision.data).includes(privateNote), 'V1_PUBLIC_REASON_PROJECTION');
    for (const token of [owner.token, applicants[0].token, undefined]) {
      const notes = await api(`/rest/v1/teacher_application_reviews?application_id=eq.${owner.applicationId}&select=*`, { token, schema: 'api' });
      requireCondition((notes.status === 200 && Array.isArray(notes.data) && notes.data.length === 0)
        || [401, 403].includes(notes.status), 'V1_PRIVATE_REVIEW_VISIBLE');
      requireCondition(!JSON.stringify(notes.data).includes(privateNote), 'V1_PRIVATE_NOTE_RESPONSE');
    }
    for (const token of [applicants[0].token, undefined]) {
      const other = await api(`/rest/v1/teacher_application_decisions?application_id=eq.${owner.applicationId}&select=*`, { token });
      requireCondition((other.status === 200 && Array.isArray(other.data) && other.data.length === 0)
        || [401, 403].includes(other.status), 'V1_FOREIGN_DECISION_VISIBLE');
    }
  };
  try {
    await reviewPage(r.page, base, applicants[1].applicationId);
    // A real authorized signed document is retrieved, but never logged/captured.
    const link = await r.page.getByRole('link', { name: 'View', exact: true }).first().getAttribute('href');
    const url = validateTarget(link, API);
    const document = await localFetch(url.href, API, { cache: 'no-store' });
    requireCondition(document.status === 200, 'V1_REVIEW_DOCUMENT_DENIED'); await document.arrayBuffer();
    await decision(r.page, 'Request changes', correctionReason);
    assertDecision(fixture.snapshot(1), reviewers[0].userId, 'changes_requested');
    await visible(1, correctionReason);
    a = await session(browser, base, applicants[1]);
    await applicantPage(a.page, base, 'Changes requested', correctionReason);
    await a.page.reload({ waitUntil: 'networkidle' });
    await a.page.getByText(correctionReason, { exact: false }).waitFor();
    await editBiography(a.page, base);
    requireCondition(fixture.snapshot(1).application.bio === revisedBio, 'V1_EDIT_NOT_DURABLE');
    await a.page.getByRole('button', { name: 'Resubmit for review', exact: true }).click();
    await a.page.getByRole('heading', { name: 'Application submitted', exact: true }).waitFor();
    requireCondition(await a.page.getByText(correctionReason, { exact: false }).count() === 0, 'V1_OLD_REASON_STILL_VISIBLE');
    await a.page.reload({ waitUntil: 'networkidle' });
    await a.page.getByRole('heading', { name: 'Application submitted', exact: true }).waitFor();
    const resubmitted = fixture.snapshot(1);
    requireCondition(resubmitted.application.status === 'submitted' && resubmitted.application.submitted_at
      && resubmitted.application.bio === revisedBio && resubmitted.applications === 1, 'V1_RESUBMIT_NOT_DURABLE');
    await reviewPage(r.page, base, applicants[1].applicationId);
    await decision(r.page, 'Approve & verify');
    assertDecision(fixture.snapshot(1), reviewers[0].userId, 'approved');
    await applicantPage(a.page, base, "You're verified! 🎉");
    requireCondition(await a.page.getByText(correctionReason, { exact: false }).count() === 0, 'V1_APPROVAL_OLD_REASON');
    await a.close(); a = undefined;

    await reviewPage(r.page, base, applicants[2].applicationId);
    await decision(r.page, 'Reject', rejectionReason);
    assertDecision(fixture.snapshot(2), reviewers[0].userId, 'rejected');
    await visible(2, rejectionReason);
    a = await session(browser, base, applicants[2]);
    await applicantPage(a.page, base, 'Application not approved', rejectionReason);
    await a.page.reload({ waitUntil: 'networkidle' });
    await a.page.getByText(rejectionReason, { exact: false }).waitFor();
    requireCondition(!(await a.page.locator('body').innerText()).includes(privateNote), 'V1_REJECT_PRIVATE_NOTE');
  } finally { await a?.close(); await r.close(); }
}

export async function interruptedUpload({ browser, base, applicant, fixture, record }) {
  const a = await session(browser, base, applicant);
  let intercepted = 0, metadataWrites = 0;
  const before = fixture.snapshot(4);
  try {
    await applicantPage(a.page, base, 'Changes requested');
    a.page.on('request', request => {
      if (new URL(request.url()).origin === API && new URL(request.url()).pathname === '/rest/v1/teacher_documents' && request.method() === 'POST') metadataWrites++;
    });
    await a.page.route(`${API}/storage/v1/object/teacher-portfolio/**`, async route => {
      if (route.request().method() !== 'POST') { await route.continue(); return; }
      intercepted++;
      const path = decodeURIComponent(new URL(route.request().url()).pathname.slice('/storage/v1/object/teacher-portfolio/'.length));
      fixture.registerAttempt(path);
      await route.abort('aborted');
    });
    const button = a.page.getByRole('button', { name: 'Upload Teaching certificate', exact: true });
    for (let i = 0; i < 80; i++) {
      if (await button.evaluate(element => element === document.activeElement)) break;
      await a.page.keyboard.press('Tab');
    }
    requireCondition(await button.evaluate(element => element === document.activeElement), 'V1_UPLOAD_KEYBOARD');
    const [chooser] = await Promise.all([a.page.waitForEvent('filechooser'), a.page.keyboard.press('Enter')]);
    await chooser.setFiles({ name: 'synthetic-certificate.pdf', mimeType: 'application/pdf', buffer: Buffer.from('%PDF-1.4 synthetic interrupted upload') });
    await a.page.getByRole('alert').waitFor();
    requireCondition(intercepted === 1 && metadataWrites === 0, 'V1_INTERRUPTED_UPLOAD_REQUESTS');
    requireCondition(await a.page.getByRole('button', { name: 'Upload Teaching certificate', exact: true }).count() === 1
      && !(await a.page.getByRole('status').innerText()).includes('Teaching certificate uploaded.'), 'V1_INTERRUPTED_UPLOAD_SUCCESS');
    const observed = fixture.attemptedObject(), after = fixture.snapshot(4);
    record('V1_08', observed.objects === 0 && observed.metadata === 0 ? 'PASS' : 'UNTESTED',
      { objects: observed.objects, metadata: observed.metadata, confirmedAbsent: observed.objects === 0 && observed.metadata === 0 });
    requireCondition(observed.objects === 0 && observed.metadata === 0 && JSON.stringify(before.documents) === JSON.stringify(after.documents), 'V1_INTERRUPTED_UPLOAD_UNRESOLVED');
    await a.page.reload({ waitUntil: 'networkidle' });
    await a.page.getByRole('button', { name: 'Upload Teaching certificate', exact: true }).waitFor();
  } finally { await a.close(); }
}

export async function revokedReviewerNavigation({ browser, base, reviewer, applicationId }) {
  // Establish the browser session while admin, then keep its cookie session
  // through the caller's authoritative role removal and API denial assertions.
  const r = await session(browser, base, reviewer);
  try {
    await r.page.goto(`${base}/admin/applications/${applicationId}`, { waitUntil: 'networkidle' });
    await r.page.getByRole('heading', { name: 'Review', exact: true }).waitFor();
    return { close: r.close, async check() {
      const response = await r.page.goto(`${base}/admin/applications/${applicationId}`, { waitUntil: 'networkidle' });
      requireCondition(response?.status() === 404 && await r.page.getByRole('heading', { name: 'Review', exact: true }).count() === 0, 'V1_REVOKED_ADMIN_UI');
    } };
  } catch { await r.close(); throw new Error('V1_REVOCATION_SESSION'); }
}
