import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Clock,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Upload,
  Video,
  IdCard,
  FileText,
  Image as ImageIcon,
} from 'lucide-react';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { useAuth } from '../../contexts/AuthContext';
import {
  getMyApplication,
  getDocuments,
  uploadDocument,
  submitApplication,
  computeCompleteness,
  PORTFOLIO_REQUIREMENTS,
} from '../../lib/teacherApplications';

const STATUS_BANNER = {
  draft: { icon: Clock, variant: 'warning', title: 'Finish your application',
    body: 'Add your portfolio below, then submit for verification.' },
  submitted: { icon: Clock, variant: 'info', title: 'Application submitted',
    body: 'Our team is reviewing your profile. This usually takes under 48 hours.' },
  in_review: { icon: Clock, variant: 'info', title: 'Under review',
    body: 'A human is reviewing your application right now. Hang tight!' },
  changes_requested: { icon: RefreshCw, variant: 'warning', title: 'Changes requested',
    body: 'Please update the items below and resubmit.' },
  approved: { icon: CheckCircle2, variant: 'success', title: "You're verified! 🎉",
    body: 'You can now create experiences and start hosting.' },
  rejected: { icon: XCircle, variant: 'danger', title: 'Application not approved',
    body: 'See the reason below. You can re-apply after addressing the feedback.' },
};

const DOC_ICON = { intro_video: Video, id: IdCard, certification: FileText, portfolio_image: ImageIcon };

export default function TeacherApplicationStatus() {
  const { profile } = useAuth();
  const [application, setApplication] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadingType, setUploadingType] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const load = async () => {
    if (!profile?.id) return;
    setLoading(true);
    try {
      const app = await getMyApplication(profile.id);
      setApplication(app);
      if (app) setDocuments(await getDocuments(app.id));
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile?.id]);

  const handleUpload = async (docType, file, label) => {
    if (!file) return;
    setUploadingType(docType);
    setError(null);
    try {
      await uploadDocument({ userId: profile.id, applicationId: application.id, docType, file, label });
      setDocuments(await getDocuments(application.id));
    } catch (e) {
      setError(e.message || 'Upload failed');
    } finally {
      setUploadingType(null);
    }
  };

  const handleResubmit = async () => {
    setSubmitting(true);
    try {
      const updated = await submitApplication(application.id);
      setApplication(updated);
    } catch (e) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-12 text-center text-gray-400">Loading…</div>;

  if (!application) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-lg text-center">
        <ShieldCheck className="w-12 h-12 mx-auto text-secondary-500 mb-4" />
        <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-2">
          No application yet
        </h1>
        <p className="text-gray-500 mb-6">Start your teacher application to join Tonguee.</p>
        <Link to="/onboarding/teacher"><Button>Become a teacher</Button></Link>
      </div>
    );
  }

  const banner = STATUS_BANNER[application.status] || STATUS_BANNER.draft;
  const BannerIcon = banner.icon;
  const completeness = computeCompleteness(application, documents);
  const docTypes = new Set(documents.map((d) => d.doc_type));
  const canResubmit = ['draft', 'changes_requested'].includes(application.status);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-3xl">
      {/* Status banner */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="mb-6">
          <CardBody className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-secondary-100 dark:bg-secondary-900/30 flex items-center justify-center">
              <BannerIcon className="w-6 h-6 text-secondary-600 dark:text-secondary-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-display font-bold text-gray-900 dark:text-white">{banner.title}</h1>
                <Badge variant={banner.variant} size="sm">{application.status.replace('_', ' ')}</Badge>
              </div>
              <p className="text-gray-500 dark:text-gray-400 mt-1">{banner.body}</p>
              {application.decision_reason && ['changes_requested', 'rejected'].includes(application.status) && (
                <div className="mt-3 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 text-sm text-yellow-800 dark:text-yellow-300">
                  <strong>From our team:</strong> {application.decision_reason}
                </div>
              )}
              {application.status === 'approved' && (
                <Link to="/teacher/dashboard" className="inline-block mt-3">
                  <Button size="sm">Go to dashboard</Button>
                </Link>
              )}
            </div>
          </CardBody>
        </Card>
      </motion.div>

      {/* Completeness meter */}
      {canResubmit && (
        <Card className="mb-6">
          <CardBody>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Profile completeness</span>
              <span className="text-sm font-bold text-secondary-600">{completeness}%</span>
            </div>
            <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary-500 to-secondary-500"
                initial={{ width: 0 }}
                animate={{ width: `${completeness}%` }}
              />
            </div>
            {completeness < 100 && (
              <p className="text-xs text-gray-400 mt-2">Add your required portfolio items to stand out ✨</p>
            )}
          </CardBody>
        </Card>
      )}

      {/* Portfolio upload */}
      <Card className="mb-6">
        <CardHeader><h2 className="font-semibold text-gray-900 dark:text-white">Portfolio &amp; verification</h2></CardHeader>
        <CardBody className="space-y-3">
          {PORTFOLIO_REQUIREMENTS.map((req) => {
            const Icon = DOC_ICON[req.docType] || FileText;
            const uploaded = docTypes.has(req.docType);
            return (
              <div key={req.docType} className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
                <Icon className={`w-5 h-5 flex-shrink-0 ${uploaded ? 'text-green-500' : 'text-gray-400'}`} />
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {req.label} {req.required && <span className="text-red-400">*</span>}
                  </div>
                  {uploaded && <div className="text-xs text-green-600">Uploaded ✓</div>}
                </div>
                {canResubmit && (
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      className="hidden"
                      accept={req.docType === 'intro_video' ? 'video/*' : req.docType === 'portfolio_image' ? 'image/*' : 'image/*,application/pdf'}
                      onChange={(e) => handleUpload(req.docType, e.target.files?.[0], req.label)}
                    />
                    <span className="inline-flex items-center gap-1 text-sm px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <Upload className="w-4 h-4" />
                      {uploadingType === req.docType ? 'Uploading…' : uploaded ? 'Replace' : 'Upload'}
                    </span>
                  </label>
                )}
              </div>
            );
          })}
        </CardBody>
      </Card>

      {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

      {canResubmit && (
        <Button onClick={handleResubmit} loading={submitting} className="w-full"
          icon={<ShieldCheck className="w-4 h-4" />}>
          {application.status === 'changes_requested' ? 'Resubmit for review' : 'Submit for verification'}
        </Button>
      )}
    </div>
  );
}
