import { RequestError } from "./RequestError";

/**
 * Request Status Model
 *
 * Represents the status of the request.
 */
export interface RequestStatus<T> {
  /**
   * Whether the request is in progress
   */
  loading: boolean;

  /**
   * Whether the request has finished successfully
   */
  success: boolean;

  /**
   * Whether the request has failed.
   *
   * Contains validations errors in the format of the DTO specified
   * using generic parameter.
   */
  error?: RequestError<T>;
}
