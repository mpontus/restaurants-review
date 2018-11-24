import { Injectable, NotFoundException } from '@nestjs/common';
import { Principal } from 'common/model/principal.model';
import { CreatePlaceDto } from './model/create-place-dto.model';
import { FindPlacesCriteria } from './model/find-places-criteria.model';
import { ListOwnPlacesCriteria } from './model/list-own-places-criteria.model';
import { ListPublicPlacesCriteria } from './model/list-public-places-criteria.model';
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
  public async getPlace(
    actor: Principal | undefined,
    id: string,
  ): Promise<Place> {
    const place = await this.placeRepository.findById(actor, id);

    if (place === undefined) {
      throw new NotFoundException();
    }

    return place;
  }

  /**
   * List public places
   */
  public async listPublicPlaces(
    actor: Principal | undefined,
    criteria: ListPublicPlacesCriteria,
  ): Promise<PlaceList> {
    const findCriteria = new FindPlacesCriteria({
      order: 'rating',
      rating: criteria.rating,
      take: criteria.take,
      skip: criteria.skip,
    });
    const total = await this.placeRepository.count(findCriteria);
    const items = await this.placeRepository.findAll(actor, findCriteria);

    return new PlaceList(total, items);
  }

  /**
   * List own places
   */
  public async listOwnPlaces(
    actor: Principal,
    { take, skip }: ListOwnPlacesCriteria,
  ): Promise<PlaceList> {
    const criteria = new FindPlacesCriteria({
      order: 'name',
      ownerId: actor.id,
      take,
      skip,
    });
    const total = await this.placeRepository.count(criteria);
    const items = await this.placeRepository.findAll(actor, criteria);

    return new PlaceList(total, items);
  }

  /**
   * Create new place
   */
  public async createPlace(
    actor: Principal,
    data: CreatePlaceDto,
  ): Promise<Place> {
    const place = new Place(actor, {
      ownerId: actor.id,
      title: data.title,
      address: data.address,
    });

    return this.placeRepository.create(actor, place);
  }

  /**
   * Update place details
   */
  public async updatePlace(
    actor: Principal,
    place: Place,
    update: UpdatePlaceDto,
  ): Promise<Place> {
    return this.placeRepository.update(place, {
      title: update.title,
      address: update.address,
    });
  }

  /**
   * Delete place by id
   */
  public async deletePlace(actor: Principal, place: Place): Promise<void> {
    await this.placeRepository.remove(place);
  }
}
