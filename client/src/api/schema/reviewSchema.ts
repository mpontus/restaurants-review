import * as t from "io-ts";

/**
 * Describes restaurant details
 */
export const reviewSchema = t.type({
  /**
   * Restaurant id
   */
  id: t.string,

  /**
   * Restaurant name
   */
  rating: t.string,

  /**
   * Date of the visit
   */
  dateVisitted: t.string,

  /**
   * Review comment
   */
  comment: t.string,

  /**
   * Restaurant owner's reply
   */
  reply: t.union([t.string, t.undefined])
});
