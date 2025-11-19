import { useState, useEffect } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const STORAGE_KEY = 'conversa-review-votes';

/**
 * Review Helpfulness Component
 * Allows users to vote on review helpfulness
 */
export default function ReviewHelpfulness({ reviewId, initialHelpfulCount = 0, initialNotHelpfulCount = 0 }) {
  const [helpfulCount, setHelpfulCount] = useState(initialHelpfulCount);
  const [notHelpfulCount, setNotHelpfulCount] = useState(initialNotHelpfulCount);
  const [userVote, setUserVote] = useState(null); // 'helpful', 'not-helpful', or null

  // Load user's vote from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const votes = JSON.parse(stored);
        if (votes[reviewId]) {
          setUserVote(votes[reviewId]);
        }
      }
    } catch (error) {
      console.error('Failed to load review votes from localStorage:', error);
    }
  }, [reviewId]);

  // Save user's vote to localStorage
  const saveVote = (vote) => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const votes = stored ? JSON.parse(stored) : {};
      votes[reviewId] = vote;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(votes));
    } catch (error) {
      console.error('Failed to save review vote to localStorage:', error);
    }
  };

  // Handle voting
  const handleVote = (voteType) => {
    // If already voted, remove vote
    if (userVote === voteType) {
      if (voteType === 'helpful') {
        setHelpfulCount((prev) => Math.max(0, prev - 1));
      } else {
        setNotHelpfulCount((prev) => Math.max(0, prev - 1));
      }
      setUserVote(null);
      saveVote(null);
      return;
    }

    // If switching vote
    if (userVote) {
      if (userVote === 'helpful') {
        setHelpfulCount((prev) => Math.max(0, prev - 1));
      } else {
        setNotHelpfulCount((prev) => Math.max(0, prev - 1));
      }
    }

    // Add new vote
    if (voteType === 'helpful') {
      setHelpfulCount((prev) => prev + 1);
    } else {
      setNotHelpfulCount((prev) => prev + 1);
    }

    setUserVote(voteType);
    saveVote(voteType);
  };

  const totalVotes = helpfulCount + notHelpfulCount;
  const helpfulPercentage = totalVotes > 0 ? Math.round((helpfulCount / totalVotes) * 100) : 0;

  return (
    <div className="space-y-2">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Was this review helpful?
      </p>

      <div className="flex items-center gap-3">
        {/* Helpful button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleVote('helpful')}
          className={clsx(
            'flex items-center gap-2 px-4 py-2 rounded-lg border transition-all',
            userVote === 'helpful'
              ? 'bg-green-50 dark:bg-green-900/20 border-green-500 text-green-700 dark:text-green-300'
              : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-green-500 hover:text-green-700 dark:hover:text-green-300'
          )}
        >
          <ThumbsUp
            className={clsx(
              'w-4 h-4',
              userVote === 'helpful' && 'fill-current'
            )}
          />
          <span className="text-sm font-medium">{helpfulCount}</span>
        </motion.button>

        {/* Not helpful button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleVote('not-helpful')}
          className={clsx(
            'flex items-center gap-2 px-4 py-2 rounded-lg border transition-all',
            userVote === 'not-helpful'
              ? 'bg-red-50 dark:bg-red-900/20 border-red-500 text-red-700 dark:text-red-300'
              : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-red-500 hover:text-red-700 dark:hover:text-red-300'
          )}
        >
          <ThumbsDown
            className={clsx(
              'w-4 h-4',
              userVote === 'not-helpful' && 'fill-current'
            )}
          />
          <span className="text-sm font-medium">{notHelpfulCount}</span>
        </motion.button>
      </div>

      {/* Helpful count message */}
      {helpfulCount > 0 && (
        <p className="text-xs text-gray-500 dark:text-gray-500">
          {helpfulCount} {helpfulCount === 1 ? 'person' : 'people'} found this helpful
          {totalVotes > 0 && ` (${helpfulPercentage}%)`}
        </p>
      )}
    </div>
  );
}
