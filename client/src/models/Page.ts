/**
 * Describes a response for paginated data
 */
export interface Page<T> {
  /**
   * Whether next page exists
   */
  nextPageExists: boolean;

  /**
   * Whether previous page exists
   */
  prevPageExists: boolean;

  /**
   * Total number of existing items
   */
  total: number;

  /**
   * Offset of the current page
   */
  offset: number;

  /**
   * Items included in the current page
   */
  items: T[];
}
