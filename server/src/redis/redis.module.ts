import {
  DynamicModule,
  Global,
  Inject,
  Module,
  OnModuleDestroy,
} from '@nestjs/common';
import Redis, { Redis as RedisClient, RedisOptions } from 'ioredis';

/**
 * Redis Module
 *
 * Provides global Redis client instance
 */
@Global()
@Module({})
export class RedisModule implements OnModuleDestroy {
  /**
   * Inject redis client into a module
   */
  constructor(@Inject(Redis) private readonly redis: RedisClient) {}

  /**
   * Create dynamic module
   */
  public static forRoot(host?: string, options?: RedisOptions): DynamicModule {
    const redisProvider = {
      provide: Redis,
      useFactory: () => new Redis(host, options),
    };

    return {
      module: RedisModule,
      providers: [redisProvider],
      exports: [redisProvider],
    };
  }

  /**
   * Destroy redis client after application is closed
   */
  public async onModuleDestroy(): Promise<string> {
    return this.redis.quit();
  }
}
