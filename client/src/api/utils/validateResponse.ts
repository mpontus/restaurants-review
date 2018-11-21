import { AxiosResponse } from "axios";
import * as t from "io-ts";
import { decodeToPromise } from "./decodeToPromise";

/**
 * Validate axios response against io-ts schema and cast it to
 * corresponding type.
 */
export const validateResponse = <A, O, I>(schema: t.Type<A, O, I>) => (
  response: AxiosResponse<I>
): Promise<A> => decodeToPromise(schema, response.data);
