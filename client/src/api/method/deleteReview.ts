import { ApiGateway } from "../ApiGateway";

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
): Promise<void> => api.delete(`/reviews/${id}`).then(() => undefined);
