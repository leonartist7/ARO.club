import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { createMemoryRouter, RouterProvider } from '../test/next-router';
import { LanguageProvider } from '../contexts/LanguageContext';
import OnboardingPreview from './OnboardingPreview';

afterEach(() => {
  cleanup();
  localStorage.clear();
  vi.unstubAllGlobals();
});

describe('onboarding app handoff', () => {
  it.each([
    ['Find a class', 'Photography', 'See my first idea'],
    ['Teach a skill', 'Conversation practice', 'Preview my class draft'],
    ['Explore both', 'Photography', 'See my first idea'],
  ])('takes the %s path into the app without putting answers in the URL', (intent, choice, action) => {
    vi.stubGlobal('React', React);
    const router = createMemoryRouter([
      { path: '/onboarding/preview', element: <OnboardingPreview /> },
      { path: '/app', element: <h1>App route reached</h1> },
    ], { initialEntries: ['/onboarding/preview'] });
    render(<LanguageProvider><RouterProvider router={router} /></LanguageProvider>);

    fireEvent.click(screen.getByRole('button', { name: 'Skip introduction' }));
    fireEvent.click(screen.getByRole('button', { name: new RegExp(intent) }));
    fireEvent.change(screen.getByLabelText('What should we call you?'), { target: { value: 'Sample Person' } });
    fireEvent.change(screen.getByLabelText('Your age'), { target: { value: '30' } });
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }));
    fireEvent.change(screen.getByLabelText('City or area'), { target: { value: 'Grenoble' } });
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }));
    fireEvent.click(screen.getByRole('button', { name: new RegExp(choice) }));
    fireEvent.click(screen.getByRole('button', { name: action }));

    expect(screen.getByRole('link', { name: 'Continue to app' }).getAttribute('href')).toBe('/app');
    fireEvent.click(screen.getByRole('link', { name: 'Continue to app' }));
    expect(screen.getByRole('heading', { name: 'App route reached' })).toBeTruthy();
  });
});
