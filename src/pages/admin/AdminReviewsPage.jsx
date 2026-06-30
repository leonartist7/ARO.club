import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, RefreshCw, Star, Trash2 } from 'lucide-react';
import { getAllReviews, deleteReview, ADMIN_PAGE_SIZE } from '../../lib/admin';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { formatDate } from '../../utils/date';

function RatingStars({ rating }) {
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i < rating
              ? 'fill-yellow-400 stroke-yellow-400'
              : 'stroke-gray-300 dark:stroke-gray-600'
          }`}
        />
      ))}
    </span>
  );
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [deleteError, setDeleteError] = useState(null);

  const load = useCallback(async (p) => {
    setLoading(true);
    setError(null);
    const { data, count, error: err } = await getAllReviews(p, ADMIN_PAGE_SIZE);
    if (err) {
      setError('Failed to load reviews.');
    } else {
      setReviews(data ?? []);
      setTotal(count ?? 0);
    }
    setLoading(false);
  }, []);

  useEffect(() => { load(page); }, [load, page]);

  const handleDelete = async (id) => {
    setDeleteError(null);
    if (!window.confirm('Delete this review? This cannot be undone.')) return;
    setDeleting(id);
    const { data, error: err } = await deleteReview(id);
    if (err) {
      setDeleteError(`Failed to delete review: ${err.message}`);
    } else if (!data?.length) {
      setDeleteError('Review not found or already deleted.');
    } else {
      const isLastOnPage = reviews.length === 1;
      setReviews((prev) => prev.filter((r) => r.id !== id));
      setTotal((n) => n - 1);
      if (isLastOnPage && page > 1) setPage((p) => p - 1);
    }
    setDeleting(null);
  };

  const totalPages = Math.ceil(total / ADMIN_PAGE_SIZE);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-gray-100">
          Reviews <span className="text-gray-400 font-normal text-lg">({total})</span>
        </h1>
        <Button
          variant="ghost"
          size="sm"
          icon={<RefreshCw className="h-4 w-4" />}
          onClick={() => load(page)}
        >
          Refresh
        </Button>
      </div>

      {deleteError && (
        <p className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg px-4 py-2">
          {deleteError}
        </p>
      )}

      {loading ? (
        <div className="flex justify-center py-20">
          <LoadingSpinner size="lg" />
        </div>
      ) : error ? (
        <div className="text-center py-20 text-red-500">{error}</div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700 text-left">
                  <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Student</th>
                  <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Experience</th>
                  <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Rating</th>
                  <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Comment</th>
                  <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Date</th>
                  <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reviews.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                      No reviews yet
                    </td>
                  </tr>
                ) : (
                  reviews.map((r) => (
                    <tr
                      key={r.id}
                      className="border-b border-gray-100 dark:border-gray-700/50 last:border-0"
                    >
                      <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
                        {r.student_name ?? '—'}
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300 max-w-xs truncate">
                        {r.experience?.title ?? '—'}
                      </td>
                      <td className="px-4 py-3">
                        <RatingStars rating={r.rating} />
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300 max-w-xs truncate">
                        {r.comment}
                      </td>
                      <td className="px-4 py-3 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                        {r.created_at ? formatDate(r.created_at) : '—'}
                      </td>
                      <td className="px-4 py-3">
                        <Button
                          size="sm"
                          variant="danger"
                          loading={deleting === r.id}
                          icon={<Trash2 className="h-3.5 w-3.5" />}
                          onClick={() => handleDelete(r.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Page {page} of {totalPages}
              </p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  disabled={page <= 1}
                  icon={<ChevronLeft className="h-4 w-4" />}
                  onClick={() => setPage((p) => p - 1)}
                />
                <Button
                  size="sm"
                  variant="ghost"
                  disabled={page >= totalPages}
                  icon={<ChevronRight className="h-4 w-4" />}
                  onClick={() => setPage((p) => p + 1)}
                />
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
