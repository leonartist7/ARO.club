import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Users, Star, Eye } from 'lucide-react';
import { Card } from '../ui/Card';
import Badge from '../ui/Badge';
import Avatar from '../ui/Avatar';
import FavoriteButton from '../ui/FavoriteButton';
import SpotCounter from '../ui/SpotCounter';
import CompareButton from '../ui/CompareButton';
import QuickViewModal from '../QuickViewModal';
import { formatPrice, getSpotsLeft, isAlmostFull } from '../../utils/helpers';
import { formatDate, formatTime } from '../../utils/date';
import { LANGUAGES, CITIES } from '../../data/constants';
import teachersData from '../../data/teachers.json';
import { useLanguage } from '../../contexts/LanguageContext';

/**
 * Experience card component for displaying experience information
 */
export default function ExperienceCard({ experience, compact = false }) {
  const { t } = useLanguage();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const teacher = teachersData.find((t) => t.id === experience.teacherId);
  const city = CITIES.find((c) => c.id === experience.cityId);
  const language = LANGUAGES.find((l) => l.code === experience.language);
  const spotsLeft = getSpotsLeft(experience.maxCapacity, experience.bookedSpots);
  const almostFull = isAlmostFull(experience.maxCapacity, experience.bookedSpots);

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsQuickViewOpen(true);
  };

  return (
    <>
      <Link to={`/experience/${experience.id}`}>
        <Card hover className="h-full flex flex-col">
          {/* Image */}
          <div className="relative h-48 overflow-hidden group">
            <img
              src={experience.image}
              alt={experience.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            />
            {experience.featured && (
              <div className="absolute top-3 left-3">
                <Badge variant="warning" icon={<Star className="w-3 h-3 fill-current" />}>
                  {t('experienceCard.featured')}
                </Badge>
              </div>
            )}
            {almostFull && spotsLeft > 0 && (
              <div className="absolute top-3 right-3">
                <Badge variant="danger">{t('experienceCard.almostFull')}</Badge>
              </div>
            )}
            {spotsLeft === 0 && (
              <div className="absolute top-3 right-3">
                <Badge variant="default">{t('experienceCard.soldOut')}</Badge>
              </div>
            )}

            {/* Action Buttons */}
            <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={handleQuickView}
                className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all shadow-md hover:shadow-lg"
                aria-label="Quick view"
              >
                <Eye className="w-4 h-4 text-gray-900 dark:text-white" />
              </button>
              <FavoriteButton experienceId={experience.id} size="sm" />
            </div>
          </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          {/* Language & Type */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">{language?.flag}</span>
            <Badge variant="default" size="sm">
              {language?.name}
            </Badge>
            <Badge variant="info" size="sm">
              {experience.skillLevel}
            </Badge>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 dark:text-white">
            {experience.title}
          </h3>

          {/* Description */}
          {!compact && (
            <p className="text-sm text-gray-600 mb-3 line-clamp-2 dark:text-gray-400">
              {experience.description}
            </p>
          )}

          {/* Teacher */}
          <div className="flex items-center gap-2 mb-3">
            <Avatar src={teacher?.photo} alt={teacher?.name} size="sm" name={teacher?.name} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                {teacher?.name}
              </p>
              <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                <Star className="w-3 h-3 fill-yellow-400 stroke-yellow-400" />
                <span>{teacher?.rating}</span>
                <span>({teacher?.totalReviews})</span>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-1.5 mb-3 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{city?.name}, {city?.country}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 flex-shrink-0" />
              <span>{formatDate(experience.date)} • {formatTime(experience.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 flex-shrink-0" />
              <span>
                {spotsLeft > 0 ? `${spotsLeft} ${t('experienceCard.spotsLeft')}` : t('experienceCard.soldOut')}
              </span>
            </div>
          </div>

          {/* Spot Counter */}
          <div className="mb-3">
            <SpotCounter
              spotsLeft={spotsLeft}
              totalSpots={experience.maxCapacity}
              variant="compact"
            />
          </div>

          {/* Footer */}
          <div className="mt-auto pt-3 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-2xl font-bold text-primary-500">
                  {formatPrice(experience.price)}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{t('experienceCard.perPerson')}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
                  {formatPrice(experience.price * 1.7)} {t('experienceCard.for2')}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{t('experienceCard.save15')}</div>
              </div>
            </div>

            {/* Compare Button */}
            <CompareButton
              experienceId={experience.id}
              size="sm"
              className="w-full"
            />
          </div>
        </div>
      </Card>
    </Link>

    {/* Quick View Modal */}
    <QuickViewModal
      experience={experience}
      isOpen={isQuickViewOpen}
      onClose={() => setIsQuickViewOpen(false)}
    />
  </>
  );
}
