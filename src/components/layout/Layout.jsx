import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import useKeyboardShortcuts from '../../hooks/useKeyboardShortcuts';

/**
 * Main layout component that wraps all pages
 */
export default function Layout() {
  // Enable global keyboard shortcuts
  useKeyboardShortcuts();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
