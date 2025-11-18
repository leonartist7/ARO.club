import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import SkipToContent from '../ui/SkipToContent';
import CompareBar from '../CompareBar';
import { ThemeProvider } from '../../contexts/ThemeContext';
import { ToastProvider } from '../../contexts/ToastContext';
import { CompareProvider } from '../../contexts/CompareContext';
import ErrorBoundary from '../ErrorBoundary';

/**
 * Main layout component that wraps all pages
 * - Provides ThemeProvider for dark mode
 * - Provides ToastProvider for notifications
 * - Provides CompareProvider for comparison feature
 * - Wraps content in ErrorBoundary
 * - Includes SkipToContent for accessibility
 * - Includes CompareBar for comparison list
 */
export default function Layout() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <CompareProvider>
          <ErrorBoundary>
            <SkipToContent />
            <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors">
              <Header />
              <main id="main-content" className="flex-1">
                <Outlet />
              </main>
              <Footer />
              {/* Module 3: Compare Bar */}
              <CompareBar />
            </div>
          </ErrorBoundary>
        </CompareProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
