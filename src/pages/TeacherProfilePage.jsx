import { useParams, Link } from 'react-router-dom';
import { MapPin, Star, BookOpen, Calendar, MessageCircle, Award, Languages } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';
import { Card, CardBody } from '../components/ui/Card';
import ExperienceCard from '../components/features/ExperienceCard';
import experiencesData from '../data/experiences';
import teachersData from '../data/teachers.json';
import reviewsData from '../data/reviews.json';
import { LANGUAGES, CITIES } from '../data/constants';
import { formatDate } from '../utils/date';
import { useState } from 'react';

export default function TeacherProfilePage() {
  const { id } = useParams();
  const [showAllReviews, setShowAllReviews] = useState(false);

  const teacher = teachersData.find((t) => t.id === id);

  if (!teacher) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 dark:text-white">Teacher Not Found</h1>
          <p className="text-gray-600 mb-6 dark:text-gray-400">Sorry, we couldn't find this teacher profile.</p>
          <Link to="/explore">
            <Button variant="primary">Browse Experiences</Button>
          </Link>
        </div>
      </div>
    );
  }

  const city = CITIES.find((c) => c.id === teacher.cityId);
  // Drop codes we have no metadata for - English isn't in LANGUAGES, and an
  // undefined entry blows up when the badge reads `.flag`.
  const teacherLanguages = (teacher.languages ?? [])
    .map((code) => LANGUAGES.find((l) => l.code === code))
    .filter(Boolean);

  const teacherExperiences = experiencesData
    .filter((exp) => exp.teacherId === id)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const upcomingExperiences = teacherExperiences.filter(
    (exp) => new Date(exp.date) > new Date()
  );

  // The soonest session, for the "Book a Session" CTA.
  const nextExperience = upcomingExperiences[0];

  const teacherReviews = reviewsData.filter((r) => r.teacherId === id);
  const visibleReviews = showAllReviews ? teacherReviews : teacherReviews.slice(0, 6);

  // Calculate rating distribution
  const ratingCounts = [0, 0, 0, 0, 0];
  teacherReviews.forEach((review) => {
    ratingCounts[review.rating - 1]++;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900"
    >
      {/* Header Section */}
      <div className="bg-gradient-to-br from-primary-500 to-secondary-500 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            {/* Avatar */}
            <Avatar
              src={teacher.photo}
              alt={teacher.name}
              name={teacher.name}
              size="2xl"
              className="ring-4 ring-white/20"
            />

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
                {teacher.name}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-white/90 mb-4">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{city?.name}, {city?.country}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>Member since {formatDate(teacher.memberSince, 'MMM yyyy')}</span>
                </div>
              </div>

              {/* Languages */}
              <div className="flex flex-wrap gap-2 mb-4">
                {teacherLanguages.map((lang) => (
                  <Badge
                    key={lang.code}
                    variant="secondary"
                    className="bg-white/20 text-white border-white/30"
                  >
                    {lang?.flag} {lang?.name}
                  </Badge>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <div className="flex items-center gap-2 text-2xl font-bold mb-1">
                    <Star className="w-5 h-5 fill-yellow-400 stroke-yellow-400" />
                    {teacher.rating}
                  </div>
                  <div className="text-sm text-white/80">{teacher.totalReviews} reviews</div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <div className="text-2xl font-bold mb-1">{teacher.totalSessions}</div>
                  <div className="text-sm text-white/80">Sessions taught</div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <div className="text-2xl font-bold mb-1">{upcomingExperiences.length}</div>
                  <div className="text-sm text-white/80">Upcoming</div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <div className="text-lg font-bold mb-1">{teacher.responseTime}</div>
                  <div className="text-xs text-white/80">Response time</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio */}
            <Card>
              <CardBody>
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-4 dark:text-white">
                  About {teacher.name}
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4 dark:text-gray-300">{teacher.bio}</p>
                <p className="text-gray-700 leading-relaxed dark:text-gray-300">{teacher.about}</p>
              </CardBody>
            </Card>

            {/* Specialties */}
            <Card>
              <CardBody>
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-4 dark:text-white">
                  Specialties
                </h2>
                <div className="flex flex-wrap gap-2">
                  {teacher.specialties.map((specialty, index) => (
                    <Badge key={index} variant="primary" size="md">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* Certifications */}
            <Card>
              <CardBody>
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-4 flex items-center gap-2 dark:text-white">
                  <Award className="w-6 h-6 text-primary-500" />
                  Certifications
                </h2>
                <ul className="space-y-3">
                  {teacher.certifications.map((cert, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mt-0.5 dark:bg-primary-900/40">
                        <span className="text-primary-500 font-semibold text-sm">✓</span>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">{cert}</span>
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>

            {/* Languages Spoken */}
            <Card>
              <CardBody>
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-4 flex items-center gap-2 dark:text-white">
                  <Languages className="w-6 h-6 text-primary-500" />
                  Languages Spoken
                </h2>
                <div className="space-y-3">
                  {teacher.languages_spoken.map((lang, index) => {
                    const language = LANGUAGES.find((l) => l.code === lang.code);
                    return (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{language?.flag}</span>
                          <span className="font-medium text-gray-900 dark:text-white">{language?.name}</span>
                        </div>
                        <Badge
                          variant={lang.level === 'native' ? 'primary' : 'default'}
                          size="sm"
                        >
                          {lang.level}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </CardBody>
            </Card>

            {/* Upcoming Experiences */}
            <div>
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-6 dark:text-white">
                Upcoming Experiences ({upcomingExperiences.length})
              </h2>
              {upcomingExperiences.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {upcomingExperiences.map((experience) => (
                    <ExperienceCard key={experience.id} experience={experience} />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardBody className="text-center py-12">
                    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">No upcoming experiences scheduled</p>
                  </CardBody>
                </Card>
              )}
            </div>

            {/* Reviews */}
            {teacherReviews.length > 0 && (
              <Card>
                <CardBody>
                  <h2 className="text-2xl font-display font-bold text-gray-900 mb-6 dark:text-white">
                    Reviews ({teacherReviews.length})
                  </h2>

                  {/* Rating Distribution */}
                  <div className="mb-8 pb-8 border-b border-gray-100 dark:border-gray-700">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                      <div className="text-center">
                        <div className="text-5xl font-bold text-gray-900 mb-2 dark:text-white">
                          {teacher.rating}
                        </div>
                        <div className="flex items-center gap-1 mb-1 justify-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                i < Math.floor(teacher.rating)
                                  ? 'fill-yellow-400 stroke-yellow-400'
                                  : 'stroke-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {teacherReviews.length} reviews
                        </div>
                      </div>

                      <div className="flex-1 w-full">
                        {[5, 4, 3, 2, 1].map((rating) => {
                          const count = ratingCounts[rating - 1];
                          const percentage =
                            teacherReviews.length > 0
                              ? (count / teacherReviews.length) * 100
                              : 0;
                          return (
                            <div
                              key={rating}
                              className="flex items-center gap-3 mb-2"
                            >
                              <span className="text-sm text-gray-600 w-12 dark:text-gray-400">
                                {rating} star
                              </span>
                              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-yellow-400 rounded-full"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                              <span className="text-sm text-gray-600 w-8 dark:text-gray-400">
                                {count}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Review List */}
                  <div className="space-y-6">
                    {visibleReviews.map((review) => (
                      <div
                        key={review.id}
                        className="border-b border-gray-100 last:border-0 pb-6 last:pb-0 dark:border-gray-700"
                      >
                        <div className="flex items-start gap-3">
                          <Avatar
                            src={review.studentPhoto}
                            alt={review.studentName}
                            name={review.studentName}
                            size="md"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <p className="font-medium text-gray-900 dark:text-white">
                                {review.studentName}
                              </p>
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
                            <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {teacherReviews.length > 6 && !showAllReviews && (
                    <div className="mt-6 text-center">
                      <Button
                        variant="outline"
                        onClick={() => setShowAllReviews(true)}
                      >
                        Show All {teacherReviews.length} Reviews
                      </Button>
                    </div>
                  )}
                </CardBody>
              </Card>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardBody className="space-y-6">
                {/* CTA */}
                {/* Booking happens per experience, so send them to this
                    teacher's next session rather than alerting. */}
                {nextExperience ? (
                  <Link to={`/experience/${nextExperience.id}`} className="block">
                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full"
                      icon={<BookOpen className="w-5 h-5" />}
                    >
                      Book a Session
                    </Button>
                  </Link>
                ) : (
                  <Button variant="primary" size="lg" className="w-full" disabled>
                    No sessions scheduled
                  </Button>
                )}

                {/* Contact - /chat already works */}
                <Link to="/chat" className="block">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full"
                    icon={<MessageCircle className="w-5 h-5" />}
                  >
                    Contact {teacher.name.split(' ')[0]}
                  </Button>
                </Link>

                <div className="border-t border-gray-100 pt-6 dark:border-gray-700">
                  <h3 className="font-semibold text-gray-900 mb-4 dark:text-white">Quick Facts</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Hourly Rate:</span>
                      <div className="font-medium text-gray-900 dark:text-white">
                        ${teacher.hourlyRate}/hour
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Response Time:</span>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {teacher.responseTime}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Teaching Since:</span>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {formatDate(teacher.memberSince, 'MMMM yyyy')}
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
