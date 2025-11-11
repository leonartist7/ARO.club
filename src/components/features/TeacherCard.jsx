import { Link } from 'react-router-dom';
import { MapPin, Star, BookOpen } from 'lucide-react';
import { Card } from '../ui/Card';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';
import { LANGUAGES, CITIES } from '../../data/constants';

/**
 * Teacher card component for displaying teacher information
 */
export default function TeacherCard({ teacher }) {
  const city = CITIES.find((c) => c.id === teacher.cityId);
  const languages = teacher.languages.map((code) =>
    LANGUAGES.find((l) => l.code === code)
  );

  return (
    <Link to={`/teacher/${teacher.id}`}>
      <Card hover className="h-full">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start gap-4 mb-4">
            <Avatar
              src={teacher.photo}
              alt={teacher.name}
              name={teacher.name}
              size="xl"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
                {teacher.name}
              </h3>
              <div className="flex items-center gap-1 mb-2">
                <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
                <span className="font-medium text-gray-900">{teacher.rating}</span>
                <span className="text-sm text-gray-500">
                  ({teacher.totalReviews} reviews)
                </span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{city?.name}</span>
              </div>
            </div>
          </div>

          {/* Languages */}
          <div className="flex flex-wrap gap-2 mb-3">
            {languages.map((lang) => (
              <Badge key={lang.code} variant="primary" size="sm">
                {lang.flag} {lang.name}
              </Badge>
            ))}
          </div>

          {/* Bio */}
          <p className="text-sm text-gray-600 mb-4 line-clamp-3">{teacher.bio}</p>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm pt-4 border-t border-gray-100">
            <div className="flex items-center gap-1 text-gray-600">
              <BookOpen className="w-4 h-4" />
              <span>{teacher.totalSessions} sessions</span>
            </div>
            <div className="text-primary-500 font-medium">
              View Profile →
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
