import { Selector } from "react-redux";
import { createSelector } from "reselect";
import { LoadPlacesDto } from "../models/LoadPlacesDto";
import { Page } from "../models/Page";
import { RequestStatus } from "../models/RequestStatus";
import { State } from "../reducers";
import { filterDeletedEntities } from "./utils/filterDeletedEntities";

/**
 * Place Listing Parameters
 */
interface Props {
  own?: boolean;
  ratingFilter?: number;
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
  filterDeletedEntities(
    (state: State) => state.deletedPlaces,
    createSelector(
      (state: State, ownProps: Props) => ownProps.own,
      (state: State, ownProps: Props) => ownProps.ratingFilter,
      (state: State, ownProps: Props) => ownProps.currentPage,
      (state: State) => state.placeList,
      (state: State) => state.ownPlaceList,
      (
        own,
        rating,
        page,
        publicPlaces,
        ownPlaces
      ): Page<string> | undefined => {
        if (own) {
          return ownPlaces[page];
        }

        if (rating !== undefined) {
          return publicPlaces[rating] && publicPlaces[rating]![page];
        }

        return undefined;
      }
    )
  );
