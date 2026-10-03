'use client';
import { useState } from 'react';
import { Link } from '../lib/navigation';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Card, CardBody } from '../components/ui/Card';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { accountEntryCopy } from '../i18n/accountEntry';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { resetPassword, isBackendConfigured } = useAuth();
  const { language } = useLanguage();
  const { common, recovery: copy } = accountEntryCopy[language] ?? accountEntryCopy.en;
  const reduceMotion = useReducedMotion();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError(common.invalidEmail);
      return;
    }

    setLoading(true);

    try {
      const { error } = await resetPassword(email);

      if (error) {
        setError(error.message);
      } else {
        setSuccess(true);
      }
    } catch {
      setError(common.unexpected);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      lang={language}
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="min-h-[calc(100dvh-4rem)] bg-bone dark:bg-gray-950 flex items-start justify-center py-8 px-4 sm:items-center sm:px-6 lg:px-8"
    >
      <div className="max-w-md w-full">
        <motion.div
          initial={reduceMotion ? false : { y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.25 }}
        >
          {/* Back Button */}
          <Link
            to="/login"
            className="inline-flex min-h-11 items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 dark:text-gray-300 dark:hover:text-bone focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-control-focus"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">{copy.back}</span>
          </Link>

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

          {/* Card */}
          <Card>
            <CardBody>
              {!isBackendConfigured && (
                <div className="mb-4 rounded-lg border border-secondary-300 bg-secondary-50 p-3 text-sm text-ink dark:border-secondary-700 dark:bg-secondary-900/20 dark:text-bone">
                  {copy.unavailable}
                </div>
              )}

              {/* Success Message */}
              {success && (
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg dark:bg-green-900/30"
                >
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-green-800 dark:text-green-200">{copy.successTitle}</p>
                      <p className="text-xs text-green-700 mt-1 dark:text-green-200">
                        {copy.successIntro} <strong>{email}</strong>. {copy.successOutro}
                      </p>
                    </div>
                  </div>
                </motion.div>
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

              {/* Form */}
              {!success ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    type="email"
                    label={common.email}
                    placeholder={common.emailPlaceholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading || !isBackendConfigured}
                    icon={<Mail className="w-5 h-5" />}
                  />

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
              ) : (
                <div className="space-y-4">
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => {
                      setSuccess(false);
                      setEmail('');
                    }}
                  >
                    {copy.another}
                  </Button>
                  <Link to="/login">
                    <Button variant="primary" fullWidth>
                      {copy.return}
                    </Button>
                  </Link>
                </div>
              )}

              {/* Help Text */}
              {!success && (
                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    {copy.remember}{' '}
                    <Link to="/login" className="text-primary-700 hover:text-primary-500 font-medium dark:text-primary-300 dark:hover:text-primary-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-control-focus">
                      {copy.signin}
                    </Link>
                  </p>
                </div>
              )}
            </CardBody>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
