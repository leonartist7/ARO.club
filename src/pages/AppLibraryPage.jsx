import { Bookmark, Coffee, Image, Library, UsersRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AppImage } from '../components/app/AppImage';
import { AppPanel, AppSectionHeading } from '../components/app/AppPrimitives';
import { getFv1ReturnCopy } from '../i18n/fv1/return';

const rows = [
  { id: 'river', icon: Image, image: '/aro-river-light-circle-v1.png', href: '/app/opportunities/river-photo-walk' },
  { id: 'creative', icon: UsersRound },
  { id: 'lisbon', icon: Library, image: '/aro-portal-home-v1.png' },
  { id: 'stories', icon: Coffee, image: '/aro-shared-stories-table-v1.png', href: '/app/opportunities/shared-stories' },
  { id: 'memories', icon: Bookmark },
  { id: 'items', icon: Library },
];

export default function AppLibraryPage() {
  const language = localStorage.getItem('conversa-language') ?? 'en';
  const copy = getFv1ReturnCopy(language);

  return (
    <div lang={language} className="px-4 py-6 sm:px-8 sm:py-10">
      <AppSectionHeading eyebrow={copy.library.eyebrow} title={copy.library.title} />

      <aside data-fv1-direct-entry="library" className="mt-6 border border-secondary-500/35 bg-secondary-50 p-4 dark:bg-secondary-900/15">
        <p className="text-base font-bold">{copy.library.noticeTitle}</p>
        <p data-fv1-essential-copy className="mt-2 text-base leading-6 text-ink/70 dark:text-bone/75">{copy.library.notice}</p>
      </aside>

      <section className="mt-6 border-b border-ink/10 pb-4 dark:border-bone/10" aria-labelledby="library-filter-label">
        <p id="library-filter-label" className="text-base font-bold">{copy.library.filterLabel}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {copy.library.filters.map((filter) => <span key={filter} data-fv1-library-filter className="border border-ink/10 bg-white/60 px-3 py-2 text-sm font-semibold text-ink/55 dark:border-bone/10 dark:bg-gray-900/50 dark:text-bone/60">{filter}</span>)}
        </div>
        <p data-fv1-essential-copy className="mt-3 text-base leading-6 text-ink/65 dark:text-bone/70">{copy.library.filterNote}</p>
      </section>

      <div className="mt-6 space-y-3">
        {rows.map((row) => <LibraryRow key={row.id} row={row} item={copy.library.items[row.id]} copy={copy} />)}
      </div>
    </div>
  );
}

function LibraryRow({ row, item, copy }) {
  const Icon = row.icon;
  const content = (
    <AppPanel className={`flex min-w-0 flex-wrap items-center gap-4 p-3 sm:flex-nowrap sm:p-4 ${row.href ? 'transition-colors group-hover:border-primary-500/50' : 'bg-white/45 dark:bg-gray-900/45'}`}>
      {row.image ? (
        <div className="h-16 w-16 shrink-0 overflow-hidden bg-ink sm:h-20 sm:w-20"><AppImage src={row.image} alt="" variant="thumbnail" className="h-full w-full object-cover" /></div>
      ) : (
        <div className="flex h-16 w-16 shrink-0 items-center justify-center bg-secondary-50 text-secondary-700 dark:bg-secondary-900/20 dark:text-secondary-300 sm:h-20 sm:w-20"><Icon className="h-6 w-6" aria-hidden="true" /></div>
      )}
      <div className="min-w-[10rem] flex-1">
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-primary-600 dark:text-primary-300">{item.type}</p>
        <h2 className="mt-1 break-words font-display text-2xl">{item.title}</h2>
        <p data-fv1-essential-copy className="mt-1 text-base leading-6 text-ink/60 dark:text-bone/65">{item.meta}</p>
      </div>
      <div className="w-full min-w-0 text-left sm:w-auto sm:max-w-[13rem] sm:shrink-0 sm:text-right">
        <p className={`break-words text-sm font-bold ${row.href ? 'text-primary-700 dark:text-primary-300' : 'text-ink/55 dark:text-bone/60'}`}>{row.href ? copy.library.openExample : copy.common.unavailable}</p>
      </div>
    </AppPanel>
  );

  if (row.href) {
    return <Link data-fv1-library-row={row.id} data-fv1-disposition="linked" to={row.href} className="group block min-h-11 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-primary-500">{content}</Link>;
  }

  return <div data-fv1-library-row={row.id} data-fv1-disposition="unavailable">{content}</div>;
}
