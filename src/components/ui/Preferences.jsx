'use client';
import { useEffect, useId, useRef, useState } from 'react';
import { Check, Settings2, X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { languageChoices, preferencesCopy } from '../../i18n/preferences';

function Choice({ selected, onClick, children }) {
  return <button type="button" aria-pressed={selected} onClick={onClick} className={`inline-flex min-h-11 items-center justify-between gap-2 rounded-xl border px-3 py-2 text-left text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-control-focus ${selected ? 'border-action-primary bg-primary-50 text-primary-800 dark:bg-primary-900/30 dark:text-primary-200' : 'border-ink/15 bg-white text-ink hover:border-action-primary dark:border-bone/20 dark:bg-surface-darkCard dark:text-bone'}`}>
    {children}{selected && <Check className="h-4 w-4 shrink-0" aria-hidden="true" />}
  </button>;
}

export function PreferencesControls({ className = '', compact = false }) {
  const { language, changeLanguage } = useLanguage();
  const { themePreference, setThemePreference } = useTheme();
  const copy = preferencesCopy[language] ?? preferencesCopy.en;
  return <div lang={language} className={`space-y-5 ${className}`}>
    <div role="group" aria-label={copy.language}>
      <p className="mb-2 text-sm font-bold text-content-secondary dark:text-content-darkSecondary">{copy.language}</p>
      <div className="grid gap-2 sm:grid-cols-3">{languageChoices.map((choice) => <Choice key={choice.code} selected={language === choice.code} onClick={() => changeLanguage(choice.code)}>{choice.label}</Choice>)}</div>
    </div>
    <div role="group" aria-label={copy.appearance}>
      <p className="mb-2 text-sm font-bold text-content-secondary dark:text-content-darkSecondary">{copy.appearance}</p>
      <div className={`grid gap-2 ${compact ? '' : 'sm:grid-cols-3'}`}>{['light', 'dark', 'system'].map((choice) => <Choice key={choice} selected={themePreference === choice} onClick={() => setThemePreference(choice)}>{copy[choice]}</Choice>)}</div>
    </div>
  </div>;
}

export default function PreferencesPopover() {
  const { language } = useLanguage();
  const copy = preferencesCopy[language] ?? preferencesCopy.en;
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const first = panelRef.current?.querySelector('[aria-pressed="true"]');
    first?.focus();
    const onPointerDown = (event) => { if (!rootRef.current?.contains(event.target)) setOpen(false); };
    const onKeyDown = (event) => {
      if (event.key === 'Escape') { event.preventDefault(); setOpen(false); triggerRef.current?.focus(); }
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => { document.removeEventListener('pointerdown', onPointerDown); document.removeEventListener('keydown', onKeyDown); };
  }, [open]);

  return <div ref={rootRef} className="relative" onBlur={(event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
  }}>
    <button ref={triggerRef} type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls={panelId} aria-label={copy.title} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl text-ink/75 transition-colors hover:bg-ink/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-control-focus dark:text-bone/80 dark:hover:bg-bone/10"><Settings2 className="h-5 w-5" aria-hidden="true" /></button>
    {open && <div id={panelId} ref={panelRef} className="absolute right-0 z-[70] mt-2 max-h-[calc(100dvh-6rem)] w-[min(22rem,calc(100vw-2rem))] overflow-y-auto overscroll-contain rounded-2xl border border-ink/10 bg-surface-canvas p-4 shadow-[0_20px_55px_rgba(37,36,32,0.2)] dark:border-bone/15 dark:bg-surface-darkCard sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-2"><h2 className="font-display text-lg text-ink dark:text-bone">{copy.title}</h2><button type="button" onClick={() => { setOpen(false); triggerRef.current?.focus(); }} aria-label={copy.close} className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-ink/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-control-focus dark:text-bone/80"><X className="h-5 w-5" aria-hidden="true" /></button></div>
      <PreferencesControls compact />
    </div>}
  </div>;
}
