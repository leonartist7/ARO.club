import React from 'react';
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { LanguageMenu, PreferencesControls, ThemeToggle } from './Preferences';
import { ThemeProvider } from '../../contexts/ThemeContext';
import { LanguageProvider } from '../../contexts/LanguageContext';

let media;
let listeners;
function preferences(children = <PreferencesControls />) {
  return render(<LanguageProvider><ThemeProvider>{children}</ThemeProvider></LanguageProvider>);
}
beforeEach(() => {
  vi.stubGlobal('React', React);
  localStorage.clear();
  listeners = new Set();
  media = {
    matches: false,
    addEventListener: (_, listener) => listeners.add(listener),
    removeEventListener: (_, listener) => listeners.delete(listener),
  };
  vi.stubGlobal('matchMedia', () => media);
  vi.stubGlobal('requestAnimationFrame', (callback) => { callback(); return 1; });
});
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals(); localStorage.clear(); });

describe('compact preferences', () => {
  it('supports wrapped arrow navigation and Home/End without changing selection', () => {
    preferences();
    fireEvent.click(screen.getByRole('button', { name: 'Language: English' }));
    const items = screen.getAllByRole('menuitemradio');
    fireEvent.keyDown(items[0], { key: 'ArrowUp' });
    expect(document.activeElement).toBe(items[2]);
    expect(items[2].tabIndex).toBe(0);
    expect(items[0].tabIndex).toBe(-1);
    fireEvent.keyDown(items[2], { key: 'ArrowDown' });
    expect(document.activeElement).toBe(items[0]);
    fireEvent.keyDown(items[0], { key: 'End' });
    expect(document.activeElement).toBe(items[2]);
    fireEvent.keyDown(items[2], { key: 'Home' });
    expect(document.activeElement).toBe(items[0]);
    expect(items[0].tabIndex).toBe(0);
    expect(items[2].tabIndex).toBe(-1);
    expect(items[0].getAttribute('aria-checked')).toBe('true');
    expect(localStorage.getItem('conversa-language')).not.toBe('es');
    fireEvent.blur(items[0], { relatedTarget: document.body });
    expect(screen.queryByRole('menu')).toBeNull();
  });
  it('restores language, opens the dropdown on the selected option and returns focus with Escape', async () => {
    localStorage.setItem('conversa-language', 'es');
    localStorage.setItem('theme', 'dark');
    preferences();

    const trigger = await screen.findByRole('button', { name: 'Idioma: Español' });
    fireEvent.click(trigger);
    const selected = screen.getByRole('menuitemradio', { name: 'Español' });
    expect(document.activeElement).toBe(selected);
    expect(selected.getAttribute('aria-checked')).toBe('true');

    fireEvent.keyDown(selected, { key: 'Escape' });
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(document.activeElement).toBe(trigger);
    expect(screen.queryByRole('menu', { name: 'Elegir idioma' })).toBeNull();
  });

  it('switches and persists language from the dropdown, then closes it', async () => {
    preferences(<LanguageMenu />);
    const trigger = screen.getByRole('button', { name: 'Language: English' });
    fireEvent.click(trigger);
    fireEvent.click(screen.getByRole('menuitemradio', { name: 'Français' }));

    await waitFor(() => expect(document.documentElement.lang).toBe('fr'));
    expect(localStorage.getItem('conversa-language')).toBe('fr');
    expect(screen.queryByRole('menu', { name: 'Choisir la langue' })).toBeNull();
    expect(screen.getByRole('button', { name: 'Langue: Français' })).toBeTruthy();
  });

  it('uses one sun/moon toggle and persists the explicit theme choice', async () => {
    media.matches = true;
    preferences(<ThemeToggle />);

    const toLight = await screen.findByRole('button', { name: 'Switch to light mode' });
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    fireEvent.click(toLight);

    await waitFor(() => expect(localStorage.getItem('theme')).toBe('light'));
    expect(document.documentElement.classList.contains('light')).toBe(true);
    expect(screen.getByRole('button', { name: 'Switch to dark mode' })).toBeTruthy();

    act(() => {
      media.matches = false;
      listeners.forEach((listener) => listener());
      media.matches = true;
      listeners.forEach((listener) => listener());
    });
    expect(document.documentElement.classList.contains('light')).toBe(true);
  });

  it('keeps both controls usable when storage is unavailable', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('Storage unavailable'); });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('Storage unavailable'); });
    preferences();

    fireEvent.click(screen.getByRole('button', { name: 'Language: English' }));
    fireEvent.click(screen.getByRole('menuitemradio', { name: 'Français' }));
    fireEvent.click(screen.getByRole('button', { name: 'Passer en mode sombre' }));

    expect(document.documentElement.lang).toBe('fr');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('gives each language trigger its own menu and dismisses on an outside pointer', () => {
    preferences(<><LanguageMenu /><LanguageMenu /><button type="button">Outside</button></>);
    const triggers = screen.getAllByRole('button', { name: 'Language: English' });
    expect(triggers[0].getAttribute('aria-controls')).not.toBe(triggers[1].getAttribute('aria-controls'));

    fireEvent.click(triggers[1]);
    expect(document.getElementById(triggers[1].getAttribute('aria-controls'))).toBeTruthy();
    fireEvent.pointerDown(screen.getByRole('button', { name: 'Outside' }));
    expect(triggers[1].getAttribute('aria-expanded')).toBe('false');
  });
});
