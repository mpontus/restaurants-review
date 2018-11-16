import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'auth/auth.module';
import { ConfigModule } from 'nestjs-config';
import * as path from 'path';
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
    TypeOrmModule.forRoot(),
    ConfigModule.load(path.resolve(__dirname, 'config/**/*.{ts,js}')),
  ],
})
export class AppModule {}
