import React from 'react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';

vi.mock('../../contexts/LanguageContext', () => ({ useLanguage: () => ({ t: (key) => key, language: 'en' }) }));
vi.mock('../../lib/navigation', () => ({
  Link: ({ to, children, ...props }) => <a href={to} {...props}>{children}</a>,
}));

import Footer from './Footer';

beforeEach(() => { globalThis.React = React; });
afterEach(cleanup);

it('keeps mobile navigation compact and expandable with native disclosure semantics', () => {
  const { container } = render(<Footer />);
  const disclosure = container.querySelector('details');

  expect(disclosure).not.toBeNull();
  expect(disclosure.open).toBe(false);
  expect(screen.getByText('footer.links.title')).toBeTruthy();
  expect(screen.getByRole('navigation', { name: 'footer.legal.title' })).toBeTruthy();
});

it('preserves every existing public and legal destination', () => {
  const { container } = render(<Footer />);
  const hrefs = [...container.querySelectorAll('a[href]')].map((link) => link.getAttribute('href'));

  for (const href of [
    '/', '/onboarding/preview', '/about', '/how-it-works', '/for-teachers', '/faq',
    '/explore', '/map', '/contact', '/privacy', '/terms', '/cookies',
  ]) {
    expect(hrefs).toContain(href);
  }
});
