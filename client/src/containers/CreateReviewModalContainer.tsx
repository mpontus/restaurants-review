import React, { useEffect } from "react";
import { connect, Selector } from "react-redux";
import { createStructuredSelector } from "reselect";
import { createReview } from "../actions/reviewListActions";
import { CreateReviewModal } from "../components/CreateReviewModal";
import { useSubsequent } from "../hooks/useSubsequentValue";
import { CreateReviewDto } from "../models/CreateReviewDto";
import { Place } from "../models/Place";
import { RequestStatus } from "../models/RequestStatus";
import { State } from "../reducers";
import { makeGetReviewUpdateRequestStatus } from "../selectors/reviewSelectors";

/**
 * External Props
 */
interface OwnProps {
  /**
   * Needed to bypass selector typings.
   */
  id?: undefined;

  /**
   * Place for which the review is being created
   */
  place: Place;

  /**
   * Modal close callback
   */
  onCancel: () => void;
}

/**
 * Connected props
 */
interface StateProps {
  /**
   * Request status for review creation or update
   */
  requestStatus: RequestStatus<CreateReviewDto>;
}

/**
 * Connected actions
 */
interface DispatchProps {
  /**
   * Review creation callback
   */
  onCreate: (props: { place: Place; data: CreateReviewDto }) => void;
}

/**
 * Combined props
 */
interface Props extends OwnProps, StateProps, DispatchProps {}

/**
 * State selectors
 */
const makeMapStateToProps = (): Selector<State, StateProps, OwnProps> =>
  createStructuredSelector({
    requestStatus: makeGetReviewUpdateRequestStatus()
  });

/**
 * Component enhancer
 */
const enhance = connect<StateProps, DispatchProps, OwnProps, State>(
  makeMapStateToProps,
  {
    onCreate: createReview.request
  }
);

/**
 * Review Form Modal Container
 *
 * Displays modal window for review creation.
 */
const BaseCreateReviewModalContainer = ({
  place,
  requestStatus: currentRequestStatus,
  onCreate,
  onCancel
}: Props) => {
  // Ignore initial request state which may have been left from
  // previous modal.
  const requestStatus = useSubsequent(currentRequestStatus, {
    loading: false,
    success: false
  });

  // Self-close the modal after success
  useEffect(
    () => {
      if (requestStatus.success) {
        onCancel();
      }
    },
    [requestStatus.success]
  );

  return (
    <CreateReviewModal
      autoFocus={true}
      loading={requestStatus.loading}
      error={requestStatus.error}
      onSubmit={data => onCreate({ place, data })}
      onCancel={onCancel}
    />
  );
};

/**
 * Export enhanced component
 */
export const CreateReviewModalContainer = enhance(
  BaseCreateReviewModalContainer
);
