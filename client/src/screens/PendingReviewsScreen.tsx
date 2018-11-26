import React from "react";
import { Heading } from "../components/Heading";
import { Loading } from "../components/Loading";
import { Pagination } from "../components/Pagination";
import { Subheading } from "../components/Subheading";
import { ReviewContainer } from "../containers/ReviewListItemContainer";
import { ReviewListProvider } from "../containers/ReviewListProvider";
import { usePagination } from "../hooks/usePagination";

/**
 * Pending reviews screen
 *
 * Displays a list of reviews pending for the user's reply
 */
export const PendingReviewsScreen = () => {
  const [currentPage, onPrevPage, onNextPage] = usePagination(0);

  return (
    <React.Fragment>
      <Heading>Pending Reviews</Heading>
      <Subheading>
        This page allows you to reply to reviews for your restaurants.
      </Subheading>
      <ReviewListProvider
        pending={true}
        currentPage={currentPage}
        loadingPlaceholder={<Loading />}
        emptyPlaceholder={<Subheading>You have no reviews pending.</Subheading>}
      >
        {({ ids, hasNextPage, hasPrevPage }) => (
          <Pagination
            items={ids}
            renderItem={reviewId => (
              <ReviewContainer key={reviewId} id={reviewId} />
            )}
            hasNext={hasNextPage}
            hasPrev={hasNextPage}
            onNext={onNextPage}
            onPrev={onPrevPage}
          />
        )}
      </ReviewListProvider>
    </React.Fragment>
  );
};
