import * as t from "io-ts";
import { ApiGateway } from "../ApiGateway";
import { reviewPaginationSchema } from "../schema/reviewPaginationSchema";
import { formatQuery } from "../utils/formatQuery";
import { validateResponse } from "../utils/validateResponse";

/**
 * Request params
 */
interface Params {
  /**
   * Place id
   */
  id: string;

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
type Result = t.TypeOf<typeof reviewPaginationSchema>;

/**
 * Retrieve a list place reviews
 */
export const getPlaceReviews = async (
  api: ApiGateway,
  { id, ...rest }: Params
): Promise<Result> =>
  api
    .get(`/places/${id}/reviews?${formatQuery(rest)}`)
    .then(validateResponse(reviewPaginationSchema));
