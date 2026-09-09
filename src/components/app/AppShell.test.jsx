import React from 'react'
import { fireEvent, render, screen, within } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import AppShell from './AppShell'
import AppNotFoundPage from '../../pages/AppNotFoundPage'

vi.mock('../brand/AroMark', () => ({ default: () => <span>ARO mark</span> }))
vi.mock('./AppPrimitives', () => ({ AppAvatar: () => <span>MN</span> }))

function renderApp(path) {
  const router = createMemoryRouter([{ path: '/app', element: <AppShell />, children: [
    { index: true, element: <p>Home</p> },
    { path: 'world', element: <p>World</p> },
    { path: 'create', element: <p>Create</p> },
    { path: '*', element: <AppNotFoundPage /> },
  ] }], { initialEntries: [path] })
  render(<RouterProvider router={router} />)
  return router
}

describe('FV-1 app shell', () => {
  it('discloses the fictional preview and keeps unavailable controls non-actionable', () => {
    renderApp('/app')
    expect(screen.getByText('Fictional preview. No live accounts, reservations or payments.')).toBeTruthy()
    expect(screen.getByLabelText(/Search preview/).tagName).toBe('SPAN')
    expect(screen.getByLabelText(/Notifications preview/).tagName).toBe('SPAN')
  })

  it('sends the Create close control to World', () => {
    const router = renderApp('/app/create')
    fireEvent.click(screen.getByLabelText('Back to World'))
    expect(router.state.location.pathname).toBe('/app/world')
  })

  it('recovers unknown app routes inside the shell', () => {
    renderApp('/app/unknown-example')
    expect(screen.getByRole('heading', { name: 'Example unavailable' })).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Back to World' }).getAttribute('href')).toBe('/app/world')
  })

  it('keeps World selected for opportunity routes', () => {
    renderApp('/app/opportunities/shared-stories')
    const navigation = screen.getAllByRole('navigation', { name: 'Primary app navigation' }).at(-1)
    expect(within(navigation).getByRole('link', { name: 'World' }).getAttribute('aria-current')).toBe('page')
  })
})
