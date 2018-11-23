import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PlaceRepository } from 'places/place.repository';
import { ReviewCreatedEvent } from 'reviews/events/review-created.event';
import { ReviewDeletedEvent } from 'reviews/events/review-deleted.event';
import { ReviewUpdatedEvent } from 'reviews/events/review-updated.event';
import { Review } from 'reviews/model/review.model';
import { ReviewService } from 'reviews/review.service';

/**
 * Update Margin Reviews
 */
@EventsHandler(ReviewCreatedEvent, ReviewUpdatedEvent, ReviewDeletedEvent)
export class UpdateMarginReviews implements IEventHandler<{ review: Review }> {
  constructor(
    private readonly reviewService: ReviewService,
    private readonly placeRepository: PlaceRepository,
  ) {}

  /**
   * Update best/worst place review when reviews are updated.
   */
  public async handle(event: { review: Review }): Promise<void> {
    const { place } = event.review;

    Logger.log(
      `Updating margin reviews for place: ${place.id} (${place.title})`,
      UpdateMarginReviews.name,
    );

    const [worstReview, bestReview] = await this.reviewService.getMarginReviews(
      place,
    );

    Logger.log({ place, worstReview, bestReview }, UpdateMarginReviews.name);

    await this.placeRepository.update(place, { worstReview, bestReview });
  }
}
