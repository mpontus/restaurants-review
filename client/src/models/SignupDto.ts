/**
 * Describes signup request details
 */
export interface SignupDto {
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
}
