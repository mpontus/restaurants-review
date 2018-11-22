import * as t from "io-ts";
import { userSchema } from "./userSchema";

/**
 * Describes shape of session response
 */
export const sessionSchema = t.type({
  accessToken: t.string,
  refreshToken: t.string,
  user: userSchema
});
