import { createContext, useContext, useState, useEffect } from 'react';
import { useToastContext } from './ToastContext';

const CompareContext = createContext(null);

const MAX_COMPARE = 3;
const STORAGE_KEY = 'conversa-compare';

/**
 * Compare Context Provider
 * Manages the comparison list for experiences
 */
export function CompareProvider({ children }) {
  const { addToast } = useToastContext();
  const [compareList, setCompareList] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setCompareList(parsed);
      }
    } catch (error) {
      console.error('Failed to load compare list from localStorage:', error);
    }
  }, []);

  // Save to localStorage whenever compareList changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(compareList));
    } catch (error) {
      console.error('Failed to save compare list to localStorage:', error);
    }
  }, [compareList]);

  // Add experience to compare list
  const addToCompare = (experienceId) => {
    if (compareList.includes(experienceId)) {
      addToast('Experience already in compare list', 'info');
      return false;
    }

    if (compareList.length >= MAX_COMPARE) {
      addToast(`You can only compare up to ${MAX_COMPARE} experiences`, 'warning');
      return false;
    }

    setCompareList((prev) => [...prev, experienceId]);
    addToast('Added to compare list', 'success');
    return true;
  };

  // Remove experience from compare list
  const removeFromCompare = (experienceId) => {
    setCompareList((prev) => prev.filter((id) => id !== experienceId));
    addToast('Removed from compare list', 'info');
  };

  // Clear all from compare list
  const clearCompare = () => {
    setCompareList([]);
    addToast('Compare list cleared', 'info');
  };

  // Check if experience is in compare list
  const isInCompare = (experienceId) => {
    return compareList.includes(experienceId);
  };

  // Check if can add more
  const canAddMore = () => {
    return compareList.length < MAX_COMPARE;
  };

  const value = {
    compareList,
    addToCompare,
    removeFromCompare,
    clearCompare,
    isInCompare,
    canAddMore,
    maxCompare: MAX_COMPARE,
  };

  return (
    <CompareContext.Provider value={value}>
      {children}
    </CompareContext.Provider>
  );
}

/**
 * Hook to use compare context
 */
export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within CompareProvider');
  }
  return context;
}
