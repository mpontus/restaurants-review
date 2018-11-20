import React from "react";
import { Review } from "../components/Review";
import { useModal } from "../components/ModalRoot";

const reviews = [
  [
    "0a931d01-a888-5523-86d1-c89bacc0a22b",
    4.17,
    "2012-05-22",
    "Party environment control quality full less painting.",
    "Serious inside else memory if six."
  ],
  [
    "cbf76a7b-14e5-5ba3-9c4f-af96f24cd72d",
    3.45,
    "1996-03-20",
    "Have heart cover analysis carry."
  ],
  [
    "58d1832e-b696-5c49-ac55-9a4beced3f9b",
    1.46,
    "1996-03-20",
    "Have heart cover analysis carry."
  ],
  [
    "9ea7f963-47d2-5a2d-8b4d-782680d3b1bf",
    2.67,
    "2012-05-22",
    "Notice soon as brother.",
    "State machine energy a production like service."
  ]
].map(([id, rating, dateVisitted, comment, reply]) => ({
  id: id as string,
  author: {
    name: "Ryan Gallagher"
  },
  rating: rating as number,
  dateVisitted: dateVisitted as string,
  comment: comment as string,
  reply: reply as string
}));

export const ReviewContainer = ({ review }: any) => {
  return (
    <Review
      canEdit={true}
      date={review.dateVisitted}
      author={review.author.name}
      rating={review.rating}
      comment={review.comment}
      reply={review.reply}
    />
  );
};

export const PendingReviewsScreen = () => {
  return (
    <React.Fragment>
      {reviews.map(review => (
        <ReviewContainer key={review.id} review={review} />
      ))}
    </React.Fragment>
  );
};
