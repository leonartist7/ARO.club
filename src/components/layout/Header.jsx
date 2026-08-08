import { useState } from 'react';
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
  BookMarked,
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
            className="flex items-center gap-2 text-2xl font-display font-bold gradient-text shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-lg"
          >
            <span
              className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 text-lg shadow-sm"
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
                        to="/passport"
                        role="menuitem"
                        className={menuItem(isActive('/passport'))}
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <BookMarked className="w-4 h-4" aria-hidden="true" />
                        {t('nav.passport')}
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
