import { Column, Entity, PrimaryColumn, CreateDateColumn } from 'typeorm';
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
   * Display name
   */
  @Column()
  public name!: string;

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

  /**
   * Timestamp of user creation
   */
  @CreateDateColumn()
  public createdAt: Date;

  /**
   * Transform entity to domain model
   */
  public toModel(): User {
    return new User({
      id: this.id,
      name: this.name,
      email: this.email || undefined,
      passwordHash: this.passwordHash || undefined,
      roles: this.roles,
    });
  }
}
