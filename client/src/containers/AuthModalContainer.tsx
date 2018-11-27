import React, { useEffect } from "react";
import { connect, Selector } from "react-redux";
import { createStructuredSelector } from "reselect";
import { login, signup } from "../actions/authActions";
import { AuthModal } from "../components/AuthModal";
import { LoginDto } from "../models/LoginDto";
import { RequestStatus } from "../models/RequestStatus";
import { SignupDto } from "../models/SignupDto";
import { State } from "../reducers";
import {
  makeGetLoginRequestStatus,
  makeGetSignupRequestStatus,
  makeIsUserAuthenticated
} from "../selectors/authSelectors";

/**
 * External Props
 */
interface OwnProps {
  onCancel: () => void;
}

/**
 * Connected props
 */
interface StateProps {
  isAuthenticated: boolean;
  loginRequest: RequestStatus<LoginDto>;
  signupRequest: RequestStatus<SignupDto>;
}

/**
 * Connected actions
 */
interface DispatchProps {
  onLogin: (data: LoginDto) => void;
  onSignup: (data: SignupDto) => void;
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
    isAuthenticated: makeIsUserAuthenticated(),
    loginRequest: makeGetLoginRequestStatus(),
    signupRequest: makeGetSignupRequestStatus()
  });

/**
 * Component enhancer
 */
const enhance = connect(
  makeMapStateToProps,
  {
    onLogin: login.request,
    onSignup: signup.request
  }
);

/**
 * Auth Modal Container
 *
 * Displays modal window for authentication.
 */
const BaseAuthModalContainer = ({
  isAuthenticated,
  loginRequest,
  signupRequest,
  onLogin,
  onSignup,
  onCancel
}: Props) => {
  useEffect(
    () => {
      if (isAuthenticated) {
        onCancel();
      }
    },
    [isAuthenticated, onCancel]
  );

  return (
    <AuthModal
      loginLoading={loginRequest.loading}
      signupLoading={signupRequest.loading}
      loginError={loginRequest.error}
      signupError={signupRequest.error}
      onLogin={onLogin}
      onSignup={onSignup}
      onCancel={onCancel}
    />
  );
};

/**
 * Export enhanced component
 */
export const AuthModalContainer = enhance(BaseAuthModalContainer);
