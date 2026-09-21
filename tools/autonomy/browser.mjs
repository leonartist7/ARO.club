import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { spawn, spawnSync } from 'node:child_process';
import { setTimeout as sleep } from 'node:timers/promises';
import { verifySource, separateRoots, safeFile, hash, writeJson } from './core.mjs';
import { frameworkInventory, frameworkCommands, syntheticEnvironment, freshBuildDirectory } from './framework.mjs';

// Evidence collection only. AI audit completion remains a separate worker report.
const [source, sha, output] = process.argv.slice(2);
const { root, tracked } = verifySource(source, sha);
const { out } = separateRoots(root, output);
if (!tracked.includes('src/config/ux0.js') || !/UX0_PROTOTYPE_MODE\s*=\s*true/.test(fs.readFileSync(safeFile(root, 'src/config/ux0.js'), 'utf8'))) throw Error('Browser evidence requires synthetic mode');
const { framework } = frameworkInventory(root, tracked, safeFile);
const commands = frameworkCommands(framework);
const environment = syntheticEnvironment(root, process.env);
if (fs.existsSync(out)) throw Error('Browser output must be a new directory');
fs.mkdirSync(out, { recursive: true });
// Never launch a prior build whose public variables might have been inlined.
// Only the validated, ignored framework output in this disposable root is removed.
fs.rmSync(freshBuildDirectory(root, tracked, commands.output), { recursive: true, force: true });
const executable = safeFile(root, commands.executable);
const build = spawnSync(process.execPath, [executable, ...commands.build], { cwd: root, env: environment, stdio: 'ignore', timeout: 300000 });
if (build.error || build.status !== 0) throw Error('Synthetic rebuild failed; output suppressed');
verifySource(root, sha);
syntheticEnvironment(root, process.env);
writeJson(path.join(out, 'synthetic-build.json'), { auditSha: sha, framework, freshBuild: true, accountsEnabled: false, providerConfiguration: false, localEnvironmentFiles: false, inheritedBuildUsed: false });
const require = createRequire(path.join(root, 'package.json'));
const { chromium } = require('playwright');
const base = 'http://127.0.0.1:5199';
const server = spawn(process.execPath, [executable, ...commands.serve], { cwd: root, env: environment, stdio: 'ignore' });
let browser;
const results = [], failures = [];
try {
  let ready = false;
  for (let i = 0; i < 40; i++) {
    if (server.exitCode !== null) throw Error('Dedicated preview server exited; port may be occupied');
    try { ready = (await fetch(base, { signal: AbortSignal.timeout(500) })).ok; } catch { /* startup */ }
    if (ready) break;
    await sleep(250);
  }
  if (!ready) throw Error('Dedicated preview server did not start');
  // A successful fetch alone must not accidentally select another user's server.
  await sleep(300);
  if (server.exitCode !== null) throw Error('Dedicated preview server failed');
  const chrome = process.env.E2E_CHROME;
  browser = await chromium.launch(chrome ? { executablePath: chrome } : {});
  const routes = ['/app', '/app/world', '/app/create', '/app/insights', '/app/library', '/app/opportunities', '/app/opportunities/shared-stories', '/app/opportunities/shared-stories/commit', '/app/circles', '/app/circles/shared-stories', '/app/passport', '/app/profile', '/app/express', '/app/settings', '/app/opportunities/invalid-audit-id'];
  for (const width of [360, 390, 430, 768, 1440]) for (const theme of ['light', 'dark']) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, colorScheme: theme, reducedMotion: 'reduce' });
    await context.addInitScript(theme => {
      localStorage.setItem('theme', theme);
      document.addEventListener('DOMContentLoaded', () => document.documentElement.classList.toggle('dark', theme === 'dark'));
    }, theme);
    const blockedRequests = [];
    await context.route('**/*', route => {
      const host = new URL(route.request().url()).hostname;
      if (['127.0.0.1', 'fonts.googleapis.com', 'fonts.gstatic.com'].includes(host)) return route.continue();
      blockedRequests.push({ host, method: route.request().method() }); return route.abort();
    });
    const page = await context.newPage();
    for (const route of routes) {
      const errors = [], consoleErrors = [];
      const onError = e => errors.push(String(e));
      const onConsole = m => { if (m.type() === 'error') consoleErrors.push(m.text()); };
      page.on('pageerror', onError); page.on('console', onConsole);
      const key = `${route.replace(/\//g, '-').slice(1)}-${width}-${theme}`;
      const requestStart = blockedRequests.length;
      try {
        await page.goto(base + route, { waitUntil: 'networkidle', timeout: 30000 });
        const state = await page.evaluate(() => ({
          text: document.body.innerText,
          overflow: document.documentElement.scrollWidth > innerWidth,
          overlay: !!document.querySelector('vite-error-overlay'),
          links: [...document.querySelectorAll('a[href]')].map(a => ({ text: a.innerText, label: a.getAttribute('aria-label'), href: a.getAttribute('href') })),
          controls: [...document.querySelectorAll('button,a,input,textarea,select')].map(e => { const r = e.getBoundingClientRect(), s = getComputedStyle(e); return { tag: e.tagName, text: e.innerText?.slice(0, 120), label: e.getAttribute('aria-label'), width: r.width, height: r.height, fontSize: s.fontSize, color: s.color, background: s.backgroundColor, disabled: e.disabled ?? false }; }),
          images: [...document.images].map(i => ({ src: i.getAttribute('src'), alt: i.alt, naturalWidth: i.naturalWidth, naturalHeight: i.naturalHeight, complete: i.complete, loading: i.loading })),
          resources: performance.getEntriesByType('resource').map(r => ({ name: r.name.replace(location.origin, ''), duration: r.duration, transferSize: r.transferSize })),
        }));
        const focus = [];
        for (let i = 0; i < 8; i++) { await page.keyboard.press('Tab'); focus.push(await page.evaluate(() => ({ tag: document.activeElement.tagName, text: document.activeElement.textContent?.slice(0, 80), label: document.activeElement.getAttribute('aria-label') }))); }
        await page.screenshot({ path: path.join(out, `${key}.jpg`), type: 'jpeg', quality: 72, fullPage: true });
        results.push({ route, width, theme, reducedMotion: true, state, focus, errors, consoleErrors, blockedRequests: blockedRequests.slice(requestStart), screenshot: `${key}.jpg` });
        if (errors.length || state.overlay || state.text.trim().length < 50) failures.push(key);
      } catch (error) { failures.push(key); results.push({ route, width, theme, error: String(error), errors, consoleErrors }); }
      page.off('pageerror', onError); page.off('console', onConsole);
    }
    await context.close();
  }
} finally {
  if (browser) await browser.close();
  server.kill();
  writeJson(path.join(out, 'browser-evidence.json'), { schemaVersion: 1, auditSha: sha, createdAt: new Date().toISOString(), kind: 'browser-observations', auditCompleted: false,
    limitations: ['Forced DOM theme is not proof of theme switching', 'Reduced-motion captures only; animation behavior needs separate review', 'First eight focus stops only', 'Computed colors are not full composited contrast measurements', 'Transfer sizes are unthrottled local observations, not real-user performance', 'Source controls and click-through behavior need worker interpretation or additional tests'], results, failures });
  const manifest = fs.readdirSync(out).map(file => ({ path: file, sha256: hash(fs.readFileSync(path.join(out, file))) }));
  writeJson(path.join(out, 'evidence-manifest.json'), { auditSha: sha, files: manifest });
}
verifySource(root, sha);
process.stdout.write(`Collected ${results.length} browser observations; ${failures.length} failed loads. This is not completed audit acceptance.\n`);
if (failures.length) process.exitCode = 1;
