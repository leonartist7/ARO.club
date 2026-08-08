import { useCallback, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShieldCheck, ShieldOff, Star } from 'lucide-react';
import {
  getTeacherById,
  getExperiencesByTeacher,
  updateTeacherVerified,
  logAdminEvent,
} from '../../lib/admin';
import { usePagedList } from './usePagedList';
import Avatar from '../../components/ui/Avatar';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import Pager from '../../components/admin/Pager';
import { formatDate } from '../../utils/date';
import { formatPrice } from '../../utils/helpers';

const EXPERIENCE_STATUS_VARIANT = {
  published: 'success',
  draft: 'warning',
  cancelled: 'danger',
  completed: 'secondary',
};

export default function AdminTeacherDetailPage() {
  const { id } = useParams();
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toggling, setToggling] = useState(false);
  const [toggleError, setToggleError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    getTeacherById(id).then(({ data, error: err }) => {
      if (cancelled) return;
      if (err) setError('Failed to load teacher.');
      else setTeacher(data);
      setLoading(false);
    });
    return () => { cancelled = true; };
  }, [id]);

  const fetchExperiences = useCallback((p) => getExperiencesByTeacher(id, p), [id]);
  const experiences = usePagedList(fetchExperiences);

  const toggleVerified = async () => {
    if (!teacher) return;
    setToggling(true);
    setToggleError(null);
    const next = !teacher.verified;
    const { error: err } = await updateTeacherVerified(teacher.id, next);
    if (err) {
      setToggleError(`Failed to update: ${err.message}`);
    } else {
      setTeacher((t) => ({ ...t, verified: next }));
      logAdminEvent(next ? 'verify' : 'unverify', 'teachers', teacher.id);
    }
    setToggling(false);
  };

  const languages = Array.isArray(teacher?.languages) ? teacher.languages : [];
  const specialties = Array.isArray(teacher?.specialties) ? teacher.specialties : [];

  return (
    <div className="space-y-6">
      <Link
        to="/admin/teachers"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to teachers
      </Link>

      {loading ? (
        <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>
      ) : error ? (
        <div className="text-center py-20 text-red-500">{error}</div>
      ) : !teacher ? (
        <div className="text-center py-20 text-gray-400">Teacher not found.</div>
      ) : (
        <>
          {toggleError && (
            <p className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg px-4 py-2">{toggleError}</p>
          )}

          {/* Profile header */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col sm:flex-row sm:items-start gap-4"
          >
            <Avatar src={teacher.photo} name={teacher.name} size="xl" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-gray-100">
                  {teacher.name}
                </h1>
                <Badge variant={teacher.verified ? 'success' : 'warning'} size="sm">
                  {teacher.verified ? 'Verified' : 'Pending'}
                </Badge>
              </div>
              <p className="text-gray-500 dark:text-gray-400">{teacher.email}</p>
              {teacher.tagline && (
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 italic">{teacher.tagline}</p>
              )}
              {teacher.bio && (
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 max-w-prose">{teacher.bio}</p>
              )}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {languages.map((l, i) => (
                  <Badge key={i} variant="default" size="sm">{l.name ?? l.code ?? l}</Badge>
                ))}
                {specialties.map((s, i) => (
                  <Badge key={`s-${i}`} variant="secondary" size="sm">{s}</Badge>
                ))}
              </div>
              <div className="flex items-center gap-4 mt-4 text-sm text-gray-600 dark:text-gray-300">
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 stroke-yellow-400" />
                  {Number(teacher.rating ?? 0).toFixed(1)} ({teacher.total_reviews ?? 0})
                </span>
                <span>{teacher.total_sessions ?? 0} sessions</span>
                {teacher.hourly_rate != null && <span>{formatPrice(teacher.hourly_rate)}/hr</span>}
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:items-end">
              <Button
                size="sm"
                variant={teacher.verified ? 'danger' : 'outline'}
                loading={toggling}
                icon={teacher.verified ? <ShieldOff className="h-3.5 w-3.5" /> : <ShieldCheck className="h-3.5 w-3.5" />}
                onClick={toggleVerified}
              >
                {teacher.verified ? 'Unverify' : 'Verify'}
              </Button>
              <p className="text-xs text-gray-400">
                Joined {teacher.created_at ? formatDate(teacher.created_at) : '—'}
              </p>
            </div>
          </motion.div>

          {/* Experiences */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Experiences <span className="text-gray-400 font-normal text-sm">({experiences.total})</span>
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              {experiences.loading ? (
                <div className="flex justify-center py-12"><LoadingSpinner /></div>
              ) : experiences.error ? (
                <div className="text-center py-12 text-red-500">Failed to load experiences.</div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700 text-left">
                          <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Title</th>
                          <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Language</th>
                          <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">City</th>
                          <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Price</th>
                          <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Status</th>
                          <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {experiences.data.length === 0 ? (
                          <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-400">No experiences</td></tr>
                        ) : experiences.data.map((exp) => (
                          <tr key={exp.id} className="border-b border-gray-100 dark:border-gray-700/50 last:border-0">
                            <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100 max-w-xs truncate">{exp.title}</td>
                            <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{exp.language}</td>
                            <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{exp.city}</td>
                            <td className="px-4 py-3 text-gray-900 dark:text-gray-100">{formatPrice(exp.price ?? 0)}</td>
                            <td className="px-4 py-3"><Badge variant={EXPERIENCE_STATUS_VARIANT[exp.status] ?? 'default'} size="sm">{exp.status}</Badge></td>
                            <td className="px-4 py-3 text-gray-500 dark:text-gray-400 whitespace-nowrap">{exp.date ? formatDate(exp.date) : '—'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <Pager
                    page={experiences.page}
                    totalPages={experiences.totalPages}
                    onPrev={() => experiences.setPage((p) => p - 1)}
                    onNext={() => experiences.setPage((p) => p + 1)}
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
