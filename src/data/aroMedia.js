const byOriginal = {
  '/aro-living-miniature-calgary-v1.png': { sourceWidth: 1536, sourceHeight: 1024, widths: [640, 1440] },
  '/aro-maya-expression-persona-v1.png': { sourceWidth: 1024, sourceHeight: 1536, widths: [480, 960] },
  '/aro-maya-profile-portrait-v1.png': { sourceWidth: 1254, sourceHeight: 1254, widths: [256, 384] },
  '/aro-passport-life-map-v1.png': { sourceWidth: 1672, sourceHeight: 941, widths: [160, 640, 1440] },
  '/aro-portal-home-v1.png': { sourceWidth: 1672, sourceHeight: 941, widths: [160, 640, 1440] },
  '/aro-repair-table-v1.png': { sourceWidth: 1536, sourceHeight: 1024, widths: [160, 640, 1440] },
  '/aro-river-light-circle-v1.png': { sourceWidth: 1536, sourceHeight: 1024, widths: [160, 640, 1440] },
  '/aro-season-discovery-v1.png': { sourceWidth: 1672, sourceHeight: 941, widths: [640, 1440] },
  '/aro-shared-stories-table-v1.png': { sourceWidth: 1536, sourceHeight: 1024, widths: [160, 640, 1440] },
}

export function mediaFor(src) {
  const record = byOriginal[src]
  if (!record) throw new Error(`FV-1 media is missing for ${src}`)
  return record
}

export function mediaSources(src) {
  const stem = src.slice(1, -4)
  return mediaFor(src).widths.map((width) => ({
    src: `/fv1/${stem}-${width}.webp`,
    width,
  }))
}
