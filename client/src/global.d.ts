/**
 * Omit Type
 *
 * Useful for overriding properties on extended interfaces.
 */
declare type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
