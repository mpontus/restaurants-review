import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { connect, Selector } from "react-redux";
import { createStructuredSelector } from "reselect";
import { loadReviews } from "../actions/reviewListActions";
import { Loading } from "../components/Loading";
import { PaginationControls } from "../components/PaginationControls";
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
   * List header
   */
  header: React.ReactNode;

  /**
   * Show reviews for this place
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
 * Place Review List Container
 *
 * Displays a list of place reviews.
 */
const BasePlaceReviewListContainer = ({
  header,
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
    [currentPage]
  );

  if (page === undefined) {
    return <Loading />;
  }

  if (page.items.length === 0) {
    return null;
  }

  return (
    <React.Fragment>
      <Grid item={true} xs={12}>
        {header}
      </Grid>
      <Grid container={true} spacing={16}>
        {page.items.map(id => (
          <Grid key={id} item={true} xs={12} sm={6}>
            {renderItem(id)}
          </Grid>
        ))}
        <Grid item={true} xs={12}>
          <PaginationControls
            hasPrev={page.prevPageExists}
            hasNext={page.nextPageExists}
            onPrev={onPrev}
            onNext={onNext}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

/**
 * Export enhanced component
 */
export const PlaceReviewListContainer = enhance(BasePlaceReviewListContainer);
