import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PlaceRepository } from 'places/place.repository';
import { ReviewCreatedEvent } from 'reviews/events/review-created.event';
import { ReviewDeletedEvent } from 'reviews/events/review-deleted.event';
import { ReviewUpdatedEvent } from 'reviews/events/review-updated.event';

/**
 * Events that may trigger rating update
 */
type Events = ReviewCreatedEvent | ReviewUpdatedEvent | ReviewDeletedEvent;

/**
 * Update Place Rating
 */
@EventsHandler(ReviewCreatedEvent, ReviewUpdatedEvent, ReviewDeletedEvent)
export class UpdateRating implements IEventHandler<Events> {
  constructor(private readonly placeRepository: PlaceRepository) {}

  /**
   * Update place rating when reviews are updated using incremental
   * averaging formulas.
   */
  public async handle(event: Events): Promise<void> {
    const { review } = event;
    const { place } = review;
    let { rating, reviewCount } = place;

    if (event instanceof ReviewCreatedEvent) {
      rating += (review.rating - rating) / (reviewCount + 1);
      reviewCount++;
    }

    if (event instanceof ReviewUpdatedEvent) {
      // Update event does not necessary include all previous values.
      if (!event.previousValues.rating) {
        return;
      }

      rating += (review.rating - event.previousValues.rating) / reviewCount;
    }

    if (event instanceof ReviewDeletedEvent) {
      if (reviewCount <= 1) {
        // Prevent division by zero
        rating = 0;
      } else {
        rating -= (review.rating - place.rating) / (reviewCount - 1);
      }

      reviewCount--;
    }

    await this.placeRepository.update(place, { rating, reviewCount });
  }
}
