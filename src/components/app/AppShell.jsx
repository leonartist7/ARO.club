import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { BarChart3, Bell, BookOpen, Compass, Globe2, Home, Plus, Search } from 'lucide-react';
import AroMark from '../brand/AroMark';
import { AppAvatar } from './AppPrimitives';
import { appNavItems, aroUser } from '../../data/aroApp';
import { cn } from '../../utils/cn';

const iconMap = { home: Home, world: Globe2, insights: BarChart3, library: BookOpen };

function AppNavItem({ item }) {
  const Icon = iconMap[item.icon] ?? Compass;

  return (
    <NavLink
      to={item.to}
      end={item.to === '/app'}
      className={({ isActive }) => cn(
        'flex min-w-0 flex-1 flex-col items-center justify-center gap-1 px-2 py-2 text-[10px] font-bold uppercase tracking-[0.12em] transition-colors sm:text-[11px]',
        isActive ? 'text-primary-600 dark:text-primary-300' : 'text-ink/45 hover:text-ink dark:text-bone/45 dark:hover:text-bone'
      )}
    >
      {({ isActive }) => (
        <>
          <span className={cn('flex h-8 w-12 items-center justify-center rounded-full transition-colors', isActive && 'bg-primary-50 dark:bg-primary-900/25')}>
            <Icon className={cn('h-5 w-5', isActive && 'stroke-[2.5]')} aria-hidden="true" />
          </span>
          <span>{item.shortLabel}</span>
        </>
      )}
    </NavLink>
  );
}

export default function AppShell() {
  const location = useLocation();
  const isCreate = location.pathname === '/app/create';

  return (
    <div className="min-h-screen bg-bone text-ink dark:bg-gray-950 dark:text-bone">
      <header className="sticky top-0 z-40 border-b border-ink/10 bg-bone/95 backdrop-blur-xl dark:border-bone/10 dark:bg-gray-950/95">
        <div className="mx-auto flex h-16 max-w-[1180px] items-center justify-between px-4 sm:h-20 sm:px-8">
          <Link to="/app" className="flex items-center gap-2.5" aria-label="ARO app home">
            <AroMark size="sm" />
            <span className="text-lg font-bold tracking-[0.22em]">ARO</span>
          </Link>

          <div className="hidden items-center gap-2 text-xs font-semibold text-ink/50 dark:text-bone/50 md:flex">
            <span className="h-2 w-2 rounded-full bg-moss" aria-hidden="true" />
            Calgary · Your world
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <Link to="/app/world" aria-label="Search your world" className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink/55 hover:bg-ink/5 hover:text-ink dark:text-bone/55 dark:hover:bg-bone/5 dark:hover:text-bone"><Search className="h-5 w-5" aria-hidden="true" /></Link>
            <button type="button" aria-label="Notifications" className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-ink/55 hover:bg-ink/5 hover:text-ink dark:text-bone/55 dark:hover:bg-bone/5 dark:hover:text-bone"><Bell className="h-5 w-5" aria-hidden="true" /><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary-500" aria-hidden="true" /></button>
            <Link to="/app/profile" aria-label={`${aroUser.name} profile`} className="ml-1"><AppAvatar initials={aroUser.initials} size="sm" /></Link>
          </div>
        </div>
      </header>

      <main className="mx-auto min-h-[calc(100vh-5rem)] max-w-[1180px] pb-28">
        <Outlet />
      </main>

      <nav aria-label="Primary app navigation" className="fixed inset-x-0 bottom-0 z-50 border-t border-ink/10 bg-bone/95 px-3 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl dark:border-bone/10 dark:bg-gray-950/95">
        <div className="mx-auto flex h-[76px] max-w-[620px] items-stretch gap-1 sm:h-20">
          <AppNavItem item={appNavItems[0]} />
          <AppNavItem item={appNavItems[1]} />
          <NavLink to="/app/create" aria-label="Create or find an opportunity" className={cn('flex min-w-0 flex-1 flex-col items-center justify-center gap-1 px-2 text-[10px] font-bold uppercase tracking-[0.12em] sm:text-[11px]', isCreate ? 'text-primary-600 dark:text-primary-300' : 'text-ink/45 dark:text-bone/45')}>
            <span className={cn('flex h-12 w-12 items-center justify-center rounded-full border-4 border-bone bg-primary-500 text-white shadow-[0_7px_24px_rgba(222,67,37,0.28)] dark:border-gray-950', isCreate && 'bg-ink dark:bg-bone dark:text-ink')}><Plus className="h-6 w-6" aria-hidden="true" /></span>
            <span>{isCreate ? 'Close' : 'Create'}</span>
          </NavLink>
          <AppNavItem item={appNavItems[2]} />
          <AppNavItem item={appNavItems[3]} />
        </div>
      </nav>
    </div>
  );
}
