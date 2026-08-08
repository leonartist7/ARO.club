from pathlib import Path

# Force yellow tokens (appealing warm yellow, not coral)
Path("tailwind.config.js").write_text(r'''/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // PRIMARY — Warm brand yellow (visible, not neon flash)
        primary: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#F5C518',
          500: '#EAB308',
          600: '#CA8A04',
          700: '#A16207',
          800: '#854D0E',
          900: '#713F12',
        },
        // SECONDARY — Soft charcoal for supporting UI (no teal gradient pair)
        secondary: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
        // ACCENT — Gold for gamification only
        accent: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        success: { 50: '#ECFDF3', 500: '#16A34A', 700: '#15803D' },
        warning: { 50: '#FFFBEB', 500: '#F59E0B', 700: '#B45309' },
        danger: { 50: '#FEF2F2', 500: '#EF4444', 700: '#B91C1C' },
        info: { 50: '#EFF6FF', 500: '#3B82F6', 700: '#1D4ED8' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'shimmer': 'shimmer 2s infinite',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'slide-out-right': 'slideOutRight 0.2s ease-in',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pop': 'pop 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideOutRight: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        pop: {
          '0%': { transform: 'scale(0.8)' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
''', encoding='utf-8')
print("tailwind yellow written")

# index.css solid yellow brand text
css = Path("src/index.css").read_text(encoding="utf-8")
if "from-primary-500 to-secondary-500" in css:
    css = css.replace(
        "@apply bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent;",
        "@apply text-primary-600 dark:text-primary-400;",
    )
Path("src/index.css").write_text(css, encoding="utf-8")

# Header: public links only in bar; account items ONLY in dropdown
Path("src/components/layout/Header.jsx").write_text(r'''import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  User,
  Trophy,
  LogOut,
  Settings,
  LayoutDashboard,
  Shield,
  Gamepad2,
  Heart,
  Ticket,
  ChevronDown,
} from 'lucide-react';
import Button from '../ui/Button';
import ThemeToggle from '../ui/ThemeToggle';
import LanguageToggle from '../ui/LanguageToggle';
import Avatar from '../ui/Avatar';
import { useStore } from '../../store/useStore';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { cn } from '../../utils/cn';

/** Public marketing links only — app pages live in the account dropdown */
const publicNav = [
  { name: 'nav.explore', href: '/explore' },
  { name: 'nav.howItWorks', href: '/how-it-works' },
  { name: 'nav.forTeachers', href: '/for-teachers' },
];

/**
 * Sticky header: yellow brand wordmark, public nav, Sign in/up,
 * account dropdown for Play / Bookings / Profile / dashboards.
 */
export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = useStore((state) => state.currentUser);
  const setCurrentUser = useStore((state) => state.setCurrentUser);
  const { t } = useLanguage();
  const { user, profile } = useAuth();

  const isSignedIn = Boolean(user || currentUser);
  const role = profile?.role || (currentUser?.isTeacher ? 'teacher' : currentUser ? 'student' : null);
  const isAdmin = role === 'admin';
  const isTeacher = role === 'teacher' || currentUser?.isTeacher;

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  const handleSignOut = () => {
    setCurrentUser(null);
    setUserMenuOpen(false);
    navigate('/');
  };

  const displayName = profile?.name || currentUser?.name || user?.email || 'User';
  const displayEmail = profile?.email || currentUser?.email || user?.email || '';
  const displayPhoto = profile?.photo || currentUser?.photo;

  const menuItem = (active) =>
    cn(
      'flex items-center gap-3 px-4 py-2.5 min-h-11 text-sm transition-colors w-full text-left',
      active
        ? 'bg-primary-50 dark:bg-primary-900/25 text-primary-800 dark:text-primary-300 font-medium'
        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800'
    );

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Brand */}
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-display font-bold text-primary-600 dark:text-primary-400 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-lg"
          >
            <span
              className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-primary-500 text-lg shadow-sm"
              aria-hidden="true"
            >
              🦎
            </span>
            Tonguee
          </Link>

          {/* Desktop: public links only */}
          <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {publicNav.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'text-sm font-medium min-h-11 px-3 inline-flex items-center rounded-lg transition-colors',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
                  isActive(item.href)
                    ? 'text-primary-800 dark:text-primary-300 bg-primary-50 dark:bg-primary-900/25'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900'
                )}
              >
                {t(item.name)}
              </Link>
            ))}
          </div>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <LanguageToggle />
            <ThemeToggle />

            <Link to="/explore">
              <Button variant="primary" size="sm">
                {t('nav.findExperience')}
              </Button>
            </Link>

            {isSignedIn ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserMenuOpen((v) => !v)}
                  className="inline-flex items-center gap-1.5 p-1 pl-1.5 pr-2 min-h-11 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                  aria-expanded={userMenuOpen}
                  aria-haspopup="menu"
                  aria-label="Account menu"
                >
                  <Avatar src={displayPhoto} alt={displayName} name={displayName} size="sm" />
                  <ChevronDown className="w-4 h-4 text-gray-500" aria-hidden="true" />
                </button>

                {userMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setUserMenuOpen(false)}
                      aria-hidden="true"
                    />
                    <div
                      role="menu"
                      className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 py-2 z-20"
                    >
                      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                          {displayName}
                        </p>
                        {displayEmail && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {displayEmail}
                          </p>
                        )}
                      </div>

                      <Link
                        to="/student-dashboard"
                        role="menuitem"
                        className={menuItem(isActive('/student-dashboard'))}
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <LayoutDashboard className="w-4 h-4" aria-hidden="true" />
                        {t('nav.studentDashboard')}
                      </Link>
                      <Link
                        to="/bookings"
                        role="menuitem"
                        className={menuItem(isActive('/bookings'))}
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <Ticket className="w-4 h-4" aria-hidden="true" />
                        {t('nav.bookings')}
                      </Link>
                      <Link
                        to="/games"
                        role="menuitem"
                        className={menuItem(isActive('/games'))}
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <Gamepad2 className="w-4 h-4" aria-hidden="true" />
                        {t('nav.play')}
                      </Link>
                      <Link
                        to="/favorites"
                        role="menuitem"
                        className={menuItem(isActive('/favorites'))}
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <Heart className="w-4 h-4" aria-hidden="true" />
                        {t('nav.favorites')}
                      </Link>
                      <Link
                        to="/profile"
                        role="menuitem"
                        className={menuItem(isActive('/profile'))}
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <User className="w-4 h-4" aria-hidden="true" />
                        {t('nav.myProfile')}
                      </Link>
                      <Link
                        to="/leaderboard"
                        role="menuitem"
                        className={menuItem(isActive('/leaderboard'))}
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <Trophy className="w-4 h-4" aria-hidden="true" />
                        {t('nav.leaderboard')}
                      </Link>

                      {isTeacher && (
                        <Link
                          to="/dashboard"
                          role="menuitem"
                          className={menuItem(isActive('/dashboard'))}
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <Settings className="w-4 h-4" aria-hidden="true" />
                          {t('nav.teacherDashboard')}
                        </Link>
                      )}
                      {isAdmin && (
                        <Link
                          to="/admin"
                          role="menuitem"
                          className={menuItem(isActive('/admin'))}
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <Shield className="w-4 h-4" aria-hidden="true" />
                          {t('nav.adminConsole')}
                        </Link>
                      )}

                      <div className="border-t border-gray-200 dark:border-gray-800 mt-1 pt-1">
                        <button
                          type="button"
                          role="menuitem"
                          onClick={handleSignOut}
                          className="flex items-center gap-3 px-4 py-2.5 min-h-11 text-sm text-danger-700 dark:text-danger-500 hover:bg-danger-50 dark:hover:bg-danger-500/10 w-full text-left"
                        >
                          <LogOut className="w-4 h-4" aria-hidden="true" />
                          {t('nav.signOut')}
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    {t('nav.signIn')}
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="outline" size="sm">
                    {t('nav.signUp')}
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-1">
            <LanguageToggle />
            <ThemeToggle />
            <button
              type="button"
              className="p-2 min-h-11 min-w-11 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800 space-y-1">
            {publicNav.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block px-3 py-3 min-h-11 rounded-lg text-sm font-medium text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-900"
                onClick={closeMobile}
              >
                {t(item.name)}
              </Link>
            ))}

            <Link to="/explore" onClick={closeMobile} className="block pt-2">
              <Button variant="primary" className="w-full">
                {t('nav.findExperience')}
              </Button>
            </Link>

            {isSignedIn ? (
              <div className="pt-3 mt-2 border-t border-gray-200 dark:border-gray-800 space-y-1">
                <p className="px-3 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Account
                </p>
                <Link to="/student-dashboard" className="block px-3 py-3 text-sm text-gray-800 dark:text-gray-100" onClick={closeMobile}>
                  {t('nav.studentDashboard')}
                </Link>
                <Link to="/bookings" className="block px-3 py-3 text-sm text-gray-800 dark:text-gray-100" onClick={closeMobile}>
                  {t('nav.bookings')}
                </Link>
                <Link to="/games" className="block px-3 py-3 text-sm text-gray-800 dark:text-gray-100" onClick={closeMobile}>
                  {t('nav.play')}
                </Link>
                <Link to="/profile" className="block px-3 py-3 text-sm text-gray-800 dark:text-gray-100" onClick={closeMobile}>
                  {t('nav.myProfile')}
                </Link>
                {isTeacher && (
                  <Link to="/dashboard" className="block px-3 py-3 text-sm text-gray-800 dark:text-gray-100" onClick={closeMobile}>
                    {t('nav.teacherDashboard')}
                  </Link>
                )}
                <button
                  type="button"
                  className="block w-full text-left px-3 py-3 text-sm text-danger-700 dark:text-danger-500"
                  onClick={() => {
                    closeMobile();
                    handleSignOut();
                  }}
                >
                  {t('nav.signOut')}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-3">
                <Link to="/login" onClick={closeMobile}>
                  <Button variant="outline" className="w-full">
                    {t('nav.signIn')}
                  </Button>
                </Link>
                <Link to="/signup" onClick={closeMobile}>
                  <Button variant="ghost" className="w-full">
                    {t('nav.signUp')}
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
''', encoding='utf-8')
print("Header written", Path("src/components/layout/Header.jsx").stat().st_size)

# Buttons: on yellow primary, dark text is often more readable than white on #CA8A04
# Keep white on 600 for brand punch; user wanted yellow visible
btn = Path("src/components/ui/Button.jsx").read_text(encoding="utf-8")
# ensure primary uses yellow tokens (primary-600)
if "bg-primary-600" not in btn:
    print("WARN button missing primary-600")
else:
    print("Button primary ok")
