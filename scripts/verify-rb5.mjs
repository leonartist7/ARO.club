import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const output = join(process.cwd(), 'artifacts', 'ARO-RB5');
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const results = [];
try {
  for (const [route, width, height, theme, language] of [
    ['/about', 320, 700, 'light', 'en'],
    ['/about', 1440, 900, 'dark', 'fr'],
    ['/how-it-works', 390, 844, 'light', 'es'],
    ['/for-teachers', 360, 740, 'dark', 'en'],
    ['/faq', 768, 900, 'light', 'fr'],
    ['/contact', 390, 844, 'dark', 'es'],
  ]) {
    const slug = `${route.slice(1)}-${width}-${theme}-${language}`;
    const context = await browser.newContext({ viewport: { width, height }, reducedMotion: 'reduce' });
    await context.addInitScript(({ theme, language }) => { localStorage.setItem('theme', theme); localStorage.setItem('conversa-language', language); }, { theme, language });
    const page = await context.newPage();
    const errors = [];
    const writes = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('request', request => { if (!['GET', 'HEAD'].includes(request.method())) writes.push(`${request.method()} ${request.url()}`); });
    const response = await page.goto(`http://localhost:3105${route}`, { waitUntil: 'domcontentloaded' });
    await page.getByText('Loading ARO…').first().waitFor({ state: 'hidden' });
    await page.waitForFunction(expected => document.documentElement.classList.contains(expected), theme);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(650);
    if (await page.locator('img').count()) await page.locator('img').first().evaluate(image => image.decode().catch(() => {}));
    await page.screenshot({ path: join(output, `${slug}.png`) });
    let contactSaved = null;
    if (route === '/contact') {
      await page.locator('#contact-subject').fill('Pregunta de prueba');
      await page.locator('#contact-message').fill('Una nota de prueba');
      await page.locator('form button[type="submit"]').click();
      contactSaved = (await page.locator('[role="status"]').innerText()).includes('No se ha enviado ningún mensaje') && await page.evaluate(() => JSON.stringify(localStorage.getItem('conversa-contact-messages')).includes('Pregunta de prueba'));
      await page.reload();
      await page.getByText('Pregunta de prueba').first().waitFor();
      contactSaved = contactSaved && await page.getByText('Pregunta de prueba').count() > 0;
    }
    const links = await page.locator('footer a').evaluateAll(anchors => anchors.map(anchor => anchor.getAttribute('href')));
    const body = await page.locator('body').innerText();
    results.push({ slug, status: response?.status(), heading: await page.locator('h1').first().innerText(), horizontalOverflow: await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), hasPlaceholderFooterLink: links.includes('#'), hasUnsupportedClaims: /100\+ Verified Teachers|5,000\+ Happy Learners|\$30-60 per hour|15\+ Cities Worldwide/.test(body), hasPreviewLink: await page.locator('a[href="/onboarding/preview"]').count() > 0, contactSaved, errors, writes });
    await context.close();
  }
} finally { await browser.close(); }
await writeFile(join(output, 'browser.json'), JSON.stringify(results, null, 2));
if (results.some(result => result.status !== 200 || result.horizontalOverflow || result.hasPlaceholderFooterLink || result.hasUnsupportedClaims || !result.hasPreviewLink || result.contactSaved === false || result.errors.length || result.writes.length)) process.exitCode = 1;
