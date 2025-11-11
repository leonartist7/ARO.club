import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Clock, Users, Star, Calendar, Heart, Share2, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';
import { Card, CardBody } from '../components/ui/Card';
import ExperienceCard from '../components/features/ExperienceCard';
import experiencesData from '../data/experiences.json';
import teachersData from '../data/teachers.json';
import reviewsData from '../data/reviews.json';
import { LANGUAGES, CITIES } from '../data/constants';
import { formatPrice, calculateCouplePrice, getDiscountAmount, getSpotsLeft, calculateAverageRating } from '../utils/helpers';
import { formatDate, formatTime, getDayOfWeek } from '../utils/date';
import { useState } from 'react';

export default function ExperienceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showAllReviews, setShowAllReviews] = useState(false);

  const experience = experiencesData.find((exp) => exp.id === id);

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

  const visibleReviews = showAllReviews ? experienceReviews : experienceReviews.slice(0, 5);

  const handleBooking = () => {
    alert('Booking feature coming soon! This will integrate with Stripe for payments.');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: experience.title,
        text: experience.description,
        url: window.location.href,
      });
    } else {
      alert('Share link: ' + window.location.href);
    }
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
        <button
          onClick={handleShare}
          className="absolute top-6 right-6 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
        >
          <Share2 className="w-6 h-6 text-gray-900" />
        </button>

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

            {/* Location */}
            <Card>
              <CardBody>
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
                  Location
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">{experience.location.venue}</p>
                      <p className="text-gray-600">{experience.location.address}</p>
                      <p className="text-sm text-gray-500">{city?.name}, {city?.country}</p>
                    </div>
                  </div>

                  {/* Map Placeholder */}
                  <div className="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                    <div className="text-center p-6">
                      <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600 font-medium mb-1">Interactive Map Coming Soon</p>
                      <p className="text-sm text-gray-500">Google Maps integration requires API key</p>
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
                    <h2 className="text-2xl font-display font-bold text-gray-900">
                      Reviews ({experienceReviews.length})
                    </h2>
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 fill-yellow-400 stroke-yellow-400" />
                      <span className="text-xl font-bold text-gray-900">{averageRating}</span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {visibleReviews.map((review) => (
                      <div
                        key={review.id}
                        className="border-b border-gray-100 last:border-0 pb-6 last:pb-0"
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
                            <p className="text-sm text-gray-500 mb-2">{formatDate(review.date)}</p>
                            <p className="text-gray-700">{review.comment}</p>
                          </div>
                        </div>
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
                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-4xl font-bold text-primary-500">
                      {formatPrice(experience.price)}
                    </span>
                    <span className="text-gray-600">/ person</span>
                  </div>

                  {/* Couple Discount */}
                  <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Heart className="w-5 h-5 text-secondary-600" />
                      <p className="text-sm font-medium text-secondary-900">
                        Couple Discount Available
                      </p>
                    </div>
                    <p className="text-lg font-bold text-secondary-700">
                      {formatPrice(couplePrice)} for 2 people
                    </p>
                    <p className="text-xs text-secondary-600">
                      Save {formatPrice(discount)}! Perfect for learning together
                    </p>
                  </div>
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

                  <div className="flex items-start gap-3 text-gray-700">
                    <Users className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">
                        {isSoldOut ? 'Sold Out' : `${spotsLeft} spots left`}
                      </p>
                      <p className="text-sm text-gray-600">
                        Max {experience.maxCapacity} people
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    disabled={isSoldOut}
                    onClick={handleBooking}
                  >
                    {isSoldOut ? 'Sold Out' : 'Book Now'}
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full"
                    icon={<Heart className="w-4 h-4" />}
                    onClick={() => alert('Save feature coming soon!')}
                  >
                    Save for Later
                  </Button>
                </div>

                <p className="text-xs text-center text-gray-500 mt-4">
                  Free cancellation up to 24 hours before
                </p>
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
    </motion.div>
  );
}
