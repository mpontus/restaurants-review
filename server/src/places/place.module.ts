import { Module, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { CQRSModule, EventBus } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'auth/auth.module';
import { ReviewModule } from 'reviews/review.module';
import { PlaceEntity } from './entity/place.entity';
import { EventHandlers } from './events/handlers';
import { PlaceController } from './place.controller';
import { PlaceRepository } from './place.repository';
import { PlaceService } from './place.service';

/**
 * Place Module
 *
 * Responsible for access to place records.
 */
@Module({
  controllers: [PlaceController],
  providers: [PlaceService, PlaceRepository, ...EventHandlers],
  imports: [
    AuthModule,
    ReviewModule,
    CQRSModule,
    TypeOrmModule.forFeature([PlaceEntity]),
  ],
  exports: [PlaceRepository],
})
export class PlaceModule implements OnModuleInit {
  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly event$: EventBus,
  ) {}

  /**
   * Initialize EventBus
   */
  public onModuleInit(): void {
    this.event$.setModuleRef(this.moduleRef);
    this.event$.register(EventHandlers);
  }
}
