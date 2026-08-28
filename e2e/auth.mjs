import { chromium } from 'playwright';

const required = ['E2E_AUTH_BASE', 'E2E_TEST_EMAIL', 'E2E_TEST_PASSWORD'];
const missing = required.filter((name) => !process.env[name]);

if (missing.length) {
  console.error(`BLOCKED_PREREQUISITE: authenticated E2E requires an approved isolated I0 target and synthetic credentials (${missing.join(', ')} missing).`);
  process.exit(2);
}

const base = process.env.E2E_AUTH_BASE.replace(/\/$/, '');
const browser = await chromium.launch();

try {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(`${base}/login`, { waitUntil: 'domcontentloaded' });
  await page.getByLabel('Email Address').fill(process.env.E2E_TEST_EMAIL);
  await page.getByLabel('Password').fill(process.env.E2E_TEST_PASSWORD);
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.waitForURL((url) => url.pathname !== '/login', { timeout: 15000 });
  await page.goto(`${base}/profile`, { waitUntil: 'domcontentloaded' });

  if (new URL(page.url()).pathname === '/login') {
    throw new Error('real authenticated session did not grant access to /profile');
  }

  console.log('Authenticated UI gate passed against the approved isolated target.');
  await context.close();
} finally {
  await browser.close();
}
