import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import { getAdminEventsPaged, ADMIN_PAGE_SIZE } from '../../lib/admin';
import { actionMeta } from '../../lib/auditMeta';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import Pager from '../../components/admin/Pager';
import { formatDateTime } from '../../utils/date';

const ACTION_OPTIONS = [
  { value: '', label: 'All actions' },
  { value: 'delete', label: 'Deleted' },
  { value: 'bulk_delete', label: 'Bulk deleted' },
  { value: 'update_status', label: 'Updated status' },
  { value: 'bulk_update_status', label: 'Bulk updated status' },
  { value: 'verify', label: 'Verified' },
  { value: 'unverify', label: 'Unverified' },
];

const TABLE_OPTIONS = [
  { value: '', label: 'All tables' },
  { value: 'experiences', label: 'Experiences' },
  { value: 'bookings', label: 'Bookings' },
  { value: 'reviews', label: 'Reviews' },
  { value: 'teachers', label: 'Teachers' },
];

function summarizeDetails(details) {
  if (!details || typeof details !== 'object') return '—';
  if (details.status) return `→ ${details.status}`;
  if (typeof details.count === 'number') return `${details.count} item${details.count === 1 ? '' : 's'}`;
  return JSON.stringify(details);
}

export default function AdminAuditPage() {
  const [events, setEvents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [action, setAction] = useState('');
  const [table, setTable] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async (p, a, t) => {
    setLoading(true);
    setError(null);
    const { data, count, error: err } = await getAdminEventsPaged(p, ADMIN_PAGE_SIZE, {
      action: a,
      table: t,
    });
    if (err) setError('Failed to load audit log.');
    else {
      setEvents(data ?? []);
      setTotal(count ?? 0);
    }
    setLoading(false);
  }, []);

  useEffect(() => { load(page, action, table); }, [load, page, action, table]);

  const onActionChange = (e) => { setPage(1); setAction(e.target.value); };
  const onTableChange = (e) => { setPage(1); setTable(e.target.value); };

  const totalPages = Math.ceil(total / ADMIN_PAGE_SIZE);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-gray-100">
          Audit Log <span className="text-gray-400 font-normal text-lg">({total})</span>
        </h1>
        <Button
          variant="ghost"
          size="sm"
          icon={<RefreshCw className="h-4 w-4" />}
          onClick={() => load(page, action, table)}
        >
          Refresh
        </Button>
      </div>

      <div className="flex flex-wrap gap-3">
        <Select value={action} onChange={onActionChange} options={ACTION_OPTIONS} wrapperClassName="w-48" />
        <Select value={table} onChange={onTableChange} options={TABLE_OPTIONS} wrapperClassName="w-48" />
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>
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
                  <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Admin</th>
                  <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Action</th>
                  <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Target</th>
                  <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Details</th>
                  <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">When</th>
                </tr>
              </thead>
              <tbody>
                {events.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                      No matching events
                    </td>
                  </tr>
                ) : events.map((ev) => {
                  const meta = actionMeta(ev.action);
                  const Icon = meta.icon;
                  return (
                    <tr key={ev.id} className="border-b border-gray-100 dark:border-gray-700/50 last:border-0">
                      <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
                        {ev.admin?.name ?? ev.admin?.email ?? 'Unknown'}
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1.5">
                          <Icon className={`h-4 w-4 ${meta.color}`} />
                          <span className="text-gray-700 dark:text-gray-300">{meta.label}</span>
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                        {ev.table_name}
                        {ev.record_id && (
                          <span className="text-gray-400 font-mono text-xs"> #{String(ev.record_id).slice(0, 8)}</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-500 dark:text-gray-400 max-w-xs truncate">
                        {summarizeDetails(ev.details)}
                      </td>
                      <td className="px-4 py-3 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                        {ev.created_at ? formatDateTime(ev.created_at) : '—'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <Pager
            page={page}
            totalPages={totalPages}
            onPrev={() => setPage((p) => p - 1)}
            onNext={() => setPage((p) => p + 1)}
          />
        </motion.div>
      )}
    </div>
  );
}
