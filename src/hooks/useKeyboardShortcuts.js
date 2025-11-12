import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Custom hook for global keyboard shortcuts
 * @param {Object} options - Configuration options
 * @param {boolean} options.enabled - Whether shortcuts are enabled (default: true)
 */
export default function useKeyboardShortcuts(options = {}) {
  const navigate = useNavigate();
  const { enabled = true } = options;

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event) => {
      // Ignore shortcuts when user is typing in input fields
      const isTyping =
        event.target.tagName === 'INPUT' ||
        event.target.tagName === 'TEXTAREA' ||
        event.target.isContentEditable;

      // Cmd/Ctrl + K: Focus search (will need to implement search modal)
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        // For now, navigate to explore page
        // In future: Open global search modal
        navigate('/explore');
        // Focus search input if it exists
        setTimeout(() => {
          const searchInput = document.querySelector('input[type="search"], input[placeholder*="Search" i]');
          if (searchInput) {
            searchInput.focus();
            searchInput.select();
          }
        }, 100);
        return;
      }

      // Ignore other shortcuts when typing
      if (isTyping) return;

      // Esc: Close modals/dialogs or go back
      if (event.key === 'Escape') {
        // Check if there's an open modal (has backdrop)
        const backdrop = document.querySelector('[class*="backdrop"]');
        const modal = document.querySelector('[role="dialog"]');

        if (backdrop || modal) {
          // Let the modal's own Esc handler deal with it
          return;
        }

        // Otherwise, navigate back
        event.preventDefault();
        window.history.back();
        return;
      }

      // G + H: Go Home
      if (event.key === 'h' && !event.shiftKey && !event.metaKey && !event.ctrlKey) {
        // Use a temporary flag to detect double-tap
        const now = Date.now();
        const lastH = window._lastHPress || 0;

        if (now - lastH < 500) {
          // Double tap detected
          event.preventDefault();
          navigate('/');
          window._lastHPress = 0;
        } else {
          window._lastHPress = now;
        }
        return;
      }

      // G + E: Go to Explore
      if (event.key === 'e' && !event.shiftKey && !event.metaKey && !event.ctrlKey) {
        const now = Date.now();
        const lastE = window._lastEPress || 0;

        if (now - lastE < 500) {
          event.preventDefault();
          navigate('/explore');
          window._lastEPress = 0;
        } else {
          window._lastEPress = now;
        }
        return;
      }

      // G + P: Go to Profile
      if (event.key === 'p' && !event.shiftKey && !event.metaKey && !event.ctrlKey) {
        const now = Date.now();
        const lastP = window._lastPPress || 0;

        if (now - lastP < 500) {
          event.preventDefault();
          navigate('/profile');
          window._lastPPress = 0;
        } else {
          window._lastPPress = now;
        }
        return;
      }

      // ?: Show keyboard shortcuts help
      if (event.key === '?' && event.shiftKey) {
        event.preventDefault();
        // Show shortcuts modal (would need to implement)
        console.log('Keyboard Shortcuts Help (to be implemented)');
        alert(`Keyboard Shortcuts:

⌘/Ctrl + K - Quick search
Esc - Go back / Close modal
G then H - Go to Home
G then E - Go to Explore
G then P - Go to Profile
? - Show this help

Tips: Press keys quickly in sequence for "G then" shortcuts.`);
        return;
      }
    };

    // Add event listener
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [enabled, navigate]);
}

/**
 * Hook for component-specific keyboard shortcuts
 * @param {Object} shortcuts - Map of key combinations to handlers
 * @param {Array} deps - Dependencies array
 *
 * Example usage:
 * useComponentShortcuts({
 *   'Enter': () => handleSubmit(),
 *   'Escape': () => handleCancel(),
 * }, [handleSubmit, handleCancel]);
 */
export function useComponentShortcuts(shortcuts, deps = []) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key;
      const combo = [
        event.ctrlKey && 'Ctrl',
        event.metaKey && 'Meta',
        event.shiftKey && 'Shift',
        event.altKey && 'Alt',
        key,
      ]
        .filter(Boolean)
        .join('+');

      // Check if handler exists for this key or combo
      if (shortcuts[key]) {
        event.preventDefault();
        shortcuts[key](event);
      } else if (shortcuts[combo]) {
        event.preventDefault();
        shortcuts[combo](event);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, deps);
}
