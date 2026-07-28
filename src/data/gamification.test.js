import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { BADGES, DAILY_QUESTS, getBadge, QUESTS_PER_DAY } from './gamification';

const here = dirname(fileURLToPath(import.meta.url));
const readSrc = (relative) => readFileSync(join(here, '..', relative), 'utf8');

describe('badge catalogue', () => {
  it('has unique ids', () => {
    const ids = BADGES.map((badge) => badge.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('gives every badge the fields the UI renders', () => {
    for (const badge of BADGES) {
      expect(badge, badge.id).toMatchObject({
        id: expect.any(String),
        name: expect.any(String),
        description: expect.any(String),
        requirement: expect.any(String),
        icon: expect.any(String),
        category: expect.stringMatching(/^(journey|habit|social)$/),
        points: expect.any(Number),
      });
    }
  });

  it('looks badges up by id', () => {
    expect(getBadge('first-booking')?.name).toBe('First Steps');
    expect(getBadge('nope')).toBeUndefined();
  });
});

/**
 * The regression guard.
 *
 * `culture-vulture` shipped with no unlock rule at all, so it could never be
 * earned - nothing in the UI made that visible. Every badge must be reachable
 * either from an AUTO_BADGES rule or an explicit awardBadge() call site.
 */
describe('badge reachability', () => {
  const store = readSrc('store/usePlayerStore.js');

  const autoRuleIds = (() => {
    const block = store.match(/const AUTO_BADGES = \[([\s\S]*?)\n\];/);
    return new Set([...(block?.[1] ?? '').matchAll(/id: '([a-z-]+)'/g)].map((m) => m[1]));
  })();

  const explicitlyAwarded = (() => {
    // awardBadge('x') called anywhere in the app, including pages.
    const sources = [
      store,
      readSrc('pages/GamesPage.jsx'),
      readSrc('pages/ChatPage.jsx'),
      readSrc('pages/ExperienceDetailPage.jsx'),
      readSrc('pages/StudentDashboard.jsx'),
    ].join('\n');
    return new Set([...sources.matchAll(/awardBadge\('([a-z-]+)'\)/g)].map((m) => m[1]));
  })();

  it.each(BADGES.map((badge) => [badge.id]))(
    '%s can actually be earned',
    (badgeId) => {
      const reachable = autoRuleIds.has(badgeId) || explicitlyAwarded.has(badgeId);
      expect(
        reachable,
        `"${badgeId}" has no AUTO_BADGES rule and no awardBadge('${badgeId}') call site, ` +
          `so a player can never earn it`
      ).toBe(true);
    }
  );

  it('has no unlock rules pointing at badges that do not exist', () => {
    for (const id of autoRuleIds) {
      expect(getBadge(id), `AUTO_BADGES references unknown badge "${id}"`).toBeDefined();
    }
  });
});

describe('daily quests', () => {
  it('has unique ids and positive rewards', () => {
    const ids = DAILY_QUESTS.map((quest) => quest.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const quest of DAILY_QUESTS) {
      expect(quest.reward, quest.id).toBeGreaterThan(0);
    }
  });

  it('has at least as many quests as it shows per day', () => {
    expect(DAILY_QUESTS.length).toBeGreaterThanOrEqual(QUESTS_PER_DAY);
  });
});
