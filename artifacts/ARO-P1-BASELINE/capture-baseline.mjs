import { chromium } from 'playwright';

const browser = await chromium.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
});

const cases = [
  { name: 'profile-gate', path: '/profile' },
  { name: 'onboarding-gate', path: '/onboarding/student' },
];
const viewports = [
  { name: 'mobile', width: 360, height: 800 },
  { name: 'desktop', width: 1440, height: 1000 },
];
const themes = ['light', 'dark'];
const results = [];

for (const route of cases) {
  for (const viewport of viewports) {
    for (const theme of themes) {
      const page = await browser.newPage({ viewport });
      const errors = [];
      page.on('pageerror', (error) => errors.push(String(error)));
      page.on('console', (message) => {
        if (message.type() === 'error') errors.push(message.text());
      });
      await page.addInitScript((selectedTheme) => {
        localStorage.setItem('theme', selectedTheme);
      }, theme);
      await page.goto(`http://127.0.0.1:5173${route.path}`, {
        waitUntil: 'networkidle',
      });
      const facts = await page.evaluate(() => ({
        path: window.location.pathname,
        title: document.title,
        bodyLength: document.body.innerText.trim().length,
        h1Count: document.querySelectorAll('h1').length,
        mainCount: document.querySelectorAll('main').length,
        overflow: document.documentElement.scrollWidth > window.innerWidth,
        errorOverlay: Boolean(
          document.querySelector('.vite-error-overlay, #webpack-dev-server-client-overlay')
        ),
        unnamedControls: [...document.querySelectorAll('button, a')].filter(
          (node) => !node.textContent.trim() && !node.getAttribute('aria-label')
        ).length,
      }));
      const file = `artifacts/ARO-P1-BASELINE/${route.name}-${viewport.name}-${theme}.png`;
      await page.screenshot({ path: file, fullPage: true });
      results.push({
        requestedPath: route.path,
        viewport: viewport.name,
        theme,
        file,
        errors,
        ...facts,
      });
      await page.close();
    }
  }
}

await browser.close();
console.log(JSON.stringify(results, null, 2));
