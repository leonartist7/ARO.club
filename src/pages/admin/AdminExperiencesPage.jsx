import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, RefreshCw, Search } from 'lucide-react';
import {
  getAllExperiences,
  updateExperienceStatus,
  bulkUpdateExperienceStatus,
  logAdminEvent,
  ADMIN_PAGE_SIZE,
} from '../../lib/admin';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import SortHeader from '../../components/admin/SortHeader';
import { formatDate } from '../../utils/date';
import { formatPrice } from '../../utils/helpers';

const STATUS_VARIANT = {
  published: 'success',
  draft: 'warning',
  cancelled: 'danger',
  completed: 'secondary',
};

const STATUS_OPTIONS = [
  { value: 'published', label: 'Published' },
  { value: 'draft',     label: 'Draft' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'completed', label: 'Completed' },
];

const STATUS_FILTER_OPTIONS = [{ value: '', label: 'All statuses' }, ...STATUS_OPTIONS];

export default function AdminExperiencesPage() {
  const [experiences, setExperiences] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(null);
  const [updateError, setUpdateError] = useState(null);
  const [selected, setSelected] = useState(new Set());
  const [bulkStatus, setBulkStatus] = useState('cancelled');
  const [bulkWorking, setBulkWorking] = useState(false);
  const [bulkError, setBulkError] = useState(null);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [asc, setAsc] = useState(false);

  const load = useCallback(async (p, opts) => {
    setLoading(true);
    setError(null);
    setSelected(new Set());
    const { data, count, error: err } = await getAllExperiences(p, ADMIN_PAGE_SIZE, opts);
    if (err) {
      setError('Failed to load experiences.');
    } else {
      setExperiences(data ?? []);
      setTotal(count ?? 0);
    }
    setLoading(false);
  }, []);

  // Debounce free-text search; reset to page 1 in the same batch.
  useEffect(() => {
    const t = setTimeout(() => {
      setPage(1);
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    load(page, { search: debouncedSearch, status: statusFilter, sortBy, asc });
  }, [load, page, debouncedSearch, statusFilter, sortBy, asc]);

  const handleSort = (col) => {
    setPage(1);
    if (sortBy === col) {
      setAsc((a) => !a);
    } else {
      setSortBy(col);
      setAsc(false);
    }
  };

  const handleStatusFilter = (e) => {
    setPage(1);
    setStatusFilter(e.target.value);
  };

  const currentOpts = { search: debouncedSearch, status: statusFilter, sortBy, asc };

  const changeStatus = async (id, status) => {
    setUpdating(id);
    setUpdateError(null);
    const { error: err } = await updateExperienceStatus(id, status);
    if (err) {
      setUpdateError(`Failed to update status: ${err.message}`);
    } else {
      setExperiences((prev) =>
        prev.map((e) => e.id === id ? { ...e, status } : e)
      );
      logAdminEvent('update_status', 'experiences', id, { status });
    }
    setUpdating(null);
  };

  const allSelected = experiences.length > 0 && experiences.every((e) => selected.has(e.id));

  const toggleAll = () => {
    if (allSelected) {
      setSelected(new Set());
    } else {
      setSelected(new Set(experiences.map((e) => e.id)));
    }
  };

  const toggleOne = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleBulkStatus = async () => {
    const ids = [...selected];
    if (!window.confirm(`Set ${ids.length} experience(s) to "${bulkStatus}"?`)) return;
    setBulkWorking(true);
    setBulkError(null);
    const { data, error: err } = await bulkUpdateExperienceStatus(ids, bulkStatus);
    if (err) {
      setBulkError(`Bulk update failed: ${err.message}`);
    } else if (!data?.length) {
      setBulkError('No experiences were updated (RLS may have blocked the action).');
    } else {
      setExperiences((prev) =>
        prev.map((e) => selected.has(e.id) ? { ...e, status: bulkStatus } : e)
      );
      logAdminEvent('bulk_update_status', 'experiences', null, {
        ids,
        status: bulkStatus,
        count: data.length,
      });
      setSelected(new Set());
    }
    setBulkWorking(false);
  };

  const totalPages = Math.ceil(total / ADMIN_PAGE_SIZE);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-gray-100">
          Experiences <span className="text-gray-400 font-normal text-lg">({total})</span>
        </h1>
        <Button
          variant="ghost"
          size="sm"
          icon={<RefreshCw className="h-4 w-4" />}
          onClick={() => load(page, currentOpts)}
        >
          Refresh
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <Input
          placeholder="Search by title or city…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          leftIcon={<Search className="h-4 w-4" />}
          wrapperClassName="max-w-xs flex-1"
        />
        <Select
          value={statusFilter}
          onChange={handleStatusFilter}
          options={STATUS_FILTER_OPTIONS}
          wrapperClassName="w-44"
        />
      </div>

      {/* Bulk action bar */}
      {selected.size > 0 && (
        <div className="flex items-center gap-3 bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg px-4 py-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {selected.size} selected
          </span>
          <Select
            value={bulkStatus}
            onChange={(e) => setBulkStatus(e.target.value)}
            options={STATUS_OPTIONS}
            wrapperClassName="w-36"
            className="text-xs py-1"
          />
          <Button size="sm" loading={bulkWorking} onClick={handleBulkStatus}>
            Apply to all
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
                  <SortHeader label="Title" col="title" sortBy={sortBy} asc={asc} onSort={handleSort} />
                  <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Teacher</th>
                  <SortHeader label="Price" col="price" sortBy={sortBy} asc={asc} onSort={handleSort} />
                  <SortHeader label="Date" col="date" sortBy={sortBy} asc={asc} onSort={handleSort} />
                  <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Status</th>
                  <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Change</th>
                </tr>
              </thead>
              <tbody>
                {experiences.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-gray-400">
                      No experiences yet
                    </td>
                  </tr>
                ) : experiences.map((exp) => (
                  <tr
                    key={exp.id}
                    className={`border-b border-gray-100 dark:border-gray-700/50 last:border-0 ${
                      selected.has(exp.id) ? 'bg-primary-50/50 dark:bg-primary-900/10' : ''
                    }`}
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selected.has(exp.id)}
                        onChange={() => toggleOne(exp.id)}
                        className="rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                      />
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100 max-w-xs truncate">
                      {exp.title}
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                      {exp.teacher?.name ?? '—'}
                    </td>
                    <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
                      {formatPrice(exp.price ?? 0)}
                    </td>
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      {exp.date ? formatDate(exp.date) : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={STATUS_VARIANT[exp.status] ?? 'default'} size="sm">
                        {exp.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Select
                        value={exp.status}
                        disabled={updating === exp.id}
                        onChange={(e) => changeStatus(exp.id, e.target.value)}
                        className="text-xs py-1"
                        options={STATUS_OPTIONS}
                      />
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
