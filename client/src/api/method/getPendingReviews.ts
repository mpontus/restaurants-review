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
 * Retrieve a list place reviews pending for user's reply
 */
export const getPendingReviews = async (
  api: ApiGateway,
  params: Params
): Promise<Result> =>
  api
    .get(`/reviews/pending?${formatQuery(params)}`)
    .then(validateResponse(reviewPaginationSchema));
