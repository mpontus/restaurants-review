import React from "react";
import { RouteComponentProps } from "react-router";
import { Button } from "../components/Button";
import { DocumentTitle } from "../components/DocumentTitle";
import { Heading } from "../components/Heading";
import { Loading } from "../components/Loading";
import { PageActions } from "../components/PageActions";
import { Pagination } from "../components/Pagination";
import { PlaceDetailsHeader } from "../components/PlaceDetailsHeader";
import { Section } from "../components/Section";
import { Subheading } from "../components/Subheading";
import { AuthGuard } from "../containers/AuthGuard";
import { PlaceDetailsProvider } from "../containers/PlaceDetailsProvider";
import { ReviewContainer } from "../containers/ReviewContainer";
import { ReviewListProvider } from "../containers/ReviewListProvider";
import { usePagination } from "../hooks/usePagination";
import { canDelete, canEdit, canReview } from "../models/Place";

/**
 * Component props
 *
 * Expects parameters to be injected by Route component.
 */
interface Props extends RouteComponentProps<{ id: string }> {}

/**
 * Place Details Screen
 *
 * Displays detailed information about a place
 */
export const PlaceDetailsScreen = ({ match, history }: Props) => {
  const [currentPage, onPrevPage, onNextPage] = usePagination(history);

  return (
    <PlaceDetailsProvider
      id={match.params.id}
      placeholder={<Loading header={true} />}
    >
      {({ place, onReview, onEdit, onDelete }) => (
        <DocumentTitle title={place.title}>
          <PlaceDetailsHeader rating={place.rating}>
            <Heading>{place.title}</Heading>
            <Subheading>{place.address}</Subheading>
          </PlaceDetailsHeader>
          <PageActions>
            <AuthGuard rule={user => canEdit(place, user)}>
              <Button color="primary" onClick={onEdit}>
                Edit Restaurant
              </Button>
            </AuthGuard>
            <AuthGuard rule={user => canDelete(place, user)}>
              <Button color="primary" onClick={onDelete}>
                Delete Restaurant
              </Button>
            </AuthGuard>
            <AuthGuard rule={user => canReview(place, user)}>
              <Button color="primary" onClick={onReview}>
                Submit Review
              </Button>
            </AuthGuard>
          </PageActions>
          {place.bestReview && (
            <Section title="Highest Review" id="best-review">
              <ReviewContainer
                key={place.bestReview.id}
                id={place.bestReview.id}
              />
            </Section>
          )}
          {place.worstReview && (
            <Section title="Lowest Review" id="worst-review">
              <ReviewContainer
                key={place.worstReview.id}
                id={place.worstReview.id}
              />
            </Section>
          )}
          <ReviewListProvider
            place={place}
            currentPage={currentPage}
            loadingPlaceholder={<Loading />}
            emptyPlaceholder={
              place.bestReview || place.worstReview ? null : (
                <Subheading>No reviews for this place yet</Subheading>
              )
            }
          >
            {({ ids, hasNextPage, hasPrevPage }) => (
              <Section
                title={
                  place.bestReview || place.worstReview
                    ? "Other Reviews"
                    : "Reviews"
                }
                id="other-reviews"
              >
                <Pagination
                  items={ids}
                  renderItem={reviewId => (
                    <ReviewContainer key={reviewId} id={reviewId} />
                  )}
                  hasNext={hasNextPage}
                  hasPrev={hasPrevPage}
                  onNext={onNextPage}
                  onPrev={onPrevPage}
                />
              </Section>
            )}
          </ReviewListProvider>
        </DocumentTitle>
      )}
    </PlaceDetailsProvider>
  );
};
