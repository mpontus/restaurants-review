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

    if (event instanceof ReviewCreatedEvent) {
      place.rating += (review.rating - place.rating) / (place.reviewCount + 1);
      place.reviewCount++;
    }

    if (event instanceof ReviewUpdatedEvent) {
      // Update event does not necessary include all previous values.
      if (!event.previousValues.rating) {
        return;
      }

      place.rating +=
        (review.rating - event.previousValues.rating) / place.reviewCount;
    }

    if (event instanceof ReviewDeletedEvent) {
      place.rating -= (review.rating - place.rating) / (place.reviewCount - 1);
      place.reviewCount--;
    }

    await this.placeRepository.update(place);
  }
}
