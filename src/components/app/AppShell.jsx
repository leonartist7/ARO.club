'use client';
import React from 'react';
import { Link, useLocation } from '../../lib/navigation';
import { ArrowLeft, Bookmark, Compass, Home, MessageCircle, Plus, Search } from 'lucide-react';
import AroMark from '../brand/AroMark';
import { AppAvatar } from './AppPrimitives';
import { useLanguage } from '../../contexts/LanguageContext';
import { fv1ShellCopy } from '../../i18n/fv1/shell';
import { experienceCopy } from '../../i18n/experience/copy';

const destinations = [
  { id: 'home', to: '/app', icon: Home, active: p => p === '/app' },
  { id: 'explore', to: '/app/world', icon: Compass, active: p => /^\/app\/(world|opportunities)/.test(p) },
  { id: 'create', to: '/app/create', icon: Plus, active: p => p === '/app/create' },
  { id: 'messages', to: '/app/messages', icon: MessageCircle, active: p => /^\/app\/(messages|circles)/.test(p) },
  { id: 'saved', to: '/app/saved', icon: Bookmark, active: p => p === '/app/saved' || p === '/app/library' },
];
export default function AppShell({ children }) {
  const { pathname } = useLocation();
  const { language } = useLanguage();
  const c = experienceCopy(language);
  const copy = fv1ShellCopy[language] ?? fv1ShellCopy.en;
  return (
    <div className="ef-shell min-h-screen bg-bone text-ink dark:bg-gray-950 dark:text-bone" lang={language}>
      <a href="#app-main" className="ef-skip">{c('skip')}</a>
      <header className="ef-header">
        <div className="ef-header-inner">
          <Link to="/app" className="ef-brand" aria-label={`ARO · ${c('home')}`}><AroMark size="sm" /><span>ARO</span></Link>
          <p className="ef-place">Calgary <span aria-hidden="true">·</span> {c('world')}</p>
          <div className="ef-header-actions">
            <Link to="/app/opportunities" className="ef-icon" aria-label={c('search')}><Search size={20} aria-hidden="true" /></Link>
            <Link to="/app/personalize" className="ef-icon" aria-label={c('world')}><AppAvatar initials="MA" size="sm" /></Link>
          </div>
        </div>
      </header>
      <p className="ef-preview">{copy.notice}</p>
      <main id="app-main" tabIndex="-1" className="mx-auto min-h-[calc(100vh-5rem)] max-w-[1180px] pb-28 [overflow-wrap:anywhere]">
        {pathname === '/app/create' && <Link to="/app/world" className="ef-back"><ArrowLeft size={16} aria-hidden="true" />{c('back')}</Link>}
        {children}
      </main>
      <nav aria-label={c('primary')} className="ef-nav">
        <div>{destinations.map(({ id, to, icon: Icon, active }) => (
          <Link key={id} to={to} aria-current={active(pathname) ? 'page' : undefined} className={id === 'create' ? 'ef-nav-create' : ''}>
            <span><Icon size={21} aria-hidden="true" /></span><span>{c(id)}</span>
          </Link>
        ))}</div>
      </nav>
    </div>
  );
}
