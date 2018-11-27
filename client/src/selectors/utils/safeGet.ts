/**
 * Utility function to retrieve an object property safely
 *
 * Returns undefined when either object or a key is undefined.
 */
export const safeGet = <T extends object, K extends keyof T>(
  obj: T | undefined,
  key: K | undefined
): T[K] | undefined =>
  obj === undefined || key === undefined ? undefined : obj[key];
