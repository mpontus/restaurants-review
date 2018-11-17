import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'auth/auth.module';
import { PlaceEntity } from './entity/place.entity';
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
  providers: [PlaceService, PlaceRepository],
  imports: [AuthModule, TypeOrmModule.forFeature([PlaceEntity])],
  exports: [PlaceRepository],
})
export class PlaceModule {}
