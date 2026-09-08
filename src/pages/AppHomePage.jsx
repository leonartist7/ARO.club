import { useState } from 'react';
import { ArrowRight, Bell, ChevronRight, Compass, MapPin, Plus, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { aroUser } from '../data/aroApp';
import { AppAvatar } from '../components/app/AppPrimitives';

const nearbyOpenings = [
  {
    id: 'walk',
    eyebrow: 'Something is forming',
    title: 'River light photo walk',
    detail: 'A slow walk to notice what the city is becoming.',
    time: 'Sunday · 6:30 PM',
    distance: '4.1 km away',
    people: '3 people are interested',
    opportunityId: 'river-photo-walk',
  },
  {
    id: 'stories',
    eyebrow: 'A table is gathering',
    title: 'Spanish through shared stories',
    detail: 'Bring one story. Leave with a few new words.',
    time: 'Saturday · 11:00 AM',
    distance: '2.4 km away',
    people: '6 people are forming a table',
    opportunityId: 'shared-stories',
  },
  {
    id: 'repair',
    eyebrow: 'A practical opening',
    title: 'Repair table: small things',
    detail: 'A room for mending, learning, and passing on know-how.',
    time: 'Wednesday · 7:00 PM',
    distance: '3.8 km away',
    people: 'A room is ready for you',
    opportunityId: 'repair-table',
  },
];

function OpeningCard({ opening }) {
  return (
    <article className="w-full rounded-[1.5rem] border border-white bg-bone p-4 text-ink shadow-2xl sm:max-w-[390px] sm:p-5">
      <div className="flex items-start gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-primary-600">{opening.eyebrow}</p>
          <h2 className="mt-2 font-display text-[1.7rem] leading-[0.93] tracking-[-0.025em] sm:text-3xl">{opening.title}</h2>
          <p className="mt-2 text-xs leading-5 text-ink/60 sm:text-sm">{opening.detail}</p>
        </div>
        <Link
          to={`/app/opportunities/${opening.opportunityId}`}
          aria-label={`View ${opening.title}`}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-500 text-white transition hover:-translate-y-0.5 hover:bg-primary-400"
        >
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-ink/10 pt-3 text-[11px] font-semibold text-ink/60 sm:text-xs">
        <span className="inline-flex items-center gap-1.5"><Compass className="h-3.5 w-3.5 text-primary-500" aria-hidden="true" /> {opening.time}</span>
        <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-primary-500" aria-hidden="true" /> {opening.distance}</span>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <div className="flex -space-x-2">
          <AppAvatar initials="MA" size="sm" />
          <AppAvatar initials="TR" size="sm" />
          <AppAvatar initials="JL" size="sm" />
        </div>
        <span className="text-[11px] font-medium text-ink/55">{opening.people}</span>
      </div>
    </article>
  );
}

function SeasonThread() {
  return (
    <Link to="/app/insights" className="group block rounded-[1.75rem] border border-ink/10 bg-white/70 p-5 transition hover:border-primary-500/40 hover:bg-white dark:border-bone/10 dark:bg-gray-900/65 dark:hover:bg-gray-900 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-600 dark:text-primary-300">Continue your journey</p>
          <h2 className="mt-3 font-display text-3xl leading-none">Season of Discovery</h2>
        </div>
        <span className="text-sm font-bold text-ink/45 dark:text-bone/45">Level 7</span>
      </div>
      <div className="mt-6 flex items-center gap-4">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-ink/10 dark:bg-bone/10"><div className="h-full w-[62%] rounded-full bg-gradient-to-r from-primary-500 to-secondary-400" /></div>
        <span className="text-xs font-bold">62%</span>
      </div>
      <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-primary-700 dark:text-primary-300">See your path <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
    </Link>
  );
}

function LivingWorldStage({ activeOpening, onSelect }) {
  return (
    <section className="relative isolate overflow-hidden rounded-[2rem] bg-[#d8b58b] shadow-[0_24px_70px_rgba(83,55,29,0.18)] sm:rounded-[2.5rem]">
      <img
        src="/aro-portal-home-v1.png"
        alt="A person standing beside an illuminated portal overlooking a river at sunset"
        className="absolute inset-0 h-full w-full object-cover object-[53%_center]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(32,21,12,0.52),rgba(32,21,12,0.05)_58%,rgba(32,21,12,0.08)),linear-gradient(0deg,rgba(28,18,10,0.52),transparent_43%)]" />
      <div className="absolute inset-x-0 top-0 h-[36%] bg-gradient-to-b from-[#342116]/30 to-transparent" />

      <div className="relative flex min-h-[650px] flex-col p-5 sm:min-h-[720px] sm:p-8 lg:min-h-[740px]">
        <div className="flex items-start justify-between gap-4 text-[#2b1a10]">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-700">Good morning, {aroUser.name.split(' ')[0]}.</p>
            <p className="mt-2 max-w-[190px] font-display text-xl leading-[0.98] tracking-[-0.025em] sm:max-w-[250px] sm:text-2xl">What could make today meaningful?</p>
          </div>
          <div className="rounded-full border border-[#694329]/20 bg-[#fff8eb]/70 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#51311d]">Calgary · 07 Sep</div>
        </div>

        <div className="mt-auto flex flex-col items-start gap-4 pt-44 sm:pt-52">
          <OpeningCard opening={activeOpening} />
          <div className="flex items-center gap-2 rounded-full border border-white/25 bg-[#281a11]/45 p-1.5 shadow-[0_10px_28px_rgba(34,16,3,0.16)] backdrop-blur-md">
            <span className="pl-2 text-[10px] font-bold uppercase tracking-[0.15em] text-white/70">More nearby</span>
            {nearbyOpenings.map((opening) => (
              <button
                key={opening.id}
                type="button"
                aria-pressed={opening.id === activeOpening.id}
                aria-label={`Show ${opening.title}`}
                onClick={() => onSelect(opening.id)}
                className={`h-8 w-8 rounded-full border transition focus:outline-none focus:ring-2 focus:ring-secondary-200 ${opening.id === activeOpening.id ? 'border-[#fff6e7] bg-primary-500 shadow-[0_0_0_3px_rgba(222,67,37,0.26)]' : 'border-white/30 bg-white/15 hover:bg-white/25'}`}
              >
                <span className="sr-only">{opening.title}</span>
                <span className="mx-auto block h-1.5 w-1.5 rounded-full bg-white" aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AppHomePage() {
  const [activeOpeningId, setActiveOpeningId] = useState('walk');
  const activeOpening = nearbyOpenings.find((opening) => opening.id === activeOpeningId) ?? nearbyOpenings[0];

  return (
    <div className="px-4 py-5 sm:px-8 sm:py-8">
      <div className="mb-5 flex items-center justify-between gap-4 sm:mb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-ink/55 dark:text-bone/55"><span className="h-2 w-2 rounded-full bg-moss" aria-hidden="true" /> Your world is awake</div>
        <button type="button" aria-label="Notifications" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-white/55 text-ink/60 hover:bg-white dark:border-bone/10 dark:bg-gray-900/55 dark:text-bone/60 dark:hover:bg-gray-900"><Bell className="h-5 w-5" aria-hidden="true" /></button>
      </div>

      <LivingWorldStage activeOpening={activeOpening} onSelect={setActiveOpeningId} />

      <div className="mt-4 grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
        <SeasonThread />
        <Link to="/app/world" className="group rounded-[1.75rem] bg-ink p-5 text-bone transition hover:bg-plum sm:p-6">
          <div className="flex items-start justify-between gap-4"><div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary-300">Around you now</p><h2 className="mt-3 font-display text-3xl leading-none">8 circles in motion.</h2></div><Compass className="h-5 w-5 text-secondary-300" aria-hidden="true" /></div>
          <div className="mt-6 flex items-center justify-between gap-4"><div className="flex -space-x-2"><AppAvatar initials="JB" size="sm" /><AppAvatar initials="EM" size="sm" /><AppAvatar initials="KL" size="sm" /><span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-ink bg-secondary-300 text-[10px] font-bold text-ink">+5</span></div><span className="inline-flex items-center gap-1 text-sm font-bold text-secondary-300">Open World <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span></div>
        </Link>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-[1.5rem] border border-primary-500/15 bg-primary-50/70 px-5 py-4 dark:bg-primary-900/15 sm:px-6">
        <div className="flex items-center gap-3"><Sparkles className="h-5 w-5 text-primary-500" aria-hidden="true" /><p className="text-sm leading-6 text-ink/65 dark:text-bone/65">Have a small want, idea or invitation? Give it somewhere to land.</p></div>
        <Link to="/app/create" className="inline-flex items-center gap-2 text-sm font-bold text-primary-700 dark:text-primary-300"><Plus className="h-4 w-4" aria-hidden="true" /> Make an opening</Link>
      </div>
    </div>
  );
}
