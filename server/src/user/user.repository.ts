import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, FindConditions } from 'typeorm';
import uuid from 'uuid';
import { UserEntity } from './entity/user.entity';
import { User } from './model/user.model';

/**
 * User repository
 *
 * Responsible for persistence of user objects.
 */
export class UserRepository {
  constructor(@InjectEntityManager() private readonly manager: EntityManager) {}

  /**
   * Find single user by id
   *
   * Return undefined when user with given email does not exist
   */
  public async findById(id: string): Promise<User | undefined> {
    return this.lookupSingle({ id });
  }

  /**
   * Find single user by email
   *
   * Return undefined when user with given email does not exist
   */
  public async findByEmail(email: string): Promise<User | undefined> {
    return this.lookupSingle({ email });
  }

  /**
   * Persist given user in the database
   */
  public async create(user: User): Promise<User> {
    const userEntity = this.manager.create(UserEntity, {
      id: uuid(),
      email: user.email,
      passwordHash: user.passwordHash,
      roles: user.roles,
    });

    await this.manager.save(userEntity);

    // Transfer generated user id to domain object
    user.id = userEntity.id;

    return user;
  }

  /**
   * Persist given user in the database
   */
  public async update(user: User): Promise<User> {
    await this.manager.update(User, user.id, {
      email: user.email,
      passwordHash: user.passwordHash,
      roles: user.roles,
    });

    return user;
  }

  /**
   * Find a single user by specified criteria
   */
  private async lookupSingle(
    conditions: FindConditions<UserEntity>,
  ): Promise<User | undefined> {
    const userEntity = await this.manager.findOne(UserEntity, conditions);

    if (userEntity === undefined) {
      return undefined;
    }

    return new User({
      id: userEntity.id,
      email: userEntity.email || undefined,
      passwordHash: userEntity.passwordHash || undefined,
      roles: userEntity.roles,
    });
  }
}
