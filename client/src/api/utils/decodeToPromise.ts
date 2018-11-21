import * as t from "io-ts";
import { failure } from "io-ts/lib/PathReporter";

/**
 * Validate input against io-ts schema and return result as a promise
 */
export const decodeToPromise = <A, O, I>(
  validator: t.Type<A, O, I>,
  input: I
): Promise<A> =>
  validator
    .decode(input)
    .fold(
      errors => Promise.reject(new Error(failure(errors).join("\n"))),
      value => Promise.resolve(value)
    );
