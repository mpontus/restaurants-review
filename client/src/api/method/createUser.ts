import * as t from "io-ts";
import { ApiGateway } from "../ApiGateway";
import { userSchema } from "../schema/userSchema";
import { validateResponse } from "../utils/validateResponse";

/**
 * Request params
 */
interface Params {
  /**
   * User display name
   */
  name: string;

  /**
   * User email address
   */
  email: string;

  /**
   * User password
   */
  password: string;
}

/**
 * Response result
 */
type Result = t.TypeOf<typeof userSchema>;

/**
 * Create new user
 */
export const createUser = async (
  api: ApiGateway,
  params: Params
): Promise<Result> =>
  api.post("/users", params).then(validateResponse(userSchema));
