/* global process */
import React from 'react'
import { spawn } from 'node:child_process'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { setTimeout as delay } from 'node:timers/promises'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { chromium } from 'playwright'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import AppShell from '../components/app/AppShell'
import { fv1PersonalCopy } from '../i18n/fv1/personal'
import AppExpressPage from './AppExpressPage'
import AppProfilePage from './AppProfilePage'

const routes = [
  {
    path: '/app',
    element: <AppShell />,
    children: [
      { path: 'profile', element: <AppProfilePage /> },
      { path: 'express', element: <AppExpressPage /> },
      { path: 'settings', element: <p>Settings target</p> },
      { path: 'create', element: <p>Create target</p> },
    ],
  },
]

function renderPersonal(route, language = 'en') {
  localStorage.setItem('conversa-language', language)
  const router = createMemoryRouter(routes, { initialEntries: [route] })
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
  throw new Error('F5_BROWSER_CAPABILITY_MISSING')
}

async function startF5BrowserServer() {
  const root = process.cwd()
  const vite = path.join(root, 'node_modules', 'vite', 'bin', 'vite.js')
  const port = 4181
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
    if (server.exitCode !== null) throw new Error(`F5_VITE_EXITED: ${output.slice(-1200)}`)
    try {
      const response = await fetch(base, { signal: AbortSignal.timeout(750) })
      if (response.ok) return { base, server, output: () => output }
    } catch {
      // Readiness probe only.
    }
    await delay(250)
  }
  server.kill('SIGTERM')
  throw new Error(`F5_VITE_TIMEOUT: ${output.slice(-1200)}`)
}

async function applyTheme(page, theme) {
  await page.evaluate((selectedTheme) => document.documentElement.classList.toggle('dark', selectedTheme === 'dark'), theme)
  expect(await page.evaluate(() => document.documentElement.classList.contains('dark'))).toBe(theme === 'dark')
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
    return {
      currentSrc: image.currentSrc,
      naturalWidth: image.naturalWidth,
      naturalHeight: image.naturalHeight,
      objectFit: style.objectFit,
      objectPosition: style.objectPosition,
      width: Math.round(rect.width),
      height: Math.round(rect.height),
    }
  })
}

async function readControlContrast(page) {
  return page.locator('main#app-main').evaluate((main) => {
    const parse = (value) => {
      const match = value.match(/rgba?\(([^)]+)\)/)
      if (!match) return null
      const parts = match[1].split(',').map((part) => Number.parseFloat(part.trim()))
      return { r: parts[0], g: parts[1], b: parts[2], a: parts[3] ?? 1 }
    }
    const luminance = ({ r, g, b }) => {
      const channels = [r, g, b].map((value) => {
        const channel = value / 255
        return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
      })
      return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2]
    }
    const ratio = (foreground, background) => {
      const first = luminance(foreground)
      const second = luminance(background)
      return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05)
    }
    const controls = Array.from(main.querySelectorAll('[data-fv1-profile-node], [data-fv1-express-apply]'))
    return controls.map((element) => {
      const style = getComputedStyle(element)
      const foreground = parse(style.color)
      const background = parse(style.backgroundColor)
      return {
        label: element.getAttribute('data-fv1-profile-node') || 'express-apply',
        ratio: foreground && background && background.a >= 0.99 ? ratio(foreground, background) : null,
      }
    }).filter(({ ratio: value }) => value !== null)
  })
}

async function readProfileSeparation(page) {
  return page.locator('main#app-main').evaluate((main) => {
    const elements = [
      main.querySelector('[data-fv1-profile-headline]'),
      ...main.querySelectorAll('[data-fv1-profile-node]'),
      main.querySelector('[data-fv1-profile-portrait]'),
      main.querySelector('[data-fv1-profile-instruction]'),
    ].filter(Boolean)
    const entries = elements.map((element, index) => {
      const rect = element.getBoundingClientRect()
      return {
        label: element.getAttribute('data-fv1-profile-node') || element.getAttribute('data-fv1-profile-headline') !== null && 'headline' || element.getAttribute('data-fv1-profile-portrait') !== null && 'portrait' || element.getAttribute('data-fv1-profile-instruction') !== null && 'instruction' || `item-${index}`,
        left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom,
      }
    })
    const collisions = []
    for (let i = 0; i < entries.length; i += 1) {
      for (let j = i + 1; j < entries.length; j += 1) {
        const a = entries[i]
        const b = entries[j]
        const overlapX = Math.min(a.right, b.right) - Math.max(a.left, b.left)
        const overlapY = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top)
        if (overlapX > 1 && overlapY > 1) collisions.push(`${a.label}/${b.label}`)
      }
    }
    return { entries, collisions }
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

describe('FV-1 F5 Personal Field', () => {
  it('exposes all four local field nodes as aria-pressed buttons and resets on remount', () => {
    const first = renderPersonal('/app/profile')
    const wants = screen.getByRole('button', { name: 'I am reaching for' })
    const brings = screen.getByRole('button', { name: 'I can bring' })
    const context = screen.getByRole('button', { name: 'Life has room for' })
    const boundaries = screen.getByRole('button', { name: 'I keep safe' })
    expect(wants.getAttribute('aria-pressed')).toBe('true')
    for (const control of [wants, brings, context, boundaries]) expect(control.getAttribute('aria-pressed')).not.toBeNull()
    fireEvent.click(brings)
    expect(brings.getAttribute('aria-pressed')).toBe('true')
    expect(wants.getAttribute('aria-pressed')).toBe('false')
    expect(screen.getByRole('heading', { name: 'Contributions' })).toBeTruthy()
    first.unmount()
    renderPersonal('/app/profile')
    expect(screen.getByRole('button', { name: 'I am reaching for' }).getAttribute('aria-pressed')).toBe('true')
  })

  it('keeps privacy explanation and navigation local with no network side effect', () => {
    const fetchSpy = vi.fn()
    vi.stubGlobal('fetch', fetchSpy)
    renderPersonal('/app/profile')
    const privacy = screen.getByRole('button', { name: 'How this becomes real later' })
    expect(privacy.getAttribute('aria-expanded')).toBe('false')
    fireEvent.click(privacy)
    expect(privacy.getAttribute('aria-expanded')).toBe('true')
    expect(screen.getByText(/P1 will require explicit consent/)).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Open settings' }).getAttribute('href')).toBe('/app/settings')
    expect(screen.getByRole('link', { name: /Open expression preview/ }).getAttribute('href')).toBe('/app/express')
    expect(screen.getByRole('link', { name: /Bring a small possibility forward/ }).getAttribute('href')).toBe('/app/create')
    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it('uses the frozen F1 portrait candidates', () => {
    renderPersonal('/app/profile')
    const portrait = screen.getByAltText('Illustrated portrait of Maya in Calgary at golden hour')
    expect(portrait.getAttribute('src')).toBe('/fv1/aro-maya-profile-portrait-v1-384.webp')
    expect(portrait.getAttribute('srcset')).toContain('/fv1/aro-maya-profile-portrait-v1-256.webp 256w')
    expect(portrait.getAttribute('srcset')).toContain('/fv1/aro-maya-profile-portrait-v1-384.webp 384w')
    expect(portrait.getAttribute('sizes')).toBe('(max-width: 767px) 256px, 384px')
  })
})

describe('FV-1 F5 Express preview', () => {
  it('uses native aria-pressed category and option buttons instead of tab/radio semantics', () => {
    renderPersonal('/app/express')
    expect(screen.queryByRole('tab')).toBeNull()
    expect(screen.queryByRole('radio')).toBeNull()
    const look = screen.getByRole('button', { name: 'Look' })
    const carry = screen.getByRole('button', { name: 'Carry' })
    expect(look.getAttribute('aria-pressed')).toBe('true')
    fireEvent.click(carry)
    expect(carry.getAttribute('aria-pressed')).toBe('true')
    expect(look.getAttribute('aria-pressed')).toBe('false')
    const notebook = screen.getByRole('button', { name: /Notebook/ })
    fireEvent.click(notebook)
    expect(notebook.getAttribute('aria-pressed')).toBe('true')
    expect(screen.getAllByText('Notebook').length).toBeGreaterThan(0)
  })

  it('applies only local preview state, has no network write, and resets on remount', () => {
    const fetchSpy = vi.fn()
    vi.stubGlobal('fetch', fetchSpy)
    const first = renderPersonal('/app/express')
    fireEvent.click(screen.getByRole('button', { name: 'Apply this preview' }))
    expect(screen.getByRole('button', { name: /Preview applied locally/ })).toBeTruthy()
    expect(screen.getByText('This view has updated for the current preview only. Nothing was saved.')).toBeTruthy()
    expect(fetchSpy).not.toHaveBeenCalled()
    first.unmount()
    renderPersonal('/app/express')
    expect(screen.getByRole('button', { name: 'Apply this preview' })).toBeTruthy()
    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it('uses the frozen F1 persona candidates', () => {
    renderPersonal('/app/express')
    const persona = screen.getByAltText('Original fictional full-body illustration of Maya in relaxed creative clothing')
    expect(persona.getAttribute('src')).toBe('/fv1/aro-maya-expression-persona-v1-960.webp')
    expect(persona.getAttribute('srcset')).toContain('/fv1/aro-maya-expression-persona-v1-480.webp 480w')
    expect(persona.getAttribute('srcset')).toContain('/fv1/aro-maya-expression-persona-v1-960.webp 960w')
    expect(persona.getAttribute('sizes')).toBe('(max-width: 767px) 480px, 480px')
    expect(screen.getByRole('link', { name: /Back to Personal Field/ }).getAttribute('href')).toBe('/app/profile')
  })
})

describe('FV-1 F5 language parity', () => {
  it('keeps EN, FR and ES key structures equivalent', () => {
    expect(structureOf(fv1PersonalCopy.fr)).toEqual(structureOf(fv1PersonalCopy.en))
    expect(structureOf(fv1PersonalCopy.es)).toEqual(structureOf(fv1PersonalCopy.en))
  })

  it.each([
    ['fr', '/app/profile', 'Votre champ personnel'],
    ['es', '/app/profile', 'Tu campo personal'],
    ['fr', '/app/express', 'Exprimez votre monde.'],
    ['es', '/app/express', 'Expresa tu mundo.'],
  ])('renders active %s copy on %s and marks the localized surface language', (language, route, expectedText) => {
    const view = renderPersonal(route, language)
    expect(screen.getAllByText(expectedText).length).toBeGreaterThan(0)
    expect(view.container.querySelector(`[lang="${language}"]`)).toBeTruthy()
  })
})

const browserEvidenceIt = process.env.CI === 'true' ? it : it.skip

describe('FV-1 F5 browser acceptance evidence', () => {
  browserEvidenceIt('verifies Profile/Express responsive, zoom, keyboard, focus, contrast, media and local-only behavior', async () => {
    const { base, server, output } = await startF5BrowserServer()
    const executablePath = resolveBrowserExecutable()
    let browser
    const widths = [360, 390, 430, 768, 1440]
    const themes = ['light', 'dark']
    const routeCases = [
      { route: '/app/profile', essential: fv1PersonalCopy.en.profile.instruction, image: 'profile' },
      { route: '/app/express', essential: fv1PersonalCopy.en.express.intro, image: 'express' },
    ]
    const evidence = {
      testedRef: process.env.GITHUB_SHA ?? null,
      implementationHead: process.env.GITHUB_HEAD_REF ?? null,
      browser: executablePath,
      widths,
      themes,
      routes: routeCases.map(({ route }) => route),
      observations: 0,
      zoomObservations: 0,
      minTargetWidth: Number.POSITIVE_INFINITY,
      minTargetHeight: Number.POSITIVE_INFINITY,
      minEssentialFontSize: Number.POSITIVE_INFINITY,
      maxHorizontalOverflow: 0,
      minControlContrast: Number.POSITIVE_INFINITY,
      profileCollisions: [],
      imageSamples: {},
      networkSideEffects: 0,
    }

    try {
      browser = await chromium.launch({ headless: true, executablePath, args: ['--disable-dev-shm-usage'] })

      for (const theme of themes) {
        const context = await browser.newContext({ deviceScaleFactor: 1 })
        await context.addInitScript(() => localStorage.setItem('conversa-language', 'en'))
        const page = await context.newPage()

        for (const width of widths) {
          await page.setViewportSize({ width, height: 900 })
          for (const routeCase of routeCases) {
            const pageErrors = []
            const onPageError = (error) => pageErrors.push(String(error))
            page.on('pageerror', onPageError)
            await page.goto(`${base}${routeCase.route}`, { waitUntil: 'domcontentloaded' })
            await applyTheme(page, theme)
            await page.locator('main#app-main').waitFor({ state: 'visible', timeout: 15000 })

            const essential = page.locator('main#app-main').getByText(routeCase.essential, { exact: true }).first()
            await essential.waitFor({ state: 'visible', timeout: 15000 })
            const essentialFontSize = Number.parseFloat(await essential.evaluate((element) => getComputedStyle(element).fontSize))
            expect(essentialFontSize, `${routeCase.route} essential copy at ${width}px/${theme}`).toBeGreaterThanOrEqual(16)
            evidence.minEssentialFontSize = Math.min(evidence.minEssentialFontSize, essentialFontSize)

            const layout = await page.locator('main#app-main').evaluate((main) => {
              const targets = Array.from(main.querySelectorAll('a[href],button'))
                .map((element) => {
                  const style = getComputedStyle(element)
                  const rect = element.getBoundingClientRect()
                  return { label: element.getAttribute('aria-label') || element.textContent?.trim().replace(/\s+/g, ' ').slice(0, 90) || element.tagName, width: rect.width, height: rect.height, visible: style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0 }
                })
                .filter(({ visible }) => visible)
              const essentialSizes = Array.from(main.querySelectorAll('[data-fv1-essential-copy]')).map((element) => Number.parseFloat(getComputedStyle(element).fontSize))
              return {
                overflow: Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth),
                targets,
                essentialSizes,
              }
            })
            expect(layout.overflow, `${routeCase.route} horizontal overflow at ${width}px/${theme}`).toBeLessThanOrEqual(1)
            evidence.maxHorizontalOverflow = Math.max(evidence.maxHorizontalOverflow, layout.overflow)
            const undersized = layout.targets.filter(({ width: targetWidth, height }) => targetWidth < 43.5 || height < 43.5)
            expect(undersized, `${routeCase.route} undersized targets at ${width}px/${theme}: ${JSON.stringify(undersized)}`).toEqual([])
            if (layout.targets.length) {
              evidence.minTargetWidth = Math.min(evidence.minTargetWidth, ...layout.targets.map(({ width: targetWidth }) => targetWidth))
              evidence.minTargetHeight = Math.min(evidence.minTargetHeight, ...layout.targets.map(({ height }) => height))
            }
            for (const fontSize of layout.essentialSizes) {
              expect(fontSize, `${routeCase.route} data-fv1-essential-copy at ${width}px/${theme}`).toBeGreaterThanOrEqual(16)
              evidence.minEssentialFontSize = Math.min(evidence.minEssentialFontSize, fontSize)
            }

            if (routeCase.route === '/app/profile') {
              const separation = await readProfileSeparation(page)
              expect(separation.collisions, `Profile collisions at ${width}px/${theme}`).toEqual([])
              evidence.profileCollisions.push(...separation.collisions)
              const contrast = await readControlContrast(page)
              for (const sample of contrast) {
                expect(sample.ratio, `${sample.label} contrast at ${width}px/${theme}`).toBeGreaterThanOrEqual(4.5)
                evidence.minControlContrast = Math.min(evidence.minControlContrast, sample.ratio)
              }
            } else {
              const contrast = await readControlContrast(page)
              for (const sample of contrast) {
                expect(sample.ratio, `${sample.label} contrast at ${width}px/${theme}`).toBeGreaterThanOrEqual(4.5)
                evidence.minControlContrast = Math.min(evidence.minControlContrast, sample.ratio)
              }
            }

            let imageEvidence
            if (routeCase.image === 'profile') {
              imageEvidence = await readImageEvidence(page.getByAltText(fv1PersonalCopy.en.profile.portraitAlt))
              expect(imageEvidence.currentSrc).toContain(width <= 430 ? 'aro-maya-profile-portrait-v1-256.webp' : 'aro-maya-profile-portrait-v1-384.webp')
              expect(imageEvidence.objectFit).toBe('cover')
            } else {
              imageEvidence = await readImageEvidence(page.getByAltText(fv1PersonalCopy.en.express.personaAlt))
              expect(imageEvidence.currentSrc).toContain('aro-maya-expression-persona-v1-480.webp')
              expect(imageEvidence.objectFit).toBe('contain')
            }
            expect(imageEvidence.naturalWidth).toBeGreaterThan(0)
            expect(imageEvidence.naturalHeight).toBeGreaterThan(0)
            if (theme === 'light' && (width === 360 || width === 1440)) evidence.imageSamples[`${routeCase.image}-${width}`] = imageEvidence

            expect(pageErrors, `${routeCase.route} page errors at ${width}px/${theme}: ${pageErrors.join(' | ')}`).toEqual([])
            page.off('pageerror', onPageError)
            evidence.observations += 1
          }
        }
        await context.close()
      }

      for (const width of [360, 1440]) {
        const zoomContext = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 1 })
        await zoomContext.addInitScript(() => localStorage.setItem('conversa-language', 'en'))
        const zoomPage = await zoomContext.newPage()
        for (const route of ['/app/profile', '/app/express']) {
          await zoomPage.goto(`${base}${route}`, { waitUntil: 'domcontentloaded' })
          await zoomPage.evaluate(() => { document.documentElement.style.fontSize = '200%' })
          await zoomPage.waitForTimeout(120)
          const overflow = await zoomPage.evaluate(() => Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth))
          expect(overflow, `${route} overflow at 200% text zoom/${width}px`).toBeLessThanOrEqual(1)
          evidence.maxHorizontalOverflow = Math.max(evidence.maxHorizontalOverflow, overflow)
          if (route === '/app/profile') {
            const separation = await readProfileSeparation(zoomPage)
            expect(separation.collisions, `Profile collisions at 200% text zoom/${width}px`).toEqual([])
          }
          evidence.zoomObservations += 1
        }
        await zoomContext.close()
      }

      const interactionContext = await browser.newContext({ viewport: { width: 390, height: 900 }, deviceScaleFactor: 1 })
      await interactionContext.addInitScript(() => localStorage.setItem('conversa-language', 'en'))
      const interactionPage = await interactionContext.newPage()
      const serviceRequests = []
      interactionPage.on('request', (request) => { if (['fetch', 'xhr'].includes(request.resourceType())) serviceRequests.push(request.url()) })

      await interactionPage.goto(`${base}/app/profile`, { waitUntil: 'domcontentloaded' })
      const brings = interactionPage.getByRole('button', { name: 'I can bring' })
      await brings.focus()
      await interactionPage.keyboard.press('Space')
      expect(await brings.getAttribute('aria-pressed')).toBe('true')
      const profileFocus = await brings.evaluate((element) => getComputedStyle(element).boxShadow)
      expect(profileFocus).not.toBe('none')
      await interactionPage.getByRole('button', { name: 'How this becomes real later' }).click()
      await interactionPage.getByText(/P1 will require explicit consent/).waitFor({ state: 'visible' })

      await interactionPage.goto(`${base}/app/express`, { waitUntil: 'domcontentloaded' })
      const carry = interactionPage.getByRole('button', { name: 'Carry' })
      await carry.focus()
      await interactionPage.keyboard.press('Space')
      expect(await carry.getAttribute('aria-pressed')).toBe('true')
      const notebook = interactionPage.getByRole('button', { name: /Notebook/ })
      await notebook.focus()
      await interactionPage.keyboard.press('Space')
      expect(await notebook.getAttribute('aria-pressed')).toBe('true')
      const optionFocus = await notebook.evaluate((element) => getComputedStyle(element).boxShadow)
      expect(optionFocus).not.toBe('none')
      await interactionPage.getByRole('button', { name: 'Apply this preview' }).click()
      await interactionPage.getByText(fv1PersonalCopy.en.express.appliedStatus, { exact: true }).waitFor({ state: 'visible' })
      const beforeReloadRequests = serviceRequests.length
      await interactionPage.reload({ waitUntil: 'domcontentloaded' })
      await interactionPage.getByRole('button', { name: 'Apply this preview' }).waitFor({ state: 'visible' })
      evidence.networkSideEffects = serviceRequests.length - beforeReloadRequests
      expect(serviceRequests.length - beforeReloadRequests).toBe(0)
      await interactionContext.close()

      const reducedContext = await browser.newContext({ viewport: { width: 390, height: 900 }, reducedMotion: 'reduce' })
      await reducedContext.addInitScript(() => localStorage.setItem('conversa-language', 'en'))
      const reducedPage = await reducedContext.newPage()
      await reducedPage.goto(`${base}/app/profile`, { waitUntil: 'domcontentloaded' })
      await reducedPage.getByRole('button', { name: 'I can bring' }).click()
      expect(await reducedPage.getByRole('button', { name: 'I can bring' }).getAttribute('aria-pressed')).toBe('true')
      await reducedPage.goto(`${base}/app/express`, { waitUntil: 'domcontentloaded' })
      await reducedPage.getByRole('button', { name: 'Carry' }).click()
      await reducedPage.getByRole('button', { name: /Notebook/ }).click()
      expect(await reducedPage.getByRole('button', { name: /Notebook/ }).getAttribute('aria-pressed')).toBe('true')
      await reducedContext.close()

      expect(evidence.observations).toBe(20)
      expect(evidence.zoomObservations).toBe(4)
      expect(evidence.profileCollisions).toEqual([])
      process.stdout.write(`F5_BROWSER_EVIDENCE ${JSON.stringify(evidence)}\n`)
    } catch (error) {
      throw new Error(`${error instanceof Error ? error.message : String(error)}\nF5 server output:\n${output().slice(-2000)}`)
    } finally {
      await browser?.close().catch(() => {})
      if (server.exitCode === null) server.kill('SIGTERM')
    }
  }, 120000)
})
