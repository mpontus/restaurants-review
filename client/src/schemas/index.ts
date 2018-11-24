import { schema } from "normalizr";

export const reviewSchema = new schema.Entity("review");
export const placeSchema = new schema.Entity("place");

reviewSchema.define({
  place: placeSchema
});

placeSchema.define({
  bestReview: reviewSchema,
  worstReview: reviewSchema,
  ownReview: reviewSchema
});
