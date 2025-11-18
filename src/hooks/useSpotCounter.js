import { useState, useEffect } from 'react';

/**
 * Hook to simulate real-time spot counter updates
 * For demo purposes - in production this would use WebSockets or polling
 */
export function useSpotCounter(initialSpots, experienceId) {
  const [spotsLeft, setSpotsLeft] = useState(initialSpots);

  useEffect(() => {
    // Only simulate updates if there are spots available
    if (spotsLeft <= 0) return;

    // Random interval between 30-60 seconds
    const getRandomInterval = () => {
      return Math.floor(Math.random() * 30000) + 30000;
    };

    const scheduleNextUpdate = () => {
      const interval = getRandomInterval();

      const timeoutId = setTimeout(() => {
        // 30% chance to decrease spots by 1
        if (Math.random() < 0.3 && spotsLeft > 0) {
          setSpotsLeft((prev) => Math.max(0, prev - 1));
        }

        // Schedule next update if spots still available
        if (spotsLeft > 0) {
          scheduleNextUpdate();
        }
      }, interval);

      return timeoutId;
    };

    const timeoutId = scheduleNextUpdate();

    // Cleanup on unmount
    return () => {
      clearTimeout(timeoutId);
    };
  }, [spotsLeft, experienceId]);

  return spotsLeft;
}
