import * as t from "io-ts";

/**
 * Describes review details
 */
export const reviewSchema = t.type({
  /**
   * Review id
   */
  id: t.string,

  /**
   * Embedded author details
   */
  author: t.type({
    /**
     * Author name
     */
    name: t.string
  }),

  /**
   * Review rating
   */
  rating: t.number,

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
