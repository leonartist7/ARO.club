import { useRecentlyViewedContext } from '../contexts/RecentlyViewedContext';

/**
 * Hook to access recently viewed functionality
 */
export function useRecentlyViewed() {
  return useRecentlyViewedContext();
}
