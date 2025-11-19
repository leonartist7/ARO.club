import { useSavedSearchesContext } from '../contexts/SavedSearchesContext';

/**
 * Hook to access saved searches functionality
 */
export function useSavedSearches() {
  return useSavedSearchesContext();
}
