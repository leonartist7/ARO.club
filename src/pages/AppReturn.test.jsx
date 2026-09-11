/* global process */
import React from 'react'
import { spawn } from 'node:child_process'
import { existsSync, mkdtempSync, rmSync, statSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { setTimeout as delay } from 'node:timers/promises'
import { cleanup, render, screen } from '@testing-library/react'
import { chromium } from 'playwright'
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

  const playwrightCli = path.join(process.cwd(), 'node_modules', 'playwright', 'cli.js')
  if (!existsSync(playwrightCli)) throw new Error('F6_BROWSER_CAPABILITY_MISSING: Playwright CLI unavailable')
  await runCommand(process.execPath, [playwrightCli, 'install', 'chromium'], process.cwd())

  bundledBrowser = chromium.executablePath()
  if (bundledBrowser && existsSync(bundledBrowser)) return bundledBrowser
  throw new Error(`F6_BROWSER_CAPABILITY_MISSING: lockfile-managed Chromium unavailable at ${bundledBrowser || 'unknown path'}`)
}

async function startF6BrowserServer() {
  const root = process.cwd()
  const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  const outputDir = mkdtempSync(path.join(os.tmpdir(), 'aro-fv1-f6-'))
  const port = 4182
  const base = `http://127.0.0.1:${port}`
  const buildOutput = await runCommand(npm, ['run', 'build', '--', '--outDir', outputDir, '--emptyOutDir'], root)
  let output = buildOutput
  const server = spawn(npm, ['run', 'preview', '--', '--outDir', outputDir, '--host', '127.0.0.1', '--port', String(port), '--strictPort'], {
    cwd: root,
    env: process.env,
    stdio: ['ignore', 'pipe', 'pipe'],
  })
  server.stdout.on('data', (chunk) => { output += chunk.toString() })
  server.stderr.on('data', (chunk) => { output += chunk.toString() })

  for (let attempt = 0; attempt < 80; attempt += 1) {
    if (server.exitCode !== null) {
      rmSync(outputDir, { recursive: true, force: true })
      throw new Error(`F6_PREVIEW_EXITED: ${output.slice(-1600)}`)
    }
    try {
      const response = await fetch(base, { signal: AbortSignal.timeout(750) })
      if (response.ok) return { base, server, outputDir, output: () => output }
    } catch {
      // Readiness probe only.
    }
    await delay(250)
  }
  server.kill('SIGTERM')
  rmSync(outputDir, { recursive: true, force: true })
  throw new Error(`F6_PREVIEW_TIMEOUT: ${output.slice(-1600)}`)
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

async function focusHrefWithKeyboard(page, href) {
  await page.evaluate(() => document.activeElement?.blur())
  for (let attempt = 0; attempt < 40; attempt += 1) {
    await page.keyboard.press('Tab')
    const activeHref = await page.evaluate(() => document.activeElement?.getAttribute?.('href') ?? null)
    if (activeHref === href) {
      const focus = await page.evaluate(() => {
        const style = getComputedStyle(document.activeElement)
        return { outlineStyle: style.outlineStyle, outlineWidth: Number.parseFloat(style.outlineWidth) }
      })
      expect(focus.outlineStyle).not.toBe('none')
      expect(focus.outlineWidth).toBeGreaterThanOrEqual(3)
      return
    }
  }
  throw new Error(`F6_KEYBOARD_FOCUS_MISSING: ${href}`)
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

const browserEvidenceIt = process.env.CI === 'true' ? it : it.skip

describe('FV-1 F6 browser acceptance evidence', () => {
  browserEvidenceIt('verifies production return surfaces across responsive, zoom, keyboard and media states', async () => {
    const executablePath = await resolveBrowserExecutable()
    const { base, server, outputDir, output } = await startF6BrowserServer()
    let browser
    const widths = [360, 390, 430, 768, 1440]
    const themes = ['light', 'dark']
    const routeCases = [
      { route: '/app/insights', directEntry: 'insights', heroAlt: fv1ReturnCopy.en.insights ? 'Four fictional people looking over a river city at sunset' : null, mobileAsset: 'aro-season-discovery-v1-640.webp', desktopAsset: 'aro-season-discovery-v1-1440.webp', position: '62%' },
      { route: '/app/passport', directEntry: 'passport', heroAlt: 'Fictional twilight riverside life-map example', mobileAsset: 'aro-passport-life-map-v1-640.webp', desktopAsset: 'aro-passport-life-map-v1-1440.webp', position: '69%' },
      { route: '/app/library', directEntry: 'library' },
      { route: '/app/settings', directEntry: 'settings' },
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
      heroSamples: {},
      libraryThumbnailSamples: [],
      keyboardDestinations: [],
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
            const main = page.locator('main#app-main')
            await main.waitFor({ state: 'visible', timeout: 15000 })
            await main.locator(`[data-fv1-direct-entry="${routeCase.directEntry}"]`).waitFor({ state: 'visible', timeout: 15000 })

            const layout = await main.evaluate((element) => {
              const targets = Array.from(element.querySelectorAll('a[href],button')).map((target) => {
                const style = getComputedStyle(target)
                const rect = target.getBoundingClientRect()
                return { width: rect.width, height: rect.height, visible: style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0 }
              }).filter(({ visible }) => visible)
              return {
                overflow: Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth),
                targets,
                essentialSizes: Array.from(element.querySelectorAll('[data-fv1-essential-copy]')).map((copy) => Number.parseFloat(getComputedStyle(copy).fontSize)),
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

            if (routeCase.heroAlt) {
              const image = await readImageEvidence(page.getByAltText(routeCase.heroAlt))
              expect(image.naturalWidth).toBeGreaterThan(0)
              expect(image.naturalHeight).toBeGreaterThan(0)
              expect(image.objectFit).toBe('cover')
              expect(image.objectPosition).toContain(routeCase.position)
              if (width <= 430) expect(image.currentSrc).toContain(routeCase.mobileAsset)
              if (width === 1440) expect(image.currentSrc).toContain(routeCase.desktopAsset)
              if (theme === 'light' && (width === 360 || width === 1440)) evidence.heroSamples[`${routeCase.directEntry}-${width}`] = image
            }

            if (routeCase.route === '/app/library' && theme === 'light' && width === 360) {
              const thumbnails = page.locator('[data-fv1-library-row] img')
              for (let index = 0; index < await thumbnails.count(); index += 1) {
                const image = await readImageEvidence(thumbnails.nth(index))
                expect(image.currentSrc).toMatch(/-160\.webp$/)
                evidence.libraryThumbnailSamples.push(image.currentSrc)
              }
              expect(evidence.libraryThumbnailSamples.length).toBeGreaterThanOrEqual(3)
            }
            evidence.observations += 1
          }
        }
        await context.close()
      }

      for (const width of [360, 1440]) {
        const context = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 1 })
        await context.addInitScript(() => localStorage.setItem('conversa-language', 'en'))
        const page = await context.newPage()
        for (const routeCase of routeCases) {
          await page.goto(`${base}${routeCase.route}`, { waitUntil: 'domcontentloaded' })
          await page.evaluate(() => { document.documentElement.style.fontSize = '200%' })
          await page.waitForTimeout(120)
          const overflow = await page.evaluate(() => Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth))
          expect(overflow, `${routeCase.route} overflow at 200%/${width}`).toBeLessThanOrEqual(1)
          evidence.maxHorizontalOverflow = Math.max(evidence.maxHorizontalOverflow, overflow)
          const clipped = await page.locator('main#app-main').evaluate((main) => Array.from(main.querySelectorAll('[data-fv1-essential-copy]')).filter((element) => {
            const rect = element.getBoundingClientRect()
            const style = getComputedStyle(element)
            return style.visibility === 'hidden' || style.display === 'none' || rect.width <= 0 || rect.height <= 0
          }).length)
          expect(clipped).toBe(0)
          evidence.zoomObservations += 1
        }
        await context.close()
      }

      const keyboardContext = await browser.newContext({ viewport: { width: 390, height: 900 }, deviceScaleFactor: 1 })
      await keyboardContext.addInitScript(() => localStorage.setItem('conversa-language', 'en'))
      const page = await keyboardContext.newPage()
      const keyboardCases = [
        ['/app/insights', '/app/passport'],
        ['/app/passport', '/app/opportunities'],
        ['/app/library', '/app/opportunities/river-photo-walk'],
        ['/app/library', '/app/opportunities/shared-stories'],
        ['/app/settings', '/app/profile'],
      ]
      for (const [route, href] of keyboardCases) {
        await page.goto(`${base}${route}`, { waitUntil: 'domcontentloaded' })
        await focusHrefWithKeyboard(page, href)
        await page.keyboard.press('Enter')
        await page.waitForURL((url) => url.pathname === href, { timeout: 15000 })
        evidence.keyboardDestinations.push(href)
      }
      await keyboardContext.close()

      expect(evidence.observations).toBe(40)
      expect(evidence.zoomObservations).toBe(8)
      expect(new Set(evidence.keyboardDestinations).size).toBe(5)
      process.stdout.write(`F6_BROWSER_EVIDENCE ${JSON.stringify(evidence)}\n`)
    } catch (error) {
      throw new Error(`${error instanceof Error ? error.message : String(error)}\nF6 server output:\n${output().slice(-2500)}`)
    } finally {
      await browser?.close().catch(() => {})
      if (server.exitCode === null) server.kill('SIGTERM')
      rmSync(outputDir, { recursive: true, force: true })
    }
  }, 180000)
})
