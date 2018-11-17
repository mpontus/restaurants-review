import { IPagination } from 'common/interfaces/pagination.interface';
import { User } from './user.model';

/**
 * Describes paginated listing of users
 */
export class UserList implements IPagination<User> {
  /**
   * Total available number of users
   */
  public readonly total: number;

  /**
   * Users on the current page
   */
  public readonly items: User[];

  /**
   * Constructor
   */
  constructor(total: number, items: User[]) {
    this.total = total;
    this.items = items;
  }
}
