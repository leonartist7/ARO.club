import { useState } from 'react';
import { ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Select from './ui/Select';
import Badge from './ui/Badge';
import Button from './ui/Button';
import { EXPERIENCE_TYPES } from '../data/constants';

/**
 * AdvancedFiltersPanel - Collapsible panel with advanced filtering options
 * Organized sections with labels and reset button
 *
 * @param {object} advancedFilters - Current advanced filters state
 * @param {function} onFilterChange - Function to call when a filter changes
 * @param {function} onResetAdvanced - Function to reset all advanced filters
 */
export default function AdvancedFiltersPanel({
  advancedFilters,
  onFilterChange,
  onResetAdvanced,
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Count active advanced filters
  const activeCount = [
    advancedFilters.weekend,
    advancedFilters.accessible,
    advancedFilters.petFriendly,
    advancedFilters.foodIncluded,
    advancedFilters.indoorOutdoor !== 'all',
    advancedFilters.groupSize !== 'all',
    advancedFilters.timeOfDay?.length > 0,
    advancedFilters.experienceTypes?.length > 0,
  ].filter(Boolean).length;

  const handleCheckboxChange = (key) => {
    onFilterChange(key, !advancedFilters[key]);
  };

  const handleTimeOfDayChange = (time) => {
    const current = advancedFilters.timeOfDay || [];
    const updated = current.includes(time)
      ? current.filter((t) => t !== time)
      : [...current, time];
    onFilterChange('timeOfDay', updated);
  };

  const handleExperienceTypeChange = (type) => {
    const current = advancedFilters.experienceTypes || [];
    const updated = current.includes(type)
      ? current.filter((t) => t !== type)
      : [...current, type];
    onFilterChange('experienceTypes', updated);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Advanced Filters
          </h3>
          {activeCount > 0 && (
            <Badge variant="primary" size="sm">
              {activeCount}
            </Badge>
          )}
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        )}
      </button>

      {/* Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-gray-200 dark:border-gray-700"
          >
            <div className="p-6 space-y-6">
              {/* Toggle Filters */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Quick Filters
                </h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={advancedFilters.weekend || false}
                      onChange={() => handleCheckboxChange('weekend')}
                      className="w-4 h-4 text-primary-500 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Available this weekend
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={advancedFilters.accessible || false}
                      onChange={() => handleCheckboxChange('accessible')}
                      className="w-4 h-4 text-primary-500 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Wheelchair accessible
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={advancedFilters.petFriendly || false}
                      onChange={() => handleCheckboxChange('petFriendly')}
                      className="w-4 h-4 text-primary-500 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Pet-friendly venues
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={advancedFilters.foodIncluded || false}
                      onChange={() => handleCheckboxChange('foodIncluded')}
                      className="w-4 h-4 text-primary-500 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Food/drinks included
                    </span>
                  </label>
                </div>
              </div>

              {/* Indoor/Outdoor */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Venue Type
                </label>
                <div className="flex gap-2">
                  {['all', 'indoor', 'outdoor', 'both'].map((type) => (
                    <button
                      key={type}
                      onClick={() => onFilterChange('indoorOutdoor', type)}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                        advancedFilters.indoorOutdoor === type
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Group Size */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Group Size
                </label>
                <Select
                  value={advancedFilters.groupSize || 'all'}
                  onChange={(e) => onFilterChange('groupSize', e.target.value)}
                  options={[
                    { value: 'all', label: 'All Sizes' },
                    { value: '1-3', label: '1-3 people' },
                    { value: '4-6', label: '4-6 people' },
                    { value: '7-10', label: '7-10 people' },
                    { value: '10+', label: '10+ people' },
                  ]}
                />
              </div>

              {/* Time of Day */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Time of Day
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['morning', 'afternoon', 'evening'].map((time) => (
                    <button
                      key={time}
                      onClick={() => handleTimeOfDayChange(time)}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                        (advancedFilters.timeOfDay || []).includes(time)
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {time.charAt(0).toUpperCase() + time.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Experience Types */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Experience Type
                </h4>
                <div className="flex flex-wrap gap-2">
                  {EXPERIENCE_TYPES.slice(0, 6).map((type) => (
                    <button
                      key={type.value}
                      onClick={() => handleExperienceTypeChange(type.value)}
                      className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                        (advancedFilters.experienceTypes || []).includes(type.value)
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {type.icon} {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reset Button */}
              {activeCount > 0 && (
                <Button
                  variant="outline"
                  onClick={onResetAdvanced}
                  icon={<RotateCcw className="w-4 h-4" />}
                  className="w-full"
                >
                  Reset Advanced Filters
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
