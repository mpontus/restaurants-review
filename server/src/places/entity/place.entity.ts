import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
  @Column({ type: 'uuid' })
  public ownerId: string;

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
