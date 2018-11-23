import { PaginationParams } from 'common/model/pagination-params.model';

/**
 * Describes generic parameters for review listing
 */
export class FindReviewsCriteria extends PaginationParams {
  /**
   * Filter reviews by place
   */
  public placeId?: string;

  /**
   * Filter by place owner
   */
  public ownerId?: string;

  /**
   * Exclude following review ids
   *
   * Needed to remove duplication with highest, lowest, and own review.
   */
  public exclude: string[] = [];

  /**
   * Constructor
   */
  constructor(values: Partial<FindReviewsCriteria>) {
    super();

    Object.assign(this, values);
  }
}
