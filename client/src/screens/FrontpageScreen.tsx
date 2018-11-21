import React, { useState } from "react";
import { PlaceListContainer } from "../containers/PlaceListContainer";
import { PlaceListItemContainer } from "../containers/PlaceListItemContainer";

/**
 * Frontpage Screen
 *
 * Displays a list of restaurants.
 */
export const FrontpageScreen = () => {
  const [ratingFilter, setRatingFilter] = useState(0);
  const [currentPage, setPage] = useState(0);

  return (
    <PlaceListContainer
      ratingFilter={ratingFilter}
      currentPage={currentPage}
      onPrev={() => setPage(page => page - 1)}
      onNext={() => setPage(page => page + 1)}
      renderItem={id => (
        <PlaceListItemContainer key={id} showRating={true} id={id} />
      )}
    />
  );
};
