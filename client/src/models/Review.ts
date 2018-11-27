
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
     * Author name
     */
    name: string;
  };

  /**
   * Review rating
   */
  rating: number;

  /**
   * Date of the visit
   */
  dateVisited: string;

  /**
   * Review comment
   */
  comment: string;

  /**
   * Owner's reply
   */
  reply?: string;

  /**
   * Whether user can reply to the review
   */
  canReply?: boolean;

  /**
   * Whether user can edit the review
   */
  canEdit?: boolean;

  /**
   * Whether user can delete the review
   */
  canDelete?: boolean;
}
