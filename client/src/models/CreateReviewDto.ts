/**
 * Describes details specified during review creation
 */
export class CreateReviewDto {
  /**
   * Review Rating
   */
  public rating?: number;

  /**
   * Comment
   */
  public comment?: string;
}
