import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { chromium } from 'playwright';
import { startProductionServer } from '../src/test/production-server.js';
import { getCircleBuilderCopy } from '../src/i18n/circleBuilder.js';
import { CATEGORY_REGISTRY } from '../src/features/circle-builder/registry.js';

const output = join(process.cwd(), 'artifacts/ARO-CB1-F4/browser');
await mkdir(output, { recursive: true });
const { base, server } = await startProductionServer(3125);
const canary = 'F4-PRIVATE-CANARY-20261007', cases = [], failures = [], leakage = [], writes = [];
let browser;
const button = (page, name) => page.getByRole('button', { name, exact: true });
async function check(page) {
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, 'no horizontal overflow');
  assert.equal(await page.evaluate(value => [localStorage, sessionStorage].some(storage => Object.keys(storage).some(key => (storage.getItem(key) ?? '').includes(value))), canary), false);
  assert(!page.url().includes(canary));
  assert(await page.locator('main button, main input, main select').evaluateAll(nodes => nodes.filter(node => node.getBoundingClientRect().height > 0).every(node => node.getBoundingClientRect().height >= 44)));
}
try {
  browser = await chromium.launch({ headless: true });
  for (const width of [320, 360, 390, 768, 1440]) for (const theme of ['light', 'dark']) for (const locale of ['en', 'fr', 'es']) {
    const context = await browser.newContext({ viewport: { width, height: width === 320 ? 568 : width < 768 ? 740 : 900 }, reducedMotion: 'reduce' });
    await context.addInitScript(({ theme, locale }) => { localStorage.setItem('theme', theme); localStorage.setItem('conversa-language', locale); }, { theme, locale });
    const page = await context.newPage(), copy = getCircleBuilderCopy(locale), category = CATEGORY_REGISTRY[['en', 'fr', 'es'].indexOf(locale)];
    page.on('pageerror', error => failures.push(error.message));
    page.on('console', message => { if (message.text().includes(canary)) leakage.push('console'); });
    page.on('request', request => {
      if (!['GET', 'HEAD'].includes(request.method())) writes.push(request.method());
      if ([request.url(), request.postData(), JSON.stringify(request.headers())].some(text => text?.includes(canary))) leakage.push('request');
    });
    page.on('websocket', socket => socket.on('framesent', event => { if (String(event.payload).includes(canary)) leakage.push('websocket'); }));
    assert.equal((await page.goto(base + '/app/create', { waitUntil: 'networkidle' })).status(), 200);
    await button(page, category.label[locale]).click();
    if (theme === 'light') await button(page, copy.useExample).click(); else await button(page, copy.ownIdea).click();
    await button(page, copy.chooseNext).click();
    await page.getByLabel(copy.title, { exact: true }).fill(canary);
    await page.getByLabel(copy.outcome, { exact: true }).fill('Practice one small thing.');
    await check(page); await button(page, copy.shapeNext).click(); await check(page);
    await button(page, copy.detailsNext).click();
    await button(page, copy.editPeople).click(); await page.getByLabel(copy.detailFields.audience, { exact: true }).fill(canary + ' adults');
    await button(page, copy.returnReview).click(); assert.equal(await page.evaluate(() => document.activeElement.id), 'builder-summary-details-people');
    await button(page, copy.finishSketch).click(); assert(await page.getByText(copy.readyBody, { exact: true }).isVisible()); await check(page);
    const shellExit = page.locator('nav a[href="/app/world"]').last(); await shellExit.click();
    assert.equal(await page.evaluate(() => document.activeElement.textContent), copy.keepEditing);
    for (let i = 0; i < 4; i++) { await page.keyboard.press('Tab'); assert(await page.evaluate(() => document.querySelector('dialog[open]').contains(document.activeElement))); }
    await page.keyboard.press('Escape'); assert.equal(await page.getByRole('dialog').count(), 0); assert(await shellExit.evaluate(node => node === document.activeElement));
    if (locale === 'en' && [360, 1440].includes(width)) await page.screenshot({ path: join(output, 'ready-' + width + '-' + theme + '.png'), fullPage: true });
    await button(page, copy.startAnother).click(); await page.getByRole('dialog').getByRole('button', { name: copy.startAnother, exact: true }).click();
    assert.equal(await page.getByRole('button', { pressed: true }).count(), 0);
    await button(page, category.label[locale]).click(); await shellExit.click(); await button(page, copy.discardSketch).click();
    await page.waitForURL(base + '/app/world'); await check(page);
    cases.push({ width, theme, locale, group: category.id, path: theme === 'light' ? 'example' : 'manual', targetedEdit: true, exitCancelFocus: true, discard: true, reset: true, canary: true });
    await context.close();
  }
  assert.deepEqual(failures, []); assert.deepEqual(leakage, []); assert.deepEqual(writes, []);
} finally {
  await writeFile(join(output, 'report.json'), JSON.stringify({ source: process.env.GITHUB_SHA ?? 'local', browser: browser?.version() ?? null, cases, failures, leakage, writes, limits: 'Paired performance, external/modified links, reload/back, art-failure and extended keyboard evidence remain separate release criteria.' }, null, 2));
  await browser?.close(); server.kill('SIGTERM');
}
process.stdout.write('CB1_F4_ROUTE_CASES=' + cases.length + '\n');
