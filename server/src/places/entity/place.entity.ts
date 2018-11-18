import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { UserEntity } from 'user/entity/user.entity';

/**
 * Place Entity
 *
 * Describes database schema for place
 */
@Entity()
@Index(['rating'])
@Index(['ownerId', 'rating'])
export class PlaceEntity {
  /**
   * Place id
   */
  @PrimaryColumn('uuid')
  public id!: string;

  /**
   * Place owner id
   */
  @Column('uuid')
  public ownerId: string;

  /**
   * Place Owner
   *
   * We never need to join user entity, this relation only serves the
   * purpose for cascade deletion.
   */
  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  public owner: UserEntity;

  /**
   * Place name
   */
  @Column({ type: 'varchar', length: 60 })
  public title: string;

  /**
   * Place address
   */
  @Column({ type: 'varchar', length: 60 })
  public address: string;

  /**
   * Average review rating
   */
  @Column({ type: 'float', default: 0 })
  public rating: number;

  /**
   * Auto-generation creation date used in sorting
   */
  @CreateDateColumn()
  public createdAt: Date;
}
