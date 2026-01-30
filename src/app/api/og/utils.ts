/**
 * Shared utility functions for OG API routes
 */

export type SSRFValidationResult =
  | { valid: true; parsedUrl: URL }
  | { valid: false; error: string };

/**
 * Validates a URL string to prevent SSRF (Server-Side Request Forgery) attacks.
 * Blocks private IP ranges, localhost, and internal hostnames.
 *
 * @param urlString - The URL string to validate
 * @returns An object indicating whether the URL is valid, with either the parsed URL or an error message
 */
export function validateUrlForSSRF(urlString: string): SSRFValidationResult {
  try {
    const parsedUrl = new URL(urlString);

    // Only allow HTTP/HTTPS protocols
    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      return { valid: false, error: "Invalid URL protocol" };
    }

    // Block private IP ranges, localhost, and internal hostnames
    const hostname = parsedUrl.hostname.toLowerCase();
    if (
      hostname === "localhost" ||
      hostname.startsWith("127.") ||
      hostname.startsWith("10.") ||
      hostname.startsWith("192.168.") ||
      hostname.match(/^172\.(1[6-9]|2[0-9]|3[0-1])\./) ||
      hostname === "::1" ||
      hostname === "0.0.0.0" ||
      hostname === "169.254.169.254" ||
      hostname.endsWith(".internal") ||
      hostname.endsWith(".local")
    ) {
      return { valid: false, error: "Disallowed URL" };
    }

    return { valid: true, parsedUrl };
  } catch {
    return { valid: false, error: "Invalid URL format" };
  }
}
