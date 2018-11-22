/**
 * Describes user details
 */
export interface User {
  /**
   * User id
   */
  id: string;

  /**
   * User display name
   */
  name: string;

  /**
   * User email
   */
  email?: string;

  /**
   * User roles
   */
  roles: string[];
}
