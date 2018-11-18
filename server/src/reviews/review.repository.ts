import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Place } from 'places/model/place.model';
import { EntityManager, FindConditions } from 'typeorm';
import uuid from 'uuid';
import { ReviewEntity } from './entity/review.entity';
import { FindReviewsCriteria } from './model/find-reviews-criteria.model';
import { ReviewAuthor } from './model/review-author.model';
import { ReviewProjection } from './model/review-projection.model';
import { Review } from './model/review.model';

/**
 * Review Repository
 *
 * Resonsible for persisting and retrieval of review objects.
 */
@Injectable()
export class ReviewRepository {
  constructor(@InjectEntityManager() private readonly manager: EntityManager) {}

  /**
   * Count all existing reviews matching criteria
   */
  public async count(criteria: FindReviewsCriteria): Promise<number> {
    return this.manager.count(ReviewEntity, {
      where: this.createWhereClause(criteria),
    });
  }

  /**
   * Return reviews matching criteria
   */
  public async findAll(
    criteria: FindReviewsCriteria,
    projection: ReviewProjection,
  ): Promise<Review[]> {
    const items = await this.manager.find(ReviewEntity, {
      where: this.createWhereClause(criteria),
      relations: this.createRelationsClause(projection),
      take: criteria.take,
      skip: criteria.skip,
    });

    return items.map(this.transformEntity.bind(this, projection));
  }

  /**
   * Return single review by id
   */
  public async findById(
    id: string,
    projection: ReviewProjection,
  ): Promise<Review | undefined> {
    const reviewEntity = await this.manager.findOne(ReviewEntity, { id });

    if (reviewEntity === undefined) {
      return undefined;
    }

    return this.transformEntity(projection, reviewEntity);
  }

  /**
   * Create new review
   */
  public async create(review: Review): Promise<Review> {
    const reviewEntity = this.manager.create(ReviewEntity, {
      id: uuid(),
      place: review.place ? { id: review.place.id } : undefined,
      author: {
        id: review.author.id,
        name: review.author.name,
      },
      rating: review.rating,
      comment: review.comment,
      dateVisitted: review.dateVisitted,
      pendingFor: review.place ? review.place.ownerId : null,
    });

    await this.manager.save(ReviewEntity, reviewEntity);

    return this.transformEntity({ author: true, place: false }, reviewEntity);
  }

  /**
   * Update review details
   */
  public async update(review: Review): Promise<Review> {
    await this.manager.update(ReviewEntity, review.id, {
      rating: review.rating,
      comment: review.comment,
      reply: review.reply,
      dateVisitted: review.dateVisitted,
      ...(review.reply ? { pendingFor: null } : {}),
    });

    return review;
  }

  /**
   * Delete a review from database
   */
  public async remove(review: Review): Promise<void> {
    await this.manager.delete(ReviewEntity, review.id);
  }

  /**
   * Create WHERE clause according to listing criteria
   */
  private createWhereClause(
    criteria: FindReviewsCriteria,
  ): FindConditions<ReviewEntity> {
    const where: FindConditions<ReviewEntity> = {};

    if (criteria.ownerId !== undefined) {
      where.pendingFor = criteria.ownerId;
    }

    if (criteria.placeId !== undefined) {
      where.place = { id: criteria.placeId };
    }

    return where;
  }

  /**
   * Create an array of related entities which must be included in
   * database query.
   */
  private createRelationsClause(projection: ReviewProjection): string[] {
    return [
      ...(projection.author ? ['author'] : []),
      ...(projection.place ? ['place'] : []),
    ];
  }

  /**
   * Map database object to domain model
   */
  private transformEntity(
    projection: ReviewProjection,
    reviewEntity: ReviewEntity,
  ): Review {
    return new Review({
      place: projection.place
        ? new Place({
            id: reviewEntity.place.id,
            title: reviewEntity.place.title,
          })
        : undefined,
      author: projection.author
        ? new ReviewAuthor({
            id: reviewEntity.author.id,
            name: reviewEntity.author.name,
          })
        : undefined,
      rating: reviewEntity.rating,
      comment: reviewEntity.comment,
      reply: reviewEntity.reply || undefined,
      dateVisitted: reviewEntity.dateVisitted,
    });
  }
}
