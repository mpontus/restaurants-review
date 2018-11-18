import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Put,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'auth/guards/auth.guard';
import { RolesGuard } from 'auth/guards/roles.guard';
import { IAuthRequest } from 'common/interfaces/auth-request.interface';
import { ListPendingReviewsCriteria } from './model/list-pending-reviews-criteria.model';
import { ReplyDto } from './model/reply-dto.model';
import { ReviewList } from './model/review-list.model';
import { Review } from './model/review.model';
import { UpdateReviewDto } from './model/update-review-dto.model';
import { ReviewService } from './review.service';

/**
 * Reviews Controller
 *
 * Provides API endpoints for review management
 */
@Controller('/reviews')
@UsePipes(new ValidationPipe({ transform: true }))
@UseInterceptors(ClassSerializerInterceptor)
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  /**
   * List reviews waiting for the user's reply
   */
  @Get('/pending')
  @UseGuards(AuthGuard, new RolesGuard(['owner']))
  @ApiBearerAuth()
  @ApiOkResponse({ type: ReviewList })
  public async listPendingReviews(
    @Req() req: IAuthRequest,
    @Query() criteria: ListPendingReviewsCriteria,
  ): Promise<ReviewList> {
    return this.reviewService.listPendingReviews(req.user, criteria);
  }

  /**
   * Update review details
   */
  @Patch(':id')
  @UseGuards(AuthGuard, new RolesGuard(['admin']))
  @ApiBearerAuth()
  @ApiOkResponse({ type: Review })
  public async updateReview(
    @Req() req: IAuthRequest,
    @Param('id') id: string,
    @Query() data: UpdateReviewDto,
  ): Promise<Review> {
    const review = await this.reviewService.getReview(id);

    return this.reviewService.updateReview(req.user, review, data);
  }

  /**
   * Reply to a review
   */
  @Put(':id/reply')
  @UseGuards(AuthGuard, new RolesGuard(['owner']))
  @ApiBearerAuth()
  @ApiOkResponse({ type: Review })
  public async replyToReview(
    @Req() req: IAuthRequest,
    @Param('id') id: string,
    @Query() data: ReplyDto,
  ): Promise<Review> {
    const review = await this.reviewService.getReview(id);

    return this.reviewService.replyToReview(req.user, review, data);
  }

  /**
   * Delete review
   */
  @Delete(':id')
  @UseGuards(AuthGuard, new RolesGuard(['admin']))
  @ApiBearerAuth()
  @ApiResponse({ status: 204, type: Review })
  public async deleteReview(
    @Req() req: IAuthRequest,
    @Param('id') id: string,
  ): Promise<void> {
    const review = await this.reviewService.getReview(id);

    return this.reviewService.deleteReview(req.user, review);
  }
}
