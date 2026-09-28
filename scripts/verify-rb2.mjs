import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { launch } from '../e2e/harness.mjs';
import { onboardingPreviewCopy } from '../src/i18n/onboardingPreview.js';

const output = join(process.cwd(), 'artifacts', 'ARO-RB2');
await mkdir(output, { recursive: true });
const browser = await launch();
const base = process.env.RB2_BASE ?? 'http://localhost:3102';
const storage = (page) => page.evaluate(() => {
  const read = (area) => Object.fromEntries(Array.from({ length: area.length }, (_, index) => {
    const key = area.key(index);
    return [key, area.getItem(key)];
  }));
  return { local: read(localStorage), session: read(sessionStorage) };
});
const hasOverflow = (page) => page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
const screenshot = async (page, filename) => {
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: join(output, filename), fullPage: true });
};
const results = [];
try {
  for (const [width, height, theme, language, path] of [
    [320, 620, 'light', 'en', 'learn'],
    [360, 700, 'light', 'fr', 'learn'],
    [390, 844, 'dark', 'es', 'host'],
    [430, 740, 'light', 'en', 'both'],
    [768, 900, 'dark', 'fr', 'learn'],
    [1440, 900, 'light', 'en', 'host'],
  ]) {
    const slug = `${width}-${theme}-${language}-${path}`;
    const copy = onboardingPreviewCopy[language];
    const overflow = {};
    const context = await browser.newContext({ viewport: { width, height }, reducedMotion: 'reduce' });
    await context.addInitScript(({ theme, language }) => {
      localStorage.setItem('theme', theme);
      localStorage.setItem('conversa-language', language);
    }, { theme, language });
    const page = await context.newPage();
    const pageErrors = [];
    const requests = [];
    page.on('pageerror', error => pageErrors.push(error.message));
    page.on('request', request => { if (!['GET', 'HEAD'].includes(request.method())) requests.push(`${request.method()} ${request.url()}`); });
    const response = await page.goto(`${base}/onboarding/preview`, { waitUntil: 'domcontentloaded' });
    await page.getByText('Loading ARO…').first().waitFor({ state: 'hidden' });
    await page.waitForFunction(expected => document.documentElement.classList.contains(expected), theme);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(650);
    await page.locator('main img').first().evaluate(image => image.decode());
    // The Next development indicator is not part of the application surface.
    await page.addStyleTag({ content: 'nextjs-portal { display: none !important; }' });
    const storageBefore = await storage(page);
    overflow.intro = await hasOverflow(page);
    await screenshot(page, `${slug}-intro.png`);
    const buttons = page.locator('button');
    await page.getByRole('button', { name: copy.skip }).click();
    await page.getByRole('heading', { name: copy.choose.title }).waitFor();
    await page.getByRole('button', { name: copy.back }).click();
    await page.getByRole('heading', { name: copy.teach.title }).waitFor();
    await page.getByRole('button', { name: copy.back }).click();
    await page.getByRole('heading', { name: copy.learn.title }).waitFor();
    await buttons.filter({ hasText: /more|plus|más/i }).first().click();
    await page.locator('main img').first().evaluate(image => image.decode());
    overflow.teach = await hasOverflow(page);
    await screenshot(page, `${slug}-teach.png`);
    await buttons.filter({ hasText: /starting point|point de départ|punto de partida/i }).first().click();
    await page.locator('main img').first().evaluate(image => image.decode());
    overflow.choice = await hasOverflow(page);
    await screenshot(page, `${slug}-choice.png`);
    const choice = path === 'host' ? /Teach a skill|Enseigner une compétence|Enseñar una habilidad/ : path === 'both' ? /Explore both|Explorer les deux|Explorar ambos/ : /Find a class|Trouver un cours|Encontrar una clase/;
    await buttons.filter({ hasText: choice }).first().click();
    await page.getByRole('button', { name: copy.back }).click();
    const selectedIntentRestored = await page.getByRole('button', { name: copy.choose[path === 'host' ? 'host' : path === 'both' ? 'both' : 'learn'] }).getAttribute('aria-pressed') === 'true';
    await buttons.filter({ hasText: choice }).first().click();
    await buttons.filter({ hasText: /Continue|Continuer|Continuar/ }).first().click();
    const validation = await page.locator('[aria-invalid="true"]').count();
    const detailsAlertCount = await page.getByRole('alert').count();
    await page.locator('#preview-name').fill('RB2AuditName');
    await page.locator('#preview-age').fill('117');
    overflow.details = await hasOverflow(page);
    await buttons.filter({ hasText: /Continue|Continuer|Continuar/ }).first().click();
    await buttons.filter({ hasText: /Continue|Continuer|Continuar/ }).first().click();
    const cityAlertCount = await page.getByRole('alert').count();
    await page.locator('#preview-city').fill(width === 320 ? 'C'.repeat(80) : 'RB2AuditCity');
    overflow.city = await hasOverflow(page);
    await buttons.filter({ hasText: /Continue|Continuer|Continuar/ }).first().click();
    await screenshot(page, `${slug}-preference.png`);
    await page.getByRole('button', { name: path === 'host' ? copy.skill.action : copy.interests.action }).click();
    const preferenceAlertCount = await page.getByRole('alert').count();
    if (path === 'host') {
      await page.getByRole('button', { name: /Conversation practice|Pratique de conversation|Práctica de conversación/ }).last().click();
    } else {
      await buttons.filter({ hasText: /Photography|Photographie|Fotografía/ }).last().click();
    }
    overflow.preference = await hasOverflow(page);
    await buttons.filter({ hasText: /first idea|première idée|primera idea|class draft|brouillon de cours|borrador de mi clase/ }).first().click();
    overflow.result = await hasOverflow(page);
    if (width === 320) {
      await page.getByRole('button', { name: copy.result.edit }).click();
      await page.getByRole('button', { name: copy.back }).click();
      await page.locator('#preview-city').fill('RB2AuditCity');
      await page.getByRole('button', { name: copy.next }).click();
      await page.getByRole('button', { name: copy.interests.action }).click();
    }
    await screenshot(page, `${slug}-result.png`);
    const body = await page.locator('body').innerText();
    await page.getByRole('button', { name: copy.result.edit }).click();
    const editRetained = path === 'host'
      ? await page.getByRole('button', { name: copy.skill.options[0].title }).last().getAttribute('aria-pressed') === 'true'
      : await page.getByRole('button', { name: copy.topics[0] }).last().getAttribute('aria-pressed') === 'true';
    await page.getByRole('button', { name: path === 'host' ? copy.skill.action : copy.interests.action }).click();
    let bothCanSwitchToHost = null;
    if (path === 'both') {
      await page.getByRole('button', { name: copy.result.bothAction }).click();
      bothCanSwitchToHost = await page.getByRole('button', { name: copy.skill.options[0].title }).count() > 0;
      await page.getByRole('button', { name: copy.skill.options[0].title }).last().click();
      await page.getByRole('button', { name: copy.skill.action }).click();
    }
    const storageAfter = await storage(page);
    const storageUnchanged = JSON.stringify(storageBefore) === JSON.stringify(storageAfter);
    await page.reload();
    await page.getByRole('heading', { name: copy.learn.title }).waitFor();
    const resetOnRefresh = await page.getByRole('heading', { name: copy.learn.title }).count() === 1;
    await page.getByRole('button', { name: copy.skip }).click();
    await page.getByRole('button', { name: copy.choose[path === 'host' ? 'host' : path === 'both' ? 'both' : 'learn'] }).click();
    await page.locator('#preview-name').fill('RB2AuditName');
    await page.locator('#preview-age').fill('117');
    await page.getByRole('button', { name: copy.next }).click();
    await page.locator('#preview-city').fill('RB2AuditCity');
    await page.getByRole('button', { name: copy.next }).click();
    if (path === 'host') await page.getByRole('button', { name: copy.skill.options[0].title }).last().click();
    else await page.getByRole('button', { name: copy.topics[0] }).last().click();
    await page.getByRole('button', { name: path === 'host' ? copy.skill.action : copy.interests.action }).click();
    if (path === 'both') {
      await page.getByRole('button', { name: copy.result.bothAction }).click();
      await page.getByRole('button', { name: copy.skill.options[0].title }).last().click();
      await page.getByRole('button', { name: copy.skill.action }).click();
    }
    const destination = path === 'host' || path === 'both' ? '/for-teachers' : '/explore';
    await page.getByRole('link', { name: path === 'host' || path === 'both' ? copy.result.hostNext : copy.result.explore }).click();
    await page.waitForURL((url) => url.pathname === destination);
    const navigationWorks = new URL(page.url()).pathname === destination;
    results.push({ slug, status: response?.status(), validation, detailsAlertCount, cityAlertCount, preferenceAlertCount, overflow, pageErrors, requests, storageBefore, storageAfter, storageUnchanged, selectedIntentRestored, editRetained, navigationWorks, resetOnRefresh, bothCanSwitchToHost, result: body.slice(-700) });
    await context.close();
  }
} finally {
  await browser.close();
}
await writeFile(join(output, 'browser.json'), JSON.stringify(results, null, 2));
if (results.some(result => result.status !== 200 || result.validation < 2 || result.detailsAlertCount < 2 || result.cityAlertCount < 1 || result.preferenceAlertCount < 1 || Object.values(result.overflow).some(Boolean) || result.pageErrors.length || result.requests.length || !result.storageUnchanged || !result.selectedIntentRestored || !result.editRetained || !result.navigationWorks || !result.resetOnRefresh || result.bothCanSwitchToHost === false)) process.exitCode = 1;
