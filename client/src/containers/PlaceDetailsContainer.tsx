import {
  Button,
  ListItem,
  ListItemText,
  ListSubheader
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { connect, Selector } from "react-redux";
import { createStructuredSelector } from "reselect";
import { loadPlace } from "../actions/placeDetailsActions";
import { Loading } from "../components/Loading";
import { useModal } from "../components/ModalRoot";
import { Rating } from "../components/Rating";
import { Place, canReview } from "../models/Place";
import { State } from "../reducers";
import { makeGetPlaceById } from "../selectors/placeSelectors";
import { CreateReviewModalContainer } from "./CreateReviewModalContainer";
import { PlaceReviewListContainer } from "./PlaceReviewListContainer";
import { ReviewContainer } from "./ReviewListItemContainer";
import { makeGetCurrentUser } from "../selectors/authSelectors";
import { User, canDelete } from "../models/User";
import { canEdit } from "../models/Review";

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
}

/**
 * Connected dispatch props
 */
interface DispatchProps {
  /**
   * Request a place to be loaded
   */
  onLoadPlace: (criteria: { id: string }) => void;
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
    place: makeGetPlaceById()
  });

/**
 * Component enhancer
 */
const enhance = connect(
  makeMapStateToProps,
  {
    onLoadPlace: loadPlace.request
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
  onLoadPlace
}: Props) => {
  useEffect(() => {
    onLoadPlace({ id });
  }, []);

  if (place === undefined) {
    return <Loading />;
  }

  const [currentReviewsPage, setReviewsPage] = useState(0);
  const [showReviewModal, hideReviewModal] = useModal(() => (
    <CreateReviewModalContainer place={place} onCancel={hideReviewModal} />
  ));

  const { bestReview, worstReview } = place;
  let { ownReview } = place;

  // Don't show own review when its already shown as best or worst review.
  const isSame = (some: any, other: any) =>
    !(some === undefined || other === undefined || some.id !== other.id);

  if (isSame(ownReview, bestReview) || isSame(ownReview, worstReview)) {
    ownReview = undefined;
  }

  return (
    <React.Fragment>
      <ListItem>
        <ListItemText primary={place.title} secondary={place.address} />
        <Rating value={place.rating} />
      </ListItem>
      {canReview(place, user) && (
        <Button fullWidth={true} color="primary" onClick={showReviewModal}>
          Submit Review
        </Button>
      )}
      {bestReview && (
        <React.Fragment>
          <ListSubheader disableSticky={true}>Highest Review</ListSubheader>
          <ReviewContainer key={bestReview.id} id={bestReview.id} />
        </React.Fragment>
      )}
      {worstReview && (
        <React.Fragment>
          <ListSubheader disableSticky={true}>Lowest Review</ListSubheader>
          <ReviewContainer key={worstReview.id} id={worstReview.id} />
        </React.Fragment>
      )}
      {ownReview && (
        <React.Fragment>
          <ListSubheader disableSticky={true}>Your Review</ListSubheader>
          <ReviewContainer key={ownReview.id} id={ownReview.id} />
        </React.Fragment>
      )}
      <PlaceReviewListContainer
        header={
          <ListSubheader disableSticky={true}>
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
    </React.Fragment>
  );
};

/**
 * Export enhanced component
 */
export const PlaceDetailsContainer = enhance(BasePlaceDetailsContainer);
