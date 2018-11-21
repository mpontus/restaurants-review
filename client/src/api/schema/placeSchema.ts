import * as t from "io-ts";
import { reviewSchema } from "./reviewSchema";

/**
 * Describes restaurant details
 */
export const placeSchema = t.type({
  /**
   * Restaurant id
   */
  id: t.string,

  /**
   * Restaurant name
   */
  title: t.string,

  /**
   * Restaurant address
   */
  address: t.string,

  /**
   * Restaurant rating
   */
  rating: t.number,

  /**
   * Top rated review
   */
  bestReview: t.union([reviewSchema, t.undefined]),

  /**
   * Lowest rated review
   */
  worstReview: t.union([reviewSchema, t.undefined]),

  /**
   * Review by the user making the request
   */
  ownReview: t.union([reviewSchema, t.undefined])
});
