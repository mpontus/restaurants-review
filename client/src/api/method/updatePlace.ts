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

  /**
   * Place name
   */
  title?: string;

  /**
   * Place address
   */
  address?: string;
}

/**
 * Response result
 */
type Result = t.TypeOf<typeof placeSchema>;

/**
 * Update place details
 */
export const updatePlace = async (
  api: ApiGateway,
  { id, ...rest }: Params
): Promise<Result> =>
  api.patch(`/places/${id}`, rest).then(validateResponse(placeSchema));
