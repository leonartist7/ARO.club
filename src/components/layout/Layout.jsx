import Header from './Header';
import Footer from './Footer';
import PageTransition from './PageTransition';
import SkipToContent from '../ui/SkipToContent';
import BottomNav from '../ui/BottomNav';
import CompareBar from '../CompareBar';
import { ThemeProvider } from '../../contexts/ThemeContext';
import { ToastProvider } from '../../contexts/ToastContext';
import { CompareProvider } from '../../contexts/CompareContext';
import { LanguageProvider } from '../../contexts/LanguageContext';
import ErrorBoundary from '../ErrorBoundary';

/**
 * Main layout ? shell for every page (DP1).
 */
export default function Layout() {
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
              <div className="min-h-screen flex flex-col overflow-x-hidden bg-white dark:bg-gray-950 transition-colors">
                <Header />
                <main id="main-content" className="flex-1 pb-20 md:pb-0">
                  <PageTransition />
                </main>
                <Footer />
                <BottomNav />
                <CompareBar />
              </div>
            </ErrorBoundary>
          </CompareProvider>
        </ToastProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}
