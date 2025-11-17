/**
 * SkipToContent component for accessibility
 * - Hidden link that appears on focus
 * - Jumps to main content, bypassing navigation
 * - Improves keyboard navigation experience
 *
 * Usage: Place this at the very top of your app, before the header
 *
 * @example
 * <SkipToContent />
 * <Header />
 * <main id="main-content">...</main>
 */
export default function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999]
                 focus:px-4 focus:py-2 focus:bg-primary-500 focus:text-white focus:rounded-lg
                 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                 font-medium transition-all"
    >
      Skip to main content
    </a>
  );
}
