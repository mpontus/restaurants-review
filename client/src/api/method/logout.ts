import { ApiGateway } from "../ApiGateway";

/**
 * Destroy session
 */
export const logout = async (api: ApiGateway): Promise<void> =>
  api.post("/auth/logout").then(() => undefined);
