type Predicate<T, T1 extends T> = (input: T) => input is T1;

export function eitherPredicate<T, T1 extends T>(
  predicate1: Predicate<T, T1>
): Predicate<T, T1>;

export function eitherPredicate<T, T1 extends T, T2 extends T>(
  predicate1: Predicate<T, T1>,
  predicate2: Predicate<T, T2>
): Predicate<T, T1 | T2>;

export function eitherPredicate<T, T1 extends T, T2 extends T, T3 extends T>(
  predicate1: Predicate<T, T1>,
  predicate2: Predicate<T, T2>,
  predicate3: Predicate<T, T3>
): Predicate<T, T1 | T2 | T3>;

export function eitherPredicate<
  T,
  T1 extends T,
  T2 extends T,
  T3 extends T,
  T4 extends T
>(
  predicate1: Predicate<T, T1>,
  predicate2: Predicate<T, T2>,
  predicate3: Predicate<T, T3>,
  predicate4: Predicate<T, T4>
): Predicate<T, T1 | T2 | T3 | T4>;

export function eitherPredicate<
  T,
  T1 extends T,
  T2 extends T,
  T3 extends T,
  T4 extends T,
  T5 extends T
>(
  predicate1: Predicate<T, T1>,
  predicate2: Predicate<T, T2>,
  predicate3: Predicate<T, T3>,
  predicate4: Predicate<T, T4>,
  predicate5: Predicate<T, T5>
): Predicate<T, T1 | T2 | T3 | T4 | T5>;

export function eitherPredicate<
  T,
  T1 extends T,
  T2 extends T,
  T3 extends T,
  T4 extends T,
  T5 extends T,
  T6 extends T
>(
  predicate1: Predicate<T, T1>,
  predicate2: Predicate<T, T2>,
  predicate3: Predicate<T, T3>,
  predicate4: Predicate<T, T4>,
  predicate5: Predicate<T, T5>,
  predicate6: Predicate<T, T6>
): Predicate<T, T1 | T2 | T3 | T4 | T5 | T6>;

export function eitherPredicate<
  T,
  T1 extends T,
  T2 extends T,
  T3 extends T,
  T4 extends T,
  T5 extends T,
  T6 extends T,
  T7 extends T
>(
  predicate1: Predicate<T, T1>,
  predicate2: Predicate<T, T2>,
  predicate3: Predicate<T, T3>,
  predicate4: Predicate<T, T4>,
  predicate5: Predicate<T, T5>,
  predicate6: Predicate<T, T6>,
  predicate7: Predicate<T, T7>
): Predicate<T, T1 | T2 | T3 | T4 | T5 | T6 | T7>;

export function eitherPredicate<
  T,
  T1 extends T,
  T2 extends T,
  T3 extends T,
  T4 extends T,
  T5 extends T,
  T6 extends T,
  T7 extends T,
  T8 extends T,
  T9 extends T
>(
  predicate1: Predicate<T, T1>,
  predicate2: Predicate<T, T2>,
  predicate3: Predicate<T, T3>,
  predicate4: Predicate<T, T4>,
  predicate5: Predicate<T, T5>,
  predicate6: Predicate<T, T6>,
  predicate7: Predicate<T, T7>,
  predicate8: Predicate<T, T8>
): Predicate<T, T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8>;

export function eitherPredicate<
  T,
  T1 extends T,
  T2 extends T,
  T3 extends T,
  T4 extends T,
  T5 extends T,
  T6 extends T,
  T7 extends T,
  T8 extends T,
  T9 extends T
>(
  predicate1: Predicate<T, T1>,
  predicate2: Predicate<T, T2>,
  predicate3: Predicate<T, T3>,
  predicate4: Predicate<T, T4>,
  predicate5: Predicate<T, T5>,
  predicate6: Predicate<T, T6>,
  predicate7: Predicate<T, T7>,
  predicate8: Predicate<T, T8>,
  predicate9: Predicate<T, T9>
): Predicate<T, T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9>;

/**
 * Either Predicate
 *
 * Combines multiple predicates into a single predicate which matches
 * any of the predicates.
 */
export function eitherPredicate<T>(...predicates: Array<Predicate<T, any>>) {
  return (input: T) => predicates.some(predicate => predicate(input));
}
