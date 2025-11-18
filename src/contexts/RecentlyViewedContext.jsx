import { createContext, useContext, useState, useEffect } from 'react';

const RecentlyViewedContext = createContext();

const STORAGE_KEY = 'conversa-recently-viewed';
const MAX_ITEMS = 10;

/**
 * RecentlyViewedProvider - Tracks recently viewed experiences
 * Stores experienceId and viewedAt timestamp
 * Persists to localStorage
 */
export function RecentlyViewedProvider({ children }) {
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setRecentlyViewed(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load recently viewed:', error);
    }
  }, []);

  // Save to localStorage whenever recentlyViewed changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recentlyViewed));
    } catch (error) {
      console.error('Failed to save recently viewed:', error);
    }
  }, [recentlyViewed]);

  const addToRecentlyViewed = (experienceId) => {
    setRecentlyViewed((prev) => {
      // Remove if already exists
      const filtered = prev.filter((item) => item.experienceId !== experienceId);

      // Add to beginning (most recent first - LIFO)
      const updated = [
        {
          experienceId,
          viewedAt: new Date().toISOString(),
        },
        ...filtered,
      ];

      // Keep only MAX_ITEMS
      return updated.slice(0, MAX_ITEMS);
    });
  };

  const getRecentlyViewed = () => {
    return recentlyViewed;
  };

  const clearRecentlyViewed = () => {
    setRecentlyViewed([]);
  };

  const value = {
    recentlyViewed,
    addToRecentlyViewed,
    getRecentlyViewed,
    clearRecentlyViewed,
  };

  return (
    <RecentlyViewedContext.Provider value={value}>
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export function useRecentlyViewedContext() {
  const context = useContext(RecentlyViewedContext);
  if (!context) {
    throw new Error('useRecentlyViewedContext must be used within RecentlyViewedProvider');
  }
  return context;
}
