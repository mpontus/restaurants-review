import React from "react";
import { RouteComponentProps } from "react-router";
import { Action } from "../components/Action";
import { Heading } from "../components/Heading";
import { Loading } from "../components/Loading";
import { Pagination } from "../components/Pagination";
import { RatingStatic } from "../components/RatingStatic";
import { Section } from "../components/Section";
import { Subheading } from "../components/Subheading";
import { AuthGuard } from "../containers/AuthGuard";
import { PlaceDetailsProvider } from "../containers/PlaceDetailsProvider";
import { ReviewContainer } from "../containers/ReviewListItemContainer";
import { ReviewListProvider } from "../containers/ReviewListProvider";
import { usePagination } from "../hooks/usePagination";
import { canDelete, canEdit, canReview } from "../models/Place";

/**
 * Component props
 *
 * Expects parameters to be injected by Route compnent.
 */
interface Props extends RouteComponentProps<{ id: string }> {}

/**
 * Place Details Screen
 *
 * Displays detailed information about a place
 */
export const PlaceDetailsScreen = ({ match }: Props) => {
  const [currentPage, onPrevPage, onNextPage] = usePagination(0);

  return (
    <PlaceDetailsProvider id={match.params.id} placeholder={<Loading />}>
      {({ place, onReview, onEdit, onDelete }) => (
        <React.Fragment>
          <Heading>{place.title}</Heading>
          <Subheading>{place.address}</Subheading>
          <RatingStatic
            value={place.rating}
            caption={`Rating: ${place.rating.toFixed(2)}`}
          />
          <AuthGuard rule={user => canReview(place, user)}>
            <Action onClick={onReview}>Submit Review</Action>
          </AuthGuard>
          <AuthGuard rule={user => canEdit(place, user)}>
            <Action onClick={onEdit}>Edit Restaurant</Action>
          </AuthGuard>
          <AuthGuard rule={user => canDelete(place, user)}>
            <Action onClick={onDelete}>Delete Restaurant</Action>
          </AuthGuard>
          {place.bestReview && (
            <Section title="Best Review">
              <ReviewContainer id={place.bestReview.id} />
            </Section>
          )}
          {place.worstReview && (
            <Section title="Worst Review">
              <ReviewContainer id={place.worstReview.id} />
            </Section>
          )}
          <ReviewListProvider
            place={place}
            currentPage={currentPage}
            loadingPlaceholder={<Loading />}
            emptyPlaceholder={
              place.bestReview || place.worstReview ? (
                <Subheading>No other reviews</Subheading>
              ) : (
                <Subheading>No reviews for this place yet</Subheading>
              )
            }
          >
            {({ ids, hasNextPage, hasPrevPage }) => (
              <Section title="Other Reviews">
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
              </Section>
            )}
          </ReviewListProvider>
        </React.Fragment>
      )}
    </PlaceDetailsProvider>
  );
};
