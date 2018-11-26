import { useCallback, useState } from "react";

/**
 * Pagination Hook
 *
 * Simplifies callback creation for increment/decrement.
 */
export const usePagination = (
  initialPage: number
): [number, () => void, () => void, (n: number) => void] => {
  const [page, setPage] = useState(initialPage);
  const prevPage = useCallback(() => setPage(current => current - 1), []);
  const nextPage = useCallback(() => setPage(current => current + 1), []);

  return [page, prevPage, nextPage, setPage];
};
