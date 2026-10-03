'use client';
import React from 'react';
import { Link, useLocation } from '../../lib/navigation';
import { BarChart3, Bell, BookOpen, Compass, Globe2, Home, Plus, Search } from 'lucide-react';
import { AroWordmark } from '../brand/AroMark';
import { AppAvatar } from './AppPrimitives';
import { appNavItems, aroUser } from '../../data/aroApp';
import { cn } from '../../utils/cn';
import { fv1ShellCopy } from '../../i18n/fv1/shell';
import { useLanguage } from '../../contexts/LanguageContext';

const iconMap = { home: Home, world: Globe2, insights: BarChart3, library: BookOpen };

function AppNavItem({ item, selected, label }) {
  const Icon = iconMap[item.icon] ?? Compass;

  return (
    <Link
      to={item.to}
      aria-current={selected ? 'page' : undefined}
      className={cn(
        'flex min-w-0 flex-1 flex-col items-center justify-center gap-1 px-2 py-2 text-[10px] font-bold uppercase tracking-[0.12em] transition-colors sm:text-[11px]',
        selected ? 'text-primary-600 dark:text-primary-300' : 'text-ink/45 hover:text-ink dark:text-bone/45 dark:hover:text-bone'
      )}
    >
      <span className={cn('flex h-8 w-12 max-w-full items-center justify-center rounded-full transition-colors', selected && 'bg-primary-50 dark:bg-primary-900/25')}>
        <Icon className={cn('h-5 w-5', selected && 'stroke-[2.5]')} aria-hidden="true" />
      </span>
      <span>{label}</span>
    </Link>
  );
}

export default function AppShell({ children }) {
  const location = useLocation();
  const isCreate = location.pathname === '/app/create';
  const { language } = useLanguage();
  const copy = fv1ShellCopy[language] ?? fv1ShellCopy.en;
  const selected = (item) => {
    if (item.to === '/app/world') return /^\/app\/(world|opportunities|circles)/.test(location.pathname);
    if (item.to === '/app/insights') return /^\/app\/(insights|passport)/.test(location.pathname);
    return location.pathname === item.to;
  };

  return (
    <div className="min-h-screen bg-bone text-ink dark:bg-gray-950 dark:text-bone">
      <header className="sticky top-0 z-40 border-b border-ink/10 bg-bone/95 backdrop-blur-xl dark:border-bone/10 dark:bg-gray-950/95">
        <div className="mx-auto flex min-h-16 max-w-[1180px] flex-wrap items-center justify-between gap-y-2 px-4 py-2 sm:min-h-20 sm:px-8">
          <Link to="/app" className="flex items-center gap-2.5" aria-label={copy.appHome}>
            <AroWordmark label="" />
          </Link>

          <div className="hidden items-center gap-2 text-xs font-semibold text-ink/50 dark:text-bone/50 md:flex">
            <span className="h-2 w-2 rounded-full bg-moss" aria-hidden="true" />
            {copy.worldLocation}
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <span className="relative inline-flex h-11 w-11 items-center justify-center rounded-full text-ink/55 dark:text-bone/55" role="img" aria-label={`${copy.searchPreview}. ${copy.unavailable}`}><Search className="h-5 w-5" aria-hidden="true" /></span>
            <span className="relative inline-flex h-11 w-11 items-center justify-center rounded-full text-ink/55 dark:text-bone/55" role="img" aria-label={`${copy.notificationsPreview}. ${copy.unavailable}`}><Bell className="h-5 w-5" aria-hidden="true" /></span>
            <Link to="/app/profile" aria-label={`${aroUser.name} ${copy.profile}`} className="ml-1"><AppAvatar initials={aroUser.initials} size="sm" /></Link>
          </div>
        </div>
      </header>

      <a href="#app-main" className="sr-only z-[60] rounded bg-bone px-4 py-3 font-bold text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4 dark:bg-gray-900 dark:text-bone">{copy.skip}</a>
      <p className="border-b border-ink/10 bg-secondary-50 px-4 py-2 text-center text-xs font-semibold text-ink/70 dark:border-bone/10 dark:bg-secondary-900/15 dark:text-bone/75">{copy.notice}</p>
      <main id="app-main" tabIndex="-1" className="mx-auto min-h-[calc(100vh-5rem)] max-w-[1180px] pb-28 [overflow-wrap:anywhere]">
        {children}
      </main>

      <nav aria-label={copy.navigation} className="fixed inset-x-0 bottom-0 z-50 border-t border-ink/10 bg-bone/95 px-3 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl dark:border-bone/10 dark:bg-gray-950/95">
        <div className="mx-auto flex h-[76px] max-w-[620px] items-stretch gap-1 sm:h-20">
          <AppNavItem item={appNavItems[0]} selected={selected(appNavItems[0])} label={copy.home} />
          <AppNavItem item={appNavItems[1]} selected={selected(appNavItems[1])} label={copy.world} />
          <Link to="/app/create" aria-current={isCreate ? 'page' : undefined} aria-label={copy.create} className={cn('flex min-w-0 flex-1 flex-col items-center justify-center gap-1 px-2 text-xs font-bold sm:text-sm', isCreate ? 'text-primary-600 dark:text-primary-300' : 'text-ink/70 dark:text-bone/70')}>
            <span className={cn('flex h-12 w-12 items-center justify-center rounded-full border-4 border-bone bg-primary-500 text-ink shadow-[0_7px_24px_rgba(244,208,0,0.28)] dark:border-gray-950', isCreate && 'bg-ink text-primary-500 dark:bg-bone dark:text-ink')}><Plus className="h-6 w-6" aria-hidden="true" /></span>
            <span>{copy.create}</span>
          </Link>
          <AppNavItem item={appNavItems[2]} selected={selected(appNavItems[2])} label={copy.insights} />
          <AppNavItem item={appNavItems[3]} selected={selected(appNavItems[3])} label={copy.library} />
        </div>
      </nav>
    </div>
  );
}
