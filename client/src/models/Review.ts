import { Place } from "./Place";

/**
 * Review Model
 *
 * Describes a restaurant review
 */
export interface Review {
  /**
   * Review Id
   */
  id: string;

  /**
   * Author details
   */
  author: {
    /**
     * AUthor name
     */
    name: string;
  };

  /**
   * Place for which review was submitted
   */
  place?: Place;

  /**
   * Review rating
   */
  rating: number;

  /**
   * Date of the visit
   */
  dateVisitted: string;

  /**
   * Review comment
   */
  comment: string;

  /**
   * Owner's reply
   */
  reply?: string;
}
