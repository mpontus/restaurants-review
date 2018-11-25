import { Typography } from "@material-ui/core";
import React, { useState } from "react";
import { PendingReviewListContainer } from "../containers/PendingReviewListContainer";
import { ReviewContainer } from "../containers/ReviewListItemContainer";

/**
 * Pending reviews screen
 *
 * Displays a list of reviews pending for the user's reply
 */
export const PendingReviewsScreen = () => {
  const [currentPage, setPage] = useState(0);

  return (
    <React.Fragment>
      <Typography gutterBottom={true} variant="h5">
        Pending Reviews
      </Typography>
      <Typography gutterBottom={true} variant="subtitle1" color="textSecondary">
        This page allows you to reply to reviews for your restaurants.
      </Typography>
      <PendingReviewListContainer
        currentPage={currentPage}
        onPrev={() => setPage(page => page - 1)}
        onNext={() => setPage(page => page + 1)}
        renderItem={id => <ReviewContainer key={id} id={id} />}
      />
    </React.Fragment>
  );
};
