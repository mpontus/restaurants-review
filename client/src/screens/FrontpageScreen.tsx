import React, { useCallback } from "react";
import { RouteComponentProps } from "react-router";
import { DocumentTitle } from "../components/DocumentTitle";
import { Heading } from "../components/Heading";
import { Loading } from "../components/Loading";
import { Pagination } from "../components/Pagination";
import { RatingFilterControl } from "../components/RatingFilterControl";
import { Subheading } from "../components/Subheading";
import { PlaceContainer } from "../containers/PlaceContainer";
import { PlaceListProvider } from "../containers/PlaceListProvider";
import { usePagination } from "../hooks/usePagination";
import { useRatingFilter } from "../hooks/useRatingFilter";

/**
 * Frontpage Screen
 *
 * Displays a list of restaurants.
 */
export const FrontpageScreen = ({ history }: RouteComponentProps) => {
  const [ratingFilter, setRatingFilter] = useRatingFilter(history);
  const [currentPage, onPrevPage, onNextPage, setPage] = usePagination(history);

  // Reset page when rating filter changes
  const onRatingFilterChange = useCallback(
    nextRating => {
      setPage(0);
      setRatingFilter(nextRating);
    },
    [setPage, setRatingFilter]
  );

  return (
    <DocumentTitle>
      <Heading>Restaurant Reviews</Heading>
      <Subheading>
        This is a website for restaurant reviews. You can find the best
        restaurants and read reviews left by our users.
      </Subheading>
      <RatingFilterControl
        value={ratingFilter}
        onChange={onRatingFilterChange}
      />
      <PlaceListProvider
        ratingFilter={ratingFilter}
        currentPage={currentPage}
        loadingPlaceholder={<Loading />}
        emptyPlaceholder={<Subheading>There are no places yet.</Subheading>}
      >
        {({ ids, hasNextPage, hasPrevPage }) => (
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
        )}
      </PlaceListProvider>
    </DocumentTitle>
  );
};
