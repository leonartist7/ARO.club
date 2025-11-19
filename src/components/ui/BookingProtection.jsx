import { Shield, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

/**
 * Booking Protection Component
 * Trust badge with tooltip
 */
export default function BookingProtection({ className }) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative inline-block">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`flex items-center gap-2 px-4 py-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg cursor-help ${className}`}
      >
        <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
        <div>
          <div className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span className="text-sm font-semibold text-green-900 dark:text-green-100">
              Protected Booking
            </span>
          </div>
          <p className="text-xs text-green-700 dark:text-green-300">
            Free cancellation available
          </p>
        </div>
      </motion.div>

      {/* Tooltip */}
      {showTooltip && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-4 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-lg shadow-lg z-50 w-64"
        >
          <div className="space-y-2 text-xs">
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-green-400" />
              <span>Free cancellation up to 24 hours before the experience</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-green-400" />
              <span>Full refund if canceled within the allowed time</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-green-400" />
              <span>Secure payment processing</span>
            </div>
          </div>
          {/* Arrow */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
            <div className="w-2 h-2 bg-gray-900 dark:bg-gray-700 rotate-45"></div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
