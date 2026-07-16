import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

/**
 * Route guard backed by REAL Supabase auth (via AuthContext).
 *
 * Props:
 *   requireRole - 'admin' | 'teacher' | 'student' (optional)
 *                 When set, the signed-in user's profile.role must match.
 *
 * Behaviour:
 *   - While auth state is resolving -> spinner (avoids a flash redirect).
 *   - Not signed in -> redirect to /choose-role, preserving intended location.
 *   - Signed in but wrong role -> redirect home (no privilege escalation).
 */
export default function ProtectedRoute({ children, requireRole }) {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/choose-role" state={{ from: location }} replace />;
  }

  if (requireRole && profile?.role !== requireRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}
