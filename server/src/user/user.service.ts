import { Injectable, NotFoundException } from '@nestjs/common';
import { ListUsersCriteria } from './model/list-users-criteria.model';
import { UserList } from './model/user-list.model';
import { UserRepository } from './user.repository';
import { User } from './model/user.model';
import { CryptoService } from 'common/crypto.service';
import { UpdateUserDto } from './model/update-user-dto';
import { CreateUserDto } from './model/create-user-dto';

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

    await this.userRepository.create(user);

    return user;
  }

  /**
   * Update user
   */
  public async updateUser(id: string, data: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (user === undefined) {
      throw new NotFoundException();
    }

    Object.assign(user, {
      name: data.name || user.name,
      email: data.email || user.email,
      passwordHash: data.password
        ? await this.cryptoService.hashPassword(data.password)
        : user.passwordHash,
      roles: this.updateRoles(user.roles, data.isOwner, data.isAdmin),
    });

    await this.userRepository.update(user);

    return user;
  }

  /**
   * Delete user
   */
  public async deleteUser(id: string) {
    const user = await this.userRepository.findById(id);

    if (user === undefined) {
      throw new NotFoundException();
    }

    return this.userRepository.remove(user);
  }

  /**
   * Helper function to recocile existing user roles with update
   */
  private updateRoles(roles: string[], isOwner?: boolean, isAdmin?: boolean) {
    const hasOwner = isOwner === undefined ? roles.includes('owner') : isOwner;
    const hasAdmin = isAdmin === undefined ? roles.includes('admin') : isAdmin;

    return [
      'user',
      ...(hasOwner ? ['owner'] : []),
      ...(hasAdmin ? ['admin'] : []),
    ];
  }
}
