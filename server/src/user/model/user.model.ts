import { ApiModelProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { Principal } from 'common/model/principal.model';

/**
 * User model object
 *
 * User may exist without email or password, for example, when
 * authenticated using 3-rd party application.
 */
@Expose()
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
   * Describe whether the user can edit the place
   */
  @ApiModelProperty()
  @Expose()
  get canEdit(): boolean {
    return !!this.actor && this.actor.roles.includes('admin');
  }

  /**
   * Describe whether the user can delete the place
   */
  @ApiModelProperty()
  @Expose()
  get canDelete(): boolean {
    return !!this.actor && this.actor.roles.includes('admin');
  }

  /**
   * Identity of the user making the request
   */
  @Exclude()
  private readonly actor: Principal | undefined;

  /**
   * Constructor shorthand
   */
  constructor(actor: Principal | undefined, values: Partial<User>) {
    this.actor = actor;

    Object.assign(this, values);
  }
}
