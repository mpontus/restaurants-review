import { User } from "./User";

/**
 * Describes authentication state
 */
export interface AuthState {
  /**
   * Access token
   */
  accessToken: string;

  /**
   * Access token
   */
  refreshToken: string;

  /**
   * Logged in user details
   */
  user: User;
}
