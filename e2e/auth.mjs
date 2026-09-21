import { launch } from './harness.mjs';
const required = ['E2E_AUTH_BASE', 'E2E_TEST_EMAIL', 'E2E_TEST_PASSWORD'];
const missing = required.filter(name => !process.env[name]);
if (missing.length) {
  console.error(`BLOCKED_PREREQUISITE: use an approved isolated target and synthetic participant credentials (${missing.join(', ')} missing).`);
  process.exit(2);
}
const base = process.env.E2E_AUTH_BASE.replace(/\/$/, '');
const browser = await launch();
try {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(`${base}/login?next=https://evil.example`, { waitUntil: 'networkidle' });
  await page.getByLabel('Email Address').fill(process.env.E2E_TEST_EMAIL);
  await page.getByLabel('Password', {exact: true}).fill(process.env.E2E_TEST_PASSWORD);
  await page.getByRole('button', {name: 'Sign In', exact: true}).click();
  await page.waitForURL(`${base}/explore`);
  await page.goto(`${base}/profile?tab=saved`, { waitUntil: 'networkidle' });
  await page.reload({ waitUntil: 'networkidle' });
  if (new URL(page.url()).pathname !== '/profile') throw new Error('Session did not survive reload');
  const admin = await page.goto(`${base}/admin`, { waitUntil: 'networkidle' });
  if (admin.status() !== 404) throw new Error('Synthetic participant gained admin access');
  const anonymous = await browser.newContext();
  const other = await anonymous.newPage();
  await other.goto(`${base}/profile`, { waitUntil: 'networkidle' });
  if (new URL(other.url()).pathname !== '/login') throw new Error('Account data leaked into an anonymous context');
  await anonymous.close();
  await page.goto(`${base}/profile`, { waitUntil: 'networkidle' });
  await page.getByRole('button', {name: 'Account menu'}).click();
  await page.getByRole('menuitem', {name: 'Sign Out', exact: true}).click();
  await page.waitForURL(`${base}/`);
  await page.goto(`${base}/profile`, { waitUntil: 'networkidle' });
  if (new URL(page.url()).pathname !== '/login') throw new Error('Logout did not invalidate the server session');
  if ((await context.cookies()).some(cookie => cookie.name.includes('auth-token'))) throw new Error('Session cookie survived logout');
  console.log('PASS: login, rejected external return, reload persistence, participant admin denial, anonymous isolation and logout.');
  await context.close();
} finally { await browser.close(); }
