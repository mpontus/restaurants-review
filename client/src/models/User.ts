/**
 * Describes user details
 */
export interface User {
  /**
   * User id
   */
  id: string;

  /**
   * User display name
   */
  name: string;

  /**
   * User email
   */
  email?: string;

  /**
   * User roles
   */
  roles: string[];

  /**
   * Whether the user can edited by logged-in user
   */
  canEdit?: boolean;

  /**
   * Whether the user can deleted by logged-in user
   */
  canDelete?: boolean;
}

/**
 * Return whether user has "user" role
 */
export const isUser = (user: User) => user.roles.includes("user");

/**
 * Return whether user is an owner
 */
export const isOwner = (user: User) => user.roles.includes("owner");

/**
 * Return whether user is an admin
 */
export const isAdmin = (user: User) => user.roles.includes("admin");
