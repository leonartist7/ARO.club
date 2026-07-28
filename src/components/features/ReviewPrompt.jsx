import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Sparkles, X } from 'lucide-react';
import Button from '../ui/Button';
import { Card, CardBody } from '../ui/Card';
import { usePlayerStore } from '../../store/usePlayerStore';
import { getBadge } from '../../data/gamification';
import experiencesData from '../../data/experiences';

/**
 * "How was it?" - the step between attending an experience and earning from it.
 *
 * Nothing used to happen after a session's date passed, which left the whole
 * review side of the product inert: `reviewsWritten` never moved and the
 * review-master badge could not be earned by anyone. This appears on the
 * dashboard and profile whenever there's a past booking without a review.
 */
export default function ReviewPrompt({ className = '' }) {
  const reviewableBookings = usePlayerStore((state) => state.reviewableBookings);
  const submitReview = usePlayerStore((state) => state.submitReview);
  // Subscribing to both keeps this reactive as reviews are written.
  usePlayerStore((state) => state.reviews);
  usePlayerStore((state) => state.bookings);

  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState('');
  const [result, setResult] = useState(null);
  const [dismissed, setDismissed] = useState([]);

  const pending = reviewableBookings().filter(
    (booking) => !dismissed.includes(booking.experienceId)
  );
  const booking = pending[0];
  if (!booking) return null;

  const experience = experiencesData.find((exp) => exp.id === booking.experienceId);
  if (!experience) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!rating) return;

    const outcome = submitReview({
      experienceId: booking.experienceId,
      rating,
      comment,
    });

    if (outcome) {
      setResult(outcome);
      setRating(0);
      setComment('');
    }
  };

  return (
    <Card className={className}>
      <CardBody>
        <AnimatePresence mode="wait">
          {result ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-4"
            >
              <div className="text-4xl mb-3">🌟</div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                Thanks for the review!
              </h3>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5" />+{result.pointsGained} points
              </div>

              {result.badgesUnlocked?.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 mb-3">
                  {result.badgesUnlocked.map((badgeId) => {
                    const badge = getBadge(badgeId);
                    return (
                      <span
                        key={badgeId}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-100 dark:bg-secondary-900/30 text-secondary-800 dark:text-secondary-200 text-xs font-medium"
                      >
                        <span>{badge?.icon}</span>
                        {badge?.name}
                      </span>
                    );
                  })}
                </div>
              )}

              <Button variant="ghost" size="sm" onClick={() => setResult(null)}>
                Done
              </Button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleSubmit}
            >
              <div className="flex items-start justify-between gap-3 mb-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  How was it?
                </h3>
                <button
                  type="button"
                  onClick={() => setDismissed((prev) => [...prev, booking.experienceId])}
                  aria-label="Not now"
                  className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                You went to <span className="font-medium">{experience.title}</span>.
                Tell other learners what it was like.
              </p>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4" role="radiogroup" aria-label="Rating">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    role="radio"
                    aria-checked={rating === value}
                    aria-label={`${value} star${value > 1 ? 's' : ''}`}
                    onClick={() => setRating(value)}
                    onMouseEnter={() => setHovered(value)}
                    onMouseLeave={() => setHovered(0)}
                    className="p-1 transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        value <= (hovered || rating)
                          ? 'text-primary-500 fill-primary-500'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                    />
                  </button>
                ))}
              </div>

              <textarea
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                rows={3}
                placeholder="What stood out? (optional)"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 mb-4"
              />

              <Button type="submit" variant="primary" disabled={!rating} fullWidth>
                {rating ? 'Post review' : 'Pick a rating first'}
              </Button>
            </motion.form>
          )}
        </AnimatePresence>
      </CardBody>
    </Card>
  );
}
