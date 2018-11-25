/**
 * Shape of app configuration
 */
interface Config {
  /**
   * Item limit in pagination
   */
  pageLimit: number;
}

/**
 * App Configuration
 */
export const config: Config = {
  pageLimit: 10
};
