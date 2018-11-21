import * as t from "io-ts";
import { ApiGateway } from "../ApiGateway";
import { sessionSchema } from "../schema/sessionSchema";
import { validateResponse } from "../utils/validateResponse";

/**
 * Request params
 */
interface Params {
  token: string;
}

/**
 * Response result
 */
type Result = t.TypeOf<typeof sessionSchema>;

/**
 * Refresh session using refresh token
 */
export const refresh = async (
  api: ApiGateway,
  params: Params
): Promise<Result> =>
  api.post("/auth/refresh", params).then(validateResponse(sessionSchema));
