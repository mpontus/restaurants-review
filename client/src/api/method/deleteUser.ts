import { ApiGateway } from "../ApiGateway";

/**
 * Request params
 */
interface Params {
  /**
   * User id
   */
  id: string;
}

/**
 * Delete a user
 */
export const deleteUser = async (
  api: ApiGateway,
  { id }: Params
): Promise<void> => api.delete(`/users/${id}`).then(() => undefined);
