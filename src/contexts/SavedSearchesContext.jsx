import { createContext, useContext, useState, useEffect } from 'react';

const SavedSearchesContext = createContext();

const STORAGE_KEY = 'conversa-saved-searches';
const MAX_SAVED_SEARCHES = 5;

/**
 * SavedSearchesProvider - Manages saved search filter combinations
 * Structure: { id, name, filters, savedAt }
 * Persists to localStorage
 */
export function SavedSearchesProvider({ children }) {
  const [savedSearches, setSavedSearches] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSavedSearches(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load saved searches:', error);
    }
  }, []);

  // Save to localStorage whenever savedSearches changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedSearches));
    } catch (error) {
      console.error('Failed to save searches:', error);
    }
  }, [savedSearches]);

  const saveSearch = (name, filters) => {
    // Check if we've reached the limit
    if (savedSearches.length >= MAX_SAVED_SEARCHES) {
      throw new Error(`Maximum ${MAX_SAVED_SEARCHES} saved searches allowed`);
    }

    const newSearch = {
      id: Date.now().toString(),
      name,
      filters,
      savedAt: new Date().toISOString(),
    };

    setSavedSearches((prev) => [...prev, newSearch]);
    return newSearch;
  };

  const deleteSearch = (searchId) => {
    setSavedSearches((prev) => prev.filter((search) => search.id !== searchId));
  };

  const getSavedSearches = () => {
    return savedSearches;
  };

  const canSaveMore = () => {
    return savedSearches.length < MAX_SAVED_SEARCHES;
  };

  const value = {
    savedSearches,
    saveSearch,
    deleteSearch,
    getSavedSearches,
    canSaveMore,
    maxSearches: MAX_SAVED_SEARCHES,
  };

  return (
    <SavedSearchesContext.Provider value={value}>
      {children}
    </SavedSearchesContext.Provider>
  );
}

export function useSavedSearchesContext() {
  const context = useContext(SavedSearchesContext);
  if (!context) {
    throw new Error('useSavedSearchesContext must be used within SavedSearchesProvider');
  }
  return context;
}
