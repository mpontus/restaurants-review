
/**
 * Describes general place listing criteria
 */
export class FindPlacesCriteria {
  /**
   * Filter places by owner
   */
  public ownerId?: string;

  /**
   * Filter places by rating
   */
  public rating?: number;

  /**
   * Pagination limit
   */
  public take: number = 10;

  /**
   * Pagination offset
   */
  public skip: number = 0;

  /**
   * Constructor
   */
  constructor(values: Partial<FindPlacesCriteria>) {
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
