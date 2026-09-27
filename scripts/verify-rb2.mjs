import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const output = join(process.cwd(), 'artifacts', 'ARO-RB2');
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
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
    const response = await page.goto('http://localhost:3102/onboarding/preview', { waitUntil: 'domcontentloaded' });
    await page.getByText('Loading ARO…').first().waitFor({ state: 'hidden' });
    await page.waitForFunction(expected => document.documentElement.classList.contains(expected), theme);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(650);
    await page.locator('main img').first().evaluate(image => image.decode());
    await page.screenshot({ path: join(output, `${slug}-intro.png`) });
    const buttons = page.locator('button');
    await buttons.filter({ hasText: /more|plus|más/i }).first().click();
    await page.locator('main img').first().evaluate(image => image.decode());
    await page.screenshot({ path: join(output, `${slug}-teach.png`) });
    await buttons.filter({ hasText: /starting point|point de départ|punto de partida/i }).first().click();
    await page.locator('main img').first().evaluate(image => image.decode());
    await page.screenshot({ path: join(output, `${slug}-choice.png`) });
    const choice = path === 'host' ? /Teach a skill|Enseigner une compétence|Enseñar una habilidad/ : path === 'both' ? /Explore both|Explorer les deux|Explorar ambos/ : /Find a class|Trouver un cours|Encontrar una clase/;
    await buttons.filter({ hasText: choice }).first().click();
    await buttons.filter({ hasText: /Continue|Continuer|Continuar/ }).first().click();
    const validation = await page.locator('[aria-invalid="true"]').count();
    await page.locator('#preview-name').fill('Alex');
    await page.locator('#preview-age').fill('28');
    await buttons.filter({ hasText: /Continue|Continuer|Continuar/ }).first().click();
    await page.locator('#preview-city').fill('Calgary');
    await buttons.filter({ hasText: /Continue|Continuer|Continuar/ }).first().click();
    await page.screenshot({ path: join(output, `${slug}-preference.png`) });
    if (path === 'host') {
      await page.locator('#preview-skill').fill('Guitar');
      await page.locator('#preview-outcome').fill('Play a simple song');
    } else {
      await buttons.filter({ hasText: /Photography|Photographie|Fotografía/ }).last().click();
    }
    await buttons.filter({ hasText: /first idea|première idée|primera idea|class draft|brouillon de cours|borrador de mi clase/ }).first().click();
    await page.screenshot({ path: join(output, `${slug}-result.png`) });
    const body = await page.locator('body').innerText();
    const storageKeys = await page.evaluate(() => Object.keys(localStorage));
    const inputLeakedToStorage = await page.evaluate(() => JSON.stringify(localStorage).includes('Alex') || JSON.stringify(localStorage).includes('Calgary'));
    if (path === 'both') await buttons.filter({ hasText: /Sketch a class draft/ }).first().click();
    const bothCanSwitchToHost = path === 'both' ? await page.locator('#preview-skill').count() === 1 : null;
    await page.reload();
    const resetOnRefresh = await page.getByRole('heading', { name: /Your next|Votre prochain|Tu próximo/ }).count() === 1;
    results.push({ slug, status: response?.status(), validation, horizontalOverflow: await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), pageErrors, requests, storageKeys, inputLeakedToStorage, resetOnRefresh, bothCanSwitchToHost, result: body.slice(-700) });
    await context.close();
  }
} finally {
  await browser.close();
}
await writeFile(join(output, 'browser.json'), JSON.stringify(results, null, 2));
if (results.some(result => result.status !== 200 || result.validation < 2 || result.horizontalOverflow || result.pageErrors.length || result.requests.length || result.inputLeakedToStorage || !result.resetOnRefresh || result.bothCanSwitchToHost === false)) process.exitCode = 1;
