import { useMemo } from "react";

/**
 * Hook to skip the initial value of a prop.
 *
 * Useful for modals which reuse the same request state without
 * resetting it explicitly.
 */
export const useSubsequent = <T>(value: T, defaultValue: any): T => {
  const initialValue = useMemo(() => value, []);

  return useMemo(() => (value === initialValue ? defaultValue : value), [
    value
  ]);
};
