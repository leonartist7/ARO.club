import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { setTimeout as delay } from 'node:timers/promises';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { API, requireCondition } from './boundary.mjs';

const root = fileURLToPath(new URL('../../', import.meta.url));
const base = 'http://127.0.0.1:5173';
const screenshotDir = fileURLToPath(new URL('../../artifacts/ARO-I0.2/ci-screenshots/', import.meta.url));

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
  const server = spawn(process.execPath, [vite, '--host', '127.0.0.1', '--port', '5173'], {
    cwd: root,
    stdio: 'ignore',
    detached: true,
    env: { ...process.env, VITE_SUPABASE_URL: API, VITE_SUPABASE_ANON_KEY: anonKey },
  });
  let browser;
  try {
    await waitForServer();
    browser = await chromium.launch();
    for (const width of [360, 1440]) {
      for (const theme of ['light', 'dark']) {
        const context = await browser.newContext({
          viewport: { width, height: width === 360 ? 800 : 1000 },
          colorScheme: theme,
        });
        await context.addInitScript((selectedTheme) => localStorage.setItem('theme', selectedTheme), theme);
        const page = await context.newPage();
        const pageErrors = [];
        page.on('pageerror', error => pageErrors.push(String(error)));
        const started = performance.now();
        await page.goto(`${base}/login`, { waitUntil: 'domcontentloaded' });
        await page.getByLabel('Email Address').fill(email);
        await page.getByLabel('Password').fill(password);
        await page.getByRole('button', { name: 'Sign In' }).click();
        await page.waitForURL(url => url.pathname !== '/login', { timeout: 10000 });
        await page.goto(`${base}/profile`, { waitUntil: 'networkidle' });
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
        await page.screenshot({
          path: `${screenshotDir}/${width}-${theme}.png`,
          fullPage: true,
        });
        await context.close();
      }
    }
  } finally {
    await browser?.close();
    try {
      process.kill(-server.pid, 'SIGTERM');
    } catch {
      // The isolated child already exited.
    }
  }
}
