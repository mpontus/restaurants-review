import * as yup from "yup";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tabs,
  Tab
} from "@material-ui/core";
import { Form } from "./Form";
import { Field } from "./Field";
import { Input } from "./Input";
import React, { useState, useCallback } from "react";
import { LoginDto } from "../models/LoginDto";
import { SignupDto } from "../models/SignupDto";
import SwipeableViews from "react-swipeable-views";

interface Props {
  error?: string;
  onLogin: (values: LoginDto) => void;
  onSignup: (values: SignupDto) => void;
  onCancel: () => void;
}

const loginSchema = yup.object<LoginDto>().shape({
  email: yup.string().required(),
  password: yup
    .string()
    .min(6)
    .required()
});

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
    <Dialog open={true} onClose={onCancel} fullScreen={true}>
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
          onSubmit={onLogin}
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
        >
          <DialogContent>
            <DialogContentText>Log in with existing account</DialogContentText>
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
            <Button type="submit" color="primary">
              Login
            </Button>
          </DialogActions>
        </Form>
        <Form
          onSubmit={onSignup}
          initialValues={{ email: "", password: "" }}
          validationSchema={signupSchema}
        >
          <DialogContent>
            <DialogContentText>Create new account</DialogContentText>
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
            <Button type="submit" color="primary">
              Sign Up
            </Button>
          </DialogActions>
        </Form>
      </SwipeableViews>
    </Dialog>
  );
};
