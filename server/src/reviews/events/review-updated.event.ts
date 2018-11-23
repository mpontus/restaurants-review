import { IEvent } from '@nestjs/cqrs';
import { Review } from 'reviews/model/review.model';

/**
 * Review Updated Event
 *
 * Dispatched on review update.
 */
export class ReviewUpdatedEvent implements IEvent {
  constructor(public readonly review: Review) {}
}
