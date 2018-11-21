import { Reducer } from "redux";
import { Action } from "../../actions";
import { RequestError } from "../../models/RequestError";
import { RequestStatus } from "../../models/RequestStatus";

/**
 * Initial state
 */
const initialState: RequestStatus<any> = {
  loading: false,
  success: false
};

/**
 * Create Request State Reducer
 *
 * Updates request state based on action predicates.
 */
export const createRequestStatusReducer = <
  BaseAction extends Action,
  RequestAction extends BaseAction,
  SuccessAction extends BaseAction,
  FailureAction extends BaseAction,
  T
>(
  requestActionPredicate: (value: BaseAction) => value is RequestAction,
  successActionPredicate: (value: BaseAction) => value is SuccessAction,
  failureActionPredicate: (value: BaseAction) => value is FailureAction,
  errorSelector: (value: FailureAction) => RequestError<T>
): Reducer<RequestStatus<T>, BaseAction> => (state = initialState, action) => {
  if (requestActionPredicate(action)) {
    return {
      loading: true,
      success: false
    };
  }

  if (successActionPredicate(action)) {
    return {
      loading: false,
      success: true
    };
  }

  if (failureActionPredicate(action)) {
    return {
      loading: false,
      success: false,
      error: errorSelector(action)
    };
  }

  return state;
};
