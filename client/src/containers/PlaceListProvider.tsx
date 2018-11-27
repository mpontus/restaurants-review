import React, { useEffect } from "react";
import { connect, Selector } from "react-redux";
import { createStructuredSelector } from "reselect";
import { loadPlaces } from "../actions/placeListActions";
import { LoadPlacesDto } from "../models/LoadPlacesDto";
import { Page } from "../models/Page";
import { State } from "../reducers";
import { makeGetPlaceListPage } from "../selectors/placeListSelectors";

/**
 * Render props
 */
interface RenderProps {
  /**
   * List of place ids for current page
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
   * Whether own places should be loaded
   */
  own?: boolean;

  /**
   * Filter places by rating
   */
  ratingFilter?: number;

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
   * Page entity containing place ids
   */
  page?: Page<string>;
}

/**
 * Connected dispatch props
 */
interface DispatchProps {
  /**
   * Request places to be loaded
   */
  onLoadPlaces: (criteria: LoadPlacesDto) => void;
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
    page: makeGetPlaceListPage()
  });

/**
 * Component enhancer
 */
const enhance = connect(
  makeMapStateToProps,
  { onLoadPlaces: loadPlaces.request }
);

/**
 * Place List Provider
 *
 * Provides a list of places matching criteria using render props.
 */
const BasePlaceListProvider = ({
  own,
  ratingFilter,
  currentPage,
  page,
  onLoadPlaces,
  children,
  loadingPlaceholder = null,
  emptyPlaceholder = null
}: Props) => {
  // Load places on mount
  useEffect(
    () => {
      onLoadPlaces(
        own
          ? { own: true, page: currentPage }
          : { rating: ratingFilter, page: currentPage }
      );
    },
    [own, ratingFilter, currentPage]
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
export const PlaceListProvider = enhance(BasePlaceListProvider);
