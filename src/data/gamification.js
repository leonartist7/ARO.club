/**
 * Canonical gamification catalog.
 *
 * This replaces the two competing badge lists that used to live in
 * `characters.js` (emoji field, daily-loop badges) and `constants.js`
 * (icon field, marketplace milestones). Everything now reads from here so a
 * badge looks and means the same thing on the dashboard, the profile and the
 * leaderboard.
 */

/**
 * Badge categories - used to group badges in the UI.
 */
export const BADGE_CATEGORIES = {
  journey: { label: 'Journey', icon: '🧭' },
  habit: { label: 'Habits', icon: '🔥' },
  social: { label: 'Social', icon: '💬' },
};

/**
 * Every badge in the app. `points` is the bonus awarded when it unlocks.
 */
export const BADGES = [
  // Journey - marketplace milestones
  {
    id: 'first-booking',
    name: 'First Steps',
    description: 'Completed your first experience',
    requirement: 'Complete 1 experience',
    icon: '👣',
    category: 'journey',
    points: 50,
  },
  {
    id: 'globe-trotter',
    name: 'Globe Trotter',
    description: 'Learned in 5 different cities',
    requirement: 'Attend experiences in 5 cities',
    icon: '🌍',
    category: 'journey',
    points: 200,
  },
  {
    id: 'polyglot',
    name: 'Polyglot',
    description: 'Studied 3 different languages',
    requirement: 'Attend experiences in 3 languages',
    icon: '🗣️',
    category: 'journey',
    points: 250,
  },
  {
    id: 'culture-vulture',
    name: 'Culture Vulture',
    description: 'Tried every kind of experience',
    requirement: 'Complete all 10 experience types',
    icon: '🎭',
    category: 'journey',
    points: 300,
  },
  {
    id: 'couple-goals',
    name: 'Couple Goals',
    description: 'Learned together 3 times',
    requirement: 'Use the couple discount 3 times',
    icon: '💑',
    category: 'journey',
    points: 100,
  },
  {
    id: 'legend',
    name: 'Conversa Legend',
    description: 'Reached 2000 points',
    requirement: 'Earn 2000 points',
    icon: '👑',
    category: 'journey',
    points: 500,
  },

  // Habit - the daily loop
  {
    id: 'week-streak',
    name: 'Week Warrior',
    description: 'Practised 7 days in a row',
    requirement: 'Reach a 7 day streak',
    icon: '🔥',
    category: 'habit',
    points: 100,
  },
  {
    id: 'month-streak',
    name: 'Monthly Master',
    description: 'Practised 30 days in a row',
    requirement: 'Reach a 30 day streak',
    icon: '💪',
    category: 'habit',
    points: 400,
  },
  {
    id: 'perfect-score',
    name: 'Flawless',
    description: 'Aced a game with a perfect score',
    requirement: 'Score 100% in any game',
    icon: '💯',
    category: 'habit',
    points: 75,
  },
  {
    id: 'night-owl',
    name: 'Night Owl',
    description: 'Practised after midnight',
    requirement: 'Play a game between 00:00 and 04:00',
    icon: '🌙',
    category: 'habit',
    points: 50,
  },
  {
    id: 'early-riser',
    name: 'Early Bird',
    description: 'Practised before 7am',
    requirement: 'Play a game before 07:00',
    icon: '🌅',
    category: 'habit',
    points: 50,
  },
  {
    id: 'big-spender',
    name: 'Big Spender',
    description: 'Spent 1000 points in the shop',
    requirement: 'Spend 1000 points',
    icon: '🛍️',
    category: 'habit',
    points: 100,
  },

  // Social
  {
    id: 'social-butterfly',
    name: 'Social Butterfly',
    description: 'Started 5 conversations',
    requirement: 'Chat with 5 different people',
    icon: '🦋',
    category: 'social',
    points: 150,
  },
  {
    id: 'review-master',
    name: 'Review Master',
    description: 'Left 10 helpful reviews',
    requirement: 'Write 10 reviews',
    icon: '⭐',
    category: 'social',
    points: 150,
  },
];

/** Look up a single badge by id. */
export const getBadge = (id) => BADGES.find((badge) => badge.id === id);

/** Badges belonging to one category. */
export const getBadgesByCategory = (category) =>
  BADGES.filter((badge) => badge.category === category);

/**
 * Daily quests. Reset every day - completing them is the main reason to come
 * back tomorrow.
 */
export const DAILY_QUESTS = [
  { id: 'play-game', name: 'Play one game', reward: 50, icon: '🎮' },
  { id: 'perfect-round', name: 'Get a perfect round', reward: 100, icon: '💯' },
  { id: 'browse-experience', name: 'Browse an experience', reward: 30, icon: '🔍' },
  { id: 'message-teacher', name: 'Message a teacher', reward: 75, icon: '💬' },
  { id: 'customize-character', name: 'Update your character', reward: 40, icon: '✨' },
];

/** How many quests a player sees per day. */
export const QUESTS_PER_DAY = 3;
