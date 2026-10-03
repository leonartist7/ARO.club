import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const output = join(process.cwd(), 'artifacts', 'ARO-RB6');
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
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
    await context.addInitScript(({ theme, language }) => { localStorage.setItem('theme', theme); localStorage.setItem('conversa-language', language); }, { theme, language });
    const page = await context.newPage();
    const errors = [];
    const writes = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('request', request => { if (!['GET', 'HEAD'].includes(request.method())) writes.push(`${request.method()} ${request.url()}`); });
    const response = await page.goto(`http://localhost:3106${route}`, { waitUntil: 'domcontentloaded' });
    await page.getByText('Loading ARO…').first().waitFor({ state: 'hidden' });
    await page.waitForFunction(expected => document.documentElement.classList.contains(expected), theme);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(650);
    await page.locator('img').first().evaluate(image => image.decode().catch(() => {}));
    await page.screenshot({ path: join(output, `${slug}.png`) });
    const body = await page.locator('body').innerText();
    results.push({ slug, status: response?.status(), heading: await page.locator('h1').first().innerText(), horizontalOverflow: await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), hasFakeRank: /Compete with learners worldwide|All-time standings|Climb the ranks/.test(body), hasCheckoutPromise: /wiring secure checkout next|passport is waiting for its first stamp/i.test(body), hasExplore: await page.locator('a[href="/explore"]').count() > 0, hasPreview: await page.locator('a[href="/onboarding/preview"]').count() > 0, errors, writes });
    await context.close();
  }
} finally { await browser.close(); }
await writeFile(join(output, 'browser.json'), JSON.stringify(results, null, 2));
if (results.some(result => result.status !== 200 || result.horizontalOverflow || result.hasFakeRank || result.hasCheckoutPromise || !result.hasExplore || !result.hasPreview || result.errors.length || result.writes.length)) process.exitCode = 1;
