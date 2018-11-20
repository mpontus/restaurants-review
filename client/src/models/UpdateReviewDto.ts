/**
 * Describes an update to a review
 */
export class UpdateReviewDto {
  /**
   * Updated review rating
   */
  public rating?: number;

  /**
   * Updated comment
   */
  public comment?: string;

  /**
   * Updated reply
   */
  public reply?: string;
}
