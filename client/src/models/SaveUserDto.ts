/**
 * Shape of the object for user update
 */
export interface SaveUserDto {
  name: string;
  email: string;
  password: string;
  isUser: boolean;
  isOwner: boolean;
  isAdmin: boolean;
}
