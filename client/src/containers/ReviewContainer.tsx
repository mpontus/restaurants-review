import React from "react";
import { ConfirmModal } from "../components/ConfirmModal";
import { useModal } from "../components/ModalRoot";
import { Review as ReviewComponent } from "../components/Review";
import { ReviewFormModal } from "../components/ReviewFormModal";
import { Review } from "../models/Review";

interface Props {
  review: Review;
}

export const ReviewContainer = ({ review }: Props) => {
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
      onSubmit={hideEditModal}
      onCancel={hideEditModal}
    />
  ));

  // const [showReply, hideReply] = useModal(() => (
  //   <ReplyFormModal onSubmit={hideReply} onCancel={hideReply} />
  // ));

  return (
    <ReviewComponent
      date={review.dateVisitted}
      author={review.author.name}
      rating={review.rating}
      comment={review.comment}
      reply={review.reply}
      onEdit={showEditModal}
      onDelete={showConfirmModal}
    />
  );
};
