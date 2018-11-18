import { ApiModelProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

/**
 * Review Author Model
 *
 * Describes publicly visible details about the comment author.
 */
export class ReviewAuthor {
  /**
   * User ID
   *
   * Exluded from the serialized object.
   */
  @Exclude()
  public id: string;

  /**
   * Author name
   */
  @ApiModelProperty({
    description: 'Author name',
  })
  public name: string;

  /**
   * Constructor
   */
  constructor(values: Partial<ReviewAuthor>) {
    Object.assign(this, values);
  }
}
