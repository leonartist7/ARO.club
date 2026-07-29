import { useCallback, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Star } from 'lucide-react';
import {
  getUserById,
  getBookingsByStudent,
  getReviewsByStudent,
} from '../../lib/admin';
import { usePagedList } from './usePagedList';
import Avatar from '../../components/ui/Avatar';
import Badge from '../../components/ui/Badge';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import Pager from '../../components/admin/Pager';
import { formatDate } from '../../utils/date';
import { formatPrice } from '../../utils/helpers';

const BOOKING_STATUS_VARIANT = {
  confirmed: 'success',
  pending: 'warning',
  cancelled: 'danger',
  completed: 'secondary',
};

function Stars({ rating }) {
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

export default function AdminUserDetailPage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    getUserById(id).then(({ data, error: err }) => {
      if (cancelled) return;
      if (err) setError('Failed to load user.');
      else setUser(data);
      setLoading(false);
    });
    return () => { cancelled = true; };
  }, [id]);

  const fetchBookings = useCallback((p) => getBookingsByStudent(id, p), [id]);
  const fetchReviews = useCallback((p) => getReviewsByStudent(id, p), [id]);
  const bookings = usePagedList(fetchBookings);
  const reviews = usePagedList(fetchReviews);

  return (
    <div className="space-y-6">
      <Link
        to="/admin/users"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to users
      </Link>

      {loading ? (
        <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>
      ) : error ? (
        <div className="text-center py-20 text-red-500">{error}</div>
      ) : !user ? (
        <div className="text-center py-20 text-gray-400">User not found.</div>
      ) : (
        <>
          {/* Profile header */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col sm:flex-row sm:items-center gap-4"
          >
            <Avatar src={user.photo} name={user.name} size="xl" />
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-gray-100">
                {user.name}
              </h1>
              <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
              {user.bio && (
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 max-w-prose">{user.bio}</p>
              )}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {user.is_admin && <Badge variant="danger" size="sm">Admin</Badge>}
                {user.is_teacher && <Badge variant="secondary" size="sm">Teacher</Badge>}
                {!user.is_admin && !user.is_teacher && <Badge variant="default" size="sm">Student</Badge>}
              </div>
            </div>
            <div className="flex gap-6 sm:gap-4 sm:flex-col sm:text-right">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Points</p>
                <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  {(user.points ?? 0).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Level</p>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {user.level_name ?? `Level ${user.level ?? 1}`}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Joined</p>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {user.created_at ? formatDate(user.created_at) : '—'}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Bookings */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Bookings <span className="text-gray-400 font-normal text-sm">({bookings.total})</span>
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              {bookings.loading ? (
                <div className="flex justify-center py-12"><LoadingSpinner /></div>
              ) : bookings.error ? (
                <div className="text-center py-12 text-red-500">Failed to load bookings.</div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700 text-left">
                          <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Experience</th>
                          <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Amount</th>
                          <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Status</th>
                          <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookings.data.length === 0 ? (
                          <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-400">No bookings</td></tr>
                        ) : bookings.data.map((b) => (
                          <tr key={b.id} className="border-b border-gray-100 dark:border-gray-700/50 last:border-0">
                            <td className="px-4 py-3 text-gray-900 dark:text-gray-100 max-w-xs truncate">{b.experience?.title ?? '—'}</td>
                            <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">{formatPrice(b.total_price ?? 0)}</td>
                            <td className="px-4 py-3"><Badge variant={BOOKING_STATUS_VARIANT[b.status] ?? 'default'} size="sm">{b.status}</Badge></td>
                            <td className="px-4 py-3 text-gray-500 dark:text-gray-400 whitespace-nowrap">{b.booking_date ? formatDate(b.booking_date) : '—'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <Pager
                    page={bookings.page}
                    totalPages={bookings.totalPages}
                    onPrev={() => bookings.setPage((p) => p - 1)}
                    onNext={() => bookings.setPage((p) => p + 1)}
                  />
                </>
              )}
            </div>
          </section>

          {/* Reviews */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Reviews <span className="text-gray-400 font-normal text-sm">({reviews.total})</span>
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              {reviews.loading ? (
                <div className="flex justify-center py-12"><LoadingSpinner /></div>
              ) : reviews.error ? (
                <div className="text-center py-12 text-red-500">Failed to load reviews.</div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700 text-left">
                          <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Experience</th>
                          <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Rating</th>
                          <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Comment</th>
                          <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reviews.data.length === 0 ? (
                          <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-400">No reviews</td></tr>
                        ) : reviews.data.map((r) => (
                          <tr key={r.id} className="border-b border-gray-100 dark:border-gray-700/50 last:border-0">
                            <td className="px-4 py-3 text-gray-900 dark:text-gray-100 max-w-xs truncate">{r.experience?.title ?? '—'}</td>
                            <td className="px-4 py-3"><Stars rating={r.rating} /></td>
                            <td className="px-4 py-3 text-gray-600 dark:text-gray-300 max-w-xs truncate">{r.comment}</td>
                            <td className="px-4 py-3 text-gray-500 dark:text-gray-400 whitespace-nowrap">{r.created_at ? formatDate(r.created_at) : '—'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <Pager
                    page={reviews.page}
                    totalPages={reviews.totalPages}
                    onPrev={() => reviews.setPage((p) => p - 1)}
                    onNext={() => reviews.setPage((p) => p + 1)}
                  />
                </>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
