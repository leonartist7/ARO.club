import { useState, useEffect } from 'react';
import { User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Recently Booked Component
 * Shows fake recent booking activity to build urgency and trust
 */
export default function RecentlyBooked({ className }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Mock data for recently booked
  const recentBookings = [
    { name: 'Sarah', city: 'New York', hoursAgo: 3 },
    { name: 'Miguel', city: 'Barcelona', hoursAgo: 5 },
    { name: 'Yuki', city: 'Tokyo', hoursAgo: 2 },
    { name: 'Emma', city: 'London', hoursAgo: 7 },
    { name: 'Lucas', city: 'Paris', hoursAgo: 4 },
    { name: 'Sofia', city: 'Lisbon', hoursAgo: 6 },
  ];

  // Rotate through bookings every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % recentBookings.length);
        setIsVisible(true);
      }, 500);
    }, 10000);

    return () => clearInterval(interval);
  }, [recentBookings.length]);

  const booking = recentBookings[currentIndex];

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.5 }}
          className={`flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg ${className}`}
        >
          <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center flex-shrink-0">
            <User className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {booking.name} from {booking.city}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Booked this {booking.hoursAgo} {booking.hoursAgo === 1 ? 'hour' : 'hours'} ago
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
