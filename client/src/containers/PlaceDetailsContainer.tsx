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
import { Place } from "../models/Place";
import { State } from "../reducers";
import { makeGetPlaceById } from "../selectors/placeSelectors";
import { CreateReviewModalContainer } from "./CreateReviewModalContainer";
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
  id,
  place,
  onLoadPlace
}: Props) => {
  useEffect(
    () => {
      if (place === undefined) {
        onLoadPlace({ id });
      }
    },
    [id, place]
  );

  if (place === undefined) {
    return <Loading />;
  }

  const [currentReviewsPage, setReviewsPage] = useState(0);
  const [showReviewModal, hideReviewModal] = useModal(() => (
    <CreateReviewModalContainer place={place} onCancel={hideReviewModal} />
  ));

  return (
    <React.Fragment>
      <ListItem>
        <ListItemText primary={place.title} secondary={place.address} />
        <Rating value={place.rating} />
      </ListItem>
      {!place.ownReview && (
        <Button fullWidth={true} color="primary" onClick={showReviewModal}>
          Submit Review
        </Button>
      )}
      {place.bestReview && (
        <React.Fragment>
          <ListSubheader disableSticky={true}>Highest Review</ListSubheader>
          <ReviewContainer id={place.bestReview.id} />
        </React.Fragment>
      )}
      {place.worstReview && (
        <React.Fragment>
          <ListSubheader disableSticky={true}>Lowest Review</ListSubheader>
          <ReviewContainer id={place.worstReview.id} />
        </React.Fragment>
      )}
      {place.ownReview && (
        <React.Fragment>
          <ListSubheader disableSticky={true}>Your Review</ListSubheader>
          <ReviewContainer id={place.ownReview.id} />
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
