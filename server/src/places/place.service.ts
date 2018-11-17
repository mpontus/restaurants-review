import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Principal } from 'common/model/principal.model';
import { CreatePlaceDto } from './model/create-place-dto.model';
import { ListPlacesCriteria } from './model/list-places-criteria.model';
import { PlaceList } from './model/place-list.model';
import { Place } from './model/place.model';
import { UpdatePlaceDto } from './model/update-place-dto.model';
import { PlaceRepository } from './place.repository';

/**
 * Place Service
 *
 * Describes common use-case scenarios with place objects.
 */
@Injectable()
export class PlaceService {
  constructor(private readonly placeRepository: PlaceRepository) {}

  /**
   * Retrieve single place by its ID
   */
  public async getPlace(id: string): Promise<Place> {
    const place = await this.placeRepository.findById(id);

    if (place === undefined) {
      throw new NotFoundException();
    }

    return place;
  }

  /**
   * List places
   */
  public async listPlaces(criteria: ListPlacesCriteria): Promise<PlaceList> {
    const total = await this.placeRepository.count(criteria);
    const items = await this.placeRepository.findAll(criteria);

    return new PlaceList(total, items);
  }

  /**
   * Create new place
   */
  public async createPlace(
    actor: Principal,
    data: CreatePlaceDto,
  ): Promise<Place> {
    const place = new Place({
      ownerId: actor.id,
      title: data.title,
      address: data.address,
    });

    return this.placeRepository.create(place);
  }

  /**
   * Update place details
   */
  public async updatePlace(
    actor: Principal,
    id: string,
    update: UpdatePlaceDto,
  ): Promise<Place> {
    const place = await this.placeRepository.findById(id);

    if (place === undefined) {
      throw new NotFoundException();
    }

    if (place.ownerId !== actor.id && !actor.roles.includes('admin')) {
      throw new ForbiddenException();
    }

    Object.assign(place, {
      title: update.title || place.title,
      address: update.address || place.address,
    });

    return place;
  }

  /**
   * Delete place by id
   */
  public async deletePlace(actor: Principal, id: string): Promise<void> {
    const place = await this.placeRepository.findById(id);

    if (place === undefined) {
      throw new NotFoundException();
    }

    if (place.ownerId !== actor.id && !actor.roles.includes('admin')) {
      throw new ForbiddenException();
    }

    await this.placeRepository.remove(place);
  }
}
