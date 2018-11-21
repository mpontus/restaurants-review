import { AxiosError } from "axios";
import { ValidationError } from "class-validator";

type ErrorDetails<T> = { [P in keyof T]?: string };

/**
 * Request Error Object
 *
 * Represents an error that occured during request in unified format.
 */
export class RequestError<T> extends Error {
  /**
   * Convert API error to RequestError
   */
  public static fromApiError<T>(error: AxiosError): RequestError<T> {
    const { response } = error;

    if (
      response === undefined ||
      response.data.message === null ||
      response.data.message === undefined
    ) {
      // Cant get any useful information out of the error
      return new RequestError<T>("An error occured. Please try again later.");
    }

    if (Array.isArray(response.data.message)) {
      // Process class-validator validation error
      const errors: ValidationError[] = response.data.message;

      const details = errors.reduce((acc, { property, constraints }) => {
        const keys = Object.keys(constraints);

        if (keys.length === 0) {
          return acc;
        }

        return {
          ...acc,
          [property]: constraints[keys[0]]
        };
      }, {});

      return new RequestError("Validation Error", details);
    }

    // Use error message supplied with the error
    return new RequestError(response.data.message);
  }

  /**
   * Error details in a simple format
   */
  public readonly details: ErrorDetails<T> | undefined;

  /**
   * Constructor
   */
  constructor(message: string, details?: ErrorDetails<T>) {
    super(message);

    this.details = details;
  }
}
