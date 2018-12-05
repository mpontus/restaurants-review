import React from "react";
import { fireEvent, renderWithProviders, wait } from "../../../test/test-utils";
import { login, signup } from "../../actions/authActions";
import { AuthModalContainer } from "../AuthModalContainer";

const noop = () => undefined;

describe("AuthModalContainer", () => {
  it("dispatches login action when login form is submitted", async () => {
    const { store, getByLabelText } = renderWithProviders(
      <AuthModalContainer open={true} onCancel={noop} />
    );

    fireEvent.change(getByLabelText("Email Address"), {
      target: { value: "user@example.com" }
    });

    fireEvent.change(getByLabelText("Password"), {
      target: { value: "foobar" }
    });

    fireEvent.submit(getByLabelText("Log In"));

    await wait(() => {
      expect(store.getActions()).toContainEqual(
        login.request({
          email: "user@example.com",
          password: "foobar"
        })
      );
    });
  });

  it("dispatches signup action when signup form is submitted", async () => {
    const { store, getByText, getByLabelText } = renderWithProviders(
      <AuthModalContainer open={true} onCancel={noop} />
    );

    fireEvent.click(getByText("Sign Up"));

    fireEvent.change(getByLabelText("Display Name"), {
      target: { value: "Display Name Stub" }
    });

    fireEvent.change(getByLabelText("Email Address"), {
      target: { value: "user@example.com " }
    });

    fireEvent.change(getByLabelText("Password"), {
      target: { value: "foobar" }
    });

    fireEvent.submit(getByLabelText("Sign Up"));

    await wait(() => {
      expect(store.getActions()).toContainEqual(
        signup.request({
          name: "Display Name Stub",
          email: "user@example.com",
          password: "foobar"
        })
      );
    });
  });

  it("self-closes after successful request", () => {
    const onCancel = jest.fn();

    renderWithProviders(
      <AuthModalContainer open={true} onCancel={onCancel} />,
      {
        state: {
          auth: {
            accessToken: "foo",
            refreshToken: "bar",
            user: {
              id: "55",
              name: "Example User Name",
              email: "user@example.com",
              roles: ["user"]
            }
          }
        }
      }
    );

    expect(onCancel).toHaveBeenCalled();
  });
});
