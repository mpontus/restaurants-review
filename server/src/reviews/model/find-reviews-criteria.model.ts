/**
 * Describes generic parameters for review listing
 */
export class FindReviewsCriteria {
  /**
   * Filter reviews by place
   */
  public placeId?: string;

  public ownerId?: string;

  public take: number;

  public skip: number;

  constructor(values: Partial<FindReviewsCriteria>) {
    Object.assign(this, values);
  }
}
