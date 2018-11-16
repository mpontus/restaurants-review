import { ApiModelProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { User } from 'user/model/user.model';

/**
 * Session model object
 */
export class Session {
  /**
   * Access token
   */
  @ApiModelProperty()
  public token: string;

  /**
   * Authenticated user profile
   */
  @ApiModelProperty({ type: User })
  public user: User;
}
