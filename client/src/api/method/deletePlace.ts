import { ApiGateway } from "../ApiGateway";

/**
 * Request params
 */
interface Params {
  /**
   * Place ID
   */
  id: string;
}

/**
 * Delete a place
 */
export const deletePlace = async (
  api: ApiGateway,
  { id }: Params
): Promise<void> => api.delete(`/places/${id}`).then(() => undefined);
