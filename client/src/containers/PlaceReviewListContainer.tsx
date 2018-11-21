import { Button, List } from "@material-ui/core";
import React, { useEffect } from "react";
import { connect, Selector } from "react-redux";
import { createStructuredSelector } from "reselect";
import { loadReviews } from "../actions/reviewListActions";
import { Loading } from "../components/Loading";
import { LoadReviewsDto } from "../models/LoadReviewsDto";
import { Page } from "../models/Page";
import { Place } from "../models/Place";
import { RequestStatus } from "../models/RequestStatus";
import { State } from "../reducers";
import {
  makeGetReviewListPage,
  makeGetReviewListRequestStatus
} from "../selectors/reviewListSelectors";

/**
 * External props
 */
interface OwnProps {
  /**
   * Filter reviews by review
   */
  place: Place;

  /**
   * Current page
   */
  currentPage: number;

  /**
   * Item renderer
   */
  renderItem: (id: string) => React.ReactNode;

  /**
   * Next page callback
   */
  onNext: () => void;

  /**
   * Previous page callback
   */
  onPrev: () => void;
}

/**
 * Connected State Props
 */
interface StateProps {
  /**
   * Page entity containing review ids
   */
  page?: Page<string>;

  /**
   * Request status for the current page
   */
  requestStatus: RequestStatus<LoadReviewsDto>;
}

/**
 * Connected dispatch props
 */
interface DispatchProps {
  /**
   * Request reviews to be loaded
   */
  onLoadReviews: (criteria: LoadReviewsDto) => void;
}

/**
 * Combined component props
 */
interface Props extends OwnProps, StateProps, DispatchProps {}

/**
 * State mapping
 */
const makeMapStateToProps = (): Selector<State, StateProps, OwnProps> =>
  createStructuredSelector({
    page: makeGetReviewListPage(),
    requestStatus: makeGetReviewListRequestStatus()
  });

/**
 * Component enhancer
 */
const enhance = connect(
  makeMapStateToProps,
  { onLoadReviews: loadReviews.request }
);

/**
 * Review List Container
 */
const BasePlaceReviewListContainer = ({
  place,
  currentPage,
  page,
  requestStatus,
  onLoadReviews,
  renderItem,
  onPrev,
  onNext
}: Props) => {
  useEffect(
    () => {
      onLoadReviews({
        place,
        page: currentPage
      });
    },
    [place, currentPage]
  );

  if (page === undefined) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <List>{page.items.map(renderItem)}</List>
      <Button disabled={!page.prevPageExists} onClick={onPrev}>
        Prev
      </Button>
      <Button disabled={!page.nextPageExists} onClick={onNext}>
        Next
      </Button>
    </React.Fragment>
  );
};

/**
 * Export enhanced component
 */
export const PlaceReviewListContainer = enhance(BasePlaceReviewListContainer);
