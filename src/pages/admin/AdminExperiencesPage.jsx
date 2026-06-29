import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react';
import { getAllExperiences, updateExperienceStatus } from '../../lib/admin';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { formatDate } from '../../utils/date';
import { formatPrice } from '../../utils/helpers';

const PAGE_SIZE = 20;
const STATUS_VARIANT = {
  published: 'success',
  draft: 'warning',
  cancelled: 'danger',
  completed: 'secondary',
};

export default function AdminExperiencesPage() {
  const [experiences, setExperiences] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(null);

  const load = useCallback(async (p = page) => {
    setLoading(true);
    setError(null);
    const { data, count, error: err } = await getAllExperiences(p, PAGE_SIZE);
    if (err) {
      setError('Failed to load experiences.');
    } else {
      setExperiences(data ?? []);
      setTotal(count ?? 0);
    }
    setLoading(false);
  }, [page]);

  useEffect(() => { load(); }, [load]);

  const changeStatus = async (id, status) => {
    setUpdating(id);
    const { error: err } = await updateExperienceStatus(id, status);
    if (!err) {
      setExperiences((prev) =>
        prev.map((e) => e.id === id ? { ...e, status } : e)
      );
    }
    setUpdating(null);
  };

  const totalPages = Math.ceil(total / PAGE_SIZE);

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
                  <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Title</th>
                  <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Teacher</th>
                  <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Price</th>
                  <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Date</th>
                  <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Status</th>
                  <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Change</th>
                </tr>
              </thead>
              <tbody>
                {experiences.map((exp) => (
                  <tr
                    key={exp.id}
                    className="border-b border-gray-100 dark:border-gray-700/50 last:border-0"
                  >
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
                        options={[
                          { value: 'published', label: 'Published' },
                          { value: 'draft', label: 'Draft' },
                          { value: 'cancelled', label: 'Cancelled' },
                          { value: 'completed', label: 'Completed' },
                        ]}
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
