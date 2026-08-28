import { BASE, launch, navigate, createRun, assert } from './harness.mjs';

const ROUTES = [
  '/', '/explore', '/about', '/how-it-works', '/for-teachers', '/faq', '/contact',
  '/leaderboard', '/map', '/terms', '/login', '/signup', '/experience/exp1',
  '/teacher/t1', '/no-such-page', '/favorites', '/recently-viewed', '/compare',
];

/**
 * Catches light slabs left behind in dark mode.
 *
 * Several shared components were light-only while sitting inside dark-aware
 * containers, which rendered dark text on dark backgrounds - unreadable, and
 * invisible to any build step. This walks every route in dark mode looking for
 * large, bright, low-saturation blocks.
 */
export default async function darkMode() {
  const browser = await launch();
  const run = createRun('dark mode');

  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();

  await navigate(page, BASE, { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    localStorage.setItem('conversa-theme', 'dark');
  });

  const offenders = [];

  for (const route of ROUTES) {
    await navigate(page, BASE + route, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1100);
    await page.evaluate(() => document.documentElement.classList.add('dark'));
    await page.waitForTimeout(400);

    const found = await page.evaluate(() => {
      const parse = (rgb) => {
        const m = rgb.match(/\d+(\.\d+)?/g);
        if (!m) return null;
        const [r, g, b] = m.map(Number);
        // Alpha matters: `bg-white/10` is a deliberate translucent overlay on
        // a coloured hero, not a light surface. Only near-opaque fills count.
        const alpha = m[3] !== undefined ? Number(m[3]) : 1;
        if (alpha < 0.85) return null;
        return { r, g, b, lum: (0.299 * r + 0.587 * g + 0.114 * b) / 255 };
      };

      const out = [];
      for (const el of document.querySelectorAll('main *')) {
        const rect = el.getBoundingClientRect();
        if (rect.width * rect.height < 30000) continue;

        const colour = parse(getComputedStyle(el).backgroundColor);
        if (!colour || colour.lum < 0.75) continue;

        // Brand colours (yellow CTAs) are legitimately bright. Only flag
        // near-greys, which are the light-theme surfaces that leaked through.
        const spread = Math.max(colour.r, colour.g, colour.b) - Math.min(colour.r, colour.g, colour.b);
        if (spread > 25) continue;

        const parent = el.parentElement
          ? parse(getComputedStyle(el.parentElement).backgroundColor)
          : null;
        if (parent && parent.lum >= 0.75) continue; // report the outermost only

        out.push((el.className?.toString?.() || el.tagName).slice(0, 70));
      }
      return out.slice(0, 3);
    });

    if (found.length) offenders.push(`${route}: ${found.join(' | ')}`);
  }

  await run.step('no light surfaces remain in dark mode', () =>
    assert(offenders.length === 0, offenders.join('  //  '))
  );

  // Contrast is the failure the slab check misses: adding `dark:text-white`
  // to a tile whose tinted background stayed light makes the text vanish,
  // and the tile is too small to trip the size threshold.
  const lowContrast = [];

  for (const route of ROUTES) {
    await navigate(page, BASE + route, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);
    await page.evaluate(() => document.documentElement.classList.add('dark'));
    await page.waitForTimeout(400);

    const found = await page.evaluate(() => {
      const channel = (v) => {
        const s = v / 255;
        return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
      };
      const relLum = ([r, g, b]) =>
        0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
      const rgb = (value) => {
        const m = value.match(/\d+(\.\d+)?/g);
        if (!m) return null;
        const alpha = m[3] !== undefined ? Number(m[3]) : 1;
        if (alpha < 0.85) return null;
        return [Number(m[0]), Number(m[1]), Number(m[2])];
      };

      /**
       * Nearest ancestor with an opaque background, or null when a gradient
       * is in the way - a gradient reports backgroundColor as transparent, so
       * walking past it would compare the text against some paler ancestor
       * and invent a contrast failure that isn't there.
       */
      const backdrop = (el) => {
        let node = el;
        while (node && node !== document.documentElement) {
          const style = getComputedStyle(node);
          if (style.backgroundImage && style.backgroundImage !== 'none') return null;
          const c = rgb(style.backgroundColor);
          if (c) return c;
          node = node.parentElement;
        }
        return [17, 24, 39]; // page background in dark mode
      };

      const problems = [];
      for (const el of document.querySelectorAll('main p, main h1, main h2, main h3, main span, main div')) {
        const text = [...el.childNodes]
          .filter((n) => n.nodeType === 3 && n.textContent.trim())
          .map((n) => n.textContent.trim())
          .join(' ');
        if (!text || text.length > 120) continue;
        // Emoji paint their own colours, so the CSS `color` says nothing
        // about whether they're readable. Only judge real words.
        if (!/[\p{Letter}\p{Number}]/u.test(text)) continue;
        // Disabled things are muted on purpose (past dates on the calendar),
        // and WCAG exempts them.
        if (el.closest('[disabled], [aria-disabled="true"], .cursor-not-allowed')) continue;

        const style = getComputedStyle(el);
        const fg = rgb(style.color);
        if (!fg) continue;

        const bg = backdrop(el);
        if (!bg) continue; // sitting on a gradient - can't judge from CSS alone

        // Saturated brand fills (the yellow primary) are a separate,
        // pre-existing contrast question that applies in light mode too.
        // This check is scoped to what dark mode broke: light text left on a
        // near-grey surface that never got a dark counterpart.
        const spread = Math.max(...bg) - Math.min(...bg);
        if (spread > 40) continue;

        const l1 = relLum(fg);
        const l2 = relLum(bg);
        const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

        if (ratio < 2) problems.push(`"${text.slice(0, 30)}" ${ratio.toFixed(1)}:1`);
      }
      return [...new Set(problems)].slice(0, 3);
    });

    if (found.length) lowContrast.push(`${route}: ${found.join(' | ')}`);
  }

  await run.step('no unreadable text in dark mode', () =>
    assert(lowContrast.length === 0, lowContrast.join('  //  '))
  );

  await context.close();
  await browser.close();
  return run;
}
