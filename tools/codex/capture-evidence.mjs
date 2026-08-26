import { mkdirSync, writeFileSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { setTimeout as sleep } from 'node:timers/promises';
import { join } from 'node:path';
import { BASE, launch, seedPlayer } from '../../e2e/harness.mjs';

const args = process.argv.slice(2);
const value = (name, fallback) => {
  const index = args.indexOf(`--${name}`);
  return index >= 0 && args[index + 1] ? args[index + 1] : fallback;
};

const packageId = value('package', 'manual').replace(/[^a-zA-Z0-9._-]+/g, '-');
const routes = value('routes', '/').split(',').map((route) => route.trim()).filter(Boolean);
const themes = value('themes', 'light,dark').split(',').map((theme) => theme.trim()).filter(Boolean);
const viewports = value('viewports', '390x844,768x1024,1440x900')
  .split(',')
  .map((item) => item.trim())
  .filter(Boolean)
  .map((item) => {
    const [width, height] = item.split('x').map(Number);
    if (!Number.isFinite(width) || !Number.isFinite(height)) throw new Error(`Invalid viewport: ${item}`);
    return { width, height };
  });

const isUp = async () => {
  try {
    const response = await fetch(BASE, { signal: AbortSignal.timeout(1500) });
    return response.ok;
  } catch {
    return false;
  }
};

const waitForServer = async (attempts = 50) => {
  for (let index = 0; index < attempts; index++) {
    if (await isUp()) return true;
    await sleep(500);
  }
  return false;
};

let server = null;
if (!(await isUp())) {
  console.log(`Starting dev server for evidence capture at ${BASE}`);
  server = spawn('npm', ['run', 'dev'], {
    stdio: 'ignore',
    shell: process.platform === 'win32',
  });
  if (!(await waitForServer())) {
    server.kill();
    throw new Error(`Dev server never became available at ${BASE}`);
  }
}

const stamp = new Date().toISOString().replace(/[:.]/g, '-');
const outDir = join('artifacts', 'codex-evidence', packageId, stamp);
mkdirSync(outDir, { recursive: true });

const browser = await launch();
const manifest = {
  package: packageId,
  base: BASE,
  createdAt: new Date().toISOString(),
  routes,
  themes,
  viewports,
  screenshots: [],
  pageErrors: [],
};

const safeRoute = (route) => (route === '/' ? 'home' : route.replace(/^\/+/, '').replace(/[^a-zA-Z0-9._-]+/g, '-'));

try {
  for (const viewport of viewports) {
    for (const theme of themes) {
      const context = await browser.newContext({ viewport });
      const page = await context.newPage();
      page.on('pageerror', (error) => manifest.pageErrors.push(String(error).slice(0, 300)));

      // Establish a real origin before touching localStorage; opaque about:blank
      // documents may reject storage access on some browsers/platforms.
      await page.goto(BASE, { waitUntil: 'domcontentloaded' });
      await page.evaluate(({ playerData, selectedTheme }) => {
        localStorage.setItem('conversa-player', JSON.stringify(playerData));
        localStorage.setItem('conversa-theme', selectedTheme);
      }, { playerData: seedPlayer({ bookings: [], badges: [] }), selectedTheme: theme });

      for (const route of routes) {
        await page.goto(BASE + route, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(1500);
        await page.evaluate((selectedTheme) => {
          document.documentElement.classList.toggle('dark', selectedTheme === 'dark');
        }, theme);
        await page.waitForTimeout(350);

        const filename = `${safeRoute(route)}__${viewport.width}x${viewport.height}__${theme}.png`;
        const path = join(outDir, filename);
        await page.screenshot({ path, fullPage: true });
        manifest.screenshots.push({ route, theme, viewport, path });
        console.log(`captured ${path}`);
      }

      await context.close();
    }
  }
} finally {
  await browser.close();
  if (server) server.kill();
}

writeFileSync(join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 2));

console.log(`\nEvidence manifest: ${join(outDir, 'manifest.json')}`);
if (manifest.pageErrors.length) {
  console.log(`Page errors captured: ${manifest.pageErrors.length}`);
  for (const error of manifest.pageErrors.slice(0, 8)) console.log(`  - ${error}`);
  process.exitCode = 1;
}
