import { Navigate, useLocation } from 'react-router-dom';
import { useStore } from '../../store/useStore';

export default function ProtectedRoute({ children }) {
  const currentUser = useStore((state) => state.currentUser);
  const location = useLocation();

  if (!currentUser) {
    // Redirect to choose role page but save the location they were trying to go to
    return <Navigate to="/choose-role" state={{ from: location }} replace />;
  }

  return children;
}
