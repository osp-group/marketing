// Base URL helper for assets - works with Vite's base config
const BASE_URL = import.meta.env.BASE_URL || '/';

/**
 * Converts an absolute asset path to work with the configured base URL.
 * e.g., '/assets/logo/logo.png' -> '/onboarding-colaborador/assets/logo/logo.png'
 */
export const getAssetUrl = (path: string): string => {
  if (!path) return path;
  // If it's already an absolute URL (http/https), return as-is
  if (/^https?:\/\//i.test(path)) return path;
  // Remove leading slash from path if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  // Ensure base ends with slash
  const cleanBase = BASE_URL.endsWith('/') ? BASE_URL : `${BASE_URL}/`;
  return `${cleanBase}${cleanPath}`;
};

// Export base URL for direct use
export { BASE_URL };
