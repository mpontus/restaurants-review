import React from "react";
import { connect, Selector } from "react-redux";
import { createStructuredSelector } from "reselect";
import { deleteReview } from "../actions/reviewListActions";
import { Button } from "../components/Button";
import { ConfirmModal } from "../components/ConfirmModal";
import { Review as ReviewComponent } from "../components/Review";
import { useModal } from "../hooks/useModal";
import { RequestStatus } from "../models/RequestStatus";
import { Review } from "../models/Review";
import { User } from "../models/User";
import { State } from "../reducers";
import { makeGetCurrentUser } from "../selectors/authSelectors";
import { makeGetReviewById } from "../selectors/reviewSelectors";
import { makeGetReviewUpdateRequestStatus } from "../selectors/reviewSelectors";
import { ReplyFormModalContainer } from "./ReplyFormModalContainer";
import { UpdateReviewModalContainer } from "./UpdateReviewModalContainer";

/**
 * External Props
 */
interface OwnProps {
  /**
   * Review Id
   */
  id: string;
}

/**
 * Connected Props
 */
interface StateProps {
  /**
   * Currently authenticated user
   */
  user?: User;

  /**
   * Review entity
   */
  review?: Review;

  /**
   * Review update request state
   */
  requestStatus: RequestStatus<any>;
}

/**
 * Connected actions
 */
interface DispatchProps {
  /**
   * Review delete callback
   */
  onDelete: (props: { review: Review }) => void;
}

/**
 * Combined props
 */
interface Props extends OwnProps, StateProps, DispatchProps {}

/**
 * State selector
 */
const makeMapStateToProps = (): Selector<State, StateProps, OwnProps> =>
  createStructuredSelector({
    user: makeGetCurrentUser(),
    review: makeGetReviewById(),
    requestStatus: makeGetReviewUpdateRequestStatus()
  });

/**
 * Component enhancer
 */
const enhance = connect(
  makeMapStateToProps,
  {
    onDelete: deleteReview.request
  }
);

/**
 * Review List Item Container
 *
 * Displays a single review by id
 */
export const BaseReviewContainer = ({
  user,
  id,
  review,
  requestStatus,
  onDelete
}: Props) => {
  if (review === undefined) {
    return null;
  }

  const [showConfirmModal, hideConfirmModal] = useModal(() => (
    <ConfirmModal
      title="Delete review?"
      confirmLabel="Delete Review"
      onConfirm={() => onDelete({ review })}
      onCancel={hideConfirmModal}
    >
      Do you really want to delete review from{" "}
      <strong>{review.author.name}</strong>?
    </ConfirmModal>
  ));

  const [showEditModal, hideEditModal] = useModal(() => (
    <UpdateReviewModalContainer id={review.id} onCancel={hideEditModal} />
  ));

  const [showReplyModal, hideReplyModal] = useModal(() => (
    <ReplyFormModalContainer id={review.id} onCancel={hideReplyModal} />
  ));

  return (
    <ReviewComponent
      review={review}
      actions={
        (review.canReply || review.canEdit || review.canDelete) && (
          <React.Fragment>
            {review.canReply && (
              <Button color="primary" onClick={showReplyModal}>
                Reply
              </Button>
            )}
            {review.canEdit && (
              <Button color="primary" onClick={showEditModal}>
                Edit
              </Button>
            )}
            {review.canDelete && (
              <Button color="primary" onClick={showConfirmModal}>
                Delete
              </Button>
            )}
          </React.Fragment>
        )
      }
    />
  );
};

/**
 * Export enhanced component
 */
export const ReviewContainer = enhance(BaseReviewContainer);
