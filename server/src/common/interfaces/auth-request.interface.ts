import { Principal } from 'common/model/principal.model';

/**
 * Authenticated request interface
 */
export interface IAuthRequest {
  /**
   * Authorization principal
   */
  user: Principal;
}
