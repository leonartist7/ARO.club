import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Clock,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Inbox,
  ChevronRight,
} from 'lucide-react';
import { Card, CardBody } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { listApplications, getAdminStats, APPLICATION_STATUSES } from '../../lib/admin';

const STATUS_META = {
  submitted: { label: 'New', variant: 'info', icon: Inbox },
  in_review: { label: 'In Review', variant: 'warning', icon: Clock },
  changes_requested: { label: 'Changes Requested', variant: 'secondary', icon: RefreshCw },
  approved: { label: 'Approved', variant: 'success', icon: CheckCircle2 },
  rejected: { label: 'Rejected', variant: 'danger', icon: XCircle },
};

function StatCard({ label, value, icon: Icon, accent }) {
  return (
    <Card hover className="flex-1 min-w-[150px]">
      <CardBody className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${accent}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <div className="text-2xl font-display font-bold text-gray-900 dark:text-white">{value}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
        </div>
      </CardBody>
    </Card>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [filter, setFilter] = useState('submitted');
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async (status) => {
    setLoading(true);
    setError(null);
    try {
      const [s, list] = await Promise.all([getAdminStats(), listApplications({ status })]);
      setStats(s);
      setApps(list);
    } catch (e) {
      setError(e.message || 'Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(filter);
  }, [filter]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-6xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <ShieldCheck className="w-8 h-8 text-secondary-500" />
        <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white">
          Trust &amp; Quality
        </h1>
      </div>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        Every teacher is hand-verified before they can go live. Review applications, score them, and
        approve, request changes, or reject.
      </p>

      {/* Stats */}
      <div className="flex flex-wrap gap-4 mb-8">
        <StatCard label="Awaiting review" value={stats?.pendingReview ?? '—'} icon={Inbox}
          accent="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" />
        <StatCard label="In review" value={stats?.in_review ?? '—'} icon={Clock}
          accent="bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400" />
        <StatCard label="Approved" value={stats?.approved ?? '—'} icon={CheckCircle2}
          accent="bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" />
        <StatCard label="Rejected" value={stats?.rejected ?? '—'} icon={XCircle}
          accent="bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" />
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {['submitted', 'in_review', 'changes_requested', 'approved', 'rejected', 'all'].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filter === s
                ? 'bg-secondary-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            {s === 'all' ? 'All' : STATUS_META[s]?.label || s}
          </button>
        ))}
      </div>

      {/* Queue */}
      <Card>
        <CardBody className="p-0">
          {loading ? (
            <div className="p-10 text-center text-gray-400">Loading…</div>
          ) : error ? (
            <div className="p-10 text-center text-red-500">{error}</div>
          ) : apps.length === 0 ? (
            <div className="p-12 text-center">
              <Inbox className="w-10 h-10 mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500 dark:text-gray-400">Nothing here right now.</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100 dark:divide-gray-700">
              {apps.map((app, i) => {
                const meta = STATUS_META[app.status] || {};
                return (
                  <motion.li
                    key={app.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                  >
                    <Link
                      to={`/admin/applications/${app.id}`}
                      className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white font-bold">
                        {(app.display_name || app.profile?.name || '?').charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-gray-900 dark:text-white truncate">
                          {app.display_name || app.profile?.name || 'Unnamed applicant'}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                          {app.headline || app.profile?.email || '—'}
                        </div>
                      </div>
                      <div className="hidden sm:flex flex-wrap gap-1 max-w-[180px] justify-end">
                        {(app.languages || []).slice(0, 3).map((l) => (
                          <Badge key={l.code} size="sm" variant="default">{l.name || l.code}</Badge>
                        ))}
                      </div>
                      {meta.label && <Badge variant={meta.variant} size="sm">{meta.label}</Badge>}
                      <ChevronRight className="w-5 h-5 text-gray-300 flex-shrink-0" />
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
