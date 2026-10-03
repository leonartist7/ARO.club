import React from 'react';
import { act, cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import PreferencesPopover, { PreferencesControls } from './Preferences';
import { ThemeProvider } from '../../contexts/ThemeContext';
import { LanguageProvider } from '../../contexts/LanguageContext';

let media;
let listeners;
function preferences(children = <PreferencesPopover />) {
  return render(<LanguageProvider><ThemeProvider>{children}</ThemeProvider></LanguageProvider>);
}
beforeEach(() => {
  vi.stubGlobal('React', React);
  localStorage.clear();
  listeners = new Set();
  media = { matches: false, addEventListener: (_, listener) => listeners.add(listener), removeEventListener: (_, listener) => listeners.delete(listener) };
  vi.stubGlobal('matchMedia', () => media);
});
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals(); localStorage.clear(); });

describe('quiet preferences', () => {
  it('restores the selected language, focuses it on opening and returns focus with Escape', async () => {
    localStorage.setItem('conversa-language', 'es');
    localStorage.setItem('theme', 'dark');
    preferences();
    const trigger = await screen.findByRole('button', { name: 'Preferencias' });
    fireEvent.click(trigger);
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Español' }));
    expect(screen.getByRole('button', { name: 'Oscuro' }).getAttribute('aria-pressed')).toBe('true');
    fireEvent.keyDown(document.activeElement, { key: 'Escape' });
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(document.activeElement).toBe(trigger);
    expect(screen.queryByRole('group', { name: 'Idioma' })).toBeNull();
  });

  it('switches and persists language without closing, then dismisses on keyboard focus leaving', async () => {
    preferences(<><PreferencesPopover /><button type="button">Next action</button></>);
    const trigger = screen.getByRole('button', { name: 'Preferences', exact: true });
    fireEvent.click(trigger);
    const french = screen.getByRole('button', { name: 'Français' });
    fireEvent.click(french);
    await waitFor(() => expect(document.documentElement.lang).toBe('fr'));
    expect(localStorage.getItem('conversa-language')).toBe('fr');
    expect(screen.getByRole('group', { name: 'Apparence' })).toBeTruthy();
    act(() => screen.getByRole('button', { name: 'Next action' }).focus());
    expect(screen.queryByRole('group', { name: 'Apparence' })).toBeNull();
    expect(document.activeElement.textContent).toBe('Next action');
  });

  it('follows the device only in System mode and restores an explicit choice', async () => {
    const view = preferences(<PreferencesControls />);
    const appearance = screen.getByRole('group', { name: 'Appearance' });
    act(() => { media.matches = true; listeners.forEach(listener => listener()); });
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    fireEvent.click(within(appearance).getByRole('button', { name: 'Light', exact: true }));
    await waitFor(() => expect(localStorage.getItem('theme')).toBe('light'));
    act(() => { media.matches = false; listeners.forEach(listener => listener()); media.matches = true; listeners.forEach(listener => listener()); });
    expect(document.documentElement.classList.contains('light')).toBe(true);
    expect(listeners.size).toBe(0);
    view.unmount();
    preferences(<PreferencesControls />);
    expect(screen.getByRole('button', { name: 'Light', exact: true }).getAttribute('aria-pressed')).toBe('true');
    fireEvent.click(screen.getByRole('button', { name: 'Use device setting' }));
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem('theme')).toBe('system');
  });

  it('keeps controls usable when storage is unavailable', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('Storage unavailable'); });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('Storage unavailable'); });
    preferences(<PreferencesControls />);
    fireEvent.click(screen.getByRole('button', { name: 'Français' }));
    fireEvent.click(screen.getByRole('button', { name: 'Sombre' }));
    expect(document.documentElement.lang).toBe('fr');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('gives each trigger its own panel and closes on an outside pointer', () => {
    preferences(<><PreferencesPopover /><PreferencesPopover /><button type="button">Outside</button></>);
    const triggers = screen.getAllByRole('button', { name: 'Preferences', exact: true });
    expect(triggers[0].getAttribute('aria-controls')).not.toBe(triggers[1].getAttribute('aria-controls'));
    fireEvent.click(triggers[1]);
    expect(document.getElementById(triggers[1].getAttribute('aria-controls'))).toBeTruthy();
    fireEvent.pointerDown(screen.getByRole('button', { name: 'Outside' }));
    expect(triggers[1].getAttribute('aria-expanded')).toBe('false');
  });
});
