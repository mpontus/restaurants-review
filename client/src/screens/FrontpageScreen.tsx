import React, { useEffect, useState } from "react";
import { RatingFilterControl } from "../components/RatingFilterControl";
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

  // Reset page when rating filter changes
  useEffect(
    () => {
      setPage(0);
    },
    [ratingFilter]
  );

  return (
    <React.Fragment>
      <RatingFilterControl value={ratingFilter} onChange={setRatingFilter} />
      <PlaceListContainer
        ratingFilter={ratingFilter}
        currentPage={currentPage}
        onPrev={() => setPage(page => page - 1)}
        onNext={() => setPage(page => page + 1)}
        renderItem={id => (
          <PlaceListItemContainer key={id} showRating={true} id={id} />
        )}
      />
    </React.Fragment>
  );
};
