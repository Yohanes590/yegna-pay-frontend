import Cookies from "js-cookie";
import { authClient } from "@/lib/auth-client";

async function exchangeForAppJwt(token: string): Promise<string | null> {
    const res = await fetch("/api/user/info", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
    }).catch(() => null);

    if (!res?.ok) return null;
    const data = await res.json().catch(() => ({}));
    return typeof data?.token === "string" && data.token ? data.token : null;
}

async function collectCandidateTokens(): Promise<string[]> {
    const candidates: string[] = [];
    const push = (value?: string | null) => {
        const trimmed = value?.trim();
        if (trimmed && !candidates.includes(trimmed)) candidates.push(trimmed);
    };

    push(Cookies.get("access_token"));
    if (typeof window !== "undefined") {
        push(new URLSearchParams(window.location.search).get("token"));
    }
    try {
        const session = await authClient.getSession();
        push(session?.data?.session?.token);
    } catch {
        // ignore
    }
    return candidates;
}

/**
 * Token for dashboard mutations (create/edit/delete project). The UI and the auth API
 * live on different sites, so any JWT or Better Auth session token is exchanged for a
 * fresh app JWT via /api/user/info. Never clears cookies or forces sign-out.
 */
export async function getMutationAuthToken(): Promise<string | null> {
    const candidates = await collectCandidateTokens();

    for (const candidate of candidates) {
        const jwt = await exchangeForAppJwt(candidate);
        if (jwt) {
            Cookies.set("access_token", jwt, { expires: 7 });
            return jwt;
        }
    }

    return candidates[0] ?? null;
}

export const ensureFreshAuthToken = getMutationAuthToken;