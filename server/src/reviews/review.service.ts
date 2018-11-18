import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Principal } from 'common/model/principal.model';
import { Place } from 'places/model/place.model';
import { UserRepository } from 'user/user.repository';
import { CreateReviewDto } from './model/create-review-dto.model';
import { FindReviewsCriteria } from './model/find-reviews-criteria.model';
import { ListPendingReviewsCriteria } from './model/list-pending-reviews-criteria.model';
import { ListPlaceReviewsCriteria } from './model/list-place-reviews-criteria.model';
import { ReviewList } from './model/review-list.model';
import { Review } from './model/review.model';
import { UpdateReviewDto } from './model/update-review-dto.model';
import { ReviewRepository } from './review.repository';

export class ReviewService {
  constructor(
    private readonly reviewRepository: ReviewRepository,
    private readonly userRepository: UserRepository,
  ) {}

  public async getReview(id: string): Promise<Review> {
    const review = await this.reviewRepository.findById(id);

    if (review === undefined) {
      throw new NotFoundException();
    }

    return review;
  }

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
    const items = await this.reviewRepository.findAll(findCriteria);

    return new ReviewList(total, items);
  }

  public async listPlaceReviews(
    place: Place,
    criteria: ListPlaceReviewsCriteria,
  ): Promise<ReviewList> {
    const findCriteria = new FindReviewsCriteria({
      placeId: place.id,
      take: criteria.take,
      skip: criteria.skip,
    });
    const total = await this.reviewRepository.count(findCriteria);
    const items = await this.reviewRepository.findAll(findCriteria);

    return new ReviewList(total, items);
  }

  public async createReview(
    actor: Principal,
    place: Place,
    data: CreateReviewDto,
  ): Promise<Review> {
    const user = await this.userRepository.findById(actor.id);

    if (user === undefined) {
      throw new UnauthorizedException();
    }

    const review = new Review({
      place,
      author: user,
      rating: data.rating,
      comment: data.comment,
      dateVisitted: data.dateVisitted,
    });

    return this.reviewRepository.create(review);
  }

  public async updateReview(
    actor: Principal,
    review: Review,
    data: UpdateReviewDto,
  ): Promise<Review> {
    Object.assign(review, {
      rating: data.rating || review.rating,
      comment: data.comment || review.comment,
      reply: data.reply || review.reply,
      dateVisitted: data.dateVisitted || review.dateVisitted,
    });

    return this.reviewRepository.update(review);
  }

  public async replyToReview(
    actor: Principal,
    review: Review,
    reply: ReplyDto,
  ): Promise<Review> {
    review.reply = reply.comment;

    return this.reviewRepository.update(review);
  }

  public async deleteReview(actor: Principal, review: Review): Promise<void> {
    await this.reviewRepository.remove(review);
  }
}
