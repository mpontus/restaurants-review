import { Button, Grid, ListSubheader } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import { connect, Selector } from "react-redux";
import { createStructuredSelector } from "reselect";
import { loadPlace } from "../actions/placeDetailsActions";
import { deletePlace } from "../actions/placeListActions";
import { ConfirmModal } from "../components/ConfirmModal";
import { Loading } from "../components/Loading";
import { useModal } from "../components/ModalRoot";
import { PlaceDetailsHeader } from "../components/PlaceDetailsHeader";
import { Rating } from "../components/Rating";
import { Place } from "../models/Place";
import { RequestStatus } from "../models/RequestStatus";
import { User } from "../models/User";
import { State } from "../reducers";
import { makeGetCurrentUser } from "../selectors/authSelectors";
import {
  makeGetPlaceById,
  makeGetPlaceUpdateRequestStatus
} from "../selectors/placeSelectors";
import { CreateReviewModalContainer } from "./CreateReviewModalContainer";
import { PlaceFormModalContainer } from "./PlaceFormModalContainer";
import { PlaceReviewListContainer } from "./PlaceReviewListContainer";
import { ReviewContainer } from "./ReviewListItemContainer";

/**
 * External Props
 */
interface OwnProps {
  /**
   * Place ID
   */
  id: string;

  /**
   * Show rating
   */
  showRating?: boolean;

  /**
   * Show actions
   */
  showActions?: boolean;
}

/**
 * Connected Props
 */
interface StateProps {
  /**
   * Currently authenticated user
   */
  user?: User;

  /**
   * Place
   */
  place?: Place;

  /**
   * Request status for place deletion
   */
  updateRequestStatus: RequestStatus<any>;
}

/**
 * Connected dispatch props
 */
interface DispatchProps {
  /**
   * Request a place to be loaded
   */
  onLoadPlace: (criteria: { id: string }) => void;

  /**
   * Request a place to be deleted
   */
  onDelete: (props: { place: Place; fromDetails: boolean }) => void;
}

/**
 * Combined props
 */
interface Props extends OwnProps, StateProps, DispatchProps {}

/**
 * State selector
 */
const makeMapStateToProps = (): Selector<State, StateProps, OwnProps> =>
  createStructuredSelector({
    user: makeGetCurrentUser(),
    place: makeGetPlaceById(),
    updateRequestStatus: makeGetPlaceUpdateRequestStatus()
  });

/**
 * Component enhancer
 */
const enhance = connect(
  makeMapStateToProps,
  {
    onLoadPlace: loadPlace.request,
    onDelete: deletePlace.request
  }
);

/**
 * Place Details Container
 *
 * Displays place details.
 */
export const BasePlaceDetailsContainer = ({
  user,
  id,
  place,
  updateRequestStatus,
  onLoadPlace,
  onDelete
}: Props) => {
  const [currentReviewsPage, setReviewsPage] = useState(0);
  const [showReviewModal, hideReviewModal] = useModal(() =>
    place ? (
      <CreateReviewModalContainer place={place} onCancel={hideReviewModal} />
    ) : null
  );

  const handleDelete = useCallback(
    () => place && onDelete({ place, fromDetails: true }),
    [place, onDelete]
  );

  const [showConfirmModal, hideConfirmModal] = useModal(() =>
    place ? (
      <ConfirmModal
        title="Delete restaurant?"
        confirmLabel="Delete Restaurant"
        onConfirm={handleDelete}
        onCancel={hideConfirmModal}
      >
        Do you really want to delete {place.title}?
      </ConfirmModal>
    ) : null
  );

  const [showEditModal, hideEditModal] = useModal(() =>
    place ? (
      <PlaceFormModalContainer id={place.id} onCancel={hideEditModal} />
    ) : null
  );

  // Load place on mount
  useEffect(() => {
    onLoadPlace({ id });
  }, []);

  // Close dialog after place deletion
  useEffect(
    () => {
      if (updateRequestStatus.success) {
        hideConfirmModal();
      }
    },
    [updateRequestStatus]
  );

  if (place === undefined) {
    return <Loading />;
  }

  const { bestReview, worstReview } = place;

  return (
    <React.Fragment>
      <Grid container={true} spacing={16}>
        <Grid item={true} xs={12}>
          <PlaceDetailsHeader
            title={place.title}
            address={place.address}
            rating={
              <Rating
                value={place.rating}
                caption={`Rating: ${place.rating.toFixed(2)}`}
              />
            }
            actions={
              <React.Fragment>
                {place.canReview && (
                  <Button color="primary" onClick={showReviewModal}>
                    Submit Review
                  </Button>
                )}
                {place.canEdit && (
                  <Button color="primary" onClick={showEditModal}>
                    Edit Restaurant
                  </Button>
                )}
                {place.canDelete && (
                  <Button color="primary" onClick={showConfirmModal}>
                    Delete Restaurant
                  </Button>
                )}
              </React.Fragment>
            }
          />
        </Grid>
        {bestReview && (
          <Grid
            item={true}
            xs={12}
            sm={6}
            aria-labelledby="place-details-highest-review"
          >
            <ListSubheader
              id="place-details-highest-review"
              disableSticky={true}
            >
              Highest Review
            </ListSubheader>
            <ReviewContainer key={bestReview.id} id={bestReview.id} />
          </Grid>
        )}
        {worstReview && (
          <Grid
            item={true}
            xs={12}
            sm={6}
            aria-labelledby="place-details-lowest-review"
          >
            <ListSubheader
              disableSticky={true}
              id="place-details-lowest-review"
            >
              Lowest Review
            </ListSubheader>
            <ReviewContainer key={worstReview.id} id={worstReview.id} />
          </Grid>
        )}
        <Grid item={true} xs={12} aria-labelledby="place-details-other-reviews">
          <PlaceReviewListContainer
            header={
              <ListSubheader
                disableSticky={true}
                id="place-details-other-reviews"
              >
                {place.ownReview || place.bestReview || place.worstReview
                  ? "Other Reviews"
                  : "Reviews"}
              </ListSubheader>
            }
            place={place}
            currentPage={currentReviewsPage}
            onPrev={() => setReviewsPage(page => page - 1)}
            onNext={() => setReviewsPage(page => page + 1)}
            renderItem={reviewId => (
              <ReviewContainer key={reviewId} id={reviewId} />
            )}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

/**
 * Export enhanced component
 */
export const PlaceDetailsContainer = enhance(BasePlaceDetailsContainer);
