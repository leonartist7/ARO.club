import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import Button from './ui/Button';

/**
 * Calendar Availability Component
 * Shows monthly calendar view with available dates
 */
export default function CalendarAvailability({
  availableDates = [],
  spotsAvailableByDate = {},
  selectedDate,
  onDateSelect,
  className
}) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Get the first and last day of the current month
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const lastDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
  const firstDayOfWeek = firstDayOfMonth.getDay(); // 0 = Sunday
  const daysInMonth = lastDayOfMonth.getDate();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Month names
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Day names
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Navigate to previous month
  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  // Navigate to next month
  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // Jump to current month
  const handleToday = () => {
    setCurrentMonth(new Date());
  };

  // Check if a date is available
  const isDateAvailable = (date) => {
    const dateString = date.toISOString().split('T')[0];
    return availableDates.includes(dateString);
  };

  // Check if a date is selected
  const isDateSelected = (date) => {
    if (!selectedDate) return false;
    const dateString = date.toISOString().split('T')[0];
    const selectedDateString = new Date(selectedDate).toISOString().split('T')[0];
    return dateString === selectedDateString;
  };

  // Check if a date is in the past
  const isPastDate = (date) => {
    return date < today;
  };

  // Get spots left for a date
  const getSpotsLeft = (date) => {
    const dateString = date.toISOString().split('T')[0];
    return spotsAvailableByDate[dateString] || 0;
  };

  // Handle date click
  const handleDateClick = (date) => {
    if (isPastDate(date) || !isDateAvailable(date)) return;
    onDateSelect?.(date);
  };

  // Generate calendar days
  const calendarDays = [];

  // Empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarDays.push(
      <div key={`empty-${i}`} className="aspect-square" />
    );
  }

  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const available = isDateAvailable(date);
    const selected = isDateSelected(date);
    const past = isPastDate(date);
    const spotsLeft = getSpotsLeft(date);

    calendarDays.push(
      <motion.button
        key={day}
        onClick={() => handleDateClick(date)}
        disabled={past || !available}
        whileHover={!past && available ? { scale: 1.05 } : {}}
        whileTap={!past && available ? { scale: 0.95 } : {}}
        className={clsx(
          'aspect-square p-1 md:p-2 rounded-lg text-sm md:text-base font-medium transition-all relative group',
          {
            // Selected state
            'bg-primary-500 text-white shadow-md': selected,
            // Available state
            'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/30':
              available && !past && !selected,
            // Past or unavailable state
            'bg-gray-50 dark:bg-gray-800 text-gray-300 dark:text-gray-600 cursor-not-allowed':
              past || !available,
          }
        )}
        title={available && !past ? `${spotsLeft} spots left` : ''}
      >
        <span className="relative z-10">{day}</span>

        {/* Spots left indicator on hover */}
        {available && !past && spotsLeft > 0 && (
          <div className="absolute inset-x-0 -bottom-8 hidden group-hover:block z-20">
            <div className="bg-gray-900 dark:bg-gray-700 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">
              {spotsLeft} spots left
            </div>
          </div>
        )}
      </motion.button>
    );
  }

  return (
    <div className={clsx('bg-white dark:bg-gray-800 rounded-lg p-4 md:p-6 shadow-sm', className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
          Select a Date
        </h3>
        <Button variant="outline" size="sm" onClick={handleToday}>
          Today
        </Button>
      </div>

      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePrevMonth}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>

        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h4>

        <button
          onClick={handleNextMonth}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Next month"
        >
          <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 gap-1 md:gap-2 mb-2">
        {dayNames.map((day) => (
          <div
            key={day}
            className="text-center text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1 md:gap-2">
        {calendarDays}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex flex-wrap gap-4 text-xs md:text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-green-100 dark:bg-green-900/20 border border-green-300 dark:border-green-700" />
          <span className="text-gray-600 dark:text-gray-400">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-primary-500" />
          <span className="text-gray-600 dark:text-gray-400">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gray-100 dark:bg-gray-700" />
          <span className="text-gray-600 dark:text-gray-400">Unavailable</span>
        </div>
      </div>
    </div>
  );
}
