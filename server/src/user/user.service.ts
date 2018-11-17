import { Injectable } from '@nestjs/common';
import { ListUsersCriteria } from './model/list-users-criteria.model';
import { UserList } from './model/user-list.model';
import { UserRepository } from './user.repository';

/**
 * User Service
 *
 * Handles user record management.
 */
@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  /**
   * List existing users
   */
  public async listUsers(criteria: ListUsersCriteria): Promise<UserList> {
    const total = await this.userRepository.count();
    const items = await this.userRepository.findAll(criteria);

    return new UserList(total, items);
  }
}
