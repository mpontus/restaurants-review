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
   * Updated rating
   */
  rating?: number;

  /**
   * Updated date of the visit
   */
  dateVisited?: string;

  /**
   * Review Comment
   */
  comment?: string;

  /**
   * Updated owner's reply
   */
  reply?: string;
}

/**
 * Response result
 */
type Result = t.TypeOf<typeof reviewSchema>;

/**
 * Update review details
 */
export const updateReview = async (
  api: ApiGateway,
  { id, ...rest }: Params
): Promise<Result> =>
  api.patch(`/reviews/${id}`, rest).then(validateResponse(reviewSchema));
