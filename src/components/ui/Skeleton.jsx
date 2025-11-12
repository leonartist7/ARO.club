/**
 * Base Skeleton component for loading states
 */
export function Skeleton({ className = '', width, height, circle = false }) {
  const style = {
    width: width || '100%',
    height: height || '1rem',
  };

  return (
    <div
      className={`animate-pulse bg-gray-200 ${circle ? 'rounded-full' : 'rounded-md'} ${className}`}
      style={style}
    />
  );
}

/**
 * Skeleton for ExperienceCard
 */
export function ExperienceCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Image skeleton */}
      <Skeleton className="w-full h-48" />

      <div className="p-4 space-y-3">
        {/* Badges */}
        <div className="flex gap-2">
          <Skeleton width="60px" height="24px" />
          <Skeleton width="80px" height="24px" />
        </div>

        {/* Title */}
        <Skeleton className="w-full" height="24px" />
        <Skeleton className="w-3/4" height="24px" />

        {/* Teacher info */}
        <div className="flex items-center gap-2 pt-2">
          <Skeleton circle width="32px" height="32px" />
          <div className="flex-1 space-y-1">
            <Skeleton className="w-24" height="14px" />
            <Skeleton className="w-32" height="12px" />
          </div>
        </div>

        {/* Details */}
        <div className="space-y-2 pt-2">
          <Skeleton className="w-full" height="12px" />
          <Skeleton className="w-2/3" height="12px" />
        </div>

        {/* Price */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <Skeleton width="80px" height="20px" />
          <Skeleton width="60px" height="12px" />
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton for TeacherCard
 */
export function TeacherCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Avatar and basic info */}
      <div className="flex items-start gap-4 mb-4">
        <Skeleton circle width="64px" height="64px" />
        <div className="flex-1 space-y-2">
          <Skeleton className="w-32" height="20px" />
          <Skeleton className="w-24" height="14px" />
          <div className="flex items-center gap-1">
            <Skeleton width="60px" height="14px" />
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="space-y-2 mb-4">
        <Skeleton className="w-full" height="12px" />
        <Skeleton className="w-full" height="12px" />
        <Skeleton className="w-3/4" height="12px" />
      </div>

      {/* Languages/Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Skeleton width="60px" height="24px" />
        <Skeleton width="70px" height="24px" />
        <Skeleton width="65px" height="24px" />
      </div>

      {/* Button */}
      <Skeleton className="w-full" height="40px" />
    </div>
  );
}

/**
 * Skeleton for ProfilePage header
 */
export function ProfileHeaderSkeleton() {
  return (
    <div className="bg-gradient-to-br from-primary-500 to-secondary-500 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* Avatar */}
          <Skeleton circle width="120px" height="120px" className="bg-white/20" />

          {/* Info */}
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3">
              <Skeleton width="200px" height="36px" className="bg-white/20" />
              <Skeleton width="60px" height="24px" className="bg-white/20" />
            </div>
            <Skeleton width="150px" height="20px" className="bg-white/20" />
            <Skeleton width="180px" height="16px" className="bg-white/20" />
            <div className="flex gap-4">
              <Skeleton width="80px" height="16px" className="bg-white/20" />
              <Skeleton width="80px" height="16px" className="bg-white/20" />
              <Skeleton width="80px" height="16px" className="bg-white/20" />
            </div>
          </div>

          {/* Button */}
          <Skeleton width="120px" height="40px" className="bg-white/20" />
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton for review card
 */
export function ReviewSkeleton() {
  return (
    <div className="border-b border-gray-100 pb-6">
      <div className="flex items-start gap-3">
        <Skeleton circle width="40px" height="40px" />
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <Skeleton width="120px" height="16px" />
            <Skeleton width="80px" height="16px" />
          </div>
          <Skeleton width="100px" height="12px" />
          <div className="space-y-1 pt-2">
            <Skeleton className="w-full" height="12px" />
            <Skeleton className="w-full" height="12px" />
            <Skeleton className="w-2/3" height="12px" />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton for table row
 */
export function TableRowSkeleton({ columns = 4 }) {
  return (
    <tr className="border-b border-gray-100">
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <Skeleton height="16px" />
        </td>
      ))}
    </tr>
  );
}

/**
 * Skeleton for stats card
 */
export function StatsCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="space-y-2 flex-1">
          <Skeleton width="100px" height="14px" />
          <Skeleton width="80px" height="32px" />
        </div>
        <Skeleton circle width="48px" height="48px" />
      </div>
      <Skeleton width="120px" height="12px" />
    </div>
  );
}

/**
 * Skeleton for leaderboard entry
 */
export function LeaderboardEntrySkeleton() {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200">
      <Skeleton width="40px" height="40px" className="flex-shrink-0" />
      <Skeleton circle width="48px" height="48px" />
      <div className="flex-1 space-y-2">
        <Skeleton width="150px" height="16px" />
        <Skeleton width="100px" height="12px" />
      </div>
      <Skeleton width="80px" height="24px" />
    </div>
  );
}

/**
 * Grid of experience card skeletons
 */
export function ExperienceGridSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ExperienceCardSkeleton key={i} />
      ))}
    </div>
  );
}

/**
 * List of review skeletons
 */
export function ReviewListSkeleton({ count = 3 }) {
  return (
    <div className="space-y-6">
      {Array.from({ length: count }).map((_, i) => (
        <ReviewSkeleton key={i} />
      ))}
    </div>
  );
}
