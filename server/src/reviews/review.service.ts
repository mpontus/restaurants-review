import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { Principal } from 'common/model/principal.model';
import { Place } from 'places/model/place.model';
import { UserRepository } from 'user/user.repository';
import { ReviewCreatedEvent } from './events/review-created.event';
import { ReviewDeletedEvent } from './events/review-deleted.event';
import { ReviewUpdatedEvent } from './events/review-updated.event';
import { CreateReviewDto } from './model/create-review-dto.model';
import { FindReviewsCriteria } from './model/find-reviews-criteria.model';
import { ListPendingReviewsCriteria } from './model/list-pending-reviews-criteria.model';
import { ListPlaceReviewsCriteria } from './model/list-place-reviews-criteria.model';
import { ReplyDto } from './model/reply-dto.model';
import { ReviewAuthor } from './model/review-author.model';
import { ReviewList } from './model/review-list.model';
import { Review } from './model/review.model';
import { UpdateReviewDto } from './model/update-review-dto.model';
import { ReviewRepository } from './review.repository';

/**
 * Review Service
 *
 * Responsible for managing place reviews.
 */
@Injectable()
export class ReviewService {
  constructor(
    private readonly reviewRepository: ReviewRepository,
    private readonly userRepository: UserRepository,
    private readonly eventBus: EventBus,
  ) {}

  /**
   * Retrieve single review by id
   */
  public async getReview(
    actor: Principal | undefined,
    id: string,
  ): Promise<Review> {
    const review = await this.reviewRepository.findById(actor, id);

    if (review === undefined) {
      throw new NotFoundException();
    }

    return review;
  }

  /**
   * Return a list of the reviews pending for the user
   */
  public async listPendingReviews(
    actor: Principal,
    criteria: ListPendingReviewsCriteria,
  ): Promise<ReviewList> {
    const findCriteria = new FindReviewsCriteria({
      ownerId: actor.id,
      take: criteria.take,
      skip: criteria.skip,
    });

    const total = await this.reviewRepository.count(findCriteria);
    const items = await this.reviewRepository.findAll(actor, findCriteria);

    return new ReviewList(total, items);
  }

  /**
   * Return a list of the reviews for a place
   */
  public async listPlaceReviews(
    actor: Principal | undefined,
    place: Place,
    criteria: ListPlaceReviewsCriteria,
  ): Promise<ReviewList> {
    const findCriteria = new FindReviewsCriteria({
      placeId: place.id,
      take: criteria.take,
      skip: criteria.skip,
      // Exclude reviews which are already included in place details
      exclude: [
        place.bestReview && place.bestReview.id,
        place.worstReview && place.worstReview.id,
      ].filter((s?: string): s is string => s !== undefined),
    });
    const total = await this.reviewRepository.count(findCriteria);
    const items = await this.reviewRepository.findAll(actor, findCriteria);

    return new ReviewList(total, items);
  }

  /**
   * Return lowest and highest rated reviews for a place
   */
  public async getMarginReviews(
    place: Place,
  ): Promise<[Review | undefined, Review | undefined]> {
    let worst = await this.reviewRepository.findWorstReview(place);
    let best = await this.reviewRepository.findBestReview(place);

    if (best !== undefined && best.rating <= 3) {
      best = undefined;
    }

    if (worst !== undefined && worst.rating > 3) {
      worst = undefined;
    }

    return [worst, best];
  }

  /**
   * Create new review
   */
  public async createReview(
    actor: Principal,
    place: Place,
    data: CreateReviewDto,
  ): Promise<Review> {
    const user = await this.userRepository.findById(undefined, actor.id);

    if (user === undefined) {
      throw new UnauthorizedException();
    }

    const review = new Review(actor, {
      place,
      author: new ReviewAuthor(user),
      rating: data.rating,
      comment: data.comment,
      pendingFor: place.ownerId,
    });

    const result = await this.reviewRepository.create(actor, review);

    this.eventBus.publish(new ReviewCreatedEvent(result));

    return result;
  }

  /**
   * Update a review
   */
  public async updateReview(
    actor: Principal,
    review: Review,
    data: UpdateReviewDto,
  ): Promise<Review> {
    const previousRating = review.rating;

    Object.assign(review, {
      rating: data.rating || review.rating,
      comment: data.comment || review.comment,

      // Reset reply when its an empty string, otherwise update the reply
      reply: data.reply === '' ? undefined : data.reply || review.reply,

      // Remove pendingFor the first time reply is populated
      pendingFor: data.reply ? undefined : review.pendingFor,
    });

    const result = await this.reviewRepository.update(review);

    this.eventBus.publish(
      new ReviewUpdatedEvent(result, {
        rating: previousRating,
      }),
    );

    return result;
  }

  /**
   * Reply to review
   */
  public async replyToReview(
    actor: Principal,
    review: Review,
    reply: ReplyDto,
  ): Promise<Review> {
    review.reply = reply.comment;
    review.pendingFor = undefined;

    const result = await this.reviewRepository.update(review);

    this.eventBus.publish(new ReviewUpdatedEvent(result, {}));

    return result;
  }

  /**
   * Delete a review
   */
  public async deleteReview(actor: Principal, review: Review): Promise<void> {
    await this.reviewRepository.remove(review);

    this.eventBus.publish(new ReviewDeletedEvent(review));
  }
}
