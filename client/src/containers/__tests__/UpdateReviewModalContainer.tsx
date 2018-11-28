import React from "react";
import { fireEvent, renderWithProviders, wait } from "../../../test/test-utils";
import { updateReview } from "../../actions/reviewListActions";
import { State } from "../../reducers";
import { UpdateReviewModalContainer } from "../UpdateReviewModalContainer";

const noop = () => undefined;

describe("UpdateReviewModalContainer", () => {
  const review = {
    id: "3",
    author: {
      name: "Review Author"
    },
    comment: "Review Comment Stub",
    reply: "Review Reply Stub",
    rating: 3,
    dateVisited: "2012-05-22"
  };
  const state: Partial<State> = {
    reviewEntity: {
      3: review
    }
  };

  it("self-closes when cancel button is pressed", () => {
    const onCancel = jest.fn();
    const { getByText } = renderWithProviders(
      <UpdateReviewModalContainer id="3" onCancel={onCancel} />,
      { state }
    );

    fireEvent.click(getByText("Cancel"));

    expect(onCancel).toHaveBeenCalled();
  });

  it("self-closes when request succeeds", () => {
    const onCancel = jest.fn();
    const { getByText } = renderWithProviders(
      <UpdateReviewModalContainer id="3" onCancel={onCancel} />,
      { state }
    );

    fireEvent.click(getByText("Cancel"));

    expect(onCancel).toHaveBeenCalled();
  });

  it("dispatches create event when form is submitted", async () => {
    const { store, getByLabelText } = renderWithProviders(
      <UpdateReviewModalContainer id="3" onCancel={noop} />,
      { state }
    );

    fireEvent.change(getByLabelText("Comment"), {
      target: { value: "Another Comment Stub" }
    });

    fireEvent.change(getByLabelText("Reply"), {
      target: { value: "Another Reply Stub" }
    });

    fireEvent.click(getByLabelText("2 stars"));

    fireEvent.submit(getByLabelText("Edit Review"));

    await wait(() => {
      expect(store.getActions()).toContainEqual(
        updateReview.request({
          review,
          data: {
            rating: 2,
            comment: "Another Comment Stub",
            reply: "Another Reply Stub"
          }
        })
      );
    });
  });
});
