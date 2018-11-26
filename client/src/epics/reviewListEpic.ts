import { combineEpics, Epic } from "redux-observable";
import { from } from "rxjs";
import { filter, map, mapTo, switchMap } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";
import { Action } from "../actions";
import * as actions from "../actions/reviewListActions";
import { createPlaceReview } from "../api/method/createPlaceReview";
import { createReviewReply } from "../api/method/createReviewReply";
import { deleteReview } from "../api/method/deleteReview";
import { getPendingReviews } from "../api/method/getPendingReviews";
import { getPlaceReviews } from "../api/method/getPlaceReviews";
import { updateReview } from "../api/method/updateReview";
import { State } from "../reducers";
import { Dependencies } from "../store";
import { handleApiError } from "./utils/handleApiError";
import { replayLastWhen } from "./utils/replayLastWhen";

/**
 * Review list epic
 *
 * Fetches review listings.
 */
export const loadReviewListEpic: Epic<Action, Action, State, Dependencies> = (
  action$,
  state$,
  { api, config }
) => {
  return action$.pipe(
    filter(isActionOf(actions.loadReviews.request)),
    replayLastWhen(
      action$.pipe(
        filter(
          isActionOf([
            actions.createReview.success,
            actions.replyToReview.success,
            actions.updateReview.success,
            actions.deleteReview.success
          ])
        )
      )
    ),
    switchMap(action => {
      const criteria = action.payload;
      const limit = config.pageLimit;
      const offset = criteria.page * limit;

      return from(
        criteria.place
          ? getPlaceReviews(api, {
              id: criteria.place.id,
              take: limit,
              skip: offset
            })
          : getPendingReviews(api, {
              take: limit,
              skip: offset
            })
      ).pipe(
        map(page =>
          actions.loadReviews.success({
            criteria,
            page: {
              nextPageExists: offset + page.items.length < page.total,
              prevPageExists: offset > 0,
              total: page.total,
              offset,
              items: page.items
            }
          })
        ),
        handleApiError(error =>
          actions.loadReviews.failure({
            criteria,
            error
          })
        )
      );
    })
  );
};

/**
 * Create review epic
 *
 * Handles creation of new reviews.
 */
export const createReviewEpic: Epic<Action, Action, State, Dependencies> = (
  action$,
  state$,
  { api, config }
) => {
  return action$.pipe(
    filter(isActionOf(actions.createReview.request)),
    switchMap(action => {
      const { place, data } = action.payload;

      return from(createPlaceReview(api, { id: place.id, ...data })).pipe(
        map(review => actions.createReview.success({ place, review })),
        handleApiError(error => actions.createReview.failure({ place, error }))
      );
    })
  );
};

/**
 * Update review epic
 *
 * Handles updates to review record.
 */
export const replyToReviewEpic: Epic<Action, Action, State, Dependencies> = (
  action$,
  state$,
  { api, config }
) => {
  return action$.pipe(
    filter(isActionOf(actions.replyToReview.request)),
    switchMap(action =>
      from(
        createReviewReply(api, {
          id: action.payload.review.id,
          ...action.payload.data
        })
      ).pipe(
        map(review => actions.replyToReview.success({ review })),
        handleApiError(error =>
          actions.replyToReview.failure({
            review: action.payload.review,
            error
          })
        )
      )
    )
  );
};

/**
 * Update review epic
 *
 * Handles updates to review record.
 */
export const updateReviewEpic: Epic<Action, Action, State, Dependencies> = (
  action$,
  state$,
  { api, config }
) => {
  return action$.pipe(
    filter(isActionOf(actions.updateReview.request)),
    switchMap(action =>
      from(
        updateReview(api, {
          id: action.payload.review.id,
          ...action.payload.data
        })
      ).pipe(
        map(review => actions.updateReview.success({ review })),
        handleApiError(error =>
          actions.updateReview.failure({
            review: action.payload.review,
            error
          })
        )
      )
    )
  );
};

/**
 * Delete review epic
 *
 * Handles review deletion.
 */
export const deleteReviewEpic: Epic<Action, Action, State, Dependencies> = (
  action$,
  state$,
  { api, config }
) => {
  return action$.pipe(
    filter(isActionOf(actions.deleteReview.request)),
    switchMap(action =>
      from(
        deleteReview(api, {
          id: action.payload.review.id
        })
      ).pipe(
        mapTo(actions.deleteReview.success(action.payload)),
        handleApiError(error =>
          actions.deleteReview.failure({
            ...action.payload,
            error
          })
        )
      )
    )
  );
};

/**
 * Export all epics combined
 */
export const reviewListEpic = combineEpics(
  loadReviewListEpic,
  createReviewEpic,
  replyToReviewEpic,
  updateReviewEpic,
  deleteReviewEpic
);
