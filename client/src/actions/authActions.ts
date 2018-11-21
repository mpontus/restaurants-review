import { createAsyncAction, createStandardAction } from "typesafe-actions";
import { AuthState } from "../models/AuthState";
import { LoginDto } from "../models/LoginDto";
import { RequestError } from "../models/RequestError";
import { SignupDto } from "../models/SignupDto";

/**
 * Login Action
 */
export const login = createAsyncAction(
  "LOGIN_REQUEST",
  "LOGIN_SUCCESS",
  "LOGIN_FAILURE"
)<LoginDto, AuthState, RequestError<LoginDto>>();

/**
 * Signup Action
 */
export const signup = createAsyncAction(
  "SIGNUP_REQUEST",
  "SIGNUP_SUCCESS",
  "SIGNUP_FAILURE"
)<SignupDto, AuthState, RequestError<SignupDto>>();

/**
 * Logout action
 */
export const logout = createStandardAction("LOGOUT")<void>();
