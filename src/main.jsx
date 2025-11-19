import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { router } from './lib/routes';
import { AuthProvider } from './contexts/AuthContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { RecentlyViewedProvider } from './contexts/RecentlyViewedContext';
import { SavedSearchesProvider } from './contexts/SavedSearchesContext';

// Loading component for lazy-loaded routes
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
  </div>
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <FavoritesProvider>
        <RecentlyViewedProvider>
          <SavedSearchesProvider>
            <Suspense fallback={<PageLoader />}>
              <RouterProvider router={router} />
            </Suspense>
          </SavedSearchesProvider>
        </RecentlyViewedProvider>
      </FavoritesProvider>
    </AuthProvider>
  </StrictMode>
);
