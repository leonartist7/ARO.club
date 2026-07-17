import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Clock, Users, Star, Calendar, Heart, ChevronLeft, MessageCircle } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';
import { Card, CardBody } from '../components/ui/Card';
import ExperienceCard from '../components/features/ExperienceCard';
import CalendarAvailability from '../components/CalendarAvailability';
import SpotCounter from '../components/ui/SpotCounter';
import ShareButton from '../components/ShareButton';
import ReviewHelpfulness from '../components/ReviewHelpfulness';
import SocialProof from '../components/ui/SocialProof';
import BookingProtection from '../components/ui/BookingProtection';
import RecentlyBooked from '../components/ui/RecentlyBooked';
import ErrorState from '../components/ui/ErrorState';
import TierBadge from '../components/ui/TierBadge';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';
import { useStore } from '../store/useStore';
import experiencesData from '../data/experiences.json';
import teachersData from '../data/teachers.json';
import reviewsData from '../data/reviews.json';
import { LANGUAGES, CITIES } from '../data/constants';
import {
  formatPrice,
  calculateCouplePrice,
  getDiscountAmount,
  getSpotsLeft,
  calculateAverageRating,
} from '../utils/helpers';
import { formatDate, formatTime, getDayOfWeek } from '../utils/date';
import { getExperienceShareText } from '../utils/shareUtils';
import { cn } from '../utils/cn';

const WARMUP_PAD = [
  'Hello ? nice to meet you',
  'Could I get a coffee, please?',
  'What do you recommend?',
  'How was your day?',
  'Where is the nearest metro?',
  'That sounds wonderful',
  'Could you say that again?',
  'Thank you so much!',
];

function getWarmupPhrases(experience) {
  const fromLearn = experience.whatYoullLearn || [];
  const phrases = [...fromLearn];
  for (const p of WARMUP_PAD) {
    if (phrases.length >= 8) break;
    if (!phrases.includes(p)) phrases.push(p);
  }
  return phrases.slice(0, 8);
}

/** Experience Detail ? DESIGN_SYSTEM section 8.3 */
export default function ExperienceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const { addToRecentlyViewed } = useRecentlyViewed();
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [reviewSortBy, setReviewSortBy] = useState('recent');
  const [bookingForTwo, setBookingForTwo] = useState(false);
  const { selectedDate, setSelectedDate } = useStore();

  const experience = experiencesData.find((exp) => exp.id === id);

  useEffect(() => {
    if (experience?.id) {
      addToRecentlyViewed(experience.id);
    }
  }, [experience, addToRecentlyViewed]);

  if (!experience) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
        <ErrorState
          type="notFound"
          title="Experience not found"
          description="Sorry ? we could not find that table. Try exploring another one."
          action={
            <Link to="/explore">
              <Button variant="primary">Browse all experiences</Button>
            </Link>
          }
        />
      </div>
    );
  }

  const teacher = teachersData.find((t) => t.id === experience.teacherId);
  const city = CITIES.find((c) => c.id === experience.cityId);
  const language = LANGUAGES.find((l) => l.code === experience.language);
  const experienceReviews = reviewsData.filter((r) => r.experienceId === id);
  const averageRating = calculateAverageRating(experienceReviews);
  const warmupPhrases = getWarmupPhrases(experience);

  const relatedExperiences = experiencesData
    .filter(
      (exp) =>
        exp.id !== id &&
        (exp.language === experience.language || exp.cityId === experience.cityId)
    )
    .slice(0, 3);

  const spotsLeft = getSpotsLeft(experience.maxCapacity, experience.bookedSpots);
  const couplePrice = calculateCouplePrice(experience.price);
  const discount = getDiscountAmount(experience.price);
  const isSoldOut = spotsLeft === 0;
  const isAlmostFull = spotsLeft <= 2 && spotsLeft > 0;

  const sortedReviews = [...experienceReviews].sort((a, b) => {
    switch (reviewSortBy) {
      case 'highest':
        return b.rating - a.rating;
      case 'lowest':
        return a.rating - b.rating;
      case 'helpful':
        return (b.helpfulCount || 0) - (a.helpfulCount || 0);
      case 'recent':
      default:
        return new Date(b.date) - new Date(a.date);
    }
  });

  const visibleReviews = showAllReviews ? sortedReviews : sortedReviews.slice(0, 5);

  const getCurrentSpots = () => {
    if (selectedDate && experience.spotsAvailableByDate) {
      const dateString = new Date(selectedDate).toISOString().split('T')[0];
      return experience.spotsAvailableByDate[dateString] || spotsLeft;
    }
    return spotsLeft;
  };

  const currentSpots = getCurrentSpots();
  const displayPrice = bookingForTwo ? couplePrice : experience.price;
  const shareText = getExperienceShareText(experience, city, language);
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const motionProps = reduceMotion
    ? {}
    : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4 } };

  const BookingCard = ({ className }) => (
    <Card className={cn('shadow-xl', className)}>
      <CardBody>
        <SpotCounter
          spotsLeft={currentSpots}
          totalSpots={experience.maxCapacity}
          variant="default"
          className="mb-6"
        />

        <div className="mb-6">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-4xl font-bold text-primary-700 dark:text-primary-300">
              {formatPrice(displayPrice)}
            </span>
            <span className="text-gray-500 dark:text-gray-400">
              {bookingForTwo ? 'for 2' : '/ person'}
            </span>
          </div>

          <div
            className="flex rounded-lg border border-gray-200 dark:border-gray-800 p-1 mb-4"
            role="group"
            aria-label="Party size"
          >
            <button
              type="button"
              onClick={() => setBookingForTwo(false)}
              className={cn(
                'flex-1 min-h-11 rounded-md text-sm font-semibold transition-colors',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
                !bookingForTwo
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
              )}
              aria-pressed={!bookingForTwo}
            >
              Solo
            </button>
            <button
              type="button"
              onClick={() => setBookingForTwo(true)}
              className={cn(
                'flex-1 min-h-11 rounded-md text-sm font-semibold transition-colors',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
                bookingForTwo
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
              )}
              aria-pressed={bookingForTwo}
            >
              With a buddy
            </button>
          </div>

          {bookingForTwo && (
            <div className="bg-secondary-50 dark:bg-secondary-900/20 border border-secondary-200 dark:border-secondary-800 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <Heart className="w-5 h-5 text-secondary-700 dark:text-secondary-300" aria-hidden="true" />
                <p className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                  Couple discount
                </p>
              </div>
              <p className="text-lg font-bold text-secondary-700 dark:text-secondary-300">
                {formatPrice(couplePrice)} for 2
              </p>
              <p className="text-xs text-secondary-700 dark:text-secondary-400">
                Save {formatPrice(discount)} ? perfect for learning together
              </p>
            </div>
          )}
        </div>

        <div className="space-y-4 mb-6 pb-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
            <Calendar className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="font-medium">{getDayOfWeek(experience.date)}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{formatDate(experience.date)}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
            <Clock className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="font-medium">{formatTime(experience.date)}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{experience.duration} minutes</p>
            </div>
          </div>
          <div className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
            <Users className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="font-medium">
                {currentSpots === 0 ? 'Sold out' : `${currentSpots} spots left`}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Max {experience.maxCapacity} people
              </p>
            </div>
          </div>
        </div>

        <BookingProtection className="mb-6" />

        <div className="space-y-3">
          <Button variant="primary" size="lg" className="w-full" disabled title="Booking opens soon">
            Booking opens soon
          </Button>
          <Button variant="outline" size="lg" className="w-full" icon={<Heart className="w-4 h-4" />} disabled>
            Save for later
          </Button>
        </div>
      </CardBody>
    </Card>
  );

  return (
    <motion.div {...motionProps} className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-28 lg:pb-12">
      <div className="relative h-[320px] md:h-[420px] bg-gray-900">
        <img src={experience.image} alt={experience.title} className="w-full h-full object-cover opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 p-2 min-h-11 min-w-11 flex items-center justify-center bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full hover:bg-white dark:hover:bg-gray-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          aria-label="Go back"
        >
          <ChevronLeft className="w-6 h-6 text-gray-900 dark:text-gray-50" />
        </button>

        <div className="absolute top-6 right-6">
          <ShareButton url={shareUrl} title={experience.title} text={shareText} />
        </div>

        <div className="absolute bottom-6 left-6 flex flex-wrap gap-2">
          {experience.featured && (
            <Badge variant="warning" size="lg" icon={<Star className="w-4 h-4 fill-current" />}>
              Featured
            </Badge>
          )}
          {isSoldOut && <Badge variant="default" size="lg">Sold Out</Badge>}
          {isAlmostFull && <Badge variant="danger" size="lg">Almost Full!</Badge>}
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="rounded-3xl">
              <CardBody className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="primary" size="md">{language?.flag} {language?.name}</Badge>
                  <Badge variant="info" size="md">{experience.skillLevel}</Badge>
                  <Badge variant="default" size="md">{experience.type}</Badge>
                  {city && (
                    <Badge variant="secondary" size="md">
                      <MapPin className="w-3 h-3 mr-0.5" aria-hidden="true" />
                      {city.name}
                    </Badge>
                  )}
                </div>

                <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-gray-50">
                  {experience.title}
                </h1>

                {teacher && (
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <Link
                      to={`/teacher/${teacher.id}`}
                      className="flex items-center gap-3 group rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                    >
                      <Avatar src={teacher.photo} alt={teacher.name} name={teacher.name} size="lg" />
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="font-medium text-gray-900 dark:text-gray-50 group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors">
                            Hosted by {teacher.name}
                          </p>
                          <TierBadge tier={teacher.tier} />
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <Star className="w-4 h-4 fill-accent-500 stroke-accent-500" aria-hidden="true" />
                          <span className="font-medium text-gray-700 dark:text-gray-300">{teacher.rating}</span>
                          <span>({teacher.totalReviews} reviews)</span>
                        </div>
                      </div>
                    </Link>
                    <Link to="/chat">
                      <Button variant="outline" size="md" icon={<MessageCircle className="w-4 h-4" />}>
                        Message
                      </Button>
                    </Link>
                  </div>
                )}

                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {experience.description}
                </p>
              </CardBody>
            </Card>

            <Card className="rounded-3xl border-2 border-primary-200 dark:border-primary-800">
              <CardBody>
                <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-gray-50 mb-2">
                  What you will say tonight
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                  Warm-up phrases for this table ? practice before you go.
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {warmupPhrases.map((phrase, index) => (
                    <li
                      key={`${phrase}-${index}`}
                      className="flex items-start gap-3 rounded-xl bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800 px-4 py-3"
                    >
                      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary-600 text-white text-sm font-bold flex items-center justify-center">
                        {index + 1}
                      </span>
                      <span className="text-gray-900 dark:text-gray-50 text-base font-medium pt-0.5">
                        {phrase}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-gray-50 mb-6">
                  What you will learn
                </h2>
                <ul className="space-y-4">
                  {experience.whatYoullLearn.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-primary-700 dark:text-primary-300 font-semibold text-sm" aria-hidden="true">?</span>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-gray-50 mb-6">
                  What is included
                </h2>
                <div className="flex flex-wrap gap-2">
                  {experience.included.map((item, index) => (
                    <Badge key={index} variant="secondary" size="md">{item}</Badge>
                  ))}
                </div>
              </CardBody>
            </Card>

            {experience.availableDates && experience.availableDates.length > 0 && (
              <Card>
                <CardBody>
                  <CalendarAvailability
                    availableDates={experience.availableDates}
                    spotsAvailableByDate={experience.spotsAvailableByDate}
                    selectedDate={selectedDate}
                    onDateSelect={setSelectedDate}
                  />
                  {experience.viewingCount > 10 && (
                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800 space-y-3">
                      <SocialProof viewingCount={experience.viewingCount} variant="viewing" />
                      {experience.recentBookingCount > 0 && (
                        <SocialProof recentBookingCount={experience.recentBookingCount} variant="booked" />
                      )}
                      <RecentlyBooked />
                    </div>
                  )}
                </CardBody>
              </Card>
            )}

            <Card>
              <CardBody>
                <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-gray-50 mb-6">Location</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-50">{experience.location.venue}</p>
                      <p className="text-gray-500 dark:text-gray-400">{experience.location.address}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{city?.name}, {city?.country}</p>
                    </div>
                  </div>
                  <div className="w-full h-48 rounded-3xl bg-secondary-50 dark:bg-secondary-900/20 border border-secondary-200 dark:border-secondary-800 flex items-center justify-center">
                    <div className="text-center p-6">
                      <MapPin className="w-10 h-10 text-secondary-600 mx-auto mb-2" aria-hidden="true" />
                      <p className="text-secondary-700 dark:text-secondary-300 font-medium">Interactive map coming soon</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Exact pin shared after booking</p>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>

            {experienceReviews.length > 0 && (
              <Card>
                <CardBody>
                  <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                    <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-gray-50">
                      Reviews ({experienceReviews.length})
                    </h2>
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 fill-accent-500 stroke-accent-500" aria-hidden="true" />
                      <span className="text-xl font-bold text-gray-900 dark:text-gray-50">{averageRating}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="review-sort" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                      Sort by
                    </label>
                    <select
                      id="review-sort"
                      value={reviewSortBy}
                      onChange={(e) => setReviewSortBy(e.target.value)}
                      className="px-4 py-2 min-h-11 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="recent">Most Recent</option>
                      <option value="highest">Highest Rating</option>
                      <option value="lowest">Lowest Rating</option>
                      <option value="helpful">Most Helpful</option>
                    </select>
                  </div>

                  <div className="space-y-6">
                    {visibleReviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-200 dark:border-gray-800 last:border-0 pb-6 last:pb-0">
                        <div className="flex items-start gap-3 mb-4">
                          <Avatar src={review.studentPhoto} alt={review.studentName} name={review.studentName} size="md" />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
                              <p className="font-medium text-gray-900 dark:text-gray-50">{review.studentName}</p>
                              <div className="flex items-center gap-1" aria-label={`${review.rating} out of 5 stars`}>
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
                        <ReviewHelpfulness
                          reviewId={review.id}
                          initialHelpfulCount={review.helpfulCount}
                          initialNotHelpfulCount={review.notHelpfulCount}
                        />
                      </div>
                    ))}
                  </div>

                  {experienceReviews.length > 5 && !showAllReviews && (
                    <div className="mt-6 text-center">
                      <Button variant="outline" onClick={() => setShowAllReviews(true)}>
                        Show all {experienceReviews.length} reviews
                      </Button>
                    </div>
                  )}
                </CardBody>
              </Card>
            )}
          </div>

          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24">
              <BookingCard />
            </div>
          </div>
        </div>

        {relatedExperiences.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-gray-50 mb-6">
              You might also like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedExperiences.map((exp) => (
                <ExperienceCard key={exp.id} experience={exp} />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-2xl">
        <div className="flex items-center gap-4 max-w-lg mx-auto">
          <div className="flex-1 min-w-0">
            <p className="text-xl font-bold text-primary-700 dark:text-primary-300">{formatPrice(displayPrice)}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {currentSpots === 0 ? 'Sold out' : `${currentSpots} spots left`}
            </p>
          </div>
          <Button variant="primary" size="lg" disabled className="shrink-0">
            Booking opens soon
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
