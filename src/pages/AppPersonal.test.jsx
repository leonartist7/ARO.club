/* global process */
import React from 'react'
import { spawn } from 'node:child_process'
import { existsSync } from 'node:fs'
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

async function runCommand(command, args, cwd) {
  let output = ''
  const child = spawn(command, args, { cwd, env: process.env, stdio: ['ignore', 'pipe', 'pipe'] })
  child.stdout.on('data', (chunk) => { output += chunk.toString() })
  child.stderr.on('data', (chunk) => { output += chunk.toString() })
  const exitCode = await new Promise((resolve, reject) => {
    child.once('error', reject)
    child.once('close', resolve)
  })
  if (exitCode !== 0) throw new Error(`${command} ${args.join(' ')} exited ${exitCode}\n${output.slice(-3000)}`)
  return output
}

async function resolveBrowserExecutable() {
  let bundledBrowser = chromium.executablePath()
  if (bundledBrowser && existsSync(bundledBrowser)) return bundledBrowser

  const playwrightCli = `${process.cwd()}/node_modules/playwright/cli.js`
  if (!existsSync(playwrightCli)) throw new Error('F5_BROWSER_CAPABILITY_MISSING: Playwright CLI unavailable')
  await runCommand(process.execPath, [playwrightCli, 'install', 'chromium'], process.cwd())

  bundledBrowser = chromium.executablePath()
  if (bundledBrowser && existsSync(bundledBrowser)) return bundledBrowser
  throw new Error(`F5_BROWSER_CAPABILITY_MISSING: lockfile-managed Chromium unavailable at ${bundledBrowser || 'unknown path'}`)
}

async function startF5BrowserServer() {
  const root = process.cwd()
  const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  const port = 4181
  const base = `http://127.0.0.1:${port}`
  const buildOutput = await runCommand(npm, ['run', 'build'], root)
  let output = buildOutput
  const server = spawn(npm, ['run', 'preview', '--', '--host', '127.0.0.1', '--port', String(port), '--strictPort'], {
    cwd: root,
    env: process.env,
    stdio: ['ignore', 'pipe', 'pipe'],
  })
  server.stdout.on('data', (chunk) => { output += chunk.toString() })
  server.stderr.on('data', (chunk) => { output += chunk.toString() })

  for (let attempt = 0; attempt < 80; attempt += 1) {
    if (server.exitCode !== null) throw new Error(`F5_PREVIEW_EXITED: ${output.slice(-1600)}`)
    try {
      const response = await fetch(base, { signal: AbortSignal.timeout(750) })
      if (response.ok) return { base, server, output: () => output }
    } catch {
      // Readiness probe only.
    }
    await delay(250)
  }
  server.kill('SIGTERM')
  throw new Error(`F5_PREVIEW_TIMEOUT: ${output.slice(-1600)}`)
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
    return Array.from(main.querySelectorAll('[data-fv1-profile-node], [data-fv1-express-apply]')).map((element) => {
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

async function readProfileLabelContainment(page) {
  return page.locator('main#app-main').evaluate((main) => {
    const field = main.querySelector('[data-fv1-personal-field]')
    const fieldRect = field.getBoundingClientRect()
    return Array.from(main.querySelectorAll('[data-fv1-profile-node]')).map((button) => {
      const label = button.querySelector('[data-fv1-profile-node-label]')
      const buttonRect = button.getBoundingClientRect()
      const labelRect = label.getBoundingClientRect()
      return {
        id: button.getAttribute('data-fv1-profile-node'),
        contentOverflow: button.scrollWidth - button.clientWidth,
        insideButton: labelRect.left >= buttonRect.left - 1 && labelRect.right <= buttonRect.right + 1 && labelRect.top >= buttonRect.top - 1 && labelRect.bottom <= buttonRect.bottom + 1,
        insideField: labelRect.left >= fieldRect.left - 1 && labelRect.right <= fieldRect.right + 1 && labelRect.top >= fieldRect.top - 1 && labelRect.bottom <= fieldRect.bottom + 1,
      }
    })
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
  it('exercises all four local field nodes and resets on remount', () => {
    const first = renderPersonal('/app/profile')
    const nodes = [
      ['I am reaching for', 'Wants'],
      ['I can bring', 'Contributions'],
      ['Life has room for', 'Context'],
      ['I keep safe', 'Boundaries'],
    ]
    for (const [label, heading] of nodes) {
      const control = screen.getByRole('button', { name: label })
      fireEvent.click(control)
      expect(control.getAttribute('aria-pressed')).toBe('true')
      expect(screen.getByRole('heading', { name: heading })).toBeTruthy()
    }
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
  it('exercises every retained category and choice with native aria-pressed semantics', () => {
    renderPersonal('/app/express')
    expect(screen.queryByRole('tab')).toBeNull()
    expect(screen.queryByRole('radio')).toBeNull()
    const categories = [
      ['Look', ['Field notes', 'Table maker', 'Evening walk']],
      ['Carry', ['Camera', 'Notebook', 'Coffee cup']],
      ['Atmosphere', ['Golden hour', 'River blue', 'Candlelight']],
    ]
    for (const [category, options] of categories) {
      const categoryControl = screen.getByRole('button', { name: category })
      fireEvent.click(categoryControl)
      expect(categoryControl.getAttribute('aria-pressed')).toBe('true')
      for (const option of options) {
        const optionControl = screen.getByRole('button', { name: new RegExp(option) })
        fireEvent.click(optionControl)
        expect(optionControl.getAttribute('aria-pressed')).toBe('true')
      }
    }
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
  browserEvidenceIt('verifies production Profile/Express responsive, zoom, keyboard, focus, contrast, media and local-only behavior', async () => {
    const executablePath = await resolveBrowserExecutable()
    const { base, server, output } = await startF5BrowserServer()
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
      exercisedProfileNodes: [],
      exercisedExpressChoices: [],
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
            await page.goto(`${base}${routeCase.route}`, { waitUntil: 'domcontentloaded' })
            await applyTheme(page, theme)
            await page.locator('main#app-main').waitFor({ state: 'visible', timeout: 15000 })
            const essential = page.locator('main#app-main').getByText(routeCase.essential, { exact: true }).first()
            await essential.waitFor({ state: 'visible', timeout: 15000 })
            const essentialFontSize = Number.parseFloat(await essential.evaluate((element) => getComputedStyle(element).fontSize))
            expect(essentialFontSize).toBeGreaterThanOrEqual(16)
            evidence.minEssentialFontSize = Math.min(evidence.minEssentialFontSize, essentialFontSize)

            const layout = await page.locator('main#app-main').evaluate((main) => {
              const targets = Array.from(main.querySelectorAll('a[href],button')).map((element) => {
                const style = getComputedStyle(element)
                const rect = element.getBoundingClientRect()
                return { width: rect.width, height: rect.height, visible: style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0 }
              }).filter(({ visible }) => visible)
              return {
                overflow: Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth),
                targets,
                essentialSizes: Array.from(main.querySelectorAll('[data-fv1-essential-copy]')).map((element) => Number.parseFloat(getComputedStyle(element).fontSize)),
              }
            })
            expect(layout.overflow).toBeLessThanOrEqual(1)
            evidence.maxHorizontalOverflow = Math.max(evidence.maxHorizontalOverflow, layout.overflow)
            expect(layout.targets.filter(({ width: targetWidth, height }) => targetWidth < 43.5 || height < 43.5)).toEqual([])
            if (layout.targets.length) {
              evidence.minTargetWidth = Math.min(evidence.minTargetWidth, ...layout.targets.map(({ width: targetWidth }) => targetWidth))
              evidence.minTargetHeight = Math.min(evidence.minTargetHeight, ...layout.targets.map(({ height }) => height))
            }
            for (const fontSize of layout.essentialSizes) {
              expect(fontSize).toBeGreaterThanOrEqual(16)
              evidence.minEssentialFontSize = Math.min(evidence.minEssentialFontSize, fontSize)
            }

            if (routeCase.route === '/app/profile') {
              const separation = await readProfileSeparation(page)
              expect(separation.collisions).toEqual([])
              evidence.profileCollisions.push(...separation.collisions)
            }
            for (const sample of await readControlContrast(page)) {
              expect(sample.ratio).toBeGreaterThanOrEqual(4.5)
              evidence.minControlContrast = Math.min(evidence.minControlContrast, sample.ratio)
            }

            const imageEvidence = routeCase.image === 'profile'
              ? await readImageEvidence(page.getByAltText(fv1PersonalCopy.en.profile.portraitAlt))
              : await readImageEvidence(page.getByAltText(fv1PersonalCopy.en.express.personaAlt))
            if (routeCase.image === 'profile') {
              expect(imageEvidence.currentSrc).toContain(width <= 430 ? 'aro-maya-profile-portrait-v1-256.webp' : 'aro-maya-profile-portrait-v1-384.webp')
              expect(imageEvidence.objectFit).toBe('cover')
            } else {
              expect(imageEvidence.currentSrc).toContain('aro-maya-expression-persona-v1-480.webp')
              expect(imageEvidence.objectFit).toBe('contain')
            }
            expect(imageEvidence.naturalWidth).toBeGreaterThan(0)
            expect(imageEvidence.naturalHeight).toBeGreaterThan(0)
            if (theme === 'light' && (width === 360 || width === 1440)) evidence.imageSamples[`${routeCase.image}-${width}`] = imageEvidence
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
          expect(overflow).toBeLessThanOrEqual(1)
          evidence.maxHorizontalOverflow = Math.max(evidence.maxHorizontalOverflow, overflow)
          if (route === '/app/profile') {
            expect((await readProfileSeparation(zoomPage)).collisions).toEqual([])
            for (const sample of await readProfileLabelContainment(zoomPage)) {
              expect(sample.contentOverflow, `${sample.id} content overflow at 200%/${width}`).toBeLessThanOrEqual(1)
              expect(sample.insideButton, `${sample.id} label escaped button at 200%/${width}`).toBe(true)
              expect(sample.insideField, `${sample.id} label clipped by field at 200%/${width}`).toBe(true)
            }
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
      const profileBaseline = serviceRequests.length
      for (const nodeId of ['wants', 'brings', 'context', 'boundaries']) {
        const node = interactionPage.locator(`[data-fv1-profile-node="${nodeId}"]`)
        await node.focus()
        await interactionPage.keyboard.press('Space')
        expect(await node.getAttribute('aria-pressed')).toBe('true')
        const focus = await node.evaluate((element) => {
          const style = getComputedStyle(element)
          return { outlineStyle: style.outlineStyle, outlineWidth: Number.parseFloat(style.outlineWidth), boxShadow: style.boxShadow }
        })
        expect(focus.outlineStyle).not.toBe('none')
        expect(focus.outlineWidth).toBeGreaterThanOrEqual(3)
        evidence.exercisedProfileNodes.push(nodeId)
      }
      await interactionPage.getByRole('button', { name: 'How this becomes real later' }).click()
      await interactionPage.getByText(/P1 will require explicit consent/).waitFor({ state: 'visible' })
      expect(serviceRequests.length - profileBaseline).toBe(0)

      await interactionPage.goto(`${base}/app/express`, { waitUntil: 'domcontentloaded' })
      const expressBaseline = serviceRequests.length
      for (const categoryId of ['look', 'carry', 'atmosphere']) {
        const category = interactionPage.locator(`[data-fv1-express-category="${categoryId}"]`)
        await category.focus()
        await interactionPage.keyboard.press('Space')
        expect(await category.getAttribute('aria-pressed')).toBe('true')
        const options = interactionPage.locator('[data-fv1-express-option]')
        expect(await options.count()).toBe(3)
        for (let index = 0; index < 3; index += 1) {
          const option = options.nth(index)
          const optionId = await option.getAttribute('data-fv1-express-option')
          await option.focus()
          await interactionPage.keyboard.press('Space')
          expect(await option.getAttribute('aria-pressed')).toBe('true')
          evidence.exercisedExpressChoices.push(`${categoryId}:${optionId}`)
        }
      }
      await interactionPage.getByRole('button', { name: 'Apply this preview' }).click()
      await interactionPage.getByText(fv1PersonalCopy.en.express.appliedStatus, { exact: true }).waitFor({ state: 'visible' })
      expect(serviceRequests.length - expressBaseline).toBe(0)
      evidence.networkSideEffects = serviceRequests.length - expressBaseline

      const reloadBaseline = serviceRequests.length
      await interactionPage.reload({ waitUntil: 'domcontentloaded' })
      await interactionPage.getByRole('button', { name: 'Apply this preview' }).waitFor({ state: 'visible' })
      expect(serviceRequests.length - reloadBaseline).toBe(0)
      await interactionContext.close()

      const reducedContext = await browser.newContext({ viewport: { width: 390, height: 900 }, reducedMotion: 'reduce' })
      await reducedContext.addInitScript(() => localStorage.setItem('conversa-language', 'en'))
      const reducedPage = await reducedContext.newPage()
      await reducedPage.goto(`${base}/app/profile`, { waitUntil: 'domcontentloaded' })
      await reducedPage.locator('[data-fv1-profile-node="brings"]').click()
      expect(await reducedPage.locator('[data-fv1-profile-node="brings"]').getAttribute('aria-pressed')).toBe('true')
      await reducedPage.goto(`${base}/app/express`, { waitUntil: 'domcontentloaded' })
      await reducedPage.locator('[data-fv1-express-category="carry"]').click()
      await reducedPage.locator('[data-fv1-express-option="notebook"]').click()
      expect(await reducedPage.locator('[data-fv1-express-option="notebook"]').getAttribute('aria-pressed')).toBe('true')
      await reducedContext.close()

      expect(evidence.observations).toBe(20)
      expect(evidence.zoomObservations).toBe(4)
      expect(evidence.profileCollisions).toEqual([])
      expect(new Set(evidence.exercisedProfileNodes).size).toBe(4)
      expect(new Set(evidence.exercisedExpressChoices).size).toBe(9)
      process.stdout.write(`F5_BROWSER_EVIDENCE ${JSON.stringify(evidence)}\n`)
    } catch (error) {
      throw new Error(`${error instanceof Error ? error.message : String(error)}\nF5 server output:\n${output().slice(-2500)}`)
    } finally {
      await browser?.close().catch(() => {})
      if (server.exitCode === null) server.kill('SIGTERM')
    }
  }, 180000)
})
