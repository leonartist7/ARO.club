import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const output = join(process.cwd(), 'artifacts', 'ARO-RB4');
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const results = [];
try {
  for (const [route, width, height, theme, language] of [
    ['/experience/exp1', 320, 700, 'light', 'en'],
    ['/teacher/t1', 390, 844, 'dark', 'fr'],
    ['/map', 1440, 900, 'light', 'es'],
    ['/favorites', 360, 740, 'light', 'en'],
    ['/recently-viewed', 390, 844, 'dark', 'es'],
    ['/compare', 768, 900, 'light', 'fr'],
    ['/this-route-does-not-exist', 1440, 900, 'dark', 'en'],
  ]) {
    const slug = `${route.slice(1).replaceAll('/', '-')}-${width}-${theme}-${language}`;
    const context = await browser.newContext({ viewport: { width, height }, reducedMotion: 'reduce' });
    await context.addInitScript(({ theme, language }) => { localStorage.setItem('theme', theme); localStorage.setItem('conversa-language', language); }, { theme, language });
    const page = await context.newPage();
    const errors = [];
    const writes = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('request', request => { if (!['GET', 'HEAD'].includes(request.method())) writes.push(`${request.method()} ${request.url()}`); });
    const response = await page.goto(`http://localhost:3104${route}`, { waitUntil: 'domcontentloaded' });
    await page.getByText('Loading ARO…').first().waitFor({ state: 'hidden' });
    await page.waitForFunction(expected => document.documentElement.classList.contains(expected), theme);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(650);
    if (await page.locator('main img').count()) await page.locator('main img').first().evaluate(image => image.decode().catch(() => {}));
    await page.screenshot({ path: join(output, `${slug}.png`) });
    const main = await page.locator('main').first().innerText();
    results.push({ slug, status: response?.status(), heading: await page.locator('h1').first().innerText(), main: main.slice(0, 500), hasPreviewLink: await page.locator('main a[href="/onboarding/preview"]').count() > 0, horizontalOverflow: await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), errors, writes });
    await context.close();
  }
} finally { await browser.close(); }
await writeFile(join(output, 'browser.json'), JSON.stringify(results, null, 2));
if (results.some(result => ![200, 404].includes(result.status) || !result.hasPreviewLink || result.horizontalOverflow || result.errors.length || result.writes.length)) process.exitCode = 1;
