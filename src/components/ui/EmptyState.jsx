import { cn } from '../../utils/cn';
import Button from './Button';

/**
 * EmptyState component for displaying when no content is available
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.icon - Icon component from lucide-react
 * @param {string} props.title - Main heading text
 * @param {string} props.description - Description text
 * @param {Object} [props.action] - Optional action button config
 * @param {string} props.action.label - Button label
 * @param {Function} props.action.onClick - Button click handler
 * @param {string} [props.action.href] - Optional link instead of onClick
 * @param {string} [props.className] - Additional CSS classes
 *
 * @example
 * <EmptyState
 *   icon={<Package className="w-12 h-12" />}
 *   title="No experiences found"
 *   description="Try adjusting your filters or search terms"
 *   action={{
 *     label: "Clear filters",
 *     onClick: handleClearFilters
 *   }}
 * />
 */
export default function EmptyState({ icon, title, description, action, className }) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center py-12 px-4',
        className
      )}
    >
      {/* Icon */}
      {icon && (
        <div className="mb-4 text-gray-400 dark:text-gray-600">
          {icon}
        </div>
      )}

      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
          {description}
        </p>
      )}

      {/* Action Button */}
      {action && (
        <div>
          {action.href ? (
            <a href={action.href}>
              <Button variant="primary">{action.label}</Button>
            </a>
          ) : (
            <Button variant="primary" onClick={action.onClick}>
              {action.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
