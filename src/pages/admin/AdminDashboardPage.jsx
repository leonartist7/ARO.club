import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, CalendarCheck, DollarSign, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  getAdminStats,
  getAllExperiences,
  getAllBookings,
} from '../../lib/admin';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { formatPrice } from '../../utils/helpers';
import { formatDate } from '../../utils/date';

const EXPERIENCE_STATUS_VARIANT = {
  published: 'success',
  draft: 'warning',
  cancelled: 'danger',
  completed: 'secondary',
};

const BOOKING_STATUS_VARIANT = {
  confirmed: 'success',
  pending: 'warning',
  cancelled: 'danger',
  completed: 'secondary',
};

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex items-center gap-4"
    >
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
      </div>
    </motion.div>
  );
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [experiences, setExperiences] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    const [statsRes, expRes, bookRes] = await Promise.all([
      getAdminStats(),
      getAllExperiences(1, 5),
      getAllBookings(1, 5),
    ]);

    if (statsRes.error || expRes.error || bookRes.error) {
      setError('Failed to load admin data. Make sure the admin migration has been run.');
    } else {
      setStats(statsRes.data);
      setExperiences(expRes.data ?? []);
      setBookings(bookRes.data ?? []);
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4 text-center">
        <p className="text-red-500 dark:text-red-400 max-w-md">{error}</p>
        <Button variant="outline" icon={<RefreshCw className="h-4 w-4" />} onClick={load}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-gray-100">
        Dashboard
      </h1>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          icon={Users}
          label="Total Users"
          value={stats.totalUsers.toLocaleString()}
          color="bg-primary-500"
        />
        <StatCard
          icon={BookOpen}
          label="Total Experiences"
          value={stats.totalExperiences.toLocaleString()}
          color="bg-secondary-500"
        />
        <StatCard
          icon={CalendarCheck}
          label="Total Bookings"
          value={stats.totalBookings.toLocaleString()}
          color="bg-purple-500"
        />
        <StatCard
          icon={DollarSign}
          label="Total Revenue"
          value={formatPrice(stats.totalRevenue)}
          color="bg-green-500"
        />
      </div>

      {/* Recent experiences */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Recent Experiences
          </h2>
          <Link
            to="/admin/experiences"
            className="text-sm text-primary-500 hover:underline"
          >
            View all
          </Link>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700 text-left">
                  <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Title</th>
                  <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Teacher</th>
                  <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Status</th>
                  <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Date</th>
                </tr>
              </thead>
              <tbody>
                {experiences.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-gray-400">
                      No experiences yet
                    </td>
                  </tr>
                ) : (
                  experiences.map((exp) => (
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
                      <td className="px-4 py-3">
                        <Badge variant={EXPERIENCE_STATUS_VARIANT[exp.status] ?? 'default'} size="sm">
                          {exp.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                        {exp.date ? formatDate(exp.date) : '—'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Recent bookings */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Recent Bookings
          </h2>
          <Link
            to="/admin/bookings"
            className="text-sm text-primary-500 hover:underline"
          >
            View all
          </Link>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700 text-left">
                  <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Student</th>
                  <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Experience</th>
                  <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Amount</th>
                  <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-gray-400">
                      No bookings yet
                    </td>
                  </tr>
                ) : (
                  bookings.map((b) => (
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
                        <Badge variant={BOOKING_STATUS_VARIANT[b.status] ?? 'default'} size="sm">
                          {b.status}
                        </Badge>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
