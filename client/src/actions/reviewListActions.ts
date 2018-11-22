import { createAsyncAction } from "typesafe-actions";
import { CreateReviewDto } from "../models/CreateReviewDto";
import { LoadReviewsDto } from "../models/LoadReviewsDto";
import { Page } from "../models/Page";
import { Place } from "../models/Place";
import { ReplyDto } from "../models/ReplyDto";
import { RequestError } from "../models/RequestError";
import { Review } from "../models/Review";
import { UpdateReviewDto } from "../models/UpdateReviewDto";

/**
 * Request reviews from API
 */
export const loadReviews = createAsyncAction(
  "LOAD_REVIEWS_REQUEST",
  "LOAD_REVIEWS_SUCCESS",
  "LOAD_REVIEWS_FAILURE"
)<
  LoadReviewsDto,
  {
    criteria: LoadReviewsDto;
    page: Page<Review>;
  },
  {
    criteria: LoadReviewsDto;
    error: RequestError<LoadReviewsDto>;
  }
>();

/**
 * Action dispatched for review creation
 */
export const createReview = createAsyncAction(
  "CREATE_REVIEW_REQUEST",
  "CREATE_REVIEW_SUCCESS",
  "CREATE_REVIEW_FAILURE"
)<
  {
    place: Place;
    data: CreateReviewDto;
  },
  {
    place: Place;
    review: Review;
  },
  {
    place: Place;
    error: RequestError<CreateReviewDto>;
  }
>();

/**
 * Action dispatched for updating review details
 */
export const replyToReview = createAsyncAction(
  "REPLY_REVIEW_REQUEST",
  "REPLY_REVIEW_SUCCESS",
  "REPLY_REVIEW_FAILURE"
)<
  {
    review: Review;
    data: ReplyDto;
  },
  { review: Review },
  {
    review: Review;
    error: RequestError<ReplyDto>;
  }
>();

/**
 * Action dispatched for updating review details
 */
export const updateReview = createAsyncAction(
  "UPDATE_REVIEW_REQUEST",
  "UPDATE_REVIEW_SUCCESS",
  "UPDATE_REVIEW_FAILURE"
)<
  {
    review: Review;
    data: UpdateReviewDto;
  },
  { review: Review },
  {
    review: Review;
    error: RequestError<UpdateReviewDto>;
  }
>();

/**
 * Action dispatched for review deletion
 */
export const deleteReview = createAsyncAction(
  "DELETE_REVIEW_REQUEST",
  "DELETE_REVIEW_SUCCESS",
  "DELETE_REVIEW_FAILURE"
)<
  {
    review: Review;
  },
  {
    review: Review;
  },
  {
    review: Review;
    error: RequestError<void>;
  }
>();
