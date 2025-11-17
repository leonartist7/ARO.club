import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import SkipToContent from '../ui/SkipToContent';
import { ThemeProvider } from '../../contexts/ThemeContext';
import { ToastProvider } from '../../contexts/ToastContext';
import ErrorBoundary from '../ErrorBoundary';

/**
 * Main layout component that wraps all pages
 * - Provides ThemeProvider for dark mode
 * - Provides ToastProvider for notifications
 * - Wraps content in ErrorBoundary
 * - Includes SkipToContent for accessibility
 */
export default function Layout() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <ErrorBoundary>
          <SkipToContent />
          <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors">
            <Header />
            <main id="main-content" className="flex-1">
              <Outlet />
            </main>
            <Footer />
          </div>
        </ErrorBoundary>
      </ToastProvider>
    </ThemeProvider>
  );
}
