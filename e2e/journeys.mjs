import { BASE, launch, seedPlayer, signIn, readStore, createRun, assert } from './harness.mjs';

/**
 * The two journeys that carry the product: a student going from role choice
 * through onboarding to booking and spending, and a teacher going from
 * dashboard to a published listing that reaches the marketplace.
 */
export default async function journeys() {
  const browser = await launch();
  const run = createRun('journeys');

  // ------------------------------------------------ student: the full funnel
  {
    run.heading('student: choose role -> onboarding -> dashboard -> shop');
    const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = run.watch(await context.newPage());

    await run.step('role picker loads', async () => {
      await page.goto(`${BASE}/choose-role`, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(800);
    });

    await run.step('picking student routes into onboarding, not straight to explore', async () => {
      await page.getByText(/I'm a Student|Je suis Étudiant|Soy Estudiante/i).first().click();
      await page.waitForTimeout(1200);
      assert(
        page.url().includes('/onboarding/student'),
        `expected /onboarding/student, landed on ${page.url()}`
      );
    });

    await run.step('name step', async () => {
      await page.locator('input[placeholder="What\'s your name?"]').fill('Ada');
      await page.getByRole('button', { name: /continue/i }).first().click();
      await page.waitForTimeout(700);
    });

    await run.step('language + interest swipes', async () => {
      await page.getByRole('button', { name: 'Add this language' }).click();
      await page.waitForTimeout(600);
      await page.getByRole('button', { name: /skip remaining/i }).click();
      await page.waitForTimeout(700);
      await page.getByRole('button', { name: 'Add this interest' }).click();
      await page.waitForTimeout(600);
      await page.getByRole('button', { name: /skip remaining/i }).click();
      await page.waitForTimeout(700);
    });

    await run.step('avatar + goal steps', async () => {
      for (let i = 0; i < 2; i++) {
        await page.getByRole('button', { name: /continue/i }).first().click();
        await page.waitForTimeout(700);
      }
    });

    await run.step('finishing onboarding lands on the dashboard', async () => {
      await page.getByRole('button', { name: /start learning/i }).first().click();
      await page.waitForTimeout(1800);
      assert(
        page.url().includes('/student-dashboard'),
        `expected /student-dashboard, landed on ${page.url()}`
      );
    });

    await run.step('welcome bonus is 100 points and the header agrees', async () => {
      const state = await readStore(page);
      assert(state.points === 100, `expected 100 points, store has ${state.points}`);
      const header = await page.locator('header').innerText();
      assert(header.includes('100'), `header reads: ${header.replace(/\n/g, ' | ')}`);
      run.note(`points after onboarding: ${state.points}`);
    });

    await run.step('buying in the shop deducts points and equips the item', async () => {
      await page.goto(`${BASE}/shop`, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1300);

      const card = page.locator('.grid > div').filter({ hasText: 'Party Hat' }).first();
      await card.getByRole('button', { name: 'Buy' }).click();
      await page.waitForTimeout(1000);

      const state = await readStore(page);
      assert(state.points === 0, `expected 0 points after a 100-point buy, got ${state.points}`);
      assert(
        state.inventory.includes('hats:party'),
        `inventory is ${JSON.stringify(state.inventory)}`
      );
      assert(state.equipped.hat === 'party', `equipped is ${JSON.stringify(state.equipped)}`);
      run.note(`inventory: ${JSON.stringify(state.inventory)}`);
    });

    await context.close();
  }

  // -------------------------------------------------------- student: booking
  {
    run.heading('student: browse -> book -> points, badge, profile');
    const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = run.watch(await context.newPage());
    await signIn(page);

    await run.step('booking an experience earns points and the first-booking badge', async () => {
      await page.goto(`${BASE}/experience/exp1`, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1500);
      await page.getByRole('button', { name: /^Book Now$/ }).click();
      await page.waitForTimeout(1200);

      const dialog = await page.locator('[role="dialog"]').innerText();
      assert(/booked/i.test(dialog), `dialog says: ${dialog.replace(/\n/g, ' | ').slice(0, 120)}`);

      const state = await readStore(page);
      assert(state.bookings.length === 1, `bookings: ${JSON.stringify(state.bookings)}`);
      assert(state.points > 500, `points did not increase: ${state.points}`);
      assert(
        state.badges.includes('first-booking'),
        `badges: ${JSON.stringify(state.badges)}`
      );
      run.note(`points 500 -> ${state.points}, badges: ${JSON.stringify(state.badges)}`);
    });

    await run.step('the same experience cannot be booked twice', async () => {
      await page.mouse.click(10, 10);
      await page.waitForTimeout(600);
      const label = await page
        .getByRole('button', { name: /Booked|Book Now/ })
        .first()
        .innerText();
      assert(/Booked/i.test(label), `button reads "${label}"`);
    });

    await run.step('the profile shows the booking under the real player, with matching points', async () => {
      await page.goto(`${BASE}/profile`, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1500);
      const body = await page.locator('main').innerText();
      const state = await readStore(page);

      assert(body.includes('Ada'), 'profile does not show the player name');
      assert(
        body.includes(String(state.points)),
        `profile points differ from the store (${state.points})`
      );
      assert(
        !(/No upcoming experiences/i.test(body) && /No past experiences/i.test(body)),
        'profile shows no bookings at all'
      );
    });

    await run.step('the leaderboard ranks the real player', async () => {
      await page.goto(`${BASE}/leaderboard`, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1500);
      const body = await page.locator('main').innerText();
      assert(body.includes('Ada'), 'leaderboard does not include the player');
    });

    await context.close();
  }

  // ------------------------------------------------------------- teacher
  {
    run.heading('teacher: dashboard identity -> publish -> reaches Explore');
    const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = run.watch(await context.newPage());

    await signIn(
      page,
      seedPlayer({
        user: {
          id: 'teacher-1',
          name: 'Yuki',
          email: 'yuki@example.com',
          role: 'teacher',
          isTeacher: true,
        },
        languages: ['ja'],
        interests: ['cooking'],
      })
    );

    await run.step('the dashboard shows the signed-in teacher, not a seed teacher', async () => {
      await page.goto(`${BASE}/teacher/dashboard`, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1800);
      const body = await page.locator('main').innerText();
      assert(body.includes('Yuki'), 'dashboard does not name the signed-in teacher');
      assert(!body.includes('Sophie'), 'dashboard still shows the seed teacher');
    });

    await run.step('a published listing reaches Explore and is searchable', async () => {
      await page.evaluate(() => {
        const raw = JSON.parse(localStorage.getItem('conversa-player'));
        raw.state.createdExperiences = [
          {
            id: 'own-e2e-1',
            title: 'Ramen & Conversation in Shinjuku',
            description: 'Slurp noodles and practise everyday Japanese.',
            language: 'ja',
            cityId: 'tokyo',
            skillLevel: 'beginner',
            type: 'conversation',
            date: new Date(Date.now() + 7 * 86400000).toISOString(),
            duration: 2,
            price: 28,
            maxCapacity: 6,
            bookedSpots: 0,
            location: { venue: 'Shinjuku', address: 'Shinjuku, Tokyo' },
            image: '',
            tags: [],
            featured: false,
            teacherId: 'teacher-1',
            teacherName: 'Yuki',
            teacherPhoto: null,
            teacherRating: null,
            status: 'published',
            createdAt: new Date().toISOString(),
          },
        ];
        localStorage.setItem('conversa-player', JSON.stringify(raw));
      });

      await page.goto(`${BASE}/explore`, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1800);
      assert(
        (await page.locator('main').innerText()).includes('Ramen & Conversation'),
        'published listing missing from Explore'
      );

      // Guards the normalisation: a raw form record keeps `location` as a
      // string and would crash this filter.
      await page.getByPlaceholder(/search/i).first().fill('Ramen');
      await page.waitForTimeout(1200);
      assert(
        (await page.locator('main').innerText()).includes('Ramen & Conversation'),
        'search did not find the published listing'
      );
    });

    await context.close();
  }

  await browser.close();
  return run;
}
