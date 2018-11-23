import { IEvent } from '@nestjs/cqrs';
import { Review } from 'reviews/model/review.model';

/**
 * Review Created Event
 *
 * Dispatched on review creation.
 */
export class ReviewCreatedEvent implements IEvent {
  constructor(public readonly review: Review) {}
}
