import { IPagination } from 'common/interfaces/pagination.interface';
import { Place } from './place.model';

/**
 * Describes paginated listing of users
 */
export class PlaceList implements IPagination<Place> {
  /**
   * Total available number of users
   */
  public readonly total: number;

  /**
   * Places on the current page
   */
  public readonly items: Place[];

  /**
   * Constructor
   */
  constructor(total: number, items: Place[]) {
    this.total = total;
    this.items = items;
  }
}
