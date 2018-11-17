import { Inject, Injectable } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { CryptoService } from 'common/crypto.service';
import { JwtService } from 'common/jwt.service';
import { Principal } from 'common/model/principal.model';
import {
  validateSchema,
  ValidateSchemaError,
} from 'common/utils/validate-schema';
import * as t from 'io-ts';
import Redis, { Redis as RedisClient } from 'ioredis';
import { User } from 'user/model/user.model';
import { UserRepository } from 'user/user.repository';
import { Session } from './model/session.model';

/**
 * Redis key formats
 */
const lookupFormat = {
  accessToken: (s: string): string => `access_tokens:${s}`,
  refreshToken: (s: string): string => `refresh_tokens:${s}`,
};

/**
 * Validation schema for principal serialized as JWT token
 */
const tokenPayloadSchema = t.type({
  sub: t.string,
  roles: t.array(t.string),
});

/**
 * Validation schema for session data stored in redis table
 */
const sessionDataSchema = t.type({
  accessToken: t.string,
  refreshToken: t.string,
  userId: t.string,
});

/**
 * Session Repository
 *
 * Responsible for managing persistent session data.
 */
@Injectable()
export class SessionRepository {
  constructor(
    @Inject(Redis) private readonly redis: RedisClient,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly cryptoService: CryptoService,
  ) {}

  /**
   * Find a session by access token
   */
  public async findByRefreshToken(
    refreshToken: string,
  ): Promise<Session | undefined> {
    return this.lookupSession(lookupFormat.refreshToken(refreshToken));
  }

  /**
   * Find a session by access token
   */
  public async findByAccessToken(
    accessToken: string,
  ): Promise<Session | undefined> {
    return this.lookupSession(lookupFormat.accessToken(accessToken));
  }

  /**
   * Retrieve principal by id token.
   *
   * Avoids database lookup by extracting the details from JWT token.
   */
  public async getPrincipal(
    accessToken: string,
  ): Promise<Principal | undefined> {
    try {
      const decoded = await this.jwtService.decode(accessToken);
      const payload = await validateSchema(tokenPayloadSchema, decoded);

      return new Principal(payload.sub, payload.roles);
    } catch (error) {
      if (error instanceof ValidationError) {
        return undefined;
      }

      throw error;
    }
  }

  /**
   * Create new session for the given user
   *
   * Stores session details in redis database to enable session
   * invalidation
   */
  public async createForUser(user: User): Promise<Session> {
    const accessToken = await this.jwtService.encode({
      sub: user.id,
      roles: user.roles,
    });
    const refreshToken = this.cryptoService.secureRandom();
    const sessionData = {
      accessToken,
      refreshToken,
      userId: user.id,
    };

    await Promise.all([
      this.redis.hmset(lookupFormat.accessToken(accessToken), sessionData),
      this.redis.hmset(lookupFormat.refreshToken(refreshToken), sessionData),
    ]);

    return new Session({
      accessToken,
      refreshToken,
      user,
    });
  }

  /**
   * Invalidate refresh token for the given session
   */
  public async invalidateRefreshToken(session: Session): Promise<void> {
    await this.redis.hdel(
      lookupFormat.accessToken(session.accessToken),
      lookupFormat.refreshToken(session.refreshToken),
    );
  }

  /**
   * Lookup a session by access or refresh token
   */
  private async lookupSession(key: string): Promise<Session | undefined> {
    try {
      const { accessToken, refreshToken, userId } = await validateSchema(
        sessionDataSchema,
        await this.redis.hgetall(key),
      );

      const user = await this.userRepository.findById(userId);

      if (user === undefined) {
        return undefined;
      }

      return new Session({
        accessToken,
        refreshToken,
        user,
      });
    } catch (error) {
      if (error instanceof ValidateSchemaError) {
        return undefined;
      }

      throw error;
    }
  }
}
