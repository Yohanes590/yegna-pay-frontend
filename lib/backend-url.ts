/**
 * Resolves the backend origin for Next.js server-side API route handlers.
 * Uses BACKEND_INTERNAL_URL at runtime (for container-to-container networking),
 * falling back to NEXT_PUBLIC_BACKEND_URL or localhost for local development.
 */
export function getBackendUrl(): string {
    return (
        process.env.BACKEND_INTERNAL_URL ||
        process.env.NEXT_PUBLIC_BACKEND_URL ||
        "http://localhost:4000"
    ).replace(/\/+$/, "");
}

/**
 * Resolves the public backend base URL from NEXT_PUBLIC_BACKEND_URL
 * with any trailing slashes removed to avoid duplicate `/` in endpoint paths.
 */
export function getPublicBackendUrl(
    fallback: string = "https://your-real-backend-domain.com"
): string {
    const raw = (process.env.NEXT_PUBLIC_BACKEND_URL || "").trim();
    return (raw || fallback).replace(/\/+$/, "");
}

/**
 * Builds a full backend API URL from NEXT_PUBLIC_BACKEND_URL and a route path.
 */
export function buildBackendEndpointUrl(
    path: string,
    fallback?: string
): string {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    return `${getPublicBackendUrl(fallback)}${normalizedPath}`;
}

