/**
 * Describes request for fetching places from API
 */
export interface LoadPlacesDto {
  /**
   * Load own places
   */
  own?: boolean;

  /**
   * Filter places by rating
   */
  rating?: number;

  /**
   * Page number
   */
  page: number;
}
