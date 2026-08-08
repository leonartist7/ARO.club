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
import experiencesData from '../data/experiences';
import reviewsData from '../data/reviews.json';
import { LANGUAGES, CITIES, SKILL_LEVELS, EXPERIENCE_TYPES } from '../data/constants';
import { formatDate } from '../utils/date';
import { formatPrice } from '../utils/helpers';
import { usePlayerStore } from '../store/usePlayerStore';

export default function TeacherDashboardPage() {
  // The signed-in teacher, plus the listings they've authored - both from the
  // persisted player store, so this is their dashboard rather than the first
  // seed teacher's.
  const player = usePlayerStore((state) => state.user);
  const teacherLanguages = usePlayerStore((state) => state.languages);
  const specialties = usePlayerStore((state) => state.interests);
  const teacherExperiences = usePlayerStore((state) => state.createdExperiences);
  const addTeacherExperience = usePlayerStore((state) => state.createExperience);
  const updateTeacherExperience = usePlayerStore((state) => state.updateExperience);
  const deleteTeacherExperience = usePlayerStore((state) => state.deleteExperience);

  const currentTeacher = {
    id: player?.id ?? 'me',
    name: player?.name ?? 'Teacher',
    photo: player?.photo,
    bio: player?.bio,
    rating: null,
    totalSessions: 0,
    languages: teacherLanguages,
    specialties,
  };

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
    { id: 'upcoming', label: 'Upcoming', count: upcomingExperiences.length },
    { id: 'past', label: 'Past', count: pastExperiences.length },
    { id: 'drafts', label: 'Drafts', count: draftExperiences.length },
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
    if (confirm('Are you sure you want to delete this experience?')) {
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
  if (player && player.role !== 'teacher') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Card className="max-w-md">
          <CardBody className="text-center py-12">
            <AlertCircle className="w-16 h-16 text-primary-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2 dark:text-white">Teacher Access Only</h2>
            <p className="text-gray-600 mb-6 dark:text-gray-400">
              This dashboard is only accessible to registered teachers.
            </p>
            <Link to="/for-teachers">
              <Button variant="primary">Become a Teacher</Button>
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
      className="min-h-screen bg-gray-50 dark:bg-gray-900"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-gray-900 mb-2 dark:text-white">
              Teacher Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Welcome back, {currentTeacher.name.split(' ')[0]}!
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
            Create Experience
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1 dark:text-gray-400">Total Earnings</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {formatPrice(totalEarnings)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 dark:text-gray-400">From upcoming sessions</p>
                </div>
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center dark:bg-primary-900/40">
                  <DollarSign className="w-6 h-6 text-primary-500" />
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1 dark:text-gray-400">Total Sessions</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalSessions}</p>
                  <p className="text-xs text-gray-500 mt-1 dark:text-gray-400">All time</p>
                </div>
                <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center dark:bg-secondary-900/40">
                  <Calendar className="w-6 h-6 text-secondary-500" />
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1 dark:text-gray-400">Average Rating</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {avgRating ?? '—'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 dark:text-gray-400">
                    {teacherReviews.length > 0
                      ? `From ${teacherReviews.length} reviews`
                      : 'No reviews yet'}
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center dark:bg-yellow-900/40">
                  <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* My Experiences Section */}
        <Card className="mb-8">
          <CardBody>
            <h2 className="text-xl font-bold text-gray-900 mb-6 dark:text-white">My Experiences</h2>

            {/* Tabs */}
            <div className="flex overflow-x-auto border-b border-gray-200 mb-6 dark:border-gray-700">
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
                      className="flex flex-col sm:flex-row items-start gap-4 p-4 border border-gray-200 rounded-lg hover:border-primary-200 hover:bg-gray-50 transition-colors dark:border-gray-700"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {experience.title}
                          </h3>
                          {experience.status === 'draft' && (
                            <Badge variant="secondary" size="sm">
                              Draft
                            </Badge>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-2 dark:text-gray-400">
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
                          <span className="font-medium text-gray-900 dark:text-white">
                            {formatPrice(experience.price)}
                          </span>
                          <span className="text-gray-500 dark:text-gray-400">
                            {experience.bookedSpots || 0} / {experience.maxCapacity} booked
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {experience.source === 'json' && (
                          <Link to={`/experience/${experience.id}`}>
                            <Button variant="outline" size="sm" icon={<Eye className="w-4 h-4" />}>
                              View
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
                            Publish
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
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              icon={<Trash2 className="w-4 h-4" />}
                              onClick={() => handleDelete(experience.id)}
                              className="text-red-600 hover:text-red-700 hover:border-red-300"
                            >
                              Delete
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
                <p className="text-gray-600 mb-4 dark:text-gray-400">
                  No {activeTab} experiences yet
                  {activeTab === 'drafts' && '. Create one to get started!'}
                </p>
                {activeTab === 'drafts' && (
                  <Button
                    variant="primary"
                    onClick={() => {
                      resetForm();
                      setShowCreateModal(true);
                    }}
                  >
                    Create Experience
                  </Button>
                )}
              </div>
            )}
          </CardBody>
        </Card>

        {/* Recent Reviews */}
        <Card>
          <CardBody>
            <h2 className="text-xl font-bold text-gray-900 mb-6 dark:text-white">Recent Reviews</h2>
            {teacherReviews.length > 0 ? (
              <div className="space-y-4">
                {teacherReviews.slice(0, 5).map((review) => (
                  <div key={review.id} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0 dark:border-gray-700">
                    <Avatar
                      src={review.studentPhoto}
                      alt={review.studentName}
                      name={review.studentName}
                      size="md"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-gray-900 dark:text-white">{review.studentName}</p>
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
                      <p className="text-sm text-gray-500 mb-2 dark:text-gray-400">
                        {formatDate(review.date)}
                      </p>
                      <p className="text-gray-700 text-sm dark:text-gray-300">{review.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Star className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 dark:text-gray-400">No reviews yet</p>
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
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto dark:bg-gray-800"
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between dark:bg-gray-800 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {editingExperience ? 'Edit Experience' : 'Create Experience'}
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
                <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
                  Experience Title *
                </label>
                <Input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="e.g., French Cooking Class in Montmartre"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe what students will learn and do..."
                  rows={4}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
                    Language *
                  </label>
                  <Select
                    value={formData.language}
                    onChange={(e) => handleInputChange('language', e.target.value)}
                    required
                  >
                    <option value="">Select language</option>
                    {LANGUAGES.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.flag} {lang.name}
                      </option>
                    ))}
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
                    City *
                  </label>
                  <Select
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    required
                  >
                    <option value="">Select city</option>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
                    Skill Level *
                  </label>
                  <Select
                    value={formData.skillLevel}
                    onChange={(e) => handleInputChange('skillLevel', e.target.value)}
                    required
                  >
                    <option value="">Select level</option>
                    {SKILL_LEVELS.map((level) => (
                      <option key={level.value} value={level.value}>
                        {level.label}
                      </option>
                    ))}
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
                    Experience Type *
                  </label>
                  <Select
                    value={formData.type}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    required
                  >
                    <option value="">Select type</option>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
                    Price (USD) *
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
                  <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
                    Max Capacity *
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
                  <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
                    Duration (hrs) *
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
                  <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
                    Date *
                  </label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
                    Time *
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
                <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
                  Location *
                </label>
                <Input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="e.g., 123 Main St, or Meet at Central Park entrance"
                  required
                />
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowCreateModal(false);
                    resetForm();
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary" className="flex-1">
                  {editingExperience ? 'Update Experience' : 'Create Experience'}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
