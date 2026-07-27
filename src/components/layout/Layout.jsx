import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import SkipToContent from '../ui/SkipToContent';
import CompareBar from '../CompareBar';
import { ThemeProvider } from '../../contexts/ThemeContext';
import { ToastProvider } from '../../contexts/ToastContext';
import { CompareProvider } from '../../contexts/CompareContext';
import { LanguageProvider } from '../../contexts/LanguageContext';
import { usePlayerStore } from '../../store/usePlayerStore';
import ErrorBoundary from '../ErrorBoundary';

/**
 * Main layout component that wraps all pages
 * - Provides LanguageProvider for multi-language support
 * - Provides ThemeProvider for dark mode
 * - Provides ToastProvider for notifications
 * - Provides CompareProvider for comparison feature
 * - Wraps content in ErrorBoundary
 * - Includes SkipToContent for accessibility
 * - Includes CompareBar for comparison list
 */
export default function Layout() {
  const checkIn = usePlayerStore((state) => state.checkIn);

  // Extends the streak on a new day and rolls fresh daily quests.
  useEffect(() => {
    checkIn();
  }, [checkIn]);

  return (
    <LanguageProvider>
      <ThemeProvider>
        <ToastProvider>
          <CompareProvider>
            <ErrorBoundary>
              <SkipToContent />
              {/* overflow-x-hidden: decorative elements (step badges, blur
                  orbs) intentionally overhang their cards - clip them here so
                  they never turn into a horizontal page scroll on mobile. */}
              <div className="min-h-screen flex flex-col overflow-x-hidden bg-white dark:bg-gray-900 transition-colors">
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
    </LanguageProvider>
  );
}
