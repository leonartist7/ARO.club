import { useState } from 'react';
import { Star, Send, X, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';
import { Card, CardBody } from '../ui/Card';

export default function ReviewForm({
  experienceId,
  teacherId,
  experienceName,
  onSubmit,
  onCancel,
  isModal = false
}) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      setError('Please select a rating');
      return;
    }

    if (comment.trim().length < 10) {
      setError('Review must be at least 10 characters');
      return;
    }

    setError('');
    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Call parent submit handler
      if (onSubmit) {
        await onSubmit({
          experienceId,
          teacherId,
          rating,
          comment: comment.trim(),
          date: new Date().toISOString(),
        });
      }

      setSuccess(true);

      // Reset form and close after success
      setTimeout(() => {
        setRating(0);
        setComment('');
        setSuccess(false);
        if (onCancel) {
          onCancel();
        }
      }, 2000);
    } catch (err) {
      setError('Failed to submit review. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const FormContent = () => (
    <div>
      {/* Header (for inline form) */}
      {!isModal && (
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-display font-bold text-gray-900">
            Write a Review
          </h3>
          {onCancel && (
            <button
              onClick={onCancel}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          )}
        </div>
      )}

      {/* Success Message */}
      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2"
        >
          <CheckCircle className="w-5 h-5 text-green-500" />
          <p className="text-sm text-green-700 font-medium">
            Review submitted successfully!
          </p>
        </motion.div>
      )}

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2"
        >
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{error}</p>
        </motion.div>
      )}

      {/* Experience Name (for modal) */}
      {isModal && experienceName && (
        <p className="text-sm text-gray-600 mb-4">
          Reviewing: <span className="font-medium text-gray-900">{experienceName}</span>
        </p>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Star Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rating <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                disabled={loading || success}
                className="transition-transform hover:scale-110 disabled:cursor-not-allowed"
              >
                <Star
                  className={`w-8 h-8 transition-colors ${
                    star <= (hoverRating || rating)
                      ? 'fill-yellow-400 stroke-yellow-400'
                      : 'stroke-gray-300 hover:stroke-yellow-400'
                  }`}
                />
              </button>
            ))}
            {rating > 0 && (
              <span className="ml-2 text-sm font-medium text-gray-700">
                {rating === 1 && '1 star - Poor'}
                {rating === 2 && '2 stars - Fair'}
                {rating === 3 && '3 stars - Good'}
                {rating === 4 && '4 stars - Very Good'}
                {rating === 5 && '5 stars - Excellent'}
              </span>
            )}
          </div>
        </div>

        {/* Comment */}
        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
            Your Review <span className="text-red-500">*</span>
          </label>
          <textarea
            id="comment"
            rows={5}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={loading || success}
            placeholder="Share your experience with this language learning session..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none disabled:bg-gray-50 disabled:text-gray-500"
            maxLength={500}
          />
          <p className="mt-1 text-xs text-gray-500">
            {comment.length}/500 characters {comment.length >= 10 && `(${comment.split(' ').length} words)`}
          </p>
        </div>

        {/* Guidelines */}
        <div className="bg-gray-50 rounded-lg p-4 text-xs text-gray-600 space-y-1">
          <p className="font-medium text-gray-700 mb-2">Review Guidelines:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Be honest and constructive</li>
            <li>Focus on the language learning experience</li>
            <li>Mention specific details (venue, teaching style, etc.)</li>
            <li>Avoid personal attacks or inappropriate language</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={loading || success}
              className="flex-1"
            >
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            variant="primary"
            disabled={loading || success || rating === 0}
            loading={loading}
            icon={!loading && !success ? <Send className="w-4 h-4" /> : undefined}
            className="flex-1"
          >
            {success ? 'Submitted!' : 'Submit Review'}
          </Button>
        </div>
      </form>
    </div>
  );

  // Render as modal or inline
  if (isModal) {
    return (
      <>
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onCancel}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        />

        {/* Modal */}
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Card>
                <CardBody>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-display font-bold text-gray-900">
                      Write a Review
                    </h2>
                    <button
                      onClick={onCancel}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>
                  <FormContent />
                </CardBody>
              </Card>
            </motion.div>
          </div>
        </div>
      </>
    );
  }

  // Inline form
  return (
    <Card>
      <CardBody>
        <FormContent />
      </CardBody>
    </Card>
  );
}
