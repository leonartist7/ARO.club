from pathlib import Path

files = {}

files["src/components/ui/CocoMascot.jsx"] = r'''import { cn } from '../../utils/cn';

const sizeClasses = {
  sm: 'w-12 h-12 text-2xl',
  md: 'w-16 h-16 text-3xl',
  lg: 'w-24 h-24 text-5xl',
  xl: 'w-32 h-32 text-6xl',
};

// idle/wave/think stay still — no looping float
const poseAnim = {
  idle: '',
  wave: '',
  cheer: 'animate-pop',
  think: '',
  point: '',
};

export default function CocoMascot({
  pose = 'idle',
  size = 'md',
  className,
  label = 'Coco the Chameleon',
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        'inline-flex items-center justify-center rounded-full',
        'bg-primary-500 text-gray-900',
        'shadow-md select-none',
        sizeClasses[size] || sizeClasses.md,
        poseAnim[pose] || '',
        className
      )}
    >
      <span aria-hidden="true">🦎</span>
    </div>
  );
}
'''

files["src/components/ui/LanguageToggle.jsx"] = r'''import { useState, useRef, useEffect } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { cn } from '../../utils/cn';

const languages = [
  { code: 'en', short: 'ENG', name: 'English' },
  { code: 'es', short: 'SPA', name: 'Español' },
  { code: 'fr', short: 'FRA', name: 'Français' },
];

export default function LanguageToggle() {
  const { language, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const current = languages.find((lang) => lang.code === language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 min-h-11 px-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm font-semibold text-gray-800 dark:text-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Language"
      >
        {current.short}
        <ChevronDown className="w-4 h-4 text-gray-500" aria-hidden="true" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} aria-hidden="true" />
          <ul
            role="listbox"
            className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 py-1 z-20"
          >
            {languages.map((lang) => (
              <li key={lang.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={language === lang.code}
                  onClick={() => {
                    changeLanguage(lang.code);
                    setIsOpen(false);
                  }}
                  className={cn(
                    'w-full flex items-center justify-between gap-2 px-4 py-2.5 min-h-11 text-left text-sm font-medium transition-colors',
                    language === lang.code
                      ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800'
                  )}
                >
                  <span>{lang.short}</span>
                  {language === lang.code && <Check className="w-4 h-4" aria-hidden="true" />}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
'''

files["src/components/ui/SpotCounter.jsx"] = r'''import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import clsx from 'clsx';

export default function SpotCounter({
  spotsLeft,
  totalSpots = 0,
  variant = 'default',
  className
}) {
  const getUrgencyLevel = () => {
    if (spotsLeft === 0) return 'sold-out';
    if (spotsLeft <= 2) return 'high';
    if (spotsLeft <= 4) return 'moderate';
    return 'low';
  };

  const urgency = getUrgencyLevel();

  const getColorClasses = () => {
    switch (urgency) {
      case 'sold-out':
        return {
          bg: 'bg-gray-100 dark:bg-gray-800',
          text: 'text-gray-700 dark:text-gray-200',
          icon: 'text-gray-500 dark:text-gray-400',
        };
      case 'high':
        return {
          bg: 'bg-danger-50 dark:bg-danger-500/15',
          text: 'text-danger-700 dark:text-danger-500',
          icon: 'text-danger-700 dark:text-danger-500',
        };
      case 'moderate':
        return {
          bg: 'bg-primary-50 dark:bg-primary-900/30',
          text: 'text-primary-700 dark:text-primary-300',
          icon: 'text-primary-600 dark:text-primary-400',
        };
      default:
        return {
          bg: 'bg-success-50 dark:bg-success-500/15',
          text: 'text-success-700 dark:text-success-500',
          icon: 'text-success-700 dark:text-success-500',
        };
    }
  };

  const colors = getColorClasses();

  const getIcon = () => {
    if (urgency === 'sold-out') return <XCircle className={clsx('w-4 h-4', colors.icon)} aria-hidden="true" />;
    if (urgency === 'high') return <AlertCircle className={clsx('w-4 h-4', colors.icon)} aria-hidden="true" />;
    return <CheckCircle className={clsx('w-4 h-4', colors.icon)} aria-hidden="true" />;
  };

  const getText = () => {
    if (spotsLeft === 0) return 'Sold Out';
    if (spotsLeft === 1) return '1 spot left';
    return `${spotsLeft} spots left`;
  };

  if (variant === 'compact') {
    return (
      <div className={clsx('inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium', colors.bg, colors.text, className)}>
        {getIcon()}
        <span>{getText()}</span>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <span className={clsx('inline-flex items-center gap-1 text-sm font-medium', colors.text, className)}>
        {getIcon()}
        <span>{getText()}</span>
      </span>
    );
  }

  return (
    <div className={clsx('flex items-center gap-2 p-3 md:p-4 rounded-lg', colors.bg, className)}>
      {getIcon()}
      <div className="flex-1">
        <p className={clsx('text-base md:text-lg font-bold', colors.text)}>{getText()}</p>
        {totalSpots > 0 && spotsLeft > 0 && (
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
            Out of {totalSpots} total spots
          </p>
        )}
      </div>
    </div>
  );
}
'''

files["src/components/ui/BookingProtection.jsx"] = r'''import { Shield, Check } from 'lucide-react';
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
'''

for path, content in files.items():
    p = Path(path)
    p.write_text(content, encoding='utf-8')
    print(path, p.stat().st_size, 'float' not in content if 'Coco' in path else True)
