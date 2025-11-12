import { Search, Calendar, BookOpen, Users, MapPin, Heart, Award, MessageSquare } from 'lucide-react';
import Button from './Button';
import { Card, CardBody } from './Card';
import { Link } from 'react-router-dom';

/**
 * Reusable empty state component for different scenarios
 */
export default function EmptyState({
  icon: CustomIcon,
  iconType = 'search',
  title,
  description,
  action,
  actionLabel,
  actionIcon,
  secondaryAction,
  secondaryActionLabel,
  compact = false,
  className = '',
}) {
  // Default icons based on type
  const iconMap = {
    search: Search,
    calendar: Calendar,
    bookings: BookOpen,
    teachers: Users,
    location: MapPin,
    favorites: Heart,
    badges: Award,
    reviews: MessageSquare,
  };

  const Icon = CustomIcon || iconMap[iconType] || Search;

  if (compact) {
    // Compact version (no card wrapper)
    return (
      <div className={`text-center py-8 ${className}`}>
        <Icon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        {title && <p className="text-gray-700 font-medium mb-2">{title}</p>}
        {description && <p className="text-sm text-gray-500 mb-4">{description}</p>}
        {action && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {typeof action === 'string' ? (
              <Link to={action}>
                <Button variant="primary" icon={actionIcon}>
                  {actionLabel || 'Take Action'}
                </Button>
              </Link>
            ) : (
              <Button variant="primary" onClick={action} icon={actionIcon}>
                {actionLabel || 'Take Action'}
              </Button>
            )}
            {secondaryAction && (
              typeof secondaryAction === 'string' ? (
                <Link to={secondaryAction}>
                  <Button variant="outline">{secondaryActionLabel || 'Learn More'}</Button>
                </Link>
              ) : (
                <Button variant="outline" onClick={secondaryAction}>
                  {secondaryActionLabel || 'Learn More'}
                </Button>
              )
            )}
          </div>
        )}
      </div>
    );
  }

  // Full version (with card wrapper)
  return (
    <Card className={className}>
      <CardBody className="text-center py-12">
        <Icon className="w-16 h-16 text-gray-400 mx-auto mb-6" />
        {title && <h3 className="text-xl font-display font-bold text-gray-900 mb-3">{title}</h3>}
        {description && (
          <p className="text-gray-600 mb-6 max-w-md mx-auto">{description}</p>
        )}
        {action && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {typeof action === 'string' ? (
              <Link to={action}>
                <Button variant="primary" size="lg" icon={actionIcon}>
                  {actionLabel || 'Take Action'}
                </Button>
              </Link>
            ) : (
              <Button variant="primary" size="lg" onClick={action} icon={actionIcon}>
                {actionLabel || 'Take Action'}
              </Button>
            )}
            {secondaryAction && (
              typeof secondaryAction === 'string' ? (
                <Link to={secondaryAction}>
                  <Button variant="outline" size="lg">
                    {secondaryActionLabel || 'Learn More'}
                  </Button>
                </Link>
              ) : (
                <Button variant="outline" size="lg" onClick={secondaryAction}>
                  {secondaryActionLabel || 'Learn More'}
                </Button>
              )
            )}
          </div>
        )}
      </CardBody>
    </Card>
  );
}

/**
 * Pre-configured empty state components for common scenarios
 */
export function NoResults({ searchQuery, onClear }) {
  return (
    <EmptyState
      iconType="search"
      title="No results found"
      description={
        searchQuery
          ? `We couldn't find any results for "${searchQuery}". Try adjusting your filters or search terms.`
          : "We couldn't find any results matching your criteria. Try adjusting your filters."
      }
      action={onClear}
      actionLabel="Clear Filters"
    />
  );
}

export function NoUpcomingBookings() {
  return (
    <EmptyState
      iconType="calendar"
      title="No upcoming experiences"
      description="You don't have any upcoming language learning experiences. Start exploring to find your next adventure!"
      action="/explore"
      actionLabel="Browse Experiences"
      actionIcon={<Search className="w-4 h-4" />}
    />
  );
}

export function NoPastBookings() {
  return (
    <EmptyState
      iconType="bookings"
      title="No past experiences yet"
      description="Once you complete your first language learning experience, it will appear here."
      action="/explore"
      actionLabel="Find an Experience"
    />
  );
}

export function NoFavoriteTeachers() {
  return (
    <EmptyState
      iconType="favorites"
      title="No favorite teachers yet"
      description="Save your favorite teachers to easily find and book with them again."
      action="/explore"
      actionLabel="Discover Teachers"
    />
  );
}

export function NoReviews() {
  return (
    <EmptyState
      iconType="reviews"
      title="No reviews yet"
      description="Be the first to share your experience and help others make informed decisions!"
      compact
    />
  );
}

export function NoBadgesEarned() {
  return (
    <EmptyState
      iconType="badges"
      title="No badges earned yet"
      description="Complete experiences and achieve milestones to unlock badges!"
      action="/how-it-works"
      actionLabel="Learn How"
      compact
    />
  );
}
