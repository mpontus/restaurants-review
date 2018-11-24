import React, { useCallback } from "react";
import { connect, Selector } from "react-redux";
import { createStructuredSelector } from "reselect";
import { deleteReview } from "../actions/reviewListActions";
import { ConfirmModal } from "../components/ConfirmModal";
import { Loading } from "../components/Loading";
import { useModal } from "../components/ModalRoot";
import { Review as ReviewComponent } from "../components/Review";
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
  const handleDelete = useCallback(
    () => (review ? onDelete({ review }) : undefined),
    [onDelete, review]
  );

  const [showConfirmModal, hideConfirmModal] = useModal(() =>
    review ? (
      <ConfirmModal
        title="Delete review?"
        confirmLabel="Delete review"
        onConfirm={handleDelete}
        onCancel={hideConfirmModal}
      >
        Do you really want to delete review from{" "}
        <strong>{review.author.name}</strong>?
      </ConfirmModal>
    ) : null
  );

  const [showEditModal, hideEditModal] = useModal(() =>
    review ? (
      <UpdateReviewModalContainer id={review.id} onCancel={hideEditModal} />
    ) : null
  );

  const [showReplyModal, hideReplyModal] = useModal(() =>
    review ? (
      <ReplyFormModalContainer id={review.id} onCancel={hideReplyModal} />
    ) : null
  );

  if (review === undefined) {
    return <Loading />;
  }

  return (
    <ReviewComponent
      canReply={review.canReply}
      canEdit={review.canEdit}
      canDelete={review.canDelete}
      date={review.dateVisitted}
      author={review.author.name}
      rating={review.rating}
      comment={review.comment}
      reply={review.reply}
      onReply={showReplyModal}
      onEdit={showEditModal}
      onDelete={showConfirmModal}
    />
  );
};

/**
 * Export enhanced component
 */
export const ReviewContainer = enhance(BaseReviewContainer);
