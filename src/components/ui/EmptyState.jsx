import { cn } from '../../utils/cn';
import Button from './Button';
import CocoMascot from './CocoMascot';

export default function EmptyState({
  icon,
  pose,
  title,
  description,
  action,
  className,
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center py-12 px-4',
        className
      )}
    >
      {pose ? (
        <div className="mb-4">
          <CocoMascot pose={pose} size="lg" />
        </div>
      ) : icon ? (
        <div className="mb-4 text-gray-400 dark:text-gray-600" aria-hidden="true">
          {icon}
        </div>
      ) : null}

      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-2">
        {title}
      </h3>

      {description && (
        <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md text-base">
          {description}
        </p>
      )}

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
