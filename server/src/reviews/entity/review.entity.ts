import { PlaceEntity } from 'places/entity/place.entity';
import { Place } from 'places/model/place.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { UserEntity } from 'user/entity/user.entity';
import { User } from 'user/model/user.model';

/**
 * Review Entity
 *
 * Describes storage schema for review objects
 */
@Entity()
@Index(['pendingFor', 'createdAt']) // Index for retrieving pending reviews
@Index(['placeId', 'createdAt']) // Index for retrieving place reviews
export class ReviewEntity {
  /**
   * Review id
   */
  @PrimaryColumn('uuid')
  public id: string;

  /**
   * Associated place
   */
  @ManyToOne(() => PlaceEntity)
  public place: Place;

  /**
   * Review author
   */
  @ManyToOne(() => UserEntity)
  public author: User;

  /**
   * Review Rating
   */
  @Column({ type: 'float', default: 0 })
  public rating: number;

  /**
   * Comment text
   */
  @Column({ type: 'text' })
  public comment: string;

  /**
   * Reply text
   */
  @Column({ type: 'text', nullable: true })
  public reply?: string;

  /**
   * Date of the visit
   */
  @Column({ type: 'date' })
  public dateVisitted: string;

  /**
   * Timestamp of the review creation
   */
  @CreateDateColumn()
  public createdAt: Date;

  /**
   * References a user for whom the review is pending
   *
   * Auxilary column to speed up pending review retrieval. Is set to
   * NULL after reply.
   */
  @Column({ type: 'uuid', nullable: true })
  public pendingFor: string;
}
