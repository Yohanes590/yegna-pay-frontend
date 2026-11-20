import { getBackendUrl } from "@/lib/backend-url";

function shouldLogUpstream(): boolean {
    return process.env.BFF_UPSTREAM_DEBUG === "1" || process.env.BFF_AUTH_DEBUG === "1";
}

export type UpstreamResult = {
    ok: boolean;
    status: number;
    data: Record<string, unknown>;
    rawPreview?: string;
    fetchError?: string;
    backendUrl?: string;
};

export async function fetchBackendJson(
    backendPath: string,
    init: RequestInit,
    logTag: string
): Promise<UpstreamResult> {
    let backendUrl: string;
    try {
        backendUrl = getBackendUrl();
    } catch (err: unknown) {
        const fetchError = err instanceof Error ? err.message : "getBackendUrl failed";
        console.error(`[${logTag}]`, fetchError);
        return {
            ok: false,
            status: 500,
            data: {
                success: false,
                status: false,
                message: "BFF misconfiguration: set NEXT_PUBLIC_BACKEND_URL (or BACKEND_URL) on Vercel Production.",
                detail: fetchError,
            },
            fetchError,
        };
    }

    const url = `${backendUrl}${backendPath.startsWith("/") ? backendPath : `/${backendPath}`}`;

    try {
        const backendRes = await fetch(url, { ...init, cache: "no-store" });
        const rawText = await backendRes.text();
        let data: Record<string, unknown> = {};

        if (rawText) {
            try {
                data = JSON.parse(rawText) as Record<string, unknown>;
            } catch {
                const preview = rawText.slice(0, 300);
                console.error(`[${logTag}] non-JSON from backend`, {
                    url,
                    status: backendRes.status,
                    preview,
                });
                return {
                    ok: false,
                    status: 502,
                    data: {
                        success: false,
                        status: false,
                        message: "Backend returned a non-JSON response.",
                        detail: preview,
                    },
                    rawPreview: preview,
                    backendUrl,
                };
            }
        }

        if (shouldLogUpstream() || !backendRes.ok) {
            console.error(`[${logTag}] backend response`, {
                url,
                status: backendRes.status,
                body: JSON.stringify(data).slice(0, 2000),
            });
        }

        return {
            ok: backendRes.ok,
            status: backendRes.status,
            data,
            backendUrl,
        };
    } catch (err: unknown) {
        const fetchError = err instanceof Error ? err.message : String(err);
        console.error(`[${logTag}] fetch failed`, { url, fetchError });
        return {
            ok: false,
            status: 502,
            data: {
                success: false,
                status: false,
                message: "Unable to reach the backend API.",
                detail: fetchError,
            },
            fetchError,
            backendUrl,
        };
    }
}