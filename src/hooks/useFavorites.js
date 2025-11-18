import { useFavoritesContext } from '../contexts/FavoritesContext';

/**
 * Hook to access favorites functionality
 */
export function useFavorites() {
  return useFavoritesContext();
}
