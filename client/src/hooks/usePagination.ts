import { History } from "history";
import { useCallback, useMemo } from "react";
import { useQueryParam } from "./useQueryParam";

/**
 * React hook for pagination
 *
 * Provides pagination counter using query parameters.
 */
export const usePagination = (
  history: History,
  key: string = "page",
  defaultPage: number = 0
): [number, () => void, () => void, (n: number) => void] => {
  // Retrieve page from query params as mixed value
  const [value, setValue] = useQueryParam(history, key);

  // Cast value to number
  const page = useMemo(
    () => {
      const num = typeof value === "string" ? parseInt(value, 10) : defaultPage;

      return isNaN(num) ? defaultPage : num;
    },
    [defaultPage, value]
  );

  // Reset query parameter when value is set to default
  const setPage = useCallback(
    newPage => setValue(newPage === defaultPage ? undefined : newPage),
    [defaultPage, setValue]
  );

  // Create memoized callbacks
  const prevPage = useCallback(() => setPage(page - 1), [page, setPage]);
  const nextPage = useCallback(() => setPage(page + 1), [page, setPage]);

  return [page, prevPage, nextPage, setPage];
};
