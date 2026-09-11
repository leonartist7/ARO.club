import { ArrowRight, Clock3, MapPin, Search, UsersRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { opportunities } from '../data/aroApp';
import { AppPanel, AppSectionHeading, StatusPill } from '../components/app/AppPrimitives';
import { AppImage } from '../components/app/AppImage';
import { getDiscoveryFormationStatus, getFv1DiscoveryCopy } from '../i18n/fv1/discovery';

function OpportunityCard({ opportunity, copy }) {
  const formationStatus = getDiscoveryFormationStatus(copy, opportunity);

  return (
    <Link
      to={`/app/opportunities/${opportunity.id}`}
      aria-label={copy.opportunities.openExample(opportunity.title)}
      className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
    >
      <AppPanel className="overflow-hidden transition-colors hover:border-primary-500/50">
        <div className="flex flex-col sm:flex-row">
          <div className="relative h-52 shrink-0 overflow-hidden sm:h-auto sm:w-52">
            <AppImage
              src={opportunity.image}
              alt={opportunity.imageAlt}
              variant="card"
              cropClass="object-center"
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105 motion-reduce:transition-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent sm:bg-gradient-to-r" />
            <div className="absolute bottom-3 left-3"><StatusPill tone="neutral">{copy.fictionalLabel}</StatusPill></div>
          </div>
          <div className="min-w-0 flex-1 p-5 sm:p-7">
            <div className="flex items-start gap-4">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-ink/65 dark:text-bone/70">{opportunity.area} · {opportunity.distance}</p>
                <h2 className="mt-3 font-display text-3xl leading-none transition-colors group-hover:text-primary-700 dark:group-hover:text-primary-300">{opportunity.title}</h2>
                <p className="mt-3 max-w-2xl text-base leading-6 text-ink/70 dark:text-bone/75">{opportunity.summary}</p>
              </div>
              <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-ink/45 transition-transform group-hover:translate-x-1 group-hover:text-primary-500 dark:text-bone/50" aria-hidden="true" />
            </div>
            <div className="mt-5 flex flex-wrap gap-2">{opportunity.tags.map((tag) => <span key={tag} className="border border-ink/10 px-2.5 py-1 text-sm font-semibold text-ink/65 dark:border-bone/10 dark:text-bone/70">{tag}</span>)}</div>
            <div className="mt-6 grid gap-4 border-t border-ink/10 pt-4 text-base text-ink/70 dark:border-bone/10 dark:text-bone/75 sm:grid-cols-3">
              <span className="flex items-start gap-2"><MapPin className="mt-1 h-4 w-4 shrink-0 text-primary-500" aria-hidden="true" /><span>{opportunity.place}</span></span>
              <span className="flex items-start gap-2"><Clock3 className="mt-1 h-4 w-4 shrink-0 text-secondary-600 dark:text-secondary-300" aria-hidden="true" /><span>{opportunity.time}</span></span>
              <span className="flex items-start gap-2"><UsersRound className="mt-1 h-4 w-4 shrink-0 text-moss" aria-hidden="true" /><span><strong className="block text-ink dark:text-bone">{copy.examplePlaces(opportunity.exampleCount, opportunity.capacity)}</strong><span className="block">{copy.exampleMinimum(opportunity.minimum)}</span><span className="mt-1 block">{formationStatus}</span></span></span>
            </div>
          </div>
        </div>
      </AppPanel>
    </Link>
  );
}

export default function AppOpportunitiesPage() {
  const copy = getFv1DiscoveryCopy(localStorage.getItem('conversa-language') ?? 'en');

  return (
    <div className="mx-auto max-w-[1260px] px-4 py-8 sm:px-8 sm:py-10 lg:px-12">
      <AppSectionHeading eyebrow={copy.opportunities.eyebrow} title={copy.opportunities.title}>
        <div className="w-full sm:w-72">
          <div role="img" aria-label={`${copy.opportunities.searchPreview}. ${copy.unavailable}`} className="flex min-h-11 items-center gap-3 border border-ink/15 bg-white/50 px-3 text-base text-ink/65 dark:border-bone/15 dark:bg-gray-900/50 dark:text-bone/70">
            <Search className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{copy.opportunities.searchPreview}</span>
          </div>
          <p className="mt-2 text-base leading-6 text-ink/70 dark:text-bone/75">{copy.unavailable}</p>
        </div>
      </AppSectionHeading>

      <div className="mt-8 border-b border-ink/10 pb-4 dark:border-bone/10">
        <div role="img" aria-label={`${copy.opportunities.filterPreview}. ${copy.unavailable}`} className="flex flex-wrap gap-2">
          {copy.opportunities.filterLabels.map((item, index) => <span key={item} className={`inline-flex min-h-11 items-center px-4 text-sm font-bold ${index === 0 ? 'bg-ink text-bone dark:bg-bone dark:text-ink' : 'border border-ink/10 text-ink/65 dark:border-bone/10 dark:text-bone/70'}`}>{item}</span>)}
        </div>
        <p className="mt-2 text-base leading-6 text-ink/70 dark:text-bone/75">{copy.unavailable}</p>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,1fr)_270px]">
        <div className="space-y-4">{opportunities.map((opportunity) => <OpportunityCard key={opportunity.id} opportunity={opportunity} copy={copy} />)}</div>
        <aside className="space-y-4">
          <AppPanel className="p-6">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-secondary-700 dark:text-secondary-300">{copy.opportunities.howEyebrow}</p>
            <ol className="mt-5 space-y-5">{copy.opportunities.howSteps.map((step, index) => <li key={step} className="flex gap-3 text-base leading-6 text-ink/70 dark:text-bone/75"><span className="font-bold text-primary-700 dark:text-primary-300">0{index + 1}</span><span>{step}</span></li>)}</ol>
          </AppPanel>
          <AppPanel className="p-6" dark>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-secondary-200">{copy.opportunities.fieldEyebrow}</p>
            <p className="mt-3 font-display text-3xl text-bone">{copy.opportunities.fieldTitle}</p>
            <p className="mt-3 text-base leading-6 text-bone">{copy.opportunities.fieldBody}</p>
            <Link to="/app/profile#signals" className="mt-5 inline-flex min-h-11 items-center text-sm font-bold text-secondary-100 hover:text-secondary-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-200">{copy.opportunities.visitField} <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" /></Link>
          </AppPanel>
        </aside>
      </div>
    </div>
  );
}
