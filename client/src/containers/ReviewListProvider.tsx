import React, { useEffect } from "react";
import { connect, Selector } from "react-redux";
import { createStructuredSelector } from "reselect";
import { loadReviews } from "../actions/reviewListActions";
import { LoadReviewsDto } from "../models/LoadReviewsDto";
import { Page } from "../models/Page";
import { Place } from "../models/Place";
import { State } from "../reducers";
import { makeGetReviewListPage } from "../selectors/reviewListSelectors";

/**
 * Render props
 */
interface RenderProps {
  /**
   * List of review ids for current page
   */
  ids: string[];

  /**
   * Whether next page exists
   */
  hasNextPage: boolean;

  /**
   * Whether previous page exists
   */
  hasPrevPage: boolean;
}

/**
 * External props
 */
interface OwnProps {
  /**
   * Whether pending reviews should be provided
   */
  pending?: boolean;

  /**
   * Show reviews for this place
   */
  place?: Place;

  /**
   * Current page
   */
  currentPage: number;

  /**
   * Placeholder to show while list is loading
   */
  loadingPlaceholder?: React.ReactElement<any> | null;

  /**
   * Placeholder to show when list is empty
   */
  emptyPlaceholder?: React.ReactElement<any> | null;

  /**
   * Render props children
   */
  children: (props: RenderProps) => React.ReactElement<any> | null;
}

/**
 * Connected State Props
 */
interface StateProps {
  /**
   * Page entity containing review ids
   */
  page?: Page<string>;
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
    page: makeGetReviewListPage()
  });

/**
 * Component enhancer
 */
const enhance = connect(
  makeMapStateToProps,
  { onLoadReviews: loadReviews.request }
);

/**
 * Review List Provider
 *
 * Provides list of reviews matching criteria using render props.
 */
const BaseReviewListProvider = ({
  pending,
  place,
  currentPage,
  page,
  onLoadReviews,
  children,
  loadingPlaceholder = null,
  emptyPlaceholder = null
}: Props) => {
  useEffect(
    () => {
      onLoadReviews({ pending, place, page: currentPage });
    },
    [currentPage]
  );

  if (page === undefined) {
    return loadingPlaceholder;
  }

  if (page.items.length === 0 && currentPage === 0) {
    return emptyPlaceholder;
  }

  return children({
    ids: page.items,
    hasPrevPage: page.prevPageExists,
    hasNextPage: page.nextPageExists
  });
};

/**
 * Export enhanced component
 */
export const ReviewListProvider = enhance(BaseReviewListProvider);
