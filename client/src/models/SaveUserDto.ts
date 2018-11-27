/**
 * Shape of the object for user update
 */
export interface SaveUserDto {
  /**
   * User display name
   */
  name: string;

  /**
   * User email
   */
  email: string;

  /**
   * User password
   */
  password: string;

  /**
   * Grant owner privileges
   */
  isOwner: boolean;

  /**
   * Grant admin privileges
   */
  isAdmin: boolean;
}
