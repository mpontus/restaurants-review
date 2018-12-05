import React from "react";
import { fireEvent, renderWithProviders, wait } from "../../../test/test-utils";
import { createUser, updateUser } from "../../actions/userListActions";
import { UserFormModalContainer } from "../UserFormModalContainer";

const noop = () => undefined;

describe("UserFormContainer", () => {
  it("self-closes when cancel button is pressed", () => {
    const onCancel = jest.fn();
    const { getByText } = renderWithProviders(
      <UserFormModalContainer open={true} onCancel={onCancel} />
    );

    fireEvent.click(getByText("Cancel"));

    expect(onCancel).toHaveBeenCalled();
  });

  describe("when id is not provided", () => {
    it("dispatches create event when form is submitted", async () => {
      const { store, getByLabelText } = renderWithProviders(
        <UserFormModalContainer open={true} onCancel={noop} />
      );

      fireEvent.change(getByLabelText("Display Name"), {
        target: { value: "User Name Stub" }
      });
      fireEvent.change(getByLabelText("Email Address"), {
        target: { value: "user@example.com" }
      });
      fireEvent.change(getByLabelText("Password"), {
        target: { value: "Password Stub" }
      });
      fireEvent.click(getByLabelText("Owner"));

      fireEvent.submit(getByLabelText("Create User"));

      await wait(() => {
        expect(store.getActions()).toContainEqual(
          createUser.request({
            name: "User Name Stub",
            email: "user@example.com",
            password: "Password Stub",
            isOwner: true,
            isAdmin: false
          })
        );
      });
    });
  });

  describe("when id is provided", () => {
    it("dispatches update event when form is submitted", async () => {
      const { store, getByLabelText } = renderWithProviders(
        <UserFormModalContainer open={true} onCancel={noop} id="5" />,
        {
          state: {
            userEntity: {
              "5": {
                id: "5",
                name: "User Name Stub",
                email: "user@example.org",
                roles: ["user", "admin"]
              }
            }
          }
        }
      );

      fireEvent.change(getByLabelText("Display Name"), {
        target: {
          value: "Another User Name"
        }
      });
      fireEvent.click(getByLabelText("Owner"));
      fireEvent.click(getByLabelText("Admin"));

      fireEvent.submit(getByLabelText("Update User"));

      await wait(() => {
        expect(store.getActions()).toContainEqual(
          updateUser.request({
            user: {
              id: "5",
              name: "User Name Stub",
              email: "user@example.org",
              roles: ["user", "admin"]
            },
            data: {
              name: "Another User Name",
              isOwner: true,
              isAdmin: false
            }
          })
        );
      });
    });
  });
});
