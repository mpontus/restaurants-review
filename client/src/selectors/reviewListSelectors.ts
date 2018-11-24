import { Selector } from "react-redux";
import { createSelector } from "reselect";
import { LoadReviewsDto } from "../models/LoadReviewsDto";
import { Page } from "../models/Page";
import { Place } from "../models/Place";
import { RequestStatus } from "../models/RequestStatus";
import { State } from "../reducers";
import { filterDeletedEntities } from "./utils/filterDeletedEntities";

/**
 * Review Listing Parameters
 */
interface ListProps {
  place?: Place;
  pending?: boolean;
  currentPage: number;
}

/**
 * Get request status for review listing
 */
export const makeGetReviewListRequestStatus = (): Selector<
  State,
  RequestStatus<LoadReviewsDto>,
  {}
> => state => state.reviewListRequest;

/**
 * Get ids of the reviews on current page
 */
export const makeGetReviewListPage = () =>
  filterDeletedEntities(
    state => state.deletedReviews,
    createSelector(
      (state: State, ownProps: ListProps) => ownProps.place,
      (state: State, ownProps: ListProps) => ownProps.pending,
      (state: State, ownProps: ListProps) => ownProps.currentPage,
      (state: State) => state.reviewList,
      (state: State) => state.pendingReviewList,
      (
        place,
        pending,
        page,
        placeReviewList,
        pendingReviewList
      ): Page<string> | undefined => {
        if (place) {
          return placeReviewList[place.id] && placeReviewList[place.id]![page];
        }

        return pendingReviewList[page];
      }
    )
  );
