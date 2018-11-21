import * as t from "io-ts";
import { placeSchema } from "./placeSchema";

/**
 * Describes a listing of places
 */
export const placePaginationSchema = t.type({
  /**
   * Total number of items
   */
  total: t.number,

  /**
   * Items on the current page
   */
  items: t.array(placeSchema)
});
