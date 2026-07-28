import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { usePlayerStore } from './usePlayerStore';
import { inventoryKey } from '../data/shop';
import catalogue from '../data/experiences';

const player = () => usePlayerStore.getState();

/** Sign in fresh and clear any persisted progress from a previous test. */
const signInFresh = (over = {}) => {
  usePlayerStore.getState().signOut();
  usePlayerStore.getState().signIn({
    id: 'test-player',
    name: 'Ada',
    email: 'ada@example.com',
    role: 'student',
    ...over,
  });
};

const experience = (over = {}) => ({
  id: 'exp1',
  cityId: 'paris',
  language: 'fr',
  date: new Date(Date.now() + 86400000).toISOString(),
  price: 20,
  type: 'cafe',
  ...over,
});

beforeEach(() => {
  localStorage.clear();
  signInFresh();
});

describe('sign in / out', () => {
  it('starts a new player at zero', () => {
    expect(player().points).toBe(0);
    expect(player().bookings).toEqual([]);
    expect(player().onboardingComplete).toBe(false);
  });

  it('keeps progress when the same player signs back in', () => {
    player().earnPoints(150);
    usePlayerStore.getState().signIn({ id: 'test-player', name: 'Ada Renamed' });

    expect(player().points).toBe(150);
    expect(player().user.name).toBe('Ada Renamed');
  });

  it('resets progress when a different player signs in', () => {
    player().earnPoints(150);
    usePlayerStore.getState().signIn({ id: 'someone-else', name: 'Yuki', role: 'teacher' });

    expect(player().points).toBe(0);
  });

  it('clears everything on sign out', () => {
    player().earnPoints(150);
    player().signOut();

    expect(player().user).toBeNull();
    expect(player().points).toBe(0);
  });
});

describe('onboarding', () => {
  it('grants the welcome bonus and records what was chosen', () => {
    player().completeOnboarding({
      name: 'Ada',
      languages: ['fr', 'ja'],
      interests: ['coffee'],
      goal: 'regular',
      welcomeBonus: 100,
    });

    expect(player().points).toBe(100);
    expect(player().onboardingComplete).toBe(true);
    expect(player().languages).toEqual(['fr', 'ja']);
  });
});

describe('earning points', () => {
  it('adds points and reports a level up', () => {
    const result = player().earnPoints(120);

    expect(player().points).toBe(120);
    expect(result.pointsGained).toBe(120);
    expect(result.leveledUp).toBe(true); // crosses the 100 threshold
  });

  it('does not report a level up when staying inside a level', () => {
    player().earnPoints(10);
    expect(player().earnPoints(10).leveledUp).toBe(false);
  });

  it('unlocks legend at 2000 points and pays its bonus on top', () => {
    const result = player().earnPoints(2000);

    expect(result.badgesUnlocked).toContain('legend');
    // 2000 earned + the 500 the legend badge itself awards
    expect(player().points).toBe(2500);
  });

  it('counts games played', () => {
    player().earnPoints(10, { games: 1 });
    expect(player().stats.gamesPlayed).toBe(1);
  });
});

describe('spending points', () => {
  it('refuses to spend more than the player has', () => {
    player().earnPoints(50);

    expect(player().spendPoints(80)).toBe(false);
    expect(player().points).toBe(50); // unchanged
  });

  it('deducts when affordable', () => {
    player().earnPoints(100);

    expect(player().spendPoints(80)).toBe(true);
    expect(player().points).toBe(20);
    expect(player().totalSpent).toBe(80);
  });
});

describe('shop inventory', () => {
  it('namespaces inventory keys so identically named items stay distinct', () => {
    // "star" exists as both a pair of glasses and an accessory. Buying one
    // must not unlock the other.
    player().earnPoints(1000);
    player().buyItem({ id: inventoryKey('glasses', 'star'), cost: 150 });

    expect(player().owns('glasses:star')).toBe(true);
    expect(player().owns('accessories:star')).toBe(false);
  });

  it('will not buy the same item twice', () => {
    player().earnPoints(1000);
    const item = { id: inventoryKey('hats', 'party'), cost: 100 };

    expect(player().buyItem(item)).toBe(true);
    expect(player().buyItem(item)).toBe(false);
    expect(player().points).toBe(900); // charged once
  });

  it('will not buy what the player cannot afford', () => {
    player().earnPoints(50);
    expect(player().buyItem({ id: 'hats:crown', cost: 200 })).toBe(false);
    expect(player().inventory).toEqual([]);
  });

  it('equips and clears a slot', () => {
    player().equipItem('hat', 'party');
    expect(player().equipped.hat).toBe('party');

    player().equipItem('hat', null);
    expect(player().equipped.hat).toBeNull();
  });

  it('awards big-spender once 1000 points have been spent', () => {
    player().earnPoints(2000);
    player().spendPoints(1000);
    expect(player().badges).toContain('big-spender');
  });
});

describe('booking', () => {
  it('earns points from the price and unlocks first-booking', () => {
    const result = player().bookExperience({ experience: experience({ price: 20 }) });

    expect(player().bookings).toHaveLength(1);
    expect(result.badgesUnlocked).toContain('first-booking');
    // 20 from the price + 50 the first-booking badge awards
    expect(player().points).toBe(70);
  });

  it('refuses to book the same experience twice', () => {
    player().bookExperience({ experience: experience() });
    const second = player().bookExperience({ experience: experience() });

    expect(second).toBeNull();
    expect(player().bookings).toHaveLength(1);
  });

  it('counts distinct cities and languages, not raw bookings', () => {
    player().bookExperience({ experience: experience({ id: 'a', cityId: 'paris', language: 'fr' }) });
    player().bookExperience({ experience: experience({ id: 'b', cityId: 'paris', language: 'fr' }) });

    expect(player().stats.experiencesBooked).toBe(2);
    expect(player().stats.citiesVisited).toBe(1);
    expect(player().stats.languagesStudied).toBe(1);
  });

  it('unlocks polyglot after three languages', () => {
    ['fr', 'ja', 'es'].forEach((language, i) =>
      player().bookExperience({ experience: experience({ id: `x${i}`, language }) })
    );

    expect(player().badges).toContain('polyglot');
  });

  it('unlocks globe-trotter after five cities', () => {
    ['paris', 'tokyo', 'seoul', 'lisbon', 'berlin'].forEach((cityId, i) =>
      player().bookExperience({ experience: experience({ id: `c${i}`, cityId }) })
    );

    expect(player().badges).toContain('globe-trotter');
  });

  it('unlocks couple-goals after three couple bookings', () => {
    [0, 1, 2].forEach((i) =>
      player().bookExperience({ experience: experience({ id: `p${i}` }), couple: true })
    );

    expect(player().badges).toContain('couple-goals');
  });

  it('unlocks culture-vulture once every bookable type has been tried', () => {
    // The badge shipped with no unlock rule at all. Booking one of each type
    // in the catalogue must now earn it.
    const types = [...new Set(catalogue.map((exp) => exp.type).filter(Boolean))];

    types.forEach((type, i) =>
      player().bookExperience({ experience: experience({ id: `t${i}`, type }) })
    );

    expect(player().badges).toContain('culture-vulture');
  });

  it('reports whether an experience is already booked', () => {
    expect(player().hasBooked('exp1')).toBe(false);
    player().bookExperience({ experience: experience() });
    expect(player().hasBooked('exp1')).toBe(true);
  });
});

describe('streaks', () => {
  afterEach(() => vi.useRealTimers());

  it('starts a streak on the first check in', () => {
    player().checkIn();
    expect(player().streak).toBe(1);
  });

  it('is idempotent within the same day', () => {
    player().checkIn();
    player().checkIn();
    expect(player().streak).toBe(1);
  });

  it('extends across consecutive days', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-01T09:00:00'));
    player().checkIn();

    vi.setSystemTime(new Date('2026-03-02T09:00:00'));
    player().checkIn();

    expect(player().streak).toBe(2);
  });

  it('resets after a missed day and keeps the best streak', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-01T09:00:00'));
    player().checkIn();
    vi.setSystemTime(new Date('2026-03-02T09:00:00'));
    player().checkIn();

    vi.setSystemTime(new Date('2026-03-05T09:00:00')); // skipped days
    player().checkIn();

    expect(player().streak).toBe(1);
    expect(player().bestStreak).toBe(2);
  });

  it('unlocks week-streak on the seventh consecutive day', () => {
    vi.useFakeTimers();
    for (let day = 1; day <= 7; day++) {
      vi.setSystemTime(new Date(`2026-03-${String(day).padStart(2, '0')}T09:00:00`));
      player().checkIn();
    }

    expect(player().streak).toBe(7);
    expect(player().badges).toContain('week-streak');
  });

  it('does nothing when nobody is signed in', () => {
    player().signOut();
    expect(player().checkIn()).toEqual({ changed: false });
  });
});

describe('daily quests', () => {
  it('pays out once and refuses a repeat', () => {
    player().checkIn();
    const quest = player().todaysQuests()[0];

    const first = player().completeQuest(quest.id);
    expect(first.pointsGained).toBe(quest.reward);
    expect(player().completeQuest(quest.id)).toBeNull();
  });

  it('serves a stable set of quests for a given day', () => {
    player().checkIn();
    expect(player().todaysQuests()).toEqual(player().todaysQuests());
  });
});

describe('teacher listings', () => {
  it('normalises the create form into the catalogue shape', () => {
    signInFresh({ id: 'teacher-1', name: 'Yuki', role: 'teacher' });

    const created = player().createExperience({
      title: 'Ramen & Conversation',
      city: 'tokyo',
      location: 'Shinjuku', // the form gives a plain string
      price: '28', // and strings for numbers
      duration: '2',
      maxCapacity: '6',
      date: '2026-09-01',
      time: '18:00',
      status: 'published',
    });

    // Explore reads location.venue and cityId - a raw form record would crash it.
    expect(created.location).toEqual({ venue: 'Shinjuku', address: 'Shinjuku' });
    expect(created.cityId).toBe('tokyo');
    expect(created.price).toBe(28);
    expect(created.maxCapacity).toBe(6);
    expect(created.teacherName).toBe('Yuki');
  });

  it('updates and deletes listings', () => {
    signInFresh({ id: 'teacher-1', role: 'teacher' });
    const created = player().createExperience({ title: 'Draft', status: 'draft' });

    player().updateExperience(created.id, { status: 'published' });
    expect(player().createdExperiences[0].status).toBe('published');

    player().deleteExperience(created.id);
    expect(player().createdExperiences).toHaveLength(0);
  });
});
