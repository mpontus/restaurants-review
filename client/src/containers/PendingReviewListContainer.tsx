import React, { useEffect } from "react";
import { connect, Selector } from "react-redux";
import { createStructuredSelector } from "reselect";
import { loadReviews } from "../actions/reviewListActions";
import { List } from "../components/List";
import { Loading } from "../components/Loading";
import { PaginationControls } from "../components/PaginationControls";
import { LoadReviewsDto } from "../models/LoadReviewsDto";
import { Page } from "../models/Page";
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
 * Pending Review List Container
 *
 * Displays reviews pending for the user.
 */
const BasePendingReviewListContainer = ({
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
        pending: true,
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
      <List items={page.items} renderItem={renderItem} />
      <PaginationControls
        hasPrev={page.prevPageExists}
        hasNext={page.nextPageExists}
        onPrev={onPrev}
        onNext={onNext}
      />
    </React.Fragment>
  );
};

/**
 * Export enhanced component
 */
export const PendingReviewListContainer = enhance(
  BasePendingReviewListContainer
);
