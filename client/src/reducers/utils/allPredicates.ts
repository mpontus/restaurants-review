type Predicate<T, T1 extends T> = (input: T) => input is T1;

export function allPredicates<T, T1 extends T>(
  predicate1: Predicate<T, T1>,
  ...rest: Array<(value: T1) => boolean>
): Predicate<T, T1>;

export function allPredicates<T, T1 extends T, T2 extends T1>(
  predicate1: Predicate<T, T1>,
  predicate2: Predicate<T1, T2>,
  ...rest: Array<(value: T2) => boolean>
): Predicate<T, T2>;

export function allPredicates<T, T1 extends T, T2 extends T1, T3 extends T2>(
  predicate1: Predicate<T, T1>,
  predicate2: Predicate<T1, T2>,
  predicate3: Predicate<T2, T3>,
  ...rest: Array<(value: T3) => boolean>
): Predicate<T, T3>;

/**
 * All Predicates
 *
 * Creates a predicate which matches all of the included predicates.
 */
export function allPredicates(...predicates: Array<(value: any) => boolean>) {
  return (input: any) => predicates.every(predicate => predicate(input));
}
