import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, RefreshCw, ShieldCheck, ShieldOff } from 'lucide-react';
import {
  getAllTeachers,
  updateTeacherVerified,
  logAdminEvent,
  ADMIN_PAGE_SIZE,
} from '../../lib/admin';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { formatDate } from '../../utils/date';

export default function AdminTeachersPage() {
  const [teachers, setTeachers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toggling, setToggling] = useState(null);
  const [toggleError, setToggleError] = useState(null);

  const load = useCallback(async (p) => {
    setLoading(true);
    setError(null);
    const { data, count, error: err } = await getAllTeachers(p, ADMIN_PAGE_SIZE);
    if (err) {
      setError('Failed to load teachers.');
    } else {
      setTeachers(data ?? []);
      setTotal(count ?? 0);
    }
    setLoading(false);
  }, []);

  useEffect(() => { load(page); }, [load, page]);

  const toggleVerified = async (teacher) => {
    setToggling(teacher.id);
    setToggleError(null);
    const next = !teacher.verified;
    const { error: err } = await updateTeacherVerified(teacher.id, next);
    if (err) {
      setToggleError(`Failed to update ${teacher.name}: ${err.message}`);
    } else {
      setTeachers((prev) =>
        prev.map((t) => t.id === teacher.id ? { ...t, verified: next } : t)
      );
      logAdminEvent(next ? 'verify' : 'unverify', 'teachers', teacher.id);
    }
    setToggling(null);
  };

  const totalPages = Math.ceil(total / ADMIN_PAGE_SIZE);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-gray-100">
          Teachers <span className="text-gray-400 font-normal text-lg">({total})</span>
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

      {toggleError && (
        <p className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg px-4 py-2">
          {toggleError}
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
                  <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Name</th>
                  <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Email</th>
                  <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Languages</th>
                  <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Status</th>
                  <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Joined</th>
                  <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {teachers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                      No teachers yet
                    </td>
                  </tr>
                ) : teachers.map((t) => (
                  <tr
                    key={t.id}
                    className="border-b border-gray-100 dark:border-gray-700/50 last:border-0"
                  >
                    <td className="px-4 py-3 font-medium">
                      <Link
                        to={`/admin/teachers/${t.id}`}
                        className="text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400 hover:underline"
                      >
                        {t.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{t.email}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                      {Array.isArray(t.languages) && t.languages.length > 0
                        ? t.languages.map((l) => l.name ?? l.code ?? l).join(', ')
                        : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={t.verified ? 'success' : 'warning'} size="sm">
                        {t.verified ? 'Verified' : 'Pending'}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      {t.created_at ? formatDate(t.created_at) : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <Button
                        size="sm"
                        variant={t.verified ? 'danger' : 'outline'}
                        loading={toggling === t.id}
                        icon={
                          t.verified
                            ? <ShieldOff className="h-3.5 w-3.5" />
                            : <ShieldCheck className="h-3.5 w-3.5" />
                        }
                        onClick={() => toggleVerified(t)}
                      >
                        {t.verified ? 'Unverify' : 'Verify'}
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
