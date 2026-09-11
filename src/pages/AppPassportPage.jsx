import { ArrowRight, Compass, HeartHandshake, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AppImage } from '../components/app/AppImage';
import { AppPanel, AppSectionHeading } from '../components/app/AppPrimitives';
import { passportEntries } from '../data/aroApp';
import { getFv1ReturnCopy } from '../i18n/fv1/return';

export default function AppPassportPage() {
  const language = localStorage.getItem('conversa-language') ?? 'en';
  const copy = getFv1ReturnCopy(language);

  return (
    <div lang={language} className="mx-auto max-w-[1200px] px-4 py-8 sm:px-8 sm:py-10 lg:px-12">
      <AppSectionHeading eyebrow={copy.passport.eyebrow} title={copy.passport.title}>
        <Link to="/app/opportunities" className="inline-flex min-h-11 items-center gap-2 text-base font-bold text-primary-700 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-primary-500 dark:text-primary-300">{copy.passport.nextLink} <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
      </AppSectionHeading>

      <aside data-fv1-direct-entry="passport" className="mt-6 border border-secondary-500/35 bg-secondary-50 p-4 dark:bg-secondary-900/15">
        <p className="text-base font-bold">{copy.passport.noticeTitle}</p>
        <p data-fv1-essential-copy className="mt-2 text-base leading-6 text-ink/70 dark:text-bone/75">{copy.passport.notice}</p>
      </aside>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(280px,0.7fr)]">
        <AppPanel className="overflow-hidden">
          <div className="relative min-h-[320px] overflow-hidden bg-ink p-6 text-bone aro-grid dark:bg-plum sm:p-8">
            <AppImage src="/aro-passport-life-map-v1.png" alt="Fictional twilight riverside life-map example" variant="hero" cropClass="object-[69%_center]" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,25,33,0.96)_0%,rgba(18,25,33,0.79)_44%,rgba(18,25,33,0.18)_100%),linear-gradient(0deg,rgba(18,25,33,0.5),transparent_58%)]" />
            <div className="absolute left-[20%] top-[28%] h-3 w-3 rounded-full bg-primary-400 shadow-[0_0_0_10px_rgba(222,67,37,0.12)]" /><div className="absolute left-[44%] top-[47%] h-3 w-3 rounded-full bg-secondary-300 shadow-[0_0_0_10px_rgba(239,193,75,0.12)]" /><div className="absolute right-[22%] top-[30%] h-3 w-3 rounded-full bg-moss shadow-[0_0_0_10px_rgba(104,115,90,0.18)]" />
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 600 320" fill="none" aria-hidden="true"><path d="M120 95C240 225 330 80 480 155" stroke="rgba(246,240,230,0.32)" strokeDasharray="5 8" /><path d="M260 145C330 80 390 80 480 155" stroke="rgba(239,193,75,0.5)" /></svg>
            <div className="relative z-10 max-w-sm"><p className="text-sm font-bold uppercase tracking-[0.16em] text-secondary-300">{copy.passport.mapLabel}</p><h1 className="mt-6 font-display text-5xl leading-[0.9]">{copy.passport.mapTitle}</h1><p data-fv1-essential-copy className="mt-4 text-base leading-6 text-bone/80">{copy.passport.mapBody}</p><p data-fv1-essential-copy className="mt-6 inline-flex items-center gap-2 border border-bone/15 bg-ink/40 px-3 py-2 text-base leading-6 text-bone/85"><span className="h-2 w-2 rounded-full bg-secondary-300" aria-hidden="true" /> {copy.passport.mapNote}</p></div>
          </div>
          <div className="grid grid-cols-1 border-t border-ink/10 dark:border-bone/10 sm:grid-cols-3">{copy.passport.stats.map((stat, index) => <div key={stat.label} className={`p-5 ${index ? 'border-t border-ink/10 dark:border-bone/10 sm:border-l sm:border-t-0' : ''}`}><p className="font-display text-3xl">{stat.value}</p><p data-fv1-essential-copy className="mt-1 text-base leading-6 text-ink/65 dark:text-bone/70">{stat.label}</p></div>)}</div>
        </AppPanel>
        <div className="space-y-6"><AppPanel className="p-6"><HeartHandshake className="h-6 w-6 text-primary-500" aria-hidden="true" /><h2 className="mt-5 font-display text-3xl">{copy.passport.contributionTitle}</h2><p data-fv1-essential-copy className="mt-3 text-base leading-6 text-ink/65 dark:text-bone/70">{copy.passport.contributionBody}</p></AppPanel><AppPanel className="p-6"><Compass className="h-6 w-6 text-sky" aria-hidden="true" /><h2 className="mt-5 font-display text-3xl">{copy.passport.intentionTitle}</h2><p data-fv1-essential-copy className="mt-3 text-base leading-6 text-ink/65 dark:text-bone/70">{copy.passport.intentionBody}</p></AppPanel></div>
      </div>

      <section className="mt-14"><AppSectionHeading eyebrow={copy.passport.recentEyebrow} title={copy.passport.recentTitle}><span className="text-base font-semibold text-ink/55 dark:text-bone/60">{copy.common.previewOnly}</span></AppSectionHeading><div className="mt-5 divide-y divide-ink/10 border-y border-ink/10 dark:divide-bone/10 dark:border-bone/10">{passportEntries.map((entry) => <article key={entry.title} data-fv1-passport-entry className="grid gap-4 py-5 sm:grid-cols-[80px_92px_1fr_auto] sm:items-center"><div className="flex items-center gap-2 sm:block"><span className="text-sm font-bold tracking-[0.14em] text-primary-600 dark:text-primary-300">{entry.month}</span><span className="font-display text-3xl">{entry.day}</span></div><div className="h-20 w-full overflow-hidden rounded-2xl sm:w-[92px]"><AppImage src={entry.image} alt="" variant="thumbnail" cropClass={entry.imagePosition} className="h-full w-full object-cover" /></div><div><p className="text-sm font-bold uppercase tracking-[0.14em] text-ink/45 dark:text-bone/50">{copy.common.example}</p><h2 className="mt-1 font-display text-2xl">{entry.title}</h2><p data-fv1-essential-copy className="mt-1 text-base leading-6 text-ink/60 dark:text-bone/65">{entry.meta}</p></div><span className="inline-flex items-center gap-2 text-sm font-bold text-ink/60 dark:text-bone/65"><Sparkles className="h-4 w-4 text-secondary-500" aria-hidden="true" /> {copy.passport.recentStatus}</span></article>)}</div></section>
    </div>
  );
}
