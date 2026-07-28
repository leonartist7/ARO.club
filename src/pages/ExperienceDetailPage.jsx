import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  MapPin,
  Clock,
  Users,
  Star,
  Calendar,
  Heart,
  ChevronLeft,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';
import { useFavorites } from '../hooks/useFavorites';
import { useToast } from '../hooks/useToast';
import { useStore } from '../store/useStore';
import { usePlayerStore } from '../store/usePlayerStore';
import { getBadge } from '../data/gamification';
import experiencesData from '../data/experiences';
import teachersData from '../data/teachers.json';
import reviewsData from '../data/reviews.json';
import { LANGUAGES, CITIES } from '../data/constants';
import { formatPrice, calculateCouplePrice, getDiscountAmount, getSpotsLeft, calculateAverageRating } from '../utils/helpers';
import { formatDate, formatTime, getDayOfWeek } from '../utils/date';
import { getExperienceShareText } from '../utils/shareUtils';

export default function ExperienceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToRecentlyViewed } = useRecentlyViewed();
  const { isFavorite, toggleFavorite } = useFavorites();
  const toast = useToast();
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [reviewSortBy, setReviewSortBy] = useState('recent'); // 'recent', 'highest', 'lowest', 'helpful'

  // Module 3: Selected date state
  const { selectedDate, setSelectedDate } = useStore();

  const player = usePlayerStore((state) => state.user);
  const bookExperience = usePlayerStore((state) => state.bookExperience);
  const bookings = usePlayerStore((state) => state.bookings);
  const [bookingResult, setBookingResult] = useState(null);
  const [bookingForTwo, setBookingForTwo] = useState(false);

  const experience = experiencesData.find((exp) => exp.id === id);

  // Track recently viewed on mount
  useEffect(() => {
    if (experience) {
      addToRecentlyViewed(experience.id);
    }
  }, [experience?.id, addToRecentlyViewed]);

  if (!experience) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Experience Not Found</h1>
          <p className="text-gray-600 mb-6">Sorry, we couldn't find the experience you're looking for.</p>
          <Link to="/explore">
            <Button variant="primary">Browse All Experiences</Button>
          </Link>
        </div>
      </div>
    );
  }

  const teacher = teachersData.find((t) => t.id === experience.teacherId);
  const city = CITIES.find((c) => c.id === experience.cityId);
  const language = LANGUAGES.find((l) => l.code === experience.language);
  const experienceReviews = reviewsData.filter((r) => r.experienceId === id);
  const averageRating = calculateAverageRating(experienceReviews);

  const relatedExperiences = experiencesData
    .filter((exp) =>
      exp.id !== id &&
      (exp.language === experience.language || exp.cityId === experience.cityId)
    )
    .slice(0, 3);

  const spotsLeft = getSpotsLeft(experience.maxCapacity, experience.bookedSpots);
  const couplePrice = calculateCouplePrice(experience.price);
  const discount = getDiscountAmount(experience.price);
  const isSoldOut = spotsLeft === 0;
  const isAlmostFull = spotsLeft <= 2 && spotsLeft > 0;

  // Sort reviews
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

  // Module 3: Get spots for selected date or default
  const getCurrentSpots = () => {
    if (selectedDate && experience.spotsAvailableByDate) {
      const dateString = new Date(selectedDate).toISOString().split('T')[0];
      return experience.spotsAvailableByDate[dateString] || spotsLeft;
    }
    return spotsLeft;
  };

  const currentSpots = getCurrentSpots();
  const alreadyBooked = bookings.some((booking) => booking.experienceId === experience.id);
  const saved = isFavorite(experience.id);

  // Generate share text
  const shareText = getExperienceShareText(experience, city, language);
  const shareUrl = window.location.href;

  const handleBooking = () => {
    if (!player) {
      navigate('/choose-role', { state: { from: location } });
      return;
    }

    // Records the booking, earns points and can unlock the journey badges.
    // Payment is a later step - this is the reservation itself.
    const result = bookExperience({
      experience,
      date: selectedDate || experience.date,
      spots: bookingForTwo ? 2 : 1,
      couple: bookingForTwo,
      pricePaid: bookingForTwo ? couplePrice : experience.price,
    });

    setBookingResult(result ?? { alreadyBooked: true });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Hero Image */}
      <div className="relative h-[400px] md:h-[500px] bg-gray-900">
        <img
          src={experience.image}
          alt={experience.title}
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-900" />
        </button>

        {/* Share Button */}
        <div className="absolute top-6 right-6">
          <ShareButton
            url={shareUrl}
            title={experience.title}
            text={shareText}
          />
        </div>

        {/* Status Badges */}
        <div className="absolute bottom-6 left-6 flex gap-2">
          {experience.featured && (
            <Badge variant="warning" size="lg" icon={<Star className="w-4 h-4 fill-current" />}>
              Featured
            </Badge>
          )}
          {isSoldOut && <Badge variant="default" size="lg">Sold Out</Badge>}
          {isAlmostFull && <Badge variant="danger" size="lg">Almost Full!</Badge>}
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title Card */}
            <Card>
              <CardBody className="space-y-4">
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  <Badge variant="primary" size="md">
                    {language?.flag} {language?.name}
                  </Badge>
                  <Badge variant="info" size="md">
                    {experience.skillLevel}
                  </Badge>
                  <Badge variant="default" size="md">
                    {experience.type}
                  </Badge>
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900">
                  {experience.title}
                </h1>

                {/* Teacher Info */}
                <Link
                  to={`/teacher/${teacher?.id}`}
                  className="flex items-center gap-3 group"
                >
                  <Avatar
                    src={teacher?.photo}
                    alt={teacher?.name}
                    name={teacher?.name}
                    size="lg"
                  />
                  <div>
                    <p className="font-medium text-gray-900 group-hover:text-primary-500 transition-colors">
                      Hosted by {teacher?.name}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
                      <span className="font-medium">{teacher?.rating}</span>
                      <span>({teacher?.totalReviews} reviews)</span>
                      <span>•</span>
                      <span>{teacher?.totalSessions} sessions</span>
                    </div>
                  </div>
                </Link>

                {/* Description */}
                <p className="text-lg text-gray-700 leading-relaxed">
                  {experience.description}
                </p>
              </CardBody>
            </Card>

            {/* What You'll Learn */}
            <Card>
              <CardBody>
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
                  What You'll Learn
                </h2>
                <ul className="space-y-4">
                  {experience.whatYoullLearn.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-primary-500 font-semibold text-sm">✓</span>
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardBody>
            </Card>

            {/* What's Included */}
            <Card>
              <CardBody>
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
                  What's Included
                </h2>
                <div className="flex flex-wrap gap-2">
                  {experience.included.map((item, index) => (
                    <Badge key={index} variant="secondary" size="md">
                      {item}
                    </Badge>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* Calendar Availability */}
            {experience.availableDates && experience.availableDates.length > 0 && (
              <Card>
                <CardBody>
                  <CalendarAvailability
                    availableDates={experience.availableDates}
                    spotsAvailableByDate={experience.spotsAvailableByDate}
                    selectedDate={selectedDate}
                    onDateSelect={setSelectedDate}
                  />

                  {/* Social Proof Indicators */}
                  {experience.viewingCount > 10 && (
                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-3">
                      <SocialProof
                        viewingCount={experience.viewingCount}
                        variant="viewing"
                      />
                      {experience.recentBookingCount > 0 && (
                        <SocialProof
                          recentBookingCount={experience.recentBookingCount}
                          variant="booked"
                        />
                      )}
                      <RecentlyBooked />
                    </div>
                  )}
                </CardBody>
              </Card>
            )}

            {/* Location */}
            <Card>
              <CardBody>
                <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-6">
                  Location
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{experience.location.venue}</p>
                      <p className="text-gray-600 dark:text-gray-400">{experience.location.address}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-500">{city?.name}, {city?.country}</p>
                    </div>
                  </div>

                  {/* Map Placeholder */}
                  <div className="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600">
                    <div className="text-center p-6">
                      <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600 dark:text-gray-300 font-medium mb-1">Interactive Map Coming Soon</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Google Maps integration requires API key</p>
                      <p className="text-xs text-gray-400 mt-2">
                        Location: {experience.location.lat}, {experience.location.lng}
                      </p>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Reviews */}
            {experienceReviews.length > 0 && (
              <Card>
                <CardBody>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
                      Reviews ({experienceReviews.length})
                    </h2>
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 fill-yellow-400 stroke-yellow-400" />
                      <span className="text-xl font-bold text-gray-900 dark:text-white">{averageRating}</span>
                    </div>
                  </div>

                  {/* Sort Options */}
                  <div className="mb-6">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                      Sort by:
                    </label>
                    <select
                      value={reviewSortBy}
                      onChange={(e) => setReviewSortBy(e.target.value)}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="recent">Most Recent</option>
                      <option value="highest">Highest Rating</option>
                      <option value="lowest">Lowest Rating</option>
                      <option value="helpful">Most Helpful</option>
                    </select>
                  </div>

                  <div className="space-y-6">
                    {visibleReviews.map((review) => (
                      <div
                        key={review.id}
                        className="border-b border-gray-100 dark:border-gray-700 last:border-0 pb-6 last:pb-0"
                      >
                        <div className="flex items-start gap-3 mb-4">
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
                                        : 'stroke-gray-300 dark:stroke-gray-600'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{formatDate(review.date)}</p>
                            <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
                          </div>
                        </div>

                        {/* Review Helpfulness */}
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
                      <Button
                        variant="outline"
                        onClick={() => setShowAllReviews(true)}
                      >
                        Show All {experienceReviews.length} Reviews
                      </Button>
                    </div>
                  )}
                </CardBody>
              </Card>
            )}
          </div>

          {/* Sidebar - Booking Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardBody>
                {/* Spot Counter */}
                <SpotCounter
                  spotsLeft={currentSpots}
                  totalSpots={experience.maxCapacity}
                  variant="default"
                  className="mb-6"
                />

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-4xl font-bold text-primary-500">
                      {formatPrice(experience.price)}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">/ person</span>
                  </div>

                  {/* Couple discount - selectable, not just advertised */}
                  <button
                    type="button"
                    onClick={() => setBookingForTwo((previous) => !previous)}
                    disabled={alreadyBooked || currentSpots < 2}
                    aria-pressed={bookingForTwo}
                    className={`w-full text-left rounded-lg p-4 border-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed ${
                      bookingForTwo
                        ? 'bg-secondary-100 dark:bg-secondary-900/30 border-secondary-500'
                        : 'bg-secondary-50 dark:bg-secondary-900/20 border-secondary-200 dark:border-secondary-800 hover:border-secondary-400'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Heart
                        className={`w-5 h-5 text-secondary-600 dark:text-secondary-400 ${
                          bookingForTwo ? 'fill-current' : ''
                        }`}
                      />
                      <p className="text-sm font-medium text-secondary-900 dark:text-secondary-200">
                        {bookingForTwo ? 'Booking for two' : 'Bringing someone?'}
                      </p>
                      {currentSpots < 2 && !alreadyBooked && (
                        <span className="ml-auto text-xs text-secondary-700 dark:text-secondary-400">
                          Not enough spots
                        </span>
                      )}
                    </div>
                    <p className="text-lg font-bold text-secondary-700 dark:text-secondary-300">
                      {formatPrice(couplePrice)} for 2 people
                    </p>
                    <p className="text-xs text-secondary-600 dark:text-secondary-400">
                      Save {formatPrice(discount)}! Perfect for learning together
                    </p>
                  </button>
                </div>

                {/* Details */}
                <div className="space-y-4 mb-6 pb-6 border-b border-gray-100">
                  <div className="flex items-start gap-3 text-gray-700">
                    <Calendar className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">{getDayOfWeek(experience.date)}</p>
                      <p className="text-sm text-gray-600">{formatDate(experience.date)}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-gray-700">
                    <Clock className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">{formatTime(experience.date)}</p>
                      <p className="text-sm text-gray-600">{experience.duration} minutes</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                    <Users className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">
                        {currentSpots === 0 ? 'Sold Out' : `${currentSpots} spots left`}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Max {experience.maxCapacity} people
                      </p>
                    </div>
                  </div>
                </div>

                {/* Booking Protection */}
                <BookingProtection className="mb-6" />

                {/* Actions */}
                <div className="space-y-3">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    disabled={currentSpots === 0 || alreadyBooked}
                    icon={alreadyBooked ? <CheckCircle2 className="w-4 h-4" /> : null}
                    onClick={handleBooking}
                  >
                    {currentSpots === 0
                      ? 'Sold Out'
                      : alreadyBooked
                      ? 'Booked'
                      : selectedDate
                      ? 'Book Selected Date'
                      : 'Book Now'}
                  </Button>

                  {/* Favourites already work everywhere else in the app. */}
                  <Button
                    variant={saved ? 'primary' : 'outline'}
                    size="lg"
                    className="w-full"
                    icon={<Heart className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />}
                    onClick={() => {
                      toggleFavorite(experience.id);
                      if (saved) toast.info('Removed from your saved list');
                      else toast.success('Saved for later');
                    }}
                  >
                    {saved ? 'Saved' : 'Save for Later'}
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>

        {/* Related Experiences */}
        {relatedExperiences.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-6">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedExperiences.map((exp) => (
                <ExperienceCard key={exp.id} experience={exp} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Booking confirmation - the payoff moment */}
      <AnimatePresence>
        {bookingResult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setBookingResult(null)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(event) => event.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="text-6xl mb-4"
              >
                🎉
              </motion.div>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                You're booked!
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {experience.title} on {formatDate(bookingResult.booking?.date ?? experience.date)}.
              </p>

              {bookingResult.pointsGained > 0 && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-semibold mb-4">
                  <Sparkles className="w-4 h-4" />+{bookingResult.pointsGained} points
                </div>
              )}

              {bookingResult.badgesUnlocked?.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Badge unlocked</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {bookingResult.badgesUnlocked.map((badgeId) => {
                      const badge = getBadge(badgeId);
                      return (
                        <span
                          key={badgeId}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary-100 dark:bg-secondary-900/30 text-secondary-800 dark:text-secondary-200 text-sm font-medium"
                        >
                          <span>{badge?.icon}</span>
                          {badge?.name}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 justify-center mt-2">
                <Button variant="primary" onClick={() => setBookingResult(null)}>
                  Keep browsing
                </Button>
                <Link to="/profile" className="sm:w-auto">
                  <Button variant="outline" className="w-full">
                    View my bookings
                  </Button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
