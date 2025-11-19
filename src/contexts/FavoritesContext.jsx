import { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

const STORAGE_KEY = 'conversa-favorites';

/**
 * FavoritesProvider - Manages favorite experiences
 * Persists to localStorage
 */
export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load favorites:', error);
    }
  }, []);

  // Save to localStorage whenever favorites change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Failed to save favorites:', error);
    }
  }, [favorites]);

  const addToFavorites = (experienceId) => {
    setFavorites((prev) => {
      if (!prev.includes(experienceId)) {
        return [...prev, experienceId];
      }
      return prev;
    });
  };

  const removeFromFavorites = (experienceId) => {
    setFavorites((prev) => prev.filter((id) => id !== experienceId));
  };

  const isFavorite = (experienceId) => {
    return favorites.includes(experienceId);
  };

  const toggleFavorite = (experienceId) => {
    if (isFavorite(experienceId)) {
      removeFromFavorites(experienceId);
      return false;
    } else {
      addToFavorites(experienceId);
      return true;
    }
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
    clearFavorites,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavoritesContext() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavoritesContext must be used within FavoritesProvider');
  }
  return context;
}
