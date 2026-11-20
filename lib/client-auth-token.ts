import Cookies from "js-cookie";
import { authClient } from "@/lib/auth-client";

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

async function exchangeForAppToken(token: string): Promise<string | null> {
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

/**
 * Returns a fresh app JWT, exchanging any available JWT or Better Auth session token
 * through /api/user/info. Returns null when the user has no valid session.
 */
export async function ensureFreshAuthToken(): Promise<string | null> {
    const candidates = await collectCandidateTokens();
    for (const candidate of [...candidates, ""]) {
        const appToken = await exchangeForAppToken(candidate);
        if (appToken) {
            Cookies.set("access_token", appToken, { expires: 7 });
            return appToken;
        }
    }
    Cookies.remove("access_token");
    return null;
}