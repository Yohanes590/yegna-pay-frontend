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

