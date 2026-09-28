'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { englishLightRelease } from '../lib/releaseScope';

const ThemeContext = createContext(undefined);
const preferences = new Set(['light', 'dark', 'system']);

function deviceTheme() {
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ThemeProvider({ children }) {
  const [themePreference, setPreference] = useState(englishLightRelease ? 'light' : 'system');
  const [theme, setTheme] = useState('light');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let stored;
    if (!englishLightRelease) {
      try { stored = localStorage.getItem('theme'); } catch { /* Storage can be disabled. */ }
      setPreference(preferences.has(stored) ? stored : 'system');
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const media = window.matchMedia?.('(prefers-color-scheme: dark)');
    const apply = () => {
      const resolved = themePreference === 'system' ? deviceTheme() : themePreference;
      setTheme(resolved);
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(resolved);
      document.documentElement.style.colorScheme = resolved;
    };
    apply();
    if (themePreference === 'system') media?.addEventListener?.('change', apply);
    if (!englishLightRelease) try { localStorage.setItem('theme', themePreference); } catch { /* Storage can be disabled. */ }
    return () => { if (themePreference === 'system') media?.removeEventListener?.('change', apply); };
  }, [themePreference, ready]);

  const setThemePreference = (next) => {
    if (!englishLightRelease && preferences.has(next)) setPreference(next);
  };
  const toggleTheme = () => { if (!englishLightRelease) setPreference(theme === 'dark' ? 'light' : 'dark'); };

  return <ThemeContext.Provider value={{ theme, isDark: theme === 'dark', themePreference, setThemePreference, toggleTheme }}>
    {children}
  </ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
}
