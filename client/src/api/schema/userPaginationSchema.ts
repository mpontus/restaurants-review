import * as t from "io-ts";
import { userSchema } from "./userSchema";

/**
 * Describes a listing of users
 */
export const userPaginationSchema = t.type({
  /**
   * Total number of items
   */
  total: t.number,

  /**
   * Items on the current page
   */
  items: t.array(userSchema)
});
