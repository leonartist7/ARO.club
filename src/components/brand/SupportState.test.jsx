import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ErrorState, LoadingState } from './SupportState';

const state = vi.hoisted(() => ({ language: 'en' }));
vi.mock('../../contexts/LanguageContext', () => ({ useOptionalLanguage: () => state.language ? { language: state.language } : undefined }));
vi.mock('./AroMark', () => ({ AroWordmark: () => <span>ARO</span> }));
afterEach(cleanup);

describe('shared support states', () => {
  for (const [language, title, retryLabel] of [
    ['en', 'We couldn’t open this page.', 'Try again'],
    ['fr', 'Nous n’avons pas pu ouvrir cette page.', 'Réessayer'],
    ['es', 'No pudimos abrir esta página.', 'Intentar de nuevo'],
  ]) {
    it(`shows ${language} error copy and connects retry to the boundary`, () => {
      state.language = language;
      const retry = vi.fn();
      render(<ErrorState retry={retry} />);
      expect(screen.getByRole('heading', { name: title })).toBeTruthy();
      expect(screen.getByRole('main').getAttribute('lang')).toBe(language);
      expect(screen.getByRole('link').getAttribute('href')).toBe('/');
      fireEvent.click(screen.getByRole('button', { name: retryLabel }));
      expect(retry).toHaveBeenCalledOnce();
    });
  }

  it('announces loading in the selected language and falls back to English without a provider', () => {
    state.language = 'fr';
    const view = render(<LoadingState />);
    expect(screen.getByRole('status').textContent).toContain('Ouverture d’ARO');
    view.unmount();
    state.language = '';
    render(<LoadingState />);
    expect(screen.getByRole('status').textContent).toContain('Opening ARO');
  });
});
