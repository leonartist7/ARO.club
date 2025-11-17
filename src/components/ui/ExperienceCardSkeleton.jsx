import { Card } from './Card';
import Skeleton, { SkeletonText, SkeletonTitle, SkeletonAvatar, SkeletonImage } from './Skeleton';

/**
 * Skeleton loading component for ExperienceCard
 * Matches the layout of the actual ExperienceCard component
 */
export default function ExperienceCardSkeleton() {
  return (
    <Card className="h-full flex flex-col">
      {/* Image Skeleton */}
      <SkeletonImage className="h-48" />

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Language & Type Badges */}
        <div className="flex items-center gap-2 mb-2">
          <Skeleton className="w-16 h-6 rounded-full" />
          <Skeleton className="w-20 h-6 rounded-full" />
        </div>

        {/* Title */}
        <SkeletonTitle className="mb-2" />

        {/* Description */}
        <div className="space-y-2 mb-3">
          <SkeletonText />
          <SkeletonText width="w-4/5" />
        </div>

        {/* Teacher Info */}
        <div className="flex items-center gap-2 mb-3">
          <SkeletonAvatar size="sm" />
          <div className="flex-1 space-y-1.5">
            <SkeletonText width="w-32" />
            <SkeletonText width="w-20" />
          </div>
        </div>

        {/* Details */}
        <div className="space-y-2 mb-3">
          <SkeletonText width="w-48" />
          <SkeletonText width="w-40" />
          <SkeletonText width="w-32" />
        </div>

        {/* Footer */}
        <div className="mt-auto pt-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <div className="space-y-1">
            <Skeleton className="w-20 h-8" />
            <SkeletonText width="w-16" />
          </div>
          <div className="space-y-1 text-right">
            <SkeletonText width="w-20" />
            <SkeletonText width="w-16" />
          </div>
        </div>
      </div>
    </Card>
  );
}
