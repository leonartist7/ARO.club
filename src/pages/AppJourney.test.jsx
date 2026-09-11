import React from 'react'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { LanguageProvider } from '../contexts/LanguageContext'
import { circles, findOpportunity, opportunities, opportunityFormation } from '../data/aroApp'
import { fv1JourneyCopy, getFv1FormationStatus } from '../i18n/fv1/journey'
import AppCircleRoomPage from './AppCircleRoomPage'
import AppCirclesPage from './AppCirclesPage'
import AppCommitPage from './AppCommitPage'
import AppOpportunityDetailPage from './AppOpportunityDetailPage'

const routes = [
  { path: '/app/world', element: <p>World</p> },
  { path: '/app/opportunities/:id', element: <AppOpportunityDetailPage /> },
  { path: '/app/opportunities/:id/commit', element: <AppCommitPage /> },
  { path: '/app/circles', element: <AppCirclesPage /> },
  { path: '/app/circles/:id', element: <AppCircleRoomPage /> },
]

function renderJourney(path, language = 'en') {
  localStorage.setItem('conversa-language', language)
  const router = createMemoryRouter(routes, { initialEntries: [path] })
  const view = render(
    <LanguageProvider>
      <RouterProvider router={router} />
    </LanguageProvider>,
  )
  return { router, ...view }
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

describe('FV-1 F3 formation fixtures', () => {
  it('uses one numeric fixture source and preserves the approved counts, minimums and capacities', () => {
    expect(opportunityFormation).toEqual({
      'shared-stories': { exampleCount: 6, minimum: 6, capacity: 8 },
      'river-photo-walk': { exampleCount: 3, minimum: 6, capacity: 10 },
      'repair-table': { exampleCount: 8, minimum: 6, capacity: 8 },
    })

    expect(opportunities.map(({ id, exampleCount, minimum, capacity }) => ({ id, exampleCount, minimum, capacity }))).toEqual([
      { id: 'shared-stories', exampleCount: 6, minimum: 6, capacity: 8 },
      { id: 'river-photo-walk', exampleCount: 3, minimum: 6, capacity: 10 },
      { id: 'repair-table', exampleCount: 8, minimum: 6, capacity: 8 },
    ])

    expect(opportunities.map(({ people, threshold }) => ({ people, threshold }))).toEqual([
      { people: '6 of 8 places', threshold: 6 },
      { people: '3 of 10 places', threshold: 6 },
      { people: '8 of 8 places', threshold: 6 },
    ])

    expect(circles.map(({ id, members, minimum, capacity }) => ({ id, members, minimum, capacity }))).toEqual([
      { id: 'shared-stories', members: 6, minimum: 6, capacity: 8 },
      { id: 'repair-table', members: 8, minimum: 6, capacity: 8 },
    ])
    expect(findOpportunity('missing-example')).toBeUndefined()
  })

  it.each([
    ['shared-stories', '6 of 8 example places', 'Example minimum reached. Nothing is confirmed or booked.'],
    ['river-photo-walk', '3 of 10 example places', '3 more example participants to reach the minimum.'],
    ['repair-table', '8 of 8 example places', 'Example full.'],
  ])('renders truthful derived detail state for %s', (id, countText, statusText) => {
    renderJourney(`/app/opportunities/${id}`)
    expect(screen.getAllByText(countText).length).toBeGreaterThan(0)
    expect(screen.getAllByText(statusText).length).toBeGreaterThan(0)
    expect(screen.getAllByText('Fictional local example').length).toBeGreaterThan(0)
  })
})

describe('FV-1 F3 local join preview', () => {
  it('adds at most one local person, is idempotent, discloses nothing is booked and resets explicitly', () => {
    const fetchSpy = vi.fn()
    vi.stubGlobal('fetch', fetchSpy)
    renderJourney('/app/opportunities/river-photo-walk/commit')

    expect(screen.getByText('3/10')).toBeTruthy()
    expect(screen.getByText('This preview resets when you leave this page or reload.')).toBeTruthy()

    const joinButton = screen.getByRole('button', { name: /Try joining this example/ })
    expect(joinButton.disabled).toBe(false)
    fireEvent.click(joinButton)
    fireEvent.click(joinButton)

    expect(screen.getByText('4/10')).toBeTruthy()
    expect(screen.getByText('Added to this example only. Nothing booked.')).toBeTruthy()
    expect(joinButton.disabled).toBe(true)
    expect(fetchSpy).not.toHaveBeenCalled()

    fireEvent.click(screen.getByRole('button', { name: 'Reset example' }))
    expect(screen.getByText('3/10')).toBeTruthy()
    expect(screen.queryByText('Added to this example only. Nothing booked.')).toBeNull()
  })

  it('lets the at-minimum example preview one local increment without changing the baseline fixture', () => {
    renderJourney('/app/opportunities/shared-stories/commit')
    expect(screen.getByText('6/8')).toBeTruthy()
    expect(screen.getByText('Example minimum reached. Nothing is confirmed or booked.')).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: /Try joining this example/ }))
    expect(screen.getByText('7/8')).toBeTruthy()
    expect(findOpportunity('shared-stories').exampleCount).toBe(6)
  })

  it('does not allow the full example to join', () => {
    renderJourney('/app/opportunities/repair-table/commit')
    const joinButton = screen.getByRole('button', { name: /Try joining this example/ })
    expect(joinButton.disabled).toBe(true)
    fireEvent.click(joinButton)
    expect(screen.getByText('8/8')).toBeTruthy()
    expect(screen.getAllByText('Example full.').length).toBeGreaterThan(0)
  })

  it('resets after leaving and re-entering the commit route', async () => {
    renderJourney('/app/opportunities/river-photo-walk/commit')
    fireEvent.click(screen.getByRole('button', { name: /Try joining this example/ }))
    expect(screen.getByText('4/10')).toBeTruthy()

    fireEvent.click(screen.getByRole('link', { name: 'Back to example opportunity' }))
    expect((await screen.findAllByText('3 of 10 example places')).length).toBeGreaterThan(0)

    fireEvent.click(await screen.findByRole('link', { name: 'Open local join preview' }))
    expect(await screen.findByText('3/10')).toBeTruthy()
    expect(screen.queryByText('Added to this example only. Nothing booked.')).toBeNull()
  })

  it('does not persist the local increment across a remount that represents reload', () => {
    const first = renderJourney('/app/opportunities/river-photo-walk/commit')
    fireEvent.click(screen.getByRole('button', { name: /Try joining this example/ }))
    expect(screen.getByText('4/10')).toBeTruthy()
    first.unmount()

    renderJourney('/app/opportunities/river-photo-walk/commit')
    expect(screen.getByText('3/10')).toBeTruthy()
  })
})

describe('FV-1 F3 direct Circle baseline and local chat', () => {
  it.each([
    ['shared-stories', '6 of 8 example places'],
    ['river-photo-walk', '3 of 10 example places'],
    ['repair-table', '8 of 8 example places'],
  ])('opens %s at its baseline without claiming the visitor joined', (id, countText) => {
    renderJourney(`/app/circles/${id}`)
    expect(screen.getByText(countText)).toBeTruthy()
    expect(screen.getAllByText('Example Circle — nothing booked.').length).toBeGreaterThan(0)
    expect(screen.queryByText(/^You joined\b/i)).toBeNull()
  })

  it('labels the Circle return link with its actual commitment destination', () => {
    renderJourney('/app/circles/river-photo-walk')
    const returnLink = screen.getByRole('link', { name: 'Back to commitment' })
    expect(returnLink.getAttribute('href')).toBe('/app/opportunities/river-photo-walk/commit')
  })

  it('keeps Circle messages local and explicitly unsent', () => {
    const fetchSpy = vi.fn()
    vi.stubGlobal('fetch', fetchSpy)
    renderJourney('/app/circles/river-photo-walk')

    expect(screen.getByText('Local chat preview only. Messages are not sent and reset when you leave or reload.')).toBeTruthy()
    fireEvent.change(screen.getByLabelText('Local Circle message'), { target: { value: 'Local test message' } })
    fireEvent.click(screen.getByRole('button', { name: 'Add local message' }))

    expect(screen.getByText('Local test message')).toBeTruthy()
    expect(screen.getByText('Local visitor')).toBeTruthy()
    expect(fetchSpy).not.toHaveBeenCalled()
  })
})

describe('FV-1 F3 missing examples and translations', () => {
  it.each([
    '/app/opportunities/unknown-opportunity',
    '/app/opportunities/unknown-commitment/commit',
    '/app/circles/unknown-circle',
  ])('recovers %s honestly and returns to World', (path) => {
    renderJourney(path)
    expect(screen.getByRole('heading', { name: 'Example unavailable' })).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Back to World' }).getAttribute('href')).toBe('/app/world')
    expect(screen.queryByText('Spanish through shared stories')).toBeNull()
  })

  it('keeps EN, FR and ES F3 key parity and equivalent formation states', () => {
    const englishKeys = Object.keys(fv1JourneyCopy.en).sort()
    expect(Object.keys(fv1JourneyCopy.fr).sort()).toEqual(englishKeys)
    expect(Object.keys(fv1JourneyCopy.es).sort()).toEqual(englishKeys)

    const fixture = { exampleCount: 3, minimum: 6, capacity: 10 }
    expect(getFv1FormationStatus(fv1JourneyCopy.en, fixture)).toContain('3 more')
    expect(getFv1FormationStatus(fv1JourneyCopy.fr, fixture)).toContain('3 participants')
    expect(getFv1FormationStatus(fv1JourneyCopy.es, fixture)).toContain('3 participantes')
  })

  it.each([
    ['fr', '/app/opportunities/river-photo-walk', '3 sur 10 places d’exemple'],
    ['es', '/app/opportunities/river-photo-walk/commit', 'Prueba el flujo de compromiso sin reservar nada.'],
    ['fr', '/app/circles', 'Circles d’exemple'],
    ['es', '/app/circles/river-photo-walk', 'Circle de ejemplo — nada reservado.'],
  ])('renders active %s journey copy on %s', (language, path, expectedText) => {
    renderJourney(path, language)
    expect(screen.getAllByText(expectedText).length).toBeGreaterThan(0)
  })
})
