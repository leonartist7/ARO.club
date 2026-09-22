import React from 'react'
import { cleanup, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import AppShell from './AppShell'
import AppNotFoundPage from '../../views/AppNotFoundPage'

vi.mock('../../contexts/LanguageContext', () => ({ useLanguage: () => ({ language: 'en' }) }))

const navigation = vi.hoisted(() => ({ pathname: '/app' }))
afterEach(cleanup)
vi.mock('next/navigation', () => ({
  usePathname: () => navigation.pathname,
  useSearchParams: () => new URLSearchParams(),
}))
vi.mock('next/link', () => ({ default: ({ href, children, ...props }) => <a href={href} {...props}>{children}</a> }))

vi.mock('../brand/AroMark', () => ({ default: () => <span>ARO mark</span> }))
vi.mock('./AppPrimitives', () => ({ AppAvatar: () => <span>MN</span> }))

function renderApp(path) {
  navigation.pathname = path
  render(<AppShell>{path === '/app/unknown-example' ? <AppNotFoundPage /> : <p>Route content</p>}</AppShell>)
}

describe('FV-1 app shell', () => {
  it('discloses the fictional preview and offers useful navigation', () => {
    renderApp('/app')
    expect(screen.getByText('Fictional preview. No live accounts, reservations or payments.')).toBeTruthy()
    expect(screen.getByLabelText('Explore opportunities').getAttribute('href')).toBe('/app/opportunities')
    expect(screen.getByLabelText('Your world').getAttribute('href')).toBe('/app/personalize')
  })

  it('sends the Create close control to World', () => {
    renderApp('/app/create')
    expect(screen.getByRole('link', { name: 'Back to World' }).getAttribute('href')).toBe('/app/world')
  })

  it('recovers unknown app routes inside the shell', () => {
    renderApp('/app/unknown-example')
    expect(screen.getByRole('heading', { name: 'Example unavailable' })).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Back to World' }).getAttribute('href')).toBe('/app/world')
  })

  it('keeps Explore selected for opportunity routes', () => {
    renderApp('/app/opportunities/shared-stories')
    const navigation = screen.getAllByRole('navigation', { name: 'Primary app navigation' }).at(-1)
    expect(within(navigation).getByRole('link', { name: 'Explore' }).getAttribute('aria-current')).toBe('page')
  })
})
