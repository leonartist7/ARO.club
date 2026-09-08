import { ArrowRight, BookOpen, CheckCircle2, Compass, HeartHandshake, MapPin, Sparkles, UsersRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AppPanel, AppSectionHeading } from '../components/app/AppPrimitives';

const tabs = ['Passport', 'Seasons', 'Proof', 'Skills'];

export default function AppInsightsPage() {
  return (
    <div className="px-4 py-6 sm:px-8 sm:py-10">
      <AppSectionHeading eyebrow="Your journey" title="Insights"><Link to="/app/passport" className="inline-flex items-center gap-2 text-sm font-bold text-primary-700 dark:text-primary-300">Open Passport <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></AppSectionHeading>
      <div className="mt-7 flex gap-6 overflow-x-auto border-b border-ink/10 dark:border-bone/10" role="tablist" aria-label="Journey sections">{tabs.map((tab, index) => <button key={tab} type="button" role="tab" aria-selected={index === 0} className={`min-h-11 shrink-0 border-b-2 px-1 text-sm font-bold ${index === 0 ? 'border-primary-500 text-primary-700 dark:text-primary-300' : 'border-transparent text-ink/45 dark:text-bone/45'}`}>{tab}</button>)}</div>
      <AppPanel className="relative mt-6 min-h-[330px] overflow-hidden bg-ink text-bone dark:bg-plum">
        <img src="/aro-season-discovery-v1.png" alt="Four people looking over a river city at sunset, connected by a subtle orbit of light" className="absolute inset-0 h-full w-full object-cover object-[62%_center]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,25,33,0.94)_0%,rgba(18,25,33,0.82)_35%,rgba(18,25,33,0.28)_70%,rgba(18,25,33,0.12)_100%),linear-gradient(0deg,rgba(18,25,33,0.55),transparent_56%)]" />
        <div className="relative flex min-h-[330px] max-w-xl flex-col p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary-300">Season of Discovery</p>
          <h1 className="mt-5 font-display text-5xl leading-[0.9]">Your world gets larger when you show up.</h1>
          <p className="mt-5 max-w-md text-sm leading-6 text-bone/70">Level 7 · 62% through this season</p>
          <div className="mt-4 h-2 max-w-sm overflow-hidden rounded-full bg-bone/15"><div className="h-full w-[62%] rounded-full bg-gradient-to-r from-primary-500 to-secondary-300" /></div>
          <div className="mt-auto inline-flex w-fit items-center gap-3 rounded-full border border-bone/15 bg-ink/35 px-3 py-2 text-xs text-bone/75 backdrop-blur-md"><span className="h-2 w-2 rounded-full bg-secondary-300 shadow-[0_0_0_4px_rgba(239,193,75,0.12)]" aria-hidden="true" /> Three moments are changing your map</div>
        </div>
      </AppPanel>
      <section className="mt-6 grid grid-cols-2 gap-px overflow-hidden border border-ink/10 bg-ink/10 dark:border-bone/10 dark:bg-bone/10 sm:grid-cols-3"><Metric icon={Compass} value="24" label="opportunities joined" /><Metric icon={UsersRound} value="68" label="people met" /><Metric icon={MapPin} value="3" label="cities explored" /><Metric icon={HeartHandshake} value="112" label="hours lived" /><Metric icon={Sparkles} value="4" label="skills gained" /><Metric icon={CheckCircle2} value="$1,240" label="earned through ARO" /></section>
      <section className="mt-10"><div className="flex items-end justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-ink/45 dark:text-bone/45">Recent milestones</p><h2 className="mt-2 font-display text-3xl">Keep the meaningful bits.</h2></div><BookOpen className="h-6 w-6 text-primary-500" aria-hidden="true" /></div><div className="mt-5 divide-y divide-ink/10 border-y border-ink/10 dark:divide-bone/10 dark:border-bone/10">{['Hosted your first Circle', 'Completed 5 opportunities', 'Explored a new neighbourhood'].map((item, index) => <div key={item} className="flex items-center gap-4 py-4"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary-50 text-secondary-700 dark:bg-secondary-900/30 dark:text-secondary-300">{index + 1}</span><p className="flex-1 text-sm font-semibold">{item}</p><span className="text-xs font-bold text-moss">Recorded</span></div>)}</div></section>
    </div>
  );
}

function Metric({ icon: Icon, value, label }) {
  return <div className="bg-bone p-4 dark:bg-gray-900 sm:p-5"><Icon className="h-4 w-4 text-primary-500" aria-hidden="true" /><p className="mt-4 font-display text-3xl">{value}</p><p className="mt-1 text-xs leading-4 text-ink/55 dark:text-bone/55">{label}</p></div>;
}
