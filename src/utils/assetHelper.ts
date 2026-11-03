/**
 * Asset Helper for Naija Pot Kitchen & Grill Ltd
 * 
 * Accurately resolves asset URLs across:
 * - GitHub Pages (https://djoelkl7.github.io/FFO-9ja/)
 * - Local Vite dev server (/)
 * - cPanel public_html (./)
 * - Direct GitHub raw CDN fallback:
 *   https://raw.githubusercontent.com/djoelkl7/FFO-9ja/main/public/assets/images/uploads/
 */

export const GITHUB_RAW_BASE =
  'https://raw.githubusercontent.com/djoelkl7/FFO-9ja/main/public/assets/images/uploads/';

/**
 * Resolves any relative asset path taking Vite's BASE_URL into account.
 */
export function getAssetUrl(path: string): string {
  if (!path) return '';

  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }

  // Strip leading ./ or /
  const cleanPath = path.replace(/^(\.\/|\/)+/, '');

  // Vite's configured base path (e.g. '/FFO-9ja/' on GitHub Pages, '/' on local dev)
  const metaEnv = (import.meta as unknown as { env?: { BASE_URL?: string } }).env;
  const base = metaEnv?.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;

  return `${cleanBase}${cleanPath}`;
}

/**
 * Returns direct CDN URL for a file in the GitHub repository:
 * https://raw.githubusercontent.com/djoelkl7/FFO-9ja/main/public/assets/images/uploads/<filename>
 */
export function getGitHubUploadUrl(filenameOrPath: string): string {
  if (!filenameOrPath) return '';
  const filename = filenameOrPath.split('/').pop() || filenameOrPath;
  return `${GITHUB_RAW_BASE}${filename}`;
}

/**
 * Handles image load errors gracefully by trying GitHub repository CDN first,
 * then falling back to a signature dish image.
 */
export function handleImageError(
  event: React.SyntheticEvent<HTMLImageElement, Event>,
  fallbackDish = 'Jollof-with-assorted-meat-450x450.jpg'
) {
  const target = event.currentTarget;
  const currentSrc = target.src;
  const filename = currentSrc.split('/').pop()?.split('?')[0] || '';

  // If not already from GitHub raw, try fetching directly from GitHub raw CDN
  if (filename && !currentSrc.includes('raw.githubusercontent.com')) {
    target.src = `${GITHUB_RAW_BASE}${filename}`;
    return;
  }

  // Fallback to signature dish from GitHub raw
  if (!currentSrc.includes(fallbackDish)) {
    target.src = `${GITHUB_RAW_BASE}${fallbackDish}`;
  }
}
