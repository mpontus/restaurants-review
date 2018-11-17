import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, FindConditions } from 'typeorm';
import uuid from 'uuid';
import { PlaceEntity } from './entity/place.entity';
import { PlaceList } from './model/place-list.model';
import { ListPlacesCriteria } from './model/list-places-criteria.model';
import { Place } from './model/place.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PlaceRepository {
  constructor(@InjectEntityManager() private readonly manager: EntityManager) {}

  async count(criteria: ListPlacesCriteria): Promise<number> {
    return this.manager.count(PlaceEntity);
  }

  async findAll(criteria: ListPlacesCriteria): Promise<Place[]> {
    const items = await this.manager.find(PlaceEntity, {
      take: criteria.take,
      skip: criteria.skip,
    });

    return items.map(this.transformEntity.bind(this));
  }

  async findById(id: string) {
    const placeEntity = await this.manager.findOne(PlaceEntity, { id });

    if (placeEntity === undefined) {
      return undefined;
    }

    return this.transformEntity(placeEntity);
  }

  async create(place: Place) {
    const placeEntity = this.manager.create(PlaceEntity, {
      id: uuid(),
      title: place.title,
      address: place.address,
    });

    await this.manager.save(PlaceEntity, placeEntity);

    return this.transformEntity(placeEntity);
  }

  async update(place: Place) {
    await this.manager.update(PlaceEntity, place.id, {
      title: place.title,
      address: place.address,
    });
  }

  async remove(place: Place): Promise<void> {
    await this.manager.delete(PlaceEntity, place.id);
  }

  private transformEntity(placeEntity: PlaceEntity): Place {
    return new Place({
      id: placeEntity.id,
      ownerId: placeEntity.ownerId,
      title: placeEntity.title,
      address: placeEntity.address,
      rating: placeEntity.rating,
    });
  }
}
