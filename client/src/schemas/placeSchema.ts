import { schema } from "normalizr";
import { reviewSchema } from "./reviewSchema";

/**
 * Normalization schema for place entity
 */
export const placeSchema = new schema.Entity("place", {
  bestReview: reviewSchema,
  worstReview: reviewSchema,
  ownReview: reviewSchema
});
