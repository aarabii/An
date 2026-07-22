/**
 * Validates whether a given string is a valid email address.
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== "string") return false;
  // Clean, standard RFC-compliant regex for web applications
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
}
