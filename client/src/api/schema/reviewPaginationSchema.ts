import * as t from "io-ts";
import { reviewSchema } from "./reviewSchema";

/**
 * Describes a listing of reviews
 */
export const reviewPaginationSchema = t.type({
  /**
   * Total number of items
   */
  total: t.number,

  /**
   * Items on the current page
   */
  items: t.array(reviewSchema)
});
