import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'auth/auth.module';
import { ConfigModule } from 'nestjs-config';
import * as path from 'path';
import { PlaceModule } from 'places/place.module';
import { RedisModule } from 'redis/redis.module';
import { ReviewModule } from 'reviews/review.module';
import { UserModule } from 'user/user.module';

/**
 * Application Module
 *
 * Responsible for bootstrapping the application
 */
@Module({
  imports: [
    AuthModule,
    UserModule,
    PlaceModule,
    ReviewModule,
    RedisModule.forRoot(process.env.REDIS_URL || undefined),
    TypeOrmModule.forRoot(),
    ConfigModule.load(path.resolve(__dirname, 'config/**/*.{ts,js}')),
  ],
})
export class AppModule {}
