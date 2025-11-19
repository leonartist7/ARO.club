import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  DollarSign,
  Calendar,
  Star,
  Plus,
  Edit2,
  Trash2,
  Eye,
  X,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Users,
  Clock,
  BookOpen,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Card, CardBody } from '../components/ui/Card';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Avatar from '../components/ui/Avatar';
import teachersData from '../data/teachers.json';
import experiencesData from '../data/experiences.json';
import reviewsData from '../data/reviews.json';
import { LANGUAGES, CITIES, SKILL_LEVELS, EXPERIENCE_TYPES } from '../data/constants';
import { formatDate } from '../utils/date';
import { formatPrice } from '../utils/helpers';
import { useStore } from '../store/useStore';
import { useLanguage } from '../contexts/LanguageContext';

export default function TeacherDashboardPage() {
  const { t } = useLanguage();
  const {
    isTeacher,
    teacherExperiences,
    addTeacherExperience,
    updateTeacherExperience,
    deleteTeacherExperience,
  } = useStore();

  // Mock current teacher (first teacher)
  const currentTeacher = teachersData[0];
  const mockIsTeacher = true; // For demo purposes

  const [activeTab, setActiveTab] = useState('upcoming');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingExperience, setEditingExperience] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    language: '',
    city: '',
    skillLevel: '',
    type: '',
    price: '',
    maxCapacity: 6,
    date: '',
    time: '',
    duration: 2,
    location: '',
  });

  // Combine JSON experiences with Zustand experiences
  const allExperiences = useMemo(() => {
    const jsonExperiences = experiencesData
      .filter((exp) => exp.teacherId === currentTeacher.id)
      .map((exp) => ({ ...exp, source: 'json' }));
    const zustandExperiences = teacherExperiences.map((exp) => ({
      ...exp,
      source: 'zustand',
      teacherId: currentTeacher.id,
      teacherName: currentTeacher.name,
      teacherPhoto: currentTeacher.photo,
      teacherRating: currentTeacher.rating,
      bookedSpots: 0,
      status: exp.status || 'draft',
    }));
    return [...jsonExperiences, ...zustandExperiences];
  }, [currentTeacher.id, teacherExperiences]);

  // Filter experiences by tab
  const upcomingExperiences = allExperiences.filter(
    (exp) => new Date(exp.date) > new Date() && exp.status !== 'draft'
  );
  const pastExperiences = allExperiences.filter(
    (exp) => new Date(exp.date) <= new Date() && exp.status !== 'draft'
  );
  const draftExperiences = allExperiences.filter((exp) => exp.status === 'draft');

  // Get teacher reviews
  const teacherReviews = reviewsData
    .filter((r) => r.teacherId === currentTeacher.id)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  // Calculate stats
  const totalEarnings = upcomingExperiences.reduce(
    (sum, exp) => sum + (exp.price || 0) * (exp.bookedSpots || 0),
    0
  );
  const totalSessions = currentTeacher.totalSessions;
  const avgRating = currentTeacher.rating;

  const tabs = [
    { id: 'upcoming', label: t('teacherDashboard.tabs.upcoming'), count: upcomingExperiences.length },
    { id: 'past', label: t('teacherDashboard.tabs.past'), count: pastExperiences.length },
    { id: 'drafts', label: t('teacherDashboard.tabs.drafts'), count: draftExperiences.length },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExperience = {
      ...formData,
      id: `custom-${Date.now()}`,
      price: parseFloat(formData.price),
      maxCapacity: parseInt(formData.maxCapacity),
      duration: parseFloat(formData.duration),
      status: 'draft',
      createdAt: new Date().toISOString(),
    };

    if (editingExperience) {
      updateTeacherExperience(editingExperience.id, newExperience);
    } else {
      addTeacherExperience(newExperience);
    }

    resetForm();
    setShowCreateModal(false);
  };

  const handleEdit = (experience) => {
    setEditingExperience(experience);
    setFormData({
      title: experience.title || '',
      description: experience.description || '',
      language: experience.language || '',
      city: experience.city || '',
      skillLevel: experience.skillLevel || '',
      type: experience.type || '',
      price: experience.price?.toString() || '',
      maxCapacity: experience.maxCapacity || 6,
      date: experience.date || '',
      time: experience.time || '',
      duration: experience.duration || 2,
      location: experience.location || '',
    });
    setShowCreateModal(true);
  };

  const handleDelete = (id) => {
    if (confirm(t('teacherDashboard.messages.deleteConfirm'))) {
      deleteTeacherExperience(id);
    }
  };

  const handlePublish = (id) => {
    updateTeacherExperience(id, { status: 'published' });
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      language: '',
      city: '',
      skillLevel: '',
      type: '',
      price: '',
      maxCapacity: 6,
      date: '',
      time: '',
      duration: 2,
      location: '',
    });
    setEditingExperience(null);
  };

  // Not a teacher check
  if (!mockIsTeacher && !isTeacher) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="max-w-md">
          <CardBody className="text-center py-12">
            <AlertCircle className="w-16 h-16 text-primary-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('teacherDashboard.accessOnly.title')}</h2>
            <p className="text-gray-600 mb-6">
              {t('teacherDashboard.accessOnly.message')}
            </p>
            <Link to="/for-teachers">
              <Button variant="primary">{t('teacherDashboard.accessOnly.button')}</Button>
            </Link>
          </CardBody>
        </Card>
      </div>
    );
  }

  const currentExperiences =
    activeTab === 'upcoming'
      ? upcomingExperiences
      : activeTab === 'past'
      ? pastExperiences
      : draftExperiences;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
              {t('teacherDashboard.title')}
            </h1>
            <p className="text-gray-600">
              {t('teacherDashboard.welcomeBack')}, {currentTeacher.name.split(' ')[0]}!
            </p>
          </div>
          <Button
            variant="primary"
            icon={<Plus className="w-5 h-5" />}
            onClick={() => {
              resetForm();
              setShowCreateModal(true);
            }}
          >
            {t('teacherDashboard.createExperience')}
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{t('teacherDashboard.stats.totalEarnings')}</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {formatPrice(totalEarnings)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{t('teacherDashboard.stats.fromUpcomingSessions')}</p>
                </div>
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-primary-500" />
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{t('teacherDashboard.stats.totalSessions')}</p>
                  <p className="text-3xl font-bold text-gray-900">{totalSessions}</p>
                  <p className="text-xs text-gray-500 mt-1">{t('teacherDashboard.stats.allTime')}</p>
                </div>
                <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-secondary-500" />
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{t('teacherDashboard.stats.averageRating')}</p>
                  <p className="text-3xl font-bold text-gray-900">{avgRating}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {t('teacherDashboard.stats.fromReviews').replace('{count}', teacherReviews.length)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* My Experiences Section */}
        <Card className="mb-8">
          <CardBody>
            <h2 className="text-xl font-bold text-gray-900 mb-6">{t('teacherDashboard.myExperiences')}</h2>

            {/* Tabs */}
            <div className="flex overflow-x-auto border-b border-gray-200 mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>

            {/* Experiences List */}
            {currentExperiences.length > 0 ? (
              <div className="space-y-4">
                {currentExperiences.map((experience) => {
                  const language = LANGUAGES.find((l) => l.code === experience.language);
                  const city = CITIES.find((c) => c.id === experience.city);
                  const canEdit = experience.source === 'zustand';

                  return (
                    <div
                      key={experience.id}
                      className="flex flex-col sm:flex-row items-start gap-4 p-4 border border-gray-200 rounded-lg hover:border-primary-200 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {experience.title}
                          </h3>
                          {experience.status === 'draft' && (
                            <Badge variant="secondary" size="sm">
                              {t('teacherDashboard.status.draft')}
                            </Badge>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-2">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(experience.date)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {experience.time}
                          </span>
                          <span>
                            {language?.flag} {language?.name}
                          </span>
                          <span>
                            {city?.flag} {city?.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="font-medium text-gray-900">
                            {formatPrice(experience.price)}
                          </span>
                          <span className="text-gray-500">
                            {t('teacherDashboard.experienceInfo.booked')
                              .replace('{booked}', experience.bookedSpots || 0)
                              .replace('{capacity}', experience.maxCapacity)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {experience.source === 'json' && (
                          <Link to={`/experience/${experience.id}`}>
                            <Button variant="outline" size="sm" icon={<Eye className="w-4 h-4" />}>
                              {t('teacherDashboard.actions.view')}
                            </Button>
                          </Link>
                        )}
                        {canEdit && experience.status === 'draft' && (
                          <Button
                            variant="primary"
                            size="sm"
                            icon={<CheckCircle className="w-4 h-4" />}
                            onClick={() => handlePublish(experience.id)}
                          >
                            {t('teacherDashboard.actions.publish')}
                          </Button>
                        )}
                        {canEdit && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              icon={<Edit2 className="w-4 h-4" />}
                              onClick={() => handleEdit(experience)}
                            >
                              {t('teacherDashboard.actions.edit')}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              icon={<Trash2 className="w-4 h-4" />}
                              onClick={() => handleDelete(experience.id)}
                              className="text-red-600 hover:text-red-700 hover:border-red-300"
                            >
                              {t('teacherDashboard.actions.delete')}
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">
                  {t('teacherDashboard.messages.noExperiences').replace('{tab}', tabs.find(tab => tab.id === activeTab)?.label.toLowerCase() || activeTab)}
                  {activeTab === 'drafts' && t('teacherDashboard.messages.createToStart')}
                </p>
                {activeTab === 'drafts' && (
                  <Button
                    variant="primary"
                    onClick={() => {
                      resetForm();
                      setShowCreateModal(true);
                    }}
                  >
                    {t('teacherDashboard.createExperience')}
                  </Button>
                )}
              </div>
            )}
          </CardBody>
        </Card>

        {/* Recent Reviews */}
        <Card>
          <CardBody>
            <h2 className="text-xl font-bold text-gray-900 mb-6">{t('teacherDashboard.recentReviews')}</h2>
            {teacherReviews.length > 0 ? (
              <div className="space-y-4">
                {teacherReviews.slice(0, 5).map((review) => (
                  <div key={review.id} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0">
                    <Avatar
                      src={review.studentPhoto}
                      alt={review.studentName}
                      name={review.studentName}
                      size="md"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-gray-900">{review.studentName}</p>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? 'fill-yellow-400 stroke-yellow-400'
                                  : 'stroke-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">
                        {formatDate(review.date)}
                      </p>
                      <p className="text-gray-700 text-sm">{review.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Star className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">{t('teacherDashboard.messages.noReviews')}</p>
              </div>
            )}
          </CardBody>
        </Card>
      </div>

      {/* Create/Edit Experience Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingExperience ? t('teacherDashboard.modal.editTitle') : t('teacherDashboard.modal.createTitle')}
              </h2>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  resetForm();
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('teacherDashboard.modal.titleLabel')} {t('teacherDashboard.modal.required')}
                </label>
                <Input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder={t('teacherDashboard.modal.titlePlaceholder')}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('teacherDashboard.modal.descriptionLabel')} {t('teacherDashboard.modal.required')}
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder={t('teacherDashboard.modal.descriptionPlaceholder')}
                  rows={4}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('teacherDashboard.modal.languageLabel')} {t('teacherDashboard.modal.required')}
                  </label>
                  <Select
                    value={formData.language}
                    onChange={(e) => handleInputChange('language', e.target.value)}
                    required
                  >
                    <option value="">{t('teacherDashboard.modal.languageSelect')}</option>
                    {LANGUAGES.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.flag} {lang.name}
                      </option>
                    ))}
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('teacherDashboard.modal.cityLabel')} {t('teacherDashboard.modal.required')}
                  </label>
                  <Select
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    required
                  >
                    <option value="">{t('teacherDashboard.modal.citySelect')}</option>
                    {CITIES.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.flag} {city.name}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('teacherDashboard.modal.skillLevelLabel')} {t('teacherDashboard.modal.required')}
                  </label>
                  <Select
                    value={formData.skillLevel}
                    onChange={(e) => handleInputChange('skillLevel', e.target.value)}
                    required
                  >
                    <option value="">{t('teacherDashboard.modal.skillLevelSelect')}</option>
                    {SKILL_LEVELS.map((level) => (
                      <option key={level.value} value={level.value}>
                        {level.label}
                      </option>
                    ))}
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('teacherDashboard.modal.typeLabel')} {t('teacherDashboard.modal.required')}
                  </label>
                  <Select
                    value={formData.type}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    required
                  >
                    <option value="">{t('teacherDashboard.modal.typeSelect')}</option>
                    {EXPERIENCE_TYPES.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.icon} {type.label}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('teacherDashboard.modal.priceLabel')} {t('teacherDashboard.modal.required')}
                  </label>
                  <Input
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    placeholder="25"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('teacherDashboard.modal.maxCapacityLabel')} {t('teacherDashboard.modal.required')}
                  </label>
                  <Input
                    type="number"
                    value={formData.maxCapacity}
                    onChange={(e) => handleInputChange('maxCapacity', e.target.value)}
                    placeholder="6"
                    min="1"
                    max="20"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('teacherDashboard.modal.durationLabel')} {t('teacherDashboard.modal.required')}
                  </label>
                  <Input
                    type="number"
                    value={formData.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                    placeholder="2"
                    min="0.5"
                    step="0.5"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('teacherDashboard.modal.dateLabel')} {t('teacherDashboard.modal.required')}
                  </label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('teacherDashboard.modal.timeLabel')} {t('teacherDashboard.modal.required')}
                  </label>
                  <Input
                    type="time"
                    value={formData.time}
                    onChange={(e) => handleInputChange('time', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('teacherDashboard.modal.locationLabel')} {t('teacherDashboard.modal.required')}
                </label>
                <Input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder={t('teacherDashboard.modal.locationPlaceholder')}
                  required
                />
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowCreateModal(false);
                    resetForm();
                  }}
                  className="flex-1"
                >
                  {t('teacherDashboard.actions.cancel')}
                </Button>
                <Button type="submit" variant="primary" className="flex-1">
                  {editingExperience ? t('teacherDashboard.modal.updateButton') : t('teacherDashboard.modal.createButton')}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
