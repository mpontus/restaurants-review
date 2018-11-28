import React from "react";
import { fireEvent, renderWithProviders, wait } from "../../../test/test-utils";
import { replyToReview } from "../../actions/reviewListActions";
import { State } from "../../reducers";
import { ReplyFormModalContainer } from "../ReplyFormModalContainer";

const noop = () => undefined;

describe("ReplyFormModalContainer", () => {
  const review = {
    id: "3",
    author: {
      name: "Review Author"
    },
    comment: "Review Comment Stub",
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
      <ReplyFormModalContainer id="3" onCancel={onCancel} />,
      { state }
    );

    fireEvent.click(getByText("Cancel"));

    expect(onCancel).toHaveBeenCalled();
  });

  it("self-closes when request succeeds", () => {
    const onCancel = jest.fn();
    const { getByText } = renderWithProviders(
      <ReplyFormModalContainer id="3" onCancel={onCancel} />,
      { state }
    );

    fireEvent.click(getByText("Cancel"));

    expect(onCancel).toHaveBeenCalled();
  });

  it("dispatches create event when form is submitted", async () => {
    const { store, getByLabelText } = renderWithProviders(
      <ReplyFormModalContainer id="3" onCancel={noop} />,
      { state }
    );

    fireEvent.change(getByLabelText("Enter your reply"), {
      target: { value: "Reply Text Stub" }
    });

    fireEvent.submit(getByLabelText("Reply to a review"));

    await wait(() => {
      expect(store.getActions()).toContainEqual(
        replyToReview.request({
          review,
          data: {
            comment: "Reply Text Stub"
          }
        })
      );
    });
  });
});
