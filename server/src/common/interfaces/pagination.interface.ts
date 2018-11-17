/**
 * Generic pagination interface
 */
export interface IPagination<T> {
  /**
   * Total number of available items
   */
  total: number;

  /**
   * Items included in the current listing
   */
  items: T[];
}
