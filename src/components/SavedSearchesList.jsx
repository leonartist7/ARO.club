import { useState } from 'react';
import { Bookmark, Trash2, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Badge from './ui/Badge';
import { useSavedSearches } from '../hooks/useSavedSearches';
import { useToast } from '../hooks/useToast';
import { LANGUAGES, CITIES } from '../data/constants';

/**
 * SavedSearchesList - Dropdown showing saved searches
 * Each item shows name, filter summary, apply button, and delete icon
 *
 * @param {function} onApplySearch - Function to call when applying a search
 */
export default function SavedSearchesList({ onApplySearch }) {
  const { savedSearches, deleteSearch } = useSavedSearches();
  const { showToast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  if (savedSearches.length === 0) {
    return null;
  }

  const handleApply = (search) => {
    onApplySearch(search.filters);
    setIsOpen(false);
    showToast(`Applied search: ${search.name}`, 'success');
  };

  const handleDelete = (searchId, searchName) => {
    if (window.confirm(`Delete saved search "${searchName}"?`)) {
      deleteSearch(searchId);
      showToast('Search deleted', 'info');
    }
  };

  const getFilterSummary = (filters) => {
    const parts = [];

    if (filters.language) {
      const lang = LANGUAGES.find((l) => l.code === filters.language);
      if (lang) parts.push(lang.name);
    }

    if (filters.city) {
      const city = CITIES.find((c) => c.id === filters.city);
      if (city) parts.push(city.name);
    }

    if (filters.skillLevel) {
      parts.push(filters.skillLevel);
    }

    if (filters.searchTerm) {
      parts.push(`"${filters.searchTerm}"`);
    }

    return parts.length > 0 ? parts.join(', ') : 'No filters';
  };

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <Bookmark className="w-4 h-4 text-primary-500" />
        <span className="text-sm font-medium text-gray-900 dark:text-white">
          Saved Searches ({savedSearches.length})
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown Content */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 mt-2 w-96 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-20 overflow-hidden"
            >
              <div className="max-h-96 overflow-y-auto">
                {savedSearches.map((search, index) => (
                  <div
                    key={search.id}
                    className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                      index !== savedSearches.length - 1
                        ? 'border-b border-gray-200 dark:border-gray-700'
                        : ''
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-gray-900 dark:text-white truncate">
                            {search.name}
                          </h4>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 line-clamp-2">
                          {getFilterSummary(search.filters)}
                        </p>
                        <button
                          onClick={() => handleApply(search)}
                          className="text-xs font-medium text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300"
                        >
                          Apply Search
                        </button>
                      </div>

                      <button
                        onClick={() => handleDelete(search.id, search.name)}
                        className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        aria-label="Delete search"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
