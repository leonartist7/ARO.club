import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  User,
  Trophy,
  LogOut,
  Settings,
  Gamepad2,
  ShoppingBag,
  MessageCircle,
  Home,
  Compass,
  Sparkles,
  Flame,
  Globe,
} from 'lucide-react';
import Button from '../ui/Button';
import ThemeToggle from '../ui/ThemeToggle';
import LanguageToggle from '../ui/LanguageToggle';
import Avatar from '../ui/Avatar';
import { usePlayerStore } from '../../store/usePlayerStore';
import { useLanguage } from '../../contexts/LanguageContext';

/** Navigation for visitors who haven't picked a role yet. */
const publicNav = [
  { key: 'nav.explore', href: '/explore', icon: Compass },
  { key: 'nav.mapView', href: '/map', icon: null },
  { key: 'nav.howItWorks', href: '/how-it-works', icon: null },
  { key: 'nav.forTeachers', href: '/for-teachers', icon: null },
];

/** The student's daily loop, in the order they'll use it. */
const studentNav = [
  { key: 'nav.home', href: '/student-dashboard', icon: Home },
  { key: 'nav.explore', href: '/explore', icon: Compass },
  { key: 'nav.games', href: '/games', icon: Gamepad2 },
  { key: 'nav.shop', href: '/shop', icon: ShoppingBag },
  { key: 'nav.chat', href: '/chat', icon: MessageCircle },
];

const teacherNav = [
  { key: 'nav.teacherDashboard', href: '/teacher/dashboard', icon: Home },
  { key: 'nav.explore', href: '/explore', icon: Compass },
  { key: 'nav.chat', href: '/chat', icon: MessageCircle },
];

/**
 * Header with navigation.
 *
 * The nav adapts to who's signed in: visitors get the marketing pages,
 * students get their daily loop, teachers get their tools. Points and streak
 * ride along in the header so progress is always visible - that's the hook
 * that brings people back tomorrow.
 */
export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const user = usePlayerStore((state) => state.user);
  const points = usePlayerStore((state) => state.points);
  const streak = usePlayerStore((state) => state.streak);
  const signOut = usePlayerStore((state) => state.signOut);

  const isTeacher = user?.role === 'teacher';
  const navigation = !user ? publicNav : isTeacher ? teacherNav : studentNav;

  const isActive = (path) => location.pathname === path;

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  const closeMenus = () => {
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg border-b border-gray-200/20 dark:border-gray-700/30 transition-colors">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link
            to={user ? (isTeacher ? '/teacher/dashboard' : '/student-dashboard') : '/'}
            className="flex items-center gap-2 text-2xl font-display font-bold gradient-text shrink-0"
          >
            <span className="text-3xl">👅</span>
            <span className="hidden sm:inline">Conversa</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-5">
            {navigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-primary-500'
                    : 'text-gray-700 dark:text-gray-300 hover:text-primary-500'
                }`}
              >
                {t(item.key)}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Live progress - only meaningful for students */}
            {user && !isTeacher && (
              <div className="flex items-center gap-2">
                <ProgressPill
                  icon={<Flame className="w-4 h-4" />}
                  value={streak}
                  tone="streak"
                  label={t('nav.dayStreak')}
                />
                <ProgressPill
                  icon={<Sparkles className="w-4 h-4" />}
                  value={points}
                  tone="points"
                  label={t('nav.points')}
                />
              </div>
            )}

            <LanguageToggle />
            <ThemeToggle />

            {!user && (
              <Link to="/leaderboard">
                <Button variant="ghost" size="sm" icon={<Trophy className="w-4 h-4" />}>
                  {t('nav.leaderboard')}
                </Button>
              </Link>
            )}

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Open user menu"
                  aria-expanded={userMenuOpen}
                >
                  <Avatar
                    src={user?.photo}
                    alt={user?.name || 'User'}
                    name={user?.name || 'User'}
                    size="sm"
                  />
                </button>

                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)}></div>
                    <div className="absolute right-0 mt-2 w-56 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 py-2 z-20">
                      <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                          {user?.name || 'User'}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {user?.email}
                        </p>
                      </div>

                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                        onClick={closeMenus}
                      >
                        <User className="w-4 h-4" />
                        {t('nav.myProfile')}
                      </Link>

                      {!isTeacher && (
                        <>
                          <Link
                            to="/passport"
                            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                            onClick={closeMenus}
                          >
                            <Globe className="w-4 h-4" />
                            {t('nav.passport')}
                          </Link>
                          <Link
                            to="/character-builder"
                            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                            onClick={closeMenus}
                          >
                            <Sparkles className="w-4 h-4" />
                            {t('nav.character')}
                          </Link>
                        </>
                      )}

                      <Link
                        to="/leaderboard"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                        onClick={closeMenus}
                      >
                        <Trophy className="w-4 h-4" />
                        {t('nav.leaderboard')}
                      </Link>

                      {isTeacher && (
                        <Link
                          to="/teacher/dashboard"
                          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                          onClick={closeMenus}
                        >
                          <Settings className="w-4 h-4" />
                          {t('nav.teacherDashboard')}
                        </Link>
                      )}

                      <button
                        onClick={() => {
                          closeMenus();
                          handleSignOut();
                        }}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 w-full text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        {t('nav.signOut')}
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link to="/choose-role">
                <Button variant="primary" size="sm">
                  {t('nav.getStarted')}
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile actions */}
          <div className="md:hidden flex items-center gap-2">
            {user && !isTeacher && (
              <ProgressPill
                icon={<Flame className="w-4 h-4" />}
                value={streak}
                tone="streak"
                label={t('nav.dayStreak')}
                compact
              />
            )}
            <ThemeToggle />
            <button
              type="button"
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile / tablet navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100 dark:border-gray-700">
            <div className="flex flex-col gap-2">
              {user && !isTeacher && (
                <div className="flex items-center gap-2 px-3 pb-2">
                  <ProgressPill
                    icon={<Sparkles className="w-4 h-4" />}
                    value={points}
                    tone="points"
                    label={t('nav.points')}
                  />
                </div>
              )}

              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-500'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                    onClick={closeMenus}
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                    {t(item.key)}
                  </Link>
                );
              })}

              <Link
                to="/leaderboard"
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={closeMenus}
              >
                <Trophy className="w-4 h-4" />
                {t('nav.leaderboard')}
              </Link>

              <div className="px-3 py-2">
                <LanguageToggle />
              </div>

              {user ? (
                <>
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    onClick={closeMenus}
                  >
                    <User className="w-4 h-4" />
                    {t('nav.myProfile')}
                  </Link>
                  <button
                    onClick={() => {
                      closeMenus();
                      handleSignOut();
                    }}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    {t('nav.signOut')}
                  </button>
                </>
              ) : (
                <div className="pt-2">
                  <Link to="/choose-role" onClick={closeMenus}>
                    <Button variant="primary" size="sm" fullWidth>
                      {t('nav.getStarted')}
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

/**
 * A points/streak counter that pops when the number changes - the little
 * reward moment that makes earning feel good.
 */
function ProgressPill({ icon, value, tone, label, compact = false }) {
  const tones = {
    streak:
      'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
    points:
      'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300',
  };

  return (
    <div
      className={`flex items-center gap-1.5 rounded-full font-semibold tabular-nums ${
        compact ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-sm'
      } ${tones[tone]}`}
      title={`${value} ${label}`}
    >
      {icon}
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: -8, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 8, opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
