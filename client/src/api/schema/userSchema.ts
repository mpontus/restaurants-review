import * as t from "io-ts";

/**
 * Describes shape of session response
 */
export const userSchema = t.type({
  id: t.string,
  name: t.string,
  email: t.union([t.string, t.undefined]),
  roles: t.array(
    t.union([t.literal("user"), t.literal("owner"), t.literal("admin")])
  )
});
