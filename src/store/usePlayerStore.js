import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  getLevelFromPoints,
  getProgressToNextLevel,
  calculatePointsEarned,
} from '../utils/helpers';
import {
  BADGES,
  DAILY_QUESTS,
  QUESTS_PER_DAY,
  BOOKABLE_TYPE_COUNT,
} from '../data/gamification';

/**
 * The single source of truth for the signed-in player.
 *
 * Everything that makes the app feel like a game - points, streak, badges,
 * inventory, the character you equip - lives here. Games award points, the
 * shop spends them, the character builder equips what you bought and the
 * dashboard reads the result. One store means those four screens can never
 * disagree with each other again.
 *
 * State is persisted to localStorage so the whole loop is testable end to end
 * without a backend. When Supabase lands it hydrates this store instead of
 * introducing a second parallel copy of the player.
 */

/** Local calendar day as YYYY-MM-DD (not UTC - streaks follow the user's day). */
const dayKey = (date = new Date()) => {
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 10);
};

/** How many days apart two day-keys are. */
const daysBetween = (from, to) =>
  Math.round((new Date(to) - new Date(from)) / 86400000);

/** Pick today's quests - stable for a given day so they don't shuffle on refresh. */
const questsForDay = (key) => {
  const seed = key.split('-').reduce((acc, part) => acc + Number(part), 0);
  return Array.from({ length: QUESTS_PER_DAY }, (_, i) =>
    DAILY_QUESTS[(seed + i) % DAILY_QUESTS.length]
  );
};

const emptyPlayer = {
  user: null,
  onboardingComplete: false,

  // Progression
  points: 0,
  totalEarned: 0,
  totalSpent: 0,
  streak: 0,
  bestStreak: 0,
  lastCheckIn: null,

  // Collection
  badges: [],
  inventory: [],
  equipped: {
    character: 'owl',
    hat: null,
    glasses: null,
    accessory: null,
    background: null,
  },

  // Learning preferences captured during onboarding
  languages: [],
  interests: [],
  goal: null,

  // Marketplace
  bookings: [],

  // Teacher-authored experiences
  createdExperiences: [],

  // Daily loop
  completedQuests: [],
  questsDate: null,

  // Counters that unlock badges
  stats: {
    gamesPlayed: 0,
    experiencesBooked: 0,
    conversationsStarted: 0,
    reviewsWritten: 0,
    citiesVisited: 0,
    languagesStudied: 0,
  },
};

/**
 * Badges that unlock automatically from counters. Explicit one-offs
 * (perfect-score, night-owl, early-riser) are awarded by the screen that
 * detects them via `awardBadge`.
 */
const AUTO_BADGES = [
  { id: 'legend', earned: (s) => s.points >= 2000 },
  { id: 'week-streak', earned: (s) => s.streak >= 7 },
  { id: 'month-streak', earned: (s) => s.streak >= 30 },
  { id: 'big-spender', earned: (s) => s.totalSpent >= 1000 },
  { id: 'first-booking', earned: (s) => s.stats.experiencesBooked >= 1 },
  { id: 'globe-trotter', earned: (s) => s.stats.citiesVisited >= 5 },
  { id: 'polyglot', earned: (s) => s.stats.languagesStudied >= 3 },
  { id: 'social-butterfly', earned: (s) => s.stats.conversationsStarted >= 5 },
  { id: 'review-master', earned: (s) => s.stats.reviewsWritten >= 10 },
  {
    id: 'couple-goals',
    earned: (s) => s.bookings.filter((booking) => booking.couple).length >= 3,
  },
  {
    // Shipped with no rule at all, so it could never be earned.
    id: 'culture-vulture',
    earned: (s) =>
      new Set(s.bookings.map((booking) => booking.type).filter(Boolean)).size >=
      BOOKABLE_TYPE_COUNT,
  },
];

/**
 * Returns the badge ids newly satisfied by `state`, plus the bonus points they
 * carry. Kept pure so it can run inside a `set` without surprises.
 */
const settleBadges = (state) => {
  const unlocked = AUTO_BADGES.filter(
    (badge) => !state.badges.includes(badge.id) && badge.earned(state)
  ).map((badge) => badge.id);

  const bonus = unlocked.reduce(
    (sum, id) => sum + (BADGES.find((b) => b.id === id)?.points ?? 0),
    0
  );

  return { unlocked, bonus };
};

export const usePlayerStore = create(
  persist(
    (set, get) => ({
      ...emptyPlayer,

      // ---------------------------------------------------------------- auth

      /**
       * Start a session. Existing progress is kept when the same player signs
       * back in, so refreshing mid-test doesn't wipe the run.
       */
      signIn: (user) =>
        set((state) => {
          const sameUser = state.user?.id === user.id;
          return sameUser
            ? { user: { ...state.user, ...user } }
            : { ...emptyPlayer, user };
        }),

      signOut: () => set({ ...emptyPlayer }),

      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : state.user,
        })),

      /**
       * Finish onboarding with everything the flow collected. The welcome
       * bonus is what makes the first dashboard visit feel earned.
       */
      completeOnboarding: ({
        name,
        languages = [],
        interests = [],
        goal = null,
        avatar = null,
        bio = null,
        character,
        welcomeBonus = 100,
      } = {}) =>
        set((state) => ({
          user: state.user
            ? { ...state.user, ...(name && { name }), ...(avatar && { avatar }), ...(bio && { bio }) }
            : state.user,
          languages,
          interests,
          goal,
          equipped: character
            ? { ...state.equipped, character }
            : state.equipped,
          points: state.points + welcomeBonus,
          totalEarned: state.totalEarned + welcomeBonus,
          onboardingComplete: true,
        })),

      // --------------------------------------------------------- progression

      /**
       * Award points. Returns what changed so the caller can celebrate -
       * level ups and badge unlocks are the payoff moments.
       */
      earnPoints: (amount, { games = 0 } = {}) => {
        const before = get();
        const levelBefore = getLevelFromPoints(before.points).level;

        const next = {
          ...before,
          points: before.points + amount,
          totalEarned: before.totalEarned + amount,
          stats: { ...before.stats, gamesPlayed: before.stats.gamesPlayed + games },
        };

        const { unlocked, bonus } = settleBadges(next);

        set({
          points: next.points + bonus,
          totalEarned: next.totalEarned + bonus,
          stats: next.stats,
          badges: [...before.badges, ...unlocked],
        });

        const levelAfter = getLevelFromPoints(get().points).level;

        return {
          pointsGained: amount + bonus,
          badgesUnlocked: unlocked,
          leveledUp: levelAfter > levelBefore,
          level: levelAfter,
        };
      },

      /** Spend points. Returns false (and changes nothing) if they can't afford it. */
      spendPoints: (amount) => {
        const state = get();
        if (state.points < amount) return false;

        const next = {
          ...state,
          points: state.points - amount,
          totalSpent: state.totalSpent + amount,
        };
        const { unlocked, bonus } = settleBadges(next);

        set({
          points: next.points + bonus,
          totalSpent: next.totalSpent,
          totalEarned: state.totalEarned + bonus,
          badges: [...state.badges, ...unlocked],
        });
        return true;
      },

      /** Award a badge that can't be derived from a counter. */
      awardBadge: (badgeId) => {
        const state = get();
        if (state.badges.includes(badgeId)) return false;

        const reward = BADGES.find((b) => b.id === badgeId)?.points ?? 0;
        set({
          badges: [...state.badges, badgeId],
          points: state.points + reward,
          totalEarned: state.totalEarned + reward,
        });
        return true;
      },

      /** Bump one of the counters that feed automatic badges. */
      recordActivity: (key, amount = 1) => {
        const state = get();
        if (!(key in state.stats)) return;

        const next = {
          ...state,
          stats: { ...state.stats, [key]: state.stats[key] + amount },
        };
        const { unlocked, bonus } = settleBadges(next);

        set({
          stats: next.stats,
          badges: [...state.badges, ...unlocked],
          points: state.points + bonus,
          totalEarned: state.totalEarned + bonus,
        });
      },

      // ----------------------------------------------------------- bookings

      /**
       * Book an experience.
       *
       * This is the seam between the marketplace and the game: a booking
       * earns points, fills in the profile, and can unlock the journey badges
       * (first booking, cities visited, languages studied, couple goals).
       */
      bookExperience: ({ experience, date = null, spots = 1, couple = false, pricePaid }) => {
        const state = get();
        if (!experience) return null;
        if (state.bookings.some((booking) => booking.experienceId === experience.id)) {
          return null; // already booked - don't double count
        }

        const paid = pricePaid ?? experience.price ?? 0;
        const booking = {
          experienceId: experience.id,
          cityId: experience.cityId,
          language: experience.language,
          type: experience.type,
          date: date ?? experience.date,
          spots,
          couple,
          pricePaid: paid,
          bookedAt: new Date().toISOString(),
        };

        const bookings = [...state.bookings, booking];
        const earned = calculatePointsEarned(paid);

        const next = {
          ...state,
          bookings,
          points: state.points + earned,
          totalEarned: state.totalEarned + earned,
          stats: {
            ...state.stats,
            experiencesBooked: bookings.length,
            citiesVisited: new Set(bookings.map((b) => b.cityId)).size,
            languagesStudied: new Set(bookings.map((b) => b.language)).size,
          },
        };

        const { unlocked, bonus } = settleBadges(next);

        set({
          bookings,
          points: next.points + bonus,
          totalEarned: next.totalEarned + bonus,
          stats: next.stats,
          badges: [...state.badges, ...unlocked],
        });

        return { pointsGained: earned + bonus, badgesUnlocked: unlocked, booking };
      },

      hasBooked: (experienceId) =>
        get().bookings.some((booking) => booking.experienceId === experienceId),

      // ------------------------------------------------------ teacher tools

      /**
       * Publish or draft an experience. Lives here (rather than in the
       * transient UI store it used to) so a teacher's listings survive a
       * refresh and can show up in Explore alongside the seed catalogue.
       */
      createExperience: (data) => {
        const user = get().user;

        // Normalise into the same shape as the seed catalogue. The create
        // form keeps `location` as a plain string and `city` rather than
        // `cityId`; Explore and ExperienceCard expect the richer shape, so
        // convert here rather than letting a half-formed record leak out.
        const when = data.time ? `${data.date}T${data.time}` : data.date;

        const experience = {
          ...data,
          id: `own-${Date.now()}`,
          cityId: data.cityId ?? data.city ?? '',
          date: when,
          price: Number(data.price) || 0,
          duration: Number(data.duration) || 1,
          maxCapacity: Number(data.maxCapacity) || 6,
          location:
            typeof data.location === 'string'
              ? { venue: data.location, address: data.location }
              : data.location ?? { venue: '', address: '' },
          image: data.image ?? '',
          tags: data.tags ?? [],
          featured: false,
          teacherId: user?.id ?? 'me',
          teacherName: user?.name ?? 'You',
          teacherPhoto: user?.photo ?? null,
          teacherRating: null,
          bookedSpots: 0,
          status: data.status ?? 'draft',
          createdAt: new Date().toISOString(),
        };

        set((state) => ({ createdExperiences: [...state.createdExperiences, experience] }));
        return experience;
      },

      updateExperience: (id, updates) =>
        set((state) => ({
          createdExperiences: state.createdExperiences.map((experience) =>
            experience.id === id ? { ...experience, ...updates } : experience
          ),
        })),

      deleteExperience: (id) =>
        set((state) => ({
          createdExperiences: state.createdExperiences.filter(
            (experience) => experience.id !== id
          ),
        })),

      // -------------------------------------------------------- daily streak

      /**
       * Call once when the app loads. Extends the streak on consecutive days,
       * resets it after a missed day, and rolls today's quests.
       */
      checkIn: () => {
        const state = get();
        if (!state.user) return { changed: false };

        const today = dayKey();
        const isNewDay = state.questsDate !== today;
        if (state.lastCheckIn === today && !isNewDay) return { changed: false };

        const gap = state.lastCheckIn ? daysBetween(state.lastCheckIn, today) : null;
        const streak = gap === 1 ? state.streak + 1 : gap === 0 ? state.streak : 1;

        const next = {
          ...state,
          streak,
          bestStreak: Math.max(state.bestStreak, streak),
          lastCheckIn: today,
        };
        const { unlocked, bonus } = settleBadges(next);

        set({
          streak: next.streak,
          bestStreak: next.bestStreak,
          lastCheckIn: today,
          questsDate: today,
          completedQuests: isNewDay ? [] : state.completedQuests,
          badges: [...state.badges, ...unlocked],
          points: state.points + bonus,
          totalEarned: state.totalEarned + bonus,
        });

        return { changed: true, streak, badgesUnlocked: unlocked };
      },

      /** Today's three quests. */
      todaysQuests: () => questsForDay(get().questsDate ?? dayKey()),

      /** Complete a quest and collect its reward. */
      completeQuest: (questId) => {
        const state = get();
        if (state.completedQuests.includes(questId)) return null;

        const quest = DAILY_QUESTS.find((q) => q.id === questId);
        if (!quest) return null;

        set({ completedQuests: [...state.completedQuests, questId] });
        return get().earnPoints(quest.reward);
      },

      // ------------------------------------------------------------ shopping

      /** Buy a shop item. Returns false when the player can't afford it. */
      buyItem: (item) => {
        const state = get();
        if (state.inventory.includes(item.id)) return false;
        if (!get().spendPoints(item.cost ?? item.price ?? 0)) return false;

        set({ inventory: [...get().inventory, item.id] });
        return true;
      },

      owns: (itemId) => get().inventory.includes(itemId),

      /** Equip something you own. Passing null clears the slot. */
      equipItem: (slot, itemId) =>
        set((state) => ({
          equipped: { ...state.equipped, [slot]: itemId },
        })),

      // ----------------------------------------------------------------- dev

      /** Wipe progress but stay signed in - handy while testing the loop. */
      resetProgress: () =>
        set((state) => ({ ...emptyPlayer, user: state.user, onboardingComplete: true })),
    }),
    {
      name: 'conversa-player',
      version: 1,
    }
  )
);

// ---------------------------------------------------------------- selectors
// Selectors return primitives so zustand's equality check stays cheap.
// Derived objects are built *after* the selector runs, never inside it.

export const useCurrentPlayer = () => usePlayerStore((s) => s.user);
export const useIsSignedIn = () => usePlayerStore((s) => s.user !== null);
export const useIsTeacher = () => usePlayerStore((s) => s.user?.role === 'teacher');
export const usePoints = () => usePlayerStore((s) => s.points);
export const useStreak = () => usePlayerStore((s) => s.streak);

/** Level + progress, computed outside the selector to avoid re-render loops. */
export const usePlayerLevel = () => {
  const points = usePlayerStore((s) => s.points);
  return { ...getLevelFromPoints(points), ...getProgressToNextLevel(points), points };
};
