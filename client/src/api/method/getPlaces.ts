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
   * Filter by rating
   */
  rating?: number;

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
 * Retrieve a list of restaurants
 */
export const getPlaces = async (
  api: ApiGateway,
  params: Params
): Promise<Result> =>
  api
    .get(`/places?${formatQuery(params)}`)
    .then(validateResponse(placePaginationSchema));
