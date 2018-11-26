import React, { useEffect, useState } from "react";
import { Heading } from "../components/Heading";
import { Loading } from "../components/Loading";
import { Pagination } from "../components/Pagination";
import { RatingFilterControl } from "../components/RatingFilterControl";
import { Subheading } from "../components/Subheading";
import { PlaceListItemContainer } from "../containers/PlaceListItemContainer";
import { PlaceListProvider } from "../containers/PlaceListProvider";
import { usePagination } from "../hooks/usePagination";

/**
 * Frontpage Screen
 *
 * Displays a list of restaurants.
 */
export const FrontpageScreen = () => {
  const [ratingFilter, setRatingFilter] = useState(0);
  const [currentPage, onPrevPage, onNextPage, setPage] = usePagination(0);

  // Reset page when rating filter changes
  useEffect(() => setPage(0), [ratingFilter]);

  return (
    <React.Fragment>
      <Heading>Restaurant Reviews</Heading>
      <Subheading>
        This is a website for restaurant reviews. You can find the best
        restaurants and read reviews left by our users.
      </Subheading>
      <PlaceListProvider
        ratingFilter={ratingFilter}
        currentPage={currentPage}
        loadingPlaceholder={<Loading />}
        emptyPlaceholder={<Subheading>There are no places yet.</Subheading>}
      >
        {({ ids, hasNextPage, hasPrevPage }) => (
          <React.Fragment>
            <RatingFilterControl
              value={ratingFilter}
              onChange={setRatingFilter}
            />
            <Pagination
              items={ids}
              renderItem={placeId => (
                <PlaceListItemContainer key={placeId} id={placeId} />
              )}
              hasNext={hasNextPage}
              hasPrev={hasNextPage}
              onNext={onNextPage}
              onPrev={onPrevPage}
            />
          </React.Fragment>
        )}
      </PlaceListProvider>
    </React.Fragment>
  );
};
