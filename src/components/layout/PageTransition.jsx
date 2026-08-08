import { Outlet, useLocation } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Subtle fade-in / slide-up on route change. Static when reduced-motion.
 */
export default function PageTransition() {
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <Outlet />;
  }

  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
      className="animate-fade-in"
    >
      <Outlet />
    </motion.div>
  );
}
