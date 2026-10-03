'use client';
import { useLanguage } from '../contexts/LanguageContext';
import { useState } from 'react';
import { ArrowRight, Compass, MapPin, Plus, Sparkles } from 'lucide-react';
import { Link } from '../lib/navigation';
import { opportunities } from '../data/aroApp';
import { AppImage } from '../components/app/AppImage';
import { getDiscoveryFormationStatus, getFv1DiscoveryCopy } from '../i18n/fv1/discovery';
import { rebrandJourneyCopy } from '../i18n/rebrandJourney';

const homeOpportunityIds = ['river-photo-walk', 'shared-stories', 'repair-table'];
const homeOpportunities = homeOpportunityIds.map((id) => opportunities.find((opportunity) => opportunity.id === id)).filter(Boolean);

function OpeningCard({ opportunity, copy }) {
  const formationStatus = getDiscoveryFormationStatus(copy, opportunity);

  return (
    <article className="w-full rounded-[1.5rem] border border-ink/10 bg-bone p-4 text-ink sm:max-w-[640px] sm:p-5">
      <div className="flex items-start gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold uppercase tracking-[0.17em] text-primary-700">{copy.home.exampleEyebrow}</p>
          <h2 className="mt-2 font-display text-[1.7rem] leading-tight tracking-[-0.025em] sm:text-3xl">{opportunity.title}</h2>
          <p className="mt-3 text-base leading-6 text-ink/75">{opportunity.summary}</p>
        </div>
        <Link
          to={`/app/opportunities/${opportunity.id}`}
          aria-label={copy.opportunities.openExample(opportunity.title)}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-600 text-white transition motion-safe:hover:-translate-y-0.5 hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-800 focus-visible:ring-offset-2"
        >
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-ink/10 pt-3 text-sm font-semibold text-ink/65">
        <span className="inline-flex items-center gap-1.5"><Compass className="h-4 w-4 text-primary-500" aria-hidden="true" /> {opportunity.time}</span>
        <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4 text-primary-500" aria-hidden="true" /> {opportunity.distance}</span>
      </div>
      <div className="mt-3 border-t border-ink/10 pt-3">
        <div className="min-w-0 text-base leading-6 text-ink/70">
          <p className="font-bold text-ink">{copy.examplePlaces(opportunity.exampleCount, opportunity.capacity)}</p>
          <p>{copy.exampleMinimum(opportunity.minimum)}</p>
          <p className="mt-1">{formationStatus}</p>
        </div>
      </div>
    </article>
  );
}

function LivingWorldStage({ activeOpportunity, onSelect, copy }) {
  return (
    <section className="overflow-hidden rounded-[2rem] border border-ink/10 bg-white dark:border-bone/10 dark:bg-ink sm:rounded-[2.5rem]">
      <div className="flex flex-wrap items-start justify-between gap-3 p-4 text-ink dark:text-bone sm:p-6">
        <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-primary-700 dark:text-primary-300">{copy.home.previewState}</p><h2 className="mt-2 max-w-lg font-display text-2xl leading-tight sm:text-3xl">{copy.home.question}</h2></div>
        <p className="text-sm font-semibold text-ink/70 dark:text-bone/70">{copy.home.place}</p>
      </div>
      <div data-fv1-home-scene className="relative aspect-video overflow-hidden bg-[#d8b58b]">
        <AppImage
          src="/aro-portal-home-v1.png"
          alt="A person standing beside an illuminated portal overlooking a river at sunset"
          variant="hero"
          priority
          className="absolute inset-0 h-full w-full object-contain"
        />

      </div>

      <div className="grid gap-4 p-4 sm:p-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <OpeningCard opportunity={activeOpportunity} copy={copy} />
        <div className="flex flex-wrap items-center gap-3 border-t border-ink/15 dark:border-bone/15 pt-4 lg:max-w-[230px] lg:flex-col lg:items-start lg:border-l lg:border-ink/15 dark:lg:border-bone/15 lg:border-t-0 lg:pl-5 lg:pt-0">
          <span className="text-sm font-bold text-ink/75 dark:text-bone/85">{copy.home.moreExamples}</span>
          <div className="flex items-center gap-2" role="group" aria-label={copy.home.moreExamples}>
            {homeOpportunities.map((opportunity) => (
              <button
                key={opportunity.id}
                type="button"
                aria-pressed={opportunity.id === activeOpportunity.id}
                aria-label={opportunity.title}
                onClick={() => onSelect(opportunity.id)}
                className={`h-11 w-11 shrink-0 rounded-full border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-200 ${opportunity.id === activeOpportunity.id ? 'border-bone bg-primary-600 shadow-[0_0_0_3px_rgba(244,208,0,0.26)]' : 'border-ink/30 bg-ink/50 hover:bg-ink/70 dark:border-white/40 dark:bg-white/15 dark:hover:bg-white/25'}`}
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
      <section className="mb-6 border-b border-ink/10 pb-7 pt-3 text-ink dark:border-bone/15 dark:text-bone sm:pb-9" aria-labelledby="app-first-step-title">
        <p className="text-sm font-bold uppercase tracking-[0.12em] text-primary-700 dark:text-primary-300">{copy.home.previewState}</p>
        <h1 id="app-first-step-title" className="mt-3 max-w-[18ch] text-balance font-display text-4xl leading-[1.04] tracking-[-0.035em] sm:text-6xl">{journey.appTitle}</h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-ink/75 dark:text-bone/75 sm:text-lg">{journey.appBody}</p>
        <div className="mt-6 flex flex-wrap items-center gap-3"><Link to="/app/opportunities" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-action-primary px-6 py-2 font-bold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-control-focus focus-visible:ring-offset-2 dark:focus-visible:ring-offset-plum">{journey.find}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link><Link to="/app/create?mode=share" className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 py-2 font-bold text-primary-700 underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-control-focus dark:text-primary-300">{journey.teach}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></div>
      </section>

      <LivingWorldStage activeOpportunity={activeOpportunity} onSelect={setActiveOpportunityId} copy={copy} />

      <Link to="/app/world" className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-lg px-2 text-base font-bold text-primary-700 underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 dark:text-primary-300">{copy.home.openWorld}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-[1.5rem] border border-primary-500/15 bg-primary-50/70 px-5 py-4 dark:bg-primary-900/15 sm:px-6">
        <div className="flex items-start gap-3"><Sparkles className="mt-1 h-5 w-5 shrink-0 text-primary-500" aria-hidden="true" /><p className="text-base leading-6 text-ink/70 dark:text-bone/75">{copy.home.seedPrompt}</p></div>
        <Link to="/app/create" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:text-primary-300"><Plus className="h-4 w-4" aria-hidden="true" /> {copy.home.openSeedStudio}</Link>
      </div>
    </div>
  );
}
