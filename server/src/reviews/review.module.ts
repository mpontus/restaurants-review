import { Module, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { CQRSModule, EventBus } from '@nestjs/cqrs';
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
 * Responsible for managing review reviews.
 */
@Module({
  controllers: [ReviewController],
  providers: [ReviewService, ReviewRepository],
  imports: [
    AuthModule,
    UserModule,
    CQRSModule,
    TypeOrmModule.forFeature([ReviewEntity]),
  ],
  exports: [ReviewService],
})
export class ReviewModule implements OnModuleInit {
  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly event$: EventBus,
  ) {}

  /**
   * Initialize EventBus
   */
  public onModuleInit(): void {
    this.event$.setModuleRef(this.moduleRef);
  }
}
