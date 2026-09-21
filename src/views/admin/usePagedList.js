import { useEffect, useState } from 'react';
import { ADMIN_PAGE_SIZE } from '../../lib/admin';

/**
 * Drives a paginated admin sub-list. `fetcher` must be a stable callback
 * (wrap it in useCallback) that takes a page number and returns a Supabase
 * `{ data, count, error }` result. Refetches whenever `fetcher` or the page
 * changes; in-flight results are discarded if the inputs change first.
 */
export function usePagedList(fetcher) {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetcher(page).then(({ data: rows, count, error: err }) => {
      if (cancelled) return;
      if (err) setError(err);
      else {
        setData(rows ?? []);
        setTotal(count ?? 0);
      }
      setLoading(false);
    });
    return () => { cancelled = true; };
  }, [fetcher, page]);

  const totalPages = Math.ceil(total / ADMIN_PAGE_SIZE);
  return { data, total, page, setPage, loading, error, totalPages };
}
