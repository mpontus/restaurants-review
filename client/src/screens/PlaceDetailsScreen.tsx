import {
  Button,
  ListItem,
  ListItemText,
  ListSubheader
} from "@material-ui/core";
import React from "react";
import { CreateReviewModal } from "../components/CreateReviewModal";
import { useModal } from "../components/ModalRoot";
import { Rating } from "../components/Rating";
import { ReviewContainer } from "../containers/ReviewContainer";

const place = {
  id: "f30bd147-2cff-5d04-b83b-4107e4b099ca",
  title: "Abbott - Kilback",
  address: "11352 Ferry Spur",
  rating: 3.47,
  bestReview: {
    id: "45d71106-4041-5e5a-bafb-cf50210082a7",
    author: {
      name: "James Taylor"
    },
    dateVisitted: "2001-07-05",
    rating: 4,
    comment: "Before guess college speak."
  },
  worstReview: {
    id: "bda8a3af-c80f-55a2-b9c3-bd4675b48218",
    author: {
      name: "Brian Foster"
    },
    dateVisitted: "1979-02-22",
    rating: 2,
    comment: "Serious inside else memory if six.",
    reply: "State machine energy a production like service."
  }
  // ownReview: {
  //   id: "cc9b2353-6d5f-560e-b149-d2d3e9827f0b",
  //   author: {
  //     name: "Chris Curtis"
  //   },
  //   dateVisitted: "1992-01-14",
  //   rating: 5,
  //   comment: "Or candidate trouble listen ok."
  // }
} as any;

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

const PlaceReviewListContainer = () => (
  <React.Fragment>
    {reviews.map(review => (
      <ReviewContainer key={review.id} review={review} />
    ))}
  </React.Fragment>
);

export const PlaceDetailsScreen = () => {
  const [showReviewModal, hideReviewModal] = useModal(() => (
    <CreateReviewModal
      autoFocus={true}
      onSubmit={hideReviewModal}
      onCancel={hideReviewModal}
    />
  ));

  return (
    <React.Fragment>
      <ListItem>
        <ListItemText primary={place.title} secondary={place.address} />
        <Rating value={place.rating} />
      </ListItem>
      {!place.ownReview && (
        <Button fullWidth={true} color="primary" onClick={showReviewModal}>
          Submit Review
        </Button>
      )}
      {place.bestReview && (
        <React.Fragment>
          <ListSubheader disableSticky={true}>Highest Review</ListSubheader>
          <ReviewContainer review={place.bestReview} />
        </React.Fragment>
      )}
      {place.worstReview && (
        <React.Fragment>
          <ListSubheader disableSticky={true}>Lowest Review</ListSubheader>
          <ReviewContainer review={place.worstReview} />
        </React.Fragment>
      )}
      {place.ownReview && (
        <React.Fragment>
          <ListSubheader disableSticky={true}>Your Review</ListSubheader>
          <ReviewContainer review={place.ownReview} />
        </React.Fragment>
      )}
      <ListSubheader disableSticky={true}>Other Reviews</ListSubheader>
      <PlaceReviewListContainer />
    </React.Fragment>
  );
};
