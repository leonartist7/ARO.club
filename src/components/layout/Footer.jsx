import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, ShieldCheck, Heart } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'YouTube', icon: Youtube, href: '#' },
];

/**
 * Footer ? warm two-tone surface, trust strip, link columns, social, legal.
 */
export default function Footer() {
  const { t } = useLanguage();

  const footerLinks = {
    company: [
      { name: t('footer.company.aboutUs'), href: '/about' },
      { name: t('footer.company.howItWorks'), href: '/how-it-works' },
      { name: t('footer.company.forTeachers'), href: '/for-teachers' },
      { name: t('footer.company.faq'), href: '/faq' },
    ],
    explore: [
      { name: t('footer.explore.browseExperiences'), href: '/explore' },
      { name: t('footer.explore.mapView'), href: '/map' },
      { name: t('footer.explore.leaderboard'), href: '/leaderboard' },
    ],
    support: [
      { name: t('footer.support.contactUs'), href: '/contact' },
      { name: t('footer.support.helpCenter'), href: '/faq' },
    ],
  };

  return (
    <footer className="bg-gray-50 dark:bg-gray-950 text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800">
      {/* Trust strip */}
      <div className="bg-primary-50 dark:bg-primary-900/20 border-b border-primary-100 dark:border-primary-900/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm font-medium text-primary-800 dark:text-primary-200 text-center">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" aria-hidden="true" />
              {t('footer.trustVerified')}
            </span>
            <span className="hidden sm:inline text-primary-300 dark:text-primary-700" aria-hidden="true">
              ?
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Heart className="w-4 h-4 fill-current" aria-hidden="true" />
              {t('footer.trustAntiShame')}
            </span>
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Link
              to="/"
              className="flex items-center gap-2 text-2xl font-display font-bold mb-4 text-primary-600 dark:text-primary-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-lg"
            >
              <span className="text-2xl" aria-hidden="true">🦎</span>
              Tonguee
            </Link>
            <p className="text-sm mb-6 max-w-xs text-gray-500 dark:text-gray-400">
              {t('footer.description')}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-11 h-11 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-primary-600 hover:text-white hover:border-primary-600 dark:hover:bg-primary-600 dark:hover:border-primary-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-gray-900 dark:text-gray-50 font-semibold mb-4">{t('footer.company.title')}</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm hover:text-primary-700 dark:hover:text-primary-300 transition-colors min-h-11 inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-gray-900 dark:text-gray-50 font-semibold mb-4">{t('footer.explore.title')}</h3>
            <ul className="space-y-2">
              {footerLinks.explore.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm hover:text-primary-700 dark:hover:text-primary-300 transition-colors min-h-11 inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-gray-900 dark:text-gray-50 font-semibold mb-4">{t('footer.support.title')}</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm hover:text-primary-700 dark:hover:text-primary-300 transition-colors min-h-11 inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            ? {new Date().getFullYear()} Tonguee. {t('footer.copyright')}
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            <Link to="#" className="hover:text-primary-700 dark:hover:text-primary-300 transition-colors min-h-11 inline-flex items-center">
              {t('footer.privacyPolicy')}
            </Link>
            <Link to="#" className="hover:text-primary-700 dark:hover:text-primary-300 transition-colors min-h-11 inline-flex items-center">
              {t('footer.termsOfService')}
            </Link>
            <Link to="#" className="hover:text-primary-700 dark:hover:text-primary-300 transition-colors min-h-11 inline-flex items-center">
              {t('footer.cookiePolicy')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
