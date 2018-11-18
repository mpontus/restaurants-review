import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'auth/auth.module';
import { UserModule } from 'user/user.module';
import { ReviewEntity } from './entity/review.entity';
import { ReviewController } from './review.controller';
import { ReviewRepository } from './review.repository';
import { ReviewService } from './review.service';

/**
 * Review Module
 *
 * Reposible for managing review reviews.
 */
@Module({
  controllers: [ReviewController],
  providers: [ReviewService, ReviewRepository],
  imports: [AuthModule, UserModule, TypeOrmModule.forFeature([ReviewEntity])],
  exports: [ReviewService],
})
export class ReviewModule {}
