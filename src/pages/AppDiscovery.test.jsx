import React from 'react'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import AppShell from '../components/app/AppShell'
import { LanguageProvider } from '../contexts/LanguageContext'
import { fv1DiscoveryCopy, getDiscoveryFormationStatus } from '../i18n/fv1/discovery'
import AppCreatePage from './AppCreatePage'
import AppHomePage from './AppHomePage'
import AppOpportunitiesPage from './AppOpportunitiesPage'
import AppWorldPage from './AppWorldPage'

const routes = [
  {
    path: '/app',
    element: <AppShell />,
    children: [
      { index: true, element: <AppHomePage /> },
      { path: 'world', element: <AppWorldPage /> },
      { path: 'opportunities', element: <AppOpportunitiesPage /> },
      { path: 'create', element: <AppCreatePage /> },
      { path: 'opportunities/:id', element: <p>Example detail target</p> },
      { path: 'profile', element: <p>Profile target</p> },
      { path: 'insights', element: <p>Insights target</p> },
      { path: 'library', element: <p>Library target</p> },
    ],
  },
]

function renderDiscovery(path, language = 'en') {
  localStorage.setItem('conversa-language', language)
  const router = createMemoryRouter(routes, { initialEntries: [path] })
  const view = render(
    <LanguageProvider>
      <RouterProvider router={router} />
    </LanguageProvider>,
  )
  return { router, ...view }
}

function structureOf(value) {
  if (typeof value === 'function') return 'function'
  if (Array.isArray(value)) return value.map(structureOf)
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, structureOf(value[key])]))
  }
  return typeof value
}

beforeEach(() => {
  localStorage.clear()
  vi.stubGlobal('React', React)
})

afterEach(() => {
  cleanup()
  localStorage.clear()
  vi.unstubAllGlobals()
})

describe('FV-1 F4 Create exits and local Seed Studio', () => {
  it('routes the shell Close and both Create World-return affordances to /app/world', () => {
    renderDiscovery('/app/create')

    expect(screen.getByRole('link', { name: 'Back to World' }).getAttribute('href')).toBe('/app/world')
    expect(screen.getByRole('link', { name: 'Close Seed Studio and return to World' }).getAttribute('href')).toBe('/app/world')
    expect(screen.getByRole('link', { name: 'Return to World' }).getAttribute('href')).toBe('/app/world')
  })

  it('keeps Learn/Share/Gather local, reversible and free of network side effects', () => {
    const fetchSpy = vi.fn()
    vi.stubGlobal('fetch', fetchSpy)
    const first = renderDiscovery('/app/create')

    const learn = screen.getByRole('button', { name: /Learn/ })
    const share = screen.getByRole('button', { name: /Share/ })
    expect(learn.getAttribute('aria-pressed')).toBe('true')
    expect(screen.getByText('A shared table could begin to form.')).toBeTruthy()

    fireEvent.click(share)
    expect(share.getAttribute('aria-pressed')).toBe('true')
    expect(learn.getAttribute('aria-pressed')).toBe('false')
    expect(screen.getByText('A light-seeking Circle could take shape.')).toBeTruthy()
    expect(fetchSpy).not.toHaveBeenCalled()

    first.unmount()
    renderDiscovery('/app/create')
    expect(screen.getByRole('button', { name: /Learn/ }).getAttribute('aria-pressed')).toBe('true')
    expect(screen.getByText('A shared table could begin to form.')).toBeTruthy()
    expect(fetchSpy).not.toHaveBeenCalled()
  })
})

describe('FV-1 F4 truthful discovery', () => {
  it('renders the canonical F3 counts, minimums and derived formation meaning without conflicting claims', () => {
    renderDiscovery('/app/opportunities')

    expect(screen.getByText('6 of 8 example places')).toBeTruthy()
    expect(screen.getByText('Example minimum reached. Nothing is confirmed or booked.')).toBeTruthy()

    expect(screen.getByText('3 of 10 example places')).toBeTruthy()
    expect(screen.getAllByText('Example minimum: 6').length).toBe(3)
    expect(screen.getByText('3 more example participants to reach the minimum.')).toBeTruthy()

    expect(screen.getByText('8 of 8 example places')).toBeTruthy()
    expect(screen.getByText('Example full.')).toBeTruthy()

    expect(screen.queryByText(/people are interested/i)).toBeNull()
    expect(screen.queryByText(/forming a table/i)).toBeNull()
    expect(screen.queryByText(/joining/i)).toBeNull()
  })

  it('presents search and status filters as explained non-actionable previews', () => {
    renderDiscovery('/app/opportunities')

    expect(screen.queryByRole('textbox')).toBeNull()
    expect(screen.queryByRole('tab')).toBeNull()
    expect(screen.getAllByRole('img', { name: 'Search preview. Not available in this preview.' }).length).toBeGreaterThanOrEqual(2)
    expect(screen.getByRole('img', { name: 'Status filters preview. Not available in this preview.' })).toBeTruthy()
    expect(screen.getAllByText('Not available in this preview.').length).toBeGreaterThanOrEqual(2)
  })

  it('keeps discovery links pointed at the existing intended routes', () => {
    const home = renderDiscovery('/app')
    expect(screen.getByRole('link', { name: 'Open fictional example: River light photo walk' }).getAttribute('href')).toBe('/app/opportunities/river-photo-walk')
    expect(screen.getByRole('link', { name: 'Open Seed Studio' }).getAttribute('href')).toBe('/app/create')
    home.unmount()

    renderDiscovery('/app/world')
    expect(screen.getByRole('link', { name: 'All examples' }).getAttribute('href')).toBe('/app/opportunities')
    expect(screen.getByRole('link', { name: /Open Seed Studio/ }).getAttribute('href')).toBe('/app/create')
  })

  it('uses the frozen F1 responsive media interface on F4 image surfaces', () => {
    const home = renderDiscovery('/app')
    const homeHero = screen.getByAltText('A person standing beside an illuminated portal overlooking a river at sunset')
    expect(homeHero.getAttribute('src')).toBe('/fv1/aro-portal-home-v1-1440.webp')
    expect(homeHero.getAttribute('srcset')).toContain('/fv1/aro-portal-home-v1-640.webp 640w')
    expect(homeHero.getAttribute('srcset')).toContain('/fv1/aro-portal-home-v1-1440.webp 1440w')
    expect(homeHero.getAttribute('sizes')).toBe('(max-width: 767px) 100vw, 1440px')
    home.unmount()

    const opportunitiesView = renderDiscovery('/app/opportunities')
    const riverCard = screen.getByAltText('A small photography group gathering beside a river at golden hour')
    expect(riverCard.getAttribute('src')).toBe('/fv1/aro-river-light-circle-v1-1440.webp')
    expect(riverCard.getAttribute('srcset')).toContain('/fv1/aro-river-light-circle-v1-640.webp 640w')
    expect(riverCard.getAttribute('sizes')).toBe('(max-width: 767px) 100vw, 640px')
    opportunitiesView.unmount()

    const world = renderDiscovery('/app/world')
    const miniature = world.container.querySelector('img[src*="aro-living-miniature-calgary-v1"]')
    expect(miniature).toBeTruthy()
    expect(miniature.getAttribute('srcset')).toContain('/fv1/aro-living-miniature-calgary-v1-640.webp 640w')
    expect(miniature.getAttribute('srcset')).toContain('/fv1/aro-living-miniature-calgary-v1-1440.webp 1440w')
  })
})

describe('FV-1 F4 language parity', () => {
  it('keeps EN, FR and ES discovery key structures equivalent and formation meaning aligned', () => {
    expect(structureOf(fv1DiscoveryCopy.fr)).toEqual(structureOf(fv1DiscoveryCopy.en))
    expect(structureOf(fv1DiscoveryCopy.es)).toEqual(structureOf(fv1DiscoveryCopy.en))

    const fixture = { exampleCount: 3, minimum: 6, capacity: 10 }
    expect(getDiscoveryFormationStatus(fv1DiscoveryCopy.en, fixture)).toContain('3 more')
    expect(getDiscoveryFormationStatus(fv1DiscoveryCopy.fr, fixture)).toContain('3 participants')
    expect(getDiscoveryFormationStatus(fv1DiscoveryCopy.es, fixture)).toContain('3 participantes')
  })

  it.each([
    ['fr', '/app/opportunities', '6 sur 8 places d’exemple'],
    ['es', '/app/opportunities', '3 de 10 lugares de ejemplo'],
    ['fr', '/app/create', 'Retour au Monde'],
    ['es', '/app/create', 'Volver al Mundo'],
  ])('renders active %s F4 copy on %s', (language, path, expectedText) => {
    renderDiscovery(path, language)
    expect(screen.getAllByText(expectedText).length).toBeGreaterThan(0)
  })
})
