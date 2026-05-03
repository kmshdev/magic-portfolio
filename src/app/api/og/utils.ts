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

    // Normalize hostname: lower-case, remove trailing dot, strip IPv6 brackets
    let hostname = parsedUrl.hostname.toLowerCase();
    if (hostname.endsWith(".")) {
      hostname = hostname.slice(0, -1);
    }
    if (hostname.startsWith("[") && hostname.endsWith("]")) {
      hostname = hostname.slice(1, -1);
    }

    // Block localhost and internal hostnames
    if (hostname === "localhost" || hostname.endsWith(".local") || hostname.endsWith(".internal")) {
      return { valid: false, error: "Disallowed URL" };
    }

    // Check for private/internal IP addresses
    // Handle IPv4, IPv6, and IPv4-mapped IPv6
    if (isPrivateIP(hostname)) {
      return { valid: false, error: "Disallowed URL" };
    }

    return { valid: true, parsedUrl };
  } catch {
    return { valid: false, error: "Invalid URL format" };
  }
}

/**
 * Checks if an IP address (v4 or v6) is private or reserved.
 */
function isPrivateIP(ip: string): boolean {
  // Handle IPv4-mapped IPv6 (e.g., ::ffff:127.0.0.1)
  if (ip.startsWith("::ffff:")) {
    const ipv4 = ip.slice(7);
    return isPrivateIPv4(ipv4);
  }

  // Check if it's a valid IPv4
  if (/^(\d{1,3}\.){3}\d{1,3}$/.test(ip)) {
    return isPrivateIPv4(ip);
  }

  // Check if it's a valid IPv6
  if (ip.includes(":")) {
    return isPrivateIPv6(ip);
  }

  return false;
}

/**
 * Checks if an IPv4 address is private or reserved.
 */
function isPrivateIPv4(ip: string): boolean {
  const parts = ip.split(".").map((p) => parseInt(p, 10));
  if (parts.some((p) => Number.isNaN(p) || p < 0 || p > 255)) return false;

  const [a, b, c, d] = parts;

  return (
    a === 127 || // Loopback
    a === 10 || // Private Class A
    (a === 172 && b >= 16 && b <= 31) || // Private Class B
    (a === 192 && b === 168) || // Private Class C
    (a === 169 && b === 254) || // Link-local
    a === 0 || // Current network
    (a === 224 && b === 0 && c === 0 && d === 0) || // Base multicast
    ip === "255.255.255.255" // Broadcast
  );
}

/**
 * Checks if an IPv6 address is private or reserved.
 */
function isPrivateIPv6(ip: string): boolean {
  // Normalize IPv6 (very basic normalization)
  const normalized = ip.toLowerCase();

  return (
    normalized === "::1" || // Loopback
    normalized === "::" || // Unspecified
    normalized.startsWith("fe80:") || // Link-local
    normalized.startsWith("fc00:") || // ULA
    normalized.startsWith("fd00:") || // ULA
    normalized.startsWith("ff00:") // Multicast
  );
}
