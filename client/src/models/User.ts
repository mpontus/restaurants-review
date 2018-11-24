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

/**
 * Return whether user can be editted by actor
 */
export const canEdit = (user: User, actor?: User) => actor && isAdmin(actor);

/**
 * Return whether user can be deleted by actor
 */
export const canDelete = (user: User, actor?: User) => actor && isAdmin(actor);
