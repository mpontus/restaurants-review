import { Review } from "./Review";
import { isAdmin, isUser, User } from "./User";

/**
 * Place Model
 */
export interface Place {
  /**
   * Place ID
   */
  id: string;

  /**
   * Place title
   */
  title: string;

  /**
   * Place address
   */
  address: string;

  /**
   * Average review rating
   */
  rating: number;

  /**
   * Review with the highest rating
   */
  bestReview?: Review;

  /**
   * Review with the lowest rating
   */
  worstReview?: Review;

  /**
   * Review by the currently logged in user
   */
  ownReview?: Review;
}

/**
 * Return whether place can be reviewed by actor
 */
export const canReview = (place: Place, actor?: User) =>
  actor && isUser(actor) && !place.ownReview;

/**
 * Return whether place can be editted by actor
 */
export const canEdit = (place: Place, actor?: User) => actor && isAdmin(actor);

/**
 * Return whether place can be deleted by actor
 */
export const canDelete = (place: Place, actor?: User) =>
  actor && isAdmin(actor);
