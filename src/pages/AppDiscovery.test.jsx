/* global process */
import React from 'react'
import { spawn } from 'node:child_process'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { setTimeout as delay } from 'node:timers/promises'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { chromium } from 'playwright'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import AppShell from '../components/app/AppShell'
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
  const view = render(<RouterProvider router={router} />)
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

function resolveBrowserExecutable() {
  const candidates = [
    process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
    process.env.CHROME_PATH,
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    process.env.PROGRAMFILES ? `${process.env.PROGRAMFILES}\\Google\\Chrome\\Application\\chrome.exe` : null,
    process.env['PROGRAMFILES(X86)'] ? `${process.env['PROGRAMFILES(X86)']}\\Google\\Chrome\\Application\\chrome.exe` : null,
  ].filter(Boolean)

  const systemBrowser = candidates.find((candidate) => existsSync(candidate))
  if (systemBrowser) return systemBrowser

  const bundledBrowser = chromium.executablePath()
  if (bundledBrowser && existsSync(bundledBrowser)) return bundledBrowser
  throw new Error('F4_BROWSER_CAPABILITY_MISSING')
}

async function startF4BrowserServer() {
  const root = process.cwd()
  const vite = fileURLToPath(new URL(`file://${root}/node_modules/vite/bin/vite.js`))
  const port = 4179
  const base = `http://127.0.0.1:${port}`
  let output = ''
  const server = spawn(process.execPath, [vite, '--host', '127.0.0.1', '--port', String(port), '--strictPort'], {
    cwd: root,
    env: process.env,
    stdio: ['ignore', 'pipe', 'pipe'],
  })
  server.stdout.on('data', (chunk) => { output += chunk.toString() })
  server.stderr.on('data', (chunk) => { output += chunk.toString() })

  for (let attempt = 0; attempt < 80; attempt += 1) {
    if (server.exitCode !== null) throw new Error(`F4_VITE_EXITED: ${output.slice(-1200)}`)
    try {
      const response = await fetch(base, { signal: AbortSignal.timeout(750) })
      if (response.ok) return { base, server, output: () => output }
    } catch {
      // Readiness probe only.
    }
    await delay(250)
  }

  server.kill('SIGTERM')
  throw new Error(`F4_VITE_TIMEOUT: ${output.slice(-1200)}`)
}

async function readImageEvidence(locator) {
  await locator.scrollIntoViewIfNeeded()
  return locator.evaluate(async (image) => {
    if (!image.complete) {
      await new Promise((resolve, reject) => {
        image.addEventListener('load', resolve, { once: true })
        image.addEventListener('error', reject, { once: true })
      })
    }
    await image.decode?.().catch(() => {})
    const style = getComputedStyle(image)
    const rect = image.getBoundingClientRect()
    const parentRect = image.parentElement?.getBoundingClientRect()
    return {
      currentSrc: image.currentSrc,
      naturalWidth: image.naturalWidth,
      naturalHeight: image.naturalHeight,
      objectFit: style.objectFit,
      objectPosition: style.objectPosition,
      width: Math.round(rect.width),
      height: Math.round(rect.height),
      parentWidth: parentRect ? Math.round(parentRect.width) : 0,
      parentHeight: parentRect ? Math.round(parentRect.height) : 0,
    }
  })
}

async function readWorldContrast(page) {
  return page.locator('[data-fv1-world-card]').evaluate((card) => {
    function parseColor(value) {
      const match = value.match(/rgba?\(([^)]+)\)/)
      if (!match) throw new Error(`Unsupported color: ${value}`)
      const parts = match[1].split(',').map((part) => Number.parseFloat(part.trim()))
      return { r: parts[0], g: parts[1], b: parts[2], a: parts[3] ?? 1 }
    }
    function composite(foreground, background) {
      const alpha = foreground.a + background.a * (1 - foreground.a)
      return {
        r: (foreground.r * foreground.a + background.r * background.a * (1 - foreground.a)) / alpha,
        g: (foreground.g * foreground.a + background.g * background.a * (1 - foreground.a)) / alpha,
        b: (foreground.b * foreground.a + background.b * background.a * (1 - foreground.a)) / alpha,
        a: alpha,
      }
    }
    function luminance(color) {
      const channels = [color.r, color.g, color.b].map((value) => {
        const channel = value / 255
        return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
      })
      return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2]
    }
    function ratio(foreground, background) {
      const opaqueBackground = background.a < 1 ? composite(background, { r: 255, g: 255, b: 255, a: 1 }) : background
      const opaqueForeground = foreground.a < 1 ? composite(foreground, opaqueBackground) : foreground
      const first = luminance(opaqueForeground)
      const second = luminance(opaqueBackground)
      return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05)
    }

    const cardStyle = getComputedStyle(card)
    const cardBackground = parseColor(cardStyle.backgroundColor)
    const copy = card.querySelector('[data-fv1-world-card-copy]')
    const cta = card.querySelector('[data-fv1-world-card-cta]')
    const copyStyle = getComputedStyle(copy)
    const ctaStyle = getComputedStyle(cta)
    return {
      cardBackgroundAlpha: cardBackground.a,
      copyRatio: ratio(parseColor(copyStyle.color), cardBackground),
      ctaRatio: ratio(parseColor(ctaStyle.color), parseColor(ctaStyle.backgroundColor)),
    }
  })
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
  ])('renders active %s F4 copy on %s without a shell language provider', (language, path, expectedText) => {
    renderDiscovery(path, language)
    expect(screen.getAllByText(expectedText).length).toBeGreaterThan(0)
  })
})

const browserEvidenceIt = process.env.CI === 'true' ? it : it.skip

describe('FV-1 F4 browser acceptance evidence', () => {
  browserEvidenceIt('verifies responsive routes, targets, crops, contrast and local-only Create behavior', async () => {
    const { base, server, output } = await startF4BrowserServer()
    const executablePath = resolveBrowserExecutable()
    let browser

    const widths = [360, 390, 430, 768, 1440]
    const themes = ['light', 'dark']
    const routeCases = [
      { path: '/app', essential: fv1DiscoveryCopy.en.home.seedPrompt, image: 'home' },
      { path: '/app/world', essential: fv1DiscoveryCopy.en.world.instruction, image: 'world' },
      { path: '/app/opportunities', essential: fv1DiscoveryCopy.en.unavailable, image: 'opportunities' },
      { path: '/app/create', essential: fv1DiscoveryCopy.en.create.intro, image: null },
    ]
    const evidence = {
      sha: process.env.GITHUB_SHA ?? null,
      browser: executablePath,
      widths,
      themes,
      routes: routeCases.map(({ path }) => path),
      observations: 0,
      minTargetWidth: Number.POSITIVE_INFINITY,
      minTargetHeight: Number.POSITIVE_INFINITY,
      minEssentialFontSize: Number.POSITIVE_INFINITY,
      maxHorizontalOverflow: 0,
      minWorldCopyContrast: Number.POSITIVE_INFINITY,
      minWorldCtaContrast: Number.POSITIVE_INFINITY,
      imageSamples: {},
      createNetworkSideEffects: null,
    }

    try {
      browser = await chromium.launch({ headless: true, executablePath, args: ['--disable-dev-shm-usage'] })

      for (const theme of themes) {
        const context = await browser.newContext({ colorScheme: theme, deviceScaleFactor: 1 })
        await context.addInitScript(({ selectedTheme }) => {
          localStorage.setItem('theme', selectedTheme)
          localStorage.setItem('conversa-language', 'en')
        }, { selectedTheme: theme })
        const page = await context.newPage()

        for (const width of widths) {
          await page.setViewportSize({ width, height: 900 })

          for (const routeCase of routeCases) {
            const pageErrors = []
            const onPageError = (error) => pageErrors.push(String(error))
            page.on('pageerror', onPageError)
            await page.goto(`${base}${routeCase.path}`, { waitUntil: 'domcontentloaded' })
            await page.locator('main#app-main').waitFor({ state: 'visible', timeout: 15000 })
            await page.waitForFunction((selectedTheme) => document.documentElement.classList.contains('dark') === (selectedTheme === 'dark'), theme)

            const essential = page.locator('main#app-main').getByText(routeCase.essential, { exact: true }).first()
            await essential.waitFor({ state: 'visible', timeout: 15000 })
            const essentialFontSize = Number.parseFloat(await essential.evaluate((element) => getComputedStyle(element).fontSize))
            expect(essentialFontSize, `${routeCase.path} essential copy at ${width}px/${theme}`).toBeGreaterThanOrEqual(16)
            evidence.minEssentialFontSize = Math.min(evidence.minEssentialFontSize, essentialFontSize)

            const layout = await page.locator('main#app-main').evaluate((main) => {
              const targets = Array.from(main.querySelectorAll('a[href],button,input,select,textarea,[role="button"],[role="tab"]'))
                .map((element) => {
                  const style = getComputedStyle(element)
                  const rect = element.getBoundingClientRect()
                  return {
                    label: element.getAttribute('aria-label') || element.textContent?.trim().replace(/\s+/g, ' ').slice(0, 90) || element.tagName,
                    width: rect.width,
                    height: rect.height,
                    visible: style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0,
                  }
                })
                .filter(({ visible }) => visible)
              return {
                overflow: Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth),
                targets,
              }
            })

            expect(layout.overflow, `${routeCase.path} horizontal overflow at ${width}px/${theme}`).toBeLessThanOrEqual(1)
            evidence.maxHorizontalOverflow = Math.max(evidence.maxHorizontalOverflow, layout.overflow)
            const undersized = layout.targets.filter(({ width: targetWidth, height }) => targetWidth < 43.5 || height < 43.5)
            expect(undersized, `${routeCase.path} undersized targets at ${width}px/${theme}: ${JSON.stringify(undersized)}`).toEqual([])
            if (layout.targets.length > 0) {
              evidence.minTargetWidth = Math.min(evidence.minTargetWidth, ...layout.targets.map(({ width: targetWidth }) => targetWidth))
              evidence.minTargetHeight = Math.min(evidence.minTargetHeight, ...layout.targets.map(({ height }) => height))
            }

            let imageEvidence = null
            if (routeCase.image === 'home') {
              imageEvidence = await readImageEvidence(page.getByAltText('A person standing beside an illuminated portal overlooking a river at sunset'))
              const expected = width <= 430 ? 'aro-portal-home-v1-640.webp' : 'aro-portal-home-v1-1440.webp'
              expect(imageEvidence.currentSrc).toContain(expected)
            } else if (routeCase.image === 'world') {
              imageEvidence = await readImageEvidence(page.locator('img[src*="aro-living-miniature-calgary-v1"]').first())
              const expected = width <= 430 ? 'aro-living-miniature-calgary-v1-640.webp' : 'aro-living-miniature-calgary-v1-1440.webp'
              expect(imageEvidence.currentSrc).toContain(expected)
            } else if (routeCase.image === 'opportunities') {
              imageEvidence = await readImageEvidence(page.getByAltText('A small photography group gathering beside a river at golden hour'))
              expect(imageEvidence.currentSrc).toContain('aro-river-light-circle-v1-640.webp')
            }
            if (imageEvidence) {
              expect(imageEvidence.naturalWidth).toBeGreaterThan(0)
              expect(imageEvidence.naturalHeight).toBeGreaterThan(0)
              expect(imageEvidence.objectFit).toBe('cover')
              expect(imageEvidence.width).toBeGreaterThan(0)
              expect(imageEvidence.height).toBeGreaterThan(0)
              if (theme === 'light' && (width === 360 || width === 1440)) {
                evidence.imageSamples[`${routeCase.image}-${width}`] = imageEvidence
              }
            }

            if (routeCase.path === '/app/world') {
              const contrast = await readWorldContrast(page)
              expect(contrast.cardBackgroundAlpha).toBe(1)
              expect(contrast.copyRatio, `World formation copy contrast at ${width}px/${theme}`).toBeGreaterThanOrEqual(4.5)
              expect(contrast.ctaRatio, `World CTA contrast at ${width}px/${theme}`).toBeGreaterThanOrEqual(4.5)
              evidence.minWorldCopyContrast = Math.min(evidence.minWorldCopyContrast, contrast.copyRatio)
              evidence.minWorldCtaContrast = Math.min(evidence.minWorldCtaContrast, contrast.ctaRatio)
            }

            if (routeCase.path === '/app/opportunities') {
              expect(await page.locator('main#app-main').getByRole('textbox').count()).toBe(0)
              expect(await page.locator('main#app-main').getByRole('tab').count()).toBe(0)
              expect(await page.locator('main#app-main').getByText(fv1DiscoveryCopy.en.unavailable, { exact: true }).count()).toBeGreaterThanOrEqual(2)
            }

            expect(pageErrors, `${routeCase.path} page errors at ${width}px/${theme}: ${pageErrors.join(' | ')}`).toEqual([])
            page.off('pageerror', onPageError)
            evidence.observations += 1
          }
        }

        await context.close()
      }

      const createContext = await browser.newContext({ viewport: { width: 390, height: 900 }, colorScheme: 'light' })
      await createContext.addInitScript(() => {
        localStorage.setItem('theme', 'light')
        localStorage.setItem('conversa-language', 'en')
      })
      const createPage = await createContext.newPage()
      const serviceRequests = []
      createPage.on('request', (request) => {
        if (['fetch', 'xhr'].includes(request.resourceType())) serviceRequests.push(request.url())
      })
      await createPage.goto(`${base}/app/create`, { waitUntil: 'domcontentloaded' })
      await createPage.getByRole('button', { name: /Share/ }).waitFor({ state: 'visible', timeout: 15000 })
      const beforeInteraction = serviceRequests.length
      await createPage.getByRole('button', { name: /Share/ }).click()
      await createPage.getByText('A light-seeking Circle could take shape.', { exact: true }).waitFor({ state: 'visible' })
      expect(serviceRequests.length).toBe(beforeInteraction)
      await createPage.reload({ waitUntil: 'domcontentloaded' })
      const learnButton = createPage.getByRole('button', { name: /Learn/ })
      await learnButton.waitFor({ state: 'visible', timeout: 15000 })
      expect(await learnButton.getAttribute('aria-pressed')).toBe('true')
      evidence.createNetworkSideEffects = serviceRequests.length - beforeInteraction
      await createContext.close()

      expect(evidence.observations).toBe(40)
      expect(evidence.createNetworkSideEffects).toBe(0)
      process.stdout.write(`F4_BROWSER_EVIDENCE ${JSON.stringify(evidence)}\n`)
    } catch (error) {
      throw new Error(`${error.message}\nF4_VITE_LOG_TAIL ${output().slice(-1600)}`)
    } finally {
      await browser?.close()
      if (server.exitCode === null) server.kill('SIGTERM')
    }
  }, 240000)
})
