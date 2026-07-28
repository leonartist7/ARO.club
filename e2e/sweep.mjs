import { BASE, launch, seedPlayer, createRun, assert } from './harness.mjs';

const PUBLIC_ROUTES = [
  '/', '/explore', '/map', '/leaderboard', '/about', '/how-it-works',
  '/for-teachers', '/faq', '/contact', '/choose-role', '/signup',
  '/forgot-password', '/favorites', '/recently-viewed', '/compare',
  '/experience/exp1', '/teacher/t1', '/no-such-page',
  // Previously 404s: the footer and both auth forms linked here.
  '/terms', '/privacy', '/cookies', '/login',
];

const PROTECTED_ROUTES = [
  '/student-dashboard', '/profile', '/games', '/shop', '/chat',
  '/character-builder', '/teacher/dashboard', '/dashboard', '/passport',
  '/onboarding/student', '/onboarding/teacher',
];

/**
 * Visits every route and asserts nothing throws and nothing renders blank.
 *
 * This is the check that catches what `vite build` cannot: a page can compile
 * perfectly and still ReferenceError at runtime on a variable that left scope.
 */
export default async function sweep() {
  const browser = await launch();
  const run = createRun('sweep');

  /** External images/fonts are blocked in CI sandboxes; that's not a failure. */
  const isNetworkNoise = (text) =>
    /ERR_TUNNEL_CONNECTION_FAILED|ERR_CONNECTION_RESET|ERR_NAME_NOT_RESOLVED|Failed to load resource|Failed to fetch/i.test(
      text
    );

  const visit = async (routes, { seed = null, label }) => {
    const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await context.newPage();

    const crashes = [];
    let current = '';
    page.on('pageerror', (error) => crashes.push({ route: current, text: String(error).slice(0, 180) }));
    page.on('console', (msg) => {
      if (msg.type() !== 'error') return;
      const text = msg.text();
      if (!isNetworkNoise(text)) crashes.push({ route: current, text: text.slice(0, 180) });
    });

    if (seed) {
      await page.goto(BASE, { waitUntil: 'domcontentloaded' });
      await page.evaluate(
        (data) => localStorage.setItem('conversa-player', JSON.stringify(data)),
        seed
      );
    }

    const blank = [];
    const redirects = [];

    for (const route of routes) {
      current = route;
      await page.goto(BASE + route, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await page.waitForTimeout(900);

      const body = (await page.locator('body').innerText().catch(() => '')).trim();
      if (body.length < 30) blank.push(`${route} (${body.length} chars)`);

      const landed = page.url().replace(BASE, '');
      if (landed !== route) redirects.push({ route, landed });
    }

    await context.close();
    return { crashes, blank, redirects };
  };

  run.heading('public routes, signed out');
  const publicPass = await visit(PUBLIC_ROUTES, { label: 'public' });
  await run.step('no runtime errors on any public route', () =>
    assert(
      publicPass.crashes.length === 0,
      publicPass.crashes.map((c) => `${c.route}: ${c.text}`).join(' | ')
    )
  );
  await run.step('no public route renders blank', () =>
    assert(publicPass.blank.length === 0, publicPass.blank.join(', '))
  );

  run.heading('protected routes, signed in');
  const signedIn = await visit(PROTECTED_ROUTES, { seed: seedPlayer(), label: 'protected' });
  await run.step('no runtime errors on any protected route', () =>
    assert(
      signedIn.crashes.length === 0,
      signedIn.crashes.map((c) => `${c.route}: ${c.text}`).join(' | ')
    )
  );
  await run.step('no protected route renders blank', () =>
    assert(signedIn.blank.length === 0, signedIn.blank.join(', '))
  );

  run.heading('protected routes, signed out');
  const signedOut = await visit(PROTECTED_ROUTES, { label: 'gate' });
  await run.step('every protected route redirects to the role picker', () => {
    const leaked = PROTECTED_ROUTES.filter(
      (route) => !signedOut.redirects.some((r) => r.route === route && r.landed === '/choose-role')
    );
    assert(leaked.length === 0, `these did not gate: ${leaked.join(', ')}`);
  });

  await browser.close();
  return run;
}
