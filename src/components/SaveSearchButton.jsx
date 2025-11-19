import { useState } from 'react';
import { Bookmark, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './ui/Button';
import Input from './ui/Input';
import { useSavedSearches } from '../hooks/useSavedSearches';
import { useToast } from '../hooks/useToast';

/**
 * SaveSearchButton - Button with modal to save current search filters
 * Shows save count and opens naming modal on click
 *
 * @param {object} filters - Current filter state to save
 * @param {boolean} hasActiveFilters - Whether there are active filters
 */
export default function SaveSearchButton({ filters, hasActiveFilters }) {
  const { saveSearch, canSaveMore, savedSearches, maxSearches } = useSavedSearches();
  const { showToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchName, setSearchName] = useState('');

  const handleSave = () => {
    if (!searchName.trim()) {
      showToast('Please enter a name for this search', 'error');
      return;
    }

    try {
      saveSearch(searchName.trim(), filters);
      showToast('Search saved successfully!', 'success');
      setSearchName('');
      setIsModalOpen(false);
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  const handleOpenModal = () => {
    if (!hasActiveFilters) {
      showToast('Apply some filters before saving', 'info');
      return;
    }

    if (!canSaveMore()) {
      showToast(`Maximum ${maxSearches} saved searches allowed`, 'error');
      return;
    }

    setIsModalOpen(true);
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={handleOpenModal}
        icon={<Bookmark className="w-4 h-4" />}
        disabled={!hasActiveFilters || !canSaveMore()}
        className="relative"
      >
        Save Search
        <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
          ({savedSearches.length}/{maxSearches})
        </span>
      </Button>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-6"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Save Search
                  </h3>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                {/* Content */}
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Give this search a name so you can easily find it later
                </p>

                <Input
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  placeholder="e.g., French cafes in Paris"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSave();
                    }
                  }}
                  className="mb-4"
                />

                {/* Actions */}
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={handleSave} className="flex-1">
                    Save
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
