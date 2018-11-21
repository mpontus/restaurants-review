import qs from "querystring";

/**
 * Filter undefined values from object
 */
const filterObject = (obj: Record<string, any>): object =>
  Object.keys(obj).reduce(
    (acc, key) => (obj[key] === undefined ? acc : { ...acc, [key]: obj[key] }),
    {}
  );

/**
 * Format query string from object after filtering undefined values
 */
export const formatQuery = (query: object) => qs.stringify(filterObject(query));
