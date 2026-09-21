import { spawn, spawnSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { setTimeout as delay } from 'node:timers/promises';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { API, requireCondition } from './boundary.mjs';
const UX0_PROTOTYPE_MODE = false; // N1 verifies real accounts on disposable local CI only.

const root = fileURLToPath(new URL('../../', import.meta.url));
const base = 'http://127.0.0.1:5173';
const screenshotDir = fileURLToPath(new URL('../../artifacts/ARO-I0.2/ci-screenshots/', import.meta.url));
// CI workers can take longer than an interactive browser to parse the current
// baseline bundle. Keep readiness bounded, but do not confuse cold-start CPU
// contention with an application failure.
const uiReadyTimeout = 20000;

export const browserVerificationPhase = UX0_PROTOTYPE_MODE
  ? 'prototype-browser-boundary'
  : 'authenticated-browser-matrix';

async function waitForServer() {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await fetch(base, { signal: AbortSignal.timeout(1000) });
      if (response.ok) return;
    } catch {
      // Startup probe only.
    }
    await delay(500);
  }
  throw new Error('BROWSER_SERVER_TIMEOUT');
}

function observeDataTimings(page) {
  const samples = { auth: [], data: [] };
  const pending = [];
  page.on('requestfinished', (request) => {
    const url = new URL(request.url());
    if (url.origin !== new URL(API).origin) return;
    const category = url.pathname.startsWith('/auth/v1/') ? 'auth'
      : /^\/(rest|storage)\/v1\//.test(url.pathname) ? 'data' : null;
    if (!category) return;
    pending.push((async () => {
      const response = await request.response();
      const duration = request.timing().responseEnd;
      if (response?.ok() && duration >= 0) samples[category].push(duration);
    })());
  });
  return { async finish() {
    await Promise.all(pending);
    return Object.fromEntries(Object.entries(samples).map(([category, values]) => {
      values.sort((a, b) => a - b);
      return [category, { count: values.length, p95Ms: values[Math.max(0, Math.ceil(values.length * 0.95) - 1)] ?? 0 }];
    }));
  } };
}

async function keyboardChooseFile(page, name, file) {
  const button = page.getByRole('button', { name, exact: true });
  for (let tab = 0; tab < 80; tab += 1) {
    await page.keyboard.press('Tab');
    if (await button.evaluate(element => element === document.activeElement)) break;
  }
  requireCondition(await button.evaluate(element => element === document.activeElement), 'UPLOAD_NOT_KEYBOARD_REACHABLE');
  requireCondition(await button.evaluate(element => {
    const style = getComputedStyle(element);
    return parseFloat(style.outlineWidth) >= 2 && style.outlineStyle !== 'none';
  }), 'UPLOAD_FOCUS_NOT_VISIBLE');
  const [chooser] = await Promise.all([
    page.waitForEvent('filechooser', { timeout: uiReadyTimeout }),
    page.keyboard.press('Enter'),
  ]);
  await chooser.setFiles(file);
  return button;
}

async function captureJourney(page, caseId, state) {
  requireCondition(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth), 'JOURNEY_HORIZONTAL_OVERFLOW');
  await page.screenshot({ path: `${screenshotDir}/authenticated-synthetic-journey-${caseId}-${state}.png`, animations: 'disabled', fullPage: true, timeout: 10000 });
}

export async function exerciseAuthenticatedBrowser({ anonKey, emails, password }) {
  requireCondition(process.env.CI === 'true', 'CI_ONLY_BROWSER');
  requireCondition(Array.isArray(emails) && emails.length === 4 && new Set(emails).size === 4, 'FOUR_DISTINCT_APPLICANTS_REQUIRED');
  mkdirSync(screenshotDir, { recursive: true });
  const nextCli = fileURLToPath(new URL('../../node_modules/next/dist/bin/next', import.meta.url));
  const appEnvironment = {
    ...process.env,
    NEXT_PUBLIC_ENABLE_STAGING_ACCOUNTS: 'true',
    NEXT_PUBLIC_VERCEL_ENV: '',
    NEXT_PUBLIC_SUPABASE_URL: API,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: anonKey,
  };
  const build = spawnSync(process.execPath, [nextCli, 'build'], {
    cwd: root,
    env: appEnvironment,
    stdio: 'ignore',
    timeout: 300000,
  });
  requireCondition(!build.error && build.status === 0, 'BROWSER_BUILD_FAILED');
  const server = spawn(process.execPath, [nextCli, 'start', '--hostname', '127.0.0.1', '--port', '5173'], {
    cwd: root,
    stdio: 'ignore',
    detached: true,
    env: appEnvironment,
  });
  let browser;
  let stage = 'START';
  try {
    stage = 'SERVER';
    await waitForServer();
    stage = 'LAUNCH';
    browser = await chromium.launch();

    if (UX0_PROTOTYPE_MODE) {
      for (const theme of ['light', 'dark']) {
        stage = `PROTOTYPE_CONTEXT_${theme.toUpperCase()}`;
        const context = await browser.newContext({
          viewport: { width: 360, height: 800 },
          colorScheme: theme,
        });
        await context.addInitScript((selectedTheme) => localStorage.setItem('theme', selectedTheme), theme);

        for (const width of [360, 1440]) {
          // Use an isolated page per viewport. The protected-route redirect is
          // intentionally exercised below; allowing that router transition to
          // overlap the next page.goto() makes the desktop pass flaky on a
          // heavily loaded CI worker.
          const page = await context.newPage();
          const pageErrors = [];
          const platformRequests = [];
          page.on('pageerror', error => pageErrors.push(String(error)));
          page.on('request', request => {
            if (request.url().startsWith(API)) platformRequests.push(request.url());
          });
          await page.setViewportSize({ width, height: width === 360 ? 800 : 1000 });
          let started = performance.now();
          stage = `PROTOTYPE_LOGIN_${width}_${theme.toUpperCase()}`;
          await page.goto(`${base}/login`, { waitUntil: 'networkidle' });
          const emailInput = page.locator('input[type="email"]');
          const passwordInput = page.locator('input[type="password"]');
          await emailInput.waitFor({ state: 'visible', timeout: uiReadyTimeout });
          await passwordInput.waitFor({ state: 'visible', timeout: uiReadyTimeout });
          requireCondition(await emailInput.isDisabled(), 'PROTOTYPE_EMAIL_ENABLED');
          requireCondition(await passwordInput.isDisabled(), 'PROTOTYPE_PASSWORD_ENABLED');
          requireCondition(
            await page.locator('form').getByRole('button', { name: 'Sign In' }).isDisabled(),
            'PROTOTYPE_LOGIN_ENABLED'
          );

          stage = `PROTOTYPE_LEGACY_ACCOUNT_${width}_${theme.toUpperCase()}`;
          await page.goto(`${base}/choose-role`, { waitUntil: 'networkidle' });
          await page.waitForURL(url => url.pathname === '/login', { timeout: uiReadyTimeout });
          requireCondition(
            !(await page.evaluate(() => JSON.parse(localStorage.getItem('conversa-player') ?? '{"state":{}}').state?.user)),
            'PROTOTYPE_LOCAL_PLAYER_CREATED'
          );

          stage = `PROTOTYPE_CALLBACK_${width}_${theme.toUpperCase()}`;
          await page.goto(`${base}/auth/callback`, { waitUntil: 'networkidle' });
          await page.getByRole('heading', { name: 'Account callbacks are unavailable in this prototype.' })
            .waitFor({ timeout: uiReadyTimeout });
          if (width === 360) {
            await page.waitForTimeout(2100);
            requireCondition(new URL(page.url()).pathname === '/auth/callback', 'PROTOTYPE_CALLBACK_REDIRECTED');
          }

          stage = `PROTOTYPE_PROTECTED_${width}_${theme.toUpperCase()}`;
          await page.goto(`${base}/profile`, { waitUntil: 'networkidle' });
          await page.waitForURL(url => url.pathname === '/login', { timeout: uiReadyTimeout });
          const layout = await page.evaluate(() => ({
            dark: document.documentElement.classList.contains('dark'),
            overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
          }));
          requireCondition(layout.dark === (theme === 'dark'), 'THEME_MISMATCH');
          requireCondition(!layout.overflow, 'HORIZONTAL_OVERFLOW');
          requireCondition(pageErrors.length === 0, 'PROTOTYPE_BROWSER_PAGE_ERROR');
          requireCondition(platformRequests.length === 0, 'PROTOTYPE_PLATFORM_REQUEST');
          requireCondition(performance.now() - started < 15000, 'PROTOTYPE_BROWSER_BUDGET');
          await page.screenshot({
            path: `${screenshotDir}/${width}-${theme}-prototype-boundary.png`,
            animations: 'disabled',
            fullPage: false,
            timeout: 10000,
          });
          await page.close();
        }
        await context.close();
      }
      return;
    }

    for (const theme of ['light', 'dark']) {
      for (const width of [360, 1440]) {
      const caseId = `${width}-${theme}`;
      stage = `CONTEXT_${width}_${theme.toUpperCase()}`;
      const context = await browser.newContext({
        viewport: { width, height: width === 360 ? 800 : 1000 },
        colorScheme: theme,
      });
      await context.addInitScript((selectedTheme) => localStorage.setItem('theme', selectedTheme), theme);
      const page = await context.newPage();
      const pageErrors = [];
      page.on('pageerror', error => pageErrors.push(String(error)));

        const timing = observeDataTimings(page);
        let started = performance.now();

        {
          const email = emails[(theme === 'light' ? 0 : 2) + (width === 360 ? 0 : 1)];
          stage = `LOGIN_PAGE_${width}_${theme.toUpperCase()}`;
          await page.goto(`${base}/login`, { waitUntil: 'networkidle' });
          stage = `LOGIN_INPUTS_${width}_${theme.toUpperCase()}`;
          const emailInput = page.locator('input[type="email"]');
          const passwordInput = page.locator('input[type="password"]');
          await emailInput.waitFor({ state: 'visible', timeout: uiReadyTimeout });
          await passwordInput.waitFor({ state: 'visible', timeout: uiReadyTimeout });
          requireCondition(await page.getByLabel('Email Address').count() === 1, 'EMAIL_LABEL_MISSING');
          requireCondition(await page.getByLabel('Password').count() === 1, 'PASSWORD_LABEL_MISSING');
          await emailInput.fill(email);
          await passwordInput.fill(password);
          const signInButton = page.getByRole('button', { name: 'Sign In' });
          requireCondition(await signInButton.isEnabled(), 'LOGIN_DISABLED');
          stage = `LOGIN_AUTH_${width}_${theme.toUpperCase()}`;
          const [authResponse] = await Promise.all([
            page.waitForResponse(response => response.url().includes('/auth/v1/token'), { timeout: 10000 }),
            passwordInput.press('Enter'),
          ]);
          requireCondition(authResponse.status() === 200, `LOGIN_AUTH_HTTP_${authResponse.status()}`);
          stage = `LOGIN_NAVIGATION_${width}_${theme.toUpperCase()}`;
          await page.waitForURL(url => url.pathname !== '/login', { timeout: 10000 });
        }

        {
          const journeyStarted = performance.now();
          // This lane is deliberately real-client proof: onboarding must leave
          // an editable draft, collect documents on the status surface, and
          // submit only through that explicit journey.
          stage = `ONBOARDING_NAVIGATE_${width}_${theme.toUpperCase()}`;
          await page.goto(`${base}/onboarding/teacher`, { waitUntil: 'networkidle' });
          stage = `ONBOARDING_NAME_INPUT_${width}_${theme.toUpperCase()}`;
          await page.getByPlaceholder("What's your name?").fill('Synthetic Teacher');
          stage = `ONBOARDING_NAME_CONTINUE_${width}_${theme.toUpperCase()}`;
          await page.getByRole('button', { name: 'Continue' }).click();
          stage = `ONBOARDING_LANGUAGE_TRANSITION_${width}_${theme.toUpperCase()}`;
          const languageControls = page.getByRole('button', { name: 'Choose language', exact: true });
          stage = `ONBOARDING_LANGUAGE_CHOOSE_${width}_${theme.toUpperCase()}`;
          await languageControls.click();
          stage = `ONBOARDING_LANGUAGE_SKIP_${width}_${theme.toUpperCase()}`;
          await page.getByRole('button', { name: 'Skip remaining' }).click();
          stage = `ONBOARDING_EXPERIENCE_TRANSITION_${width}_${theme.toUpperCase()}`;
          const experienceControls = page.getByRole('button', { name: 'Choose experience', exact: true });
          stage = `ONBOARDING_EXPERIENCE_CHOOSE_${width}_${theme.toUpperCase()}`;
          await experienceControls.click();
          stage = `ONBOARDING_EXPERIENCE_SKIP_${width}_${theme.toUpperCase()}`;
          await page.getByRole('button', { name: 'Skip remaining' }).click();
          stage = `ONBOARDING_AVATAR_TRANSITION_${width}_${theme.toUpperCase()}`;
          const avatarHeading = page.getByRole('heading', { name: 'Create Your Avatar' });
          await avatarHeading.waitFor({ state: 'visible', timeout: uiReadyTimeout });
          const avatarScreen = avatarHeading.locator('xpath=..');
          stage = `ONBOARDING_AVATAR_CONTINUE_${width}_${theme.toUpperCase()}`;
          await avatarScreen.getByRole('button', { name: 'Continue' }).click();
          stage = `ONBOARDING_BIO_TRANSITION_${width}_${theme.toUpperCase()}`;
          const bioHeading = page.getByRole('heading', { name: 'Tell Students About Yourself' });
          await bioHeading.waitFor({ state: 'visible', timeout: uiReadyTimeout });
          const bioScreen = bioHeading.locator('xpath=..');
          stage = `ONBOARDING_BIO_INPUT_${width}_${theme.toUpperCase()}`;
          await bioScreen.getByPlaceholder("I'm passionate about teaching...")
            .fill('Synthetic browser evidence confirms this editable application draft before explicit submission.');
          stage = `ONBOARDING_BIO_CONTINUE_${width}_${theme.toUpperCase()}`;
          await bioScreen.getByRole('button', { name: 'Continue' }).click();
          stage = `ONBOARDING_READY_TRANSITION_${width}_${theme.toUpperCase()}`;
          const readyHeading = page.getByRole('heading', { name: 'Ready to add your documents' });
          await readyHeading.waitFor({ state: 'visible', timeout: uiReadyTimeout });
          const readyScreen = readyHeading.locator('xpath=..');
          await captureJourney(page, caseId, 'onboarding-ready');
          stage = `ONBOARDING_DRAFT_CREATE_REQUEST_${width}_${theme.toUpperCase()}`;
          const submitResponse = page.waitForResponse((response) => (
            response.url().includes('/rest/v1/teacher_applications') && response.request().method() === 'POST'
          ), { timeout: uiReadyTimeout });
          await readyScreen.getByRole('button', { name: 'Continue to documents' }).click();
          requireCondition((await submitResponse).status() === 201, 'ONBOARDING_DRAFT_PERSIST_FAILED');
          await page.waitForURL(url => url.pathname === '/teacher/application', { timeout: uiReadyTimeout });
          await page.getByRole('heading', { name: 'Finish your application' }).waitFor({ timeout: uiReadyTimeout });
          requireCondition(await page.getByText('Add your portfolio below, then submit for verification.').count() === 1,
            'DOCUMENT_COLLECTION_SURFACE_MISSING');
          const persistedApplication = page.waitForResponse(response => response.url().includes('/rest/v1/teacher_applications') && response.request().method() === 'GET');
          const persistedProfile = page.waitForResponse(response => response.url().includes('/rest/v1/profiles') && response.request().method() === 'GET');
          await page.reload({ waitUntil: 'networkidle' });
          const applicationPayload = await (await persistedApplication).json();
          const application = Array.isArray(applicationPayload) ? applicationPayload[0] : applicationPayload;
          const profilePayload = await (await persistedProfile).json();
          const profile = Array.isArray(profilePayload) ? profilePayload[0] : profilePayload;
          requireCondition(application?.status === 'draft' && application.display_name === 'Synthetic Teacher'
            && application.bio === 'Synthetic browser evidence confirms this editable application draft before explicit submission.'
            && application.languages?.[0]?.code === 'es' && application.experience_types?.[0] === 'cooking', 'DRAFT_VALUES_NOT_PERSISTED');
          requireCondition(profile?.name === 'Synthetic Teacher' && profile.user_type === 'teacher'
            && profile.onboarding_completed === true && profile.bio === application.bio
            && profile.experience_types?.[0] === 'cooking', 'PROFILE_VALUES_NOT_PERSISTED');
          await page.getByRole('heading', { name: 'Finish your application' }).waitFor({ timeout: uiReadyTimeout });
          requireCondition(await page.locator('input[type="file"]').count() >= 1, 'DOCUMENT_COLLECTION_NOT_EDITABLE');
          requireCondition(await page.getByRole('button', { name: 'Submit for verification' }).isEnabled(), 'DRAFT_NOT_EDITABLE');
          await page.screenshot({
            path: `${screenshotDir}/authenticated-synthetic-journey-${caseId}-draft-before-submit.png`,
            animations: 'disabled', fullPage: false, timeout: 10000,
          });

          stage = `DOCUMENT_FAILURE_AND_RETRY_${caseId.toUpperCase()}`;
          let metadataRequestAborted = false;
          let releaseMetadata;
          const metadataGate = new Promise(resolve => { releaseMetadata = resolve; });
          const metadataRoute = async (route) => {
            if (!metadataRequestAborted && route.request().method() === 'POST') {
              metadataRequestAborted = true;
              await metadataGate;
              await route.abort('failed');
              return;
            }
            await route.continue();
          };
          await page.route(`${API}/rest/v1/teacher_documents**`, metadataRoute);
          const uploadButton = await keyboardChooseFile(page, 'Upload Intro video', {
            name: 'synthetic-intro.mp4', mimeType: 'video/mp4', buffer: Buffer.from('synthetic-local-ci-video'),
          });
          await page.getByRole('status').filter({ hasText: 'Uploading Intro video.' }).waitFor({ timeout: uiReadyTimeout });
          await captureJourney(page, caseId, 'document-pending');
          releaseMetadata();
          await page.getByRole('alert').filter({ hasText: 'Upload failed. The uploaded file was removed. Please try again.' }).waitFor({ timeout: uiReadyTimeout });
          requireCondition(await uploadButton.evaluate(element => element === document.activeElement), 'UPLOAD_ERROR_LOST_FOCUS');
          requireCondition(metadataRequestAborted, 'DOCUMENT_METADATA_FAILURE_NOT_INDUCED');
          await page.screenshot({
            path: `${screenshotDir}/authenticated-synthetic-journey-${caseId}-document-failure.png`,
            animations: 'disabled', fullPage: false, timeout: 10000,
          });
          await page.unroute(`${API}/rest/v1/teacher_documents**`, metadataRoute);
          const metadataRetry = page.waitForResponse((response) => (
            response.url().includes('/rest/v1/teacher_documents') && response.request().method() === 'POST'
          ), { timeout: uiReadyTimeout });
          await keyboardChooseFile(page, 'Upload Intro video', {
            name: 'synthetic-intro-retry.mp4', mimeType: 'video/mp4', buffer: Buffer.from('synthetic-local-ci-video-retry'),
          });
          requireCondition((await metadataRetry).status() === 201, 'DOCUMENT_METADATA_RETRY_FAILED');
          await page.getByText('Uploaded ✓').waitFor({ timeout: uiReadyTimeout });
          await page.getByRole('status').filter({ hasText: 'Intro video uploaded.' }).waitFor({ timeout: uiReadyTimeout });
          const persistedDocuments = page.waitForResponse(response => response.url().includes('/rest/v1/teacher_documents') && response.request().method() === 'GET');
          await page.reload({ waitUntil: 'networkidle' });
          const documents = await (await persistedDocuments).json();
          requireCondition(Array.isArray(documents) && documents.length === 1 && documents[0].doc_type === 'intro_video'
            && documents[0].label === 'Intro video', 'DOCUMENT_RETRY_NOT_PERSISTED');
          await page.getByRole('button', { name: 'Replace Intro video', exact: true }).waitFor();
          await page.screenshot({
            path: `${screenshotDir}/authenticated-synthetic-journey-${caseId}-document-retry.png`,
            animations: 'disabled', fullPage: false, timeout: 10000,
          });

          stage = `EXPLICIT_SUBMIT_SERVER_TIMESTAMP_${caseId.toUpperCase()}`;
          const explicitSubmit = page.waitForResponse((response) => (
            response.url().includes('/rest/v1/teacher_applications') && response.request().method() === 'PATCH'
          ), { timeout: uiReadyTimeout });
          await page.getByRole('button', { name: 'Submit for verification' }).click();
          const submittedResponse = await explicitSubmit;
          requireCondition(submittedResponse.status() === 200, `EXPLICIT_SUBMIT_HTTP_${submittedResponse.status()}`);
          const submitted = await submittedResponse.json();
          requireCondition(submitted?.status === 'submitted' && Boolean(submitted.submitted_at), 'SERVER_SUBMISSION_TIMESTAMP_MISSING');
          await page.getByRole('heading', { name: 'Application submitted' }).waitFor({ timeout: uiReadyTimeout });
          const reloadedSubmission = page.waitForResponse(response => response.url().includes('/rest/v1/teacher_applications') && response.request().method() === 'GET');
          await page.reload({ waitUntil: 'networkidle' });
          const submissionPayload = await (await reloadedSubmission).json();
          const persistedSubmission = Array.isArray(submissionPayload) ? submissionPayload[0] : submissionPayload;
          requireCondition(persistedSubmission?.status === 'submitted' && persistedSubmission.submitted_at === submitted.submitted_at, 'SUBMISSION_NOT_PERSISTED');
          requireCondition(await page.getByRole('button', { name: 'Replace Intro video', exact: true }).count() === 0, 'SUBMITTED_UPLOAD_STILL_EDITABLE');
          await page.screenshot({
            path: `${screenshotDir}/authenticated-synthetic-journey-${caseId}-submitted-server-timestamp.png`,
            animations: 'disabled', fullPage: false, timeout: 10000,
          });
          requireCondition(performance.now() - journeyStarted < 120000, 'APPLICANT_JOURNEY_TIMEOUT');
          started = performance.now();
        }

        stage = `PROFILE_${width}_${theme.toUpperCase()}`;
        await page.goto(`${base}/profile`, { waitUntil: 'networkidle' });
        // Keep one synthetic, viewport-sized arrival image even when the
        // readiness assertion below fails. It makes a browser-only failure
        // diagnosable without printing account or service data to CI logs.
        await page.waitForTimeout(500);
        await page.screenshot({
          path: `${screenshotDir}/${width}-${theme}-profile-arrival.png`,
          animations: 'disabled',
          fullPage: false,
          timeout: 10000,
        });
        await page.getByRole('heading', { level: 1 }).waitFor({ timeout: 10000 });
        requireCondition(new URL(page.url()).pathname === '/profile', 'AUTH_BROWSER_REDIRECTED');
        requireCondition(await page.getByRole('heading', { level: 1 }).count() === 1, 'PROFILE_HEADING_MISSING');
        const layout = await page.evaluate(() => ({
          dark: document.documentElement.classList.contains('dark'),
          overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
        }));
        requireCondition(layout.dark === (theme === 'dark'), 'THEME_MISMATCH');
        requireCondition(!layout.overflow, 'HORIZONTAL_OVERFLOW');
        requireCondition(pageErrors.length === 0, 'AUTH_BROWSER_PAGE_ERROR');
        requireCondition(performance.now() - started < 15000, 'AUTH_BROWSER_BUDGET');
        stage = `SCREENSHOT_${width}_${theme.toUpperCase()}`;
        await page.screenshot({
          path: `${screenshotDir}/${width}-${theme}.png`,
          animations: 'disabled',
          fullPage: false,
          timeout: 10000,
        });
        const report = await timing.finish();
        requireCondition(report.auth.count > 0 && report.data.count > 0, 'DATA_TIMINGS_MISSING');
        writeFileSync(`${screenshotDir}/authenticated-synthetic-journey-${caseId}-timings.json`, JSON.stringify({ caseId, budgetMs: 1000, ...report }, null, 2));
        requireCondition(report.auth.p95Ms < 1000 && report.data.p95Ms < 1000, 'AUTH_DATA_P95_BUDGET');
        await context.close();
      }
    }
  } catch (error) {
    if (/^[A-Z][A-Z0-9_]+$/.test(error.message)) throw error;
    throw new Error(`BROWSER_${stage}`);
  } finally {
    await browser?.close();
    try {
      process.kill(-server.pid, 'SIGTERM');
    } catch {
      // The isolated child already exited.
    }
  }
}
