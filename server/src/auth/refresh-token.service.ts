import { Inject, Injectable } from '@nestjs/common';
import { CryptoService } from 'common/crypto.service';
import Redis, { Redis as RedisClient } from 'ioredis';
import { User } from 'user/model/user.model';
import { UserRepository } from 'user/user.repository';

/**
 * Refresh Token Service
 *
 * Manages refresh tokens by associating them with user records.
 */
@Injectable()
export class RefreshTokenService {
  constructor(
    @Inject(Redis) private readonly redis: RedisClient,
    private readonly userRepository: UserRepository,
    private readonly cryptoService: CryptoService,
  ) {}

  /**
   * Create new refresh token for given user
   */
  public async createForUser(user: User): Promise<string> {
    const token = await this.generateUniqueToken();

    await this.redis.set(this.formatKey(token), user.id);

    return token;
  }

  /**
   * Find user by refresh token
   */
  public async findUser(token: string): Promise<User | undefined> {
    const userId = await this.redis.get(this.formatKey(token));

    if (userId === null) {
      return undefined;
    }

    return this.userRepository.findById(userId);
  }

  /**
   * Generate random unique token
   *
   * Cyrpto library does not offer significant guarantees on random
   * key uniquness which is why taking an extra step to avoid
   * collisions may be worthwhile.
   */
  private async generateUniqueToken(): Promise<string> {
    while (true) {
      const token = this.cryptoService.secureRandom();
      const exists = await this.redis.exists(this.formatKey(token));

      if (exists === 0) {
        return token;
      }
    }
  }

  /**
   * Redis key format
   */
  private formatKey(token: string): string {
    return `refresh_tokens:${token}`;
  }
}
