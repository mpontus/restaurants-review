import React from "react";
import { fireEvent, renderWithProviders } from "../../../test/test-utils";
import { deleteUser } from "../../actions/userListActions";
import { UserContainer } from "../UserContainer";

describe("UserContainer", () => {
  const state = {
    userEntity: {
      "4": {
        id: "4",
        name: "User Name Stub",
        email: "user@example.org",
        roles: ["user", "owner"],
        canEdit: true,
        canDelete: true
      }
    }
  };

  it("renders user details", () => {
    const { getByText } = renderWithProviders(<UserContainer id="4" />, {
      state
    });

    expect(getByText("User Name Stub")).toBeTruthy();
    expect(getByText("user@example.org")).toBeTruthy();
    expect(getByText("Owner")).toBeTruthy();
  });

  it("opens edit dialog when Edit button is pressed", () => {
    const { getByLabelText, getByText } = renderWithProviders(
      <UserContainer id="4" />,
      { state }
    );

    fireEvent.click(getByLabelText("More Actions"));
    fireEvent.click(getByText("Edit"));

    expect(getByText("Update User")).toBeTruthy();
  });

  it("opens delete dialog when Delete button is pressed", () => {
    const { getByLabelText, getByText } = renderWithProviders(
      <UserContainer id="4" />,
      { state }
    );

    fireEvent.click(getByLabelText("More Actions"));
    fireEvent.click(getByText("Delete"));

    expect(getByText("Delete user?")).toBeTruthy();
  });

  it("dispatches delete action when deletion is confirmed", () => {
    const { store, getByLabelText, getByText } = renderWithProviders(
      <UserContainer id="4" />,
      { state }
    );

    fireEvent.click(getByLabelText("More Actions"));
    fireEvent.click(getByText("Delete"));
    fireEvent.click(getByText("Delete user"));

    expect(store.getActions()).toContainEqual(
      deleteUser.request({
        user: expect.objectContaining({ id: "4" })
      })
    );
  });
});
