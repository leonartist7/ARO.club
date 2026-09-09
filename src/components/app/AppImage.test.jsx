import { readFileSync } from 'node:fs'
import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { AppImage } from './AppImage'

const ORIGINALS = [
  'aro-living-miniature-calgary-v1',
  'aro-maya-expression-persona-v1',
  'aro-maya-profile-portrait-v1',
  'aro-passport-life-map-v1',
  'aro-portal-home-v1',
  'aro-repair-table-v1',
  'aro-river-light-circle-v1',
  'aro-season-discovery-v1',
  'aro-shared-stories-table-v1',
]

describe('FV-1 media bootstrap', () => {
  it('reads the immutable approved originals', () => {
    for (const stem of ORIGINALS) {
      const bytes = readFileSync(`public/${stem}.png`)
      expect(bytes.length).toBeGreaterThan(0)
      expect(bytes.subarray(0, 8).toString('hex')).toBe('89504e470d0a1a0a')
    }
  })
})

describe('AppImage', () => {
  it('uses FV-1 responsive sources with intrinsic geometry', () => {
    render(<AppImage src="/aro-river-light-circle-v1.png" alt="River light" variant="card" />)
    const image = screen.getByAltText('River light')
    expect(image.getAttribute('width')).toBe('1536')
    expect(image.getAttribute('height')).toBe('1024')
    expect(image.getAttribute('sizes')).toBe('(max-width: 767px) 100vw, 640px')
    expect(image.getAttribute('srcset')).toContain('/fv1/aro-river-light-circle-v1-160.webp 160w')
    expect(image.getAttribute('srcset')).toContain('/fv1/aro-river-light-circle-v1-1440.webp 1440w')
  })

  it('keeps the same geometry when a source fails', () => {
    render(<AppImage src="/aro-maya-expression-persona-v1.png" alt="Maya persona" variant="persona" />)
    fireEvent.error(screen.getByAltText('Maya persona'))
    const fallback = screen.getByRole('img', { name: 'Maya persona' })
    expect(fallback.style.aspectRatio).toBe('1024 / 1536')
  })
})
