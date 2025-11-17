import { useState } from 'react';
import { Card, CardBody, CardHeader } from '../ui/Card';
import Button from '../ui/Button';
import EmptyState from '../ui/EmptyState';
import ErrorState from '../ui/ErrorState';
import ExperienceCardSkeleton from '../ui/ExperienceCardSkeleton';
import TeacherCardSkeleton from '../ui/TeacherCardSkeleton';
import Skeleton, { SkeletonText, SkeletonTitle, SkeletonAvatar } from '../ui/Skeleton';
import { Package, Search, RefreshCw } from 'lucide-react';
import ToastDemo from './ToastDemo';

/**
 * ComponentShowcase - Demo page for all Module 1 components
 * Add this to a route to see all components in action
 *
 * @example
 * // In routes.jsx, add:
 * const ComponentShowcase = lazy(() => import('../components/demo/ComponentShowcase'));
 *
 * // Then add route:
 * {
 *   path: 'demo',
 *   element: <ComponentShowcase />,
 * }
 */
export default function ComponentShowcase() {
  const [showSkeletons, setShowSkeletons] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Module 1: Component Showcase
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Foundation & System Components Demo
          </p>
        </div>

        <div className="space-y-12">
          {/* Toast Demo */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              1. Toast Notifications
            </h2>
            <ToastDemo />
          </section>

          {/* Skeleton Loading */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              2. Skeleton Loading States
            </h2>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Loading Skeletons
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowSkeletons(!showSkeletons)}
                  >
                    {showSkeletons ? 'Hide' : 'Show'} Skeletons
                  </Button>
                </div>
              </CardHeader>
              <CardBody>
                {showSkeletons ? (
                  <div className="space-y-6">
                    {/* Basic Skeletons */}
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">
                        Basic Components
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <SkeletonAvatar size="lg" />
                          <div className="flex-1 space-y-2">
                            <SkeletonTitle />
                            <SkeletonText />
                            <SkeletonText width="w-3/4" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Skeletons */}
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">
                        Card Skeletons
                      </h4>
                      <div className="grid md:grid-cols-2 gap-6">
                        <ExperienceCardSkeleton />
                        <TeacherCardSkeleton />
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-600 dark:text-gray-400 text-center py-8">
                    Click "Show Skeletons" to see loading states
                  </p>
                )}
              </CardBody>
            </Card>
          </section>

          {/* Empty States */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              3. Empty States
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    With Action Button
                  </h3>
                </CardHeader>
                <CardBody>
                  <EmptyState
                    icon={<Package className="w-12 h-12" />}
                    title="No experiences found"
                    description="Try adjusting your search filters or browse all available experiences."
                    action={{
                      label: 'Clear Filters',
                      onClick: () => alert('Filters cleared!'),
                    }}
                  />
                </CardBody>
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Without Action
                  </h3>
                </CardHeader>
                <CardBody>
                  <EmptyState
                    icon={<Search className="w-12 h-12" />}
                    title="No results found"
                    description="We couldn't find any matches for your search."
                  />
                </CardBody>
              </Card>
            </div>
          </section>

          {/* Error States */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              4. Error States
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Network Error
                  </h3>
                </CardHeader>
                <CardBody>
                  <ErrorState
                    type="network"
                    onRetry={() => alert('Retrying...')}
                  />
                </CardBody>
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Not Found
                  </h3>
                </CardHeader>
                <CardBody>
                  <ErrorState type="notFound" />
                </CardBody>
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Server Error
                  </h3>
                </CardHeader>
                <CardBody>
                  <ErrorState
                    type="server"
                    onRetry={() => alert('Retrying...')}
                    retryLabel="Try Again"
                  />
                </CardBody>
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Custom Error
                  </h3>
                </CardHeader>
                <CardBody>
                  <ErrorState
                    title="Custom Error Title"
                    description="This is a custom error message with a custom action."
                    action={
                      <Button variant="outline" icon={<RefreshCw className="w-4 h-4" />}>
                        Custom Action
                      </Button>
                    }
                  />
                </CardBody>
              </Card>
            </div>
          </section>

          {/* Dark Mode & Accessibility */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              5. Dark Mode & Accessibility
            </h2>
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Features
                </h3>
              </CardHeader>
              <CardBody className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-lg">🌙</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                      Dark Mode Toggle
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Look for the sun/moon icon in the header to toggle themes. Your preference is saved to localStorage.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-lg">⌨️</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                      Keyboard Accessibility
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Press Tab to navigate. A "Skip to content" link appears for keyboard users to bypass navigation.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-lg">♿</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                      ARIA Labels & Screen Readers
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      All interactive elements have proper ARIA labels for screen reader support.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-lg">🎨</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                      Focus Visible Styles
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      All focusable elements show clear focus indicators for keyboard navigation.
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}
