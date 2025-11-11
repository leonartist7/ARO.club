import { format, formatDistance, parseISO, isPast, isFuture, isToday } from 'date-fns';

/**
 * Format a date to a readable string
 */
export const formatDate = (date, formatStr = 'MMM dd, yyyy') => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, formatStr);
};

/**
 * Format date and time
 */
export const formatDateTime = (date) => {
  return formatDate(date, 'MMM dd, yyyy • h:mm a');
};

/**
 * Format time only
 */
export const formatTime = (date) => {
  return formatDate(date, 'h:mm a');
};

/**
 * Get relative time (e.g., "2 hours ago")
 */
export const getRelativeTime = (date) => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return formatDistance(dateObj, new Date(), { addSuffix: true });
};

/**
 * Check if a date is in the past
 */
export const isDatePast = (date) => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return isPast(dateObj);
};

/**
 * Check if a date is in the future
 */
export const isDateFuture = (date) => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return isFuture(dateObj);
};

/**
 * Check if a date is today
 */
export const isDateToday = (date) => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return isToday(dateObj);
};

/**
 * Get day of week
 */
export const getDayOfWeek = (date) => {
  return formatDate(date, 'EEEE');
};
