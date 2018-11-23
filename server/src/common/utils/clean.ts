/**
 * Remove undefiend values from object.
 */
export const clean = <T>(
  // tslint:disable-next-line:no-any
  obj: Partial<T> & { [K in string]?: any },
): Partial<T> =>
  Object.keys(obj).reduce(
    (acc, key) =>
      obj[key] === undefined ? acc : Object.assign(acc, { [key]: obj[key] }),
    {},
  );
