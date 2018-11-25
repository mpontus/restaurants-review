import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AuthModule } from 'auth/auth.module';
import { ConfigModule, ConfigService } from 'nestjs-config';
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
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService): TypeOrmModuleOptions => ({
        type: 'postgres',
        url: config.get('env.database_url'),
        entities: [`${__dirname}/**/*.entity{.ts,.js}`],
        migrations: [`${__dirname}/../migrations/*.ts`],
        migrationsRun: false,
      }),
      inject: [ConfigService],
    }),
    RedisModule.forRoot(process.env.REDIS_URL || undefined),
    ConfigModule.load(path.resolve(__dirname, 'config/**/*.{ts,js}')),
  ],
})
export class AppModule {}
