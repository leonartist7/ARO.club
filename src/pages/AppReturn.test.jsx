import React from 'react'
import { statSync } from 'node:fs'
import path from 'node:path'
import { cleanup, render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import AppShell from '../components/app/AppShell'
import { fv1ReturnCopy } from '../i18n/fv1/return'
import AppInsightsPage from './AppInsightsPage'
import AppLibraryPage from './AppLibraryPage'
import AppPassportPage from './AppPassportPage'
import AppSettingsPage from './AppSettingsPage'

const routes = [
  {
    path: '/app',
    element: <AppShell />,
    children: [
      { path: 'insights', element: <AppInsightsPage /> },
      { path: 'passport', element: <AppPassportPage /> },
      { path: 'library', element: <AppLibraryPage /> },
      { path: 'settings', element: <AppSettingsPage /> },
      { path: 'profile', element: <p>Profile target</p> },
      { path: 'opportunities', element: <p>Opportunities target</p> },
      { path: 'opportunities/:id', element: <p>Opportunity detail target</p> },
    ],
  },
]

function renderReturn(route, language = 'en') {
  localStorage.setItem('conversa-language', language)
  const router = createMemoryRouter(routes, { initialEntries: [route] })
  const view = render(<RouterProvider router={router} />)
  return { router, ...view }
}

function structureOf(value) {
  if (Array.isArray(value)) return value.map(structureOf)
  if (value && typeof value === 'object') return Object.fromEntries(Object.keys(value).sort().map((key) => [key, structureOf(value[key])]))
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

describe('FV-1 F6 Library dispositions', () => {
  it('renders exactly six rows with two truthful opportunity links and four explicit unavailable examples', () => {
    const view = renderReturn('/app/library')
    const rows = [...view.container.querySelectorAll('[data-fv1-library-row]')]
    expect(rows).toHaveLength(6)

    const linked = rows.filter((row) => row.getAttribute('data-fv1-disposition') === 'linked')
    const unavailable = rows.filter((row) => row.getAttribute('data-fv1-disposition') === 'unavailable')
    expect(linked).toHaveLength(2)
    expect(unavailable).toHaveLength(4)

    expect(view.container.querySelector('[data-fv1-library-row="river"]')?.getAttribute('href')).toBe('/app/opportunities/river-photo-walk')
    expect(view.container.querySelector('[data-fv1-library-row="stories"]')?.getAttribute('href')).toBe('/app/opportunities/shared-stories')
    expect(screen.getByText('River light photo walk')).toBeTruthy()
    expect(screen.getByText('Spanish through shared stories')).toBeTruthy()
    expect(screen.getByText('Tonight · 7:00 PM')).toBeTruthy()
    expect(screen.getByText('Tomorrow · 10:00 AM')).toBeTruthy()

    for (const id of ['creative', 'lisbon', 'memories', 'items']) {
      const row = view.container.querySelector(`[data-fv1-library-row="${id}"]`)
      expect(row?.querySelector('a')).toBeNull()
      expect(row?.textContent).toContain('Not available in this preview.')
    }
    expect(view.container.querySelector('a[href="/app/library"]')).toBeNull()
  })

  it('renders category filters as informational previews rather than fake interactive tabs', () => {
    const view = renderReturn('/app/library')
    const filters = [...view.container.querySelectorAll('[data-fv1-library-filter]')]
    expect(filters).toHaveLength(5)
    expect(filters.every((filter) => filter.tagName === 'SPAN')).toBe(true)
    expect(screen.queryByRole('tab')).toBeNull()
    expect(screen.getByText(/Category filters are previews only/)).toBeTruthy()
  })
})

describe('FV-1 F6 return truthfulness', () => {
  it('qualifies Insights money, history and metrics as fictional examples on direct entry', () => {
    const view = renderReturn('/app/insights')
    expect(view.container.querySelector('[data-fv1-direct-entry="insights"]')).toBeTruthy()
    expect(screen.getByText('Example earnings')).toBeTruthy()
    expect(screen.getByText(/not a live record, balance, proof or verification/)).toBeTruthy()
    expect(screen.queryByText(/earned through ARO/i)).toBeNull()
    expect(screen.queryByRole('tab')).toBeNull()

    const hero = screen.getByAltText('Four fictional people looking over a river city at sunset')
    expect(hero.getAttribute('src')).toContain('/fv1/aro-season-discovery-v1-1440.webp')
    expect(hero.getAttribute('srcset')).toContain('/fv1/aro-season-discovery-v1-640.webp 640w')
    expect(hero.className).toContain('object-[62%_center]')
  })

  it('qualifies Passport as fictional and uses F1 responsive hero and thumbnail derivatives', () => {
    const view = renderReturn('/app/passport')
    expect(view.container.querySelector('[data-fv1-direct-entry="passport"]')).toBeTruthy()
    expect(screen.getByText('Example Passport')).toBeTruthy()
    expect(screen.getByText(/not proof, verification, a saved history or an editable participant record/)).toBeTruthy()
    expect(screen.queryByText('Recorded')).toBeNull()
    expect(screen.queryByText(/editable/i)).not.toBeNull()

    const hero = screen.getByAltText('Fictional twilight riverside life-map example')
    expect(hero.getAttribute('src')).toContain('/fv1/aro-passport-life-map-v1-1440.webp')
    expect(hero.getAttribute('srcset')).toContain('/fv1/aro-passport-life-map-v1-640.webp 640w')
    expect(hero.className).toContain('object-[69%_center]')

    const entries = [...view.container.querySelectorAll('[data-fv1-passport-entry]')]
    expect(entries).toHaveLength(3)
    for (const entry of entries) {
      const image = entry.querySelector('img')
      expect(image?.getAttribute('src')).toMatch(/\/fv1\/.*-160\.webp$/)
      expect(entry.textContent).toContain('Example')
    }
  })

  it('makes every Settings row visibly unavailable and non-actionable', () => {
    const view = renderReturn('/app/settings')
    expect(view.container.querySelector('[data-fv1-direct-entry="settings"]')).toBeTruthy()
    const rows = [...view.container.querySelectorAll('[data-fv1-setting-row]')]
    expect(rows).toHaveLength(6)
    for (const row of rows) {
      expect(row.querySelector('button')).toBeNull()
      expect(row.querySelector('a')).toBeNull()
      expect(row.textContent).toContain('Not available in this preview.')
    }
    expect(screen.getByText(/does not create accounts, stored preferences or editable privacy controls/)).toBeTruthy()
  })
})

describe('FV-1 F6 localization and media evidence', () => {
  it('keeps EN, FR and ES return-copy structures equivalent and marks localized surfaces', () => {
    expect(structureOf(fv1ReturnCopy.fr)).toEqual(structureOf(fv1ReturnCopy.en))
    expect(structureOf(fv1ReturnCopy.es)).toEqual(structureOf(fv1ReturnCopy.en))

    const french = renderReturn('/app/library', 'fr')
    expect(french.container.querySelector('[lang="fr"]')).toBeTruthy()
    expect(screen.getByText('Votre bibliothèque')).toBeTruthy()
    french.unmount()

    const spanish = renderReturn('/app/settings', 'es')
    expect(spanish.container.querySelector('[lang="es"]')).toBeTruthy()
    expect(screen.getByText('Ajustes')).toBeTruthy()
  })

  it('keeps F6 F1-derived thumbnail and mobile hero candidates within frozen byte budgets', () => {
    const files = [
      ['aro-passport-life-map-v1-160.webp', 20_000],
      ['aro-river-light-circle-v1-160.webp', 20_000],
      ['aro-shared-stories-table-v1-160.webp', 20_000],
      ['aro-portal-home-v1-160.webp', 20_000],
      ['aro-season-discovery-v1-640.webp', 250_000],
      ['aro-passport-life-map-v1-640.webp', 250_000],
    ]
    for (const [file, maximumBytes] of files) {
      const bytes = statSync(path.join(process.cwd(), 'public', 'fv1', file)).size
      expect(bytes, `${file} should not be empty`).toBeGreaterThan(0)
      expect(bytes, `${file} exceeds the frozen F1 budget`).toBeLessThanOrEqual(maximumBytes)
    }
  })
})
