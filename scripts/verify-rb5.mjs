import { BASE, launch, navigate, requireAppOrigin } from '../e2e/harness.mjs';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { publicStoryCopy } from '../src/i18n/publicStory.js';

const output = join(process.cwd(), 'artifacts', 'ARO-RB5');
await mkdir(output, { recursive: true });
const browser = await launch();
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
    if (await page.locator('img').count()) await page.locator('img').first().evaluate(image => image.decode().catch(() => {}));
    await page.screenshot({ path: join(output, `${slug}.png`) });
    let contactSaved = null;
    let contactCorruptHandled = null;
    let contactLongSubjectVisible = null;
    let faqDestinations = null;
    if (route === '/faq') {
      faqDestinations = await page.locator('details a[href="/for-teachers"]').count() === 1 && await page.locator('details a[href="/privacy"]').count() === 1 && await page.locator('a[href="/contact"]').count() > 0;
    }
    if (route === '/contact') {
      await page.locator('#contact-subject').fill('Pregunta de prueba');
      await page.locator('#contact-message').fill('Una nota de prueba');
      await page.locator('form button[type="submit"]').click();
      contactSaved = (await page.locator('[role="status"]').innerText()).includes('No se ha enviado ningún mensaje') && await page.evaluate(() => JSON.stringify(localStorage.getItem('conversa-contact-messages')).includes('Pregunta de prueba'));
      await page.reload();
      await page.getByText('Pregunta de prueba').first().waitFor();
      contactSaved = contactSaved && await page.getByText('Pregunta de prueba').count() > 0;
      await page.evaluate(() => localStorage.setItem('conversa-contact-messages', '[null]'));
      await page.reload();
      await page.getByRole('status').getByText(publicStoryCopy[language].contact.storageError).waitFor();
      contactCorruptHandled = await page.locator('#contact-subject').count() === 1;
      await page.evaluate(() => localStorage.setItem('conversa-contact-messages', JSON.stringify([{ subject: 'S'.repeat(120), message: 'A saved note' }])));
      await page.reload();
      contactLongSubjectVisible = await page.locator('details summary').evaluate(summary => summary.getBoundingClientRect().right <= innerWidth && summary.scrollWidth <= summary.clientWidth + 1);
    }
    const links = await page.locator('footer a').evaluateAll(anchors => anchors.map(anchor => anchor.getAttribute('href')));
    const body = await page.locator('body').innerText();
    results.push({ slug, status: response?.status(), heading: await page.locator('h1').first().innerText(), horizontalOverflow: await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), headerClipped: await page.locator('header nav[aria-label="Main"]').evaluate(nav => [...nav.querySelectorAll('a, button')].some(item => item.getClientRects().length && item.getBoundingClientRect().right > innerWidth + 1)), hasPlaceholderFooterLink: links.includes('#'), hasUnsupportedClaims: /100\+ Verified Teachers|5,000\+ Happy Learners|\$30-60 per hour|15\+ Cities Worldwide/.test(body), hasPreviewLink: await page.locator('a[href="/onboarding/preview"]').count() > 0, faqDestinations, contactSaved, contactCorruptHandled, contactLongSubjectVisible, errors, writes });
    await context.close();
  }
} finally { await browser.close(); }
await writeFile(join(output, 'browser.json'), JSON.stringify(results, null, 2));
if (results.some(result => result.status !== 200 || result.horizontalOverflow || result.headerClipped || result.hasPlaceholderFooterLink || result.hasUnsupportedClaims || !result.hasPreviewLink || result.faqDestinations === false || result.contactSaved === false || result.contactCorruptHandled === false || result.contactLongSubjectVisible === false || result.errors.length || result.writes.length)) process.exitCode = 1;
