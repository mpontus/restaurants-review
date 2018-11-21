import * as t from "io-ts";
import { ApiGateway } from "../ApiGateway";
import { sessionSchema } from "../schema/sessionSchema";
import { validateResponse } from "../utils/validateResponse";

/**
 * Request params
 */
interface Params {
  email: string;
  password: string;
}

/**
 * Response result
 */
type Result = t.TypeOf<typeof sessionSchema>;

/**
 * Authenticate with a new account
 */
export const signup = async (
  api: ApiGateway,
  params: Params
): Promise<Result> =>
  api.post("/auth/signup", params).then(validateResponse(sessionSchema));
