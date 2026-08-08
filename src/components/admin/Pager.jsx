import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../ui/Button';

/**
 * Presentational pagination footer shared by admin tables.
 * Renders nothing when there is a single page.
 */
export default function Pager({ page, totalPages, onPrev, onNext }) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 dark:border-gray-700">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Page {page} of {totalPages}
      </p>
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="ghost"
          disabled={page <= 1}
          icon={<ChevronLeft className="h-4 w-4" />}
          onClick={onPrev}
        />
        <Button
          size="sm"
          variant="ghost"
          disabled={page >= totalPages}
          icon={<ChevronRight className="h-4 w-4" />}
          onClick={onNext}
        />
      </div>
    </div>
  );
}
