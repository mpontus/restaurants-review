import { schema } from "normalizr";
import { reviewSchema } from "./reviewSchema";

export const placeSchema = new schema.Entity("place", {
  bestReview: reviewSchema,
  worstReview: reviewSchema,
  ownReview: reviewSchema
});
