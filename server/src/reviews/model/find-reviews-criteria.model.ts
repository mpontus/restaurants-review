/**
 * Describes generic parameters for review listing
 */
export class FindReviewsCriteria {
  /**
   * Filter reviews by place
   */
  public placeId?: string;

  /**
   * Filter by place owner
   */
  public ownerId?: string;

  /**
   * Pagination limit
   */
  public take: number;

  /**
   * Pagination offset
   */
  public skip: number;

  /**
   * Constructor
   */
  constructor(values: Partial<FindReviewsCriteria>) {
    Object.assign(this, values);
  }
}
