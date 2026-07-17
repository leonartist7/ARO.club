import { Link } from 'react-router-dom';
import { MapPin, Star, BookOpen } from 'lucide-react';
import { Card } from '../ui/Card';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';
import TierBadge from '../ui/TierBadge';
import { LANGUAGES, CITIES } from '../../data/constants';

export default function TeacherCard({ teacher }) {
  const city = CITIES.find((c) => c.id === teacher.cityId);
  const languages = teacher.languages.map((code) =>
    LANGUAGES.find((l) => l.code === code)
  );

  return (
    <Link
      to={`/teacher/${teacher.id}`}
      className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-xl"
    >
      <Card hover className="h-full">
        <div className="p-6">
          <div className="flex items-start gap-4 mb-4">
            <Avatar
              src={teacher.photo}
              alt={teacher.name}
              name={teacher.name}
              size="xl"
            />
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 truncate">
                  {teacher.name}
                </h3>
                <TierBadge tier={teacher.tier} />
              </div>
              <div className="flex items-center gap-1 mb-2">
                <Star className="w-4 h-4 fill-accent-500 stroke-accent-500" aria-hidden="true" />
                <span className="font-medium text-gray-900 dark:text-gray-50">{teacher.rating}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  ({teacher.totalReviews} reviews)
                </span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                <MapPin className="w-4 h-4" aria-hidden="true" />
                <span>{city?.name}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            {languages.map((lang) => (
              <Badge key={lang.code} variant="primary" size="sm">
                {lang.flag} {lang.name}
              </Badge>
            ))}
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{teacher.bio}</p>

          <div className="flex items-center justify-between text-sm pt-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
              <BookOpen className="w-4 h-4" aria-hidden="true" />
              <span>{teacher.totalSessions} sessions</span>
            </div>
            <div className="text-primary-700 dark:text-primary-300 font-medium">
              View Profile ?
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
