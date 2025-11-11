import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, User, Trophy, MapPin } from 'lucide-react';
import Button from '../ui/Button';
import { useStore } from '../../store/useStore';
import Avatar from '../ui/Avatar';

const navigation = [
  { name: 'Explore', href: '/explore' },
  { name: 'Map View', href: '/map' },
  { name: 'How It Works', href: '/how-it-works' },
  { name: 'For Teachers', href: '/for-teachers' },
];

/**
 * Header component with navigation
 */
export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { currentUser, isTeacher } = useStore();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-display font-bold gradient-text"
          >
            <span className="text-3xl">👅</span>
            TongueConnect
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-primary-500'
                    : 'text-gray-700 hover:text-primary-500'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/leaderboard">
              <Button variant="ghost" size="sm" icon={<Trophy className="w-4 h-4" />}>
                Leaderboard
              </Button>
            </Link>

            {currentUser ? (
              <>
                <Link to={isTeacher ? '/dashboard' : '/profile'}>
                  <Button variant="ghost" size="sm">
                    <Avatar
                      src={currentUser.photo}
                      alt={currentUser.name}
                      name={currentUser.name}
                      size="sm"
                    />
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
                <Button variant="primary" size="sm">
                  Sign Up
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-primary-50 text-primary-500'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/leaderboard"
                className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                🏆 Leaderboard
              </Link>
              {currentUser ? (
                <Link
                  to={isTeacher ? '/dashboard' : '/profile'}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </Link>
              ) : (
                <div className="flex flex-col gap-2 pt-2">
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                  <Button variant="primary" size="sm">
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
