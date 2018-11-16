/**
 * Security parameters and rules
 */
export default {
  /**
   * JWT Secret
   */
  jwt_secret: process.env.JWT_SECRET,

  /**
   * Salt rounds for password hashing
   */
  salt_rounds: 7,
};
