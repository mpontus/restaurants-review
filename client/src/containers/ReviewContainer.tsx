import { Typography } from "@material-ui/core";
import React from "react";
import { connect, Selector } from "react-redux";
import { createStructuredSelector } from "reselect";
import { ConfirmModal } from "../components/ConfirmModal";
import { Loading } from "../components/Loading";
import { useModal } from "../components/ModalRoot";
import { ReplyModal } from "../components/ReplyFormModal";
import { Review as ReviewComponent } from "../components/Review";
import { ReviewFormModal } from "../components/ReviewFormModal";
import { Review } from "../models/Review";
import { State } from "../reducers";
import { makeGetReviewById } from "../selectors/reviewListSelectors";

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
   * Review entity
   */
  review?: Review;
}

/**
 * Combined props
 */
interface Props extends OwnProps, StateProps {}

/**
 * State selector
 */
const makeMapStateToProps = (): Selector<State, StateProps, OwnProps> =>
  createStructuredSelector({
    review: makeGetReviewById()
  });

/**
 * Component enhancer
 */
const enhance = connect(makeMapStateToProps);

/**
 * Review Container
 *
 * Displays a single review by id
 */
export const BaseReviewContainer = ({ review }: Props) => {
  if (review === undefined) {
    return <Loading />;
  }

  const [showConfirmModal, hideConfirmModal] = useModal(() => (
    <ConfirmModal
      title="Delete review?"
      confirmLabel="Delete review"
      onConfirm={hideConfirmModal}
      onCancel={hideConfirmModal}
    >
      Do you really want to delete review from{" "}
      <strong>{review.author.name}</strong>?
    </ConfirmModal>
  ));

  const [showEditModal, hideEditModal] = useModal(() => (
    <ReviewFormModal
      initialValues={{
        rating: review.rating,
        comment: review.comment,
        reply: review.reply
      }}
      onSubmit={
        // tslint:disable-next-line
        console.log
      }
      onCancel={hideEditModal}
    />
  ));

  const [showReplyModal, hideReplyModal] = useModal(() => (
    <ReplyModal
      autoFocus={true}
      subtitle={
        <>
          <Typography component="span" variant="subtitle1">
            {review.author.name} writes:
          </Typography>
          <Typography component="span">{review.comment}</Typography>
        </>
      }
      onSubmit={
        // tslint:disable-next-line
        console.log
      }
      onCancel={hideReplyModal}
    />
  ));

  return (
    <ReviewComponent
      canEdit={true}
      canReply={true}
      canDelete={true}
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
