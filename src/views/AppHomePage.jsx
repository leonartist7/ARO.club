'use client';
import { useLanguage } from '../contexts/LanguageContext';
import { useState } from 'react';
import { ArrowRight, Compass, MapPin, Plus, Sparkles } from 'lucide-react';
import { Link } from '../lib/navigation';
import { aroUser, opportunities } from '../data/aroApp';
import { AppAvatar } from '../components/app/AppPrimitives';
import { AppImage } from '../components/app/AppImage';
import { getDiscoveryFormationStatus, getFv1DiscoveryCopy } from '../i18n/fv1/discovery';
import { rebrandJourneyCopy } from '../i18n/rebrandJourney';

const homeOpportunityIds = ['river-photo-walk', 'shared-stories', 'repair-table'];
const homeOpportunities = homeOpportunityIds.map((id) => opportunities.find((opportunity) => opportunity.id === id)).filter(Boolean);

function OpeningCard({ opportunity, copy }) {
  const formationStatus = getDiscoveryFormationStatus(copy, opportunity);

  return (
    <article className="w-full rounded-[1.5rem] border border-white bg-bone p-4 text-ink shadow-2xl sm:max-w-[420px] sm:p-5">
      <div className="flex items-start gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold uppercase tracking-[0.17em] text-primary-700">{copy.home.exampleEyebrow}</p>
          <h2 className="mt-2 font-display text-[1.7rem] leading-[0.93] tracking-[-0.025em] sm:text-3xl">{opportunity.title}</h2>
          <p className="mt-3 text-base leading-6 text-ink/75">{opportunity.summary}</p>
        </div>
        <Link
          to={`/app/opportunities/${opportunity.id}`}
          aria-label={copy.opportunities.openExample(opportunity.title)}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-600 text-white transition hover:-translate-y-0.5 hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-800 focus-visible:ring-offset-2"
        >
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-ink/10 pt-3 text-sm font-semibold text-ink/65">
        <span className="inline-flex items-center gap-1.5"><Compass className="h-4 w-4 text-primary-500" aria-hidden="true" /> {opportunity.time}</span>
        <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4 text-primary-500" aria-hidden="true" /> {opportunity.distance}</span>
      </div>
      <div className="mt-3 flex items-start gap-3">
        <div className="flex -space-x-2 pt-0.5" aria-hidden="true">
          <AppAvatar initials="MA" size="sm" />
          <AppAvatar initials="TR" size="sm" />
          <AppAvatar initials="JL" size="sm" />
        </div>
        <div className="min-w-0 text-base leading-6 text-ink/70">
          <p className="font-bold text-ink">{copy.examplePlaces(opportunity.exampleCount, opportunity.capacity)}</p>
          <p>{copy.exampleMinimum(opportunity.minimum)}</p>
          <p className="mt-1">{formationStatus}</p>
        </div>
      </div>
    </article>
  );
}

function ExplorePath({ copy, journey }) {
  return (
    <Link to="/app/opportunities" className="group block rounded-[1.75rem] border border-ink/10 bg-white/70 p-5 transition hover:border-primary-500/40 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:border-bone/10 dark:bg-gray-900/65 dark:hover:bg-gray-900 sm:p-6">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-700 dark:text-primary-300">{copy.home.worldEyebrow}</p>
      <h2 className="mt-3 font-display text-3xl leading-tight">{journey.examples}</h2>
      <p className="mt-4 text-base leading-7 text-content-secondary dark:text-content-darkSecondary">{journey.noProgress}</p>
      <span className="mt-4 inline-flex min-h-11 items-center gap-1 text-sm font-bold text-primary-700 dark:text-primary-300">{journey.examples}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
    </Link>
  );
}

function LivingWorldStage({ activeOpportunity, onSelect, copy }) {
  return (
    <section className="overflow-hidden rounded-[2rem] bg-ink shadow-[0_24px_70px_rgba(83,55,29,0.18)] sm:rounded-[2.5rem]">
      <div data-fv1-home-scene className="relative aspect-video overflow-hidden bg-[#d8b58b]">
        <AppImage
          src="/aro-portal-home-v1.png"
          alt="A person standing beside an illuminated portal overlooking a river at sunset"
          variant="hero"
          priority
          className="absolute inset-0 h-full w-full object-contain"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(32,21,12,0.44),transparent_32%,transparent_70%,rgba(28,18,10,0.3))]" aria-hidden="true" />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-3 sm:p-5">
          <div className="max-w-[260px] rounded-2xl bg-bone/90 p-3 text-ink shadow-sm backdrop-blur-sm sm:max-w-[330px]">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-700">{copy.home.greeting(aroUser.name.split(' ')[0])}</p>
            <p className="mt-2 font-display text-lg leading-[0.98] tracking-[-0.025em] sm:text-2xl">{copy.home.question}</p>
          </div>
          <div className="rounded-full border border-ink/10 bg-bone/90 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-ink shadow-sm backdrop-blur-sm sm:text-xs">{copy.home.place}</div>
        </div>
      </div>

      <div className="grid gap-4 p-4 sm:p-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <OpeningCard opportunity={activeOpportunity} copy={copy} />
        <div className="flex flex-wrap items-center gap-3 border-t border-bone/15 pt-4 lg:max-w-[230px] lg:flex-col lg:items-start lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
          <span className="text-sm font-bold text-bone/85">{copy.home.moreExamples}</span>
          <div className="flex items-center gap-2" role="group" aria-label={copy.home.moreExamples}>
            {homeOpportunities.map((opportunity) => (
              <button
                key={opportunity.id}
                type="button"
                aria-pressed={opportunity.id === activeOpportunity.id}
                aria-label={opportunity.title}
                onClick={() => onSelect(opportunity.id)}
                className={`h-11 w-11 shrink-0 rounded-full border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-200 ${opportunity.id === activeOpportunity.id ? 'border-bone bg-primary-600 shadow-[0_0_0_3px_rgba(244,208,0,0.26)]' : 'border-white/40 bg-white/15 hover:bg-white/25'}`}
              >
                <span className="sr-only">{opportunity.title}</span>
                <span className="mx-auto block h-2 w-2 rounded-full bg-white" aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AppHomePage() {
  const language = useLanguage().language;
  const copy = getFv1DiscoveryCopy(language);
  const journey = rebrandJourneyCopy[language] ?? rebrandJourneyCopy.en;
  const [activeOpportunityId, setActiveOpportunityId] = useState('river-photo-walk');
  const activeOpportunity = homeOpportunities.find((opportunity) => opportunity.id === activeOpportunityId) ?? homeOpportunities[0];

  return (
    <div lang={language} className="px-4 py-4 sm:px-8 sm:py-6">
      <section className="mb-5 rounded-[1.5rem] bg-brand-orange p-5 text-ink dark:bg-primary-800 dark:text-bone sm:p-7" aria-labelledby="app-first-step-title">
        <p className="text-sm font-extrabold uppercase tracking-[0.12em]">{journey.benefits}</p>
        <h1 id="app-first-step-title" className="mt-2 font-display text-3xl font-extrabold leading-tight text-bone sm:text-4xl">{journey.appTitle}</h1>
        <p className="mt-2 max-w-2xl text-base font-semibold leading-7">{journey.appBody}</p>
        <div className="mt-5 flex flex-wrap gap-3"><Link to="/app/opportunities" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-bone px-5 py-2 font-extrabold text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-brand-orange">{journey.find}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link><Link to="/app/create?mode=share" className="inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-ink px-4 py-2 font-bold text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink dark:border-bone dark:text-bone">{journey.teach}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></div>
      </section>

      <LivingWorldStage activeOpportunity={activeOpportunity} onSelect={setActiveOpportunityId} copy={copy} />

      <div className="mt-4 grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
        <ExplorePath copy={copy} journey={journey} />
        <Link to="/app/world" className="group rounded-[1.75rem] bg-ink p-5 text-bone transition hover:bg-plum focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-300 sm:p-6">
          <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary-200">{copy.home.worldEyebrow}</p><h2 className="mt-3 font-display text-3xl leading-none">{copy.home.worldTitle}</h2></div><Compass className="h-5 w-5 text-secondary-200" aria-hidden="true" /></div>
          <div className="mt-6 flex items-center justify-between gap-4"><div className="flex -space-x-2" aria-hidden="true"><AppAvatar initials="JB" size="sm" /><AppAvatar initials="EM" size="sm" /><AppAvatar initials="KL" size="sm" /></div><span className="inline-flex min-h-11 items-center gap-1 text-sm font-bold text-secondary-200">{copy.home.openWorld} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span></div>
        </Link>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-[1.5rem] border border-primary-500/15 bg-primary-50/70 px-5 py-4 dark:bg-primary-900/15 sm:px-6">
        <div className="flex items-start gap-3"><Sparkles className="mt-1 h-5 w-5 shrink-0 text-primary-500" aria-hidden="true" /><p className="text-base leading-6 text-ink/70 dark:text-bone/75">{copy.home.seedPrompt}</p></div>
        <Link to="/app/create" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:text-primary-300"><Plus className="h-4 w-4" aria-hidden="true" /> {copy.home.openSeedStudio}</Link>
      </div>
    </div>
  );
}
