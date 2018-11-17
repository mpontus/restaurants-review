import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { IsEmailUnique } from './validator/is-email-unique.validator';

/**
 * User Module
 *
 * Responsible for access to user records.
 */
@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, IsEmailUnique],
  imports: [TypeOrmModule.forFeature([UserEntity])],
  exports: [UserRepository],
})
export class UserModule {}
