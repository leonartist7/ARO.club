'use client';
import { useState } from 'react';
import { Link, useLocation } from '../lib/navigation';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail, Lock, AlertCircle, Chrome } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Card, CardBody } from '../components/ui/Card';
import { useAuth } from '../contexts/AuthContext';
import {safeReturnPath} from '../lib/auth/config';
import { useLanguage } from '../contexts/LanguageContext';
import { accountEntryCopy } from '../i18n/accountEntry';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signInWithGoogle, isBackendConfigured } = useAuth();
  const { language } = useLanguage();
  const { common, login: copy } = accountEntryCopy[language] ?? accountEntryCopy.en;
  const reduceMotion = useReducedMotion();
  const location = useLocation();

  const from = safeReturnPath(new URLSearchParams(location.search).get('next'));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error } = await signIn({ email, password });

      if (error) {
        setError(error.message);
      } else {
        window.location.replace(from);
      }
    } catch {
      setError(common.unexpected);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);

    try {
      const { error } = await signInWithGoogle();

      if (error) {
        setError(error.message);
        setLoading(false);
      }
      // Note: Google sign-in will redirect, so we don't set loading to false here
    } catch {
      setError(common.unexpected);
      setLoading(false);
    }
  };

  return (
    <motion.div
      lang={language}
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="min-h-screen bg-bone dark:bg-gray-950 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 motion-reduce:transition-none"
    >
      <div className="max-w-md w-full">
        <motion.div
          initial={reduceMotion ? false : { y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.25 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.16em] text-primary-700 dark:text-primary-300">{common.promise}</p>
            <h1 className="text-3xl font-display font-bold text-ink mb-2 dark:text-bone">
              {copy.title}
            </h1>
            <p className="text-content-secondary dark:text-content-darkSecondary">
              {copy.subtitle}
            </p>
          </div>

          {/* Login Card */}
          <Card>
            <CardBody>
              {!isBackendConfigured && (
                <div className="mb-4 rounded-lg border border-secondary-300 bg-secondary-50 p-3 text-sm text-ink dark:border-secondary-700 dark:bg-secondary-900/20 dark:text-bone">
                  {copy.unavailable}
                </div>
              )}

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 dark:bg-red-900/30"
                >
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700 dark:text-red-200" role="alert">{error}</p>
                </motion.div>
              )}

              {/* Google Sign In */}
              <Button
                type="button"
                variant="outline"
                fullWidth
                onClick={handleGoogleSignIn}
                disabled={loading || !isBackendConfigured}
                icon={<Chrome className="w-5 h-5" />}
                className="mb-4"
              >
                {common.google}
              </Button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500 dark:bg-gray-900 dark:text-gray-300">{copy.emailDivider}</span>
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  id="login-email"
                  name="email"
                  type="email"
                  label={common.email}
                  placeholder={common.emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading || !isBackendConfigured}
                  icon={<Mail className="w-5 h-5" />}
                />

                <Input
                  id="login-password"
                  name="password"
                  type="password"
                  label={common.password}
                  placeholder={copy.passwordPlaceholder}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading || !isBackendConfigured}
                  icon={<Lock className="w-5 h-5" />}
                />

                <div className="flex items-center justify-end text-sm">
                  <Link
                    to="/forgot-password"
                    className="text-primary-700 hover:text-primary-500 font-medium dark:text-primary-300 dark:hover:text-primary-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-control-focus"
                  >
                    {copy.forgot}
                  </Link>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  disabled={loading || !isBackendConfigured}
                  loading={loading}
                >
                  {loading ? copy.pending : copy.submit}
                </Button>
              </form>

              {/* Sign Up Link */}
              <div className="mt-6 text-center text-sm">
                <span className="text-gray-600 dark:text-gray-300">{copy.noAccount}{' '}</span>
                <Link
                  to="/signup"
                  className="text-primary-700 hover:text-primary-500 font-medium dark:text-primary-300 dark:hover:text-primary-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-control-focus"
                >
                  {copy.signup}
                </Link>
              </div>
            </CardBody>
          </Card>

          {/* Footer */}
          <div className="mt-6 text-center text-xs text-gray-600 dark:text-gray-300">
            {copy.legalPrefix}{' '}
            <Link to="/terms" className="text-primary-700 hover:text-primary-500 dark:text-primary-300 dark:hover:text-primary-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-control-focus">
              {common.terms}
            </Link>{' '}
            {common.and}{' '}
            <Link to="/privacy" className="text-primary-700 hover:text-primary-500 dark:text-primary-300 dark:hover:text-primary-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-control-focus">
              {common.privacy}
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
