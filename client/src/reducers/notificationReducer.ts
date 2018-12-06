import { Reducer } from "redux";
import { getType } from "typesafe-actions";
import { Action } from "../actions";
import * as authActions from "../actions/authActions";
import * as notificationActions from "../actions/notificationActions";
import { loadPlace } from "../actions/placeDetailsActions";
import * as placeListActions from "../actions/placeListActions";
import * as reviewListActions from "../actions/reviewListActions";
import * as userListActions from "../actions/userListActions";
import { Notification } from "../models/Notification";

/**
 * State shape
 */
type State = Notification[];

/**
 * Add into notification
 */
const addInfo = (
  state: State,
  message: string,
  duration: number = 4000
): State => [...state, { type: "info", message, duration }];

/**
 * Add success notification
 */
const addSuccess = (
  state: State,
  message: string,
  duration: number = 4000
): State => [...state, { type: "success", message, duration }];

/**
 * Add error notification
 */
const addError = (
  state: State,
  message: string,
  duration: number = 4000
): State => [...state, { type: "error", message, duration }];

/**
 * Dismiss top notification
 */
const dismiss = ([_, ...state]: State): State => state;

/**
 * Notification Reducer
 *
 * Adds notifications corresponding to various app events.
 */
export const notificationReducer: Reducer<State, Action> = (
  state = [],
  action
) => {
  switch (action.type) {
    case getType(authActions.login.success):
      return addInfo(state, "You have logged in");

    case getType(authActions.signup.success):
      return addInfo(state, "Thank you for signing up");

    case getType(authActions.logout):
      return addInfo(state, "You have logged out");

    case getType(placeListActions.createPlace.success):
      return addSuccess(state, `Restaurant created`);

    case getType(placeListActions.updatePlace.success):
      return addSuccess(state, `Restaurant saved`);

    case getType(placeListActions.deletePlace.success):
      return addSuccess(state, `Restaurant deleted`);

    case getType(reviewListActions.createReview.success):
      return addSuccess(state, "Thank you for your review!");

    case getType(reviewListActions.replyToReview.success):
      return addSuccess(state, "Reply saved");

    case getType(reviewListActions.updateReview.success):
      return addSuccess(state, "Review saved");

    case getType(reviewListActions.deleteReview.success): {
      const { review } = action.payload;

      return addSuccess(state, `Review by ${review.author.name} deleted`);
    }

    case getType(userListActions.createUser.success): {
      const user = action.payload;

      return addSuccess(state, `User ${user.name} created`);
    }

    case getType(userListActions.updateUser.success): {
      const { user } = action.payload;

      return addSuccess(state, `User ${user.name} updated`);
    }

    case getType(userListActions.deleteUser.success): {
      const { user } = action.payload;

      return addSuccess(state, `User ${user.name} deleted`);
    }

    case getType(authActions.signup.failure):
    case getType(authActions.login.failure):
    case getType(userListActions.createUser.failure):
    case getType(placeListActions.createPlace.failure):
      return addError(state, action.payload.message);

    case getType(userListActions.updateUser.failure):
    case getType(userListActions.deleteUser.failure):
    case getType(placeListActions.updatePlace.failure):
    case getType(placeListActions.deletePlace.failure):
    case getType(reviewListActions.createReview.failure):
    case getType(reviewListActions.replyToReview.failure):
    case getType(reviewListActions.updateReview.failure):
    case getType(reviewListActions.deleteReview.failure):
      return addError(state, action.payload.error.message);

    case getType(loadPlace.failure):
    case getType(placeListActions.loadPlaces.failure):
    case getType(reviewListActions.loadReviews.failure):
    case getType(userListActions.loadUsers.failure):
      return addError(state, "An error occured. Please refresh the page");

    case getType(notificationActions.dismissNotification):
      return dismiss(state);

    default:
      return state;
  }
};
