import { Card } from './Card';
import Skeleton, { SkeletonText, SkeletonTitle, SkeletonAvatar } from './Skeleton';

/**
 * Skeleton loading component for TeacherCard
 * Matches the layout of the actual TeacherCard component
 */
export default function TeacherCardSkeleton() {
  return (
    <Card className="h-full">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <SkeletonAvatar size="xl" />
          <div className="flex-1 space-y-2">
            <SkeletonTitle width="w-40" />
            <SkeletonText width="w-32" />
            <SkeletonText width="w-28" />
          </div>
        </div>

        {/* Language Badges */}
        <div className="flex flex-wrap gap-2 mb-3">
          <Skeleton className="w-20 h-6 rounded-full" />
          <Skeleton className="w-24 h-6 rounded-full" />
          <Skeleton className="w-22 h-6 rounded-full" />
        </div>

        {/* Bio */}
        <div className="space-y-2 mb-4">
          <SkeletonText />
          <SkeletonText />
          <SkeletonText width="w-3/4" />
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
          <SkeletonText width="w-28" />
          <SkeletonText width="w-24" />
        </div>
      </div>
    </Card>
  );
}
