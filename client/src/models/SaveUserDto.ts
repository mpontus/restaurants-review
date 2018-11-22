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
   * Grant user privileges
   */
  isUser: boolean;

  /**
   * Grant owner privileges
   */
  isOwner: boolean;

  /**
   * Grant admin privileges
   */
  isAdmin: boolean;
}
