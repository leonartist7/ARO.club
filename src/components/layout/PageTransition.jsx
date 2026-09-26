'use client';
import { useLocation } from '../../lib/navigation';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Subtle fade-in / slide-up on route change. Static when reduced-motion.
 */
export default function PageTransition({ children }) {
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      key={location.pathname}
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.28, ease: 'easeOut' }}
      className="animate-fade-in"
    >
      {children}
    </motion.div>
  );
}
