import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { UserRepository } from './user.repository';

/**
 * User Module
 *
 * Responsible for access to user records.
 */
@Module({
  providers: [UserRepository],
  imports: [TypeOrmModule.forFeature([UserEntity])],
  exports: [UserRepository],
})
export class UserModule {}
