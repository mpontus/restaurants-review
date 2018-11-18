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
  Req,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'auth/guards/auth.guard';
import { RolesGuard } from 'auth/guards/roles.guard';
import { IAuthRequest } from 'common/interfaces/auth-request.interface';
import { CreatePlaceDto } from './model/create-place-dto.model';
import { FindPlacesCriteria } from './model/find-places-criteria.model';
import { ListPublicPlacesCriteria } from './model/list-public-places-criteria';
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
   * Retrieve single place
   */
  @Get(':id')
  @ApiOkResponse({ type: Place })
  public async getPlace(@Param('id') id: string): Promise<Place> {
    return this.placeService.getPlace(id);
  }

  /**
   * List existing places
   */
  @Get()
  @ApiOkResponse({ type: PlaceList })
  public async listPlaces(
    @Query() criteria: ListPublicPlacesCriteria,
  ): Promise<PlaceList> {
    return this.placeService.listPlaces(new FindPlacesCriteria(criteria));
  }

  /**
   * Create new place
   */
  @Post()
  @UseGuards(AuthGuard, new RolesGuard(['owner', 'admin']))
  @ApiBearerAuth()
  @ApiResponse({ status: 201, type: Place })
  public async createPlace(
    @Req() req: IAuthRequest,
    @Body() data: CreatePlaceDto,
  ): Promise<Place> {
    return this.placeService.createPlace(req.user, data);
  }

  /**
   * Update place
   */
  @Patch(':id')
  @UseGuards(AuthGuard, new RolesGuard(['owner', 'admin']))
  @ApiBearerAuth()
  @ApiOkResponse({ type: Place })
  public async updatePlace(
    @Req() req: IAuthRequest,
    @Param('id') id: string,
    @Body() data: UpdatePlaceDto,
  ): Promise<Place> {
    return this.placeService.updatePlace(req.user, id, data);
  }

  /**
   * Update place
   */
  @Delete(':id')
  @UseGuards(AuthGuard, new RolesGuard(['owner', 'admin']))
  @ApiBearerAuth()
  @ApiResponse({ status: 204, type: Place })
  public async deletePlace(
    @Req() req: IAuthRequest,
    @Param('id') id: string,
  ): Promise<void> {
    return this.placeService.deletePlace(req.user, id);
  }
}
