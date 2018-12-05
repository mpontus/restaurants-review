import { DialogProps } from "@material-ui/core/Dialog";
import React, { useEffect } from "react";
import { connect, Selector } from "react-redux";
import { createStructuredSelector } from "reselect";
import { updateReview } from "../actions/reviewListActions";
import { ReviewFormModal } from "../components/ReviewFormModal";
import { useSubsequent } from "../hooks/useSubsequentValue";
import { RequestStatus } from "../models/RequestStatus";
import { Review } from "../models/Review";
import { UpdateReviewDto } from "../models/UpdateReviewDto";
import { State } from "../reducers";
import {
  makeGetReviewById,
  makeGetReviewUpdateRequestStatus
} from "../selectors/reviewSelectors";

/**
 * External Props
 */
interface OwnProps extends DialogProps {
  /**
   * Review id
   */
  id: string;

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
   * Resolved review entity
   */
  review?: Review;

  /**
   * Request status for review update
   */
  requestStatus: RequestStatus<UpdateReviewDto>;
}

/**
 * Connected actions
 */
interface DispatchProps {
  /**
   * Review creation callback
   */
  onUpdate: (props: { review: Review; data: UpdateReviewDto }) => void;
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
    review: makeGetReviewById(),
    requestStatus: makeGetReviewUpdateRequestStatus()
  });

/**
 * Component enhancer
 */
const enhance = connect<StateProps, DispatchProps, OwnProps, State>(
  makeMapStateToProps,
  {
    onUpdate: updateReview.request
  }
);

/**
 * Update Review Modal Container
 *
 * Displays modal window for review modification.
 */
const BaseUpdateReviewModalContainer = ({
  open,
  review,
  requestStatus: currentRequestStatus,
  onUpdate,
  onCancel,
  onExited
}: Props) => {
  if (review === undefined) {
    return null;
  }

  // Skip initial request state which may have been left by previous modal
  const requestStatus = useSubsequent(currentRequestStatus, {
    loading: false,
    success: false
  });

  // Skip the modal after successful response
  useEffect(
    () => {
      if (requestStatus.success) {
        onCancel();
      }
    },
    [requestStatus.success]
  );

  return (
    <ReviewFormModal
      open={open}
      initialValues={{
        rating: review.rating,
        comment: review.comment,
        reply: review.reply
      }}
      loading={requestStatus.loading}
      error={requestStatus.error}
      onSubmit={data => onUpdate({ review, data })}
      onCancel={onCancel}
      onExited={onExited}
    />
  );
};

/**
 * Export enhanced component
 */
export const UpdateReviewModalContainer = enhance(
  BaseUpdateReviewModalContainer
);
