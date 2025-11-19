import { useToastContext } from '../contexts/ToastContext';

/**
 * Custom hook for easy access to toast functionality
 *
 * @example
 * const toast = useToast();
 * toast.success('Profile updated successfully!');
 * toast.error('Failed to save changes');
 * toast.warning('Please verify your email');
 * toast.info('New messages available');
 */
export function useToast() {
  const { addToast, removeToast } = useToastContext();

  return {
    success: (message, duration) => addToast(message, 'success', duration),
    error: (message, duration) => addToast(message, 'error', duration),
    warning: (message, duration) => addToast(message, 'warning', duration),
    info: (message, duration) => addToast(message, 'info', duration),
    dismiss: removeToast,
  };
}
