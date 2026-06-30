import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, RefreshCw, Trash2 } from 'lucide-react';
import {
  getAllBookings,
  deleteBooking,
  bulkDeleteBookings,
  updateBookingStatus,
  logAdminEvent,
  ADMIN_PAGE_SIZE,
} from '../../lib/admin';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { formatDate } from '../../utils/date';
import { formatPrice } from '../../utils/helpers';

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
  const [deleteError, setDeleteError] = useState(null);
  const [updating, setUpdating] = useState(null);
  const [updateError, setUpdateError] = useState(null);
  const [selected, setSelected] = useState(new Set());
  const [bulkWorking, setBulkWorking] = useState(false);
  const [bulkError, setBulkError] = useState(null);

  const load = useCallback(async (p) => {
    setLoading(true);
    setError(null);
    setSelected(new Set());
    const { data, count, error: err } = await getAllBookings(p, ADMIN_PAGE_SIZE);
    if (err) {
      setError('Failed to load bookings.');
    } else {
      setBookings(data ?? []);
      setTotal(count ?? 0);
    }
    setLoading(false);
  }, []);

  useEffect(() => { load(page); }, [load, page]);

  const handleStatusChange = async (id, status) => {
    setUpdating(id);
    setUpdateError(null);
    const { error: err } = await updateBookingStatus(id, status);
    if (err) {
      setUpdateError(`Failed to update status: ${err.message}`);
    } else {
      setBookings((prev) =>
        prev.map((b) => b.id === id ? { ...b, status } : b)
      );
      logAdminEvent('update_status', 'bookings', id, { status });
    }
    setUpdating(null);
  };

  const handleDelete = async (id) => {
    setDeleteError(null);
    if (!window.confirm('Delete this booking? This cannot be undone.')) return;
    setDeleting(id);
    const { data, error: err } = await deleteBooking(id);
    if (err) {
      setDeleteError(`Failed to delete booking: ${err.message}`);
    } else if (!data?.length) {
      setDeleteError('Booking not found or already deleted.');
    } else {
      const isLastOnPage = bookings.length === 1;
      setBookings((prev) => prev.filter((b) => b.id !== id));
      setTotal((n) => n - 1);
      if (isLastOnPage && page > 1) setPage((p) => p - 1);
      logAdminEvent('delete', 'bookings', id);
    }
    setDeleting(null);
  };

  const allSelected = bookings.length > 0 && bookings.every((b) => selected.has(b.id));

  const toggleAll = () => {
    if (allSelected) {
      setSelected(new Set());
    } else {
      setSelected(new Set(bookings.map((b) => b.id)));
    }
  };

  const toggleOne = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleBulkDelete = async () => {
    const ids = [...selected];
    setBulkError(null);
    if (!window.confirm(`Delete ${ids.length} booking(s)? This cannot be undone.`)) return;
    setBulkWorking(true);
    const { data, error: err } = await bulkDeleteBookings(ids);
    if (err) {
      setBulkError(`Bulk delete failed: ${err.message}`);
    } else if (!data?.length) {
      setBulkError('No bookings were deleted (RLS may have blocked the action).');
    } else {
      const deleted = new Set(data.map((r) => r.id));
      setBookings((prev) => prev.filter((b) => !deleted.has(b.id)));
      setTotal((n) => Math.max(0, n - deleted.size));
      logAdminEvent('bulk_delete', 'bookings', null, { ids, count: deleted.size });
      setSelected(new Set());
    }
    setBulkWorking(false);
  };

  const totalPages = Math.ceil(total / ADMIN_PAGE_SIZE);

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

      {/* Bulk action bar */}
      {selected.size > 0 && (
        <div className="flex items-center gap-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg px-4 py-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {selected.size} selected
          </span>
          <Button
            size="sm"
            variant="danger"
            loading={bulkWorking}
            icon={<Trash2 className="h-3.5 w-3.5" />}
            onClick={handleBulkDelete}
          >
            Delete all
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setSelected(new Set())}>
            Clear
          </Button>
        </div>
      )}

      {updateError && (
        <p className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg px-4 py-2">
          {updateError}
        </p>
      )}
      {deleteError && (
        <p className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg px-4 py-2">
          {deleteError}
        </p>
      )}
      {bulkError && (
        <p className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg px-4 py-2">
          {bulkError}
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
                  <th className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={toggleAll}
                      className="rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                    />
                  </th>
                  <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Student</th>
                  <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Experience</th>
                  <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Amount</th>
                  <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Status</th>
                  <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Date</th>
                  <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Change</th>
                  <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center text-gray-400">
                      No bookings yet
                    </td>
                  </tr>
                ) : bookings.map((b) => (
                  <tr
                    key={b.id}
                    className={`border-b border-gray-100 dark:border-gray-700/50 last:border-0 ${
                      selected.has(b.id) ? 'bg-red-50/30 dark:bg-red-900/10' : ''
                    }`}
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selected.has(b.id)}
                        onChange={() => toggleOne(b.id)}
                        className="rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                      />
                    </td>
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
                      <Select
                        value={b.status}
                        disabled={updating === b.id}
                        onChange={(e) => handleStatusChange(b.id, e.target.value)}
                        className="text-xs py-1"
                        options={[
                          { value: 'pending',   label: 'Pending' },
                          { value: 'confirmed', label: 'Confirmed' },
                          { value: 'cancelled', label: 'Cancelled' },
                          { value: 'completed', label: 'Completed' },
                        ]}
                      />
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
