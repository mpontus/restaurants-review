import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Place } from 'places/model/place.model';
import { EntityManager } from 'typeorm';
import { User } from 'user/model/user.model';
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
      where: {
        pendingFor: criteria.ownerId,
        placeId: criteria.placeId,
      },
    });
  }

  /**
   * Return reviews matching criteria
   */
  public async findAll(criteria: FindReviewsCriteria): Promise<Review[]> {
    const items = await this.manager.find(ReviewEntity, {
      where: {
        pendingFor: criteria.ownerId,
        placeId: criteria.placeId,
      },
      take: criteria.take,
      skip: criteria.skip,
    });

    return items.map(this.transformEntity.bind(this));
  }

  /**
   * Return single review by id
   */
  public async findById(id: string): Promise<Review | undefined> {
    const reviewEntity = await this.manager.findOne(ReviewEntity, { id });

    if (reviewEntity === undefined) {
      return undefined;
    }

    return this.transformEntity(reviewEntity);
  }

  /**
   * Create new review
   */
  public async create(review: Review): Promise<Review> {
    const reviewEntity = this.manager.create(ReviewEntity, {
      id: uuid(),
      place: { id: review.place.id },
      author: { id: review.author.id },
      rating: review.rating,
      comment: review.comment,
      dateVisitted: review.dateVisitted,
      pendingFor: review.place.ownerId,
    });

    await this.manager.save(ReviewEntity, reviewEntity);

    return this.transformEntity(reviewEntity);
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
   * Map database object to domain model
   */
  private transformEntity(reviewEntity: ReviewEntity): Review {
    return new Review({
      place: new Place({ title: reviewEntity.place.title }),
      author: new User({ name: reviewEntity.author.name }),
      rating: reviewEntity.rating,
      comment: reviewEntity.comment,
      reply: reviewEntity.reply,
      dateVisitted: reviewEntity.dateVisitted,
    });
  }
}
