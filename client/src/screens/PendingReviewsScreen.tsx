import React, { useState } from "react";
import { ReviewListContainer } from "../containers/ReviewListContainer";
import { ReviewListItemContainer } from "../containers/ReviewListItemContainer";

/**
 * Pending reviews screen
 *
 * Displays a list of reviews pending for the user's reply
 */
export const PendingReviewsScreen = () => {
  const [currentPage, setPage] = useState(0);

  return (
    <ReviewListContainer
      pending={true}
      currentPage={currentPage}
      onPrev={() => setPage(page => page - 1)}
      onNext={() => setPage(page => page + 1)}
      renderItem={id => <ReviewListItemContainer key={id} id={id} />}
    />
  );
};
