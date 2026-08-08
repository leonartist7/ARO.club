import { useParams, Link } from 'react-router-dom';
import { MapPin, Star, BookOpen, Calendar, MessageCircle, Award, Languages } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';
import { Card, CardBody } from '../components/ui/Card';
import ExperienceCard from '../components/features/ExperienceCard';
import EmptyState from '../components/ui/EmptyState';
import ErrorState from '../components/ui/ErrorState';
import TierBadge from '../components/ui/TierBadge';
import experiencesData from '../data/experiences.json';
import teachersData from '../data/teachers.json';
import reviewsData from '../data/reviews.json';
import { LANGUAGES, CITIES } from '../data/constants';
import { formatDate } from '../utils/date';

const PROFICIENCY = {
  native: 100,
  fluent: 85,
  advanced: 70,
  intermediate: 50,
  beginner: 30,
};

/** Teacher Profile ? DESIGN_SYSTEM section 8.4 */
export default function TeacherProfilePage() {
  const { id } = useParams();
  const [showAllReviews, setShowAllReviews] = useState(false);
  const reduceMotion = useReducedMotion();

  const teacher = teachersData.find((t) => t.id === id);

  if (!teacher) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
        <ErrorState
          type="notFound"
          title="Teacher not found"
          description="Sorry ? we could not find this teacher. Browse experiences to meet someone new."
          action={
            <Link to="/explore">
              <Button variant="primary">Browse experiences</Button>
            </Link>
          }
        />
      </div>
    );
  }

  const city = CITIES.find((c) => c.id === teacher.cityId);
  const teacherLanguages = teacher.languages.map((code) =>
    LANGUAGES.find((l) => l.code === code)
  );

  const teacherExperiences = experiencesData
    .filter((exp) => exp.teacherId === id)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const upcomingExperiences = teacherExperiences.filter(
    (exp) => new Date(exp.date) > new Date()
  );

  const teacherReviews = reviewsData.filter((r) => r.teacherId === id);
  const visibleReviews = showAllReviews ? teacherReviews : teacherReviews.slice(0, 6);

  const ratingCounts = [0, 0, 0, 0, 0];
  teacherReviews.forEach((review) => {
    ratingCounts[review.rating - 1]++;
  });

  const motionProps = reduceMotion
    ? {}
    : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4 } };

  return (
    <motion.div {...motionProps} className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="bg-primary-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            <Avatar
              src={teacher.photo}
              alt={teacher.name}
              name={teacher.name}
              size="2xl"
              className="ring-4 ring-white/20"
            />

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-display font-bold">{teacher.name}</h1>
                <TierBadge tier={teacher.tier} />
              </div>

              <div className="flex flex-wrap items-center gap-4 text-white/90 mb-4">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" aria-hidden="true" />
                  <span>{city?.name}, {city?.country}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" aria-hidden="true" />
                  <span>Member since {formatDate(teacher.memberSince, 'MMM yyyy')}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>Responds {teacher.responseTime}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {teacherLanguages.map((lang) =>
                  lang ? (
                    <Badge key={lang.code} variant="secondary" className="bg-white/20 text-white border-white/30">
                      {lang.flag} {lang.name}
                    </Badge>
                  ) : null
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <div className="flex items-center gap-2 text-2xl font-bold mb-1">
                    <Star className="w-5 h-5 fill-accent-400 stroke-accent-400" aria-hidden="true" />
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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {teacher.introVideo && (
              <Card>
                <CardBody>
                  <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-gray-50 mb-4">
                    Meet {teacher.name.split(' ')[0]}
                  </h2>
                  <div className="rounded-3xl overflow-hidden bg-gray-900 aspect-video">
                    <video
                      src={teacher.introVideo}
                      controls
                      className="w-full h-full object-cover"
                      poster={teacher.photo}
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </CardBody>
              </Card>
            )}

            <Card>
              <CardBody>
                <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-gray-50 mb-4">
                  About {teacher.name}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">{teacher.bio}</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{teacher.about}</p>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-gray-50 mb-4 flex items-center gap-2">
                  <Languages className="w-6 h-6 text-secondary-600" aria-hidden="true" />
                  Languages
                </h2>
                <div className="space-y-4">
                  {(teacher.languages_spoken || []).map((lang, index) => {
                    const language = LANGUAGES.find((l) => l.code === lang.code);
                    const pct = PROFICIENCY[lang.level] ?? 50;
                    return (
                      <div key={index}>
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-xl" aria-hidden="true">{language?.flag}</span>
                            <span className="font-medium text-gray-900 dark:text-gray-50">{language?.name}</span>
                          </div>
                          <span className="text-sm capitalize text-secondary-700 dark:text-secondary-300 font-medium">
                            {lang.level}
                          </span>
                        </div>
                        <div
                          className="h-2.5 rounded-full bg-secondary-100 dark:bg-secondary-900/40 overflow-hidden"
                          role="progressbar"
                          aria-valuenow={pct}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={`${language?.name} proficiency: ${lang.level}`}
                        >
                          <div className="h-full rounded-full bg-secondary-600 transition-all" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-gray-50 mb-4">Specialties</h2>
                <div className="flex flex-wrap gap-2">
                  {teacher.specialties.map((specialty, index) => (
                    <Badge key={index} variant="primary" size="md">{specialty}</Badge>
                  ))}
                </div>
              </CardBody>
            </Card>

            {teacher.certifications?.length > 0 && (
              <Card>
                <CardBody>
                  <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-gray-50 mb-4 flex items-center gap-2">
                    <Award className="w-6 h-6 text-primary-600" aria-hidden="true" />
                    Certifications
                  </h2>
                  <ul className="space-y-3">
                    {teacher.certifications.map((cert, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-primary-700 dark:text-primary-300 font-semibold text-sm" aria-hidden="true">?</span>
                        </div>
                        <span className="text-gray-700 dark:text-gray-300">{cert}</span>
                      </li>
                    ))}
                  </ul>
                </CardBody>
              </Card>
            )}

            <div>
              <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-gray-50 mb-6">
                Upcoming experiences
              </h2>
              {upcomingExperiences.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {upcomingExperiences.map((experience) => (
                    <ExperienceCard key={experience.id} experience={experience} />
                  ))}
                </div>
              ) : (
                <EmptyState
                  pose="think"
                  title="No upcoming tables yet"
                  description="Check back soon ? new experiences are added every week."
                  action={{ label: 'Browse all experiences', href: '/explore' }}
                />
              )}
            </div>

            {teacherReviews.length > 0 && (
              <Card>
                <CardBody>
                  <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-gray-50 mb-6">
                    Reviews ({teacherReviews.length})
                  </h2>

                  <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                      <div className="text-center">
                        <div className="text-5xl font-bold text-gray-900 dark:text-gray-50 mb-2">{teacher.rating}</div>
                        <div className="flex items-center gap-1 mb-1 justify-center" aria-label={`${teacher.rating} average rating`}>
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${i < Math.floor(teacher.rating) ? 'fill-accent-500 stroke-accent-500' : 'stroke-gray-300 dark:stroke-gray-600'}`}
                              aria-hidden="true"
                            />
                          ))}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{teacherReviews.length} reviews</div>
                      </div>

                      <div className="flex-1 w-full">
                        {[5, 4, 3, 2, 1].map((rating) => {
                          const count = ratingCounts[rating - 1];
                          const percentage = teacherReviews.length > 0 ? (count / teacherReviews.length) * 100 : 0;
                          return (
                            <div key={rating} className="flex items-center gap-3 mb-2">
                              <span className="text-sm text-gray-500 dark:text-gray-400 w-12">{rating} star</span>
                              <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                                <div className="h-full bg-accent-500 rounded-full" style={{ width: `${percentage}%` }} />
                              </div>
                              <span className="text-sm text-gray-500 dark:text-gray-400 w-8">{count}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {visibleReviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-200 dark:border-gray-800 last:border-0 pb-6 last:pb-0">
                        <div className="flex items-start gap-3">
                          <Avatar src={review.studentPhoto} alt={review.studentName} name={review.studentName} size="md" />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
                              <p className="font-medium text-gray-900 dark:text-gray-50">{review.studentName}</p>
                              <div className="flex items-center gap-1" aria-label={`${review.rating} out of 5`}>
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${i < review.rating ? 'fill-accent-500 stroke-accent-500' : 'stroke-gray-300 dark:stroke-gray-600'}`}
                                    aria-hidden="true"
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{formatDate(review.date)}</p>
                            <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {teacherReviews.length > 6 && !showAllReviews && (
                    <div className="mt-6 text-center">
                      <Button variant="outline" onClick={() => setShowAllReviews(true)}>
                        Show all {teacherReviews.length} reviews
                      </Button>
                    </div>
                  )}
                </CardBody>
              </Card>
            )}
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardBody className="space-y-6">
                <Link to="/login" state={{ from: { pathname: "/chat" } }} className="block w-full"><Button variant="primary" size="lg" className="w-full" icon={<MessageCircle className="w-5 h-5" />}>Message before booking</Button></Link>

                <Button variant="outline" size="lg" className="w-full" icon={<BookOpen className="w-5 h-5" />} disabled>
                  Booking opens soon
                </Button>

                <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-50 mb-4">Quick facts</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Hourly rate</span>
                      <div className="font-medium text-gray-900 dark:text-gray-50">${teacher.hourlyRate}/hour</div>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Response time</span>
                      <div className="font-medium text-gray-900 dark:text-gray-50">{teacher.responseTime}</div>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Teaching since</span>
                      <div className="font-medium text-gray-900 dark:text-gray-50">
                        {formatDate(teacher.memberSince, 'MMMM yyyy')}
                      </div>
                    </div>
                    {teacher.tier && (
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Verification</span>
                        <div className="mt-1"><TierBadge tier={teacher.tier} /></div>
                      </div>
                    )}
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
