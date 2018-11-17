import { ApiModelProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { User } from 'user/model/user.model';

/**
 * Session model object
 */
export class Session {
  /**
   * Access token
   *
   * Should be sent as a bearer token in Authorization header to
   * perform authenticated requests.
   */
  @ApiModelProperty()
  public accessToken: string;

  /**
   * Refresh token
   *
   * Should be used to refresh the session after access token expiry.
   */
  @ApiModelProperty()
  public refreshToken: string;

  /**
   * Authenticated user profile
   */
  @ApiModelProperty({ type: User })
  public user: User;

  /**
   * Constructor shorthand
   */
  constructor(values: Partial<Session>) {
    Object.assign(this, values);
  }
}
