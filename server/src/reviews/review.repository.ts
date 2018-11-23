import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, FindConditions } from 'typeorm';
import uuid from 'uuid';
import { ReviewEntity } from './entity/review.entity';
import { FindReviewsCriteria } from './model/find-reviews-criteria.model';
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
  public async findAll(criteria: FindReviewsCriteria): Promise<Review[]> {
    const items = await this.manager.find(ReviewEntity, {
      order: { createdAt: 'DESC' },
      where: this.createWhereClause(criteria),
      relations: ['place', 'author'],
      take: criteria.take,
      skip: criteria.skip,
    });

    return items.map(item => item.toModel());
  }

  /**
   * Return single review by id
   */
  public async findById(id: string): Promise<Review | undefined> {
    const reviewEntity = await this.manager.findOne(ReviewEntity, id, {
      relations: ['place', 'author'],
    });

    if (reviewEntity === undefined) {
      return undefined;
    }

    return reviewEntity.toModel();
  }

  /**
   * Create new review
   */
  public async create(review: Review): Promise<Review> {
    review.id = uuid();

    const reviewEntity = this.manager.create(ReviewEntity, {
      id: review.id,
      place: { id: review.place.id },
      author: { id: review.author.id },
      rating: review.rating,
      comment: review.comment,
      pendingFor: review.place ? review.place.ownerId : null,
    });

    await this.manager.save(ReviewEntity, reviewEntity);

    // Transfer generated date from database entity to model
    review.dateVisitted = reviewEntity.toModel().dateVisitted;

    return review;
  }

  /**
   * Update review details
   */
  public async update(review: Review): Promise<Review> {
    await this.manager.update(ReviewEntity, review.id, {
      rating: review.rating,
      comment: review.comment,
      reply: review.reply,
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
}
