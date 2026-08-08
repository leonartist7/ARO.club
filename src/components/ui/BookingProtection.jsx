import { Shield, Check } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../utils/cn';

export default function BookingProtection({ className }) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative">
      <div
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        tabIndex={0}
        className={cn(
          'flex items-center gap-2 px-4 py-3 w-full',
          'bg-success-50 dark:bg-success-500/15 border border-success-500/30',
          'rounded-lg cursor-help',
          className
        )}
      >
        <Shield className="w-5 h-5 text-success-700 dark:text-success-500 shrink-0" aria-hidden="true" />
        <div>
          <div className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-success-700 dark:text-success-500" aria-hidden="true" />
            <span className="text-sm font-semibold text-success-700 dark:text-success-500">
              Protected booking
            </span>
          </div>
          <p className="text-xs text-success-700/90 dark:text-success-500/90">
            Free cancellation available
          </p>
        </div>
      </div>

      {showTooltip && (
        <div className="absolute bottom-full left-0 mb-2 px-4 py-3 bg-gray-900 text-white rounded-lg shadow-lg z-50 w-64 text-xs space-y-2">
          <p>Free cancellation up to 24 hours before.</p>
          <p>Full refund within the allowed window.</p>
          <p>Secure payment when booking opens.</p>
        </div>
      )}
    </div>
  );
}
