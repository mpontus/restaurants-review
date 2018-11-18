import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, FindConditions } from 'typeorm';
import uuid from 'uuid';
import { UserEntity } from './entity/user.entity';
import { ListUsersCriteria } from './model/list-users-criteria.model';
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
   * Return the total number of existing users
   */
  public async count(): Promise<number> {
    return this.manager.count(UserEntity);
  }

  /**
   * Return all users matching specified criteria
   */
  public async findAll(criteria: ListUsersCriteria): Promise<User[]> {
    const items = await this.manager.find(UserEntity, {
      take: criteria.take,
      skip: criteria.skip,
    });

    return items.map(item => item.toModel());
  }

  /**
   * Persist given user in the database
   */
  public async create(user: User): Promise<User> {
    const userEntity = this.manager.create(UserEntity, {
      id: uuid(),
      name: user.name,
      email: user.email,
      passwordHash: user.passwordHash,
      roles: user.roles,
    });

    await this.manager.save(userEntity);

    return userEntity.toModel();
  }

  /**
   * Persist given user in the database
   */
  public async update(user: User): Promise<User> {
    await this.manager.update(UserEntity, user.id, {
      name: user.name,
      email: user.email,
      passwordHash: user.passwordHash,
      roles: user.roles,
    });

    return user;
  }

  /**
   * Delete user from the database
   */
  public async remove(user: User): Promise<void> {
    await this.manager.delete(UserEntity, user.id);
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

    return userEntity.toModel();
  }
}
