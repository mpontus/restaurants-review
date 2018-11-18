import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Between, EntityManager, FindConditions } from 'typeorm';
import uuid from 'uuid';
import { PlaceEntity } from './entity/place.entity';
import { FindPlacesCriteria } from './model/find-places-criteria.model';
import { Place } from './model/place.model';

/**
 * Place Repository
 *
 * Resonsible for persisting and retrieval of place objects.
 */
@Injectable()
export class PlaceRepository {
  constructor(@InjectEntityManager() private readonly manager: EntityManager) {}

  /**
   * Count all existing places matching criteria
   */
  public async count(criteria: FindPlacesCriteria): Promise<number> {
    return this.manager.count(PlaceEntity, {
      where: this.createWhereClause(criteria),
    });
  }

  /**
   * Return places matching criteria
   */
  public async findAll(criteria: FindPlacesCriteria): Promise<Place[]> {
    const items = await this.manager.find(PlaceEntity, {
      where: this.createWhereClause(criteria),
      take: criteria.take,
      skip: criteria.skip,
    });

    return items.map(this.transformEntity.bind(this));
  }

  /**
   * Return single place by id
   */
  public async findById(id: string): Promise<Place | undefined> {
    const placeEntity = await this.manager.findOne(PlaceEntity, { id });

    if (placeEntity === undefined) {
      return undefined;
    }

    return this.transformEntity(placeEntity);
  }

  /**
   * Create new place
   */
  public async create(place: Place): Promise<Place> {
    const placeEntity = this.manager.create(PlaceEntity, {
      id: uuid(),
      owner: { id: place.ownerId },
      title: place.title,
      address: place.address,
    });

    await this.manager.save(PlaceEntity, placeEntity);

    return this.transformEntity(placeEntity);
  }

  /**
   * Update place details
   */
  public async update(place: Place): Promise<Place> {
    await this.manager.update(PlaceEntity, place.id, {
      title: place.title,
      address: place.address,
    });

    return place;
  }

  /**
   * Delete a place from database
   */
  public async remove(place: Place): Promise<void> {
    await this.manager.delete(PlaceEntity, place.id);
  }

  /**
   * Create WHERE clause according to listing criteria
   */
  private createWhereClause(
    criteria: FindPlacesCriteria,
  ): FindConditions<PlaceEntity> {
    const where: FindConditions<PlaceEntity> = {};

    if (criteria.rating !== undefined) {
      where.rating = Between(criteria.minRating(), criteria.maxRating());
    }

    if (criteria.ownerId !== undefined) {
      where.ownerId = criteria.ownerId;
    }

    return where;
  }

  /**
   * Map database object to domain model
   */
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
