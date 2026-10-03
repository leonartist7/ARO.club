'use client';
import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { Check, ChevronDown, Moon, Sun } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useOptionalTheme } from '../../contexts/ThemeContext';
import { languageChoices, preferencesCopy } from '../../i18n/preferences';

export function ThemeToggle({ className = '' }) {
  const { language } = useLanguage();
  const themeState = useOptionalTheme();
  const copy = preferencesCopy[language] ?? preferencesCopy.en;
  if (!themeState) return null;
  const { theme, toggleTheme } = themeState;
  const isDark = theme === 'dark';
  const label = isDark ? copy.switchToLight : copy.switchToDark;
  const Icon = isDark ? Sun : Moon;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={`inline-flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full border border-ink/10 bg-white/72 text-ink shadow-[0_8px_24px_rgba(37,36,32,0.06)] transition-[background-color,border-color,color,transform] hover:-translate-y-0.5 hover:border-ink/20 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-control-focus dark:border-bone/15 dark:bg-bone/5 dark:text-bone dark:hover:border-bone/30 dark:hover:bg-bone/10 ${className}`}
    >
      <Icon className="h-[1.15rem] w-[1.15rem]" aria-hidden="true" />
    </button>
  );
}

export function LanguageMenu({ className = '' }) {
  const { language, changeLanguage } = useLanguage();
  const copy = preferencesCopy[language] ?? preferencesCopy.en;
  const current = languageChoices.find((choice) => choice.code === language) ?? languageChoices[0];
  const [open, setOpen] = useState(false);
  const [menuStyle, setMenuStyle] = useState(null);
  const menuId = useId();
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const menuRef = useRef(null);
  const focusedOpenRef = useRef(false);

  useLayoutEffect(() => {
    if (!open) return;

    const positionMenu = () => {
      const trigger = triggerRef.current;
      const menu = menuRef.current;
      if (!trigger || !menu) return;

      const edge = 16;
      const gap = 8;
      const triggerRect = trigger.getBoundingClientRect();
      const menuRect = menu.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const availableBelow = Math.max(0, viewportHeight - triggerRect.bottom - gap - edge);
      const availableAbove = Math.max(0, triggerRect.top - gap - edge);

      let maxHeight = Math.max(96, viewportHeight - edge * 2);
      let top;

      if (menuRect.height <= availableBelow) {
        maxHeight = availableBelow;
        top = triggerRect.bottom + gap;
      } else if (menuRect.height <= availableAbove) {
        maxHeight = availableAbove;
        top = triggerRect.top - gap - menuRect.height;
      } else if (availableBelow >= availableAbove) {
        maxHeight = availableBelow;
        top = triggerRect.bottom + gap;
      } else {
        maxHeight = availableAbove;
        top = edge;
      }

      const width = Math.min(menuRect.width, Math.max(0, viewportWidth - edge * 2));
      const left = Math.min(
        Math.max(edge, triggerRect.right - width),
        Math.max(edge, viewportWidth - edge - width),
      );

      setMenuStyle({
        top: Math.round(Math.max(edge, top)),
        left: Math.round(left),
        maxHeight: Math.round(Math.max(0, maxHeight)),
        maxWidth: Math.round(Math.max(0, viewportWidth - edge * 2)),
      });
    };

    positionMenu();
    window.addEventListener('resize', positionMenu);
    window.addEventListener('scroll', positionMenu, true);
    return () => {
      window.removeEventListener('resize', positionMenu);
      window.removeEventListener('scroll', positionMenu, true);
    };
  }, [open, language]);

  useLayoutEffect(() => {
    if (!open) {
      focusedOpenRef.current = false;
      return;
    }
    if (!menuStyle || focusedOpenRef.current) return;
    const selected = menuRef.current?.querySelector('[role="menuitemradio"][aria-checked="true"]');
    selected?.focus();
    focusedOpenRef.current = document.activeElement === selected;
  }, [open, menuStyle]);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const choose = (code) => {
    changeLanguage(code);
    setOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  };

  return (
    <div
      ref={rootRef}
      className={`relative ${className}`}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`${copy.language}: ${current.label}`}
        onClick={() => {
          if (!open) setMenuStyle(null);
          setOpen((value) => !value);
        }}
        className="inline-flex h-[44px] min-w-[64px] items-center justify-center gap-1.5 rounded-full border border-ink/10 bg-white/72 px-[12px] text-xs font-extrabold uppercase tracking-[0.08em] text-ink shadow-[0_8px_24px_rgba(37,36,32,0.06)] transition-[background-color,border-color,transform] hover:-translate-y-0.5 hover:border-ink/20 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-control-focus dark:border-bone/15 dark:bg-bone/5 dark:text-bone dark:hover:border-bone/30 dark:hover:bg-bone/10"
      >
        <span aria-hidden="true">{current.code}</span>
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>

      {open && (
        <div
          id={menuId}
          ref={menuRef}
          role="menu"
          aria-label={copy.chooseLanguage}
          style={menuStyle ?? { visibility: 'hidden' }}
          className="fixed z-[80] w-[min(13rem,calc(100vw-2rem))] overflow-y-auto overscroll-contain rounded-2xl border border-ink/10 bg-surface-canvas p-1.5 shadow-[0_20px_55px_rgba(37,36,32,0.18)] dark:border-bone/15 dark:bg-surface-darkCard"
        >
          {languageChoices.map((choice) => {
            const selected = choice.code === language;
            return (
              <button
                key={choice.code}
                type="button"
                role="menuitemradio"
                aria-checked={selected}
                onClick={() => choose(choice.code)}
                className="flex min-h-11 w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-bold text-ink transition-colors hover:bg-ink/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-control-focus dark:text-bone dark:hover:bg-bone/10"
              >
                <span>{choice.label}</span>
                {selected && <Check className="h-4 w-4 shrink-0" aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function PreferencesControls({ className = '' }) {
  const { language } = useLanguage();
  const copy = preferencesCopy[language] ?? preferencesCopy.en;

  return (
    <div
      role="group"
      aria-label={copy.title}
      className={`flex items-center gap-2 ${className}`}
    >
      <LanguageMenu />
      <ThemeToggle />
    </div>
  );
}

// Backwards-compatible export for older package imports. The former gear popover is
// intentionally replaced by the direct language menu + theme toggle controls.
export default function PreferencesPopover() {
  return <PreferencesControls />;
}
