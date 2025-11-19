import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Clock, Users, Star, Calendar, Heart } from 'lucide-react';
import Button from './ui/Button';
import Badge from './ui/Badge';
import Avatar from './ui/Avatar';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';
import { useToast } from '../hooks/useToast';
import { formatPrice, getSpotsLeft, isAlmostFull } from '../utils/helpers';
import { formatDate, formatTime } from '../utils/date';
import { LANGUAGES, CITIES } from '../data/constants';
import teachersData from '../data/teachers.json';

/**
 * QuickViewModal - Full-screen modal for previewing experience details
 * without navigation
 *
 * @param {object} experience - The experience to display
 * @param {boolean} isOpen - Whether the modal is open
 * @param {function} onClose - Function to call when closing
 */
export default function QuickViewModal({ experience, isOpen, onClose }) {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { showToast } = useToast();
  const [portalElement, setPortalElement] = useState(null);

  useEffect(() => {
    setPortalElement(document.body);
  }, []);

  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll
      document.body.style.overflow = 'hidden';

      // Close on Escape key
      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscape);

      return () => {
        document.body.style.overflow = 'unset';
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen, onClose]);

  if (!experience || !portalElement) return null;

  const teacher = teachersData.find((t) => t.id === experience.teacherId);
  const city = CITIES.find((c) => c.id === experience.cityId);
  const language = LANGUAGES.find((l) => l.code === experience.language);
  const spotsLeft = getSpotsLeft(experience.maxCapacity, experience.bookedSpots);
  const almostFull = isAlmostFull(experience.maxCapacity, experience.bookedSpots);
  const favorited = isFavorite(experience.id);

  const handleBookNow = () => {
    navigate(`/experience/${experience.id}`);
    onClose();
  };

  const handleToggleFavorite = () => {
    const nowFavorited = toggleFavorite(experience.id);
    showToast(
      nowFavorited ? 'Added to favorites!' : 'Removed from favorites',
      nowFavorited ? 'success' : 'info'
    );
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="quick-view-title"
          >
            <div
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors z-10"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-gray-900 dark:text-white" />
              </button>

              {/* Image */}
              <div className="relative h-64 md:h-80 overflow-hidden rounded-t-2xl">
                <img
                  src={experience.image}
                  alt={experience.title}
                  className="w-full h-full object-cover"
                />
                {experience.featured && (
                  <div className="absolute top-4 left-4">
                    <Badge variant="warning" icon={<Star className="w-3 h-3 fill-current" />}>
                      Featured
                    </Badge>
                  </div>
                )}
                {almostFull && spotsLeft > 0 && (
                  <div className="absolute top-4 right-16">
                    <Badge variant="danger">Almost Full!</Badge>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 space-y-6">
                {/* Header */}
                <div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="primary">
                      {language?.flag} {language?.name}
                    </Badge>
                    <Badge variant="info">{experience.skillLevel}</Badge>
                    <Badge variant="default">{experience.type}</Badge>
                  </div>

                  <h2
                    id="quick-view-title"
                    className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-white mb-4"
                  >
                    {experience.title}
                  </h2>

                  {/* Teacher */}
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar
                      src={teacher?.photo}
                      alt={teacher?.name}
                      name={teacher?.name}
                      size="md"
                    />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        Hosted by {teacher?.name}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
                        <span>{teacher?.rating}</span>
                        <span>({teacher?.totalReviews} reviews)</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {experience.description}
                  </p>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Location</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {city?.name}, {city?.country}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Date</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {formatDate(experience.date)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Time</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {formatTime(experience.date)} ({experience.duration} min)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Availability
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {spotsLeft > 0 ? `${spotsLeft} spots left` : 'Sold out'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* What You'll Learn */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    What You'll Learn
                  </h3>
                  <ul className="space-y-2">
                    {experience.whatYoullLearn.slice(0, 3).map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <span className="text-primary-500 mt-0.5">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pricing & Actions */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-3xl font-bold text-primary-500">
                        {formatPrice(experience.price)}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">per person</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-secondary-600 dark:text-secondary-400">
                        {formatPrice(experience.price * 1.7)} for 2
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Save 15%!</div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="primary"
                      size="lg"
                      className="flex-1"
                      onClick={handleBookNow}
                      disabled={spotsLeft === 0}
                    >
                      {spotsLeft === 0 ? 'Sold Out' : 'Book Now'}
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={handleToggleFavorite}
                      icon={
                        <Heart
                          className={favorited ? 'fill-red-500 stroke-red-500' : ''}
                        />
                      }
                      aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      {favorited ? 'Saved' : 'Save'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, portalElement);
}
