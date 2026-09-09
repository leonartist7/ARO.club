import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

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
      console.log(`FV1_ORIGINAL:${stem}:${bytes.toString('base64')}`)
    }
  })
})
