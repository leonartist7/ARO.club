'use client';
import { useState } from 'react';
import { Link } from '../lib/navigation';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail, Lock, User, AlertCircle, CheckCircle, Chrome } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Card, CardBody } from '../components/ui/Card';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { accountEntryCopy } from '../i18n/accountEntry';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signUp, signInWithGoogle, isBackendConfigured } = useAuth();
  const { language } = useLanguage();
  const { common, signup: copy } = accountEntryCopy[language] ?? accountEntryCopy.en;
  const reduceMotion = useReducedMotion();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (formData.name.trim().length < 2) {
      setError(copy.invalidName);
      return false;
    }

    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError(common.invalidEmail);
      return false;
    }

    if (formData.password.length < 6) {
      setError(copy.shortPassword);
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError(copy.mismatch);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const { error } = await signUp({
        email: formData.email,
        password: formData.password,
        name: formData.name,
      });

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

  const passwordStrength = () => {
    const password = formData.password;
    if (password.length === 0) return null;
    if (password.length < 6) return { label: copy.weak, tone: 'weak', color: 'bg-red-500', width: '33%' };
    if (password.length < 10) return { label: copy.medium, tone: 'medium', color: 'bg-yellow-500', width: '66%' };
    return { label: copy.strong, tone: 'strong', color: 'bg-green-500', width: '100%' };
  };

  const strength = passwordStrength();

  return (
    <motion.div
      lang={language}
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="min-h-screen bg-bone dark:bg-gray-950 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8"
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

          {/* Signup Card */}
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
                  className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-start gap-2"
                >
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-800 dark:text-green-200">{copy.successTitle}</p>
                    <p className="text-xs text-green-700 mt-1 dark:text-green-200">{copy.successBody}</p>
                  </div>
                </motion.div>
              )}

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2"
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
                disabled={loading || success || !isBackendConfigured}
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

              {/* Signup Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="text"
                  name="name"
                  label={copy.name}
                  placeholder={copy.namePlaceholder}
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={loading || success || !isBackendConfigured}
                  icon={<User className="w-5 h-5" />}
                />

                <Input
                  type="email"
                  name="email"
                  label={common.email}
                  placeholder={common.emailPlaceholder}
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading || success || !isBackendConfigured}
                  icon={<Mail className="w-5 h-5" />}
                />

                <div>
                  <Input
                    type="password"
                    name="password"
                    label={common.password}
                    placeholder={copy.passwordPlaceholder}
                    value={formData.password}
                    onChange={handleChange}
                    required
                    disabled={loading || success || !isBackendConfigured}
                    icon={<Lock className="w-5 h-5" />}
                  />
                  {strength && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-gray-600 dark:text-gray-300">{copy.strength}</span>
                        <span className={`font-medium ${
                          strength.tone === 'weak' ? 'text-red-700 dark:text-red-300' :
                          strength.tone === 'medium' ? 'text-yellow-700 dark:text-yellow-300' :
                          'text-green-700 dark:text-green-300'
                        }`}>
                          {strength.label}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full transition-all ${strength.color}`}
                          style={{ width: strength.width }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                <Input
                  type="password"
                  name="confirmPassword"
                  label={copy.confirm}
                  placeholder={copy.confirmPlaceholder}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  disabled={loading || success || !isBackendConfigured}
                  icon={<Lock className="w-5 h-5" />}
                />

                <div className="text-xs text-gray-600 space-y-1 bg-gray-50 p-3 rounded-lg dark:bg-gray-800 dark:text-gray-300">
                  <p className="font-medium text-gray-700 mb-1 dark:text-gray-200">{copy.requirements}</p>
                  <ul className="space-y-1 list-disc list-inside">
                    <li className={formData.password.length >= 6 ? 'text-green-700 dark:text-green-300' : ''}>
                      {copy.minLength}
                    </li>
                    <li className={formData.password === formData.confirmPassword && formData.password ? 'text-green-700 dark:text-green-300' : ''}>
                      {copy.match}
                    </li>
                  </ul>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  disabled={loading || success || !isBackendConfigured}
                  loading={loading}
                >
                  {loading ? copy.pending : copy.submit}
                </Button>
              </form>

              {/* Sign In Link */}
              <div className="mt-6 text-center text-sm">
                <span className="text-gray-600 dark:text-gray-300">{copy.hasAccount}{' '}</span>
                <Link
                  to="/login"
                  className="text-primary-700 hover:text-primary-500 font-medium dark:text-primary-300 dark:hover:text-primary-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-control-focus"
                >
                  {copy.signin}
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
