import { Navigate, useLocation } from 'react-router-dom';
import { usePlayerStore } from '../../store/usePlayerStore';

/**
 * Guards a route behind a signed-in player.
 *
 * Also enforces the flow: a player who hasn't finished onboarding is sent
 * there first, so the six-step setup can't be skipped by deep-linking to
 * /games or /shop with an empty profile.
 */
export default function ProtectedRoute({ children, requireOnboarding = true }) {
  const user = usePlayerStore((state) => state.user);
  const onboardingComplete = usePlayerStore((state) => state.onboardingComplete);
  const location = useLocation();

  if (!user) {
    // Remember where they were headed so we can return them after sign-in.
    return <Navigate to="/choose-role" state={{ from: location }} replace />;
  }

  const isOnboardingRoute = location.pathname.startsWith('/onboarding');

  if (requireOnboarding && !onboardingComplete && !isOnboardingRoute) {
    const role = user.role === 'teacher' ? 'teacher' : 'student';
    return <Navigate to={`/onboarding/${role}`} replace />;
  }

  return children;
}
