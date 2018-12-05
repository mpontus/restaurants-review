import { Typography } from "@material-ui/core";
import { DialogProps } from "@material-ui/core/Dialog";
import React, { useEffect } from "react";
import { connect, Selector } from "react-redux";
import { createStructuredSelector } from "reselect";
import { replyToReview } from "../actions/reviewListActions";
import { ReplyFormModal } from "../components/ReplyFormModal";
import { useSubsequent } from "../hooks/useSubsequentValue";
import { ReplyDto } from "../models/ReplyDto";
import { RequestStatus } from "../models/RequestStatus";
import { Review } from "../models/Review";
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
  requestStatus: RequestStatus<ReplyDto>;
}

/**
 * Connected actions
 */
interface DispatchProps {
  /**
   * Review creation callback
   */
  onReply: (props: { review: Review; data: ReplyDto }) => void;
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
    onReply: replyToReview.request
  }
);

/**
 * Reply Form Modal Container
 *
 * Displays a review reply form.
 */
const BaseReplyFormModalContainer = ({
  open,
  review,
  requestStatus: currentRequestStatus,
  onReply,
  onCancel,
  onExited
}: Props) => {
  if (review === undefined) {
    return null;
  }

  // Skip request state which may have been left by previous modal
  const requestStatus = useSubsequent(currentRequestStatus, {
    loading: false,
    success: false
  });

  // Self-close the modal after successful response
  useEffect(
    () => {
      if (requestStatus.success) {
        onCancel();
      }
    },
    [requestStatus.success]
  );

  return (
    <ReplyFormModal
      open={open}
      autoFocus={true}
      subtitle={
        <React.Fragment>
          <Typography component="span" variant="subtitle1">
            {review.author.name} writes:
          </Typography>
          <Typography component="span">{review.comment}</Typography>
        </React.Fragment>
      }
      loading={requestStatus.loading}
      error={requestStatus.error}
      onSubmit={data => onReply({ review, data })}
      onCancel={onCancel}
      onExited={onExited}
    />
  );
};

/**
 * Export enhanced component
 */
export const ReplyFormModalContainer = enhance(BaseReplyFormModalContainer);
