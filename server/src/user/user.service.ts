import { Injectable, NotFoundException } from '@nestjs/common';
import { CryptoService } from 'common/crypto.service';
import { CreateUserDto } from './model/create-user-dto.model';
import { ListUsersCriteria } from './model/list-users-criteria.model';
import { UpdateUserDto } from './model/update-user-dto.model';
import { UserList } from './model/user-list.model';
import { User } from './model/user.model';
import { UserRepository } from './user.repository';

/**
 * User Service
 *
 * Handles user record management.
 */
@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cryptoService: CryptoService,
  ) {}

  /**
   * List existing users
   */
  public async listUsers(criteria: ListUsersCriteria): Promise<UserList> {
    const total = await this.userRepository.count();
    const items = await this.userRepository.findAll(criteria);

    return new UserList(total, items);
  }

  /**
   * Create new user
   */
  public async createUser(data: CreateUserDto): Promise<User> {
    const user = new User({
      name: data.name,
      email: data.email,
      passwordHash: await this.cryptoService.hashPassword(data.password),
      roles: [
        'user',
        ...(data.isOwner ? ['owner'] : []),
        ...(data.isAdmin ? ['admin'] : []),
      ],
    });

    return this.userRepository.create(user);
  }

  /**
   * Update user
   */
  public async updateUser(id: string, update: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (user === undefined) {
      throw new NotFoundException();
    }

    Object.assign(user, {
      name: update.name || user.name,
      email: update.email || user.email,
      passwordHash: update.password
        ? await this.cryptoService.hashPassword(update.password)
        : user.passwordHash,
      roles: this.updateRoles(user, update),
    });

    await this.userRepository.update(user);

    return user;
  }

  /**
   * Delete user
   */
  public async deleteUser(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);

    if (user === undefined) {
      throw new NotFoundException();
    }

    return this.userRepository.remove(user);
  }

  /**
   * Helper function to recocile existing user roles with update
   */
  private updateRoles(user: User, update: UpdateUserDto): string[] {
    const hasOwner =
      update.isOwner === undefined
        ? user.roles.includes('owner')
        : update.isOwner;
    const hasAdmin =
      update.isAdmin === undefined
        ? user.roles.includes('admin')
        : update.isAdmin;

    return [
      'user',
      ...(hasOwner ? ['owner'] : []),
      ...(hasAdmin ? ['admin'] : []),
    ];
  }
}
