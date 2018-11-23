import { IEvent } from '@nestjs/cqrs';
import { Review } from 'reviews/model/review.model';

/**
 * Review Deleted Event
 *
 * Dispatched on review deletion.
 */
export class ReviewDeletedEvent implements IEvent {
  constructor(public readonly review: Review) {}
}
