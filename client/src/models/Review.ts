import { Place } from "./Place";
import { isAdmin, User } from "./User";

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

/**
 * Return whether review can be editted by actor
 */
export const canEdit = (review: Review, actor?: User) =>
  actor && isAdmin(actor);

/**
 * Return whether review can be deleted by actor
 */
export const canDelete = (review: Review, actor?: User) =>
  actor && isAdmin(actor);
