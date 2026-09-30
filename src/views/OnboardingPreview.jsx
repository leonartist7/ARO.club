'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Camera, Check, Clapperboard, Flower2, Guitar, Languages, Music2, Pencil, RotateCcw, Shapes } from 'lucide-react';
import { Link } from '../lib/navigation';
import { AroWordmark } from '../components/brand/AroMark';
import Button from '../components/ui/Button';
import { PreferencesControls } from '../components/ui/Preferences';
import { useLanguage } from '../contexts/LanguageContext';
import { onboardingPreviewCopy } from '../i18n/onboardingPreview';
import { englishLightRelease } from '../lib/releaseScope';

const ART = ['learn', 'teach-language-v2', 'connect'];
const TOPICS = [
  { key: 'Photography', icon: Camera }, { key: 'Guitar', icon: Guitar },
  { key: 'Ceramics', icon: Shapes }, { key: 'Languages', icon: Languages },
  { key: 'Drawing', icon: Pencil }, { key: 'Dance', icon: Music2 },
  { key: 'Gardening', icon: Flower2 }, { key: 'Writing', icon: BookOpen },
  { key: 'Film', icon: Clapperboard },
];
const HOST_OPTIONS = ['conversation', 'stories', 'vocabulary', 'pronunciation', 'reading', 'phrases'];

function SceneArt({ scene }) {
  const name = ART[scene];
  return (
    <div data-onboarding-scene-art className="aspect-[4/3] w-full overflow-hidden rounded-[1.5rem] bg-brand-yellow shadow-[0_18px_55px_rgba(37,36,32,0.11)] lg:rounded-[2rem]">
      <picture className="block h-full">
        <source srcSet={`/brand/onboarding-${name}-640.webp 640w, /brand/onboarding-${name}-1280.webp 1280w`} sizes="(min-width: 1024px) 50vw, 100vw" type="image/webp" />
        <img src={`/brand/onboarding-${name}-640.webp`} width="640" height="480" loading="eager" decoding="async" alt="" className="h-full w-full object-contain" />
      </picture>
    </div>
  );
}

function Choice({ selected, onClick, children, description, icon: Icon }) {
  return (
    <button type="button" onClick={onClick} aria-pressed={selected}
      className={`flex min-h-16 w-full items-start gap-3 rounded-2xl border-2 px-4 py-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-control-focus focus-visible:ring-offset-2 dark:focus-visible:ring-bone dark:focus-visible:ring-offset-surface-dark ${selected ? 'border-action-primary bg-primary-50 dark:bg-primary-900/30' : 'border-control-border bg-white hover:border-action-primary dark:border-bone/40 dark:bg-surface-darkCard'}`}>
      <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${selected ? 'border-action-primary bg-action-primary text-white' : 'border-control-border dark:border-bone/60'}`}>{selected && <Check size={15} aria-hidden="true" />}</span>
      <span><strong className="flex items-center gap-2 text-base text-ink dark:text-bone">{Icon && <Icon size={19} aria-hidden="true" />}{children}</strong>{description && <span className="mt-1 block text-sm leading-6 text-content-secondary dark:text-content-darkSecondary">{description}</span>}</span>
    </button>
  );
}

export default function OnboardingPreview() {
  const { language } = useLanguage();
  const copy = onboardingPreviewCopy[language] ?? onboardingPreviewCopy.en;
  const [stage, setStage] = useState(0);
  const [intent, setIntent] = useState(null);
  const [mode, setMode] = useState('learn');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [interests, setInterests] = useState([]);
  const [openIdeas, setOpenIdeas] = useState(false);
  const [skill, setSkill] = useState('');
  const [errors, setErrors] = useState({});
  const heading = useRef(null);

  useEffect(() => { heading.current?.focus(); }, [stage, mode]);
  const go = (next) => { setErrors({}); setStage(next); };
  const clearError = (field) => setErrors((current) => ({ ...current, [field]: undefined }));
  const back = () => go(stage === 3 ? 2 : Math.max(0, stage - 1));
  const chooseIntent = (value) => { setIntent(value); setMode(value === 'host' ? 'host' : 'learn'); go(3); };
  const toggleInterest = (topic) => {
    setOpenIdeas(false);
    setInterests((current) => current.includes(topic) ? current.filter((item) => item !== topic) : [...current, topic]);
    clearError('interests');
  };
  const nextFromDetails = () => {
    const issues = {};
    if (!name.trim()) issues.name = 'nameError';
    if (!/^\d+$/.test(age)) issues.age = 'ageError';
    else if (Number(age) < 1 || Number(age) > 120) issues.age = 'ageRange';
    else if (Number(age) < 18) issues.age = 'adultOnly';
    setErrors(issues);
    if (!Object.keys(issues).length) go(4);
  };
  const nextFromCity = () => {
    if (city.trim().length < 2) { setErrors({ city: 'error' }); return; }
    go(5);
  };
  const nextFromPreference = () => {
    if (mode === 'host') {
      const issues = {};
      if (!HOST_OPTIONS.includes(skill)) issues.skill = 'skillError';
      setErrors(issues);
      if (Object.keys(issues).length) return;
    } else if (!interests.length && !openIdeas) {
      setErrors({ interests: 'error' });
      return;
    }
    go(6);
  };

  const scene = stage < 3 ? [copy.learn, copy.teach, copy.choose][stage] : null;
  const title = scene?.title ?? (stage === 3 ? copy.details.title : stage === 4 ? copy.city.title : stage === 5 ? (mode === 'host' ? copy.skill.title : copy.interests.title) : mode === 'host' ? copy.result.hostTitle : copy.result.learnTitle);
  const eyebrow = scene?.eyebrow ?? (stage === 3 ? copy.details.eyebrow : stage === 4 ? copy.city.eyebrow : stage === 5 ? (mode === 'host' ? copy.skill.eyebrow : copy.interests.eyebrow) : copy.result.eyebrow);
  const body = scene?.body ?? (stage === 3 ? copy.details.body : stage === 4 ? copy.city.body : stage === 5 ? (mode === 'host' ? copy.skill.body : copy.interests.body) : '');

  return (
    <div className="min-h-screen bg-surface-canvas text-content-primary dark:bg-surface-dark dark:text-content-dark">
      <header className="border-b border-ink/10 bg-surface-canvas/95 px-4 py-3 backdrop-blur dark:border-bone/15 dark:bg-surface-dark/95 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <Link to="/" aria-label="ARO home" className="rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-control-focus dark:focus-visible:ring-bone"><AroWordmark label="" /></Link>
          {!englishLightRelease && <PreferencesControls />}
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-6 sm:px-6 sm:pt-10">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 text-sm">
          <p className="font-semibold text-primary-700 dark:text-primary-300">{copy.preview}</p>
          {stage < 2 && <button type="button" onClick={() => go(2)} className="min-h-11 rounded-lg px-2 font-semibold underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-control-focus dark:focus-visible:ring-bone">{copy.skip}</button>}
        </div>
        <div className="mb-5 flex items-center gap-2" aria-label={`${Math.min(stage + 1, 7)} / 7`} role="progressbar" aria-valuemin={1} aria-valuemax={7} aria-valuenow={stage + 1}>
          {Array.from({ length: 7 }, (_, index) => <span key={index} className={`h-1.5 flex-1 rounded-full ${index <= stage ? 'bg-action-primary' : 'bg-ink/15 dark:bg-bone/20'}`} />)}
        </div>

        <div className={`grid gap-7 ${stage < 3 ? 'lg:grid-cols-[0.95fr_1.05fr] lg:items-center' : 'lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14'}`}>
          <div className="max-w-xl">
            <p className="text-sm font-bold uppercase tracking-[0.08em] text-primary-700 dark:text-primary-300">{eyebrow}</p>
            <h1 ref={heading} tabIndex={-1} className="mt-3 text-balance font-display text-3xl leading-[1.12] outline-none sm:text-4xl lg:text-5xl">{title}</h1>
            {body && <p className="mt-4 text-base leading-7 text-content-secondary dark:text-content-darkSecondary sm:text-lg">{body}</p>}
            {stage < 2 && <div className="mt-5 lg:hidden"><SceneArt scene={stage} /></div>}


            {stage === 3 && <div className="mt-7 space-y-5">
              <div><label htmlFor="preview-name" className="block text-base font-semibold">{copy.details.name}</label><p className="mb-2 text-sm text-content-secondary dark:text-content-darkSecondary">{copy.details.nameHint}</p><input id="preview-name" autoComplete="off" maxLength={80} value={name} onChange={(event) => { setName(event.target.value); if (event.target.value.trim()) clearError('name'); }} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} className="min-h-12 w-full rounded-xl border border-control-border bg-white px-4 text-base text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-control-focus dark:bg-surface-darkCard dark:text-bone dark:focus-visible:ring-bone" />{errors.name && <p id="name-error" role="alert" className="mt-2 text-sm font-semibold text-danger-700 dark:text-red-300">{copy.details[errors.name]}</p>}</div>
              <div><label htmlFor="preview-age" className="block text-base font-semibold">{copy.details.age}</label><p className="mb-2 text-sm text-content-secondary dark:text-content-darkSecondary">{copy.details.ageHint}</p><input id="preview-age" type="number" inputMode="numeric" min="18" max="120" step="1" value={age} onChange={(event) => { setAge(event.target.value); if (/^\d+$/.test(event.target.value) && Number(event.target.value) >= 18 && Number(event.target.value) <= 120) clearError('age'); }} aria-invalid={Boolean(errors.age)} aria-describedby={errors.age ? 'age-error' : undefined} className="min-h-12 w-full rounded-xl border border-control-border bg-white px-4 text-base text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-control-focus dark:bg-surface-darkCard dark:text-bone dark:focus-visible:ring-bone" />{errors.age && <p id="age-error" role="alert" className="mt-2 text-sm font-semibold text-danger-700 dark:text-red-300">{copy.details[errors.age]}</p>}</div>
            </div>}

            {stage === 4 && <div className="mt-7"><label htmlFor="preview-city" className="mb-2 block text-base font-semibold">{copy.city.label}</label><input id="preview-city" autoComplete="off" maxLength={80} placeholder={copy.city.placeholder} value={city} onChange={(event) => { setCity(event.target.value); if (event.target.value.trim().length >= 2) clearError('city'); }} aria-invalid={Boolean(errors.city)} aria-describedby={errors.city ? 'city-error' : undefined} className="min-h-12 w-full rounded-xl border border-control-border bg-white px-4 text-base text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-control-focus dark:bg-surface-darkCard dark:text-bone dark:focus-visible:ring-bone" />{errors.city && <p id="city-error" role="alert" className="mt-2 text-sm font-semibold text-danger-700 dark:text-red-300">{copy.city[errors.city]}</p>}</div>}

            {stage === 5 && mode === 'host' && <div data-preview-choices className="mt-7 max-h-[clamp(8rem,calc(100dvh-33rem),28rem)] space-y-5 overflow-y-auto overscroll-contain pr-2 scroll-pb-3 sm:max-h-none sm:overflow-visible sm:pr-0">
              <p className="text-base font-semibold">{copy.skill.label}</p>
              <div className="grid gap-3">{HOST_OPTIONS.map((option, index) => <Choice key={option} selected={skill === option} onClick={() => { setSkill(option); clearError('skill'); }} description={copy.skill.options[index].outcome}>{copy.skill.options[index].title}</Choice>)}</div>
              {errors.skill && <p role="alert" className="mt-2 text-sm font-semibold text-danger-700 dark:text-red-300">{copy.skill[errors.skill]}</p>}
            </div>}

            {stage === 5 && mode === 'learn' && <div data-preview-choices className="mt-7 max-h-[clamp(8rem,calc(100dvh-33rem),28rem)] overflow-y-auto overscroll-contain pr-2 scroll-pb-3 sm:max-h-none sm:overflow-visible sm:pr-0"><div className="grid gap-3 sm:grid-cols-2">{TOPICS.map((topic, index) => <Choice key={topic.key} icon={topic.icon} selected={interests.includes(topic.key)} onClick={() => toggleInterest(topic.key)}>{copy.topics[index]}</Choice>)}<Choice selected={openIdeas} onClick={() => { setInterests([]); setOpenIdeas(true); clearError('interests'); }}>{copy.interests.open}</Choice></div>{errors.interests && <p role="alert" className="mt-3 text-sm font-semibold text-danger-700 dark:text-red-300">{copy.interests[errors.interests]}</p>}</div>}

            {stage === 6 && <div className="mt-7 rounded-2xl border border-primary-200 bg-white p-5 dark:border-primary-700 dark:bg-surface-darkCard">
              <p className="text-sm font-bold text-primary-700 dark:text-primary-300">{mode === 'host' ? copy.result.draft : copy.result.example}</p>
              <h2 className="mt-3 font-sans text-2xl font-bold leading-tight">{mode === 'host' ? copy.skill.options[HOST_OPTIONS.indexOf(skill)]?.title : copy.ideas[interests[0]] ?? copy.ideas.open}</h2>
              <p className="mt-3 text-base leading-7 text-content-secondary dark:text-content-darkSecondary">{mode === 'host' ? copy.skill.options[HOST_OPTIONS.indexOf(skill)]?.outcome : interests.length ? `${copy.result.fit} ${interests.map((topic) => copy.topics[TOPICS.findIndex((item) => item.key === topic)]).join(', ')}.` : copy.result.openFit}</p>
              <p className="mt-3 break-words text-sm font-semibold [overflow-wrap:anywhere]">{copy.result.city}: {city.trim()}</p>
              {mode === 'host' && <p className="mt-4 border-t border-primary-200 pt-3 text-sm leading-6 text-content-secondary dark:border-primary-700 dark:text-content-darkSecondary">{copy.result.hostBoundary}</p>}
            </div>}

            <div className={`flex flex-wrap items-center gap-3 ${stage >= 3 && stage <= 5 ? `sticky bottom-0 z-20 -mx-4 ${stage === 5 ? 'mt-7' : 'mt-28'} border-t border-ink/10 bg-surface-canvas/95 px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur dark:border-bone/15 dark:bg-surface-dark/95` : stage < 2 ? 'mt-5' : 'mt-7'} ${stage === 5 ? 'sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:px-0 sm:pb-0' : ''}`}>
              {stage > 0 && <button type="button" onClick={back} className="inline-flex min-h-12 items-center gap-2 rounded-xl px-3 font-semibold underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-control-focus dark:focus-visible:ring-bone"><ArrowLeft size={18} aria-hidden="true" />{copy.back}</button>}
              {stage === 0 && <Button onClick={() => go(1)} className="min-h-12 rounded-xl">{copy.learn.action}<ArrowRight size={18} aria-hidden="true" /></Button>}
              {stage === 1 && <Button onClick={() => go(2)} className="min-h-12 rounded-xl">{copy.teach.action}<ArrowRight size={18} aria-hidden="true" /></Button>}
              {stage === 3 && <Button onClick={nextFromDetails} className="min-h-12 rounded-xl">{copy.next}<ArrowRight size={18} aria-hidden="true" /></Button>}
              {stage === 4 && <Button onClick={nextFromCity} className="min-h-12 rounded-xl">{copy.next}<ArrowRight size={18} aria-hidden="true" /></Button>}
              {stage === 5 && <Button data-preview-submit onClick={nextFromPreference} className="min-h-12 rounded-xl">{mode === 'host' ? copy.skill.action : copy.interests.action}<ArrowRight size={18} aria-hidden="true" /></Button>}
              {stage === 6 && <><Link to="/app" className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-action-primary px-5 font-bold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-control-focus focus-visible:ring-offset-2 dark:focus-visible:ring-bone">{copy.result.enterApp}<ArrowRight size={18} aria-hidden="true" /></Link><button type="button" onClick={() => go(5)} className="min-h-12 rounded-xl px-3 font-semibold underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-control-focus dark:focus-visible:ring-bone">{copy.result.edit}</button></>}
            </div>
            {stage === 0 && <div className="mt-6"><p className="mb-3 text-sm font-semibold">{copy.learn.topics}</p><div className="flex flex-wrap gap-2">{TOPICS.map((topic, index) => <button key={topic.key} type="button" onClick={() => toggleInterest(topic.key)} aria-pressed={interests.includes(topic.key)} className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-control-focus dark:focus-visible:ring-bone ${interests.includes(topic.key) ? 'border-action-primary bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-200' : 'border-control-border dark:border-bone/40'}`}><topic.icon size={17} aria-hidden="true" />{copy.topics[index]}</button>)}</div></div>}
            {stage === 1 && <div className="mt-6"><p className="mb-3 text-sm font-semibold">{copy.teach.examples}</p><div className="flex flex-wrap gap-2">{HOST_OPTIONS.map((option, index) => <button key={option} type="button" onClick={() => setSkill(option)} aria-pressed={skill === option} className={`min-h-11 rounded-full border px-4 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-control-focus dark:focus-visible:ring-bone ${skill === option ? 'border-action-primary bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-200' : 'border-control-border dark:border-bone/40'}`}>{copy.skill.options[index].title}</button>)}</div></div>}
          </div>

          <div>
            {stage === 2 && <div className="grid gap-3"><Choice selected={intent === 'learn'} onClick={() => chooseIntent('learn')} description={copy.choose.learnBody}>{copy.choose.learn}</Choice><Choice selected={intent === 'host'} onClick={() => chooseIntent('host')} description={copy.choose.hostBody}>{copy.choose.host}</Choice><Choice selected={intent === 'both'} onClick={() => chooseIntent('both')} description={copy.choose.bothBody}>{copy.choose.both}</Choice></div>}
            {stage < 3 && <div className={stage === 2 ? 'mt-5' : 'hidden lg:block'}><SceneArt scene={stage} /></div>}
            {stage === 6 && <div className="rounded-2xl bg-primary-50 p-5 dark:bg-primary-900/20">{intent === 'both' && mode === 'learn' && <button type="button" onClick={() => { setMode('host'); go(5); }} className="min-h-11 font-bold text-primary-700 underline underline-offset-4 dark:text-primary-300">{copy.result.bothAction}</button>}<button type="button" onClick={() => go(0)} className={`inline-flex min-h-11 items-center gap-2 text-sm font-semibold underline underline-offset-4 ${intent === 'both' && mode === 'learn' ? 'mt-5' : ''}`}><RotateCcw size={16} aria-hidden="true" />{copy.replay}</button></div>}
          </div>
        </div>
      </main>
    </div>
  );
}
