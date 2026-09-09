import React, { useState } from 'react'
import { mediaFor, mediaSources } from '../../data/aroMedia'

const sizesFor = {
  hero: '(max-width: 767px) 100vw, 1440px',
  card: '(max-width: 767px) 100vw, 640px',
  thumbnail: '160px',
  portrait: '(max-width: 767px) 256px, 384px',
  persona: '(max-width: 767px) 480px, 480px',
}

export function AppImage({ src, alt, variant = 'card', loading = 'lazy', priority = false, cropClass = '', className = '' }) {
  const [failed, setFailed] = useState(false)
  const record = mediaFor(src)
  const sources = mediaSources(src)
  const primary = sources.at(-1)
  const dimensions = { width: record.sourceWidth, height: record.sourceHeight }
  if (failed) {
    return <span role="img" aria-label={alt || 'Image unavailable'} className={`block ${className}`} style={{ aspectRatio: `${dimensions.width} / ${dimensions.height}` }} />
  }
  return (
    <img
      {...dimensions}
      src={primary.src}
      srcSet={sources.map(({ src: candidate, width }) => `${candidate} ${width}w`).join(', ')}
      sizes={sizesFor[variant]}
      alt={alt}
      loading={priority ? 'eager' : loading}
      fetchPriority={priority ? 'high' : undefined}
      onError={() => setFailed(true)}
      className={`${cropClass} ${className}`.trim()}
    />
  )
}
