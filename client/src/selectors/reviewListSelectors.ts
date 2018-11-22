import { Selector } from "react-redux";
import { createSelector } from "reselect";
import { LoadReviewsDto } from "../models/LoadReviewsDto";
import { Page } from "../models/Page";
import { Place } from "../models/Place";
import { RequestStatus } from "../models/RequestStatus";
import { State } from "../reducers";

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
  createSelector(
    (state: State, ownProps: ListProps) => ownProps.place,
    (state: State, ownProps: ListProps) => ownProps.pending,
    (state: State, ownProps: ListProps) => ownProps.currentPage,
    (state: State) => state.reviewList,
    (place, pending, page, reviewList): Page<string> | undefined => {
      if (pending) {
        return undefined;
      }

      if (place) {
        return reviewList[place.id] && reviewList[place.id]![page];
      }

      return undefined;
    }
  );

/**
 * Return single review by id
 */
export const makeGetReviewById = () => (
  state: State,
  ownProps: { id: string }
) => state.reviewEntity[ownProps.id];
