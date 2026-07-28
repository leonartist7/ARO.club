import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function AuthCallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // The session will be automatically set by Supabase auth listener
    // Just wait a moment for the session to be established
    const timer = setTimeout(() => {
      navigate('/explore', { replace: true });
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

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
