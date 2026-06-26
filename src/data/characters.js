// Character and Accessory Data for Gamification System

export const characters = [
  {
    id: 'coco',
    name: 'Coco the Chameleon',
    emoji: '🦎',
    baseColor: '#20B2AA',
    unlocked: true,
    cost: 0,
  },
  {
    id: 'cat',
    name: 'Luna the Cat',
    emoji: '🐱',
    baseColor: '#FF9800',
    unlocked: false,
    cost: 500,
  },
  {
    id: 'fox',
    name: 'Felix the Fox',
    emoji: '🦊',
    baseColor: '#FF5722',
    unlocked: false,
    cost: 750,
  },
  {
    id: 'bear',
    name: 'Bruno the Bear',
    emoji: '🐻',
    baseColor: '#795548',
    unlocked: false,
    cost: 1000,
  },
  {
    id: 'panda',
    name: 'Panda Pro',
    emoji: '🐼',
    baseColor: '#000000',
    unlocked: false,
    cost: 1500,
  },
  {
    id: 'koala',
    name: 'Kai the Koala',
    emoji: '🐨',
    baseColor: '#9E9E9E',
    unlocked: false,
    cost: 2000,
  },
];

export const accessories = {
  hats: [
    { id: 'crown', name: 'Royal Crown', emoji: '👑', cost: 200, unlocked: false },
    { id: 'tophat', name: 'Top Hat', emoji: '🎩', cost: 150, unlocked: false },
    { id: 'cowboy', name: 'Cowboy Hat', emoji: '🤠', cost: 150, unlocked: false },
    { id: 'party', name: 'Party Hat', emoji: '🎉', cost: 100, unlocked: false },
    { id: 'wizard', name: 'Wizard Hat', emoji: '🧙', cost: 300, unlocked: false },
  ],
  glasses: [
    { id: 'cool', name: 'Cool Shades', emoji: '😎', cost: 100, unlocked: false },
    { id: 'nerd', name: 'Nerd Glasses', emoji: '🤓', cost: 100, unlocked: false },
    { id: 'star', name: 'Star Glasses', emoji: '🌟', cost: 150, unlocked: false },
  ],
  accessories: [
    { id: 'medal', name: 'Gold Medal', emoji: '🥇', cost: 250, unlocked: false },
    { id: 'trophy', name: 'Trophy', emoji: '🏆', cost: 300, unlocked: false },
    { id: 'fire', name: 'Fire Streak', emoji: '🔥', cost: 200, unlocked: false },
    { id: 'star', name: 'Super Star', emoji: '⭐', cost: 150, unlocked: false },
    { id: 'gem', name: 'Diamond', emoji: '💎', cost: 500, unlocked: false },
  ],
  backgrounds: [
    { id: 'beach', name: 'Beach Vibes', emoji: '🏖️', cost: 300, unlocked: false },
    { id: 'city', name: 'City Lights', emoji: '🌃', cost: 300, unlocked: false },
    { id: 'mountain', name: 'Mountain Peak', emoji: '⛰️', cost: 350, unlocked: false },
    { id: 'space', name: 'Space', emoji: '🌌', cost: 400, unlocked: false },
    { id: 'garden', name: 'Garden Paradise', emoji: '🌸', cost: 250, unlocked: false },
  ],
};

// Achievement badges
export const badges = [
  { id: 'first_lesson', name: 'First Steps', emoji: '🎯', description: 'Complete your first lesson' },
  { id: 'week_streak', name: 'Week Warrior', emoji: '🔥', description: '7 day streak' },
  { id: 'month_streak', name: 'Monthly Master', emoji: '💪', description: '30 day streak' },
  { id: 'social', name: 'Social Butterfly', emoji: '🦋', description: 'Make 5 friends' },
  { id: 'explorer', name: 'Explorer', emoji: '🗺️', description: 'Try 3 different cities' },
  { id: 'polyglot', name: 'Polyglot', emoji: '🌍', description: 'Study 3 languages' },
  { id: 'night_owl', name: 'Night Owl', emoji: '🌙', description: 'Complete lessons after midnight' },
  { id: 'early_bird', name: 'Early Bird', emoji: '🌅', description: 'Complete lessons before 7am' },
  { id: 'perfect', name: 'Perfect Score', emoji: '💯', description: 'Get 100% on a lesson' },
  { id: 'reviewer', name: 'Helpful Reviewer', emoji: '⭐', description: 'Leave 10 reviews' },
];

// Daily quests
export const dailyQuests = [
  { id: 'complete_lesson', name: 'Complete 1 Lesson', reward: 50, emoji: '📚' },
  { id: 'practice_30min', name: 'Practice for 30 minutes', reward: 75, emoji: '⏰' },
  { id: 'perfect_score', name: 'Get a perfect score', reward: 100, emoji: '💯' },
  { id: 'review_experience', name: 'Leave a review', reward: 50, emoji: '⭐' },
  { id: 'social', name: 'Connect with a teacher', reward: 75, emoji: '👥' },
];
