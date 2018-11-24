import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Principal } from 'common/model/principal.model';
import { clean } from 'common/utils/clean';
import { Between, DeepPartial, EntityManager, FindConditions } from 'typeorm';
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
  public async findAll(
    actor: Principal | undefined,
    criteria: FindPlacesCriteria,
  ): Promise<Place[]> {
    const items = await this.manager.find(PlaceEntity, {
      order:
        criteria.order === 'rating' ? { rating: 'DESC' } : { title: 'ASC' },
      where: this.createWhereClause(criteria),
      take: criteria.take,
      skip: criteria.skip,
    });

    return items.map(item => item.toModel(actor));
  }

  /**
   * Return single place by id
   */
  public async findById(
    actor: Principal | undefined,
    id: string,
  ): Promise<Place | undefined> {
    const queryBuilder = this.manager
      .createQueryBuilder(PlaceEntity, 'place')
      .where({ id })
      // Include relations for best review and worst review
      .leftJoinAndSelect('place.bestReview', 'bestReview')
      .leftJoinAndSelect('bestReview.author', 'bestReview_author')
      .leftJoinAndSelect('place.worstReview', 'worstReview')
      .leftJoinAndSelect('worstReview.author', 'worstReview_author');

    // Include user's own review when the request is made by
    // authenticated user.
    if (actor !== undefined) {
      queryBuilder
        .leftJoinAndSelect(
          'place.ownReview',
          'ownReview',
          'ownReview.author = :id',
          { id: actor.id },
        )
        .leftJoinAndSelect('ownReview.author', 'ownReview_author');
    }

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
    const update: DeepPartial<PlaceEntity> = clean({
      title: diff.title,
      address: diff.address,
      rating: diff.rating,
      reviewCount: diff.reviewCount,
      bestReview: diff.bestReview
        ? { id: diff.bestReview.id }
        : diff.bestReview,
      worstReview: diff.worstReview
        ? { id: diff.worstReview.id }
        : diff.worstReview,
    });

    await this.manager.update(PlaceEntity, place.id, update);

    return Object.assign(place, clean(diff));
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
}
