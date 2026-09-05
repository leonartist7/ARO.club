import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldOff } from 'lucide-react';
import { UX0_PROTOTYPE_MODE } from '../config/ux0';
import { useLanguage } from '../contexts/LanguageContext';

export default function AuthCallbackPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    if (UX0_PROTOTYPE_MODE) return undefined;

    // The session will be automatically set by Supabase auth listener
    // Just wait a moment for the session to be established
    const timer = setTimeout(() => {
      navigate('/explore', { replace: true });
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  if (UX0_PROTOTYPE_MODE) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50 px-4 dark:from-primary-900/30 dark:to-secondary-900/30">
        <section
          className="w-full max-w-xl rounded-[2rem] border border-primary-200 bg-white/90 p-8 text-center shadow-xl dark:border-primary-800 dark:bg-gray-950/90 sm:p-12"
          aria-labelledby="prototype-callback-title"
          role="status"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-200">
            <ShieldOff className="h-8 w-8" aria-hidden="true" />
          </div>
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-primary-700 dark:text-primary-300">
            {t('prototypeAccess.label')}
          </p>
          <h1 id="prototype-callback-title" className="mt-3 font-display text-4xl leading-tight text-ink dark:text-bone">
            {t('prototypeAccess.callbackTitle')}
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base leading-7 text-ink/70 dark:text-bone/70">
            {t('prototypeAccess.callbackBody')}
          </p>
          <Link
            to="/"
            className="mt-7 inline-flex min-h-11 items-center justify-center rounded-full bg-primary-600 px-6 text-sm font-bold text-white transition-colors hover:bg-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-4 dark:focus-visible:ring-offset-gray-950"
          >
            {t('prototypeAccess.backToPrototype')}
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/30 dark:to-secondary-900/30 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-8 h-8 border-3 border-white border-t-transparent rounded-full"
          ></motion.div>
        </div>
        <h2 className="text-2xl font-display font-bold text-gray-900 mb-2 dark:text-white">
          Completing Sign In...
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Just a moment while we set up your account
        </p>
      </motion.div>
    </div>
  );
}
