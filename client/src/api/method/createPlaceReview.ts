import * as t from "io-ts";
import { ApiGateway } from "../ApiGateway";
import { reviewSchema } from "../schema/reviewSchema";
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
   * Review Rating
   */
  rating: number;

  /**
   * Review Comment
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
export const createPlaceReview = async (
  api: ApiGateway,
  { id, ...rest }: Params
): Promise<Result> =>
  api.post(`/places/${id}/reviews`, rest).then(validateResponse(reviewSchema));
