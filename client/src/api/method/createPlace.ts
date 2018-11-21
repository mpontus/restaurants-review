import * as t from "io-ts";
import { ApiGateway } from "../ApiGateway";
import { placeSchema } from "../schema/placeSchema";
import { validateResponse } from "../utils/validateResponse";

/**
 * Request params
 */
interface Params {
  /**
   * Place name
   */
  title: string;

  /**
   * Place address
   */
  address: string;
}

/**
 * Response result
 */
type Result = t.TypeOf<typeof placeSchema>;

/**
 * Create new place
 */
export const createPlace = async (
  api: ApiGateway,
  params: Params
): Promise<Result> =>
  api.post("/places", params).then(validateResponse(placeSchema));
