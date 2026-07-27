import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCompare } from '../hooks/useCompare';
import Button from './ui/Button';
import experiencesData from '../data/experiences';

/**
 * Compare Bar Component
 * Fixed bottom bar showing compared experiences
 */
export default function CompareBar() {
  const { compareList, removeFromCompare, clearCompare, maxCompare } = useCompare();

  // Get experience details
  const experiences = compareList
    .map((id) => experiencesData.find((exp) => exp.id === id))
    .filter(Boolean);

  if (compareList.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Experience thumbnails */}
            <div className="flex items-center gap-4 flex-1 overflow-x-auto">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                  Compare ({compareList.length}/{maxCompare})
                </h3>
              </div>

              <div className="flex items-center gap-3">
                {experiences.map((exp) => (
                  <motion.div
                    key={exp.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="relative group"
                  >
                    <img
                      src={exp.image}
                      alt={exp.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <button
                      onClick={() => removeFromCompare(exp.id)}
                      className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Remove from compare"
                    >
                      <X className="w-3 h-3" />
                    </button>
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <p className="text-white text-xs font-medium px-2 text-center line-clamp-2">
                        {exp.title}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={clearCompare}
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors whitespace-nowrap"
              >
                Clear All
              </button>

              <Link to="/compare">
                <Button
                  variant="primary"
                  size="md"
                  icon={<ArrowRight className="w-4 h-4" />}
                  disabled={compareList.length < 2}
                >
                  Compare Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
