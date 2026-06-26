import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  RefreshCw,
  FileText,
  Video,
  Image as ImageIcon,
  IdCard,
  ShieldCheck,
} from 'lucide-react';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { useAuth } from '../../contexts/AuthContext';
import {
  getApplicationDetail,
  startReview,
  approveApplication,
  rejectApplication,
  requestChanges,
  RUBRIC_CRITERIA,
  TIERS,
  DECISION_TEMPLATES,
} from '../../lib/admin';

const DOC_ICON = {
  intro_video: Video,
  id: IdCard,
  certification: FileText,
  portfolio_image: ImageIcon,
  sample_lesson: FileText,
};

function Stars({ value, onChange }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          className={`text-2xl leading-none transition-transform hover:scale-110 ${
            n <= value ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
          }`}
          aria-label={`${n} star${n > 1 ? 's' : ''}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

export default function ApplicationReview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { profile } = useAuth();
  const adminId = profile?.id;

  const [application, setApplication] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Decision state
  const [scores, setScores] = useState({});
  const [tier, setTier] = useState('verified');
  const [adminNotes, setAdminNotes] = useState('');
  const [reason, setReason] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const { application: app, documents: docs } = await getApplicationDetail(id);
      setApplication(app);
      setDocuments(docs);
      setScores(app.rubric_scores || {});
      setAdminNotes(app.admin_notes || '');
      if (app.status === 'submitted' && adminId) {
        const updated = await startReview(app, adminId);
        setApplication(updated);
      }
    } catch (e) {
      setError(e.message || 'Failed to load application');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const decided = application && ['approved', 'rejected'].includes(application.status);

  const handleApprove = async () => {
    setSubmitting(true);
    try {
      await approveApplication(application, { adminId, tier, rubricScores: scores, adminNotes });
      navigate('/admin');
    } catch (e) {
      setError(e.message || 'Failed to approve');
      setSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (!reason.trim()) return setError('Add a reason the applicant will see.');
    setSubmitting(true);
    try {
      await rejectApplication(application, { adminId, reason, adminNotes });
      navigate('/admin');
    } catch (e) {
      setError(e.message || 'Failed to reject');
      setSubmitting(false);
    }
  };

  const handleRequestChanges = async () => {
    if (!reason.trim()) return setError('Describe the changes the applicant should make.');
    setSubmitting(true);
    try {
      await requestChanges(application, { adminId, reason, adminNotes });
      navigate('/admin');
    } catch (e) {
      setError(e.message || 'Failed to request changes');
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-12 text-center text-gray-400">Loading application…</div>;
  if (error && !application) return <div className="p-12 text-center text-red-500">{error}</div>;
  if (!application) return null;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-6xl">
      <Link to="/admin" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to queue
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT: the applicant + portfolio */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardBody className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white text-2xl font-bold">
                {(application.display_name || application.profile?.name || '?').charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
                    {application.display_name || application.profile?.name || 'Unnamed'}
                  </h1>
                  <Badge variant="info" size="sm">{application.status.replace('_', ' ')}</Badge>
                </div>
                <p className="text-gray-500 dark:text-gray-400">{application.profile?.email}</p>
                {application.headline && (
                  <p className="mt-1 text-gray-700 dark:text-gray-300 italic">“{application.headline}”</p>
                )}
                <div className="flex flex-wrap gap-1 mt-3">
                  {(application.languages || []).map((l) => (
                    <Badge key={l.code} variant="primary" size="sm">
                      {l.name || l.code}{l.proficiency ? ` · ${l.proficiency}` : ''}
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {(application.experience_types || []).map((t) => (
                    <Badge key={t} variant="secondary" size="sm">{t}</Badge>
                  ))}
                </div>
                <div className="flex gap-2 mt-3 text-sm text-gray-500">
                  {application.teaches_in_person && <span>📍 In-person</span>}
                  {application.teaches_online && <span>💻 Online</span>}
                </div>
              </div>
            </CardBody>
          </Card>

          {application.bio && (
            <Card>
              <CardHeader><h2 className="font-semibold text-gray-900 dark:text-white">About</h2></CardHeader>
              <CardBody><p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{application.bio}</p></CardBody>
            </Card>
          )}

          <Card>
            <CardHeader>
              <h2 className="font-semibold text-gray-900 dark:text-white">Portfolio &amp; verification documents</h2>
            </CardHeader>
            <CardBody>
              {documents.length === 0 ? (
                <p className="text-gray-400 text-sm">No documents uploaded.</p>
              ) : (
                <ul className="space-y-3">
                  {documents.map((doc) => {
                    const Icon = DOC_ICON[doc.doc_type] || FileText;
                    return (
                      <li key={doc.id} className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
                        <Icon className="w-5 h-5 text-secondary-500 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{doc.label || doc.doc_type}</div>
                          <div className="text-xs text-gray-400">{doc.doc_type}</div>
                        </div>
                        <a href={doc.url} target="_blank" rel="noreferrer"
                          className="text-sm text-primary-500 hover:underline flex-shrink-0">
                          View
                        </a>
                      </li>
                    );
                  })}
                </ul>
              )}
            </CardBody>
          </Card>
        </div>

        {/* RIGHT: the decision panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-secondary-500" />
                <h2 className="font-semibold text-gray-900 dark:text-white">Review</h2>
              </div>
            </CardHeader>
            <CardBody className="space-y-4">
              {/* Rubric */}
              <div className="space-y-3">
                {RUBRIC_CRITERIA.map((c) => (
                  <div key={c.key} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700 dark:text-gray-300">{c.label}</span>
                    <Stars value={scores[c.key] || 0} onChange={(v) => setScores({ ...scores, [c.key]: v })} />
                  </div>
                ))}
              </div>

              {/* Tier (for approval) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tier (on approve)</label>
                <div className="flex flex-wrap gap-2">
                  {TIERS.map((t) => (
                    <button
                      key={t.value}
                      onClick={() => setTier(t.value)}
                      className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${
                        tier === t.value
                          ? 'border-secondary-500 bg-secondary-50 text-secondary-700 dark:bg-secondary-900/30 dark:text-secondary-300'
                          : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      {t.emoji} {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Internal notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Internal notes (private)</label>
                <textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>

              {/* Reason (shown to applicant on reject/changes) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message to applicant (reject / changes)</label>
                <div className="flex flex-wrap gap-1 mb-2">
                  {[...DECISION_TEMPLATES.changes_requested, ...DECISION_TEMPLATES.rejected].slice(0, 4).map((t) => (
                    <button key={t} onClick={() => setReason(t)}
                      className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200">
                      + {t.slice(0, 24)}…
                    </button>
                  ))}
                </div>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              {decided ? (
                <p className="text-sm text-gray-500 text-center py-2">
                  This application was already <strong>{application.status}</strong>.
                </p>
              ) : (
                <div className="space-y-2">
                  <Button onClick={handleApprove} loading={submitting} className="w-full"
                    icon={<CheckCircle2 className="w-4 h-4" />}>
                    Approve &amp; verify
                  </Button>
                  <Button onClick={handleRequestChanges} loading={submitting} variant="outline" className="w-full"
                    icon={<RefreshCw className="w-4 h-4" />}>
                    Request changes
                  </Button>
                  <Button onClick={handleReject} loading={submitting} variant="danger" className="w-full"
                    icon={<XCircle className="w-4 h-4" />}>
                    Reject
                  </Button>
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
