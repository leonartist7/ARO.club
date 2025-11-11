/**
 * Constants for the application
 */

export const LANGUAGES = [
  { code: 'fr', name: 'French', flag: '🇫🇷', emoji: '🥐' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸', emoji: '💃' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵', emoji: '🍣' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷', emoji: '🎎' },
  { code: 'zh', name: 'Mandarin', flag: '🇨🇳', emoji: '🐉' },
  { code: 'it', name: 'Italian', flag: '🇮🇹', emoji: '🍕' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹', emoji: '⚽' },
  { code: 'de', name: 'German', flag: '🇩🇪', emoji: '🍺' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦', emoji: '🕌' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺', emoji: '🪆' },
];

export const CITIES = [
  {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    flag: '🇫🇷',
    lat: 48.8566,
    lng: 2.3522,
    timezone: 'Europe/Paris',
  },
  {
    id: 'barcelona',
    name: 'Barcelona',
    country: 'Spain',
    flag: '🇪🇸',
    lat: 41.3851,
    lng: 2.1734,
    timezone: 'Europe/Madrid',
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    flag: '🇯🇵',
    lat: 35.6762,
    lng: 139.6503,
    timezone: 'Asia/Tokyo',
  },
  {
    id: 'seoul',
    name: 'Seoul',
    country: 'South Korea',
    flag: '🇰🇷',
    lat: 37.5665,
    lng: 126.978,
    timezone: 'Asia/Seoul',
  },
  {
    id: 'new-york',
    name: 'New York',
    country: 'USA',
    flag: '🇺🇸',
    lat: 40.7128,
    lng: -74.006,
    timezone: 'America/New_York',
  },
  {
    id: 'london',
    name: 'London',
    country: 'UK',
    flag: '🇬🇧',
    lat: 51.5074,
    lng: -0.1278,
    timezone: 'Europe/London',
  },
  {
    id: 'berlin',
    name: 'Berlin',
    country: 'Germany',
    flag: '🇩🇪',
    lat: 52.52,
    lng: 13.405,
    timezone: 'Europe/Berlin',
  },
  {
    id: 'lisbon',
    name: 'Lisbon',
    country: 'Portugal',
    flag: '🇵🇹',
    lat: 38.7223,
    lng: -9.1393,
    timezone: 'Europe/Lisbon',
  },
  {
    id: 'mexico-city',
    name: 'Mexico City',
    country: 'Mexico',
    flag: '🇲🇽',
    lat: 19.4326,
    lng: -99.1332,
    timezone: 'America/Mexico_City',
  },
  {
    id: 'buenos-aires',
    name: 'Buenos Aires',
    country: 'Argentina',
    flag: '🇦🇷',
    lat: -34.6037,
    lng: -58.3816,
    timezone: 'America/Argentina/Buenos_Aires',
  },
];

export const SKILL_LEVELS = [
  { value: 'beginner', label: 'Beginner', description: 'New to the language' },
  {
    value: 'intermediate',
    label: 'Intermediate',
    description: 'Can hold basic conversations',
  },
  {
    value: 'advanced',
    label: 'Advanced',
    description: 'Fluent or near-fluent',
  },
  { value: 'all', label: 'All Levels', description: 'Suitable for everyone' },
];

export const EXPERIENCE_TYPES = [
  { value: 'conversation', label: 'Conversation Practice', icon: '💬' },
  { value: 'walking-tour', label: 'Walking Tour', icon: '🚶' },
  { value: 'cooking', label: 'Cooking Class', icon: '👨‍🍳' },
  { value: 'book-club', label: 'Book Club', icon: '📚' },
  { value: 'movie-night', label: 'Movie Night', icon: '🎬' },
  { value: 'market-tour', label: 'Market Tour', icon: '🛒' },
  { value: 'picnic', label: 'Park Picnic', icon: '🧺' },
  { value: 'trivia', label: 'Trivia Night', icon: '🎯' },
  { value: 'game-night', label: 'Game Night', icon: '🎲' },
  { value: 'art-workshop', label: 'Art Workshop', icon: '🎨' },
];

export const BADGE_DEFINITIONS = [
  {
    id: 'first-booking',
    name: 'First Steps',
    description: 'Completed your first experience',
    icon: '👣',
    requirement: 'Complete 1 experience',
  },
  {
    id: 'early-bird',
    name: 'Early Bird',
    description: 'Booked 5 experiences',
    icon: '🐦',
    requirement: 'Complete 5 experiences',
  },
  {
    id: 'polyglot',
    name: 'Polyglot',
    description: 'Learned 3 different languages',
    icon: '🗣️',
    requirement: 'Attend experiences in 3 languages',
  },
  {
    id: 'globe-trotter',
    name: 'Globe Trotter',
    description: 'Visited experiences in 5 cities',
    icon: '🌍',
    requirement: 'Attend experiences in 5 cities',
  },
  {
    id: 'social-butterfly',
    name: 'Social Butterfly',
    description: 'Made 20 connections',
    icon: '🦋',
    requirement: 'Meet 20 different people',
  },
  {
    id: 'review-master',
    name: 'Review Master',
    description: 'Left 10 helpful reviews',
    icon: '⭐',
    requirement: 'Write 10 reviews',
  },
  {
    id: 'couple-goals',
    name: 'Couple Goals',
    description: 'Attended 3 experiences with a partner',
    icon: '💑',
    requirement: 'Use couple discount 3 times',
  },
  {
    id: 'weekend-warrior',
    name: 'Weekend Warrior',
    description: 'Attended experiences every weekend for a month',
    icon: '📅',
    requirement: 'Attend 4 weekend experiences in a row',
  },
  {
    id: 'culture-vulture',
    name: 'Culture Vulture',
    description: 'Tried all experience types',
    icon: '🎭',
    requirement: 'Complete all 10 experience types',
  },
  {
    id: 'legend',
    name: 'TongueConnect Legend',
    description: 'Reached 2000 points',
    icon: '👑',
    requirement: 'Earn 2000 points',
  },
];

export const PRICE_RANGES = [
  { min: 0, max: 15, label: 'Under $15' },
  { min: 15, max: 20, label: '$15 - $20' },
  { min: 20, max: 25, label: '$20 - $25' },
  { min: 25, max: 100, label: '$25+' },
];
