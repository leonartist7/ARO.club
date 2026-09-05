import { spawn, spawnSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { setTimeout as delay } from 'node:timers/promises';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { API, requireCondition } from './boundary.mjs';
import { UX0_PROTOTYPE_MODE } from '../../src/config/ux0.js';

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

export async function exerciseAuthenticatedBrowser({ anonKey, email, password }) {
  requireCondition(process.env.CI === 'true', 'CI_ONLY_BROWSER');
  mkdirSync(screenshotDir, { recursive: true });
  const vite = fileURLToPath(new URL('../../node_modules/vite/bin/vite.js', import.meta.url));
  const appEnvironment = {
    ...process.env,
    VITE_SUPABASE_URL: API,
    VITE_SUPABASE_ANON_KEY: anonKey,
  };
  const build = spawnSync(process.execPath, [vite, 'build'], {
    cwd: root,
    env: appEnvironment,
    stdio: 'ignore',
    timeout: 120000,
  });
  requireCondition(!build.error && build.status === 0, 'BROWSER_BUILD_FAILED');
  const server = spawn(process.execPath, [vite, 'preview', '--host', '127.0.0.1', '--port', '5173'], {
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
          const started = performance.now();
          stage = `PROTOTYPE_LOGIN_${width}_${theme.toUpperCase()}`;
          await page.goto(`${base}/login`, { waitUntil: 'domcontentloaded' });
          const emailInput = page.locator('input[type="email"]');
          const passwordInput = page.locator('input[type="password"]');
          await emailInput.waitFor({ state: 'visible', timeout: uiReadyTimeout });
          await passwordInput.waitFor({ state: 'visible', timeout: uiReadyTimeout });
          requireCondition(await emailInput.isDisabled(), 'PROTOTYPE_EMAIL_ENABLED');
          requireCondition(await passwordInput.isDisabled(), 'PROTOTYPE_PASSWORD_ENABLED');
          requireCondition(await page.getByRole('button', { name: 'Sign In' }).isDisabled(), 'PROTOTYPE_LOGIN_ENABLED');

          stage = `PROTOTYPE_CALLBACK_${width}_${theme.toUpperCase()}`;
          await page.goto(`${base}/auth/callback`, { waitUntil: 'domcontentloaded' });
          await page.getByRole('heading', { name: 'Account callbacks are unavailable in this prototype.' })
            .waitFor({ timeout: uiReadyTimeout });
          if (width === 360) {
            await page.waitForTimeout(2100);
            requireCondition(new URL(page.url()).pathname === '/auth/callback', 'PROTOTYPE_CALLBACK_REDIRECTED');
          }

          stage = `PROTOTYPE_PROTECTED_${width}_${theme.toUpperCase()}`;
          await page.goto(`${base}/profile`, { waitUntil: 'domcontentloaded' });
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
      stage = `CONTEXT_${theme.toUpperCase()}`;
      const context = await browser.newContext({
        viewport: { width: 360, height: 800 },
        colorScheme: theme,
      });
      await context.addInitScript((selectedTheme) => localStorage.setItem('theme', selectedTheme), theme);
      const page = await context.newPage();
      const pageErrors = [];
      page.on('pageerror', error => pageErrors.push(String(error)));

      for (const width of [360, 1440]) {
        await page.setViewportSize({ width, height: width === 360 ? 800 : 1000 });
        const started = performance.now();

        // One real sign-in per color-scheme. The desktop capture then proves
        // the same authenticated session survives a responsive resize, rather
        // than creating a fourth cold browser boot under a heavily loaded CI
        // worker.
        if (width === 360) {
          stage = `LOGIN_PAGE_${width}_${theme.toUpperCase()}`;
          await page.goto(`${base}/login`, { waitUntil: 'domcontentloaded' });
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

        stage = `PROFILE_${width}_${theme.toUpperCase()}`;
        await page.goto(`${base}/profile`, { waitUntil: 'domcontentloaded' });
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
      }
      await context.close();
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
