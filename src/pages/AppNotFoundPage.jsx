import React from 'react'
import { Link } from 'react-router-dom'
import { fv1ShellCopy } from '../i18n/fv1/shell'

export default function AppNotFoundPage() {
  const copy = fv1ShellCopy.en
  return (
    <section className="mx-auto flex min-h-[50vh] max-w-xl flex-col justify-center px-4 py-12 sm:px-8" aria-labelledby="example-unavailable-title">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-600 dark:text-primary-300">Fictional preview</p>
      <h1 id="example-unavailable-title" className="mt-3 font-display text-4xl text-ink dark:text-bone">{copy.unavailableTitle}</h1>
      <p className="mt-4 text-base leading-7 text-ink/65 dark:text-bone/65">{copy.unavailableBody}</p>
      <Link to="/app/world" className="mt-7 inline-flex min-h-11 w-fit items-center px-5 font-bold text-primary-700 outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:text-primary-300">{copy.backToWorld}</Link>
    </section>
  )
}
