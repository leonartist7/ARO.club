import { useState, useEffect } from 'react';
import { Outlet, NavLink, Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  CalendarCheck,
  Star,
  GraduationCap,
  Menu,
  X,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { supabase } from '../../lib/supabase';
import { getPendingBookingsCount } from '../../lib/admin';

function SidebarNav({ items, onClose }) {
  return (
    <nav className="flex flex-col gap-1 p-4">
      <div className="flex items-center gap-2 px-3 py-4 mb-4 border-b border-gray-200 dark:border-gray-700">
        <ShieldCheck className="h-6 w-6 text-primary-500 flex-shrink-0" />
        <span className="font-display font-bold text-gray-900 dark:text-gray-100 text-lg">
          Admin
        </span>
      </div>

      {items.map(({ to, label, icon: Icon, end, badge }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          onClick={onClose}
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
              isActive
                ? 'bg-primary-500 text-white'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            )
          }
        >
          <Icon className="h-4 w-4 flex-shrink-0" />
          <span className="flex-1">{label}</span>
          {badge > 0 && (
            <span className="ml-auto min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold">
              {badge > 99 ? '99+' : badge}
            </span>
          )}
        </NavLink>
      ))}

      <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-700">
        <Link
          to="/"
          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          onClick={onClose}
        >
          <ExternalLink className="h-4 w-4" />
          Back to site
        </Link>
      </div>
    </nav>
  );
}

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [badges, setBadges] = useState({ bookings: 0, reviews: 0 });
  const location = useLocation();

  useEffect(() => {
    getPendingBookingsCount().then(({ count }) => {
      setBadges((prev) => ({ ...prev, bookings: count }));
    });

    const ch = supabase
      .channel('admin-live')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'bookings' },
        (payload) => {
          if (payload.new?.status === 'pending') {
            setBadges((prev) => ({ ...prev, bookings: prev.bookings + 1 }));
          }
        }
      )
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'reviews' },
        () => {
          setBadges((prev) => ({ ...prev, reviews: prev.reviews + 1 }));
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(ch); };
  }, []);

  // Clear badge when admin navigates to the relevant section
  useEffect(() => {
    if (location.pathname === '/admin/bookings') {
      setBadges((prev) => ({ ...prev, bookings: 0 }));
    } else if (location.pathname === '/admin/reviews') {
      setBadges((prev) => ({ ...prev, reviews: 0 }));
    }
  }, [location.pathname]);

  const navItems = [
    { to: '/admin',             label: 'Dashboard',   icon: LayoutDashboard, end: true },
    { to: '/admin/users',       label: 'Users',        icon: Users },
    { to: '/admin/teachers',    label: 'Teachers',     icon: GraduationCap },
    { to: '/admin/experiences', label: 'Experiences',  icon: BookOpen },
    { to: '/admin/bookings',    label: 'Bookings',     icon: CalendarCheck, badge: badges.bookings },
    { to: '/admin/reviews',     label: 'Reviews',      icon: Star, badge: badges.reviews },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-56 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 fixed inset-y-0 left-0">
        <SidebarNav items={navItems} />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar drawer */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-56 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform lg:hidden',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <button
          className="absolute top-4 right-4 p-1 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
          onClick={() => setSidebarOpen(false)}
        >
          <X className="h-5 w-5" />
        </button>
        <SidebarNav items={navItems} onClose={() => setSidebarOpen(false)} />
      </aside>

      {/* Main content */}
      <div className="flex-1 lg:ml-56">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 lg:px-8 h-14 flex items-center gap-4">
          <button
            className="lg:hidden p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <ShieldCheck className="h-4 w-4 text-primary-500" />
            Admin Panel
          </div>
        </header>

        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
