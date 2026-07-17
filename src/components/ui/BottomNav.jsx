import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, Gamepad2, Ticket, User } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useLanguage } from '../../contexts/LanguageContext';

const TABS = [
  { key: 'home', href: '/', icon: Home, labelKey: 'nav.home', match: (p) => p === '/' },
  { key: 'explore', href: '/explore', icon: Compass, labelKey: 'nav.explore', match: (p) => p.startsWith('/explore') || p.startsWith('/experience') },
  { key: 'play', href: '/games', icon: Gamepad2, labelKey: 'nav.play', match: (p) => p.startsWith('/games') || p.startsWith('/shop') || p.startsWith('/character') },
  { key: 'bookings', href: '/bookings', icon: Ticket, labelKey: 'nav.bookings', match: (p) => p.startsWith('/bookings') },
  { key: 'profile', href: '/profile', icon: User, labelKey: 'nav.profile', match: (p) => p.startsWith('/profile') || p.startsWith('/student-dashboard') },
];

/**
 * Mobile app-feel tab bar ? fixed bottom, <md only.
 * Hide on scroll down, reveal on scroll up. Coral active pill.
 */
export default function BottomNav() {
  const location = useLocation();
  const { t } = useLanguage();
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  // Hide on admin / sober surfaces
  const path = location.pathname;
  const suppress =
    path.startsWith('/admin') ||
    path.startsWith('/login') ||
    path.startsWith('/signup') ||
    path.startsWith('/choose-role') ||
    path.startsWith('/forgot') ||
    path.startsWith('/onboarding') ||
    path.startsWith('/auth');

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastY.current && y > 64) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (suppress) return null;

  return (
    <nav
      aria-label="Primary"
      className={cn(
        'md:hidden fixed bottom-0 inset-x-0 z-50',
        'bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl',
        'border-t border-gray-200 dark:border-gray-800',
        'transition-transform duration-300 ease-out',
        'pb-[env(safe-area-inset-bottom)]',
        hidden && 'translate-y-full'
      )}
    >
      <ul className="flex items-stretch justify-around px-1 pt-1 pb-1">
        {TABS.map((tab) => {
          const active = tab.match(path);
          const Icon = tab.icon;
          const label = t(tab.labelKey);
          return (
            <li key={tab.key} className="flex-1">
              <Link
                to={tab.href}
                className={cn(
                  'flex flex-col items-center justify-center gap-0.5 min-h-14 w-full',
                  'text-xs font-medium rounded-xl mx-auto max-w-[4.5rem]',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-inset',
                  'transition-colors duration-200',
                  active
                    ? 'text-primary-700 dark:text-primary-300'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                )}
                aria-current={active ? 'page' : undefined}
              >
                <span
                  className={cn(
                    'inline-flex items-center justify-center w-12 h-8 rounded-full transition-colors',
                    active && 'bg-primary-100 dark:bg-primary-900/40'
                  )}
                >
                  <Icon className="w-5 h-5" aria-hidden="true" strokeWidth={active ? 2.5 : 2} />
                </span>
                <span className="truncate px-0.5">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
