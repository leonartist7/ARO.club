import { useState, useRef, useEffect } from 'react';
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
