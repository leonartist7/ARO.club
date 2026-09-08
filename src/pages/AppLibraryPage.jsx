import { useState } from 'react';
import { Bookmark, ChevronRight, Coffee, Image, Library, Search, UsersRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AppPanel, AppSectionHeading, AppAvatar } from '../components/app/AppPrimitives';

const tabs = ['All', 'Circles', 'People', 'Saved', 'Items'];
const items = [
  { title: 'Sunset Photography Walk', meta: 'Tonight · 7:00 PM', type: 'Circle', icon: Image, image: '/aro-river-light-circle-v1.png' },
  { title: 'Creative Minds Circle', meta: '12 members', type: 'Circle', icon: UsersRound },
  { title: 'Lisbon Trip', meta: 'May 10 – May 14', type: 'Memory', icon: Library, image: '/aro-portal-home-v1.png' },
  { title: 'Coffee & Conversations', meta: 'Tomorrow · 10:00 AM', type: 'Saved', icon: Coffee, image: '/aro-shared-stories-table-v1.png' },
  { title: 'Memories', meta: '45 moments', type: 'Collection', icon: Bookmark },
  { title: 'Your Items', meta: '12 collected', type: 'Collection', icon: Library },
];

export default function AppLibraryPage() {
  const [activeTab, setActiveTab] = useState('All');

  return (
    <div className="px-4 py-6 sm:px-8 sm:py-10">
      <AppSectionHeading eyebrow="Keep what matters close" title="Your Library"><button type="button" aria-label="Search library" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink/60 hover:border-primary-500 dark:border-bone/15 dark:text-bone/60"><Search className="h-4 w-4" aria-hidden="true" /></button></AppSectionHeading>
      <div className="mt-7 flex gap-5 overflow-x-auto border-b border-ink/10 dark:border-bone/10" role="tablist" aria-label="Library sections">{tabs.map((tab) => <button key={tab} type="button" role="tab" aria-selected={activeTab === tab} onClick={() => setActiveTab(tab)} className={`min-h-11 shrink-0 border-b-2 px-1 text-sm font-bold ${activeTab === tab ? 'border-primary-500 text-primary-700 dark:text-primary-300' : 'border-transparent text-ink/45 dark:text-bone/45'}`}>{tab}</button>)}</div>
      <div className="mt-6 space-y-3">{items.map(({ title, meta, type, icon: Icon, image }) => <Link key={title} to={type === 'Circle' && title.includes('Sunset') ? '/app/opportunities/river-photo-walk' : '/app/library'} className="group block"><AppPanel className="flex items-center gap-4 p-3 transition-colors hover:border-primary-500/50 sm:p-4">{image ? <div className="h-16 w-16 shrink-0 overflow-hidden bg-ink sm:h-20 sm:w-20"><img src={image} alt="" loading="lazy" className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-105 motion-reduce:transition-none" /></div> : <div className="flex h-16 w-16 shrink-0 items-center justify-center bg-secondary-50 text-secondary-700 dark:bg-secondary-900/20 dark:text-secondary-300 sm:h-20 sm:w-20"><Icon className="h-6 w-6" aria-hidden="true" /></div>}<div className="min-w-0 flex-1"><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary-600 dark:text-primary-300">{type}</p><h2 className="mt-1 truncate font-display text-2xl group-hover:text-primary-700 dark:group-hover:text-primary-300">{title}</h2><p className="mt-1 text-sm text-ink/55 dark:text-bone/55">{meta}</p></div>{type === 'Circle' && <div className="hidden -space-x-2 sm:flex"><AppAvatar initials="EM" size="sm" /><AppAvatar initials="JS" size="sm" /><AppAvatar initials="+8" size="sm" /></div>}<ChevronRight className="h-5 w-5 shrink-0 text-ink/30 transition-transform group-hover:translate-x-1 dark:text-bone/30" aria-hidden="true" /></AppPanel></Link>)}</div>
    </div>
  );
}
