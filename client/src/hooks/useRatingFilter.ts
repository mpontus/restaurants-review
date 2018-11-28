import { History } from "history";
import { useCallback, useMemo } from "react";
import { useQueryParam } from "./useQueryParam";

/**
 * React hook for rating filter updates
 *
 * Actually just provides access to numeric value in query params.
 */
export const useRatingFilter = (
  history: History,
  key: string = "rating",
  defaultValue: number = 0
): [number, (n: number) => void] => {
  // Retrieve page from query params as mixed value
  const [rawValue, setValue] = useQueryParam(history, key);

  // Cast value to number
  const value = useMemo(
    () => {
      const num =
        typeof rawValue === "string" ? parseInt(rawValue, 10) : defaultValue;

      return isNaN(num) ? defaultValue : num;
    },
    [defaultValue, rawValue]
  );

  // Reset query parameter when value is set to default
  const onChange = useCallback(
    nextValue => setValue(nextValue === defaultValue ? undefined : nextValue),
    [defaultValue, setValue]
  );

  return [value, onChange];
};
