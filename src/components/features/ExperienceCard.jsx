import { Link } from 'react-router-dom';
import { MapPin, Clock, Users, Star } from 'lucide-react';
import { Card } from '../ui/Card';
import Badge from '../ui/Badge';
import Avatar from '../ui/Avatar';
import { formatPrice, getSpotsLeft, isAlmostFull } from '../../utils/helpers';
import { formatDate, formatTime } from '../../utils/date';
import { LANGUAGES, CITIES } from '../../data/constants';
import teachersData from '../../data/teachers.json';

/**
 * Experience card component for displaying experience information
 */
export default function ExperienceCard({ experience, compact = false }) {
  const teacher = teachersData.find((t) => t.id === experience.teacherId);
  const city = CITIES.find((c) => c.id === experience.cityId);
  const language = LANGUAGES.find((l) => l.code === experience.language);
  const spotsLeft = getSpotsLeft(experience.maxCapacity, experience.bookedSpots);
  const almostFull = isAlmostFull(experience.maxCapacity, experience.bookedSpots);

  return (
    <Link to={`/experience/${experience.id}`}>
      <Card hover className="h-full flex flex-col">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={experience.image}
            alt={experience.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
          {experience.featured && (
            <div className="absolute top-3 left-3">
              <Badge variant="warning" icon={<Star className="w-3 h-3 fill-current" />}>
                Featured
              </Badge>
            </div>
          )}
          {almostFull && spotsLeft > 0 && (
            <div className="absolute top-3 right-3">
              <Badge variant="danger">Almost Full!</Badge>
            </div>
          )}
          {spotsLeft === 0 && (
            <div className="absolute top-3 right-3">
              <Badge variant="default">Sold Out</Badge>
            </div>
          )}
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
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {experience.title}
          </h3>

          {/* Description */}
          {!compact && (
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {experience.description}
            </p>
          )}

          {/* Teacher */}
          <div className="flex items-center gap-2 mb-3">
            <Avatar src={teacher?.photo} alt={teacher?.name} size="sm" name={teacher?.name} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {teacher?.name}
              </p>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Star className="w-3 h-3 fill-yellow-400 stroke-yellow-400" />
                <span>{teacher?.rating}</span>
                <span>({teacher?.totalReviews})</span>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-1.5 mb-3 text-sm text-gray-600">
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
                {spotsLeft > 0 ? `${spotsLeft} spots left` : 'Sold out'}
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-primary-500">
                {formatPrice(experience.price)}
              </div>
              <div className="text-xs text-gray-500">per person</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-secondary-600">
                {formatPrice(experience.price * 1.7)} for 2
              </div>
              <div className="text-xs text-gray-500">Save 15%!</div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
