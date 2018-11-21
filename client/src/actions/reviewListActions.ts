import { createAsyncAction } from "typesafe-actions";
import { LoadReviewsDto } from "../models/LoadReviewsDto";
import { Page } from "../models/Page";
import { RequestError } from "../models/RequestError";
import { Review } from "../models/Review";

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
