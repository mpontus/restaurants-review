import * as t from "io-ts";
import { ApiGateway } from "../ApiGateway";
import { reviewSchema } from "../schema/reviewSchema";

/**
 * Request params
 */
interface Params {
  /**
   * Review id
   */
  id: string;
}

/**
 * Delete a review
 */
export const deleteReview = async (
  api: ApiGateway,
  { id }: Params
): Promise<void> => api.delete(`/review/${id}`).then(() => undefined);
