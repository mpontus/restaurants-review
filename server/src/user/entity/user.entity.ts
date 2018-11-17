import { Column, Entity, PrimaryColumn } from 'typeorm';
import { User } from 'user/model/user.model';

/**
 * User entity
 *
 * Describes persistence logic for user objects using TypeORM.
 */
@Entity()
export class UserEntity {
  /**
   * Auto generate ID
   */
  @PrimaryColumn('uuid')
  public id!: string;

  /**
   * Email
   *
   * Not all users may have an email.
   */
  @Column('text', { nullable: true })
  public email!: string | null;

  /**
   * Password
   *
   * Not all users may have a password
   */
  @Column('text', { nullable: true })
  public passwordHash!: string | null;

  /**
   * User roles
   */
  @Column('json')
  public roles: string[] = [];
}
