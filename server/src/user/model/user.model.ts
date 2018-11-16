import { ApiModelProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

/**
 * User model object
 *
 * User may exist without email or password, for example, when
 * authenticated using 3-rd party application.
 */
export class User {
  /**
   * User id
   */
  @ApiModelProperty()
  public id: string;

  /**
   * User display name
   */
  @ApiModelProperty()
  public name: string;

  /**
   * User email
   */
  @ApiModelProperty()
  public email?: string;

  /**
   * User password
   *
   * Hidden from serialized object.
   */
  @Exclude()
  public passwordHash?: string;

  /**
   * User roles
   */
  @ApiModelProperty()
  public roles: string[];

  /**
   * Constructor shorthand
   */
  constructor(values: Partial<User>) {
    return Object.assign(this, values);
  }
}
