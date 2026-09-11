import { ArrowLeft, Bell, CircleHelp, Globe2, LockKeyhole, Moon, ShieldCheck, UserRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AppPanel, AppSectionHeading } from '../components/app/AppPrimitives';
import { getFv1ReturnCopy } from '../i18n/fv1/return';

const icons = {
  account: UserRound,
  privacy: LockKeyhole,
  notifications: Bell,
  language: Globe2,
  appearance: Moon,
  support: CircleHelp,
};

export default function AppSettingsPage() {
  const language = localStorage.getItem('conversa-language') ?? 'en';
  const copy = getFv1ReturnCopy(language);

  return (
    <div lang={language} className="px-4 py-6 sm:px-8 sm:py-10">
      <Link to="/app/profile" className="inline-flex min-h-11 items-center gap-2 text-base font-bold text-ink/60 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-primary-500 dark:text-bone/65"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> {copy.settings.back}</Link>
      <AppSectionHeading className="mt-7" eyebrow={copy.settings.eyebrow} title={copy.settings.title} />

      <aside data-fv1-direct-entry="settings" className="mt-6 border border-secondary-500/35 bg-secondary-50 p-4 dark:bg-secondary-900/15">
        <p className="text-base font-bold">{copy.settings.noticeTitle}</p>
        <p data-fv1-essential-copy className="mt-2 text-base leading-6 text-ink/70 dark:text-bone/75">{copy.settings.notice}</p>
      </aside>

      <AppPanel className="mt-7 divide-y divide-ink/10 dark:divide-bone/10">
        {copy.settings.rows.map((row) => {
          const Icon = icons[row.id];
          return (
            <article key={row.id} data-fv1-setting-row={row.id} className="flex min-h-[92px] min-w-0 flex-wrap items-center gap-4 px-5 py-4 sm:flex-nowrap sm:px-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary-50 text-secondary-700 dark:bg-secondary-900/20 dark:text-secondary-300"><Icon className="h-5 w-5" aria-hidden="true" /></span>
              <div className="min-w-[10rem] flex-1"><h2 className="text-base font-bold">{row.label}</h2><p data-fv1-essential-copy className="mt-1 text-base leading-6 text-ink/60 dark:text-bone/65">{row.detail}</p></div>
              <span className="w-full min-w-0 break-words text-left text-sm font-bold text-ink/50 dark:text-bone/55 sm:w-auto sm:max-w-[12rem] sm:shrink-0 sm:text-right">{copy.common.unavailable}</span>
            </article>
          );
        })}
      </AppPanel>

      <AppPanel className="mt-6 flex items-start gap-4 bg-secondary-50 p-5 dark:bg-secondary-900/15"><ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-moss" aria-hidden="true" /><div><h2 className="text-base font-bold">{copy.settings.trustTitle}</h2><p data-fv1-essential-copy className="mt-2 text-base leading-6 text-ink/65 dark:text-bone/70">{copy.settings.trustBody}</p></div></AppPanel>
      <p className="mt-8 text-center text-sm text-ink/50 dark:text-bone/55">{copy.settings.version}</p>
    </div>
  );
}
