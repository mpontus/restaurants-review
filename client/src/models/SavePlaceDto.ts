/**
 * Shape of the object for place updates
 */
export interface SavePlaceDto {
  /**
   * Updated restaurant name
   */
  title: string;

  /**
   * Updated restaurant address
   */
  address: string;
}
