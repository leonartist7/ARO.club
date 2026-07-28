/**
 * Format price to currency
 */
export const formatPrice = (price, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);
};

/**
 * Calculate couple discount price
 */
export const calculateCouplePrice = (singlePrice) => {
  // Rounded to cents: 18 * 2 * 0.85 lands on 30.599999999999998, which is
  // fine once formatted but not fine stored on a booking as a price paid.
  return Math.round(singlePrice * 2 * 0.85 * 100) / 100;
};

/**
 * Get discount amount
 */
export const getDiscountAmount = (singlePrice) => {
  const regularPrice = singlePrice * 2;
  const discountedPrice = calculateCouplePrice(singlePrice);
  return regularPrice - discountedPrice;
};

/**
 * Calculate spots left
 */
export const getSpotsLeft = (maxCapacity, bookedSpots) => {
  return Math.max(0, maxCapacity - bookedSpots);
};

/**
 * Check if experience is almost full (less than 2 spots)
 */
export const isAlmostFull = (maxCapacity, bookedSpots) => {
  return getSpotsLeft(maxCapacity, bookedSpots) <= 2;
};

/**
 * Check if experience is full
 */
export const isFull = (maxCapacity, bookedSpots) => {
  return getSpotsLeft(maxCapacity, bookedSpots) === 0;
};

/**
 * Calculate average rating
 */
export const calculateAverageRating = (reviews) => {
  if (!reviews || reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return (sum / reviews.length).toFixed(1);
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};

/**
 * Generate initials from name
 */
export const getInitials = (name) => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

/**
 * Get skill level badge color
 */
export const getSkillLevelColor = (level) => {
  const colors = {
    beginner: 'bg-green-100 text-green-700 border-green-200',
    intermediate: 'bg-blue-100 text-blue-700 border-blue-200',
    advanced: 'bg-purple-100 text-purple-700 border-purple-200',
    all: 'bg-gray-100 text-gray-700 border-gray-200',
  };
  return colors[level.toLowerCase()] || colors.all;
};

/**
 * Debounce function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Generate random ID
 */
export const generateId = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

/**
 * Calculate points earned for booking
 */
export const calculatePointsEarned = (price) => {
  return Math.floor(price); // 1 point per dollar
};

/**
 * Get level from points
 */
export const getLevelFromPoints = (points) => {
  if (points < 100) return { level: 1, name: 'Beginner Explorer' };
  if (points < 250) return { level: 2, name: 'Language Enthusiast' };
  if (points < 500) return { level: 3, name: 'Cultural Connector' };
  if (points < 1000) return { level: 4, name: 'Conversation Master' };
  if (points < 2000) return { level: 5, name: 'Polyglot Pro' };
  return { level: 6, name: 'Global Ambassador' };
};

/**
 * Get progress to next level
 */
export const getProgressToNextLevel = (points) => {
  const thresholds = [100, 250, 500, 1000, 2000];
  const currentThreshold = thresholds.find(t => points < t) || thresholds[thresholds.length - 1];
  const previousThreshold = thresholds[thresholds.indexOf(currentThreshold) - 1] || 0;

  const progress = ((points - previousThreshold) / (currentThreshold - previousThreshold)) * 100;
  return {
    percentage: Math.min(100, Math.max(0, progress)),
    pointsNeeded: Math.max(0, currentThreshold - points),
    nextThreshold: currentThreshold,
  };
};
