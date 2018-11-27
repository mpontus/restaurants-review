import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Principal } from 'common/model/principal.model';
import { objectRemoveUndefined } from 'common/utils/object-remove-undefined';
import {
  Between,
  DeepPartial,
  EntityManager,
  FindConditions,
  SelectQueryBuilder,
} from 'typeorm';
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
   *
   * Skip query builder for lighter query.
   */
  public async count(criteria: FindPlacesCriteria): Promise<number> {
    const conditions: FindConditions<PlaceEntity> = {};

    if (criteria.rating !== undefined) {
      conditions.rating = Between(criteria.minRating(), criteria.maxRating());
    }

    if (criteria.ownerId !== undefined) {
      conditions.ownerId = criteria.ownerId;
    }

    return this.manager.count(PlaceEntity, conditions);
  }

  /**
   * Return places matching criteria
   */
  public async findAll(
    actor: Principal | undefined,
    criteria: FindPlacesCriteria,
  ): Promise<Place[]> {
    const queryBuilder = this.createQueryBuilder(actor, criteria);
    const items = await queryBuilder.getMany();

    return items.map(item => item.toModel(actor));
  }

  /**
   * Return single place by id
   */
  public async findById(
    actor: Principal | undefined,
    id: string,
  ): Promise<Place | undefined> {
    const queryBuilder = this.createQueryBuilder(actor, id);
    const placeEntity = await queryBuilder.getOne();

    if (placeEntity === undefined) {
      return undefined;
    }

    return placeEntity.toModel(actor);
  }

  /**
   * Create new place
   */
  public async create(
    actor: Principal | undefined,
    place: Place,
  ): Promise<Place> {
    const placeEntity = this.manager.create(PlaceEntity, {
      id: uuid(),
      owner: { id: place.ownerId },
      title: place.title,
      address: place.address,
    });

    await this.manager.save(PlaceEntity, placeEntity);

    return placeEntity.toModel(actor);
  }

  /**
   * Update place details
   */
  public async update(place: Place, diff: Partial<Place>): Promise<Place> {
    // Remove undefined non-nullable fields
    const update: DeepPartial<PlaceEntity> = objectRemoveUndefined({
      title: diff.title,
      address: diff.address,
      rating: diff.rating,
      reviewCount: diff.reviewCount,
    });

    // Allow resetting bestReview
    if ('bestReview' in diff) {
      update.bestReview = diff.bestReview ? { id: diff.bestReview.id } : null;
    }

    // Allow resetting worst review
    if ('worstReview' in diff) {
      update.worstReview = diff.worstReview
        ? { id: diff.worstReview.id }
        : null;
    }

    await this.manager.update(PlaceEntity, place.id, update);

    return Object.assign(place, objectRemoveUndefined(diff));
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
  private createQueryBuilder(
    actor: Principal | undefined,
    criteria: string | FindPlacesCriteria,
  ): SelectQueryBuilder<PlaceEntity> {
    const queryBuilder = this.manager.createQueryBuilder(PlaceEntity, 'place');

    // Find place by id
    if (typeof criteria === 'string') {
      queryBuilder.where('place.id = :id', {
        id: criteria,
      });
    } else {
      // Filter by owner
      if (criteria.ownerId !== undefined) {
        queryBuilder.where('place.ownerId = :id', {
          id: criteria.ownerId,
        });
      }

      // Filter by rating
      if (criteria.rating !== undefined) {
        queryBuilder.where('place.rating BETWEEN :min AND :max', {
          min: criteria.minRating(),
          max: criteria.maxRating(),
        });
      }

      // Apply ordering
      if (criteria.order === 'name') {
        queryBuilder.orderBy({ 'place.title': 'ASC' });
      } else if (criteria.order === 'rating') {
        queryBuilder.orderBy({ 'place.rating': 'DESC' });
      }

      // Apply offset and limit
      queryBuilder.offset(criteria.skip).limit(criteria.take);
    }

    // Embed best and worst reviews
    queryBuilder
      .leftJoinAndSelect('place.bestReview', 'bestReview')
      .leftJoinAndSelect('bestReview.author', 'bestReview_author')
      .leftJoinAndSelect('place.worstReview', 'worstReview')
      .leftJoinAndSelect('worstReview.author', 'worstReview_author');

    // Embed user's own review
    if (actor !== undefined) {
      queryBuilder
        .leftJoinAndSelect(
          'place.ownReview',
          'ownReview',
          'ownReview.author = :userId',
          { userId: actor.id },
        )
        .leftJoinAndSelect('ownReview.author', 'ownReview_author');
    }

    return queryBuilder;
  }
}
