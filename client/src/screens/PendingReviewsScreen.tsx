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
    <PendingReviewListContainer
      currentPage={currentPage}
      onPrev={() => setPage(page => page - 1)}
      onNext={() => setPage(page => page + 1)}
      renderItem={id => <ReviewContainer key={id} pending={true} id={id} />}
    />
  );
};
