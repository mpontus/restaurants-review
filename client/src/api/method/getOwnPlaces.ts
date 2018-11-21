import * as t from "io-ts";
import { ApiGateway } from "../ApiGateway";
import { placePaginationSchema } from "../schema/placePaginationSchema";
import { formatQuery } from "../utils/formatQuery";
import { validateResponse } from "../utils/validateResponse";

/**
 * Request params
 */
interface Params {
  /**
   * Pagination limit
   */
  take?: number;

  /**
   * Pagination offset
   */
  skip?: number;
}

/**
 * Response result
 */
type Result = t.TypeOf<typeof placePaginationSchema>;

/**
 * Retrieve a list of user's own places
 */
export const getOwnPlaces = async (
  api: ApiGateway,
  params: Params
): Promise<Result> =>
  api
    .get(`/places/own?${formatQuery(params)}`)
    .then(validateResponse(placePaginationSchema));
