import Cookies from "js-cookie";
import { authClient } from "@/lib/auth-client";
import { BETTER_AUTH_SESSION_COOKIE_NAMES } from "@/lib/bff-auth-headers";

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

function readClientCookieTokens(): string[] {
    const out: string[] = [];
    const push = (v?: string | null) => {
        const t = v?.trim();
        if (t && !out.includes(t)) out.push(t);
    };
    for (const name of BETTER_AUTH_SESSION_COOKIE_NAMES) {
        push(Cookies.get(name));
    }
    if (typeof document !== "undefined") {
        for (const name of BETTER_AUTH_SESSION_COOKIE_NAMES) {
            const match = document.cookie.match(
                new RegExp(`(?:^|;\\s*)${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}=([^;]*)`)
            );
            if (match?.[1]) push(decodeURIComponent(match[1]));
        }
    }
    return out;
}

async function collectCandidateTokens(): Promise<string[]> {
    const candidates: string[] = [];
    const push = (value?: string | null) => {
        const trimmed = value?.trim();
        if (trimmed && !candidates.includes(trimmed)) candidates.push(trimmed);
    };

    // Live Better Auth session (browser → API with credentials) — most reliable cross-domain.
    try {
        const session = await authClient.getSession();
        push(session?.data?.session?.token);
    } catch {
        // ignore
    }

    for (const t of readClientCookieTokens()) push(t);

    if (typeof window !== "undefined") {
        push(new URLSearchParams(window.location.search).get("token"));
    }

    return candidates;
}

/**
 * Token for create/edit/delete. Prefers a fresh app JWT; falls back to Better Auth session token
 * so Dokploy can authenticate via DB session lookup when JWT exchange fails.
 */
export async function getMutationAuthToken(): Promise<string | null> {
    const candidates = await collectCandidateTokens();

    for (const candidate of candidates) {
        const jwt = await exchangeForAppJwt(candidate);
        if (jwt) {
            Cookies.set("access_token", jwt, { expires: 7, sameSite: "Lax" });
            return jwt;
        }
    }

    return candidates[0] ?? null;
}

export const ensureFreshAuthToken = getMutationAuthToken;