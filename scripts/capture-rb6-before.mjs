import { chromium } from 'playwright';
import { join } from 'node:path';

// Run against the RB5 production build on port 3105 before applying RB6.
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
try {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto('http://localhost:3105/leaderboard', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(650);
  await page.screenshot({ path: join(process.cwd(), 'artifacts', 'ARO-RB6', 'before-leaderboard-390-light-en.png') });
} finally { await browser.close(); }
