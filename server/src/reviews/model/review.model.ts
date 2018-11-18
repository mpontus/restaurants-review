import { Place } from 'places/model/place.model';
import { User } from 'user/model/user.model';

export class Review {
  public id: string;

  public place: Place;

  public author: User;

  public rating: number;

  public comment: string;

  public reply?: string;

  public dateVisitted: string;
}
