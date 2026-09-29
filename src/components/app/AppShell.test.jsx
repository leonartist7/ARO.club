import React from 'react'
import { cleanup, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import AppShell from './AppShell'
import AppNotFoundPage from '../../views/AppNotFoundPage'

const navigation = vi.hoisted(() => ({ pathname: '/app', language: 'en' }))
afterEach(() => { cleanup(); navigation.language = 'en' })
vi.mock('next/navigation', () => ({
  usePathname: () => navigation.pathname,
  useSearchParams: () => new URLSearchParams(),
}))
vi.mock('next/link', () => ({ default: ({ href, children, ...props }) => <a href={href} {...props}>{children}</a> }))

vi.mock('../brand/AroMark', () => ({ AroWordmark: () => <span>ARO mark</span> }))
vi.mock('./AppPrimitives', () => ({ AppAvatar: () => <span>MN</span> }))
vi.mock('../ui/Preferences', () => ({ PreferencesControls: () => <span data-testid="preference-controls" /> }))
vi.mock('../../contexts/LanguageContext', () => ({ useLanguage: () => ({ language: navigation.language }) }))

function renderApp(path) {
  navigation.pathname = path
  render(<AppShell>{path === '/app/unknown-example' ? <AppNotFoundPage /> : <p>Route content</p>}</AppShell>)
}

describe('FV-1 app shell', () => {
  it('discloses the fictional preview and keeps unavailable controls non-actionable', () => {
    renderApp('/app')
    expect(screen.getByText('Fictional preview. No live accounts, reservations or payments.')).toBeTruthy()
    expect(screen.getByLabelText(/Search preview/).tagName).toBe('SPAN')
    expect(screen.getByLabelText(/Notifications preview/).tagName).toBe('SPAN')
  })

  it('turns the central Create entrance into a World exit on Create', () => {
    renderApp('/app')
    expect(within(screen.getByRole('navigation', { name: 'Primary app navigation' })).getByRole('link', { name: 'Create' }).getAttribute('href')).toBe('/app/create')
    cleanup()
    renderApp('/app/create')
    expect(within(screen.getByRole('navigation', { name: 'Primary app navigation' })).getByRole('link', { name: 'Back to World' }).getAttribute('href')).toBe('/app/world')
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


it.each([
  ['fr', 'Navigation principale de l’application', 'Accueil', 'Monde', 'Aperçus', 'Bibliothèque', 'Calgary · Votre monde', 'Aller au contenu principal'],
  ['es', 'Navegación principal de la aplicación', 'Inicio', 'Mundo', 'Ideas', 'Biblioteca', 'Calgary · Tu mundo', 'Saltar al contenido principal'],
])('retains localized navigation, status and skip access in %s after reconciliation', (language, landmark, home, world, insights, library, status, skip) => {
  navigation.language = language
  renderApp('/app')
  const nav = within(screen.getByRole('navigation', { name: landmark }))
  for (const [label, href] of [[home, '/app'], [world, '/app/world'], [insights, '/app/insights'], [library, '/app/library']]) {
    expect(nav.getByRole('link', { name: label }).getAttribute('href')).toBe(href)
  }
  expect(screen.getByText(status)).toBeTruthy()
  expect(screen.getByRole('link', { name: skip }).getAttribute('href')).toBe('#app-main')
})
