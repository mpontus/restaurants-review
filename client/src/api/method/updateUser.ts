import * as t from "io-ts";
import { ApiGateway } from "../ApiGateway";
import { userSchema } from "../schema/userSchema";
import { validateResponse } from "../utils/validateResponse";

/**
 * Request params
 */
interface Params {
  /**
   * User id
   */
  id: string;

  /**
   * User display name
   */
  name?: string;

  /**
   * User email address
   */
  email?: string;

  /**
   * User password
   */
  password?: string;
}

/**
 * Response result
 */
type Result = t.TypeOf<typeof userSchema>;

/**
 * Update user details
 */
export const createUser = async (
  api: ApiGateway,
  { id, ...rest }: Params
): Promise<Result> =>
  api.patch("/users", rest).then(validateResponse(userSchema));
