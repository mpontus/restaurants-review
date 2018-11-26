import { Review } from "./Review";
import { User } from "./User";

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

  /**
   * Whether user can leave review for the place
   */
  canReview?: boolean;

  /**
   * Whether user can edit the place
   */
  canEdit?: boolean;

  /**
   * Whether user can delete the place
   */
  canDelete?: boolean;
}

/**
 * Return whether place can be reviewed by actor
 */
export const canReview = (place: Place, actor?: User) => !!place.canReview;

/**
 * Return whether place can be editted by actor
 */
export const canEdit = (place: Place, actor?: User) => !!place.canEdit;

/**
 * Return whether place can be deleted by actor
 */
export const canDelete = (place: Place, actor?: User) => !!place.canDelete;
