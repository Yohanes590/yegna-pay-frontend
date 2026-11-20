/**
 * Backend origin for Next.js server-side API route handlers (BFF on Vercel / Docker).
 *
 * On Vercel, only use the public API URL — never BACKEND_INTERNAL_URL (Docker hostname).
 */
export function getBackendUrl(): string {
    const publicUrl = (process.env.NEXT_PUBLIC_BACKEND_URL || "").trim().replace(/\/+$/, "");
    const internalUrl = (process.env.BACKEND_INTERNAL_URL || "").trim().replace(/\/+$/, "");
    const onVercel = process.env.VERCEL === "1" || Boolean(process.env.VERCEL_ENV);

    if (onVercel) {
        if (!publicUrl) {
            console.error("[getBackendUrl] NEXT_PUBLIC_BACKEND_URL is missing on Vercel");
            throw new Error("NEXT_PUBLIC_BACKEND_URL is required in production");
        }
        return publicUrl;
    }

    return internalUrl || publicUrl || "http://localhost:4000";
}

export function getPublicBackendUrl(
    fallback: string = "https://apiyegna.yonas.cloud"
): string {
    const raw = (process.env.NEXT_PUBLIC_BACKEND_URL || "").trim();
    return (raw || fallback).replace(/\/+$/, "");
}

export function buildBackendEndpointUrl(
    path: string,
    fallback?: string
): string {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    return `${getPublicBackendUrl(fallback)}${normalizedPath}`;
}