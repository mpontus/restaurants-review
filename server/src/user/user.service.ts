import { Injectable, NotFoundException } from '@nestjs/common';
import { CryptoService } from 'common/crypto.service';
import { Principal } from 'common/model/principal.model';
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
   * Find single user by id
   */
  public async findUser(
    actor: Principal | undefined,
    id: string,
  ): Promise<User> {
    const user = await this.userRepository.findById(actor, id);

    if (user === undefined) {
      throw new NotFoundException();
    }

    return user;
  }

  /**
   * List existing users
   */
  public async listUsers(
    actor: Principal | undefined,
    criteria: ListUsersCriteria,
  ): Promise<UserList> {
    const total = await this.userRepository.count();
    const items = await this.userRepository.findAll(actor, criteria);

    return new UserList(total, items);
  }

  /**
   * Create new user
   */
  public async createUser(
    actor: Principal | undefined,
    data: CreateUserDto,
  ): Promise<User> {
    const user = new User(actor, {
      name: data.name,
      email: data.email,
      passwordHash: await this.cryptoService.hashPassword(data.password),
      roles: [
        'user',
        ...(data.isOwner ? ['owner'] : []),
        ...(data.isAdmin ? ['admin'] : []),
      ],
    });

    return this.userRepository.create(actor, user);
  }

  /**
   * Update user
   */
  public async updateUser(user: User, update: UpdateUserDto): Promise<User> {
    Object.assign(user, {
      name: update.name || user.name,
      email: update.email || user.email,
      passwordHash: update.password
        ? await this.cryptoService.hashPassword(update.password)
        : user.passwordHash,
      roles: this.updateRoles(user, update),
    });

    return this.userRepository.update(user);
  }

  /**
   * Delete user
   */
  public async deleteUser(user: User): Promise<void> {
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
