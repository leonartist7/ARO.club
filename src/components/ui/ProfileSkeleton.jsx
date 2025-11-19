import { Card, CardBody, CardHeader } from './Card';
import Skeleton, { SkeletonText, SkeletonTitle, SkeletonAvatar, SkeletonButton } from './Skeleton';

/**
 * Skeleton loading component for Profile pages
 * Used in StudentProfilePage and TeacherProfilePage while data is loading
 */
export default function ProfileSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Header Card */}
        <Card>
          <CardBody className="space-y-6">
            {/* Avatar and Basic Info */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <SkeletonAvatar size="xl" className="w-24 h-24" />
              <div className="flex-1 space-y-3 text-center sm:text-left w-full">
                <SkeletonTitle width="w-48 mx-auto sm:mx-0" />
                <SkeletonText width="w-64 mx-auto sm:mx-0" />
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                  <Skeleton className="w-20 h-6 rounded-full" />
                  <Skeleton className="w-24 h-6 rounded-full" />
                  <Skeleton className="w-20 h-6 rounded-full" />
                </div>
              </div>
              <div className="flex gap-2">
                <SkeletonButton width="w-28" />
                <SkeletonButton width="w-28" />
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <SkeletonText />
              <SkeletonText />
              <SkeletonText width="w-5/6" />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="text-center space-y-2">
                  <Skeleton className="w-16 h-8 mx-auto" />
                  <SkeletonText width="w-20 mx-auto" />
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Additional Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <SkeletonTitle width="w-32" />
            </CardHeader>
            <CardBody className="space-y-3">
              <SkeletonText />
              <SkeletonText />
              <SkeletonText width="w-4/5" />
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <SkeletonTitle width="w-32" />
            </CardHeader>
            <CardBody className="space-y-3">
              <SkeletonText />
              <SkeletonText />
              <SkeletonText width="w-4/5" />
            </CardBody>
          </Card>
        </div>

        {/* Content Grid */}
        <Card>
          <CardHeader>
            <SkeletonTitle width="w-40" />
          </CardHeader>
          <CardBody>
            <div className="grid md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-2 p-4 border border-gray-100 dark:border-gray-700 rounded-lg">
                  <SkeletonText width="w-3/4" />
                  <SkeletonText />
                  <SkeletonText width="w-1/2" />
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
