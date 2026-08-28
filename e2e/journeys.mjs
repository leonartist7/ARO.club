import { BASE, launch, navigate, createRun, assert } from './harness.mjs';

const unavailable = /not active in this preview yet/i;

/** Public account journeys for an intentionally unconfigured backend. */
export default async function journeys() {
  const browser = await launch();
  const run = createRun('journeys');
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = run.watch(await context.newPage());

  run.heading('account surfaces fail closed without a backend');

  await run.step('login explains that account access is unavailable', async () => {
    await navigate(page, `${BASE}/login`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);
    assert(unavailable.test(await page.locator('body').innerText()), 'missing unavailable copy');
  });

  await run.step('login actions are disabled', async () => {
    const state = await page.evaluate(() => {
      const form = document.querySelector('form:has(input[type="password"])');
      const google = [...document.querySelectorAll('button')].find((button) =>
        button.textContent.includes('Continue with Google')
      );
      return {
        submit: form?.querySelector('button[type="submit"]')?.disabled,
        google: google?.disabled,
        email: form?.querySelector('input[type="email"]')?.disabled,
        password: form?.querySelector('input[type="password"]')?.disabled,
      };
    });
    assert(Object.values(state).every(Boolean), `enabled login controls: ${JSON.stringify(state)}`);
  });

  await run.step('signup explains that account creation is unavailable', async () => {
    await navigate(page, `${BASE}/signup`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);
    assert(unavailable.test(await page.locator('body').innerText()), 'missing unavailable copy');
  });

  await run.step('signup actions are disabled', async () => {
    assert(await page.getByRole('button', { name: 'Create Account' }).isDisabled(), 'create is enabled');
    assert(await page.getByRole('button', { name: 'Continue with Google' }).isDisabled(), 'Google signup is enabled');
  });

  await run.step('password recovery explains that recovery is unavailable', async () => {
    await navigate(page, `${BASE}/forgot-password`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);
    assert(/password recovery is not active/i.test(await page.locator('body').innerText()), 'missing recovery copy');
  });

  await run.step('password recovery actions are disabled', async () => {
    assert(await page.locator('form input[type="email"]').isDisabled(), 'recovery email is enabled');
    assert(await page.locator('form button[type="submit"]').isDisabled(), 'recovery action is enabled');
  });

  run.heading('local state cannot impersonate a Supabase user');

  await run.step('hostile localStorage identity still redirects to login', async () => {
    await navigate(page, BASE, { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => {
      localStorage.setItem('conversa-player', JSON.stringify({
        state: { user: { id: 'attacker', role: 'admin', isTeacher: true }, onboardingComplete: true },
        version: 1,
      }));
    });
    await navigate(page, `${BASE}/admin`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);
    assert(new URL(page.url()).pathname === '/login', `landed on ${page.url()}`);
  });

  await context.close();
  await browser.close();
  return run;
}
