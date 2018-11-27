import React, { useEffect, useState } from "react";
import { DocumentTitle } from "../components/DocumentTitle";
import { Heading } from "../components/Heading";
import { Loading } from "../components/Loading";
import { Pagination } from "../components/Pagination";
import { RatingFilterControl } from "../components/RatingFilterControl";
import { Subheading } from "../components/Subheading";
import { PlaceContainer } from "../containers/PlaceContainer";
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
    <DocumentTitle>
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
                <PlaceContainer showRating={true} key={placeId} id={placeId} />
              )}
              hasNext={hasNextPage}
              hasPrev={hasPrevPage}
              onNext={onNextPage}
              onPrev={onPrevPage}
            />
          </React.Fragment>
        )}
      </PlaceListProvider>
    </DocumentTitle>
  );
};
