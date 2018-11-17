import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'auth/guards/auth.guard';
import { RolesGuard } from 'auth/guards/roles.guard';
import { CreatePlaceDto } from './model/create-place-dto.model';
import { ListPlacesCriteria } from './model/list-places-criteria.model';
import { PlaceList } from './model/place-list.model';
import { Place } from './model/place.model';
import { UpdatePlaceDto } from './model/update-place-dto.model';
import { PlaceService } from './place.service';

/**
 * Places Controller
 *
 * Provides API endpoints for place management
 */
@Controller('/places')
@UsePipes(new ValidationPipe({ transform: true }))
@UseInterceptors(ClassSerializerInterceptor)
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  /**
   * List existing places
   */
  @Get()
  @ApiOkResponse({ type: PlaceList })
  public async listPlaces(
    @Query() criteria: ListPlacesCriteria,
  ): Promise<PlaceList> {
    return this.placeService.listPlaces(criteria);
  }

  /**
   * Create new place
   */
  @Post()
  @UseGuards(AuthGuard)
  @UseGuards(new RolesGuard(['owner', 'admin']))
  @ApiBearerAuth()
  @ApiResponse({ status: 201, type: Place })
  public async createPlace(@Body() data: CreatePlaceDto): Promise<Place> {
    return this.placeService.createPlace(data);
  }

  /**
   * Retrieve single place
   */
  @Get(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: PlaceList })
  public async getPlace(@Param(':id') id: string): Promise<Place> {
    return this.placeService.getPlace(id);
  }

  /**
   * Update place
   */
  @Patch(':id')
  @UseGuards(AuthGuard)
  @UseGuards(new RolesGuard(['owner', 'admin']))
  @ApiBearerAuth()
  @ApiOkResponse({ type: Place })
  public async updatePlace(
    @Param('id') id: string,
    @Body() data: UpdatePlaceDto,
  ): Promise<Place> {
    return this.placeService.updatePlace(id, data);
  }

  /**
   * Update place
   */
  @Delete(':id')
  @UseGuards(AuthGuard)
  @UseGuards(new RolesGuard(['owner', 'admin']))
  @ApiBearerAuth()
  @ApiResponse({ status: 204, type: Place })
  public async deletePlace(@Param('id') id: string): Promise<void> {
    return this.placeService.deletePlace(id);
  }
}
