import {
  DialogActions,
  DialogContent,
  Tab,
  Tabs
} from "@material-ui/core";
import React, { useCallback, useState } from "react";
import SwipeableViews from "react-swipeable-views";
import * as yup from "yup";
import { LoginDto } from "../models/LoginDto";
import { RequestError } from "../models/RequestError";
import { SignupDto } from "../models/SignupDto";
import { AdaptiveModal } from "./AdaptiveModal";
import { Button } from "./Button";
import { Field } from "./Field";
import { Form } from "./Form";
import { Input } from "./Input";
import { Message } from "./Message";

/**
 * Auth Modal Props
 */
interface Props {
  /**
   * Whether login request is in progress
   */
  loginLoading?: boolean;

  /**
   * Whether signup request is in progress
   */
  signupLoading?: boolean;

  /**
   * Login error
   */
  loginError?: RequestError<LoginDto>;

  /**
   * Signup error
   */
  signupError?: RequestError<SignupDto>;

  /**
   * Login callback
   */
  onLogin: (values: LoginDto) => void;

  /**
   * Signup callback
   */
  onSignup: (values: SignupDto) => void;

  /**
   * Cancel callback
   */
  onCancel: () => void;
}

/**
 * Validation schema for login form
 */
const loginSchema = yup.object<LoginDto>().shape({
  email: yup.string().required(),
  password: yup
    .string()
    .min(6)
    .required()
});

/**
 * Validation schema for signup form
 */
const signupSchema = yup.object<SignupDto>().shape({
  email: yup.string().required(),
  password: yup
    .string()
    .min(6)
    .required()
});

/**
 * Auth Modal Component
 *
 * Provides authentication dialog which allows user to login in or
 * sign up with a new account.
 */
export const AuthModal: React.SFC<Props> = ({
  loginLoading,
  signupLoading,
  loginError,
  signupError,
  onLogin,
  onSignup,
  onCancel
}) => {
  const [tabIndex, setTabIndex] = useState(0);
  const handleChange = useCallback(
    (e: any, index: number) => setTabIndex(index),
    []
  );

  return (
    <AdaptiveModal open={true} onClose={onCancel}>
      <Tabs
        fullWidth={true}
        indicatorColor="primary"
        textColor="primary"
        value={tabIndex}
        onChange={handleChange}
      >
        <Tab label="Login" />
        <Tab label="Sign Up" />
      </Tabs>
      <SwipeableViews index={tabIndex} onChangeIndex={setTabIndex}>
        <Form
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          errors={loginError && loginError.details}
          onSubmit={onLogin}
        >
          <DialogContent>
            {loginError ? (
              <Message error={loginError} />
            ) : (
              <Message>Log in with existing account</Message>
            )}
            <Field
              component={Input}
              type="email"
              id="login-email"
              name="email"
              label="Email Address"
            />
            <Field
              component={Input}
              type="password"
              id="login-password"
              name="password"
              label="Password"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onCancel}>Cancel</Button>
            <Button type="submit" color="primary" loading={loginLoading}>
              Login
            </Button>
          </DialogActions>
        </Form>
        <Form
          initialValues={{ email: "", password: "" }}
          validationSchema={signupSchema}
          errors={signupError && signupError.details}
          onSubmit={onSignup}
        >
          <DialogContent>
            {loginError ? (
              <Message error={loginError} />
            ) : (
              <Message>Sign up with a new account</Message>
            )}
            <Field
              component={Input}
              type="email"
              id="signup-email"
              name="email"
              label="Email Address"
            />
            <Field
              component={Input}
              type="password"
              id="signup-password"
              name="password"
              label="Password"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onCancel}>Cancel</Button>
            <Button type="submit" color="primary" loading={signupLoading}>
              Sign Up
            </Button>
          </DialogActions>
        </Form>
      </SwipeableViews>
    </AdaptiveModal>
  );
};
