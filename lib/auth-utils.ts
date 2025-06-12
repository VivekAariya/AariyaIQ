import { randomBytes } from "crypto"

/**
 * Generate a secure random token for password reset
 * @returns Object containing token and expiry date
 */
export function generateResetToken() {
  // Generate a random token
  const token = randomBytes(32).toString("hex")

  // Set expiry time (30 minutes from now)
  const expiresAt = new Date()
  expiresAt.setMinutes(expiresAt.getMinutes() + 30)

  return { token, expiresAt }
}

/**
 * Hash a password
 * @param password Plain text password
 */
export function hashPassword(password: string) {
  // In a real application, you would use a proper password hashing library like bcrypt
  // This is a simplified example
  const salt = randomBytes(16).toString("hex")
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex")

  return { hash, salt }
}

/**
 * Verify a password against a hash
 * @param password Plain text password
 * @param hash Stored hash
 * @param salt Stored salt
 */
export function verifyPassword(password: string, hash: string, salt: string) {
  const verifyHash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex")

  return verifyHash === hash
}

/**
 * Validate password strength
 * @param password Password to validate
 * @returns Object with validation result and message
 */
export function validatePassword(password: string) {
  if (password.length < 8) {
    return { valid: false, message: "Password must be at least 8 characters long" }
  }

  // Add more validation rules as needed
  // Example: require numbers, special characters, etc.

  return { valid: true, message: "Password is valid" }
}

/**
 * Compare passwords to ensure they match
 * @param password First password
 * @param confirmPassword Second password to compare
 * @returns Boolean indicating if passwords match
 */
export function passwordsMatch(password: string, confirmPassword: string) {
  return password === confirmPassword
}
