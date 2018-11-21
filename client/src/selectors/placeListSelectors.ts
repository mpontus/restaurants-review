import { Selector } from "react-redux";
import { createSelector } from "reselect";
import { LoadPlacesDto } from "../models/LoadPlacesDto";
import { Page } from "../models/Page";
import { RequestStatus } from "../models/RequestStatus";
import { State } from "../reducers";

/**
 * Place Listing Parameters
 */
interface Props {
  ratingFilter: number;
  currentPage: number;
}

/**
 * Get request status for place listing
 */
export const makeGetPlaceListRequestStatus = (): Selector<
  State,
  RequestStatus<LoadPlacesDto>,
  {}
> => state => state.placeListRequest;

/**
 * Get ids of the places on current page
 */
export const makeGetPlaceListPage = () =>
  createSelector(
    (state: State, ownProps: Props) => ownProps.ratingFilter,
    (state: State, ownProps: Props) => ownProps.currentPage,
    (state: State) => state.placeList,
    (rating, page, placeList): Page<string> | undefined =>
      placeList[rating] && placeList[rating]![page]
  );
