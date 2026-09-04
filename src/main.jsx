import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { router } from './lib/routes';
import { AuthProvider, PrototypeAuthProvider } from './contexts/AuthContext';
import { UX0_PROTOTYPE_MODE } from './config/ux0';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { RecentlyViewedProvider } from './contexts/RecentlyViewedContext';
import { SavedSearchesProvider } from './contexts/SavedSearchesContext';
import PageLoader from './components/ui/PageLoader';

const AccountBoundary = UX0_PROTOTYPE_MODE ? PrototypeAuthProvider : AuthProvider;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AccountBoundary>
      <FavoritesProvider>
        <RecentlyViewedProvider>
          <SavedSearchesProvider>
            <Suspense fallback={<PageLoader />}>
              <RouterProvider router={router} />
            </Suspense>
          </SavedSearchesProvider>
        </RecentlyViewedProvider>
      </FavoritesProvider>
    </AccountBoundary>
  </StrictMode>
);
