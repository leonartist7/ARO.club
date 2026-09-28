import { BASE, launch, navigate, createRun, assert } from './harness.mjs';

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
  '/character-builder', '/teacher/dashboard', '/teacher/application', '/dashboard', '/passport',
  '/onboarding/student', '/onboarding/teacher',
];

/**
 * Visits every route and asserts nothing throws and nothing renders blank.
 *
 * This is the check that catches what `next build` cannot: a page can compile
 * perfectly and still ReferenceError at runtime on a variable that left scope.
 */
export default async function sweep() {
  const browser = await launch();
  const run = createRun('sweep');

  /** External images/fonts are blocked in CI sandboxes; that's not a failure. */
  const isNetworkNoise = (text) =>
    /ERR_TUNNEL_CONNECTION_FAILED|ERR_CONNECTION_RESET|ERR_NAME_NOT_RESOLVED|Failed to load resource|Failed to fetch|WebSocket connection to .*\/_next\/hmr/i.test(
      text
    );

  const visit = async (routes, { seed = null, label }) => {
    const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const crashes = [];
    if (seed) {
      await context.addInitScript((data) => localStorage.setItem('conversa-player', JSON.stringify(data)), seed);
    }

    const blank = [];
    const redirects = [];

    for (const route of routes) {
      // Isolate each visit: a delayed client redirect from one route must not
      // abort the next route's document request in the shared page.
      const page = await context.newPage();
      page.on('pageerror', (error) => crashes.push({ route, text: String(error).slice(0, 180) }));
      page.on('console', (msg) => {
        if (msg.type() !== 'error') return;
        const text = msg.text();
        if (!isNetworkNoise(text)) crashes.push({ route, text: text.slice(0, 180) });
      });
      try {
        await navigate(page, BASE + route, { waitUntil: 'domcontentloaded', timeout: 15000 });
      } catch (error) {
        // A client transition or server-side Auth redirect can abort the
        // original document request. Accept it only after the expected page lands.
        if (!String(error).includes('ERR_ABORTED')) throw error;
        const expected = PROTECTED_ROUTES.includes(route) || route === '/choose-role' ? '/login' : route;
        await page.waitForURL((url) => url.pathname === expected, { timeout: 5000 })
          .catch(() => { throw new Error(`SWEEP_REDIRECT_DESTINATION_${route.replaceAll('/', '_')}_${expected.replaceAll('/', '_')}`); });
      }
      if (PROTECTED_ROUTES.includes(route)) {
        await page.waitForURL((url) => url.pathname === '/login', { timeout: 5000 }).catch(() => undefined);
      }
      await page
        .waitForFunction(() => document.body.innerText.trim().length >= 30 && !document.body.innerText.includes('Opening ARO…'), null, { timeout: 3000 })
        .catch(() => undefined);

      const body = (await page.locator('body').innerText().catch(() => '')).trim();
      if (body.length < 30 || body.includes('Opening ARO…')) blank.push(`${route} (${body.length} chars or still loading)`);

      const landed = new URL(page.url()).pathname;
      if (landed !== route) redirects.push({ route, landed });
      await page.close();
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

  run.heading('protected routes reject local-only identity');
  const localOnly = await visit(PROTECTED_ROUTES, {
    seed: {
      state: { user: { id: 'local-only', role: 'admin' }, onboardingComplete: true },
      version: 1,
    },
    label: 'hostile-local-storage',
  });
  await run.step('no runtime errors while rejecting local-only identity', () =>
    assert(
      localOnly.crashes.length === 0,
      localOnly.crashes.map((c) => `${c.route}: ${c.text}`).join(' | ')
    )
  );
  await run.step('localStorage identity grants no protected access', () => {
    const leaked = PROTECTED_ROUTES.filter(
      (route) => !localOnly.redirects.some((r) => r.route === route && r.landed === '/login')
    );
    assert(leaked.length === 0, `local-only identity leaked into: ${leaked.join(', ')}`);
  });

  run.heading('protected routes, signed out');
  const signedOut = await visit(PROTECTED_ROUTES, { label: 'gate' });
  await run.step('every protected route redirects to login', () => {
    const leaked = PROTECTED_ROUTES.filter(
      (route) => !signedOut.redirects.some((r) => r.route === route && r.landed === '/login')
    );
    assert(leaked.length === 0, `these did not gate: ${leaked.join(', ')}`);
  });

  await browser.close();
  return run;
}
