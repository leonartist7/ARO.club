import { BASE, launch, createRun, assert } from './harness.mjs';

const ROUTES = [
  '/', '/explore', '/about', '/how-it-works', '/for-teachers',
  '/faq', '/contact', '/leaderboard', '/map',
];

const WIDTHS = [390, 768];

/**
 * Asserts no page scrolls sideways.
 *
 * Decorative elements that intentionally overhang their card (step badges,
 * blur orbs) are the usual culprit; they must be clipped, not turned into a
 * horizontal scrollbar.
 */
export default async function responsive() {
  const browser = await launch();
  const run = createRun('responsive');

  for (const width of WIDTHS) {
    run.heading(`${width}px`);
    const context = await browser.newContext({ viewport: { width, height: 844 } });
    const page = await context.newPage();

    const overflowing = [];

    for (const route of ROUTES) {
      await page.goto(BASE + route, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(2200); // let entrance animations settle

      const result = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));

      if (result.scrollWidth > result.clientWidth + 1) {
        overflowing.push(`${route} (${result.scrollWidth} > ${result.clientWidth})`);
      }
    }

    await run.step(`no horizontal overflow at ${width}px`, () =>
      assert(overflowing.length === 0, overflowing.join(', '))
    );

    await context.close();
  }

  await browser.close();
  return run;
}
