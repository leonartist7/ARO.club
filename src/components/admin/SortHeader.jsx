import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';

/**
 * Sortable table header cell. `onSort(col)` is called with this cell's column
 * key; the parent decides whether to toggle direction or switch columns.
 */
export default function SortHeader({ label, col, sortBy, asc, onSort, className = '' }) {
  const active = sortBy === col;
  return (
    <th className={`px-4 py-3 font-medium text-gray-500 dark:text-gray-400 ${className}`}>
      <button
        type="button"
        onClick={() => onSort(col)}
        className="inline-flex items-center gap-1 hover:text-gray-700 dark:hover:text-gray-200"
      >
        {label}
        {active ? (
          asc ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />
        ) : (
          <ChevronsUpDown className="h-3.5 w-3.5 opacity-40" />
        )}
      </button>
    </th>
  );
}
