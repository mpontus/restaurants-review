import * as t from "io-ts";
import { ApiGateway } from "../ApiGateway";
import { placeSchema } from "../schema/placeSchema";
import { validateResponse } from "../utils/validateResponse";

/**
 * Request params
 */
interface Params {
  /**
   * Place ID
   */
  id: string;
}

/**
 * Response result
 */
type Result = t.TypeOf<typeof placeSchema>;

/**
 * Retrieve single place by id
 */
export const getPlace = async (
  api: ApiGateway,
  { id }: Params
): Promise<Result> =>
  api.get(`/places/${id}`).then(validateResponse(placeSchema));
