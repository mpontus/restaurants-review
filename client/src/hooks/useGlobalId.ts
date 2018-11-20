import { useMemo } from "react";

/**
 * Generate globally unique ID.
 *
 * Simply returns a call count. Not safe for persistent data.
 */
const generateId = (() => {
  let counter = 0;

  return () => `${++counter}`;
})();

/**
 * React hook for generating globally unique ID per component
 * instance.
 */
export const useGlobalId = () => useMemo(generateId, []);
