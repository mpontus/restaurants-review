import * as t from "io-ts";
import { ApiGateway } from "../ApiGateway";
import { reviewSchema } from "../schema/reviewSchema";
import { validateResponse } from "../utils/validateResponse";

/**
 * Request params
 */
interface Params {
  /**
   * Review id
   */
  id: string;

  /**
   * Reply comment
   */
  comment: string;
}

/**
 * Response result
 */
type Result = t.TypeOf<typeof reviewSchema>;

/**
 * Create a review for a place
 */
export const createReviewReply = async (
  api: ApiGateway,
  { id, ...rest }: Params
): Promise<Result> =>
  api.put(`/reviews/${id}/reply`, rest).then(validateResponse(reviewSchema));
