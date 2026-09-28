import { BASE, launch, navigate, requireAppOrigin } from '../e2e/harness.mjs';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const output = join(process.cwd(), 'artifacts', 'ARO-RB6');
await mkdir(output, { recursive: true });
const browser = await launch();
const results = [];
try {
  for (const [route, width, height, theme, language] of [
    ['/leaderboard', 320, 620, 'light', 'en'],
    ['/leaderboard', 1440, 900, 'dark', 'fr'],
    ['/leaderboard', 390, 844, 'light', 'es'],
    ['/bookings', 360, 700, 'dark', 'en'],
    ['/bookings', 768, 900, 'light', 'fr'],
    ['/bookings', 1440, 900, 'dark', 'es'],
  ]) {
    const slug = `${route.slice(1)}-${width}-${theme}-${language}`;
    const context = await browser.newContext({ viewport: { width, height }, reducedMotion: 'reduce' });
    await context.addInitScript({ content: `localStorage.setItem('theme', ${JSON.stringify(theme)}); localStorage.setItem('conversa-language', ${JSON.stringify(language)});` });
    const page = await context.newPage();
    const errors = [];
    const writes = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('request', request => { if (!['GET', 'HEAD'].includes(request.method())) writes.push(`${request.method()} ${request.url()}`); });
    const response = await navigate(page, `${BASE}${route}`, { waitUntil: 'domcontentloaded' });
    requireAppOrigin(page, BASE);
    await page.getByText('Loading ARO…').first().waitFor({ state: 'hidden' });
    await page.waitForFunction(expected => document.documentElement.classList.contains(expected), theme);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(650);
    await page.locator('img').first().evaluate(image => image.decode().catch(() => {}));
    await page.screenshot({ path: join(output, `${slug}.png`) });
    const body = await page.locator('body').innerText();
    const snapshot = { slug, status: response?.status(), heading: await page.locator('h1').first().innerText(), mainLandmarks: await page.getByRole('main').count(), horizontalOverflow: await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), hasFakeRank: /Compete with learners worldwide|All-time standings|Climb the ranks/.test(body), hasCheckoutPromise: /wiring secure checkout next|passport is waiting for its first stamp/i.test(body), errors, writes };
    await page.locator('main a[href="/explore"]').click();
    await page.waitForURL(`${BASE}/explore`);
    snapshot.exploreNavigation = (await page.request.get(page.url())).status() === 200 && await page.locator('h1').count() > 0;
    await navigate(page, `${BASE}${route}`, { waitUntil: 'domcontentloaded' });
    await page.locator('main a[href="/onboarding/preview"]').click();
    await page.waitForURL(`${BASE}/onboarding/preview`);
    snapshot.previewNavigation = (await page.request.get(page.url())).status() === 200 && await page.locator('h1').count() > 0;
    results.push(snapshot);
    await context.close();
  }
} finally { await browser.close(); }
await writeFile(join(output, 'browser.json'), JSON.stringify(results, null, 2));
if (results.some(result => result.status !== 200 || result.mainLandmarks !== 1 || result.horizontalOverflow || result.hasFakeRank || result.hasCheckoutPromise || !result.exploreNavigation || !result.previewNavigation || result.errors.length || result.writes.length)) process.exitCode = 1;
