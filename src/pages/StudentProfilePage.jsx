import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Trophy,
  Target,
  Star,
  Calendar,
  MapPin,
  Users,
  MessageSquare,
  Edit2,
  BookOpen,
  Award,
  TrendingUp,
  Heart,
  Lock,
  CheckCircle2,
  Loader2,
} from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';
import { Card, CardBody } from '../components/ui/Card';
import ExperienceCard from '../components/features/ExperienceCard';
import TeacherCard from '../components/features/TeacherCard';
import ReviewPrompt from '../components/features/ReviewPrompt';
import experiencesData from '../data/experiences';
import teachersData from '../data/teachers.json';
import { LANGUAGES } from '../data/constants';
import { BADGES } from '../data/gamification';
import { formatDate } from '../utils/date';
import { usePlayerStore, usePlayerLevel } from '../store/usePlayerStore';
import { useFavorites } from '../hooks/useFavorites';

export default function StudentProfilePage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({ name: '', bio: '' });
  const updateUser = usePlayerStore((state) => state.updateUser);

  // The same store the header, dashboard and shop read, so this page can no
  // longer show a different person with different points.
  const player = usePlayerStore((state) => state.user);
  const points = usePlayerStore((state) => state.points);
  const earned = usePlayerStore((state) => state.badges);
  const playerLanguages = usePlayerStore((state) => state.languages);
  const bookings = usePlayerStore((state) => state.bookings);
  const playerStats = usePlayerStore((state) => state.stats);
  const level = usePlayerLevel();
  const { favorites } = useFavorites();

  const earnedBadges = BADGES.filter((badge) => earned.includes(badge.id));
  const lockedBadges = BADGES.filter((badge) => !earned.includes(badge.id));

  const stats = {
    totalExperiences: playerStats.experiencesBooked,
    citiesVisited: playerStats.citiesVisited,
    teachersMet: new Set(
      bookings
        .map((b) => experiencesData.find((exp) => exp.id === b.experienceId)?.teacherId)
        .filter(Boolean)
    ).size,
    reviewsWritten: playerStats.reviewsWritten,
  };

  // Languages picked during onboarding, with their flag/name metadata.
  const languagesLearning = playerLanguages
    .map((code) => LANGUAGES.find((l) => l.code === code))
    .filter(Boolean)
    .map((language) => ({
      ...language,
      level: 'beginner',
      progress: Math.min(
        100,
        bookings.filter((b) => b.language === language.code).length * 20
      ),
    }));

  // Real bookings, split by whether the session has happened yet.
  const now = Date.now();
  const bookedExperiences = bookings
    .map((booking) => ({
      booking,
      experience: experiencesData.find((exp) => exp.id === booking.experienceId),
    }))
    .filter((entry) => entry.experience);

  const upcomingExperiences = bookedExperiences
    .filter(({ booking }) => new Date(booking.date).getTime() >= now)
    .sort((a, b) => new Date(a.booking.date) - new Date(b.booking.date))
    .map(({ experience }) => experience);

  const pastExperiences = bookedExperiences
    .filter(({ booking }) => new Date(booking.date).getTime() < now)
    .sort((a, b) => new Date(b.booking.date) - new Date(a.booking.date))
    .map(({ experience }) => experience);

  // Favourites are experience ids, so the teachers shown here are the ones
  // behind the experiences the player saved.
  const favouritedTeacherIds = new Set(
    favorites
      .map((expId) => experiencesData.find((exp) => exp.id === expId)?.teacherId)
      .filter(Boolean)
  );
  const favoriteTeachers = teachersData.filter((teacher) =>
    favouritedTeacherIds.has(teacher.id)
  );

  const student = {
    name: player?.name || 'Learner',
    photo: player?.photo,
    bio: player?.bio,
    memberSince: player?.memberSince || new Date(),
  };

  // Mobile tab content
  const tabs = [
    { id: 'overview', label: 'Overview', icon: Target },
    { id: 'upcoming', label: 'Upcoming', icon: Calendar },
    { id: 'past', label: 'Past', icon: BookOpen },
    { id: 'teachers', label: 'Teachers', icon: Users },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Header Section */}
      <div className="bg-gradient-to-br from-primary-500 to-secondary-500 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Avatar */}
            <Avatar
              src={student.photo}
              alt={student.name}
              name={student.name}
              size="2xl"
              className="ring-4 ring-white/20"
            />

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-display font-bold">
                  {student.name}
                </h1>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  Level {level.level}
                </Badge>
              </div>

              <p className="text-white/90 text-lg mb-3">{level.name}</p>

              <div className="flex items-center gap-2 text-white/80 mb-4">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">
                  Member since {formatDate(student.memberSince, 'MMMM yyyy')}
                </span>
              </div>

              {/* Quick stats */}
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Trophy className="w-4 h-4" />
                  <span className="font-medium">{points}</span> points
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  <span className="font-medium">{earnedBadges.length}</span> badges
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  <span className="font-medium">{stats.totalExperiences}</span> experiences
                </div>
              </div>
            </div>

            {/* Edit Button */}
            <Button
              variant="secondary"
              size="md"
              icon={<Edit2 className="w-4 h-4" />}
              onClick={() => {
                setDraft({ name: student.name, bio: student.bio ?? '' });
                setEditing(true);
              }}
              className="self-start"
            >
              Edit Profile
            </Button>
          </div>
        </div>
      </div>

      {/* Edit profile - was the only edit affordance and it just alerted */}
      {editing && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setEditing(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Edit profile"
        >
          <motion.form
            initial={{ scale: 0.95, y: 12 }}
            animate={{ scale: 1, y: 0 }}
            onClick={(event) => event.stopPropagation()}
            onSubmit={(event) => {
              event.preventDefault();
              updateUser({ name: draft.name.trim() || 'Learner', bio: draft.bio.trim() });
              setEditing(false);
            }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Edit your profile
            </h2>

            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Name
            </label>
            <input
              value={draft.name}
              onChange={(event) => setDraft((d) => ({ ...d, name: event.target.value }))}
              className="w-full px-4 py-2.5 mb-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />

            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              About you
            </label>
            <textarea
              value={draft.bio}
              onChange={(event) => setDraft((d) => ({ ...d, bio: event.target.value }))}
              rows={3}
              placeholder="What are you learning, and why?"
              className="w-full px-4 py-2.5 mb-6 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />

            <div className="flex gap-3 justify-end">
              <Button type="button" variant="ghost" onClick={() => setEditing(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Save
              </Button>
            </div>
          </motion.form>
        </div>
      )}

      {/* Mobile Tabs */}
      <div className="lg:hidden bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Desktop Always, Mobile Tabs */}
          <div
            className={`lg:col-span-2 space-y-6 ${
              activeTab !== 'overview' && 'hidden lg:block'
            }`}
          >
            {/* Gamification Card */}
            <Card>
              <CardBody>
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-primary-500" />
                  <h2 className="text-xl font-display font-bold text-gray-900">
                    Your Progress
                  </h2>
                </div>

                <div className="space-y-4">
                  {/* Points and Level */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-gray-900">{points}</p>
                      <p className="text-sm text-gray-600">Total Points</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary-500">
                        Level {level.level}
                      </p>
                      <p className="text-sm text-gray-600">{level.name}</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-gray-700">
                        Progress to Level {level.level + 1}
                      </p>
                      <p className="text-sm text-gray-600">
                        {level.pointsNeeded} points to go
                      </p>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${level.percentage}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {Math.round(level.percentage)}% complete
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Badges */}
            <Card>
              <CardBody>
                <div className="flex items-center gap-2 mb-6">
                  <Award className="w-5 h-5 text-primary-500" />
                  <h2 className="text-xl font-display font-bold text-gray-900">
                    Badges
                  </h2>
                  <Badge variant="secondary" size="sm" className="ml-auto">
                    {earnedBadges.length} / {BADGES.length}
                  </Badge>
                </div>

                {/* Earned Badges */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Earned</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {earnedBadges.map((badge) => (
                      <motion.div
                        key={badge.id}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                        className="relative bg-gradient-to-br from-primary-50 to-secondary-50 rounded-lg p-4 border-2 border-primary-200"
                      >
                        <div className="absolute top-2 right-2">
                          <CheckCircle2 className="w-4 h-4 text-primary-500" />
                        </div>
                        <div className="text-4xl mb-2">{badge.icon}</div>
                        <p className="font-semibold text-gray-900 text-sm mb-1">
                          {badge.name}
                        </p>
                        <p className="text-xs text-gray-600">{badge.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Locked Badges */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Locked</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {lockedBadges.map((badge) => (
                      <div
                        key={badge.id}
                        className="relative bg-gray-50 rounded-lg p-4 border-2 border-gray-200 opacity-60"
                      >
                        <div className="absolute top-2 right-2">
                          <Lock className="w-4 h-4 text-gray-400" />
                        </div>
                        <div className="text-4xl mb-2 grayscale">{badge.icon}</div>
                        <p className="font-semibold text-gray-700 text-sm mb-1">
                          {badge.name}
                        </p>
                        <p className="text-xs text-gray-500">{badge.requirement}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Languages Learning */}
            <Card>
              <CardBody>
                <h2 className="text-xl font-display font-bold text-gray-900 mb-6">
                  Languages Learning
                </h2>
                <div className="space-y-4">
                  {languagesLearning.map((lang) => (
                    <div key={lang.code}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{lang.flag}</span>
                          <div>
                            <p className="font-medium text-gray-900">{lang.name}</p>
                            <p className="text-sm text-gray-500 capitalize">{lang.level}</p>
                          </div>
                        </div>
                        <span className="text-sm font-semibold text-primary-600">
                          {lang.progress}%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${lang.progress}%` }}
                          transition={{ duration: 1, delay: 0.1 }}
                          className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Right Column - Desktop Always, Mobile Hidden */}
          <div className={`lg:col-span-1 ${activeTab !== 'overview' && 'hidden lg:block'}`}>
            {/* Stats Grid */}
            <Card className="mb-6">
              <CardBody>
                <h2 className="text-xl font-display font-bold text-gray-900 mb-4">
                  Your Stats
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-primary-50 rounded-lg p-4">
                    <BookOpen className="w-5 h-5 text-primary-500 mb-2" />
                    <p className="text-2xl font-bold text-gray-900">
                      {stats.totalExperiences}
                    </p>
                    <p className="text-xs text-gray-600">Experiences</p>
                  </div>

                  <div className="bg-secondary-50 rounded-lg p-4">
                    <MapPin className="w-5 h-5 text-secondary-500 mb-2" />
                    <p className="text-2xl font-bold text-gray-900">
                      {stats.citiesVisited}
                    </p>
                    <p className="text-xs text-gray-600">Cities</p>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-4">
                    <Users className="w-5 h-5 text-purple-500 mb-2" />
                    <p className="text-2xl font-bold text-gray-900">
                      {stats.teachersMet}
                    </p>
                    <p className="text-xs text-gray-600">Teachers</p>
                  </div>

                  <div className="bg-yellow-50 rounded-lg p-4">
                    <MessageSquare className="w-5 h-5 text-yellow-600 mb-2" />
                    <p className="text-2xl font-bold text-gray-900">
                      {stats.reviewsWritten}
                    </p>
                    <p className="text-xs text-gray-600">Reviews</p>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Bio */}
            {student.bio && (
              <Card>
                <CardBody>
                  <h3 className="font-semibold text-gray-900 mb-2">About</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">{student.bio}</p>
                </CardBody>
              </Card>
            )}
          </div>
        </div>

        {/* Shows itself only when a past booking is waiting on a review */}
        <ReviewPrompt className="mt-8" />

        {/* Upcoming Bookings Section */}
        <div
          className={`mt-8 ${
            activeTab !== 'upcoming' && activeTab !== 'overview' && 'hidden lg:block'
          }`}
        >
          <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
            Upcoming Experiences ({upcomingExperiences.length})
          </h2>
          {upcomingExperiences.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingExperiences.map((experience) => (
                <ExperienceCard key={experience.id} experience={experience} />
              ))}
            </div>
          ) : (
            <Card>
              <CardBody className="text-center py-12">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No upcoming experiences</p>
                <Link to="/explore">
                  <Button variant="primary">Browse Experiences</Button>
                </Link>
              </CardBody>
            </Card>
          )}
        </div>

        {/* Past Experiences Section */}
        <div
          className={`mt-8 ${
            activeTab !== 'past' && activeTab !== 'overview' && 'hidden lg:block'
          }`}
        >
          <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
            Past Experiences ({pastExperiences.length})
          </h2>
          {pastExperiences.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastExperiences.slice(0, 6).map((experience) => (
                <ExperienceCard key={experience.id} experience={experience} />
              ))}
            </div>
          ) : (
            <Card>
              <CardBody className="text-center py-12">
                <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No past experiences yet</p>
              </CardBody>
            </Card>
          )}
        </div>

        {/* Favorite Teachers Section */}
        <div
          className={`mt-8 ${
            activeTab !== 'teachers' && activeTab !== 'overview' && 'hidden lg:block'
          }`}
        >
          <div className="flex items-center gap-2 mb-6">
            <Heart className="w-6 h-6 text-primary-500 fill-primary-500" />
            <h2 className="text-2xl font-display font-bold text-gray-900">
              Favorite Teachers ({favoriteTeachers.length})
            </h2>
          </div>
          {favoriteTeachers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteTeachers.map((teacher) => (
                <TeacherCard key={teacher.id} teacher={teacher} />
              ))}
            </div>
          ) : (
            <Card>
              <CardBody className="text-center py-12">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No favorite teachers yet</p>
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    </motion.div>
  );
}
