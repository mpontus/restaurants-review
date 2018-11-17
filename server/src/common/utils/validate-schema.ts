// tslint:disable:promise-function-async
import * as t from 'io-ts';
import { failure } from 'io-ts/lib/PathReporter';

/**
 * Validate Schema Error
 *
 * Error dispatched when schema validation fails.
 */
export class ValidateSchemaError extends Error {}

/**
 * Validate object against the given schema
 *
 * Used to achieve type-safety on external objects, which shape can
 * not be trusted. Dispatches {@link ValidateSchemaError} when schema
 * validation fails.
 */
export const validateSchema = <A, O, I>(
  validator: t.Type<A, O, I>,
  input: I,
): Promise<A> =>
  validator
    .decode(input)
    .fold(
      errors =>
        Promise.reject(new ValidateSchemaError(failure(errors).join('\n'))),
      value => Promise.resolve(value),
    );
