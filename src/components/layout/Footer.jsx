'use client';
import { Link } from '../../lib/navigation';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { AroWordmark } from '../brand/AroMark';
import { rebrandJourneyCopy } from '../../i18n/rebrandJourney';

function FooterLinkGroup({ title, links, className = '' }) {
  return (
    <section className={className}>
      <h2 className="mb-1 text-xs font-extrabold uppercase tracking-[0.12em] text-ink/65 dark:text-bone/65">
        {title}
      </h2>
      <ul className="grid grid-cols-1">
        {links.map((link) => (
          <li key={link.name}>
            <Link
              to={link.href}
              className="inline-flex min-h-11 min-w-11 items-center rounded-sm text-sm font-medium text-ink/75 transition-colors hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-control-focus dark:text-bone/75 dark:hover:text-primary-300"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function Footer() {
  const { t, language } = useLanguage();
  const journey = rebrandJourneyCopy[language] ?? rebrandJourneyCopy.en;

  const groups = [
    {
      title: t('footer.company.title'),
      links: [
        { name: t('footer.company.aboutUs'), href: '/about' },
        { name: t('footer.company.howItWorks'), href: '/how-it-works' },
        { name: t('footer.company.forTeachers'), href: '/for-teachers' },
        { name: t('footer.company.faq'), href: '/faq' },
      ],
    },
    {
      title: t('footer.explore.title'),
      links: [
        { name: t('footer.explore.browseExperiences'), href: '/explore' },
        { name: t('footer.explore.mapView'), href: '/map' },
      ],
    },
    {
      title: t('footer.support.title'),
      links: [
        { name: t('footer.support.contactUs'), href: '/contact' },
        { name: t('footer.support.helpCenter'), href: '/faq' },
      ],
    },
  ];

  const legalLinks = [
    { name: t('footer.privacyPolicy'), href: '/privacy' },
    { name: t('footer.termsOfService'), href: '/terms' },
    { name: t('footer.cookiePolicy'), href: '/cookies' },
  ];

  return (
    <footer className="border-t-2 border-brand-orange bg-bone text-ink/75 dark:border-primary-400 dark:bg-gray-950 dark:text-bone/75">
      <div className="container mx-auto px-4 py-5 sm:px-6 sm:py-7 lg:px-8">
        <div className="grid gap-4 md:grid-cols-[minmax(15rem,0.85fr)_1.5fr] md:gap-10">
          <div className="md:max-w-sm">
            <div className="flex min-h-11 items-center justify-between gap-3">
              <Link
                to="/"
                className="inline-flex min-h-11 shrink-0 items-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-control-focus"
                aria-label="ARO home"
              >
                <AroWordmark label="" />
              </Link>
              <Link
                to="/onboarding/preview"
                className="inline-flex min-h-11 items-center gap-1.5 rounded-sm text-sm font-extrabold text-primary-700 underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-control-focus dark:text-primary-300"
              >
                {journey.start}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <p className="mt-1 max-w-[34rem] text-sm leading-6 text-ink/65 dark:text-bone/65">
              {t('footer.description')}
            </p>
          </div>

          <div className="md:hidden">
            <details className="group border-y border-ink/15 dark:border-bone/15">
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 py-1 text-sm font-extrabold text-ink marker:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-control-focus dark:text-bone [&::-webkit-details-marker]:hidden">
                {t('footer.links.title')}
                <ChevronDown
                  className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180 motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </summary>
              <nav aria-label={t('footer.links.title')} className="grid grid-cols-2 gap-x-4 gap-y-4 pb-4 pt-2">
                {groups.map((group) => (
                  <FooterLinkGroup
                    key={group.title}
                    title={group.title}
                    links={group.links}
                    className={group.title === t('footer.support.title') ? 'col-span-2' : ''}
                  />
                ))}
              </nav>
            </details>
          </div>

          <nav aria-label={t('footer.links.title')} className="hidden grid-cols-3 gap-4 md:grid md:gap-6 lg:gap-8">
            {groups.map((group) => (
              <FooterLinkGroup key={group.title} title={group.title} links={group.links} />
            ))}
          </nav>
        </div>

        <div className="mt-4 flex flex-col gap-1 border-t border-ink/10 pt-2.5 dark:border-bone/10 sm:mt-5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-4">
          <p className="text-xs leading-5 text-ink/60 dark:text-bone/60">
            © {new Date().getFullYear()} ARO. {t('footer.copyright')}
          </p>
          <nav aria-label={t('footer.legal.title')} className="flex flex-wrap gap-x-4">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="inline-flex min-h-11 min-w-11 items-center rounded-sm text-xs font-semibold text-ink/65 transition-colors hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-control-focus dark:text-bone/65 dark:hover:text-primary-300"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
