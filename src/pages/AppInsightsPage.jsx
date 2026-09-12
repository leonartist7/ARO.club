import { ArrowRight, BookOpen, CheckCircle2, Compass, HeartHandshake, MapPin, Sparkles, UsersRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AppImage } from '../components/app/AppImage';
import { AppPanel, AppSectionHeading } from '../components/app/AppPrimitives';
import { getFv1ReturnCopy } from '../i18n/fv1/return';

const metricIcons = [Compass, UsersRound, MapPin, HeartHandshake, Sparkles, CheckCircle2];

export default function AppInsightsPage() {
  const language = localStorage.getItem('conversa-language') ?? 'en';
  const copy = getFv1ReturnCopy(language);

  return (
    <div lang={language} className="px-4 py-6 sm:px-8 sm:py-10">
      <AppSectionHeading eyebrow={copy.insights.eyebrow} title={copy.insights.title}>
        <Link to="/app/passport" className="inline-flex min-h-11 items-center gap-2 text-base font-bold text-primary-700 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-primary-500 dark:text-primary-300">
          {copy.insights.passportLink} <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </AppSectionHeading>

      <aside data-fv1-direct-entry="insights" className="mt-6 border border-secondary-500/35 bg-secondary-50 p-4 dark:bg-secondary-900/15">
        <p className="text-base font-bold">{copy.insights.noticeTitle}</p>
        <p data-fv1-essential-copy className="mt-2 text-base leading-6 text-ink/70 dark:text-bone/75">{copy.insights.notice}</p>
      </aside>

      <div className="mt-6 border-b border-ink/10 pb-4 dark:border-bone/10">
        <p className="text-sm font-bold text-ink/70 dark:text-bone/75">{copy.insights.filterLabel}</p>
        <div className="mt-3 flex flex-wrap gap-2" aria-label={copy.insights.filterLabel}>
          {copy.insights.filters.map((filter) => <span key={filter} className="border border-ink/10 bg-white/60 px-3 py-2 text-sm font-semibold text-ink/70 dark:border-bone/10 dark:bg-gray-900/50 dark:text-bone/75">{filter} · {copy.common.unavailable}</span>)}
        </div>
      </div>

      <AppPanel className="relative mt-6 min-h-[330px] overflow-hidden bg-ink text-bone dark:bg-plum">
        <AppImage src="/aro-season-discovery-v1.png" alt={copy.insights.heroAlt} variant="hero" cropClass="object-[62%_center]" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,25,33,0.94)_0%,rgba(18,25,33,0.82)_35%,rgba(18,25,33,0.28)_70%,rgba(18,25,33,0.12)_100%),linear-gradient(0deg,rgba(18,25,33,0.55),transparent_56%)]" />
        <div className="relative flex min-h-[330px] max-w-xl flex-col p-6 sm:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-secondary-300">{copy.insights.seasonLabel}</p>
          <h1 className="mt-5 font-display text-5xl leading-[0.9]">{copy.insights.seasonTitle}</h1>
          <p data-fv1-essential-copy className="mt-5 max-w-md text-base leading-6 text-bone/80">{copy.insights.seasonProgress}</p>
          <div className="mt-4 h-2 max-w-sm overflow-hidden rounded-full bg-bone/15" aria-hidden="true"><div className="h-full w-[62%] rounded-full bg-gradient-to-r from-primary-500 to-secondary-300" /></div>
          <p data-fv1-essential-copy className="mt-auto w-fit border border-bone/15 bg-ink/45 px-3 py-2 text-base leading-6 text-bone/85"><span className="mr-2 inline-block h-2 w-2 rounded-full bg-secondary-300" aria-hidden="true" />{copy.insights.seasonNote}</p>
        </div>
      </AppPanel>

      <section className="mt-6 grid grid-cols-1 gap-px overflow-hidden border border-ink/10 bg-ink/10 dark:border-bone/10 dark:bg-bone/10 sm:grid-cols-2 lg:grid-cols-3">
        {copy.insights.metrics.map((metric, index) => <Metric key={metric.label} icon={metricIcons[index]} value={metric.value} label={metric.label} example={copy.common.example} />)}
      </section>

      <section className="mt-10">
        <div className="flex items-end justify-between gap-4"><div><p className="text-sm font-bold uppercase tracking-[0.16em] text-ink/70 dark:text-bone/75">{copy.insights.milestonesEyebrow}</p><h2 className="mt-2 font-display text-3xl">{copy.insights.milestonesTitle}</h2></div><BookOpen className="h-6 w-6 text-primary-500" aria-hidden="true" /></div>
        <div className="mt-5 divide-y divide-ink/10 border-y border-ink/10 dark:divide-bone/10 dark:border-bone/10">
          {copy.insights.milestones.map((item, index) => <div key={item} className="flex flex-wrap items-center gap-4 py-4"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary-50 font-bold text-secondary-700 dark:bg-secondary-900/30 dark:text-secondary-300">{index + 1}</span><p className="min-w-0 flex-1 text-base font-semibold">{item}</p><span className="text-sm font-bold text-moss dark:text-green-200">{copy.insights.milestoneStatus}</span></div>)}
        </div>
      </section>
    </div>
  );
}

function Metric({ icon: Icon, value, label, example }) {
  return <div className="bg-bone p-5 dark:bg-gray-900"><div className="flex items-center justify-between gap-3"><Icon className="h-5 w-5 text-primary-500" aria-hidden="true" /><span className="text-sm font-bold uppercase tracking-[0.12em] text-ink/70 dark:text-bone/75">{example}</span></div><p className="mt-4 font-display text-3xl">{value}</p><p data-fv1-essential-copy className="mt-2 text-base leading-6 text-ink/70 dark:text-bone/75">{label}</p></div>;
}