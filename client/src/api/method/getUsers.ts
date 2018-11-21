import * as t from "io-ts";
import { ApiGateway } from "../ApiGateway";
import { userPaginationSchema } from "../schema/userPaginationSchema";
import { formatQuery } from "../utils/formatQuery";
import { validateResponse } from "../utils/validateResponse";

/**
 * Request params
 */
interface Params {
  /**
   * Pagination limit
   */
  take?: number;

  /**
   * Pagination offset
   */
  skip?: number;
}

/**
 * Response result
 */
type Result = t.TypeOf<typeof userPaginationSchema>;

/**
 * Retrieve a list of users
 */
export const getUsers = async (
  api: ApiGateway,
  params: Params
): Promise<Result> =>
  api
    .get(`/users?${formatQuery(params)}`)
    .then(validateResponse(userPaginationSchema));
