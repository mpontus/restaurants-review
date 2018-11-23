import { PaginationParams } from 'common/model/pagination-params.model';

/**
 * Describes general place listing criteria
 */
export class FindPlacesCriteria extends PaginationParams {
  /**
   * Place ordering
   *
   * Public places are sorted by rating, user's own places are sorted
   * by name.
   */
  public order: 'name' | 'rating';

  /**
   * Filter places by owner
   */
  public ownerId?: string;

  /**
   * Filter places by rating
   */
  public rating?: number;

  /**
   * Constructor
   */
  constructor(values: Partial<FindPlacesCriteria>) {
    super();

    Object.assign(this, values);
  }

  /**
   * Minimum place rating matching criteria
   */
  public minRating(): number {
    if (this.rating === undefined) {
      return 0;
    }

    return this.rating - 0.5;
  }

  /**
   * Maximum place rating matching criteria
   */
  public maxRating(): number {
    if (this.rating === undefined) {
      return 5;
    }

    return this.rating + 0.5;
  }
}
