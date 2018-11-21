import { Button, List } from "@material-ui/core";
import React, { useEffect } from "react";
import { connect, Selector } from "react-redux";
import { createStructuredSelector } from "reselect";
import { loadPlaces } from "../actions/placeListActions";
import { LoadPlacesDto } from "../models/LoadPlacesDto";
import { Page } from "../models/Page";
import { RequestStatus } from "../models/RequestStatus";
import { State } from "../reducers";
import {
  makeGetPlaceListPage,
  makeGetPlaceListRequestStatus
} from "../selectors/placeListSelectors";

/**
 * External props
 */
interface OwnProps {
  /**
   * Filter places by rating
   */
  ratingFilter: number;

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
   * Page entity containing place ids
   */
  page?: Page<string>;

  /**
   * Request status for the current page
   */
  requestStatus: RequestStatus<LoadPlacesDto>;
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
    page: makeGetPlaceListPage(),
    requestStatus: makeGetPlaceListRequestStatus()
  });

/**
 * Component enhancer
 */
const enhance = connect(
  makeMapStateToProps,
  { onLoadPlaces: loadPlaces.request }
);

/**
 * Place List Container
 */
const BasePlaceListContainer = ({
  ratingFilter,
  currentPage,
  page,
  requestStatus,
  onLoadPlaces,
  renderItem,
  onPrev,
  onNext
}: Props) => {
  useEffect(
    () => {
      onLoadPlaces({
        page: currentPage,
        rating: ratingFilter
      });
    },
    [ratingFilter, currentPage]
  );

  if (page === undefined) {
    return null;
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
export const PlaceListContainer = enhance(BasePlaceListContainer);
