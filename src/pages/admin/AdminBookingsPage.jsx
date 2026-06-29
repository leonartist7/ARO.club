import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, RefreshCw, Trash2 } from 'lucide-react';
import { getAllBookings, deleteBooking } from '../../lib/admin';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { formatDate } from '../../utils/date';
import { formatPrice } from '../../utils/helpers';

const PAGE_SIZE = 20;
const STATUS_VARIANT = {
  confirmed: 'success',
  pending: 'warning',
  cancelled: 'danger',
  completed: 'secondary',
};

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const load = useCallback(async (p = page) => {
    setLoading(true);
    setError(null);
    const { data, count, error: err } = await getAllBookings(p, PAGE_SIZE);
    if (err) {
      setError('Failed to load bookings.');
    } else {
      setBookings(data ?? []);
      setTotal(count ?? 0);
    }
    setLoading(false);
  }, [page]);

  useEffect(() => { load(); }, [load]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this booking? This cannot be undone.')) return;
    setDeleting(id);
    const { error: err } = await deleteBooking(id);
    if (!err) setBookings((prev) => prev.filter((b) => b.id !== id));
    setDeleting(null);
  };

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-gray-100">
          Bookings <span className="text-gray-400 font-normal text-lg">({total})</span>
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
                  <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Amount</th>
                  <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Status</th>
                  <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Date</th>
                  <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr
                    key={b.id}
                    className="border-b border-gray-100 dark:border-gray-700/50 last:border-0"
                  >
                    <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
                      {b.student?.name ?? b.student?.email ?? '—'}
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300 max-w-xs truncate">
                      {b.experience?.title ?? '—'}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">
                      {formatPrice(b.total_price ?? 0)}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={STATUS_VARIANT[b.status] ?? 'default'} size="sm">
                        {b.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      {b.booking_date ? formatDate(b.booking_date) : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <Button
                        size="sm"
                        variant="danger"
                        loading={deleting === b.id}
                        icon={<Trash2 className="h-3.5 w-3.5" />}
                        onClick={() => handleDelete(b.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
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
                  onClick={() => { setPage(page - 1); load(page - 1); }}
                />
                <Button
                  size="sm"
                  variant="ghost"
                  disabled={page >= totalPages}
                  icon={<ChevronRight className="h-4 w-4" />}
                  onClick={() => { setPage(page + 1); load(page + 1); }}
                />
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
