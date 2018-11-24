import * as t from "io-ts";

/**
 * Describes shape of session response
 */
export const userSchema = t.type({
  /**
   * User id
   */
  id: t.string,

  /**
   * User display name
   */
  name: t.string,

  /**
   * User email
   */
  email: t.union([t.string, t.undefined]),

  /**
   * User roles
   */
  roles: t.array(
    t.union([t.literal("user"), t.literal("owner"), t.literal("admin")])
  ),

  /**
   * Whether the user can be editted by the user making the request
   */
  canEdit: t.union([t.boolean, t.undefined]),

  /**
   * Whether the user can be deleted by the user making the request
   */
  canDelete: t.union([t.boolean, t.undefined])
});
