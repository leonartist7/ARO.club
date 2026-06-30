import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ShieldCheck, ShieldOff, RefreshCw, Search } from 'lucide-react';
import { getAllUsers, updateUserAdminFlag, ADMIN_PAGE_SIZE } from '../../lib/admin';
import Avatar from '../../components/ui/Avatar';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { formatDate } from '../../utils/date';

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toggling, setToggling] = useState(null);
  const [toggleError, setToggleError] = useState(null);

  const load = useCallback(async (p, q = '') => {
    setLoading(true);
    setError(null);
    const { data, count, error: err } = await getAllUsers(p, ADMIN_PAGE_SIZE, q);
    if (err) {
      setError('Failed to load users.');
    } else {
      setUsers(data ?? []);
      setTotal(count ?? 0);
    }
    setLoading(false);
  }, []);

  // Debounce search: reset page and update debouncedSearch in one batch
  useEffect(() => {
    const t = setTimeout(() => {
      setPage(1);
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => { load(page, debouncedSearch); }, [load, page, debouncedSearch]);

  const toggleAdmin = async (user) => {
    setToggling(user.id);
    setToggleError(null);
    const { error: err } = await updateUserAdminFlag(user.id, !user.is_admin);
    if (err) {
      setToggleError(`Failed to update ${user.name}: ${err.message}`);
    } else {
      setUsers((prev) =>
        prev.map((u) => u.id === user.id ? { ...u, is_admin: !u.is_admin } : u)
      );
    }
    setToggling(null);
  };

  const totalPages = Math.ceil(total / ADMIN_PAGE_SIZE);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-gray-100">
          Users <span className="text-gray-400 font-normal text-lg">({total})</span>
        </h1>
        <Button
          variant="ghost"
          size="sm"
          icon={<RefreshCw className="h-4 w-4" />}
          onClick={() => load(page, debouncedSearch)}
        >
          Refresh
        </Button>
      </div>

      <Input
        placeholder="Search by name or email…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        leftIcon={<Search className="h-4 w-4" />}
        wrapperClassName="max-w-sm"
      />

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
                  <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">User</th>
                  <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Email</th>
                  <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Role</th>
                  <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Points</th>
                  <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Joined</th>
                  <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                      {debouncedSearch ? 'No users match your search' : 'No users yet'}
                    </td>
                  </tr>
                ) : users.map((u) => (
                  <tr
                    key={u.id}
                    className="border-b border-gray-100 dark:border-gray-700/50 last:border-0"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Avatar src={u.photo} name={u.name} size="sm" />
                        <Link
                          to={`/admin/users/${u.id}`}
                          className="font-medium text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400 hover:underline"
                        >
                          {u.name}
                        </Link>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{u.email}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {u.is_admin && <Badge variant="danger" size="sm">Admin</Badge>}
                        {u.is_teacher && <Badge variant="secondary" size="sm">Teacher</Badge>}
                        {!u.is_admin && !u.is_teacher && (
                          <Badge variant="default" size="sm">Student</Badge>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                      {(u.points ?? 0).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      {u.created_at ? formatDate(u.created_at) : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <Button
                        size="sm"
                        variant={u.is_admin ? 'danger' : 'outline'}
                        loading={toggling === u.id}
                        icon={
                          u.is_admin
                            ? <ShieldOff className="h-3.5 w-3.5" />
                            : <ShieldCheck className="h-3.5 w-3.5" />
                        }
                        onClick={() => toggleAdmin(u)}
                      >
                        {u.is_admin ? 'Revoke admin' : 'Grant admin'}
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
