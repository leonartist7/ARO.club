import { BASE, launch, navigate, createRun, assert } from './harness.mjs';

const selectEnglishScenario = async (page) => {
  await page.locator('input[value="conversational-spanish"]').evaluate((input) => input.click());
  await page.locator('input[value="cooking-stories"]').evaluate((input) => input.click());
  await page.locator('input[value="kitchen-saturday"]').evaluate((input) => input.click());
};

export default async function ux0() {
  const browser = await launch();
  const run = createRun('ux0 opportunity formation');
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = run.watch(await context.newPage());
  const supabaseRequests = [];

  page.on('request', (request) => {
    const hostname = new URL(request.url()).hostname;
    if (hostname.includes('supabase')) supabaseRequests.push(request.url());
  });

  run.heading('deterministic formation');

  await run.step('intro is visibly synthetic and exposes all three anchors', async () => {
    await navigate(page, BASE, { waitUntil: 'domcontentloaded' });
    await page.getByTestId('opportunity-formation').waitFor();
    const body = await page.locator('body').innerText();
    assert(/prototype possibility · local only/i.test(body), 'missing local prototype boundary');
    assert(/what you want/i.test(body), 'missing want anchor');
    assert(/what you can bring/i.test(body), 'missing bring anchor');
    assert(/people · place · time/i.test(body), 'missing context anchor');
    assert(await page.getByRole('heading', { level: 2, name: 'Form an opportunity' }).count(), 'formation h2 is missing');
    assert(/field is empty/i.test(await page.locator('#formation-field-caption').innerText()), 'empty-field semantic state is missing');
  });

  await run.step('third signal begins visible response within 100 ms', async () => {
    await page.locator('input[value="conversational-spanish"]').check({ force: true });
    assert(/one selected signal/i.test(await page.locator('#formation-field-caption').innerText()), 'one-signal semantic state is missing');
    await page.locator('input[value="cooking-stories"]').check({ force: true });
    assert(/two selected signals/i.test(await page.locator('#formation-field-caption').innerText()), 'two-signal semantic state is missing');

    const responseMs = await page.evaluate(() => new Promise((resolve, reject) => {
      const status = document.querySelector('[data-testid="formation-status"]');
      const input = document.querySelector('input[value="kitchen-saturday"]');
      if (!status || !input) reject(new Error('missing formation controls'));
      const started = performance.now();
      const observer = new MutationObserver(() => {
        if (/Ready|Forming/.test(status.textContent)) {
          observer.disconnect();
          resolve(performance.now() - started);
        }
      });
      observer.observe(status, { childList: true, subtree: true, characterData: true });
      input.click();
    }));

    assert(responseMs < 100, `formation response began after ${responseMs.toFixed(1)} ms`);
  });

  await run.step('locked example forms with exact title, logistics and rationale', async () => {
    await page.getByTestId('formed-result').waitFor();
    const result = await page.getByTestId('formed-result').innerText();
    assert(/prototype possibility — not a live match/i.test(result), 'missing non-live label');
    assert(result.includes('Spanish through shared stories'), 'wrong title');
    assert(result.includes('6 neighbours'), 'wrong people fixture');
    assert(result.includes('Community kitchen'), 'wrong place fixture');
    assert(result.includes('Saturday, 11:00'), 'wrong time fixture');
    assert(result.includes('You want relaxed Spanish conversation rather than a formal lesson.'), 'missing need clause');
    assert(result.includes('You can bring a recipe and the story behind it.'), 'missing contribution clause');
    assert(result.includes('A shared table gives the group a natural activity and meeting point.'), 'missing fit clause');
    assert((await page.getByTestId('formation-announcement').innerText()).includes('Prototype possibility formed'), 'live region was not updated');
    assert(/three selected signals/i.test(await page.locator('#formation-field-caption').innerText()), 'formed semantic state is missing');
    const rationaleContrast = await page.evaluate(() => {
      const parse = (value) => value.match(/[\d.]+/g).slice(0, 3).map(Number);
      const luminance = (value) => {
        const channels = parse(value).map((channel) => {
          const normalized = channel / 255;
          return normalized <= 0.03928 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
        });
        return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
      };
      const foreground = getComputedStyle(document.querySelector('[data-testid="formation-rationale-explanation"]')).color;
      const background = getComputedStyle(document.querySelector('[data-testid="formation-rationale-intro"]')).backgroundColor;
      const light = Math.max(luminance(foreground), luminance(background));
      const dark = Math.min(luminance(foreground), luminance(background));
      return (light + 0.05) / (dark + 0.05);
    });
    assert(rationaleContrast >= 4.5, `rationale contrast is ${rationaleContrast.toFixed(2)}:1`);
  });

  await run.step('editing recomputes immediately and clearing returns to partial', async () => {
    await page.getByRole('button', { name: 'Edit signals' }).click();
    await page.waitForFunction(() => document.activeElement?.value === 'conversational-spanish');
    assert(/editing/i.test(await page.getByTestId('formation-status').innerText()), 'editing state missing');
    await page.locator('input[value="patient-practice"]').check({ force: true });
    await page.getByText('You can bring patient, encouraging practice.', { exact: true }).waitFor();
    await page.getByRole('button', { name: 'Clear People · place · time' }).click();
    assert(!(await page.getByTestId('formed-result').count()), 'stale formed result remained');
    assert(/signals forming/i.test(await page.getByTestId('formation-status').innerText()), 'partial state missing');
    assert(
      /Choose this anchor again: People · place · time\./i.test(await page.getByRole('alert').innerText()),
      'bounded missing-signal fallback was not explained'
    );
    assert(await page.locator('input[value="conversational-spanish"]').isChecked(), 'want selection was lost');
    assert(await page.locator('input[value="patient-practice"]').isChecked(), 'bring selection was lost');
  });

  await run.step('reset removes only ephemeral formation state', async () => {
    await page.locator('input[value="kitchen-saturday"]').check({ force: true });
    await page.getByTestId('formed-result').waitFor();
    await page.getByRole('button', { name: 'Reset field' }).click();
    await page.waitForFunction(() => document.activeElement?.value === 'conversational-spanish');
    assert(!(await page.getByTestId('formed-result').count()), 'formed result survived reset');
    assert(/field open/i.test(await page.getByTestId('formation-status').innerText()), 'intro state was not restored');
    assert((await page.locator('input[name^="formation-"]:checked').count()) === 0, 'selected fixture survived reset');
  });

  run.heading('locales, accessibility and provider boundary');

  await run.step('French and Spanish render translated controls and provenance', async () => {
    const localeChecks = [
      ['fr', 'Possibilité prototype · Locale uniquement', 'Pratiquer l’espagnol à l’oral'],
      ['es', 'Posibilidad prototipo · Solo local', 'Practicar español conversacional'],
    ];

    for (const [locale, badge, option] of localeChecks) {
      await page.evaluate((value) => localStorage.setItem('conversa-language', value), locale);
      await page.reload({ waitUntil: 'domcontentloaded' });
      await page.getByText(badge, { exact: true }).waitFor();
      assert(await page.getByText(option, { exact: true }).count(), `missing ${locale} fixture control`);
    }
  });

  await run.step('keyboard and reduced-motion paths retain the same formed result', async () => {
    await page.evaluate(() => localStorage.setItem('conversa-language', 'en'));
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.locator('input[value="conversational-spanish"]').focus();
    await page.keyboard.press('Space');
    await page.locator('input[value="cooking-stories"]').focus();
    await page.keyboard.press('Space');
    await page.locator('input[value="kitchen-saturday"]').focus();
    await page.keyboard.press('Space');
    await page.getByTestId('formed-result').waitFor();
    assert((await page.getByTestId('formed-result').innerText()).includes('Spanish through shared stories'), 'keyboard result differs');

    const reducedContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      reducedMotion: 'reduce',
    });
    const reducedPage = await reducedContext.newPage();
    await navigate(reducedPage, BASE, { waitUntil: 'domcontentloaded' });
    await selectEnglishScenario(reducedPage);
    await reducedPage.getByTestId('formed-result').waitFor();
    const duration = await reducedPage.locator('.aro-aperture').evaluate((element) => getComputedStyle(element).transitionDuration);
    assert(Number.parseFloat(duration) < 0.001, `reduced transition duration is ${duration}`);
    assert((await reducedPage.getByTestId('formed-result').innerText()).includes('Spanish through shared stories'), 'reduced-motion result differs');
    await reducedContext.close();
  });

  await run.step('required responsive matrix forms without overflow or clipped field labels', async () => {
    const viewports = [
      { width: 360, height: 800 },
      { width: 390, height: 844 },
      { width: 430, height: 932 },
      { width: 768, height: 1024 },
      { width: 1440, height: 1000 },
    ];

    for (const colorScheme of ['light', 'dark']) {
      for (const viewport of viewports) {
        const matrixContext = await browser.newContext({ viewport, colorScheme });
        const matrixPage = await matrixContext.newPage();
        await navigate(matrixPage, BASE, { waitUntil: 'domcontentloaded' });
        await selectEnglishScenario(matrixPage);
        await matrixPage.getByTestId('formed-result').waitFor();

        const layout = await matrixPage.evaluate(() => {
          const field = document.querySelector('[data-testid="formation-field"]').getBoundingClientRect();
          const anchors = ['want', 'bring', 'context'].map((anchor) => {
            const rect = document.querySelector(`[data-testid="field-anchor-${anchor}"]`).getBoundingClientRect();
            return rect.left >= field.left - 1 && rect.right <= field.right + 1 && rect.top >= field.top - 1 && rect.bottom <= field.bottom + 1;
          });
          const targets = [...document.querySelectorAll('[data-testid="opportunity-formation"] label, [data-testid="opportunity-formation"] button')]
            .filter((element) => getComputedStyle(element).visibility !== 'hidden')
            .map((element) => {
              const rect = element.getBoundingClientRect();
              return rect.width >= 44 && rect.height >= 44;
            });
          return {
            overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
            anchors,
            targets,
            isDark: document.documentElement.classList.contains('dark'),
          };
        });

        assert(layout.overflow <= 1, `${viewport.width}px ${colorScheme} overflowed by ${layout.overflow}px`);
        assert(layout.anchors.every(Boolean), `${viewport.width}px ${colorScheme} clipped a field anchor`);
        assert(layout.targets.every(Boolean), `${viewport.width}px ${colorScheme} has a target below 44px`);
        assert(layout.isDark === (colorScheme === 'dark'), `${viewport.width}px ${colorScheme} theme mismatch`);
        await matrixContext.close();
      }
    }
  });

  await run.step('UX0 and account routes issue zero requests to Supabase domains', async () => {
    for (const route of ['/', '/login', '/signup', '/forgot-password', '/auth/callback']) {
      await navigate(page, BASE + route, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(300);
    }
    const callbackBoundary = page.getByRole('heading', {
      name: 'Account callbacks are unavailable in this prototype.',
    });
    await callbackBoundary.waitFor();
    assert(await callbackBoundary.count(), 'callback route does not explain the prototype account boundary');
    await page.waitForTimeout(2100);
    assert(new URL(page.url()).pathname === '/auth/callback', 'prototype callback route simulated a completed sign-in');
    assert(supabaseRequests.length === 0, supabaseRequests.join(', '));
  });

  await context.close();
  await browser.close();
  return run;
}
